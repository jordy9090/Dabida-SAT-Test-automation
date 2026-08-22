import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const mode = process.argv[2] === 'full' ? 'full' : 'smoke';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extensionPath = path.join(root, 'extension-build');
const profilePath = path.join(root, '.chrome-profile');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const resultPath = path.join(root, 'test-results', 'live-gemini', stamp);
const downloadPath = path.join(resultPath, 'downloads');
mkdirSync(profilePath, { recursive: true }); mkdirSync(downloadPath, { recursive: true });
const build = JSON.parse(readFileSync(path.join(extensionPath, 'dist', 'build-info.json'), 'utf8'));
const gitSha = execFileSync('git', ['rev-parse','--short','HEAD'], { cwd: root, encoding:'utf8' }).trim();
const logs = [], errors = [], downloads = [];
let page, context;

console.log(`Mode: ${mode}`);
console.log(`Extension: ${extensionPath}`);
console.log(`Git SHA: ${gitSha}`);
console.log(`Build timestamp: ${build.timestamp}`);
console.log(`Chrome executable: ${chromium.executablePath()} (Playwright Chromium, extension-capable)`);
console.log(`Persistent profile: ${profilePath}`);

async function evidence(error) {
  mkdirSync(resultPath, { recursive:true });
  const button = await page?.locator('#gemini-sat-pdf-export-btn').evaluateAll(nodes => nodes.map(n => ({ text:n.textContent, state:n.dataset.state, collected:n.dataset.collectedCount, lastRecord:n.dataset.lastRecord }))).catch(()=>[]);
  const body = (await page?.locator('body').innerText({ timeout:3000 }).catch(()=> '')) || '';
  await page?.screenshot({ path:path.join(resultPath,'failure.png'), fullPage:true }).catch(()=>{});
  writeFileSync(path.join(resultPath,'failure.json'), JSON.stringify({ mode, message:error.message, url:page?.url(), button, visibleText:body.slice(0,5000), console:logs.slice(-300), pageErrors:errors }, null, 2));
  console.error(`Failure evidence: ${resultPath}`);
}

try {
  context = await chromium.launchPersistentContext(profilePath, { headless:false, acceptDownloads:true, args:[`--disable-extensions-except=${extensionPath}`,`--load-extension=${extensionPath}`] });
  page = context.pages()[0] || await context.newPage();
  page.on('console', msg => { const text=msg.text(); logs.push(`[${msg.type()}] ${text}`); if(/Gemini SAT Exporter/.test(text)) console.log(`BROWSER ${text}`); });
  page.on('pageerror', error => errors.push(error.stack || error.message));
  page.on('download', async download => { const name=download.suggestedFilename(), target=path.join(downloadPath,name); await download.saveAs(target); downloads.push(target); console.log(`DOWNLOAD ${name}`); });
  await page.goto('https://gemini.google.com/', { waitUntil:'domcontentloaded', timeout:120000 });
  const signedIn = async () => {
    const inputVisible = await page.locator('[contenteditable="true"][role="textbox"], textarea').first().isVisible().catch(()=>false);
    const text = await page.locator('body').innerText().catch(()=> '');
    return inputVisible && !/(^|\n)\s*(sign in|로그인)\s*(\n|$)/im.test(text);
  };
  if (!await signedIn()) {
    console.log('Please sign in to Gemini in the opened Chrome window. The test will continue after authentication.');
    const deadline=Date.now()+30*60*1000; let stable=0;
    while(Date.now()<deadline) { stable = await signedIn() ? stable+1 : 0; if(stable>=5) break; await page.waitForTimeout(1000); }
    if(stable<5) throw new Error('Timed out waiting for first-time Gemini login');
  }
  console.log('Authenticated Gemini chat UI detected.');
  const button = page.locator('#gemini-sat-pdf-export-btn');
  await button.first().waitFor({ state:'visible', timeout:30000 });
  const count = await button.count(); if (count !== 1) throw new Error(`Expected exactly one Export button, found ${count}`);
  const browserBuild = await button.evaluate(el => ({ sha:el.dataset.buildSha, timestamp:el.dataset.buildTimestamp }));
  if (browserBuild.sha !== build.gitSha || browserBuild.timestamp !== build.timestamp) throw new Error('STALE EXTENSION BUILD');
  console.log(`Browser build identity verified: ${browserBuild.sha} ${browserBuild.timestamp}`);
  if (mode === 'smoke') await button.evaluate(el => { el.dataset.testMode='smoke'; });
  await button.click();
  if (mode === 'smoke') {
    await page.waitForFunction(() => document.querySelector('#gemini-sat-pdf-export-btn')?.dataset.state === 'Smoke PASS' || document.querySelector('#gemini-sat-pdf-export-btn')?.dataset.state === 'Error', null, { timeout:10*60*1000 });
    const result = await button.evaluate(el => ({ state:el.dataset.state, record:JSON.parse(el.dataset.lastRecord || 'null') }));
    if (result.state !== 'Smoke PASS') throw new Error(await button.textContent());
    if (!result.record?.hasQuestion || !result.record?.hasCorrectAnswer || !result.record?.hasExplanation) throw new Error('Smoke record is incomplete');
    console.log(`PASS: real ${result.record.section} M${result.record.module} #${result.record.problemNumber} completed answer → grade → extraction.`);
  } else {
    await page.waitForFunction(() => ['Done','Error'].includes(document.querySelector('#gemini-sat-pdf-export-btn')?.dataset.state), null, { timeout:3*60*60*1000 });
    if ((await button.getAttribute('data-state')) !== 'Done') throw new Error(await button.textContent());
    const summary = JSON.parse(await button.getAttribute('data-run-summary') || '[]');
    const ids = summary.map(record => record.id);
    if (!summary.length || summary.some(record => !record.complete || record.hasPlaceholder)) throw new Error('Collected problem records are incomplete or contain QUESTION_NOT_EXTRACTED');
    if (new Set(ids).size !== ids.length) throw new Error('Duplicate problem IDs found in completed run');
    await page.waitForTimeout(2000);
    const pdfs=readdirSync(downloadPath).filter(name=>name.toLowerCase().endsWith('.pdf'));
    const expected=['SAT_Reading_Problems_','SAT_Reading_Answers_','SAT_Math_Problems_','SAT_Math_Answers_'];
    if(pdfs.length!==4 || expected.some(prefix=>!pdfs.some(name=>name.startsWith(prefix)))) throw new Error(`Expected exactly four named PDFs, got: ${pdfs.join(', ')}`);
    for(const name of pdfs) if(statSync(path.join(downloadPath,name)).size===0) throw new Error(`Empty PDF: ${name}`);
    console.log(`PASS: full Gemini SAT completed with exactly four non-empty PDFs in ${downloadPath}`);
  }
} catch (error) {
  await evidence(error); console.error(`FAIL: ${error.message}`); process.exitCode=1;
} finally { await context?.close().catch(()=>{}); }
