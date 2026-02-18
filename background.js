/**
 * Export 중 support.google.com / policies.google.com 탭 생성 원천 차단.
 * content script의 MAIN 패치가 먹지 않는 경우(다른 프레임/확장 API) 대비.
 */

const DANGER_HOSTS = ['support.google.com', 'policies.google.com'];

function isDangerousUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const lower = url.toLowerCase();
  return DANGER_HOSTS.some(h => lower.includes(h));
}

let exportRunning = false;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'EXPORT_RUNNING') {
    exportRunning = !!msg.value;
    console.log('[BG] EXPORT_RUNNING', { value: exportRunning });
    sendResponse({ ok: true });
  }
  return true;
});

chrome.tabs.onCreated.addListener(tab => {
  const url = tab.pendingUrl || tab.url || '';
  console.log('[BG] tab created', { tabId: tab.id, url, openerTabId: tab.openerTabId });
  if (!exportRunning) return;
  if (!isDangerousUrl(url)) return;
  chrome.tabs.remove(tab.id, () => {
    console.warn('[BG] tab removed', { tabId: tab.id, url, reason: 'blocked external during export' });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' && changeInfo.status !== 'complete') return;
  const url = tab.url || changeInfo.url || '';
  if (!exportRunning || !isDangerousUrl(url)) return;
  chrome.tabs.remove(tabId, () => {
    console.warn('[BG] tab removed', { tabId, url, reason: 'blocked external during export (onUpdated)' });
  });
});
