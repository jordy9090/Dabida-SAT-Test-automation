// Extracted SATNavigator from content.js
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { deepQuerySelectorAll, isElementVisible } from '../dom/deepQuery.js';
import { waitForElement, waitForCondition, waitForContentLoad, safeClick, showToast, forceClick } from '../dom/wait.js';
import { isQuestionScreen, getProgressState, getCurrentProblemNumber, isModuleStartScreen } from '../dom/extract.js';
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
          await new Promise(resolve => setTimeout(resolve, 250));
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
                await waitForContentLoad(800);
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
    await waitForContentLoad(600);
    
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
          await waitForContentLoad(800);
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
          await new Promise(resolve => setTimeout(resolve, 150));
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
    await waitForContentLoad(800);
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
          await waitForContentLoad(800);
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
    await waitForContentLoad(800);
    return true;
  }
  
  console.warn(`[SAT PDF Exporter] ${sectionName} 섹션 계속 버튼을 찾을 수 없습니다.`);
  return false;
}

/**
 * Module 2 Start Screen에서 "모듈 2 시작" 버튼 클릭하고 Q1 화면 될 때까지 대기
 * @returns {Promise<boolean>} 성공 여부
 */
export async function startModule2() {
  console.log('[SAT PDF Exporter] startModule2: Module Start Screen 처리 시작');
  const searchRoot = document.body;

  // Primary: span.mdc-button__label with "모듈 2 시작" -> parent button (concrete DOM: activity-set > glowing-card > ... > button > span.mdc-button__label)
  const labelSpans = searchRoot.querySelectorAll('span.mdc-button__label');
  let btn = null;
  let selectorUsed = '';
  for (const span of labelSpans) {
    const text = (span.innerText || span.textContent || '').trim();
    if (text.includes('모듈 2') && text.includes('시작')) {
      btn = span.closest('button') || span.parentElement;
      if (btn && !btn.disabled) {
        selectorUsed = 'span.mdc-button__label + closest(button)';
        console.log('[SAT PDF Exporter] Module 2 start screen detected. Button text:', text, 'selector:', selectorUsed);
        break;
      }
    }
  }

  // Fallback: textContent on button/role=button
  if (!btn) {
    const btnLabels = ['모듈 2 시작', 'Module 2', 'Start Module', '시작'];
    const clickables = Array.from(searchRoot.querySelectorAll('button, [role="button"], a, .mat-mdc-button, .mdc-button'));
    for (const el of clickables) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (el.disabled) continue;
      const text = (el.innerText || el.textContent || '').trim();
      const match = btnLabels.some(l => text.includes(l) || (text.includes('모듈 2') && text.includes('시작')));
      if (match) {
        btn = el;
        selectorUsed = el.tagName + (el.getAttribute?.('role') ? `[role="${el.getAttribute('role')}"]` : '');
        console.log('[SAT PDF Exporter] Module 2 start screen detected. Button text:', text.substring(0, 50), 'selector:', selectorUsed);
        break;
      }
    }
  }

  if (!btn) {
    console.warn('[SAT PDF Exporter] startModule2: "모듈 2 시작" 버튼을 찾을 수 없습니다');
    return false;
  }

  try {
    // Safe click: scrollIntoView({block: "center"}) -> element.click() -> fallback: forceClick
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await new Promise(resolve => setTimeout(resolve, 150));
    let clicked = await safeClick(btn);
    if (!clicked) {
      console.log('[SAT PDF Exporter] startModule2: safeClick 실패, forceClick 시도');
      clicked = await forceClick(btn);
    }
    if (!clicked) {
      console.warn('[SAT PDF Exporter] startModule2: 클릭 실패');
      return false;
    }
    console.log('[SAT PDF Exporter] startModule2: "모듈 2 시작" 버튼 클릭 완료');

    // Wait until: Progress UI appears AND Progress matches "1 / 27" AND isQuestionScreen()
    const maxWait = 10000;
    const interval = 200;
    const startTime = Date.now();
    while (Date.now() - startTime < maxWait) {
      await new Promise(resolve => setTimeout(resolve, interval));
      const progress = getProgressState();
      const isQ1 = progress && /^1\s*\/\s*27/i.test(progress);
      const isQuestion = isQuestionScreen();
      if (isQ1 && isQuestion) {
        console.log('[SAT PDF Exporter] startModule2: Q1 화면 확인됨 (progress:', progress, ')');
        return true;
      }
      if (progress && progress.match(/\d+\s*\/\s*27/)) {
        console.log('[SAT PDF Exporter] startModule2: Progress 발견, Q1 대기 중...', progress);
      }
    }
    console.warn('[SAT PDF Exporter] startModule2: Q1 화면 대기 타임아웃. 현재 progress:', getProgressState());
    return false;
  } catch (err) {
    console.error('[SAT PDF Exporter] startModule2 오류:', err);
    return false;
  }
}

