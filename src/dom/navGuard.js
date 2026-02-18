/**
 * NAV GUARD: exportRunning 동안 외부/위험 URL 새 탭·탭 열기 원천 차단
 * - HTMLAnchorElement.prototype.click, window.open monkey-patch
 * - 차단 시 [NAVGUARD] BLOCKED + href/url + stack 로그
 * - top document / worker frame 각자 자신의 document에 설치 (setExportRunning 호출 시 해당 컨텍스트에 적용)
 */

const DANGER_HOSTS = ['support.google.com', 'policies.google.com'];

function getOriginSafe(urlStr, baseOrigin) {
  if (!urlStr || typeof urlStr !== 'string') return null;
  const s = urlStr.trim();
  if (!s || s === '#') return baseOrigin;
  try {
    return new URL(s, baseOrigin || 'https://example.com').origin;
  } catch {
    return baseOrigin;
  }
}

function isDangerousUrl(href, allowedOrigin) {
  if (!href || typeof href !== 'string') return false;
  const origin = getOriginSafe(href, allowedOrigin);
  if (!origin) return false;
  const lower = href.toLowerCase();
  if (DANGER_HOSTS.some(h => lower.includes(h))) return true;
  if (origin !== allowedOrigin) return true; // 외부 도메인
  return false;
}

function logBlocked(payload) {
  const stack = new Error().stack || '';
  console.warn('[NAVGUARD] BLOCKED', {
    ...payload,
    stack: stack.split('\n').slice(2).join('\n'),
  });
}

let saved = null;

/**
 * 현재 window/document 컨텍스트에 가드 설치.
 * @param {() => boolean} isActive - exportRunning 여부 (getter)
 */
export function installNavGuard(isActive) {
  const w = typeof window !== 'undefined' ? window : globalThis;
  const doc = w.document;
  if (!w || !doc) return;

  if (saved) return; // 이미 이 컨텍스트에 설치됨
  const allowedOrigin = w.location?.origin || '';

  const _open = w.open;
  const _anchorClick = w.HTMLAnchorElement?.prototype?.click;
  const _assign = w.location?.assign;
  const _replace = w.location?.replace;

  w.open = function openGuard(url, target, features) {
    if (!isActive()) return _open.apply(this, arguments);
    const urlStr = url != null ? String(url) : '';
    if (isDangerousUrl(urlStr, allowedOrigin)) {
      logBlocked({
        reason: 'window.open',
        url: urlStr,
        exportRunning: true,
        frame: w === w.top ? 'top' : 'iframe',
      });
      return null;
    }
    return _open.apply(this, arguments);
  };

  if (_anchorClick) {
    w.HTMLAnchorElement.prototype.click = function anchorClickGuard() {
      if (!isActive()) return _anchorClick.apply(this, arguments);
      const href = this.href || this.getAttribute?.('href') || '';
      const target = (this.getAttribute?.('target') || '').toLowerCase();
      const block =
        isDangerousUrl(href, allowedOrigin) ||
        (target === '_blank' && href && getOriginSafe(href, allowedOrigin) !== allowedOrigin);
      if (block) {
        logBlocked({
          reason: 'HTMLAnchorElement.click',
          href,
          target: this.getAttribute?.('target') || '',
          exportRunning: true,
          frame: w === w.top ? 'top' : 'iframe',
          tagName: this.tagName,
        });
        return;
      }
      return _anchorClick.apply(this, arguments);
    };
  }

  if (_assign && w.location) {
    w.location.assign = function assignGuard(url) {
      if (isActive() && isDangerousUrl(String(url || ''), allowedOrigin)) {
        logBlocked({ reason: 'location.assign', url: String(url), exportRunning: true, frame: w === w.top ? 'top' : 'iframe' });
        return;
      }
      return _assign.apply(this, arguments);
    };
  }
  if (_replace && w.location) {
    w.location.replace = function replaceGuard(url) {
      if (isActive() && isDangerousUrl(String(url || ''), allowedOrigin)) {
        logBlocked({ reason: 'location.replace', url: String(url), exportRunning: true, frame: w === w.top ? 'top' : 'iframe' });
        return;
      }
      return _replace.apply(this, arguments);
    };
  }

  saved = { open: _open, anchorClick: _anchorClick, assign: _assign, replace: _replace, window: w };
}

export function uninstallNavGuard() {
  if (!saved) return;
  const w = saved.window;
  try {
    w.open = saved.open;
    if (saved.anchorClick && w.HTMLAnchorElement?.prototype) {
      w.HTMLAnchorElement.prototype.click = saved.anchorClick;
    }
    if (saved.assign && w.location) w.location.assign = saved.assign;
    if (saved.replace && w.location) w.location.replace = saved.replace;
  } catch (e) {
    console.warn('[NAVGUARD] uninstall error', e);
  }
  saved = null;
}

/** exportRunning 중 클릭 원인 추적용: 캡처 단계 로깅만 (차단은 monkey-patch가 담당) */
export function installClickLogger(isActive) {
  const w = typeof window !== 'undefined' ? window : globalThis;
  const doc = w?.document;
  if (!doc) return () => {};

  const handler = (e) => {
    if (!isActive()) return;
    const t = e.target;
    const a = t?.closest?.('a[href]') || (t?.tagName === 'A' ? t : null);
    const href = a?.getAttribute?.('href') ?? a?.href ?? '';
    const path = e.composedPath?.()?.slice?.(0, 4)?.map?.(n => n?.tagName || n?.nodeName) ?? [];
    console.log('[NAVGUARD] click log', {
      isTrusted: e.isTrusted,
      targetTag: t?.tagName,
      href: href ? String(href).slice(0, 120) : '',
      composedPath: path,
      frame: w === w.top ? 'top' : 'iframe',
    });
  };
  doc.addEventListener('click', handler, true);
  return () => doc.removeEventListener('click', handler, true);
}
