const GEMINI_URL = /^https:\/\/gemini\.google\.com\//;

async function inject(tabId) {
  try {
    await chrome.scripting.insertCSS({ target: { tabId }, files: ['styles.css'] });
    await chrome.scripting.executeScript({ target: { tabId }, files: ['jspdf.umd.min.js', 'dist/content.js'] });
    console.info('[Gemini SAT Exporter] injected built runtime', { tabId });
  } catch (error) {
    console.error('[Gemini SAT Exporter] injection failed', { tabId, message: error.message });
  }
}

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId === 0 && GEMINI_URL.test(details.url)) inject(details.tabId);
}, { url: [{ hostEquals: 'gemini.google.com', schemes: ['https'] }] });
