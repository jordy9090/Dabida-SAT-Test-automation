// Gemini SAT UI 진입 후 설정 단계 (시작 버튼, 토글 클릭)
// 메시지 전송 → SAT UI 대기 → 이 모듈 실행 → Export to PDF
// 스크래핑 이전에 실행되는 사전 설정 시퀀스

import { CONFIG } from '../config/constants.js';
import { deepQuerySelectorAll } from '../dom/deepQuery.js';
import { safeClick, showToast } from '../dom/wait.js';

/**
 * '시작' 버튼 클릭
 * section-overview 내 glowing-card 첫 번째의 시작 버튼
 * @returns {Promise<boolean>} 성공 여부
 */
export async function clickStartButton() {
  console.log('[GeminiSetup] 시작 버튼 클릭 시도...');

  // 1순위: 사용자가 직접 제공한 전체 CSS 셀렉터 (가장 구체적)
  try {
    const directButton = document.querySelector(
      '#app-root > main > side-navigation-v2 > mat-sidenav-container > mat-sidenav-content > div > div.content-container > chat-window > immersive-panel > learning-immersive-panel > div > div > activity-set > section-overview > div > div > glowing-card:nth-child(1) > div > div > div.glowing-card-content > div.section-button-container.ng-star-inserted > button'
    );
    if (directButton) {
      console.log('[GeminiSetup] 시작 버튼 발견 (정확 셀렉터)');
      const clicked = await safeClick(directButton);
      if (clicked) {
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
      }
    }
  } catch (e) {
    console.warn('[GeminiSetup] 시작 버튼 직접 셀렉터 실패:', e);
  }

  // 2순위: 설정 기반 셀렉터 + 텍스트 필터
  const selectors = CONFIG.geminiSetup?.startButtonSelectors ?? [
    // 정확한 경로 (사용자 제공)
    '#app-root section-overview glowing-card:nth-child(1) .section-button-container button',
    'section-overview glowing-card:first-child .section-button-container button',
    'glowing-card .section-button-container.ng-star-inserted button',
    'activity-set section-overview .glowing-card .section-button-container button',
    // 텍스트 기반 폴백
    'button:has(span.mat-mdc-button-touch-target)',
  ];

  for (const selector of selectors) {
    try {
      const elements = deepQuerySelectorAll(selector);
      for (const el of elements) {
        const text = (el.innerText || el.textContent || '').trim().toLowerCase();
        if (text.includes('시작') || text.includes('start')) {
          console.log('[GeminiSetup] 시작 버튼 발견:', selector);
          const clicked = await safeClick(el);
          if (clicked) {
            await new Promise(resolve => setTimeout(resolve, 200));
            return true;
          }
        }
      }
    } catch (e) {
      console.warn('[GeminiSetup] 시작 버튼 셀렉터 실패:', selector, e);
    }
  }

  // touch-target span 클릭 시도 (사용자 제공 전체 경로)
  const touchTargets = deepQuerySelectorAll(
    '.glowing-card .section-button-container button span.mat-mdc-button-touch-target'
  );
  const touchTarget = touchTargets[0];
  if (touchTarget) {
    const button = touchTarget.closest('button');
    if (button && (await safeClick(button))) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return true;
    }
  }

  console.warn('[GeminiSetup] 시작 버튼을 찾지 못함');
  return false;
}

/**
 * 첫 번째 토글 스위치 클릭 (mat-mdc-slide-toggle)
 * @returns {Promise<boolean>} 성공 여부
 */
export async function clickFirstToggle() {
  console.log('[GeminiSetup] 첫 번째 토글 클릭 시도...');

  const selectors = CONFIG.geminiSetup?.firstToggleSelectors ?? [
    'button[id^="mat-mdc-slide-toggle-"]',
    '.mdc-switch',
    'span.mdc-switch__handle-track',
    'span.mdc-switch__shadow',
  ];

  for (const selector of selectors) {
    try {
      const elements = deepQuerySelectorAll(selector);
      const el = elements[0];
      if (el) {
        const clickTarget = el.tagName === 'BUTTON' ? el : el.closest('button') || el;
        console.log('[GeminiSetup] 첫 번째 토글 발견:', selector);
        const clicked = await safeClick(clickTarget);
        if (clicked) {
          await new Promise(resolve => setTimeout(resolve, 150));
          return true;
        }
      }
    } catch (e) {
      console.warn('[GeminiSetup] 첫 번째 토글 셀렉터 실패:', selector, e);
    }
  }

  console.warn('[GeminiSetup] 첫 번째 토글을 찾지 못함');
  return false;
}

