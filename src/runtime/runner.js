import { clickAndWait, satDocument, waitFor, deepAll, visible, norm } from './dom.js';
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
  for (const element of deepAll(scope, 'img, svg, canvas').filter(visible)) {
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
    const context = { ...sectionState(root), problemNumber: progress(root)?.current };
    this.status(context.section === 'math' ? `Math M${context.module}` : `Reading M${context.module}`);
    await waitFor(() => sectionState(root).phase === 'QUESTION', { description: 'WAIT_QUESTION', root });
    let problem;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      problem = extractPrompt(root, context);
      if (problem.question && problem.responseType) break;
      if (attempt === 3) this.fail('EXTRACT_PROMPT failed', context);
      await waitFor(() => extractPrompt(root, context).question, { timeout: 5000, description: 'question text', root });
    }
    problem.figures = await captureFigures(root);
    const control = answerControl(root, problem);
    if (!control) this.fail('ANSWER control missing', context);
    if (problem.responseType === 'multiple_choice') { problem.submittedAnswer = problem.choices[0].label; control.click(); }
    else { problem.submittedAnswer = '0'; control.focus(); setNativeValue(control, '0'); }
    const before = gradedData(root);
    const submit = navigationButton(root, 'submit');
    if (submit) submit.click();
    await waitFor(() => { const g = gradedData(root); return (g.correctAnswer && g.explanation && (g.correctAnswer !== before.correctAnswer || g.explanation !== before.explanation)) && g; }, { timeout: 30000, description: 'WAIT_GRADED correct answer and explanation', root });
    Object.assign(problem, gradedData(root));
    if (!problem.correctAnswer) this.fail('EXTRACT_CORRECT_ANSWER failed', context);
    if (!problem.explanation) this.fail('EXTRACT_EXPLANATION failed', context);
    dedupeAndValidate([problem]);
    const key = signature(problem);
    if (!this.seen.has(key)) { this.seen.add(key); this.problems.push(problem); this.options.onCollect?.(problem, this.problems); }
    return problem;
  }

  async transition(root) {
    const before = sectionState(root), button = navigationButton(root, 'transition') || navigationButton(root, 'submit');
    if (!button) throw new Error(`Transition control missing after ${before.section} M${before.module}`);
    button.click();
    const confirm = await waitFor(() => navigationButton(root, 'confirm') || sectionState(root).phase !== before.phase, { timeout: 10000, description: 'module confirmation or transition', root });
    if (confirm?.click) confirm.click();
    await waitFor(() => { const now = sectionState(root); return now.phase === 'QUESTION' || now.phase === 'COMPLETE'; }, { timeout: 30000, description: 'next module/section question', root });
  }

  async run() {
    let guard = 0;
    while (guard++ < 250) {
      const root = satDocument(), state = sectionState(root);
      if (state.phase === 'COMPLETE') break;
      if (state.phase === 'TRANSITION') { await this.transition(root); continue; }
      if (state.phase !== 'QUESTION') { await waitFor(() => sectionState(satDocument()).phase !== 'UNKNOWN', { timeout: 30000, description: 'SAT UI', root }); continue; }
      const before = progress(root);
      await this.runQuestion(root);
      if (this.options.maxProblems && this.problems.length >= this.options.maxProblems) return dedupeAndValidate(this.problems);
      const next = navigationButton(root, 'next');
      if (next) await clickAndWait(next, () => progress(root)?.current !== before?.current || sectionState(root).phase !== 'QUESTION', 'NEXT', root);
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
  const send = deepAll(document, 'button, [role="button"]').find(el => visible(el) && /send|submit|보내기/i.test(norm(el.getAttribute('aria-label') || el.innerText)));
  if (!send) throw new Error('Gemini Send button not found');
  send.click();
  await waitFor(() => sectionState(satDocument()).phase !== 'UNKNOWN', { timeout: 120000, description: 'interactive SAT UI' });
}
