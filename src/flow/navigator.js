// Extracted SATNavigator from content.js
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { deepQuerySelectorAll, isElementVisible } from '../dom/deepQuery.js';
import { waitForElement, waitForCondition, waitForContentLoad, safeClick, showToast, forceClick } from '../dom/wait.js';
import { isQuestionScreen, getProgressState, getCurrentProblemNumber } from '../dom/extract.js';
import { findButtonByText } from '../dom/buttons.js';

export class SATNavigator {
  /**
   * 텍스트로 버튼 찾기 (다국어 지원)
   * @param {...string} labels - 찾을 버튼 텍스트들
   * @returns {Element|null} 찾은 버튼 요소
   */
  findButtonByText(...labels) {
    const buttons = Array.from(document.querySelectorAll(CONFIG.selectors.button));
    return buttons.find(btn => {
      if (!btn.offsetParent || btn.disabled) return false;
      const text = (btn.innerText || btn.textContent || '').trim();
      const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
      return labels.some(label => 
        text.includes(label) || ariaLabel.includes(label)
      );
    }) || null;
  }

  /**
   * '열기' 버튼 찾기 및 클릭
   * @returns {Promise<boolean>} 성공 여부
   */
  async clickOpenButton() {
    console.log('[SAT-DEBUG] 현재 단계: 열기 버튼 찾기 시작');
    
    const openButton = await waitForElement(() => {
      // Shadow DOM 돌파: deepQuerySelectorAll 사용
      const allButtons = deepQuerySelectorAll(CONFIG.selectors.button + ', a, div[onclick], span[onclick]');
      for (const btn of allButtons) {
        try {
          if (!isElementVisible(btn) || btn.disabled) continue;
          
          const btnText = (btn.innerText || btn.textContent || '').trim();
          if (CONFIG.buttonTexts.open.some(text => btnText.includes(text))) {
            console.log('[SAT-DEBUG] 열기 버튼 발견:', btnText);
            return btn;
          }
        } catch (e) {
          continue;
        }
      }
      return null;
    }, CONFIG.retries.elementFind);

    if (openButton) {
      console.log('[SATNavigator] 열기 버튼 발견, 클릭 시도');
      return await safeClick(openButton);
    }
    
    console.warn('[SATNavigator] 열기 버튼을 찾을 수 없습니다.');
    return false;
  }

  /**
   * '계속' 버튼 찾기 및 클릭 (Reading and Writing 섹션)
   * @returns {Promise<boolean>} 성공 여부
   */
  async clickContinueButton() {
    console.log('[SAT-DEBUG] 현재 단계: 계속 버튼 찾기 시작');
    
    const continueButton = await waitForElement(() => {
      // Shadow DOM 돌파: deepQuerySelectorAll 사용 (a 태그 제외)
      const sectionCards = deepQuerySelectorAll('div, section, article');
      for (const card of sectionCards) {
        const cardText = (card.innerText || card.textContent || '').toLowerCase();
        const hasReading = cardText.includes('reading');
        const hasWriting = cardText.includes('writing');
        
        if (hasReading && hasWriting) {
          // Shadow DOM 내부 버튼도 찾기 (a 태그 제외)
          const buttons = deepQuerySelectorAll(CONFIG.selectors.button + ', div[onclick]', card);
          for (const btn of buttons) {
            try {
              if (!isElementVisible(btn) || btn.disabled) continue;
              
              // 다른 창으로 넘어가는 요소 제외
              if (btn.tagName === 'A') {
                const href = btn.getAttribute('href');
                const target = btn.getAttribute('target');
                if (href && (href.startsWith('http') || target === '_blank' || target === '_new')) {
                  continue;
                }
              }
              
              if (btn.hasAttribute('href') && btn.getAttribute('href') !== '#' && !btn.getAttribute('href').startsWith('javascript:')) {
                continue;
              }
              
              if (btn.getAttribute('target') === '_blank' || btn.getAttribute('target') === '_new') {
                continue;
              }
              
              const btnText = (btn.innerText || btn.textContent || '').trim();
              if (CONFIG.buttonTexts.continue.some(text => btnText.includes(text))) {
                console.log('[SAT-DEBUG] 계속 버튼 발견:', btnText);
                return btn;
              }
            } catch (e) {
              continue;
            }
          }
        }
      }
      return null;
    }, CONFIG.retries.elementFind);

    if (continueButton) {
      console.log('[SATNavigator] 계속 버튼 발견, 클릭 시도');
      return await safeClick(continueButton);
    }
    
    console.warn('[SATNavigator] 계속 버튼을 찾을 수 없습니다.');
    return false;
  }

