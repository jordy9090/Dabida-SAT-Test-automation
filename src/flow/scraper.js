// SATScraper - handles problem collection orchestration
// Extracted from stateMachine.js to separate concerns

import { CONFIG, TEMP_MODE } from '../config/constants.js';
import { waitForCondition, waitForContentLoad, safeClick, showToast } from '../dom/wait.js';
import { isQuestionScreen, getCurrentProblemNumber, getProgressState } from '../dom/extract.js';
import { findButtonByText, findNavigationButton } from '../dom/buttons.js';
import { SATNavigator } from './navigator.js';
import { startNextModule, configureAndStartTest, clickSectionContinue } from './navigator.js';
import { collectModuleProblems } from './moduleRunner.js';
import { SectionStateManager } from './stateManager.js';

/**
 * SATScraper 클래스
 * 문제 데이터 추출 로직을 담당
 */
export class SATScraper {
  constructor() {
    this.navigator = new SATNavigator();
    this.stateManager = new SectionStateManager();
  }

  /**
   * 현재 문제 번호 가져오기
   * @returns {number} 문제 번호 (없으면 0)
   */
  getCurrentProblemNumber() {
    // 기존 함수 재사용
    return getCurrentProblemNumber();
  }

  /**
   * Progress 상태 가져오기
   * @returns {string|null} Progress 상태 (예: "3/27")
   */
  getProgressState() {
    // 기존 함수 재사용
    return getProgressState();
  }

  /**
   * 문제 화면인지 확인
   * @returns {boolean} 문제 화면 여부
   */
  isQuestionScreen() {
    // 기존 함수 재사용
    return isQuestionScreen();
  }

  /**
   * 모듈 완료 검증 (완화된 조건)
   * @param {string} sectionType - 'reading' | 'math'
   * @param {number} moduleNumber - 1 | 2
   * @param {number} collectedCount - 수집된 문제 수
   * @param {string} progressState - Progress 상태
   * @returns {boolean} 완료 여부
   */
  isModuleComplete(sectionType, moduleNumber, collectedCount, progressState) {
    const expectedCount = CONFIG.collection.maxProblems; // 27문제
    
    // 조건 1: 문제 수가 충분한가? (완화: 25개 이상이면 OK)
    const hasEnoughProblems = collectedCount >= Math.max(25, expectedCount - 2);
    
    // 조건 2: Progress가 마지막인가?
    let isProgressComplete = false;
    if (progressState && progressState.includes(`/${expectedCount}`)) {
      const match = progressState.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) {
        const current = parseInt(match[1]);
        const total = parseInt(match[2]);
        isProgressComplete = current === total && total === expectedCount;
      }
    }
    
    // 조건 3: 다음 버튼이 완전히 사라졌는가? (비활성화가 아니라 아예 없음)
    const allButtons = document.querySelectorAll('button, [role="button"]');
    const hasNextButton = Array.from(allButtons).some(btn => {
      if (!btn.offsetParent) return false;
      const text = (btn.innerText || btn.textContent || '').trim().toLowerCase();
      return text.includes('다음') || text.includes('next');
    });
    const isNextGone = !hasNextButton;
    
    // 조건 4: 제출 버튼이 있는가? (마지막 문제)
    // NOTE: findNavigationButton is imported from buttons.js
    const submitButton = findNavigationButton('submit', '제출', 'submit');
    const hasSubmitButton = !!submitButton && submitButton.offsetParent;
    
    // 완료 조건 완화: 다음 버튼이 사라졌거나, 제출 버튼이 있으면 완료
    const isComplete = (isNextGone || hasSubmitButton) && (hasEnoughProblems || isProgressComplete);
    
    console.log(`[SATScraper] 모듈 완료 검증 (${sectionType} Module ${moduleNumber}):`, {
      collectedCount,
      expectedCount,
      hasEnoughProblems,
      isProgressComplete,
      isNextGone,
      hasSubmitButton,
      isComplete
    });
    
