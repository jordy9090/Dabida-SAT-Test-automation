import { clickAndWait, satDocument, waitFor, deepAll, findByText, visible, norm } from './dom.js';
import { answerControl, dedupeAndValidate, extractPrompt, gradedData, navigationButton, progress, sectionState, signature } from './extractor.js';

export const QUESTION_STATES = ['WAIT_QUESTION','EXTRACT_PROMPT','ANSWER','SUBMIT','WAIT_GRADED','EXTRACT_CORRECT_ANSWER','EXTRACT_EXPLANATION','SAVE','NEXT'];

function setNativeValue(control, value) {
  const proto = control.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  setter ? setter.call(control, value) : (control.value = value);
  control.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value }));
  control.dispatchEvent(new Event('change', { bubbles: true }));
}

async function captureFigures(root) {
  const scope = deepAll(root, '[data-test-id*="question"], [data-testid*="question"], [role="main"], main').find(visible) || root.body;
  const figures = [];
  const candidates = deepAll(scope, 'img, svg, canvas').filter(element => {
    if (!visible(element) || element.closest?.('button, [role="button"], nav')) return false;
    const rect = element.getBoundingClientRect();
    return rect.width >= 80 && rect.height >= 50;
  });
  for (const element of candidates) {
    try {
      const canvas = await window.html2canvas(element, { backgroundColor: '#fff', scale: 1 });
      figures.push({ dataUrl: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height });
    } catch { /* non-fatal diagnostic is stored below */ }
  }
  return figures;
}

export class SATRunner {
  constructor(status, options = {}) { this.status = status; this.options = options; this.problems = []; this.seen = new Set(); }
  fail(message, context) { throw new Error(`${message} (${context.section} M${context.module} #${context.problemNumber || '?'})`); }

  async runQuestion(root) {
    let context = { ...sectionState(root), problemNumber: progress(root)?.current };
    this.status(context.section === 'math' ? `Math M${context.module}` : `Reading M${context.module}`);
    await waitFor(() => sectionState(root).phase === 'QUESTION', { description: 'WAIT_QUESTION', root });
    let problem = await waitFor(async () => {
      const firstContext = { ...sectionState(root), problemNumber: progress(root)?.current };
      const first = extractPrompt(root, firstContext);
      if (!first.question || !first.responseType) return false;
      await new Promise(resolve => setTimeout(resolve, 500));
      const secondContext = { ...sectionState(root), problemNumber: progress(root)?.current };
      const second = extractPrompt(root, secondContext);
      return second.question && second.responseType
        && first.section === second.section && first.module === second.module
        && first.problemNumber === second.problemNumber && first.question === second.question ? second : false;
    }, { timeout: 15000, description: 'stable question text and answer control', root }).catch(() => null);
    context = { ...sectionState(root), problemNumber: progress(root)?.current };
    if (!problem) this.fail('EXTRACT_PROMPT failed', context);
    problem.figures = await captureFigures(root);
    const alreadyGraded = gradedData(root);
    if (alreadyGraded.correctAnswer && alreadyGraded.explanation) {
      Object.assign(problem, alreadyGraded);
      problem.submittedAnswer = '(skipped/read-only)';
    } else {
    const control = answerControl(root, problem);
    if (!control) this.fail('ANSWER control missing', context);
    const before = gradedData(root);
    if (problem.responseType === 'multiple_choice') { problem.submittedAnswer = problem.choices[0].label; control.click(); }
    else { problem.submittedAnswer = '0'; control.focus(); setNativeValue(control, '0'); }
    if (problem.responseType === 'grid_in') {
      const submit = navigationButton(root, 'submit');
      if (submit) submit.click();
    }
    let graded = null;
    for (let attempt = 1; attempt <= 3 && !graded; attempt += 1) {
      graded = await waitFor(() => { const g = gradedData(root); return (g.correctAnswer && g.explanation && (g.correctAnswer !== before.correctAnswer || g.explanation !== before.explanation)) && g; }, { timeout: 10000, description: 'WAIT_GRADED correct answer and explanation', root }).catch(() => null);
      if (!graded && attempt < 3) {
        const retryControl = answerControl(root, problem);
        if (retryControl) retryControl.click();
        if (problem.responseType === 'grid_in') navigationButton(root, 'submit')?.click();
      }
    }
    if (!graded) this.fail('WAIT_GRADED failed after 3 attempts', context);
    Object.assign(problem, gradedData(root));
    }
    if (!problem.correctAnswer) this.fail('EXTRACT_CORRECT_ANSWER failed', context);
    if (!problem.explanation) this.fail('EXTRACT_EXPLANATION failed', context);
    dedupeAndValidate([problem]);
    const key = signature(problem);
    if (!this.seen.has(key)) {
      this.seen.add(key); this.problems.push(problem); this.options.onCollect?.(problem, this.problems);
      console.info(`[Gemini SAT Exporter] saved ${problem.section} M${problem.module} #${problem.problemNumber}; total=${this.problems.length}`);
    }
    return problem;
  }

