import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
test('installable build has manifest and bundled content when present', () => {
  const root=process.cwd(), out=path.join(root,'extension-build');
  if(!existsSync(out)) return;
  const manifest=JSON.parse(readFileSync(path.join(out,'manifest.json'),'utf8'));
  assert.ok(existsSync(path.join(out,manifest.background.service_worker)));
  const background=readFileSync(path.join(out,manifest.background.service_worker),'utf8');
  assert.match(background,/dist\/content\.js/);
  assert.ok(existsSync(path.join(out,'dist/content.js')));
  assert.doesNotMatch(readFileSync(path.join(out,'dist/content.js'),'utf8'),/^\s*(?:import|export)\s/m);
});