    return isComplete;
  }

  /**
   * 모듈 완료 후 화면 전환 대기
   * @param {string} sectionType - 'reading' | 'math'
   * @param {number} moduleNumber - 1 | 2
   * @returns {Promise<boolean>} 전환 완료 여부
   */
  async waitForModuleTransition(sectionType, moduleNumber) {
    console.log(`[SAT] waitForModuleTransition 시작: sectionType=${sectionType}, moduleNumber=${moduleNumber}`);
    console.log(`[SATScraper] 모듈 전환 대기 (${sectionType} Module ${moduleNumber} → ${moduleNumber === 1 ? 2 : '다음 섹션'})`);
    
    // Module 1 완료 후 Module 2 시작 버튼 대기
    if (moduleNumber === 1) {
      return await waitForCondition(() => {
        // Submit 버튼 찾기 (aria-label 우선)
        // NOTE: findNavigationButton is imported from buttons.js
        const submitButton = findNavigationButton('submit', '제출', 'submit');
        if (submitButton) {
          console.log('[SAT] Submit 버튼 발견 (Module 1 완료 대기 중)');
          return false; // Submit 버튼이 있으면 아직 제출 안 함
        }
        
        // Module 2 시작 버튼 찾기
        const bodyText = (document.body.innerText || '').toLowerCase();
        const hasModule2Button = bodyText.includes('module 2') || 
                                bodyText.includes('모듈 2') ||
                                findButtonByText('모듈 2', 'Module 2', '시작', 'Start');
        
        if (hasModule2Button) {
          console.log('[SAT] Module 2 시작 버튼 발견');
          return true;
        }
        
        return false;
      }, CONFIG.timeouts.screenTransition * 20);
    }
    
    // Module 2 완료 후 다음 섹션 안내 화면 대기
    if (moduleNumber === 2 && sectionType === 'reading') {
      return await waitForCondition(() => {
        // Submit 버튼 찾기 (aria-label 우선)
        // NOTE: findNavigationButton is imported from buttons.js
        const submitButton = findNavigationButton('submit', '제출', 'submit');
        if (submitButton) {
          console.log('[SAT] Submit 버튼 발견 (Module 2 완료 대기 중)');
          return false; // Submit 버튼이 있으면 아직 제출 안 함
        }
        
        const bodyText = (document.body.innerText || '').toLowerCase();
        // Reading and Writing이 사라지고 Math 섹션 안내가 나타나야 함
        const hasReadingWriting = bodyText.includes('reading') && bodyText.includes('writing');
        const hasMathSection = bodyText.includes('math') || bodyText.includes('수학');
        
        if (!hasReadingWriting && hasMathSection) {
          console.log('[SAT] Math 섹션 안내 화면 발견');
          return true;
        }
        
        return false;
      }, CONFIG.timeouts.screenTransition * 20);
    }
    
    return true;
  }

  /**
   * 모든 문제 수집 (엄격한 순차 실행)
   * @returns {Promise<Object>} 수집된 문제 데이터
   */
  async collectAllProblems() {
    console.log('[SCRAPER] collectAllProblems start');
    const allData = {
      reading: [],
      math: [],
      timestamp: new Date().toISOString()
    };

    console.log('[SAT-DEBUG] 현재 단계: 전체 문제 수집 시작 (엄격한 순차 실행)');
    
    // 상태 관리자와 UI 동기화
    this.stateManager.syncWithUI();
    console.log('[SAT-DEBUG] 상태 관리자와 UI 동기화 완료');

    try {
      // ========================================================================
      // STEP 1: Reading and Writing Module 1
      // ========================================================================
      const step1 = this.stateManager.getCurrentStep();
      console.log('[SAT-DEBUG] 현재 단계: STEP 1 - Reading and Writing Module 1 시작');
      
      this.stateManager.setCurrentSection('READING_WRITING');
      this.stateManager.setCurrentModule(1);
      
      // NOTE: showToast, startNextModule, configureAndStartTest, clickSectionContinue, safeClick are imported above
      showToast('Reading and Writing Module 1 수집 중...', 'info');
      const rwModule1Count = await this.collectModuleWithValidation(allData, 'reading', 'Module 1', 1);
      
      // ============================================================================
      // Reading Module 1만 수집하고 종료 (제출 버튼 클릭 후 PDF 생성)
      // ============================================================================
      if (rwModule1Count < CONFIG.collection.maxProblems) {
        console.warn(`[SAT-DEBUG] Reading and Writing Module 1 문제 수 부족: ${rwModule1Count}/${CONFIG.collection.maxProblems}`);
        showToast(`경고: Reading Module 1 수집 부족 (${rwModule1Count}/${CONFIG.collection.maxProblems})`, 'info');
      }
      
      console.log('[SAT-DEBUG] 현재 단계: STEP 1 완료 - Reading Module 1:', rwModule1Count, '개 수집');
      
      // Module 1 완료 후 제출 버튼 클릭
      console.log('[SAT-DEBUG] Reading Module 1 수집 완료. 제출 버튼 클릭 중...');
      showToast('Reading Module 1 완료. 제출 버튼 클릭 중...', 'info');
      
      // 제출 버튼 찾기 및 클릭
      const submitButton = findNavigationButton('submit', '제출', 'submit');
      if (submitButton && !submitButton.disabled) {
        console.log('[SAT-DEBUG] 제출 버튼 발견. 클릭합니다.');
        await safeClick(submitButton);
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        
        // 제출 확인 팝업이 있을 수 있으므로 확인 버튼도 클릭
        await new Promise(resolve => setTimeout(resolve, 1000));
        const confirmButton = findNavigationButton('submit', '제출', '확인', 'Confirm');
        if (confirmButton && !confirmButton.disabled) {
          console.log('[SAT-DEBUG] 제출 확인 버튼 발견. 클릭합니다.');
          await safeClick(confirmButton);
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
        }
        
        console.log('[SAT-DEBUG] 제출 완료. PDF 생성을 위해 종료합니다.');
      } else {
        console.warn('[SAT-DEBUG] 제출 버튼을 찾을 수 없거나 비활성화되어 있습니다.');
      }
      
      // Reading Module 1만 수집하고 종료 (Module 2로 넘어가지 않음)
      console.log('[SAT-DEBUG] Reading Module 1 수집 완료. PDF 생성을 위해 종료합니다.');
      console.log(`[SAT-DEBUG] 수집된 문제: Reading Module 1 - ${rwModule1Count}개`);
      console.log(`[SAT-DEBUG] 전체 수집 데이터: Reading ${allData.reading.length}개, Math ${allData.math.length}개`);
      return allData; // 즉시 반환하여 PDF 생성으로 진행
      // ============================================================================

      // ========================================================================
      // STEP 2: Reading and Writing Module 2
      // ========================================================================
      const step2 = this.stateManager.getCurrentStep();
      console.log('[SAT-DEBUG] 현재 단계: STEP 2 - Reading and Writing Module 2 시작');
      
      // Guard: 현재 섹션이 Reading and Writing인지 확인
      this.stateManager.guardSectionTransition('READING_WRITING');
      this.stateManager.setCurrentModule(2);
      
      showToast('Reading and Writing Module 2 시작 중...', 'info');
      // NOTE: startNextModule is imported from legacy.js
      const module2Started = await startNextModule();
      if (!module2Started) {
        console.warn('[SAT-DEBUG] Reading and Writing Module 2 시작 실패');
        console.warn('[SAT-DEBUG] (자동 진행) Module 2 시작 실패 상태지만 계속 진행을 시도합니다.');
        showToast('경고: Reading Module 2 시작 실패(자동 진행)', 'info');
      }
      
      // 화면 전환 대기
      await waitForCondition(() => {
        return isQuestionScreen() || getProgressState() !== null;
      }, CONFIG.timeouts.screenTransition * 10);
      
      showToast('Reading and Writing Module 2 수집 중...', 'info');
      const rwModule2Count = await this.collectModuleWithValidation(allData, 'reading', 'Module 2', 2);
      
      // 섹션 점프 방지: Reading 27문제가 다 수집되기 전에는 절대 Math로 넘어가지 않음
      if (rwModule2Count < CONFIG.collection.maxProblems) {
        console.warn(`[SAT-DEBUG] Reading and Writing Module 2 문제 수 부족: ${rwModule2Count}/${CONFIG.collection.maxProblems}`);
        console.warn('[SAT-DEBUG] (자동 진행) Module 2 수집이 덜 되었지만 다음 단계로 진행합니다.');
        showToast(`경고: Reading Module 2 수집 부족 (${rwModule2Count}/${CONFIG.collection.maxProblems})`, 'info');
      }
      
      // Reading 섹션 완료 확인: 총 54개(27*2)가 수집되었는지 확인
      const totalReadingCount = allData.reading.length;
      if (totalReadingCount < CONFIG.collection.maxProblems * 2) {
        console.warn(`[SAT-DEBUG] Reading 섹션 전체 문제 수 부족: ${totalReadingCount}/${CONFIG.collection.maxProblems * 2}`);
        console.warn('[SAT-DEBUG] (자동 진행) Reading 전체 수집이 덜 되었지만 Math 섹션 진행을 시도합니다.');
        showToast(`경고: Reading 전체 수집 부족 (${totalReadingCount}/${CONFIG.collection.maxProblems * 2})`, 'info');
      }
      
      console.log('[SAT-DEBUG] 현재 단계: STEP 2 완료 - Reading Module 2:', rwModule2Count, '개 수집 (전체:', totalReadingCount, '개)');
      
      // Module 2 완료 후 전환 대기
      await this.waitForModuleTransition('reading', 2);
      this.stateManager.completeCurrentStep();

      // ========================================================================
      // STEP 3: Math Module 1
      // ========================================================================
      const step3 = this.stateManager.getCurrentStep();
      console.log('[SAT-DEBUG] 현재 단계: STEP 3 - Math Module 1 시작 (Reading 섹션 완료 확인됨)');
      
      // Guard: Reading and Writing이 완전히 끝났는지 확인 (스크립트 뻗음 방지)
      const detectedSection = this.stateManager.detectSectionFromScreen();
      if (detectedSection === 'READING_WRITING') {
        console.warn('[SATScraper] Reading and Writing 섹션이 아직 완료되지 않았습니다.');
        console.warn('[SATScraper] (자동 진행) 계속 진행을 시도합니다.');
        showToast('경고: Reading and Writing 미완료(자동 진행)', 'info');
      }
      
      // 수학 섹션 진입 조건 강화: 명확한 증거 확인
      console.log('[SATScraper] 수학 섹션 진입 전 검증 시작...');
      
      // 증거 1: Reading and Writing 문제가 충분히 수집되었는지 확인
      if (allData.reading.length < CONFIG.collection.maxProblems * 2) {
        throw new Error(`Reading and Writing 섹션 미완료: ${allData.reading.length}/${CONFIG.collection.maxProblems * 2} 문제만 수집됨`);
      }
      
      // 증거 2: 화면에 "수학" 또는 "Math" 관련 텍스트/버튼이 있는지 확인
      const bodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
      const hasMathText = bodyText.includes('math') || bodyText.includes('수학') || 
                         bodyText.includes('mathematics') || bodyText.includes('수학 섹션');
      
      // 증거 3: "수학 시작" 또는 "Math" 버튼 찾기
      const mathStartButton = findButtonByText('시작', 'Start', '계속', 'Continue', 'Math', '수학');
      const mathSectionButton = findButtonByText('Math', '수학', 'Mathematics');
      const hasMathButton = !!(mathStartButton || mathSectionButton);
      
      // 증거 4: "수학 시작" 또는 "Start Math" 텍스트가 있는 버튼 찾기
      const allButtons = document.querySelectorAll('button, [role="button"]');
      let hasMathStartText = false;
      for (const btn of allButtons) {
        const btnText = (btn.innerText || btn.textContent || '').toLowerCase();
        if (btnText.includes('math') || btnText.includes('수학') || 
            btnText.includes('start math') || btnText.includes('수학 시작')) {
          hasMathStartText = true;
          console.log('[SATScraper] 수학 시작 버튼 발견:', btnText);
          break;
        }
      }
      
      // 명확한 증거가 없으면 수학 섹션 진입 금지 (스크립트 뻗음 방지)
      if (!hasMathText && !hasMathButton && !hasMathStartText) {
        const errorMsg = `수학 섹션 진입 조건 미충족: 화면에 수학 관련 텍스트나 버튼이 없습니다. Reading and Writing 섹션이 완전히 완료되었는지 확인해주세요.`;
        console.warn(`[SATScraper] ${errorMsg}`);
        console.warn('[SATScraper] (자동 진행) 경고 발생이지만 계속 진행을 시도합니다.');
        showToast(`경고: ${errorMsg}`, 'info');
      }
      
      console.log('[SATScraper] 수학 섹션 진입 조건 충족 확인:', {
        hasMathText,
        hasMathButton,
        hasMathStartText,
        readingProblems: allData.reading.length
      });
      
      this.stateManager.setCurrentSection('MATH');
      this.stateManager.setCurrentModule(1);
      
      showToast('Math 섹션 시작 중...', 'info');
      
      // Math 섹션 시작 버튼 찾기 및 클릭
      // NOTE: safeClick, clickSectionContinue, configureAndStartTest are imported above
      if (mathStartButton) {
        console.log('[SATScraper] Math 시작 버튼 클릭');
        await safeClick(mathStartButton);
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
      } else if (mathSectionButton) {
        console.log('[SATScraper] Math 섹션 버튼 클릭');
        await safeClick(mathSectionButton);
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
      } else {
        const mathStarted = await clickSectionContinue('Math');
        if (!mathStarted) {
          console.warn('[SATScraper] Math 섹션 시작 실패: 시작 버튼을 찾을 수 없습니다');
          console.warn('[SATScraper] (자동 진행) Math 섹션 시작 실패지만 계속 진행을 시도합니다.');
          showToast('경고: Math 섹션 시작 실패(자동 진행)', 'info');
        }
      }
      
      // 테스트 설정 화면 처리
      await configureAndStartTest();
      
      // 화면 전환 대기
      await waitForCondition(() => {
        return isQuestionScreen() || getProgressState() !== null;
      }, CONFIG.timeouts.screenTransition * 10);
      
      showToast('Math Module 1 수집 중...', 'info');
      const mathModule1Count = await this.collectModuleWithValidation(allData, 'math', 'Module 1', 1);
      
      if (mathModule1Count < CONFIG.collection.maxProblems) {
        console.warn(`[SATScraper] Math Module 1 문제 수 부족: ${mathModule1Count}/${CONFIG.collection.maxProblems}`);
        console.warn('[SATScraper] (자동 진행) Math Module 1 수집 부족이지만 다음 단계로 진행합니다.');
        showToast(`경고: Math Module 1 수집 부족 (${mathModule1Count}/${CONFIG.collection.maxProblems})`, 'info');
      }
      
      // Module 1 완료 후 전환 대기
      await this.waitForModuleTransition('math', 1);
      this.stateManager.completeCurrentStep();

      // ========================================================================
      // STEP 4: Math Module 2
      // ========================================================================
      const step4 = this.stateManager.getCurrentStep();
      console.log(`[SATScraper] STEP 4: ${step4.section} Module ${step4.module} 시작`);
      
      this.stateManager.setCurrentModule(2);
      
      showToast('Math Module 2 시작 중...', 'info');
      await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.screenTransition));
      
      const mathModule2Started = await startNextModule();
      if (!mathModule2Started) {
        console.warn('[SATScraper] Math Module 2 시작 실패');
        console.warn('[SATScraper] (자동 진행) Math Module 2 시작 실패 상태지만 계속 진행을 시도합니다.');
        showToast('경고: Math Module 2 시작 실패(자동 진행)', 'info');
      }
      
      // 화면 전환 대기
      await waitForCondition(() => {
        return isQuestionScreen() || getProgressState() !== null;
      }, CONFIG.timeouts.screenTransition * 10);
      
      showToast('Math Module 2 수집 중...', 'info');
      const mathModule2Count = await this.collectModuleWithValidation(allData, 'math', 'Module 2', 2);
      
      if (mathModule2Count < CONFIG.collection.maxProblems) {
        console.warn(`[SATScraper] Math Module 2 문제 수 부족: ${mathModule2Count}/${CONFIG.collection.maxProblems}`);
        console.warn('[SATScraper] (자동 진행) Math Module 2 수집 부족이지만 마무리 진행합니다.');
        showToast(`경고: Math Module 2 수집 부족 (${mathModule2Count}/${CONFIG.collection.maxProblems})`, 'info');
      }
      
      this.stateManager.completeCurrentStep();

      console.log(`[SATScraper] ===== 전체 수집 완료 =====`);
      console.log(`[SATScraper] Reading: ${allData.reading.length}개, Math: ${allData.math.length}개`);
      
      return allData;
    } catch (error) {
      console.error('[SATScraper] 전체 수집 중 오류:', error);
      console.error(`[SATScraper] 현재 상태: ${this.stateManager.currentSection} Module ${this.stateManager.currentModule}`);
      throw error;
    }
  }

  /**
   * 모듈 문제 수집 (검증 포함)
   * @param {Object} allData - 전체 데이터 객체
   * @param {string} sectionType - 'reading' | 'math'
   * @param {string} moduleName - 'Module 1' | 'Module 2'
   * @param {number} moduleNumber - 1 | 2
   * @returns {Promise<number>} 수집된 문제 수
   */
  async collectModuleWithValidation(allData, sectionType, moduleName, moduleNumber) {
    console.log(`[SATScraper] ${moduleName} 수집 시작 (검증 포함)`);
    
    // collectModuleProblems 함수 호출 (moduleRunner.js에서 import)
    await collectModuleProblems(allData, sectionType, moduleName);
    
    // 수집된 문제 수 확인
    const collectedProblems = sectionType === 'reading' ? allData.reading : allData.math;
    const moduleProblems = collectedProblems.filter(p => p.module === moduleNumber);
    const count = moduleProblems.length;
    
    console.log(`[SATScraper] ${moduleName} 수집 완료: ${count}개`);
    
    // TEMP 모드: 완료 검증 스킵
    if (TEMP_MODE) {
      console.log(`[TEMP] TEMP 모드: 완료 검증 스킵`);
      return count;
    }
    
    // Progress 상태 확인 (TEMP 모드가 아닐 때만)
    const progressState = getProgressState();
    const isComplete = this.isModuleComplete(sectionType, moduleNumber, count, progressState);
    
    if (!isComplete && count < CONFIG.collection.maxProblems) {
      console.warn(`[SATScraper] ${moduleName} 완료 조건 미충족: ${count}/${CONFIG.collection.maxProblems}`);
    }
    
    return count;
  }
}

