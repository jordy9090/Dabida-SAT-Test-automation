import { deepAll, findByText, norm, textOf, visible } from './dom.js';
const labelFor = (el, i) => norm(el.getAttribute?.('data-label') || el.getAttribute?.('aria-label')).match(/\b([A-D])\b/i)?.[1]?.toUpperCase() || String.fromCharCode(65 + i);
const CHOICE_SELECTOR = '[data-test-id*="choice"], [data-testid*="choice"], [role="radio"], input[type="radio"], button.option, [class*="answer-choice"], [class*="choice-option"]';

export function progress(root) {
  const surface = root.querySelector?.('[role="main"], main') || root.body || root;
  const text = norm(surface.innerText || surface.textContent);
  const match = text.match(/(?:question|problem|문제|질문)\s*(\d+)\s*(?:of|\/|중)\s*(\d+)/i) || text.match(/\b(\d+)\s*\/\s*(22|27)\b/);
  return match ? { current: Number(match[1]), total: Number(match[2]) } : null;
}
export function sectionState(root) {
  const surface = root.querySelector?.('[role="main"], main') || root.body || root;
  const text = norm(surface.innerText || surface.textContent), p = progress(root);
  const satContext = /\bSAT\b|reading and writing|digital sat|practice test|읽기.*쓰기|수학.*모듈/i.test(text);
  const hasTransitionControl = deepAll(surface, 'button, [role="button"]')
    .some(el => visible(el) && /^(start|continue|시작|계속)$|start.*(module|test|practice)|모듈.*시작|테스트.*시작|시험.*시작/i.test(textOf(el)))
    || /\bstart\s+module\b|모듈\s*시작/i.test(text);
  const hasCompletionUI = deepAll(surface, '[data-test-id*="result"], [data-testid*="result"], [class*="result"], h1, h2, h3')
    .some(el => visible(el) && /^(results?|test complete|completed|결과|테스트 완료)$/i.test(textOf(el)))
    || /(?:great work|congratulations|수고하셨습니다)[!！]?\s*(?:check|점수)|(?:test|시험|테스트)\s*(?:is\s*)?(?:complete|완료)/i.test(text);
  const hasReading = /reading and writing|읽기.*쓰기/i.test(text), hasMath = /\bmath\b|수학/i.test(text);
  const section = /next steps?|다음 단계/i.test(text) && hasMath ? 'math' : hasMath && !hasReading ? 'math' : 'reading';
  const module = Number(text.match(/(?:module|모듈)\s*([12])/i)?.[1] || 1);
  if (hasCompletionUI && !p && !/next steps?|다음 단계/i.test(text)) return { phase: 'COMPLETE', section, module };
  if (satContext && hasTransitionControl && !p) return { phase: 'TRANSITION', section, module };
  return { phase: p ? 'QUESTION' : 'UNKNOWN', section, module };
}
const questionRoot = root => deepAll(root, '[data-test-id*="question"], [data-testid*="question"], [role="main"], main').find(visible) || root.body || root;

