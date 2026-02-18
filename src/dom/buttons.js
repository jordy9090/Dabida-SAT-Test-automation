// Extracted button helper from content.js
// NOTE: Logic must remain identical to original implementation.

import { deepQuerySelectorAll, isElementVisible, dumpHTMLStructure } from './deepQuery.js';
import { waitForContentLoad, waitForCondition } from './wait.js';
import { getCurrentProblemNumber, getProgressState, getQuestionSignature } from './extract.js';
import { findSatRoot, selectNextButton, findNavigationButton } from './query.js';
import { TEMP_MODE } from '../config/constants.js';

// 진행 상황 숫자 읽기 (progress UI에서 직접 파싱)
function readProgressNumber() {
  const progressState = getProgressState();
  if (!progressState) return null;
  
  const match = progressState.match(/(\d+)\s*\/\s*(\d+)/);
  if (match) {
    return parseInt(match[1]);
  }
  return null;
}

/** 버튼 후보가 클릭해도 안전한지 (새 탭/링크 방지) */
function isSafeButton(btn) {
  if (btn.tagName === 'A') {
    const href = btn.getAttribute('href');
    const target = btn.getAttribute('target');
    if (href && (href.startsWith('http') || target === '_blank' || target === '_new')) return false;
    if (href && href !== '#' && !href.startsWith('javascript:')) return false;
  }
  if (btn.hasAttribute('href') && btn.getAttribute('href') !== '#' && !btn.getAttribute('href').startsWith('javascript:')) return false;
  if (btn.getAttribute('target') === '_blank' || btn.getAttribute('target') === '_new') return false;
  return true;
}

export function findButtonByText(...labels) {
  const buttons = Array.from(deepQuerySelectorAll('button, [role="button"]'));
  return buttons.find(btn => {
    if (!isElementVisible(btn) || btn.disabled) return false;
    if (!isSafeButton(btn)) {
      if (btn.tagName === 'A' || btn.hasAttribute('href')) console.warn('[SAT-DEBUG] 링크/새창 요소 제외:', btn.getAttribute?.('href'), btn.getAttribute?.('target'));
      return false;
    }
    const text = (btn.innerText || btn.textContent || '').trim();
    const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
    return labels.some(label => text.includes(label) || ariaLabel.includes(label));
  });
}

/**
 * 지정한 root 내부에서만 텍스트로 버튼 검색 (설정 화면에서 푸터/구글 링크 클릭 방지)
 * @param {Element} root - 검색 범위 (예: activity-set, learning-immersive-panel)
 * @param {...string} labels - 찾을 버튼 텍스트들
 * @returns {Element|null}
 */
export function findButtonByTextInRoot(root, ...labels) {
  if (!root || !root.querySelectorAll) return findButtonByText(...labels);
  const buttons = Array.from(deepQuerySelectorAll('button, [role="button"]', root));
  return buttons.find(btn => {
    if (!isElementVisible(btn) || btn.disabled) return false;
    if (!isSafeButton(btn)) return false;
    const text = (btn.innerText || btn.textContent || '').trim();
    const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
    return labels.some(label => text.includes(label) || ariaLabel.includes(label));
  }) || null;
}

// getSatRoot는 query.js의 findSatRoot로 대체됨 (순환 의존성 해결)
// Re-export for backward compatibility
export { findSatRoot as getSatRoot } from './query.js';

// selectNextButton과 findNavigationButton은 query.js로 이동됨
// Re-export for backward compatibility
export { selectNextButton, findNavigationButton } from './query.js';

// 다음은 buttons.js에 남아있는 함수들 (클릭 액션만)