  /**
   * 자동 진입 시퀀스 실행
   * @returns {Promise<boolean>} 성공 여부
   */
  async handleInitialNavigation() {
    console.log('[SAT-DEBUG] 현재 단계: 자동 진입 시퀀스 시작');
    
    try {
      // 이미 문제 화면에 있으면 스킵
      if (isQuestionScreen() || getProgressState() !== null) {
        console.log('[SAT-DEBUG] 이미 문제 화면에 있습니다.');
        return true;
      }

      // 1단계: '열기' 버튼 클릭 (텍스트 기반 탐색)
      console.log('[SAT-DEBUG] 현재 단계: 1단계 - 열기 버튼 클릭');
      showToast('열기 버튼 클릭 중...', 'info');
      const openClicked = await this.clickOpenButton();
      if (openClicked) {
        console.log('[SAT-DEBUG] 열기 버튼 클릭 성공 - 화면 전환 대기');
        await waitForCondition(() => {
          const bodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
          const hasSectionScreen = bodyText.includes('reading') && bodyText.includes('writing');
          return hasSectionScreen;
        }, CONFIG.timeouts.screenTransition * 5);
        await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.screenTransition));
        console.log('[SAT-DEBUG] 화면 전환 완료');
      } else {
        console.warn('[SAT-DEBUG] 열기 버튼 클릭 실패');
      }

