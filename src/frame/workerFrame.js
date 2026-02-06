// Extracted frame election and messaging functions from content.js
// NOTE: Logic must remain identical to original implementation.

import { isQuestionScreen, getProgressState } from '../dom/extract.js';

/**
 * 문제 UI가 있는 프레임인지 판정 (널널하게 잡기)
 * @returns {boolean} 문제 UI 여부
 */
export function looksLikeSatQuestionUI() {
  try {
    const text = (document.body?.innerText || document.body?.textContent || '').slice(0, 5000).toLowerCase();
    
    // 1. 진행표시 (1/27, Question 1 등)
    const hasProgress = /\b\d+\s*\/\s*\d+\b/.test(text) || /question\s*\d+/i.test(text);
    
    // 2. Next/Submit 버튼 존재
    const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
    const hasNextish = buttons.some(b => {
      const btnText = ((b.innerText || '') + ' ' + (b.getAttribute('aria-label') || '')).toLowerCase();
      return /next|다음|continue|계속|submit|제출/i.test(btnText);
    });
    
    // 3. 선택지 후보 2개 이상 (A/B/C/D)
    const hasChoiceish = buttons.filter(b => {
      const t = ((b.innerText || '') + ' ' + (b.getAttribute('aria-label') || '')).trim();
      return /^[A-D]\b/.test(t) || /\bA\b|\bB\b|\bC\b|\bD\b/.test(t) || /choice\s*[A-D]/i.test(t);
    }).length >= 2;
    
    const result = hasProgress && (hasNextish || hasChoiceish);
    
    if (result) {
      console.log('[SAT FRAME] 문제 UI 감지됨:', {
        href: window.location.href,
        isTop: window === window.top,
        bodyTextLen: text.length,
        buttons: buttons.length,
        hasProgress,
        hasNextish,
        hasChoiceish
      });
    }
    
    return result;
  } catch (e) {
    console.warn('[SAT FRAME] looksLikeSatQuestionUI 오류:', e);
    return false;
  }
}

/**
 * Worker 프레임 찾기 (모든 프레임에 probe 브로드캐스트)
 * @returns {Promise<Object|null>} worker 프레임 정보 또는 null
 */
export async function findWorkerFrame() {
  return new Promise((resolve) => {
    const probeId = `probe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let done = false;
    
    const timeout = setTimeout(() => {
      if (!done) {
        console.warn('[SAT FRAME] Worker 프레임 찾기 타임아웃 (2.5초)');
        window.removeEventListener('message', onMsg);
        resolve(null);
      }
    }, 2500);
    
    function onMsg(ev) {
      if (ev?.data?.type === 'SAT_PROBE_RESULT' && ev.data.probeId === probeId) {
        if (!done) {
          done = true;
          clearTimeout(timeout);
          window.removeEventListener('message', onMsg);
          console.log('[SAT WORKER] 선출됨:', ev.data);
          resolve(ev.data);
        }
      }
    }
    
    window.addEventListener('message', onMsg);
    
    // 모든 프레임에 브로드캐스트
    console.log('[FRAME] probe sent to N frames', {
      frameCount: window.frames.length,
      probeId: probeId
    });
    window.postMessage({ type: 'SAT_PROBE', probeId }, '*');
  });
}

/**
 * 프레임별 메시지 리스너 (각 프레임에서 실행)
 * NOTE: This function uses SATApp, SATNavigator, and other classes that are still in content.js
 * It will be fully integrated after all classes are moved to their respective modules
 */
export function setupFrameMessageListener() {
  console.log('[FRAME] initFrameMessaging/setupFrameMessageListener called', {
    top: window === window.top,
    href: window.location.href,
    frameCount: window.frames.length
  });
  
  window.addEventListener('message', async (ev) => {
    const msg = ev?.data;
    if (!msg || typeof msg !== 'object') return;
    
    // SAT_PROBE 수신: 문제 UI가 있는지 확인
    if (msg.type === 'SAT_PROBE') {
      console.log(`[FRAME] probe received top? ${window === window.top} href: ${window.location.href}`);
      const ok = looksLikeSatQuestionUI();
      console.log(`[FRAME] probe result: ${ok ? 'looks like SAT UI' : 'not SAT UI'}`);
      
      if (ok) {
        const bodyTextLen = (document.body?.innerText || '').length;
        const buttons = document.querySelectorAll('button, [role="button"]').length;
        
        window.postMessage({
          type: 'SAT_PROBE_RESULT',
          probeId: msg.probeId,
          ok: true,
          href: window.location.href,
          title: document.title,
          isTop: window === window.top,
          bodyTextLen: bodyTextLen,
          buttons: buttons
        }, '*');
        console.log(`[FRAME] probe result sent (ok=true, bodyTextLen=${bodyTextLen}, buttons=${buttons})`);
      } else {
        console.log(`[FRAME] probe result: not SAT UI, skipping response`);
      }
      return;
    }
    
    // SAT_START 수신: worker 프레임에서만 작업 시작
    if (msg.type === 'SAT_START') {
      console.log(`[FRAME] SAT_START received top? ${window === window.top} href: ${window.location.href}`);
      if (!looksLikeSatQuestionUI()) {
        console.log('[FRAME] SAT_START ignored: not SAT UI');
        return;
      }
      
      console.log('[FRAME] SAT_START received (worker frame)');
      
      // worker 프레임에서만 작업 실행
      window.__SAT_WORKER_READY = true;
      window.__SAT_IS_WORKER = true;
      
      // worker 프레임에서 실제 수집 시작
      // NOTE: SATApp, SATNavigator, isQuestionScreen, getProgressState are still in content.js
      // This will be fully integrated after all classes are moved
      (async () => {
        try {
          console.log('[SAT WORKER] ===== Worker 프레임에서 수집 시작 =====');
          
          // SATApp 인스턴스 생성 (worker frame에서)
          // NOTE: SATApp is still in content.js, will be imported later
          if (!window.__SAT_APP) {
            if (typeof SATApp !== 'undefined') {
              window.__SAT_APP = new SATApp();
            } else {
              console.error('[SAT WORKER] SATApp 클래스를 찾을 수 없습니다.');
              return;
            }
          }
          
          // 자동 진입 시퀀스 (이미 문제 화면이면 스킵)
          if (!isQuestionScreen() && getProgressState() === null) {
            console.log('[SAT WORKER] 자동 진입 시퀀스 시작');
            await window.__SAT_APP.navigator.handleInitialNavigation();
          }
          
          // 문제 수집
          console.log('[SAT WORKER] 문제 수집 시작');
          const allData = await window.__SAT_APP.scraper.collectAllProblems();
          
          console.log('[SAT WORKER] 문제 수집 완료:', {
            reading: allData.reading.length,
            math: allData.math.length
          });
          
          // 결과를 top frame에 전송
          window.postMessage({
            type: 'SAT_COLLECTION_COMPLETE',
            data: allData,
            href: window.location.href
          }, '*');
          
        } catch (error) {
          console.error('[SAT WORKER] 수집 오류:', error);
          window.postMessage({
            type: 'SAT_COLLECTION_ERROR',
            error: error.message,
            href: window.location.href
          }, '*');
        }
      })();
      
      return;
    }
  });
  
  // 프레임 로드 시 정보 출력
  const bodyTextLen = (document.body?.innerText || document.body?.textContent || '').length;
  const buttons = document.querySelectorAll('button, [role="button"]').length;
  console.log('[SAT FRAME] 프레임 로드:', {
    href: window.location.href,
    top: window === window.top,
    bodyTextLen: bodyTextLen,
    buttons: buttons
  });
}