// 제출 버튼 클릭 (확인 팝업 처리 포함) - satRoot 스코프로 제한
// onAfterConfirmClick: 확인 버튼 클릭 직후, waitForContentLoad 전에 실행되는 콜백 (27번 등 화면 전환 빠른 케이스에서 정답 캡처용)
export async function clickSubmitWithConfirmation(onAfterConfirmClick) {
  console.log('[SUBMIT] 제출 버튼 찾는 중...');
  
  // SAT root container 찾기
  const satRoot = findSatRoot();
  if (!satRoot) {
    console.error('[SUBMIT] satRoot not found, 제출 버튼 찾기 실패');
    return false;
  }
  
  // 이미 확인 팝업이 열려 있는지 먼저 확인 (모듈 완료 시)
  const modalsFirst = document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="dialog"], [class*="cdk-overlay-pane"]');
  for (const modal of modalsFirst) {
    if (!isElementVisible(modal)) continue;
    const modalButtons = modal.querySelectorAll('button, [role="button"]');
    for (const btn of modalButtons) {
      if (!isElementVisible(btn) || btn.disabled) continue;
      const text = (btn.innerText || btn.textContent || '').trim();
      const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
      if ((text === '제출' || text.includes('Submit') || text === '확인') && !text.includes('취소')) {
        console.log('[SUBMIT] 이미 열린 확인 팝업에서 제출 버튼 클릭');
        btn.click();
        if (typeof onAfterConfirmClick === 'function') {
          await onAfterConfirmClick();
        }
        await new Promise(resolve => setTimeout(resolve, 250));
        return true;
      }
    }
  }
  
  // 제출 버튼 텍스트 후보 확장 (정답 확인/Check/Answer 포함)
  const SUBMIT_KEYWORDS_KO = ['제출', '정답', '확인', '채점', '정답 확인', '정답확인', '채점하기', '정답보기'];
  const SUBMIT_KEYWORDS_EN = ['submit', 'check', 'answer', 'confirm', 'check answer', 'checkanswer', 'show answer', 'view answer'];
  
  // choice 클릭 후 enable 대기
  await new Promise(resolve => setTimeout(resolve, 15));
  
  // Step 1: satRoot 안에서 button / [role="button"] 전부 수집
  const allButtons = Array.from(satRoot.querySelectorAll('button, [role="button"]'));
  console.log(`[SUBMIT] satRoot 내부 버튼: ${allButtons.length}개`);
  
  // Step 2: 먼저 visible, 없으면 존재 기준 (화면 밖 제출 버튼 대응)
  let buttonsToScore = allButtons.filter(b => {
    if (b.disabled) return false;
    if (!satRoot.contains(b)) return false;
    return true;
  });
  const visibleButtons = buttonsToScore.filter(b => isElementVisible(b));
  if (visibleButtons.length > 0) buttonsToScore = visibleButtons;
  else console.log('[SUBMIT] visible 버튼 0개 → 존재 기준으로 제출 버튼 검색');
  
  console.log(`[DIAG] buttons to score: ${buttonsToScore.length} (visible: ${visibleButtons.length})`);
  
  // Step 3: 텍스트 키워드 점수화
  const candidates = [];
  for (const btn of buttonsToScore) {
    const text = (btn.innerText || btn.textContent || '').trim();
    const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
    const dataTestId = (btn.getAttribute('data-testid') || '').trim();
    const combined = (text + ' ' + ariaLabel).toLowerCase();
    
    let score = 0;
    
    // 텍스트 키워드 매칭
    for (const keyword of [...SUBMIT_KEYWORDS_KO, ...SUBMIT_KEYWORDS_EN]) {
      if (text.includes(keyword) || ariaLabel.includes(keyword)) {
        score += 5;
      }
      if (combined.includes(keyword.toLowerCase())) {
        score += 3;
      }
    }
    
    // 데이터 속성 우선: data-testid / aria-label 포함 시 가산점
    if (dataTestId && (dataTestId.includes('submit') || dataTestId.includes('check') || dataTestId.includes('confirm'))) {
      score += 8;
    }
    if (ariaLabel && (ariaLabel.includes('제출') || ariaLabel.includes('submit') || ariaLabel.includes('check'))) {
      score += 6;
    }
    
    if (score > 0) {
      candidates.push({ button: btn, score, text, ariaLabel, dataTestId });
    }
  }
  
  // 점수 순으로 정렬
  candidates.sort((a, b) => b.score - a.score);
  
  if (candidates.length === 0) {
    console.log('[SUBMIT] 제출 버튼 없음 — 즉시 채점 경로로 간주, grading 대기로 진행');
    return true;
  }
  
  const submitButton = candidates[0].button;
  console.log(`[SUBMIT] 제출 버튼 발견: "${candidates[0].text}" (점수: ${candidates[0].score})`);
  
  // 제출 버튼 클릭 (화면 밖이어도 scrollIntoView 후 클릭)
  console.log('[SUBMIT] 제출 버튼 scrollIntoView 후 클릭');
  submitButton.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
  await new Promise(resolve => setTimeout(resolve, 80));
  submitButton.click();
  await waitForContentLoad(120);
  
  // 확인 팝업 대기 및 처리 (satRoot 내부 또는 모달 내부에서 찾기)
  const maxWait = 40; // 최대 2초 대기 (50ms * 40)
  for (let i = 0; i < maxWait; i++) {
    await new Promise(resolve => setTimeout(resolve, 30));
    
    // 확인 팝업의 제출 버튼 찾기 (모달 내부 우선)
    const modals = document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="dialog"]');
    let confirmSubmitButton = null;
    
    // 모달 내부에서 찾기
    for (const modal of modals) {
      if (!isElementVisible(modal)) continue;
      const modalButtons = modal.querySelectorAll('button, [role="button"]');
      for (const btn of modalButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || '').trim();
        const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
        if (text.includes('제출') || text.includes('Submit') || text.includes('확인') || 
            ariaLabel.includes('제출') || ariaLabel.includes('Submit') || ariaLabel.includes('확인')) {
          confirmSubmitButton = btn;
          break;
        }
      }
      if (confirmSubmitButton) break;
    }
    
    // satRoot 내부에서도 찾기
    if (!confirmSubmitButton) {
      const satRootButtons = satRoot.querySelectorAll('button, [role="button"]');
      for (const btn of satRootButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || '').trim();
        if (text.includes('제출') || text.includes('Submit') || text.includes('확인')) {
          confirmSubmitButton = btn;
          break;
        }
      }
    }
    
    if (confirmSubmitButton) {
      console.log('[SUBMIT] 확인 팝업에서 제출 버튼 클릭');
      confirmSubmitButton.click();
      if (typeof onAfterConfirmClick === 'function') {
        await onAfterConfirmClick();
      }
      await waitForContentLoad(150);
      return true;
    }
  }
  
  console.warn('[SUBMIT] 확인 팝업을 찾을 수 없습니다. (팝업이 없을 수도 있음)');
  if (typeof onAfterConfirmClick === 'function') {
    await onAfterConfirmClick();
  }
  return true; // 팝업이 없을 수도 있음
}