      // 2단계: 'Reading and Writing' 안내의 '계속' 버튼 클릭
      console.log('[SAT-DEBUG] 현재 단계: 2단계 - 계속 버튼 클릭');
      showToast('Reading and Writing 섹션 계속 버튼 클릭 중...', 'info');
      await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.screenTransition));
      
      let continueClicked = await this.clickContinueButton();
      if (!continueClicked) {
        // 일반 클릭 실패 시 forceClick 시도
        console.log('[SAT-DEBUG] 일반 클릭 실패, forceClick 시도');
        const continueButton = await waitForElement(() => {
          const sectionCards = deepQuerySelectorAll('div, section, article');
          for (const card of sectionCards) {
            const cardText = (card.innerText || card.textContent || '').toLowerCase();
            if (cardText.includes('reading') && cardText.includes('writing')) {
              const buttons = deepQuerySelectorAll(CONFIG.selectors.button + ', a, div[onclick]', card);
              for (const btn of buttons) {
                if (!isElementVisible(btn) || btn.disabled) continue;
                const btnText = (btn.innerText || btn.textContent || '').trim();
                if (CONFIG.buttonTexts.continue.some(text => btnText.includes(text))) {
                  return btn;
                }
              }
            }
          }
          return null;
        }, CONFIG.retries.elementFind);
        
        if (continueButton) {
          continueClicked = await forceClick(continueButton);
        }
      }
      
      if (continueClicked) {
        console.log('[SAT-DEBUG] 계속 버튼 클릭 성공 - 문제 화면 대기');
        // 3단계: 문제 번호(1/27)가 보일 때까지 루프로 대기
        const maxWait = 10000; // 10초
        const startTime = Date.now();
        let problemScreenReady = false;
        
        while (Date.now() - startTime < maxWait && !problemScreenReady) {
          await new Promise(resolve => setTimeout(resolve, 500));
          const progress = getProgressState();
          const isQuestion = isQuestionScreen();
          
          // 문제 번호가 보이는지 확인 (예: 1/27, 2/27 등)
          if (progress && progress.match(/\d+\s*\/\s*\d+/)) {
            problemScreenReady = true;
            console.log('[SAT-DEBUG] 문제 화면 확인됨 (Progress):', progress);
            break;
          }
          
          if (isQuestion) {
            const problemNum = getCurrentProblemNumber();
            if (problemNum > 0) {
              problemScreenReady = true;
              console.log('[SAT-DEBUG] 문제 화면 확인됨 (문제 번호):', problemNum);
              break;
            }
          }
        }
        
        if (!problemScreenReady) {
          console.warn('[SAT-DEBUG] 문제 화면이 10초 내에 나타나지 않았습니다.');
        }
        
        await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.screenTransition));
      } else {
        console.warn('[SAT-DEBUG] 계속 버튼 클릭 실패');
      }

      // 3단계: 문제 화면 로드 대기
      console.log('[SATNavigator] 문제 화면 로드 대기 중...');
      showToast('문제 화면 로드 대기 중...', 'info');
      await waitForCondition(() => {
        return isQuestionScreen() || getProgressState() !== null;
      }, CONFIG.timeouts.maxElementWait);

      // 4단계: 테스트 설정 처리
      console.log('[SATNavigator] 테스트 설정 처리 중...');
      showToast('테스트 설정 중...', 'info');
      await configureAndStartTest();

      console.log('[SATNavigator] ===== 자동 진입 시퀀스 완료 =====');
      return true;
    } catch (error) {
      console.error('[SATNavigator] 자동 진입 시퀀스 오류:', error);
      throw error;
    }
  }

  /**
   * Math 섹션으로 이동
   * @returns {Promise<boolean>} 성공 여부
   */
  async navigateToMathSection() {
    // 채점 화면을 건너뛰고 Math 섹션으로 이동
    // "Math", "수학" 텍스트가 있는 버튼이나 링크 찾기
    const mathButtons = document.querySelectorAll('button, a, [role="button"], [class*="button"]');
    
    for (const button of mathButtons) {
      const text = (button.innerText || button.textContent || '').trim();
      const textLower = text.toLowerCase();
      const ariaLabel = (button.getAttribute('aria-label') || '').toLowerCase();
      
      // "Math", "수학" 섹션 찾기
      if (textLower.includes('math') || 
          textLower.includes('수학') ||
          ariaLabel.includes('math') ||
          ariaLabel.includes('수학')) {
        // 부모 요소에서 Math 섹션인지 확인
        const parent = button.closest('[class*="card"], [class*="section"], [class*="module"]');
        if (parent) {
          const parentText = (parent.innerText || parent.textContent || '').toLowerCase();
          if (parentText.includes('math') || parentText.includes('수학')) {
            // Math 섹션의 "시작" 버튼 찾기
            const startBtn = parent.querySelector('button, [role="button"]');
            if (startBtn) {
              const startText = (startBtn.innerText || startBtn.textContent || '').trim().toLowerCase();
              if (startText.includes('시작') || startText === 'start' || startText.includes('start')) {
                console.log('[SAT PDF Exporter] Math 섹션 시작 버튼 클릭');
                startBtn.click();
                await waitForContentLoad(3000);
                return true;
              }
            }
          }
        }
      }
    }

    // 스크롤 다운하여 Math 섹션 찾기
    const originalScroll = window.scrollY;
    window.scrollTo(0, document.body.scrollHeight);
    await waitForContentLoad(1000);
    
    // 스크롤 후 다시 찾기
    const scrolledMathButtons = document.querySelectorAll('button, a, [role="button"]');
    for (const button of scrolledMathButtons) {
      const text = (button.innerText || button.textContent || '').trim().toLowerCase();
      const parent = button.closest('[class*="card"], [class*="section"]');
      if (parent) {
        const parentText = (parent.innerText || parent.textContent || '').toLowerCase();
        if ((parentText.includes('math') || parentText.includes('수학')) && 
            (text.includes('시작') || text === 'start')) {
          console.log('[SAT PDF Exporter] Math 섹션 시작 버튼 클릭 (스크롤 후)');
          button.click();
          await waitForContentLoad(3000);
          return true;
        }
      }
    }

    console.log('[SAT PDF Exporter] Math 섹션을 찾을 수 없습니다.');
    window.scrollTo(0, originalScroll);
    return false;
  }
}