  async transition(root) {
    const before = sectionState(root), button = navigationButton(root, 'transition') || navigationButton(root, 'submit');
    const beforeProgress = progress(root);
    if (!button) throw new Error(`Transition control missing after ${before.section} M${before.module}`);
    const beforeText = norm(root.body?.innerText);
    button.click();
    const expectsConfirmation = beforeProgress && beforeProgress.current === beforeProgress.total;
    const changed = await waitFor(
      () => navigationButton(root, 'confirm') || (!expectsConfirmation && norm(root.body?.innerText) !== beforeText),
      { timeout: 20000, description: 'module confirmation or transition', root }
    );
    if (changed?.click) {
      const confirmText = norm(root.body?.innerText); changed.click();
      await waitFor(() => {
        const now = progress(root);
        const currentState = sectionState(root);
        const moduleChanged = currentState.section !== before.section || currentState.module !== before.module;
        return norm(root.body?.innerText) !== confirmText
          && (!beforeProgress || !now || (now.current !== beforeProgress.current && moduleChanged));
      }, { timeout: 30000, description: 'confirmation state transition', root });
    }
  }

  async run() {
    let guard = 0;
    while (guard++ < 250) {
      const root = satDocument(), state = sectionState(root);
      if (state.phase === 'COMPLETE') break;
      if (state.phase === 'TRANSITION') { await this.transition(root); continue; }
      if (state.phase !== 'QUESTION') { await waitFor(() => sectionState(satDocument()).phase !== 'UNKNOWN', { timeout: 30000, description: 'SAT UI', root }); continue; }
      const before = progress(root);
      const beforeState = sectionState(root);
      const collectedHere = this.problems
        .filter(problem => problem.section === state.section && problem.module === state.module)
        .map(problem => Number(problem.problemNumber));
      const expectedNumber = collectedHere.length ? Math.max(...collectedHere) + 1 : 1;
      if (before?.current > expectedNumber) {
        const back = navigationButton(root, 'back');
        if (!back) throw new Error(`Missing ${state.section} M${state.module} #${expectedNumber}; cannot navigate back from #${before.current}`);
        await clickAndWait(back, () => progress(root)?.current < before.current, 'BACK TO MISSING QUESTION', root);
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
      await this.runQuestion(root);
      if (this.options.maxProblems && this.problems.length >= this.options.maxProblems) return dedupeAndValidate(this.problems);
      const next = navigationButton(root, 'next');
      if (next) {
        await clickAndWait(next, () => progress(root)?.current !== before?.current || sectionState(root).phase !== 'QUESTION', 'NEXT', root);
        const afterNext = progress(root);
        if (before && afterNext && afterNext.current < before.current) {
          await waitFor(() => {
            const state = sectionState(root);
            return state.section !== beforeState.section || state.module !== beforeState.module;
          }, { timeout: 15000, description: 'module identity after question reset', root });
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      else await this.transition(root);
    }
    if (guard >= 250) throw new Error('Safety limit reached before SAT completion');
    return dedupeAndValidate(this.problems);
  }
}

export async function startGeminiPrompt() {
  const message = 'I want to take a full practice SAT TEST.';
  const inputs = deepAll(document, '[contenteditable="true"][role="textbox"], textarea, [contenteditable="true"]');
  const input = inputs.find(visible);
  if (!input) throw new Error('Visible Gemini message input not found');
  input.focus();
  if (input.isContentEditable) {
    input.textContent = message;
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: message }));
  } else setNativeValue(input, message);
  if (!norm(input.innerText || input.value).includes(message)) throw new Error('Gemini prompt verification failed');
  const findSend = () => deepAll(document, 'button, [role="button"]').find(el => visible(el) && /send|submit|보내기/i.test(norm(el.getAttribute('aria-label') || el.innerText)));
  const send = await waitFor(findSend, { timeout: 10000, description: 'enabled Gemini Send button' }).catch(() => null);
  if (send) send.click();
  else {
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true }));
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true }));
  }
  let openedCard = false;
  await waitFor(() => {
    const phase = sectionState(satDocument()).phase;
    if (phase !== 'UNKNOWN') return true;
    if (!openedCard) {
      const open = findByText(document, 'button, a, [role="button"]', [/^open$/i, /^열기$/]);
      if (open) { openedCard = true; open.click(); }
    }
    return false;
  // Gemini can expose a partially generated 1/10 preview for several minutes before
  // replacing it with the complete 27/22-question SAT. Wait for the real module.
  }, { timeout: 600000, description: 'complete interactive SAT UI' });
}