// 다음 버튼 클릭 로직 강화 (다양한 셀렉터, 비활성화 대기, 문제 번호 변경 확인)
export async function clickNextButtonWithFallback(beforeProblemNum) {
  // 클릭 중복 방지: unique callId 생성
  const callId = `next_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  let clickCount = 0;
  const MAX_CLICKS_PER_CALL = 2; // 같은 callId에서 최대 2번까지 허용 (UI 지연 시 폴백 클릭 허용)
  
  console.log(`[NEXT-DEBUG] clickNextButtonWithFallback 시작 callId=${callId}, beforeProblemNum=${beforeProblemNum}`);
  console.log('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 시작');
  const maxRetries = 3;
  let alternativeCandidates = [];
  
  for (let retry = 0; retry < maxRetries; retry++) {
    if (retry > 0) {
      console.log(`[SAT PDF Exporter] 다음 버튼 클릭 재시도 ${retry}/${maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    
    // STEP 2: 진행 상황 읽기 (클릭 전)
    const prevProgress = readProgressNumber();
    console.log(`[SAT-DEBUG] [STEP 2] 클릭 전 진행 상황: ${prevProgress}`);
    
    // 다음 버튼 찾기 (STEP 1: 엄격한 선택 우선)
    let nextButton = null;
    
    // 방법 1: selectNextButton 사용 (엄격한 필터링)
    nextButton = selectNextButton();
    
    // 방법 2: findNavigationButton 사용 (폴백)
    if (!nextButton) {
      nextButton = findNavigationButton('next', '다음', 'next');
    }
    
    // 대체 후보 수집 (나중에 사용할 수 있도록)
    if (nextButton && alternativeCandidates.length === 0) {
      const allCandidates = [];
      const allButtons = deepQuerySelectorAll('button, [role="button"], div[role="button"]');
      for (const btn of allButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || '').trim();
        const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
        const dataTestId = (btn.getAttribute('data-testid') || '').trim();
        if ((text.includes('다음') || text.toLowerCase().includes('next') || 
             ariaLabel.includes('다음') || ariaLabel.toLowerCase().includes('next') ||
             dataTestId.includes('next')) && btn !== nextButton) {
          allCandidates.push(btn);
        }
      }
      alternativeCandidates = allCandidates.slice(0, 3); // 상위 3개만 저장
      console.log(`[SAT-DEBUG] 대체 후보 ${alternativeCandidates.length}개 수집`);
    }
    
    // 방법 2: XPath로 찾기
    if (!nextButton) {
      const xpathSelectors = [
        "//span[text()='다음']",
        "//span[text()='Next']",
        "//button[contains(text(), '다음')]",
        "//button[contains(text(), 'Next')]"
      ];
      
      for (const xpath of xpathSelectors) {
        try {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          const element = result.singleNodeValue;
          if (element && (element.tagName === 'BUTTON' || element.closest('button'))) {
            nextButton = element.tagName === 'BUTTON' ? element : element.closest('button');
            if (nextButton && nextButton.offsetParent) {
              console.log(`[SAT PDF Exporter] 다음 버튼 발견 (XPath: ${xpath})`);
              break;
            }
          }
        } catch (e) {
          // XPath 실패 시 무시
        }
      }
    }
    
    // 방법 3: 클래스명으로 찾기
    if (!nextButton) {
      const classSelectors = [
        'button.mat-mdc-unelevated-button',
        'button[class*="next"]',
        'button[class*="Next"]',
        'button[aria-label*="next"]',
        'button[aria-label*="다음"]'
      ];
      
      for (const selector of classSelectors) {
        const buttons = document.querySelectorAll(selector);
        for (const btn of buttons) {
          const text = (btn.innerText || btn.textContent || '').trim().toLowerCase();
          if ((text.includes('다음') || text.includes('next')) && btn.offsetParent && !btn.disabled) {
            nextButton = btn;
            console.log(`[SAT PDF Exporter] 다음 버튼 발견 (클래스: ${selector})`);
            break;
          }
        }
        if (nextButton) break;
      }
    }
    
    if (!nextButton) {
      const submitButton = findNavigationButton('submit', '제출', 'submit');
      if (submitButton) {
        console.log('[SAT PDF Exporter] 제출 버튼 발견 - 마지막 문제입니다.');
        return true; // 제출 버튼이면 성공으로 간주
      }
      console.warn(`[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 버튼을 찾을 수 없습니다 (재시도 ${retry + 1}/${maxRetries})`);
      continue;
    }
    
    // 비활성화되어 있으면 활성화될 때까지 대기 (강화)
    if (nextButton.disabled || nextButton.getAttribute('aria-disabled') === 'true') {
      console.log('[SAT PDF Exporter] 다음 버튼이 비활성화됨. 활성화 대기...');
      let waitAttempts = 0;
      const maxWaitAttempts = 30; // 최대 1.5초 대기
      
      while (waitAttempts < maxWaitAttempts && (nextButton.disabled || nextButton.getAttribute('aria-disabled') === 'true')) {
        await new Promise(resolve => setTimeout(resolve, 30));
        waitAttempts++;
        
        // 버튼을 다시 찾기 (DOM이 업데이트되었을 수 있음)
        if (waitAttempts % 5 === 0) {
          const refreshedButton = findNavigationButton('next', '다음', 'next');
          if (refreshedButton && !refreshedButton.disabled) {
            nextButton = refreshedButton;
            break;
          }
        }
      }
      
      if (nextButton.disabled || nextButton.getAttribute('aria-disabled') === 'true') {
        console.log('[SAT PDF Exporter] 다음 버튼이 계속 비활성화되어 있습니다.');
        // 마지막 문제일 수 있음
        const progressState = getProgressState();
        if (progressState && (progressState.match(/\d+\s*\/\s*27/) || progressState.match(/\d+\s*\/\s*22/)) && (progressState.includes('27') || progressState.includes('22'))) {
          console.log('[SAT PDF Exporter] 마지막 문제 도달 (progress:', progressState, ')');
          return true;
        }
        continue;
      }
    }
    
    // 문제 번호 및 시그니처 저장 (성공 판정용)
    const beforeSignature = getQuestionSignature();
    const beforeProgress = getProgressState();
    
    // 폴백 전략 1: scrollIntoView 후 클릭
    try {
      nextButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 30));
    } catch (e) {
      console.warn('[SAT-DEBUG] scrollIntoView 실패, 전체 스크롤 시도:', e);
      // scrollIntoView 실패 시 전체 스크롤
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(resolve => setTimeout(resolve, 80));
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    
    console.log(`[SAT-DEBUG] 다음 버튼 클릭 시도 (${beforeProblemNum} → 다음) callId=${callId}, clickCount=${clickCount}`);
    
    // 클릭 중복 방지: 같은 callId에서 이미 클릭했으면 스킵
    if (clickCount >= MAX_CLICKS_PER_CALL) {
      console.error(`[NEXT-DEBUG] ✗ 클릭 중복 방지: callId=${callId}에서 이미 ${clickCount}번 클릭함 (최대 ${MAX_CLICKS_PER_CALL}번)`);
      console.warn(`[NEXT-DEBUG] 클릭 한도 도달로 이번 호출을 종료하고 상위 루프에서 재시도합니다. callId=${callId}`);
      return false;
    }
    
    // 단일 클릭만 수행 (중복 클릭 방지)
    // 기본: nextButton.click() 1번만 사용
    // 폴백: dispatchEvent 방식은 성공 판정 실패 시에만 시도
    let clickPerformed = false;
    const clickTimestamp = Date.now();
    
    try {
      // 1차: 기본 click() 메서드 사용 (단일 클릭)
      console.log(`[NEXT-DEBUG] 클릭 직전 timestamp=${clickTimestamp}, callId=${callId}`);
      nextButton.click();
      clickCount++;
      clickPerformed = true;
      console.log(`[NEXT-DEBUG] ✓ Next 버튼 클릭 완료: click() 메서드 사용, callId=${callId}, clickCount=${clickCount}`);
      await new Promise(resolve => setTimeout(resolve, 50)); // 클릭 후 UI 반영 대기
    } catch (e) {
      console.warn('[SAT-DEBUG] click() 메서드 실패, dispatchEvent 폴백 시도:', e);
      clickPerformed = false;
    }
    
    // 성공 판정을 먼저 확인 (click()이 실패했거나 판정이 실패하면 폴백 시도)
    // 성공 판정은 아래 루프에서 수행되므로, 여기서는 클릭만 수행
    
    // STEP 2: 진행 상황 델타 +1 확인 안전장치
    let attempts = 0;
    const maxAttempts = 25; // 최대 5초 대기
    let success = false;
    let progressDelta = null;
    
    // click() 메서드로 클릭한 경우 성공 판정 루프 시작
    while (attempts < maxAttempts && !success && clickPerformed) {
      await new Promise(resolve => setTimeout(resolve, 80));
      attempts++;
      
      // STEP 2: 진행 상황 읽기 (클릭 후)
      const nextProgress = readProgressNumber();
      if (prevProgress !== null && nextProgress !== null) {
        progressDelta = nextProgress - prevProgress;
        console.log(`[SAT-DEBUG] [STEP 2] 진행 상황 델타: ${prevProgress} → ${nextProgress} (델타: ${progressDelta})`);
        
        // 델타가 +1이 아니면 오류
        if (progressDelta !== 1) {
          console.error(`[SAT-DEBUG] [STEP 2] ERROR: 예상치 못한 진행 상황 점프! ${prevProgress} → ${nextProgress} (델타: ${progressDelta}, 예상: +1)`);
          
          // 대체 후보 시도 (한 번만)
          if (alternativeCandidates.length > 0 && retry === 0) {
            console.log(`[SAT-DEBUG] [STEP 2] 대체 후보 시도 (${alternativeCandidates.length}개)`);
            const altButton = alternativeCandidates[0];
            alternativeCandidates = alternativeCandidates.slice(1); // 사용한 후보 제거
            
            try {
              altButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
              await new Promise(resolve => setTimeout(resolve, 120));
              altButton.click();
              await new Promise(resolve => setTimeout(resolve, 80));
              
              const altNextProgress = readProgressNumber();
              if (altNextProgress !== null && prevProgress !== null) {
                const altDelta = altNextProgress - prevProgress;
                console.log(`[SAT-DEBUG] [STEP 2] 대체 후보 결과: ${prevProgress} → ${altNextProgress} (델타: ${altDelta})`);
                
                if (altDelta === 1) {
                  console.log(`[SAT-DEBUG] [STEP 2] 대체 후보 성공! 델타 +1 확인`);
                  success = true;
                  break;
                }
              }
            } catch (e) {
              console.warn(`[SAT-DEBUG] [STEP 2] 대체 후보 클릭 실패:`, e);
            }
          }
          
          // 델타가 +1이 아니고 대체 후보도 실패하면 경고하고 계속 진행
          if (!success) {
            console.error(`[SAT-DEBUG] [STEP 2] 진행 상황 점프가 계속됨. PDF 생성은 계속하되 경고 표시 필요.`);
            // 경고는 나중에 표시하고, 여기서는 성공으로 간주 (최소한 진행은 했으므로)
            if (progressDelta > 0) {
              success = true; // 최소한 진행은 했으므로 성공으로 간주
              break;
            }
          }
        } else {
          // 델타가 +1이면 성공
          success = true;
          console.log(`[SAT-DEBUG] [STEP 2] 성공: 진행 상황 델타 +1 확인됨`);
          break;
        }
      }
      
      // 방법 1: 문제 번호 변경 확인 (강화)
      const afterProblemNum = getCurrentProblemNumber();
      
      // 중요: progress가 감소하면 detection bug로 처리 (예: 4 → 1)
      if (afterProblemNum < beforeProblemNum && afterProblemNum > 0) {
        console.warn(`[SAT PDF Exporter] 문제 번호가 감소함: ${beforeProblemNum} → ${afterProblemNum} (detection bug 의심)`);
        // DOM 요소에서 다시 읽기 시도
        await new Promise(resolve => setTimeout(resolve, 120));
        const retryProblemNum = getCurrentProblemNumber();
        if (retryProblemNum > afterProblemNum && retryProblemNum > beforeProblemNum) {
          success = true;
          console.log(`[SAT PDF Exporter] 재시도 후 문제 번호 확인: ${beforeProblemNum} → ${retryProblemNum}`);
          break;
        }
        // 여전히 감소하면 실패로 처리
        continue;
      }
      
      // progress 변화 검증 강화: N+1 확인, 점프 시 즉시 경고 및 중단
      if (afterProblemNum === beforeProblemNum + 1) {
        success = true;
        console.log(`[SAT PDF Exporter] ✓ 문제 번호 정확히 +1 증가 확인: ${beforeProblemNum} → ${afterProblemNum}`);
        console.log('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 성공');
        break;
      } else if (afterProblemNum > beforeProblemNum + 1) {
        // 점프 발생! 즉시 경고 및 중단
        const jumpSize = afterProblemNum - beforeProblemNum;
        console.error(`[BUG] ✗ progress jumped ${beforeProblemNum}→${afterProblemNum} (jump size: +${jumpSize}, expected: +1)`);
        console.error(`[BUG] 방금 클릭한 버튼 정보:`, {
          callId,
          clickTimestamp,
          clickCount,
          beforeProblemNum,
          afterProblemNum,
          jumpSize,
          selectedButton: nextButton ? {
            text: (nextButton.innerText || nextButton.textContent || '').trim(),
            ariaLabel: nextButton.getAttribute('aria-label'),
            dataTestId: nextButton.getAttribute('data-testid'),
            outerHTML: nextButton.outerHTML.substring(0, 200)
          } : null
        });
        
        // 점프 발생 시 즉시 중단 (throw)
        throw new Error(`[BUG] Progress jump detected: ${beforeProblemNum} → ${afterProblemNum} (expected: ${beforeProblemNum + 1}). callId=${callId}`);
      } else if (afterProblemNum !== beforeProblemNum && afterProblemNum > beforeProblemNum) {
        // +1이 아니지만 증가는 했음 (TEMP 모드가 아닐 때만 허용)
        console.warn(`[SAT PDF Exporter] 문제 번호 변경 확인: ${beforeProblemNum} → ${afterProblemNum} (정확히 +1 아님)`);
        // TEMP 모드가 아니면 성공으로 간주
        if (typeof TEMP_MODE === 'undefined' || !TEMP_MODE) {
          success = true;
          console.log('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 성공 (TEMP 모드 아님)');
          break;
        } else {
          // TEMP 모드면 점프로 간주하고 재시도
          console.warn(`[SAT PDF Exporter] TEMP 모드: 정확히 +1이 아니므로 재시도`);
          continue;
        }
      }
      
      // 방법 2: Progress 상태 변경 확인
      const afterProgress = getProgressState();
      if (afterProgress !== beforeProgress && afterProgress) {
        const beforeMatch = beforeProgress ? beforeProgress.match(/(\d+)\s*\/\s*(\d+)/) : null;
        const afterMatch = afterProgress.match(/(\d+)\s*\/\s*(\d+)/);
        
        if (beforeMatch && afterMatch) {
          const beforeNum = parseInt(beforeMatch[1]);
          const afterNum = parseInt(afterMatch[1]);
          if (afterNum > beforeNum) {
            success = true;
            console.log(`[SAT PDF Exporter] Progress 변경 확인: ${beforeProgress} → ${afterProgress}`);
            console.log('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 성공 (Progress 변경)');
            break;
          }
        }
      }
      
      // 방법 3: 문제 시그니처 변경 확인
      const afterSignature = getQuestionSignature();
      if (afterSignature !== beforeSignature && afterSignature.length > 0 && beforeSignature.length > 0) {
        success = true;
        console.log(`[SAT PDF Exporter] 문제 시그니처 변경 확인: ${beforeSignature.substring(0, 20)}... → ${afterSignature.substring(0, 20)}...`);
        console.log('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 성공 (시그니처 변경)');
        break;
      }
      
      // 방법 4: next 버튼 상태 변경 확인 (disabled → enabled)
      const currentNextButton = findNavigationButton('next', '다음', 'next');
      if (currentNextButton && !currentNextButton.disabled && 
          (nextButton.disabled || nextButton.getAttribute('aria-disabled') === 'true')) {
        // 버튼이 활성화되었지만 아직 문제가 안 바뀌었을 수 있음
        // 조금 더 대기
        await new Promise(resolve => setTimeout(resolve, 250));
        const finalProblemNum = getCurrentProblemNumber();
        if (finalProblemNum !== beforeProblemNum && finalProblemNum > beforeProblemNum) {
          success = true;
          console.log(`[SAT PDF Exporter] next 버튼 활성화 후 문제 번호 변경: ${beforeProblemNum} → ${finalProblemNum}`);
          console.log('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 성공 (버튼 활성화)');
          break;
        }
      }
      
      attempts++;
    }
    
    // Next는 절대 한 루프에서 1회만 실행 (fallback dispatchEvent 제거)
    // click()이 실패하면 재시도 루프로 넘어감 (double-click 방지)
    
    if (success) {
      return true;
    }
    
    // 실패 시 다음 폴백 시도
    if (retry < maxRetries - 1) {
      console.warn(`[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 재시도 예정 (${retry + 1}/${maxRetries})`);
    }
  }
  
  // 모든 재시도 실패
  console.error('[SAT PDF Exporter] [DEBUG] Fail Stage: 다음 버튼 클릭 단계 - 최종 실패 (모든 폴백 시도 완료)');
  return false;
}

