import { sectionState, navigationButton } from './extractor.js';
import { deepAll, satDocument, waitFor } from './dom.js';
import { SATRunner, startGeminiPrompt } from './runner.js';
import { buildPdfDocuments, downloadFour } from './pdf.js';
import { BUILD_INFO } from '../generated/buildInfo.js';

const ID = 'gemini-sat-pdf-export-btn';
function setStatus(button, text, error = false) { button.textContent = text; button.dataset.state = error ? 'Error' : text; button.style.background = error ? '#b3261e' : '#1a73e8'; }

async function configureSetup() {
  const root = satDocument();
  const labels = deepAll(root, 'label, [role="switch"], button');
  const reveal = labels.find(el => /show.*(answer|explanation)|정답.*(표시|보기)|해설.*표시/i.test(el.innerText || el.getAttribute('aria-label') || ''));
  if (reveal) {
    const toggle = reveal.matches('[role="switch"], input') ? reveal : reveal.querySelector('[role="switch"], input[type="checkbox"]');
    const checked = toggle?.checked ?? toggle?.getAttribute('aria-checked') === 'true';
    if (toggle && !checked) toggle.click();
    await waitFor(() => (toggle.checked ?? toggle.getAttribute('aria-checked') === 'true'), { timeout: 10000, description: 'answer/explanation toggle enabled', root });
  }
  const start = navigationButton(root, 'transition');
  if (start) start.click();
}

export function boot() {
  if (window !== window.top) return;
  const install = () => {
    if (!document.body || document.getElementById(ID)) return;
    const button = document.createElement('button'); button.id = ID; setStatus(button, 'Export to PDF');
    button.addEventListener('click', async () => {
      if (button.dataset.running === 'true') return; button.dataset.running = 'true'; button.disabled = true;
      try {
        setStatus(button, 'Starting SAT');
        if (sectionState(satDocument()).phase === 'UNKNOWN') await startGeminiPrompt();
        await configureSetup();
        const smoke = button.dataset.testMode === 'smoke';
        const runner = new SATRunner(text => setStatus(button, text), {
          maxProblems: smoke ? 1 : undefined,
          onCollect(problem, problems) {
            button.dataset.collectedCount = String(problems.length);
            button.dataset.lastRecord = JSON.stringify({ id: `${problem.section}:${problem.module}:${problem.problemNumber}`, section: problem.section, module: problem.module, problemNumber: problem.problemNumber, responseType: problem.responseType, hasQuestion: !!problem.question, hasCorrectAnswer: !!problem.correctAnswer, hasExplanation: !!problem.explanation });
          }
        });
        const problems = await runner.run();
        button.dataset.runSummary = JSON.stringify(problems.map(problem => ({ id: `${problem.section}:${problem.module}:${problem.problemNumber}`, complete: !!(problem.question && problem.correctAnswer && problem.explanation), hasPlaceholder: /\[QUESTION_NOT_EXTRACTED\]/.test(problem.question) })));
        if (smoke) { setStatus(button, 'Smoke PASS'); return; }
        setStatus(button, 'Building PDFs'); await downloadFour(buildPdfDocuments(problems)); setStatus(button, 'Done');
      } catch (error) { console.error('[Gemini SAT Exporter]', error); setStatus(button, `Error: ${error.message}`, true); }
      finally { button.dataset.running = 'false'; button.disabled = false; }
    });
    button.dataset.buildSha = BUILD_INFO.gitSha; button.dataset.buildTimestamp = BUILD_INFO.timestamp;
    document.body.appendChild(button);
  };
  install();
  new MutationObserver(install).observe(document.documentElement, { childList: true, subtree: true });
}
