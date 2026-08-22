export const norm = value => String(value || '').replace(/\s+/g, ' ').trim();

export function deepAll(root, selector) {
  const found = [], seen = new Set();
  const visit = node => {
    if (!node || seen.has(node)) return;
    seen.add(node);
    try { found.push(...node.querySelectorAll(selector)); } catch {}
    let elements = [];
    try { elements = node.querySelectorAll('*'); } catch {}
    for (const element of elements) if (element.shadowRoot) visit(element.shadowRoot);
  };
  visit(root);
  return [...new Set(found)];
}

export function visible(element) {
  if (!element || element.disabled || element.getAttribute?.('aria-disabled') === 'true') return false;
  const rect = element.getBoundingClientRect?.();
  if (rect && (rect.width > 0 || rect.height > 0)) return true;
  return typeof getComputedStyle !== 'function' || getComputedStyle(element).display !== 'none';
}

export const textOf = element => norm(element?.innerText || element?.textContent);

export function findByText(root, selector, patterns) {
  const regexes = patterns.map(pattern => pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i'));
  return deepAll(root, selector).find(element => visible(element) && regexes.some(regex => regex.test(textOf(element) || norm(element.getAttribute?.('aria-label')))));
}

export async function waitFor(predicate, { timeout = 20000, description = 'condition', root = document } = {}) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const result = await predicate();
    if (result) return result;
    await new Promise(resolve => {
      const observer = new MutationObserver(() => { observer.disconnect(); clearTimeout(timer); resolve(); });
      observer.observe(root.documentElement || root, { subtree: true, childList: true, attributes: true, characterData: true });
      const timer = setTimeout(() => { observer.disconnect(); resolve(); }, 250);
    });
  }
  throw new Error(`Timed out after ${timeout}ms waiting for ${description}`);
}

export function satDocument() {
  const candidates = [document];
  const visit = win => {
    for (let i = 0; i < win.frames.length; i += 1) {
      try {
        const frame = win.frames[i];
        if (new URL(frame.location.href).hostname !== 'gemini.google.com') continue;
        candidates.push(frame.document); visit(frame);
      } catch {}
    }
  };
  visit(window.top);
  const score = doc => {
    const text = norm(doc.body?.innerText);
    return (/(reading|writing|math|수학|읽기)/i.test(text) ? 2 : 0) + (/(question|problem|문제)\s*\d+/i.test(text) ? 3 : 0) + deepAll(doc, '[role="radio"], input[type="radio"], input[type="text"], [role="textbox"]').length;
  };
  return candidates.sort((a, b) => score(b) - score(a))[0];
}

export async function clickAndWait(element, changed, description, root = document) {
  if (!element || !visible(element)) throw new Error(`Cannot click ${description}`);
  element.scrollIntoView?.({ block: 'center' }); element.click();
  return waitFor(changed, { timeout: 20000, description: `${description} state transition`, root });
}
