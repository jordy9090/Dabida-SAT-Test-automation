import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { dedupeAndValidate, extractPrompt, gradedData, sectionState } from '../src/runtime/extractor.js';

function fixture(html) {
  const dom = new JSDOM(html); globalThis.getComputedStyle = dom.window.getComputedStyle;
  for (const el of dom.window.document.querySelectorAll('*')) Object.defineProperty(el, 'innerText', { get() { return this.textContent; } });
  return dom.window.document;
}

test('multiple-choice prompt and graded answer extraction', () => {
  const doc = fixture(`<main><h2>Reading and Writing Module 1</h2><div>Question 1 of 27</div><div data-testid="passage">A short passage.</div><p data-testid="prompt">Which choice best states the main idea?</p><label><input type="radio" aria-label="A">First answer</label><label><input type="radio" aria-label="B">Second answer</label><div data-correct="true">B. Second answer</div><div data-testid="explanation">B is supported by the final sentence.</div></main>`);
  const problem = extractPrompt(doc); const graded = gradedData(doc);
  assert.equal(problem.responseType, 'multiple_choice'); assert.equal(problem.choices.length, 2); assert.match(problem.question, /main idea/);
  assert.match(graded.correctAnswer, /B/); assert.match(graded.explanation, /supported/);
});

test('grid-in prompt and numerical graded answer extraction', () => {
  const doc = fixture(`<main><h2>Math Module 1</h2><div>Problem 2/22</div><p data-testid="prompt">What is the value of x?</p><input type="text" aria-label="Enter your answer"><div data-testid="correct-answer">Correct answer: 4</div><div data-testid="explanation">Solving the equation gives x = 4.</div></main>`);
  const problem = extractPrompt(doc); const graded = gradedData(doc);
  assert.equal(problem.responseType, 'grid_in'); assert.equal(problem.choices.length, 0); assert.match(graded.correctAnswer, /4/); assert.match(graded.explanation, /equation/);
});

test('module and section transitions are explicit', () => {
  assert.deepEqual(sectionState(fixture('<main>Reading and Writing Module 2 — Start Module</main>')), { phase:'TRANSITION', section:'reading', module:2 });
  assert.deepEqual(sectionState(fixture('<main>Math Module 1 <span>Question 3 of 22</span></main>')), { phase:'QUESTION', section:'math', module:1 });
  assert.equal(sectionState(fixture('<main>Results — Test complete</main>')).phase, 'COMPLETE');
});

test('PDF input validation rejects incomplete data and deduplicates exact identities', () => {
  const complete = { section:'math', module:1, problemNumber:1, question:'What is 2 + 2?', choices:[], responseType:'grid_in', submittedAnswer:'0', correctAnswer:'4', explanation:'Addition gives four.', figures:[], extractionWarnings:[] };
  assert.equal(dedupeAndValidate([complete, complete]).length, 1);
  assert.throws(() => dedupeAndValidate([{...complete, explanation:''}]), /Incomplete problem/);
});
