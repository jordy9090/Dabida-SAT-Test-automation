import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const timestamp = new Date().toISOString();
let gitSha = 'nogit';
try { gitSha = execFileSync('git', ['rev-parse','--short','HEAD'], { cwd: root, encoding: 'utf8' }).trim(); } catch {}
writeFileSync(path.join(root,'src/generated/buildInfo.js'), `export const BUILD_INFO = ${JSON.stringify({ timestamp, gitSha })};\n`);
mkdirSync(path.join(root,'dist'), { recursive: true });
await build({ entryPoints:[path.join(root,'content.js')], bundle:true, format:'iife', platform:'browser', target:'chrome120', outfile:path.join(root,'dist/content.js'), sourcemap:true, banner:{js:`// Gemini SAT PDF Exporter ${gitSha} ${timestamp}`} });
writeFileSync(path.join(root,'dist/build-info.json'), JSON.stringify({ timestamp, gitSha }, null, 2));
if (!process.argv.includes('--bundle-only')) {
  const out = path.join(root,'extension-build'); rmSync(out,{recursive:true,force:true}); mkdirSync(path.join(out,'dist'),{recursive:true});
  for (const file of ['manifest.json','jspdf.umd.min.js','styles.css']) cpSync(path.join(root,file),path.join(out,file));
  for (const file of ['content.js','content.js.map','build-info.json']) cpSync(path.join(root,'dist',file),path.join(out,'dist',file));
  execFileSync(process.execPath,[path.join(root,'scripts/verify-extension.mjs')],{cwd:root,stdio:'inherit'});
}
console.log(`Built Gemini SAT Exporter ${gitSha} at ${timestamp}`);