export function extractPrompt(root, context = {}) {
  const scope = questionRoot(root);
  const controls = deepAll(scope, CHOICE_SELECTOR).filter(visible);
  let choices = controls.map((el, i) => ({ label: labelFor(el, i), text: textOf(el.closest?.('label') || el) })).filter(c => c.text);
  const lines = String(scope.innerText || '').split(/\n+/).map(norm).filter(Boolean);
  if (!choices.length) {
    choices = lines.flatMap((line, index) => /^[A-D][.)]?$/.test(line) && lines[index + 1] ? [{ label: line[0], text: lines[index + 1] }] : []);
  }
  const input = deepAll(scope, 'textarea, input:not([type]), input[type="text"], input[type="number"], [role="textbox"]').find(el => visible(el) && !el.isContentEditable && !/Gemini.*(prompt|프롬프트)/i.test(el.getAttribute?.('aria-label') || ''));
  const readOnlyGridIn = !choices.length && !!scope.querySelector?.('.question-container.read-only .explanation .option-text-container, .question-container.read-only .explanation-text');
  const stem = deepAll(scope, '[data-test-id*="prompt"], [data-testid*="prompt"], [class*="question"], h1, h2, h3, p').filter(visible).map(textOf).filter(text => text.length > 8 && !choices.some(c => c.text === text));
  const textQuestion = [...lines].reverse().find(line => /[?？]$/.test(line) && line.length > 8);
  const state = sectionState(root), p = progress(root);
  return { section: context.section || state.section, module: context.module || state.module, problemNumber: context.problemNumber || p?.current, passage: norm(deepAll(scope, '[data-test-id*="passage"], [data-testid*="passage"], [class*="passage"]').filter(visible).map(textOf).join('\n')), question: norm(textQuestion || stem.sort((a,b) => b.length-a.length)[0]), choices, responseType: choices.length ? 'multiple_choice' : input || readOnlyGridIn ? 'grid_in' : null, submittedAnswer: '', correctAnswer: '', explanation: '', figures: [], extractionWarnings: [] };
}
export function answerControl(root, problem) {
  const scope = questionRoot(root);
  if (problem.responseType === 'multiple_choice') {
    const exact = deepAll(scope, CHOICE_SELECTOR).find(visible);
    if (exact) return exact.closest?.('button, [role="button"], label') || exact;
    const first = problem.choices[0];
    return deepAll(scope, 'button, [role="button"], [class*="choice"], [class*="answer"], [class*="option"]').find(el => visible(el) && (textOf(el).includes(first.text) || new RegExp(`^${first.label}[.)]?\\s`).test(textOf(el))));
  }
  return deepAll(scope, 'textarea, input:not([type]), input[type="text"], input[type="number"], [role="textbox"]').find(el => visible(el) && !el.isContentEditable && !/Gemini.*(prompt|프롬프트)/i.test(el.getAttribute?.('aria-label') || ''));
}
export function gradedData(root) {
  const shortAnswer = deepAll(root, '.short-answer-container').find(visible);
  const readOnlyAnswer = deepAll(root, '.question-container.read-only .explanation').find(visible);
  const shortCorrect = textOf((shortAnswer || readOnlyAnswer)?.querySelector?.('.option-text-container'));
  const shortExplanation = textOf((shortAnswer || readOnlyAnswer)?.querySelector?.('.explanation-text'));
  const revealedCorrect = deepAll(root, 'button.revealed-correct, [class~="revealed-correct"]').find(visible);
  const revealedLabel = norm(revealedCorrect?.querySelector?.('.option-prefix')?.textContent).match(/^([A-D])/i)?.[1]?.toUpperCase();
  const correct = shortCorrect || revealedLabel || deepAll(root, '[data-correct="true"], [aria-label*="correct" i], [data-test-id*="correct"], [data-testid*="correct"], .correct').filter(visible).map(textOf).find(text => text && !/^(correct|정답)$/i.test(text)) || '';
  const scopedExplanation = revealedCorrect?.querySelector?.('.lm-explanation-text, [class*="explanation-text"], [data-test-id*="explanation"], [data-testid*="explanation"]');
  const explanationNode = scopedExplanation || deepAll(root, '[data-test-id*="explanation"], [data-testid*="explanation"], [class*="explanation-text"], [aria-label*="explanation" i]').filter(visible).find(el => textOf(el).length > 5);
  const body = norm(root.body?.innerText);
  return { correctAnswer: norm(correct || body.match(/(?:correct answer|정답)\s*[:\-]?\s*([^\n.]{1,100})/i)?.[1]), explanation: norm(shortExplanation || textOf(explanationNode) || body.match(/(?:explanation|해설)\s*[:\-]?\s*([\s\S]{10,2000})/i)?.[1]) };
}
export function navigationButton(root, kind) {
  if (kind === 'confirm') {
    return findByText(root, 'button, [role="button"]', [/^yes.*submit$/i, /^예.*제출$/, /^confirm$/i, /^확인$/]);
  }
  const patterns = { submit: [/submit/i,/check answer/i,/제출|정답 확인/], next: [/^next$/i,/next question/i,/^다음$/], back: [/^back$/i,/previous question/i,/^뒤로$/], transition: [/^start$|start.*module|begin.*module|continue|start math|start.*test|start.*practice/i,/^시작$|모듈.*시작|계속|수학.*시작|테스트.*시작|시험.*시작/] };
  return findByText(root, 'button, [role="button"]', patterns[kind]);
}
export function validateProblem(problem) {
  const missing = ['section','module','problemNumber','question','responseType','correctAnswer','explanation'].filter(key => !problem[key]);
  if (problem.responseType === 'multiple_choice' && !problem.choices.length) missing.push('choices');
  if (missing.length) throw new Error(`Incomplete problem ${problem.section} M${problem.module} #${problem.problemNumber}: ${missing.join(', ')}`);
  return problem;
}
export function signature(problem) {
  let hash = 2166136261; for (const char of norm(problem.question)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `${problem.section}:${problem.module}:${problem.problemNumber}:${(hash >>> 0).toString(16)}`;
}
export function dedupeAndValidate(problems) { const map = new Map(); for (const p of problems) map.set(signature(validateProblem(p)), p); return [...map.values()]; }