// 선지 강제 클릭. root는 moduleRunner에서 전달만 사용. findSatRoot/document.body 금지.
export async function clickFirstChoice(sectionType = 'reading', container = null) {
  console.log('[CHOICE] 선지 클릭 단계 시작');
  if (!container || !container.querySelectorAll) {
    const err = new Error('clickFirstChoice: root required (pass root from moduleRunner)');
    err.code = 'NO_ROOT';
    throw err;
  }
  const root = container;
  
  // 수학 섹션 예외 처리: 주관식 입력창 최우선 탐색
  if (sectionType === 'math') {
    console.log('[SAT-DEBUG] 수학 섹션 - 주관식 입력창 우선 탐색');
    // 주관식 입력창 찾기 (Shadow DOM 포함) - "여기에 입력하세요" 등 다양한 placeholder 지원
    const combinedSel = 'input[type="number"], input[type="text"][inputmode="numeric"], input[type="text"][pattern*="[0-9]"], input[placeholder*="입력"], input[placeholder*="여기에"], input[placeholder*="Enter"], textarea[placeholder*="입력"], textarea[placeholder*="여기에"], input[type="text"], textarea';
    const allInputs = deepQuerySelectorAll(combinedSel, root);
    // 채팅/메시지 입력창 제외, 문제 영역 또는 placeholder 있는 입력 우선
    const numberInputs = allInputs.filter(inp => {
      const plc = (inp.getAttribute('placeholder') || '').toLowerCase();
      const isChatInput = plc.includes('message') || plc.includes('chat') || plc.includes('메시지') || inp.closest('[class*="chat-input"], [class*="message-input"]');
      if (isChatInput) return false;
      return true;
    });
    for (const input of numberInputs) {
      if (!isElementVisible(input) || input.disabled) continue;
      
      console.log('[SAT-DEBUG] 수학 주관식 문제 감지 - 숫자 입력');
      
      // 포커스 후 지연 (수학 주관식 입력 지연)
      input.focus();
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 값 입력 (보강)
      input.value = '1';
      
      // input 이벤트를 반드시 먼저 호출 (값이 안 들어가는 경우 방지)
      input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 30));
      
      // 값이 실제로 들어갔는지 확인
      if (input.value !== '1') {
        console.warn('[SAT-DEBUG] 값이 안 들어감, 재시도');
        input.value = '1';
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      
      // change, blur 이벤트 발생
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 30));
      
      input.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 30));
      
      // 추가로 keydown, keyup 이벤트도 발생 (일부 UI가 이를 요구할 수 있음)
      input.dispatchEvent(new KeyboardEvent('keydown', { key: '1', bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 15));
      
      input.dispatchEvent(new KeyboardEvent('keyup', { key: '1', bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 15));
      
      console.log('[SAT-DEBUG] 수학 주관식 입력 완료: value =', input.value);
      return true;
    }
  }

  // SAT UI 첫 선지 직접 클릭 (선지는 mat-action-list.choices-container 내 button)
  const firstOptionBtn = root.querySelector('mat-action-list.choices-container button');
  if (firstOptionBtn) {
    const before = firstOptionBtn.className;
    firstOptionBtn.click();
    await new Promise(r => setTimeout(r, 150));
    const after = firstOptionBtn.className;
    console.log('[CLICK-DEBUG]', { before, after });
    if (after !== before || /answered|selected/.test(after)) return true;
  }

  // ============================================================================
  // extractChoices 결과 재사용 (같은 후보 리스트로 찾기+클릭 일원화)
  // ============================================================================
  const { extractChoices, ensureChoicesPresent } = await import('../dom/extract.js');
  const problemNum = (typeof getCurrentProblemNumber === 'function') ? getCurrentProblemNumber() : null;
  if (sectionType === 'reading') {
    const choicesReady = await waitForCondition(() => {
      try { return extractChoices(root).length >= 4; } catch (_) { return false; }
    }, 5000, 150);
    if (!choicesReady) console.warn('[CHOICE-CLICK] 리딩: 5초 내 선지 4개 미등장, ensureChoicesPresent 시도');
  }
  await ensureChoicesPresent(root);
  let extractedChoices;
  try {
    extractedChoices = extractChoices(root);
  } catch (e) {
    if (e?.code === 'CHOICES_NOT_FOUND') throw e;
    throw e;
  }
  if (!extractedChoices || extractedChoices.length === 0) {
    const snippetCount = root.querySelectorAll?.('mat-action-list.choices-container button, .mat-mdc-radio-button, [role="radio"], mat-list-option')?.length ?? 0;
    const err = new Error(`NO_CHOICES_EXTRACTED problem=${problemNum ?? '?'} snippetCount=${snippetCount}`);
    err.code = 'NO_CHOICES_EXTRACTED';
    throw err;
  }
  extractedChoices = extractedChoices.filter(c => c && c.element);
  if (extractedChoices.length === 0) {
    console.error('[CHOICE] element가 있는 선택지가 없습니다.');
    return false;
  }
  // 후보 변환: visible 필터 제거 (fold 아래 선지는 scrollIntoView 직전에 보이게 함)
  const candidates = extractedChoices
    .filter(choice => {
      const el = choice.element;
      if (!el || el.disabled) return false;
      
      // 텍스트 기반 폴백(source === '텍스트 기반 폴백' 또는 priority === 5)은 선택 여부 체크 스킵
      const isTextFallback = choice.source === '텍스트 기반 폴백' || choice.priority === 5;
      
      if (isTextFallback) {
        // 텍스트 기반 폴백은 무조건 클릭 가능한 것으로 처리
        console.log(`[CHOICE] 텍스트 기반 폴백 후보 ${choice.label}: 선택 여부 체크 스킵 (무조건 클릭)`);
        return true;
      }
      
      // 구조적 선택지는 선택 여부 체크
      const isSelected = el.getAttribute('aria-checked') === 'true' ||
                        el.getAttribute('aria-selected') === 'true' ||
                        (el.className || '').includes('selected') ||
                        (el.className || '').includes('checked');
      
      if (isSelected) {
        console.log(`[CHOICE] 선택지 ${choice.label}는 이미 선택됨 (스킵)`);
        return false;
      }
      
      return true;
    })
    .map(choice => ({
      element: choice.element,
      letter: choice.label,
      text: choice.text,
      source: choice.source,
      isTextFallback: choice.source === '텍스트 기반 폴백' || choice.priority === 5
    }));
  
  if (candidates.length === 0) {
    console.error('[CHOICE] 선택지 후보가 없습니다.');
    return false;
  }
  
  console.log(`[CHOICE] candidates count=${candidates.length}`);
  console.log(`[DIAG] choices candidates top5:`, candidates.slice(0, 5).map(c => ({
    text: c.text.substring(0, 30),
    ariaChecked: c.element.getAttribute('aria-checked'),
    role: c.element.getAttribute('role'),
    rect: c.element.getBoundingClientRect()
  })));
  
  // 클릭 타겟 결정 규칙: 가장 안쪽이 아니라 사용자 클릭 가능한 래퍼 선택
  const clickTargets = candidates.map(candidate => {
    const el = candidate.element;
    // closest로 클릭 가능한 래퍼 찾기
    const clickableWrapper = el.closest('button, [role="radio"], [role="option"], label, div[onclick], div[tabindex]');
    const target = clickableWrapper || el;
    
    // 클릭 가능 여부 확인
    const hasOnclick = target.hasAttribute('onclick');
    const hasTabindex = target.getAttribute('tabindex') !== null && parseInt(target.getAttribute('tabindex')) >= 0;
    const hasAriaChecked = target.getAttribute('aria-checked') !== null || target.getAttribute('aria-selected') !== null;
    const isStandardClickable = hasOnclick || hasTabindex || hasAriaChecked || target.tagName === 'BUTTON' || target.tagName === 'LABEL';
    const isClickable = isStandardClickable || (candidate.isTextFallback && el && el.offsetParent);
    
    return {
      element: target,
      original: el,
      letter: candidate.letter,
      text: candidate.text,
      isClickable
    };
  }).filter(c => c.isClickable);
  
  if (clickTargets.length === 0) {
    const snippetCount = document.querySelectorAll?.('.mat-mdc-radio-button, [role="radio"], input[type="radio"], mat-list-option')?.length ?? 0;
    const err = new Error(`NO_CHOICES_EXTRACTED problem=${problemNum ?? '?'} candidates=${candidates.length} but clickTargets=0 snippetCount=${snippetCount}`);
    err.code = 'NO_CHOICES_EXTRACTED';
    throw err;
  }
  
  const firstChoice = clickTargets.find(c => c.letter === 'A') || clickTargets[0];
  const rawElement = firstChoice.element;
  const candidatesToTry = [rawElement, ...clickTargets.slice(1).map(c => c.element)];

  function isSelectionVerified(el) {
    if (!el) return false;
    const root = el.closest('[role="group"], [class*="list"], [class*="option"], [class*="choice"]') || el;
    const check = (n) => {
      if (!n) return false;
      if (n.getAttribute('aria-checked') === 'true' || n.getAttribute('aria-selected') === 'true') return true;
      if (n.type === 'radio' && n.checked) return true;
      if (n.getAttribute('data-selected') === 'true' || n.getAttribute('data-checked') === 'true') return true;
      const c = (n.className || '') + ' ' + (n.getAttribute('class') || '');
      if (/\bselected\b|\bchecked\b|mdc-list-item--selected|mat-list-option-selected|mdc-radio--selected|answered-(correct|incorrect)/.test(c)) return true;
      return false;
    };
    const nodes = [el, root, ...Array.from((root.querySelectorAll && root.querySelectorAll('[role="radio"], [role="option"], input[type="radio"], .mdc-radio, .mat-mdc-list-option')) || [])];
    return nodes.some(check);
  }
  function resolveClickable(el) {
    const isClickable = (n) => {
      if (!n || n.disabled) return false;
      const r = n.getAttribute('role');
      if (r === 'radio' || r === 'option') return true;
      if (n.tagName === 'LABEL') return true;
      if (n.querySelector && n.querySelector('input[type="radio"]')) return true;
      if (n.tagName === 'BUTTON') return true;
      const c = (n.className || '') + '';
      if (/\blist-item\b|\boption\b|mat-mdc-list-option|mat-mdc-radio-button|mat-radio-button/.test(c)) return true;
      return false;
    };
    let p = el;
    while (p && p !== document.body) {
      if (isClickable(p)) return p;
      const child = p.querySelector && p.querySelector('[role="radio"], [role="option"], button, label, .mdc-list-item__content, .mdc-radio, .mat-mdc-list-item, .mat-mdc-radio-button, .mat-radio-button');
      if (child && el.contains(child)) return child;
      p = p.parentElement;
    }
    return el;
  }
  function getScrollableParent(el) {
    let p = el && el.parentElement;
    while (p) {
      try {
        const style = window.getComputedStyle(p);
        if (/(auto|scroll|overlay)/.test(style.overflowY || '') && p.scrollHeight > p.clientHeight) return p;
      } catch (_) {}
      p = p.parentElement;
    }
    return null;
  }
  function scrollIntoViewWithinParent(el) {
    const parent = getScrollableParent(el);
    if (!parent) { el.scrollIntoView({ block: 'center' }); return; }
    const er = el.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();
    parent.scrollTop += (er.top + er.height / 2) - (pr.top + pr.height / 2);
  }
  function waitFrames(n = 2) {
    return new Promise(r => {
      let count = 0;
      function tick() {
        requestAnimationFrame(() => { count++; if (count >= n) r(); else tick(); });
      }
      tick();
    });
  }
  function ensureCenterInViewport(el) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const bounds = satRoot ? satRoot.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    const right = bounds.left + bounds.width, bottom = bounds.top + bounds.height;
    if (cx < bounds.left || cx > right || cy < bounds.top || cy > bottom) {
      scrollIntoViewWithinParent(el);
      return false;
    }
    return true;
  }

  const MIN_RECT_SIZE = 5;

  function safeClickGuard(cx, cy, satRootRef, context) {
    const topEl = document.elementFromPoint(cx, cy);
    if (!topEl) {
      console.warn('[SAFECLICK] blocked click: no element at point', { cx, cy, ...context });
      return { ok: false, reason: 'NO_ELEMENT', topEl: null };
    }
    if (satRootRef && !satRootRef.contains(topEl)) {
      const href = topEl.tagName === 'A' ? topEl.getAttribute('href') : (topEl.closest?.('a')?.getAttribute('href') || null);
      console.warn('[SAFECLICK] blocked click outside satRoot', { cx, cy, topElTag: topEl.tagName, href, ...context });
      return { ok: false, reason: 'OUTSIDE_SATROOT', topEl };
    }
    return { ok: true, topEl };
  }

  async function attemptClickWithStrategy(choiceEl, strategy) {
    const clickable = resolveClickable(choiceEl);
    scrollIntoViewWithinParent(choiceEl);
    await waitFrames(2);
    ensureCenterInViewport(choiceEl);
    await new Promise(r => setTimeout(r, 30));

    const r = clickable.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const rectInvalid = typeof r.width !== 'number' || typeof r.height !== 'number' ||
      Number.isNaN(r.width) || Number.isNaN(r.height) ||
      r.width < MIN_RECT_SIZE || r.height < MIN_RECT_SIZE;
    if (rectInvalid) {
      console.warn('[SAFECLICK] BAD_RECT: abort click', { width: r.width, height: r.height, strategy });
      return false;
    }

    const topEl = document.elementFromPoint(cx, cy);
    const isOptionOrChild = topEl && (choiceEl.contains(topEl) || topEl.contains(choiceEl));

    const guard = safeClickGuard(cx, cy, satRoot, { strategy });
    if (!guard.ok) {
      if (guard.reason === 'OUTSIDE_SATROOT') return false;
      if (guard.reason === 'NO_ELEMENT') return false;
    }

    if (strategy === 'A') {
      if (satRoot && !satRoot.contains(clickable)) {
        console.warn('[SAFECLICK] strategy A: clickable outside satRoot, skip click');
        return false;
      }
      clickable.click();
    } else if (strategy === 'B') {
      ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => {
        clickable.dispatchEvent(new MouseEvent(type, {
          bubbles: true, cancelable: true, view: window, clientX: cx, clientY: cy,
          buttons: (type === 'mouseup' || type === 'click') ? 0 : 1
        }));
      });
    } else if (strategy === 'C') {
      if (topEl && !isOptionOrChild) {
        const overlay = topEl;
        const prev = overlay.style.pointerEvents;
        overlay.style.pointerEvents = 'none';
        void document.body.offsetHeight;
        await new Promise(r => setTimeout(r, 20));
        clickable.click();
        await new Promise(r => setTimeout(r, 30));
        overlay.style.pointerEvents = prev;
      } else {
        let ancestor = topEl || clickable;
        while (ancestor && ancestor !== document.body) {
          const role = ancestor.getAttribute('role');
          if (role === 'radio' || role === 'option' || ancestor.tagName === 'LABEL' || ancestor.querySelector?.('input[type="radio"]')) {
            ancestor.click();
            break;
          }
          ancestor = ancestor.parentElement;
        }
        if (!ancestor || ancestor === document.body) clickable.click();
      }
    }

    await new Promise(r => setTimeout(r, 80));
    let verified = isSelectionVerified(choiceEl);
    if (!verified) {
      for (let p = 0; p < 3; p++) {
        await new Promise(r => setTimeout(r, 60));
        verified = isSelectionVerified(choiceEl);
        if (verified) break;
      }
    }
    const signal = choiceEl.getAttribute('aria-checked') === 'true' ? 'aria-checked' :
      choiceEl.getAttribute('aria-selected') === 'true' ? 'aria-selected' :
      /answered-(correct|incorrect)|\bselected\b|\bchecked\b/.test(choiceEl.className || '') ? 'class' : '';
    console.log(`[CHOICE-CLICK] strategy=${strategy} topEl=${topEl?.tagName || 'null'} isOptionOrChild=${isOptionOrChild} verified=${verified} signal=${signal || 'none'}`);
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/140f9222-33c1-4152-a733-b0541fa57bde',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'buttons.js:attemptClickWithStrategy',message:'choice click attempt',data:{strategy,topElTag:topEl?.tagName||'null',isOptionOrChild,verified,signal:signal||'none'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return verified;
  }

  try {
    for (let cIdx = 0; cIdx < Math.min(3, candidatesToTry.length); cIdx++) {
      const choiceEl = candidatesToTry[cIdx];
      const letter = clickTargets[cIdx]?.letter || ['A','B','C','D'][cIdx];
      console.log(`[CHOICE] attempt ${cIdx + 1} letter=${letter}`);
      for (const strat of ['A', 'B', 'C']) {
        const ok = await attemptClickWithStrategy(choiceEl, strat);
        if (ok) {
          console.log(`[CHOICE] ✓ 선택 성공 (strategy=${strat} letter=${letter})`);
          return true;
        }
        await new Promise(r => setTimeout(r, 50));
      }
    }
    console.error('[CHOICE] ✗ 모든 전략 실패 - 선지 선택 확정 불가');
    return false;
  } catch (error) {
    console.error('[CHOICE] 클릭 중 오류:', error);
    return false;
  }
}

