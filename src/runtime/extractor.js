import { deepAll, findByText, norm, textOf, visible } from './dom.js';
const labelFor = (el, i) => norm(el.getAttribute?.('data-label') || el.getAttribute?.('aria-label')).match(/\b([A-D])\b/i)?.[1]?.toUpperCase() || String.fromCharCode(65 + i);

export function progress(root) {
  const match = norm(root.body?.innerText || root.innerText).match(/(?:question|problem|문제)?\s*(\d+)\s*(?:of|\/|중)\s*(\d+)/i);
  return match ? { current: Number(match[1]), total: Number(match[2]) } : null;
}
export function sectionState(root) {
  const text = norm(root.body?.innerText || root.innerText), p = progress(root);
  const section = /\bmath\b|수학/i.test(text) ? 'math' : 'reading';
  const module = Number(text.match(/(?:module|모듈)\s*([12])/i)?.[1] || 1);
  if (/(results?|complete|finished|완료|결과)/i.test(text) && !p) return { phase: 'COMPLETE', section, module };
  if (/\b(start|begin|continue)\b|시작|계속/i.test(text) && !p) return { phase: 'TRANSITION', section, module };
  return { phase: p ? 'QUESTION' : 'UNKNOWN', section, module };
}
const questionRoot = root => deepAll(root, '[data-test-id*="question"], [data-testid*="question"], [role="main"], main').find(visible) || root.body || root;

export function extractPrompt(root, context = {}) {
  const scope = questionRoot(root);
  const controls = deepAll(scope, '[data-test-id*="choice"], [data-testid*="choice"], [role="radio"], input[type="radio"]').filter(visible);
  const choices = controls.map((el, i) => ({ label: labelFor(el, i), text: textOf(el.closest?.('label') || el) })).filter(c => c.text);
  const input = deepAll(scope, 'input:not([type]), input[type="text"], input[type="number"], [role="textbox"]').find(el => visible(el) && !el.closest?.('[contenteditable="true"]'));
  const stem = deepAll(scope, '[data-test-id*="prompt"], [data-testid*="prompt"], [class*="question"], h1, h2, h3, p').filter(visible).map(textOf).filter(text => text.length > 8 && !choices.some(c => c.text === text));
  const state = sectionState(root), p = progress(root);
  return { section: context.section || state.section, module: context.module || state.module, problemNumber: context.problemNumber || p?.current, passage: norm(deepAll(scope, '[data-test-id*="passage"], [data-testid*="passage"], [class*="passage"]').filter(visible).map(textOf).join('\n')), question: norm(stem.sort((a,b) => b.length-a.length)[0]), choices, responseType: choices.length ? 'multiple_choice' : input ? 'grid_in' : null, submittedAnswer: '', correctAnswer: '', explanation: '', figures: [], extractionWarnings: [] };
}
export function answerControl(root, problem) {
  const scope = questionRoot(root);
  return problem.responseType === 'multiple_choice' ? deepAll(scope, '[data-test-id*="choice"], [data-testid*="choice"], [role="radio"], input[type="radio"]').find(visible) : deepAll(scope, 'input:not([type]), input[type="text"], input[type="number"], [role="textbox"]').find(visible);
}
export function gradedData(root) {
  const correct = deepAll(root, '[data-correct="true"], [aria-label*="correct" i], [data-test-id*="correct"], [data-testid*="correct"], .correct').filter(visible).map(textOf).find(Boolean) || '';
  const explanationNode = deepAll(root, '[data-test-id*="explanation"], [data-testid*="explanation"], [class*="explanation"], [aria-label*="explanation" i]').filter(visible).find(el => textOf(el).length > 5);
  const body = norm(root.body?.innerText);
  return { correctAnswer: norm(correct || body.match(/(?:correct answer|정답)\s*[:\-]?\s*([^\n.]{1,100})/i)?.[1]), explanation: norm(textOf(explanationNode) || body.match(/(?:explanation|해설)\s*[:\-]?\s*([\s\S]{10,2000})/i)?.[1]) };
}
export function navigationButton(root, kind) {
  const patterns = { submit: [/submit/i,/check answer/i,/제출|정답 확인/], next: [/^next$/i,/next question/i,/^다음$/], transition: [/start.*module|begin.*module|continue|start math/i,/모듈.*시작|계속|수학.*시작/], confirm: [/confirm|submit|yes/i,/확인|제출|예/] };
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