/**
 * 두 번째 토글 스위치 클릭
 * 첫 번째와 다른 토글 (또는 동일 토글의 다른 클릭 영역)
 * @returns {Promise<boolean>} 성공 여부
 */
export async function clickSecondToggle() {
  console.log('[GeminiSetup] 두 번째 토글 클릭 시도...');

  const toggles = [];
  for (const selector of ['button[id^="mat-mdc-slide-toggle-"]', '.mdc-switch']) {
    const elements = deepQuerySelectorAll(selector);
    toggles.push(...elements);
  }

   // 토글이 1개 이하이면 두 번째 토글은 존재하지 않는다고 보고 스킵
   if (toggles.length < 2) {
     console.log('[GeminiSetup] 토글이 1개이므로 두 번째 토글 클릭을 스킵합니다.');
     return true;
   }

  // 두 번째 토글이 있으면 클릭 (첫 번째는 이미 클릭됨)
  const second = toggles[1];
  const clickTarget = second.tagName === 'BUTTON' ? second : second.closest('button') || second;
  const clicked = await safeClick(clickTarget);
  if (clicked) {
    await new Promise(resolve => setTimeout(resolve, 150));
    return true;
  }

  console.warn('[GeminiSetup] 두 번째 토글을 찾지 못함');
  return false;
}

/**
 * 전체 설정 시퀀스 실행
 * 1. 시작 버튼 클릭
 * 2. 첫 번째 토글 클릭
 * 3. 두 번째 토글 클릭
 * @returns {Promise<boolean>} 전체 성공 여부
 */
export async function runSetupSequence() {
  console.log('[GeminiSetup] ===== 설정 시퀀스 시작 =====');
  showToast('SAT 설정 버튼 클릭 중...', 'info');

  const timeout = CONFIG.geminiSetup?.setupSequenceTimeout ?? 15000;

  // 시작 버튼이 나타날 때까지 대기 후 클릭
  let startButtonDone = false;
  const startTime = Date.now();
  while (Date.now() - startTime < timeout && !startButtonDone) {
    startButtonDone = await clickStartButton();
    if (!startButtonDone) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  if (!startButtonDone) {
    console.warn('[GeminiSetup] 시작 버튼 클릭 실패 (계속 진행)');
  } else {
    showToast('시작 버튼 클릭 완료. 토글 설정 중...', 'info');
  }

  // 토글이 나타날 때까지 대기
  await new Promise(resolve => setTimeout(resolve, 300));

  // 첫 번째 토글: 일정 시간 동안 재시도
  let firstToggleDone = false;
  const toggleStartTime = Date.now();
  while (Date.now() - toggleStartTime < timeout && !firstToggleDone) {
    firstToggleDone = await clickFirstToggle();
    if (!firstToggleDone) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  if (!firstToggleDone) {
    console.warn('[GeminiSetup] 첫 번째 토글 클릭 실패 (계속 진행)');
  }

  await new Promise(resolve => setTimeout(resolve, 100));

  // 두 번째 토글: 첫 번째와 동일하게 재시도
  let secondToggleDone = false;
  const secondToggleStartTime = Date.now();
  while (Date.now() - secondToggleStartTime < timeout && !secondToggleDone) {
    secondToggleDone = await clickSecondToggle();
    if (!secondToggleDone) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  if (!secondToggleDone) {
    console.warn('[GeminiSetup] 두 번째 토글 클릭 실패 (계속 진행)');
  }

  console.log('[GeminiSetup] ===== 설정 시퀀스 완료 =====');
  return startButtonDone || firstToggleDone || secondToggleDone;
}
