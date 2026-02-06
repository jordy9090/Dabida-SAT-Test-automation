// SectionStateManager - manages section and module state
// Extracted from stateMachine.js to separate concerns

import { getCurrentProblemNumber, getProgressState } from '../dom/extract.js';

/**
 * SectionStateManager 클래스
 * 섹션 및 모듈 상태를 엄격하게 관리
 */
export class SectionStateManager {
  constructor() {
    this.currentSection = null; // 'READING_WRITING' | 'MATH' | null
    this.currentModule = null;   // 1 | 2 | null
    this.expectedOrder = [
      { section: 'READING_WRITING', module: 1 },
      { section: 'READING_WRITING', module: 2 },
      { section: 'MATH', module: 1 },
      { section: 'MATH', module: 2 }
    ];
    this.currentStepIndex = 0;
  }

  /**
   * 현재 섹션 설정
   * @param {string} section - 'READING_WRITING' | 'MATH'
   * @throws {Error} 잘못된 섹션 전환 시도 시
   */
  setCurrentSection(section) {
    if (section !== 'READING_WRITING' && section !== 'MATH') {
      throw new Error(`잘못된 섹션: ${section}`);
    }

    const expectedStep = this.expectedOrder[this.currentStepIndex];
    if (expectedStep.section !== section) {
      const errorMsg = `섹션 순서 오류! 현재 단계: ${expectedStep.section} Module ${expectedStep.module}, 시도한 섹션: ${section}`;
      console.error(`[SectionStateManager] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    this.currentSection = section;
    console.log(`[SectionStateManager] 섹션 설정: ${section}`);
  }

  /**
   * 현재 모듈 설정 (유연화: 에러 대신 UI와 동기화)
   * @param {number} module - 1 | 2
   */
  setCurrentModule(module) {
    if (module !== 1 && module !== 2) {
      console.warn(`[SAT-DEBUG] 잘못된 모듈: ${module}, 기본값 1로 설정`);
      module = 1;
    }

    const expectedStep = this.expectedOrder[this.currentStepIndex];
    if (expectedStep.module !== module) {
      // 에러 대신 UI와 동기화: 현재 화면의 실제 문제 번호를 보고 상태 강제 업데이트
      console.warn(`[SAT-DEBUG] 모듈 순서 불일치 감지: 예상=${expectedStep.module}, 시도=${module}`);
      console.log('[SAT-DEBUG] UI와 동기화 시작...');
      
      // 현재 화면의 실제 문제 번호 확인
      const progress = getProgressState();
      const problemNum = getCurrentProblemNumber();
      const detectedSection = this.detectSectionFromScreen();
      
      console.log('[SAT-DEBUG] 현재 화면 상태:', {
        progress,
        problemNum,
        detectedSection,
        expectedStep
      });
      
      // UI 상태에 맞춰 강제 업데이트
      if (detectedSection) {
        this.currentSection = detectedSection;
        console.log(`[SAT-DEBUG] 섹션을 UI 상태로 업데이트: ${detectedSection}`);
      }
      
      // 문제 번호가 1-27이면 Module 1, 그 이상이면 Module 2로 추정
      if (problemNum > 0 && problemNum <= 27) {
        this.currentModule = 1;
        console.log(`[SAT-DEBUG] 모듈을 UI 상태로 업데이트: Module 1 (문제 번호: ${problemNum})`);
      } else if (problemNum > 27) {
        this.currentModule = 2;
        console.log(`[SAT-DEBUG] 모듈을 UI 상태로 업데이트: Module 2 (문제 번호: ${problemNum})`);
      } else {
        // 문제 번호를 못 찾았으면 시도한 모듈 사용
        this.currentModule = module;
        console.log(`[SAT-DEBUG] 모듈을 시도한 값으로 설정: Module ${module}`);
      }
    } else {
      this.currentModule = module;
      console.log(`[SectionStateManager] 모듈 설정: ${module}`);
    }
  }
  
  /**
   * UI와 상태 동기화 (현재 화면의 텍스트를 분석해서 자동으로 맞춤)
   */
  syncWithUI() {
    console.log('[SAT-DEBUG] 현재 단계: UI와 상태 동기화 시작');
    
    const detectedSection = this.detectSectionFromScreen();
    const progress = getProgressState();
    const problemNum = getCurrentProblemNumber();
    
    // 섹션 동기화
    if (detectedSection) {
      this.currentSection = detectedSection;
      console.log(`[SAT-DEBUG] 섹션 동기화: ${detectedSection}`);
    }
    
    // 모듈 동기화 (문제 번호 기반)
    if (problemNum > 0 && problemNum <= 27) {
      this.currentModule = 1;
      console.log(`[SAT-DEBUG] 모듈 동기화: Module 1 (문제 번호: ${problemNum})`);
    } else if (problemNum > 27) {
      this.currentModule = 2;
      console.log(`[SAT-DEBUG] 모듈 동기화: Module 2 (문제 번호: ${problemNum})`);
    } else if (progress) {
      // Progress에서 모듈 추정 (예: 1/27이면 Module 1)
      const match = progress.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) {
        const current = parseInt(match[1]);
        if (current <= 27) {
          this.currentModule = 1;
          console.log(`[SAT-DEBUG] 모듈 동기화: Module 1 (Progress: ${progress})`);
        } else {
          this.currentModule = 2;
          console.log(`[SAT-DEBUG] 모듈 동기화: Module 2 (Progress: ${progress})`);
        }
      }
    }
    
    // StepIndex도 조정 (현재 상태에 맞게)
    for (let i = 0; i < this.expectedOrder.length; i++) {
      const step = this.expectedOrder[i];
      if (step.section === this.currentSection && step.module === this.currentModule) {
        this.currentStepIndex = i;
        console.log(`[SAT-DEBUG] StepIndex 동기화: ${i} (${step.section} Module ${step.module})`);
        break;
      }
    }
    
    console.log('[SAT-DEBUG] 현재 단계: UI와 상태 동기화 완료', {
      section: this.currentSection,
      module: this.currentModule,
      stepIndex: this.currentStepIndex
    });
  }

  /**
   * 현재 단계 완료 처리 및 다음 단계로 이동
   * @returns {Object|null} 다음 단계 정보 또는 null (모든 단계 완료)
   */
  completeCurrentStep() {
    if (this.currentStepIndex >= this.expectedOrder.length - 1) {
      console.log('[SectionStateManager] 모든 단계 완료!');
      return null;
    }

    this.currentStepIndex++;
    const nextStep = this.expectedOrder[this.currentStepIndex];
    console.log(`[SectionStateManager] 다음 단계: ${nextStep.section} Module ${nextStep.module}`);
    return nextStep;
  }

  /**
   * 현재 단계 정보 가져오기
   * @returns {Object} 현재 단계 정보
   */
  getCurrentStep() {
    return this.expectedOrder[this.currentStepIndex];
  }

  /**
   * 섹션 Guard: 현재 섹션이 지정된 섹션인지 확인
   * @param {string} expectedSection - 예상 섹션
   * @returns {boolean} 일치 여부
   */
  isCurrentSection(expectedSection) {
    return this.currentSection === expectedSection;
  }

  /**
   * 화면에서 섹션 감지 및 검증
   * @returns {string|null} 감지된 섹션 또는 null
   */
  detectSectionFromScreen() {
    const bodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
    
    const hasReading = bodyText.includes('reading');
    const hasWriting = bodyText.includes('writing');
    const hasMath = bodyText.includes('math') || bodyText.includes('수학');
    
    // Reading and Writing 섹션 확인 (둘 다 있어야 함)
    if (hasReading && hasWriting && !hasMath) {
      return 'READING_WRITING';
    }
    
    // Math 섹션 확인
    if (hasMath && (!hasReading || !hasWriting)) {
      return 'MATH';
    }
    
    return null;
  }

  /**
   * 섹션 Guard: 잘못된 섹션으로의 전환 차단
   * @param {string} attemptedSection - 시도하려는 섹션
   * @throws {Error} Guard 위반 시
   */
  guardSectionTransition(attemptedSection) {
    const detectedSection = this.detectSectionFromScreen();
    
    // 현재 섹션이 Reading and Writing인데 Math로 전환 시도
    if (this.currentSection === 'READING_WRITING' && attemptedSection === 'MATH') {
      // 먼저 화면에서 Reading and Writing이 사라졌는지 확인
      if (detectedSection === 'READING_WRITING') {
        const errorMsg = 'Reading and Writing 섹션이 아직 완료되지 않았습니다. Math로 전환할 수 없습니다.';
        console.error(`[SectionStateManager] ${errorMsg}`);
        throw new Error(errorMsg);
      }
    }
  }
}