// ---- Legacy migrated helpers (Phase 4) ----

/**
 * 테스트 설정 화면 처리: '각 답변 다음에 정답 표시' 토글 켜기 + 테스트 시작
 * NOTE: Legacy function - migrated from legacy.js
 */
export async function configureAndStartTest() {
  console.log('[SAT PDF Exporter] 테스트 설정 화면 처리 중...');
  
  // '각 답변 다음에 정답 표시' 토글 찾기 및 켜기
  const toggleSelectors = [
    'input[type="checkbox"]',
    '[role="switch"]',
    '[role="checkbox"]',
    'button[aria-label*="정답"]',
    'button[aria-label*="answer"]'
  ];
  
  let toggleFound = false;
  for (const selector of toggleSelectors) {
    const toggles = document.querySelectorAll(selector);
    for (const toggle of toggles) {
      const label = toggle.closest('label') || toggle.parentElement;
      const labelText = (label.innerText || label.textContent || '').toLowerCase();
      
      // "각 답변 다음에 정답 표시" 또는 "Display correct answer after each response" 찾기
      if (labelText.includes('정답 표시') || 
          labelText.includes('answer after') || 
          labelText.includes('correct answer')) {
        // 토글이 꺼져 있으면 켜기
        const isChecked = toggle.checked || 
                         toggle.getAttribute('aria-checked') === 'true' ||
                         toggle.classList.contains('checked');
        
        if (!isChecked) {
          console.log('[SAT PDF Exporter] 각 답변 다음에 정답 표시 토글 켜기');
          toggle.click();
          await new Promise(resolve => setTimeout(resolve, 300));
          toggleFound = true;
        } else {
          console.log('[SAT PDF Exporter] 각 답변 다음에 정답 표시 토글 이미 켜져 있음');
          toggleFound = true;
        }
        break;
      }
    }
    if (toggleFound) break;
  }
  
  if (!toggleFound) {
    console.warn('[SAT PDF Exporter] 각 답변 다음에 정답 표시 토글을 찾을 수 없습니다.');
  }
  
  // '테스트 시작' 버튼 찾기 및 클릭
  const startTestButton = findButtonByText('테스트 시작', 'Start Test', '시작', 'Start');
  if (startTestButton) {
    console.log('[SAT PDF Exporter] 테스트 시작 버튼 클릭');
    startTestButton.click();
    await waitForContentLoad(3000);
    return true;
  } else {
    console.warn('[SAT PDF Exporter] 테스트 시작 버튼을 찾을 수 없습니다.');
    return false;
  }
}

/**
 * 섹션 선택 화면에서 '계속' 클릭
 * NOTE: Legacy function - migrated from legacy.js
 */
export async function clickSectionContinue(sectionName) {
  console.log(`[SAT PDF Exporter] ${sectionName} 섹션 계속 버튼 찾는 중...`);
  
  // 섹션 카드 찾기
  const sectionCards = document.querySelectorAll('[class*="card"], [class*="section"]');
  for (const card of sectionCards) {
    const cardText = (card.innerText || card.textContent || '').toLowerCase();
    if (cardText.includes(sectionName.toLowerCase())) {
      // 카드 내부의 '계속' 버튼 찾기
      const continueButton = card.querySelector('button');
      if (continueButton) {
        const buttonText = (continueButton.innerText || continueButton.textContent || '').trim();
        if (buttonText.includes('계속') || buttonText.includes('Continue') || buttonText.includes('Start')) {
          console.log(`[SAT PDF Exporter] ${sectionName} 섹션 계속 버튼 클릭`);
          continueButton.click();
          await waitForContentLoad(3000);
          return true;
        }
      }
    }
  }
  
  // 폴백: 전체 페이지에서 '계속' 버튼 찾기
  const continueButton = findButtonByText('계속', 'Continue', 'Start', '시작');
  if (continueButton) {
    console.log(`[SAT PDF Exporter] ${sectionName} 섹션 계속 버튼 클릭 (폴백)`);
    continueButton.click();
    await waitForContentLoad(3000);
    return true;
  }
  
  console.warn(`[SAT PDF Exporter] ${sectionName} 섹션 계속 버튼을 찾을 수 없습니다.`);
  return false;
}

