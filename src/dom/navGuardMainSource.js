/**
 * MAIN world NAV GUARD — 페이지(MAIN) 컨텍스트에 inject되는 스크립트 소스.
 * content script isolated world 패치는 페이지 JS에 안 먹히므로, 이 코드를 페이지에 주입해 실행.
 * exportRunning 토글은 postMessage('SAT_EXPORT_RUNNING', value)로 전달.
 */

export const NAV_GUARD_MAIN_SOURCE = `(function(){
  var DANGER_HOSTS = ['support.google.com', 'policies.google.com'];
  function getOriginSafe(urlStr, baseOrigin) {
    if (!urlStr || typeof urlStr !== 'string') return null;
    var s = String(urlStr).trim();
    if (!s || s === '#') return baseOrigin;
    try { return new URL(s, baseOrigin || 'https://example.com').origin; } catch (e) { return baseOrigin; }
  }
  function isDangerousUrl(href, allowedOrigin) {
    if (!href || typeof href !== 'string') return false;
    var origin = getOriginSafe(href, allowedOrigin);
    if (!origin) return false;
    var lower = String(href).toLowerCase();
    for (var i = 0; i < DANGER_HOSTS.length; i++) { if (lower.indexOf(DANGER_HOSTS[i]) !== -1) return true; }
    if (origin !== allowedOrigin) return true;
    return false;
  }
  function logBlocked(payload) {
    var err = new Error();
    console.warn('[NAVGUARD_MAIN] BLOCKED', Object.assign({}, payload, { stack: err.stack || '' }));
  }
  if (typeof window === 'undefined') return;
  if (window.__SAT_NAV_GUARD_INSTALLED) return;
  window.__SAT_NAV_GUARD_INSTALLED = true;
  var w = window, doc = w.document;
  var allowedOrigin = (w.location && w.location.origin) ? w.location.origin : '';
  var exportRunning = false, saved = null, captureListeners = [];
  function installPatches() {
    if (saved) return;
    var _open = w.open, _anchorClick = w.HTMLAnchorElement && w.HTMLAnchorElement.prototype && w.HTMLAnchorElement.prototype.click;
    var _assign = w.location && w.location.assign, _replace = w.location && w.location.replace;
    w.open = function(url, target, features) {
      if (!exportRunning) return _open.apply(this, arguments);
      var urlStr = url != null ? String(url) : '';
      if (isDangerousUrl(urlStr, allowedOrigin)) { logBlocked({ reason: 'window.open', url: urlStr }); return null; }
      return _open.apply(this, arguments);
    };
    if (_anchorClick) {
      w.HTMLAnchorElement.prototype.click = function() {
        if (!exportRunning) return _anchorClick.apply(this, arguments);
        var href = this.href || (this.getAttribute && this.getAttribute('href')) || '';
        var target = ((this.getAttribute && this.getAttribute('target')) || '').toLowerCase();
        var block = isDangerousUrl(href, allowedOrigin) || (target === '_blank' && href && getOriginSafe(href, allowedOrigin) !== allowedOrigin);
        if (block) { logBlocked({ reason: 'HTMLAnchorElement.click', href: href, target: target }); return; }
        return _anchorClick.apply(this, arguments);
      };
    }
    if (_assign && w.location) {
      w.location.assign = function(url) {
        if (exportRunning && isDangerousUrl(String(url || ''), allowedOrigin)) { logBlocked({ reason: 'location.assign', url: String(url) }); return; }
        return _assign.apply(this, arguments);
      };
    }
    if (_replace && w.location) {
      w.location.replace = function(url) {
        if (exportRunning && isDangerousUrl(String(url || ''), allowedOrigin)) { logBlocked({ reason: 'location.replace', url: String(url) }); return; }
        return _replace.apply(this, arguments);
      };
    }
    saved = { open: _open, anchorClick: _anchorClick, assign: _assign, replace: _replace };
  }
  function uninstallPatches() {
    if (!saved) return;
    try {
      w.open = saved.open;
      if (saved.anchorClick && w.HTMLAnchorElement && w.HTMLAnchorElement.prototype) w.HTMLAnchorElement.prototype.click = saved.anchorClick;
      if (saved.assign && w.location) w.location.assign = saved.assign;
      if (saved.replace && w.location) w.location.replace = saved.replace;
    } catch (e) { console.warn('[NAVGUARD_MAIN] uninstall error', e); }
    saved = null;
  }
  function blockIfDangerousLink(e) {
    if (!exportRunning) return;
    var a = (e.target && e.target.closest && e.target.closest('a[href]')) || (e.target && e.target.tagName === 'A' ? e.target : null);
    if (!a) return;
    var href = (a.getAttribute && a.getAttribute('href')) || a.href || '';
    var target = ((a.getAttribute && a.getAttribute('target')) || '').toLowerCase();
    if (!href) return;
    var block = isDangerousUrl(href, allowedOrigin) || (target === '_blank' && getOriginSafe(href, allowedOrigin) !== allowedOrigin);
    if (block) { e.preventDefault(); e.stopImmediatePropagation(); logBlocked({ reason: 'capture_' + e.type, href: href, target: target }); }
  }
  function installCaptureListeners() {
    if (captureListeners.length) return;
    var events = ['click', 'auxclick', 'pointerup', 'mouseup'];
    for (var i = 0; i < events.length; i++) { doc.addEventListener(events[i], blockIfDangerousLink, true); captureListeners.push({ ev: events[i], h: blockIfDangerousLink }); }
    var keyHandler = function(e) {
      if (!exportRunning || (e.key !== 'Enter' && e.key !== ' ')) return;
      var a = (e.target && e.target.closest && e.target.closest('a[href]')) || (e.target && e.target.tagName === 'A' ? e.target : null);
      if (!a) return;
      var href = (a.getAttribute && a.getAttribute('href')) || a.href || '';
      if (!href || !isDangerousUrl(href, allowedOrigin)) return;
      e.preventDefault(); e.stopImmediatePropagation(); logBlocked({ reason: 'keydown', href: href });
    };
    doc.addEventListener('keydown', keyHandler, true);
    captureListeners.push({ ev: 'keydown', h: keyHandler });
  }
  function uninstallCaptureListeners() {
    for (var i = 0; i < captureListeners.length; i++) doc.removeEventListener(captureListeners[i].ev, captureListeners[i].h, true);
    captureListeners = [];
  }
  w.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'SAT_EXPORT_RUNNING') {
      exportRunning = !!e.data.value;
      console.log('[NAVGUARD_MAIN] message', { value: exportRunning, href: w.location.href, isTop: w === w.top });
      if (exportRunning) { installPatches(); installCaptureListeners(); }
      else { uninstallPatches(); uninstallCaptureListeners(); }
    }
  });
  console.log('[NAVGUARD_MAIN] installed', { href: w.location.href, isTop: w === w.top, hasOpenerPatch: !!w.__SAT_NAV_GUARD_INSTALLED });
})();`;
