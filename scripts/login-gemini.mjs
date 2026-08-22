import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const profilePath = path.join(root, '.chrome-profile');
const chromePath = process.env.PROGRAMFILES
  ? path.join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe')
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!existsSync(chromePath)) throw new Error(`Stable Google Chrome not found: ${chromePath}`);
mkdirSync(profilePath, { recursive: true });

console.log(`Chrome executable: ${chromePath}`);
console.log(`Persistent profile: ${profilePath}`);
console.log('Opening a normal Google Chrome session without Playwright or extension-loading flags.');
console.log('Sign in to Gemini, confirm the normal chat UI appears, then close this Chrome window.');

const child = spawn(chromePath, [
  `--user-data-dir=${profilePath}`,
  '--new-window',
  'https://gemini.google.com/'
], { stdio: 'inherit', windowsHide: false });

child.on('error', error => {
  console.error(`Unable to launch Google Chrome: ${error.message}`);
  process.exitCode = 1;
});

child.on('exit', code => {
  if (code && code !== 0) {
    console.error(`Google Chrome exited with code ${code}`);
    process.exitCode = code;
  } else {
    console.log('Chrome closed. The dedicated Gemini profile is ready for smoke/E2E reuse.');
  }
});