/**
 * 다음 모듈 시작 (Module 2로 이동)
 * NOTE: Legacy function - migrated from legacy.js
 */
export async function startNextModule() {
  console.log('[SAT PDF Exporter] 다음 모듈 시작 버튼 찾는 중...');
  
  // BUG FIX: 이미 문제 화면이면 시작 버튼 클릭 스킵
  if (isQuestionScreen() || getProgressState() !== null) {
    console.log('[SAT PDF Exporter] 이미 문제 화면입니다. Module 2 시작 버튼 클릭을 스킵합니다.');
    console.log('[SAT PDF Exporter] 현재 상태:', {
      isQuestionScreen: isQuestionScreen(),
      progressState: getProgressState()
    });
    return true; // 이미 문제 화면이므로 성공으로 간주
  }
  
  // 방법 1: data-test-id 사용 (가장 정확)
  let button = document.querySelector('button[data-test-id="glowing-card-start-button"]');
  if (button && button.offsetParent !== null && !button.disabled) {
    const label = button.querySelector('.mdc-button__label');
    if (label) {
      const text = (label.textContent || '').trim();
      if (text.includes('모듈 2') || text.includes('Module 2') || text.includes('시작')) {
        console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 발견 (data-test-id):', text);
        button.click();
        // 모듈이 시작되고 첫 문제가 로드될 때까지 충분히 대기
        await waitForContentLoad(3000);
        // 추가 대기 (문제 로드 확인)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('[SAT PDF Exporter] 모듈 2 시작 완료, 첫 문제 확인 중...');
        return true;
      }
    }
  }
  
  // 방법 2: 클래스명과 텍스트로 찾기
  const startButtons = document.querySelectorAll('button.start-button, button[class*="start"]');
  for (const btn of startButtons) {
    const label = btn.querySelector('.mdc-button__label');
    if (label) {
      const text = (label.textContent || '').trim();
      if (text.includes('모듈 2') || text.includes('Module 2') || text.includes('시작')) {
        if (btn.offsetParent !== null && !btn.disabled) {
          console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 클릭 (클래스명):', text);
          btn.click();
          await waitForContentLoad(3000);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return true;
        }
      }
    }
  }
  
  // 방법 3: 텍스트로 찾기 (대체 방법)
  const allButtons = document.querySelectorAll('button');
  for (const btn of allButtons) {
    const label = btn.querySelector('.mdc-button__label');
    if (label) {
      const text = (label.textContent || '').trim();
      const textLower = text.toLowerCase();
      if (textLower.includes('모듈 2') || 
          textLower.includes('module 2') ||
          (textLower.includes('시작') && (text.includes('2') || text.includes('모듈')))) {
        if (btn.offsetParent !== null && !btn.disabled) {
          console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 클릭 (텍스트):', text);
          btn.click();
          await waitForContentLoad(3000);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return true;
        }
      }
    }
  }
  
  // BUG FIX: 버튼을 못 찾았지만 이미 문제 화면이면 성공으로 간주
  if (isQuestionScreen() || getProgressState() !== null) {
    console.log('[SAT PDF Exporter] Module 2 시작 버튼을 찾지 못했지만, 이미 문제 화면입니다. 성공으로 간주합니다.');
    return true;
  }
  
  console.log('[SAT PDF Exporter] 다음 모듈 시작 버튼을 찾을 수 없습니다.');
  return false;
}


