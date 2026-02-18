// Extracted frame election and messaging functions from content.js
// NOTE: Logic must remain identical to original implementation.

import { isQuestionScreen, getProgressState, describeDoc } from '../dom/extract.js';
import { setExportRunning } from '../dom/wait.js';

/**
 * 문제 UI가 있는 프레임인지 판정 (널널하게 잡기)
 * @returns {boolean} 문제 UI 여부
 */
export function looksLikeSatQuestionUI() {
  try {
    const text = (document.body?.innerText || document.body?.textContent || '').slice(0, 5000).toLowerCase();
    const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));

    // 0. 설정 화면(토글 + '테스트 시작' 버튼)이면 문제 화면 아님 - 먼저 '테스트 시작' 클릭 필요
    const hasStartTestButton = buttons.some(b => {
      if (!b.offsetParent || b.disabled) return false;
      const btnText = ((b.innerText || '') + ' ' + (b.getAttribute('aria-label') || '')).trim();
      return /테스트\s*시작|start\s*test/i.test(btnText);
    });
    if (hasStartTestButton) {
      const hasRealProgress = /\b\d+\s*\/\s*(27|22)\b/.test(text);
      const hasChoices = buttons.filter(b => {
        const t = ((b.innerText || '') + ' ' + (b.getAttribute('aria-label') || '')).trim();
        return /^[A-D]\b/.test(t) || /choice\s*[A-D]/i.test(t);
      }).length >= 2;
      if (!hasRealProgress || !hasChoices) {
        console.log('[SAT FRAME] 설정 화면(테스트 시작 버튼 있음) → 문제 화면 아님');
        return false;
      }
    }
    
    // 1. 진행표시 (1/27, Question 1 등)
    const hasProgress = /\b\d+\s*\/\s*\d+\b/.test(text) || /question\s*\d+/i.test(text);
    
    // 2. Next/Submit 버튼 존재
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
    
    // 같은 origin 프레임에만 probe 전송 (다른 origin에 보내면 구글 개인정보/계정 선택 창 등이 반응할 수 있음)
    const targetOrigin = location.origin;
    let sentCount = 0;
    for (let i = 0; i < window.frames.length; i++) {
      try {
        const frame = window.frames[i];
        if (frame.location && frame.location.origin === targetOrigin) {
          frame.postMessage({ type: 'SAT_PROBE', probeId }, targetOrigin);
          sentCount++;
        }
      } catch (e) {
        // cross-origin frame 접근 불가 - 스킵
      }
    }
    // 현재 창(top)에도 probe 전송 — top이 worker로 응답할 수 있도록
    window.postMessage({ type: 'SAT_PROBE', probeId }, targetOrigin);
    console.log('[FRAME] probe sent to frames', {
      frameCount: window.frames.length,
      sentCount,
      probeId: probeId
    });
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
    
    // SAT_PROBE 수신: top에서만 ok:true 허용 (iframe은 worker로 선출되지 않도록)
    if (msg.type === 'SAT_PROBE') {
      if (window.top !== window) {
        if (ev.source) {
          try {
            ev.source.postMessage({ type: 'SAT_PROBE_RESULT', probeId: msg.probeId, ok: false, isTop: false }, ev.origin || location.origin);
          } catch (_) {}
        }
        return;
      }
      console.log(`[FRAME] probe received top? ${window === window.top} href: ${window.location.href}`);
      const ok = looksLikeSatQuestionUI();
      console.log(`[FRAME] probe result: ${ok ? 'looks like SAT UI' : 'not SAT UI'}`);
      
      if (ok && ev.source) {
        const bodyTextLen = (document.body?.innerText || '').length;
        const buttons = document.querySelectorAll('button, [role="button"]').length;
        const targetOrigin = ev.origin || location.origin;
        try {
          ev.source.postMessage({
            type: 'SAT_PROBE_RESULT',
            probeId: msg.probeId,
            ok: true,
            href: window.location.href,
            title: document.title,
            isTop: window === window.top,
            bodyTextLen: bodyTextLen,
            buttons: buttons
          }, targetOrigin);
          console.log(`[FRAME] probe result sent (ok=true, bodyTextLen=${bodyTextLen}, buttons=${buttons})`);
        } catch (e) {
          console.warn('[FRAME] probe result postMessage 실패 (ev.source로 전송):', e);
        }
      } else if (!ok) {
        console.log(`[FRAME] probe result: not SAT UI, skipping response`);
      }
      return;
    }
    
    // SAT_START 수신: top frame에서만 수집/run 실행 (iframe이 받으면 무시)
    if (msg.type === 'SAT_START') {
      if (window.top !== window) {
        console.warn('[FRAME-GUARD] iframe abort', location.href);
        return;
      }
      console.log('[CTX]', {
        isTop: window.top === window,
        href: location.href,
        hasActivitySet: !!document.querySelector('activity-set'),
        choices: document.querySelectorAll('mat-action-list.choices-container button').length
      });
      console.log(`[FRAME] SAT_START received top? ${window === window.top} href: ${window.location.href}`);
      if (!looksLikeSatQuestionUI()) {
        console.log('[FRAME] SAT_START ignored: not SAT UI');
        return;
      }
      
      if (!ev.source) {
        console.warn('[FRAME] SAT_START ev.source 없음 - 결과 전송 불가');
        return;
      }
      
      const replyTarget = ev.source;
      const replyOrigin = ev.origin || location.origin;
      
      console.log('[FRAME] SAT_START received (worker frame)');
      
      // worker 프레임에서만 작업 실행
      window.__SAT_WORKER_READY = true;
      window.__SAT_IS_WORKER = true;
      
      // worker 프레임에서 실제 수집 시작
      // NOTE: SATApp, SATNavigator, isQuestionScreen, getProgressState are still in content.js
      // This will be fully integrated after all classes are moved
      (async () => {
        try {
          setExportRunning(true);
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
          const workerIsQuestion = isQuestionScreen();
          const workerProgress = getProgressState();
          try {
            if (window.top && window.top.console && window.top.console.warn) {
              window.top.console.warn('[NAV_INIT] ★ worker: 조건 체크', {
                isQuestionScreen: workerIsQuestion,
                getProgressState: workerProgress,
                willCallNav: !workerIsQuestion && workerProgress === null
              });
            }
          } catch (_) {}
          if (!workerIsQuestion && workerProgress === null) {
            console.log('[SAT WORKER] 자동 진입 시퀀스 시작');
            try { window.top?.console?.warn?.('[NAV_INIT] ★ worker에서 handleInitialNavigation 호출 직전', window.location.href); } catch(_){}
            await window.__SAT_APP.navigator.handleInitialNavigation();
          } else {
            try { window.top?.console?.warn?.('[NAV_INIT] ★ worker: handleInitialNavigation 스킵 (이미 문제 화면 또는 진행 중)', { workerIsQuestion, workerProgress }); } catch(_){}
          }
          
          // 실행 프레임 가드: SAT DOM이 있는 frame에서만 수집
          const hasSAT = !!document.querySelector('activity-set') &&
            !!document.querySelector('[data-test-id="next-button"]');
          if (!hasSAT) {
            console.warn('[FRAME-GUARD] no SAT dom in this frame, abort', describeDoc(document));
            try {
              replyTarget.postMessage({
                type: 'SAT_COLLECTION_ERROR',
                error: 'FRAME_GUARD: no SAT DOM in this frame',
                href: window.location.href
              }, replyOrigin);
            } catch (e) {}
            return;
          }
          console.log('[SAT WORKER] 문제 수집 시작');
          const allData = await window.__SAT_APP.scraper.collectAllProblems();
          
          console.log('[SAT WORKER] 문제 수집 완료:', {
            reading: allData.reading.length,
            math: allData.math.length
          });
          
          // 결과를 요청자(top frame)에만 전송 (다른 origin iframe에 전달되지 않도록)
          try {
            replyTarget.postMessage({
              type: 'SAT_COLLECTION_COMPLETE',
              data: allData,
              href: window.location.href
            }, replyOrigin);
          } catch (e) {
            console.warn('[SAT WORKER] SAT_COLLECTION_COMPLETE postMessage 실패:', e);
          }
          
        } catch (error) {
          console.error('[SAT WORKER] 수집 오류:', error);
          try {
            replyTarget.postMessage({
              type: 'SAT_COLLECTION_ERROR',
              error: error.message,
              href: window.location.href
            }, replyOrigin);
          } catch (e) {
            console.warn('[SAT WORKER] SAT_COLLECTION_ERROR postMessage 실패:', e);
          }
        } finally {
          setExportRunning(false);
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