/**
 * 다음 모듈 시작 (Module 2로 이동)
 * NOTE: Legacy function - migrated from legacy.js
 */
export async function startNextModule() {
  console.log('[SAT PDF Exporter] 다음 모듈 시작 버튼 찾는 중...');

  // Explicit Module Start Screen: first-class state - handle before fallback logic
  if (isModuleStartScreen()) {
    console.log('[SAT PDF Exporter] Module Start Screen 감지됨. startModule2() 호출');
    const ok = await startModule2();
    if (ok) return true;
    console.warn('[SAT PDF Exporter] startModule2 실패, 기존 로직으로 폴백');
  }
  
  // #region agent log
  const initialBodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
  const initialIsQuestion = isQuestionScreen();
  const initialProgress = getProgressState();
  const initialHasModule2 = initialBodyText.includes('모듈 2') || initialBodyText.includes('module 2') || initialBodyText.includes('reading and writing module 2');
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:entry',message:'startNextModule entry',data:{initialIsQuestion,initialProgress,initialHasModule2,bodyTextPreview:initialBodyText.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // BUG FIX: Module 2 시작 화면이 나타날 때까지 명시적으로 대기
  // 이미 문제 화면이면 시작 버튼 클릭 스킵 (단, Module 1 제출 직후에는 스킵하지 않음)
  const bodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
  const hasModule2StartScreen = bodyText.includes('모듈 2') || bodyText.includes('module 2') || 
                                bodyText.includes('reading and writing module 2');
  
  // #region agent log
  const beforeWaitIsQuestion = isQuestionScreen();
  const beforeWaitProgress = getProgressState();
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:beforeWait',message:'before waiting for module 2 screen',data:{hasModule2StartScreen,beforeWaitIsQuestion,beforeWaitProgress,bodyTextPreview:bodyText.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  // Module 2 시작 화면이 명확히 보이지 않으면 대기
  if (!hasModule2StartScreen && (isQuestionScreen() || getProgressState() !== null)) {
    // Module 1 제출 직후일 수 있으므로, Module 2 시작 화면이 나타날 때까지 대기
    console.log('[SAT PDF Exporter] Module 2 시작 화면 대기 중...');
    const module2ScreenAppeared = await waitForCondition(() => {
      const currentBodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
      return currentBodyText.includes('모듈 2') || currentBodyText.includes('module 2') || 
             currentBodyText.includes('reading and writing module 2');
    }, CONFIG.timeouts.screenTransition * 5);
    
    // #region agent log
    const afterWaitIsQuestion = isQuestionScreen();
    const afterWaitProgress = getProgressState();
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:afterWait',message:'after waiting for module 2 screen',data:{module2ScreenAppeared,afterWaitIsQuestion,afterWaitProgress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    if (!module2ScreenAppeared) {
      console.warn('[SAT PDF Exporter] Module 2 시작 화면이 나타나지 않았습니다.');
    }
  }
  
  // Module 2 시작 화면이 나타난 후에도 문제 화면이면 스킵 (이미 Module 2가 시작된 상태)
  const checkIsQuestion = isQuestionScreen();
  const checkProgress = getProgressState();
  const shouldSkip = hasModule2StartScreen && (checkIsQuestion || checkProgress !== null);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:skipCheck',message:'checking if should skip button click',data:{hasModule2StartScreen,checkIsQuestion,checkProgress,shouldSkip},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  if (shouldSkip) {
    console.log('[SAT PDF Exporter] 이미 Module 2 문제 화면입니다. Module 2 시작 버튼 클릭을 스킵합니다.');
    console.log('[SAT PDF Exporter] 현재 상태:', {
      isQuestionScreen: checkIsQuestion,
      progressState: checkProgress
    });
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:skipReturn',message:'skipping button click and returning true',data:{checkIsQuestion,checkProgress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    return true; // 이미 문제 화면이므로 성공으로 간주
  }
  
  // 모듈 2 시작 화면이 나타날 때까지 대기 (최대 10초)
  console.log('[SAT PDF Exporter] 모듈 2 시작 화면 대기 중...');
  let buttonFound = false;
  let button = null;
  
  for (let attempt = 0; attempt < 20; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // 방법 0: a 태그 및 div/span (클릭 가능 요소) - SAT UI가 다양한 형태로 구현될 수 있음
    const clickables = deepQuerySelectorAll('a, button, [role="button"], div[role="button"], .mat-mdc-button, .mdc-button');
    for (const el of clickables) {
      if (!isElementVisible(el) || el.disabled) continue;
      const text = (el.innerText || el.textContent || '').trim();
      if ((text.includes('모듈 2') && text.includes('시작')) || text === '모듈 2 시작' || text.toLowerCase().includes('module 2')) {
        console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 발견 (클릭 가능 요소):', text.substring(0, 50));
        button = el;
        buttonFound = true;
        break;
      }
    }
    if (buttonFound) break;
    
    // 방법 1: data-test-id 사용 (가장 정확)
    button = document.querySelector('button[data-test-id="glowing-card-start-button"]');
    if (button && isElementVisible(button) && !button.disabled) {
      const label = button.querySelector('.mdc-button__label');
      if (label) {
        const text = (label.textContent || '').trim();
        if (text.includes('모듈 2') || text.includes('Module 2') || text.includes('시작')) {
          console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 발견 (data-test-id):', text);
          buttonFound = true;
          break;
        }
      }
    }
    
    // 방법 2: findButtonByText 사용 (강화) - "모듈 2 시작" 정확히 찾기
    const foundButton = findButtonByText('모듈 2 시작', 'Module 2', '시작', 'Start');
    if (foundButton && isElementVisible(foundButton) && !foundButton.disabled) {
      const text = (foundButton.innerText || foundButton.textContent || '').trim();
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:findButtonByText',message:'findButtonByText result',data:{found:!!foundButton,text,visible:isElementVisible(foundButton),disabled:foundButton?.disabled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      // "모듈 2 시작" 정확히 포함하거나, "모듈 2"와 "시작"이 모두 포함되어 있으면 OK
      if (text.includes('모듈 2 시작') || text === '모듈 2 시작' || 
          (text.includes('모듈 2') && text.includes('시작')) ||
          text.includes('Module 2') || text.includes('시작')) {
        console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 발견 (findButtonByText):', text);
        button = foundButton;
        buttonFound = true;
        break;
      }
    }
    
    // 방법 3: 전체 버튼 검색 (deepQuerySelectorAll 사용) - "모듈 2 시작" 정확히 찾기
    const allButtons = deepQuerySelectorAll('button, [role="button"]');
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:searchAllButtons',message:'searching all buttons for module 2 start',data:{totalButtons:allButtons.length,attempt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    for (const btn of allButtons) {
      if (!isElementVisible(btn) || btn.disabled) continue;
      
      const text = (btn.innerText || btn.textContent || '').trim();
      const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
      const textLower = text.toLowerCase();
      const ariaLower = ariaLabel.toLowerCase();
      
      // #region agent log
      if (text.includes('모듈') || text.includes('시작') || text.includes('module') || text.includes('start')) {
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:checkButton',message:'checking button text for module 2 start',data:{text,ariaLabel,textLower,ariaLower,visible:isElementVisible(btn),disabled:btn.disabled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      }
      // #endregion
      
      // "모듈 2 시작" 정확히 포함하거나, "모듈 2"와 "시작"이 모두 포함되어 있으면 OK
      if (text === '모듈 2 시작' || text.includes('모듈 2 시작') ||
          (textLower.includes('모듈 2') && textLower.includes('시작')) ||
          textLower.includes('module 2 start') ||
          (textLower.includes('시작') && (text.includes('2') || text.includes('모듈'))) ||
          (ariaLower.includes('모듈 2') || ariaLower.includes('module 2'))) {
        console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 발견 (전체 검색):', text || ariaLabel);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:buttonFound',message:'module 2 start button found in all buttons search',data:{text,ariaLabel},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        button = btn;
        buttonFound = true;
        break;
      }
    }
    
    if (buttonFound) break;
  }
  
  if (!buttonFound || !button) {
    console.warn('[SAT PDF Exporter] 모듈 2 시작 버튼을 찾을 수 없습니다. 재시도...');
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:lastAttempt',message:'last attempt to find module 2 start button',data:{buttonFound,button:!!button},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    // 마지막 시도: 전체 페이지에서 다시 검색 - "모듈 2 시작" 정확히 찾기
    const allButtons = document.querySelectorAll('button, [role="button"]');
    for (const btn of allButtons) {
      if (!isElementVisible(btn) || btn.disabled) continue;
      const text = (btn.innerText || btn.textContent || '').trim();
      const textLower = text.toLowerCase();
      // #region agent log
      if (text.includes('모듈') || text.includes('시작') || text.includes('module') || text.includes('start')) {
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:lastAttemptCheck',message:'checking button in last attempt',data:{text,textLower,visible:isElementVisible(btn),disabled:btn.disabled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      }
      // #endregion
      // "모듈 2 시작" 정확히 포함하거나, "모듈 2"와 "시작"이 모두 포함되어 있으면 OK
      if (text === '모듈 2 시작' || text.includes('모듈 2 시작') ||
          (textLower.includes('모듈 2') && textLower.includes('시작')) ||
          textLower.includes('module 2 start') ||
          (textLower.includes('시작') && (text.includes('2') || text.includes('모듈')))) {
        button = btn;
        buttonFound = true;
        console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 발견 (마지막 시도):', text);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:lastAttemptFound',message:'module 2 start button found in last attempt',data:{text},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        break;
      }
    }
  }
  
  if (buttonFound && button) {
    console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 클릭 시도...');
    // #region agent log
    const buttonText = (button.innerText || button.textContent || '').trim();
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:beforeClick',message:'before clicking module 2 start button',data:{buttonText,buttonVisible:isElementVisible(button),buttonDisabled:button.disabled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    try {
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 150));
      // forceClick 사용: safeClick이 실패할 수 있는 커스텀 UI 대응
      const clicked = await safeClick(button);
      if (!clicked) {
        console.log('[SAT PDF Exporter] safeClick 실패, forceClick 시도...');
        await forceClick(button);
      }
      console.log('[SAT PDF Exporter] 모듈 2 시작 버튼 클릭 완료');
      
      // #region agent log
      const afterClickIsQuestion = isQuestionScreen();
      const afterClickProgress = getProgressState();
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:afterClick',message:'after clicking module 2 start button',data:{afterClickIsQuestion,afterClickProgress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      // 모듈이 시작되고 첫 문제가 로드될 때까지 충분히 대기
      await waitForContentLoad(800);
      // 추가 대기 (문제 로드 확인)
      await new Promise(resolve => setTimeout(resolve, 250));
      console.log('[SAT PDF Exporter] 모듈 2 시작 완료, 첫 문제 확인 중...');
      
      // #region agent log
      const finalIsQuestion = isQuestionScreen();
      const finalProgress = getProgressState();
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:finalCheck',message:'final check after module 2 start',data:{finalIsQuestion,finalProgress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      return true;
    } catch (error) {
      console.error('[SAT PDF Exporter] 모듈 2 시작 버튼 클릭 오류:', error);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:clickError',message:'error clicking module 2 start button',data:{error:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      return false;
    }
  }
  
  // BUG FIX: 버튼을 못 찾았지만 이미 문제 화면이면 성공으로 간주
  const fallbackIsQuestion = isQuestionScreen();
  const fallbackProgress = getProgressState();
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:fallbackCheck',message:'fallback check if question screen exists',data:{fallbackIsQuestion,fallbackProgress,buttonFound},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  if (fallbackIsQuestion || fallbackProgress !== null) {
    console.log('[SAT PDF Exporter] Module 2 시작 버튼을 찾지 못했지만, 이미 문제 화면입니다. 성공으로 간주합니다.');
    return true;
  }
  
  console.error('[SAT PDF Exporter] 다음 모듈 시작 버튼을 찾을 수 없습니다.');
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navigator.js:startNextModule:failed',message:'failed to find module 2 start button',data:{buttonFound,fallbackIsQuestion,fallbackProgress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  return false;
}


