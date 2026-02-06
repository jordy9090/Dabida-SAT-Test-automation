// Gemini SAT PDF Exporter - Content Script
// Google Gemini SAT 인터페이스에서 문제와 해설을 추출하여 PDF로 변환

// ============================================================================
// [BOOT] 즉시 진단 로그
// ============================================================================
const BUILD_TS = Date.now();
console.log('[BOOT] dist/content.js loaded BUILD_TS=' + BUILD_TS, location.href, 'top?', window === window.top);
window.__SAT_BOOT_TS__ = BUILD_TS;
window.__SAT_BUILD_TS__ = BUILD_TS;

import { CONFIG } from './src/config/constants.js';
import { deepQuerySelectorAll, isElementVisible, dumpHTMLStructure } from './src/dom/deepQuery.js';
import { waitForElement, waitForCondition, waitForContentLoad, forceClick, safeClick, showToast } from './src/dom/wait.js';
import { isQuestionScreen, detectCurrentSection, extractChoices, extractCurrentProblem, getProgressState, getCurrentProblemNumber, getQuestionSignature, isGraded, waitForGrading, detectCorrectAnswer, extractExplanationAfterGrading, extractText, extractAnswer, extractExplanation, checkIfGraded, extractByTextPattern, extractReadingSection, extractMathSection, extractSATData, waitForAnswerUIWithNextButtonCheck, extractAnswerFromGradedUI } from './src/dom/extract.js';
import { findButtonByText, findNavigationButton, clickSubmitWithConfirmation, clickNextButtonWithFallback, clickFirstChoice } from './src/dom/buttons.js';
import { SATNavigator } from './src/flow/navigator.js';
import { SectionStateManager, SATScraper, collectModuleProblems } from './src/flow/stateMachine.js';
import { PDFGenerator } from './src/pdf/pdfGenerator.js';
import { looksLikeSatQuestionUI, findWorkerFrame, setupFrameMessageListener } from './src/frame/workerFrame.js';
import { SATApp, initButtonSafely } from './src/entry/content.entry.js';
import { configureAndStartTest, clickSectionContinue, startNextModule } from './src/flow/navigator.js';

(function() {
  'use strict';

  // ============================================================================
  // FRAME ELECTION - 문제 UI가 있는 프레임 찾기
  // ============================================================================

  /**
   * 문제 UI가 있는 프레임인지 판정 (널널하게 잡기)
   * @returns {boolean} 문제 UI 여부
   * NOTE: Moved to src/frame/workerFrame.js
   */
  /**
   * Worker 프레임 찾기 (모든 프레임에 probe 브로드캐스트)
   * @returns {Promise<Object|null>} worker 프레임 정보 또는 null
   * NOTE: Moved to src/frame/workerFrame.js
   */
  /**
   * 프레임별 메시지 리스너 (각 프레임에서 실행)
   * NOTE: Moved to src/frame/workerFrame.js
   */
  // 프레임 메시지 리스너 초기화 (모든 프레임에서 실행)
  setupFrameMessageListener();

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * jsPDF 라이브러리 가져오기
   * @returns {Function} jsPDF 생성자 함수
   * @throws {Error} jsPDF를 찾을 수 없을 때
   * NOTE: Moved to src/pdf/pdfGenerator.js
   */
  /**
   * 특정 요소가 나타날 때까지 대기 (재시도 메커니즘 포함)
   * @param {string|Function} selector - CSS 셀렉터 또는 요소를 반환하는 함수
   * @param {number} retries - 최대 재시도 횟수
   * @param {number} interval - 재시도 간격 (밀리초)
   * @returns {Promise<Element|null>} 찾은 요소 또는 null
   */
  // 구현은 src/dom/wait.js의 waitForElement를 사용

  /**
   * 안전한 버튼 클릭 (재시도 메커니즘 포함)
   * @param {Element} button - 클릭할 버튼 요소
   * @param {number} retries - 최대 재시도 횟수
   * @returns {Promise<boolean>} 클릭 성공 여부
   */
  /**
   * 강제 클릭 함수 (pointerdown 등 이벤트 포함)
   * @param {HTMLElement} button - 클릭할 버튼 요소
   * @param {number} retries - 재시도 횟수
   * @returns {Promise<boolean>} 성공 여부
   * NOTE: Moved to src/dom/wait.js
   */
  /**
   * 안전한 버튼 클릭 (재시도 메커니즘 포함)
   * NOTE: Moved to src/dom/wait.js
   */
  /**
   * 토스트 메시지 표시
   * @param {string} message - 표시할 메시지
   * @param {string} type - 메시지 타입 ('info', 'success', 'error')
   * NOTE: Moved to src/dom/wait.js
   */
  // 테스트 설정 화면 처리: '각 답변 다음에 정답 표시' 토글 켜기 + 테스트 시작
  // NOTE: Moved to src/legacy/legacy.js
  // 섹션 선택 화면에서 '계속' 클릭
  // NOTE: Moved to src/legacy/legacy.js
  // 제출 버튼 클릭 (확인 팝업 처리 포함)
  // NOTE: Moved to src/dom/buttons.js
  // ============================================================================
  // CLASSES - 객체 지향적 구조
  // ============================================================================

  // SATNavigator 클래스 구현은 src/flow/navigator.js로 이동
  // SectionStateManager, SATScraper, collectModuleProblems는 src/flow/stateMachine.js로 이동

  // SectionStateManager 클래스는 src/flow/stateMachine.js로 이동됨

  // SATScraper 클래스는 src/flow/stateMachine.js로 이동됨

  // PDFGenerator 클래스는 src/pdf/pdfGenerator.js로 이동됨
  // SATApp 클래스는 src/entry/content.entry.js로 이동됨

  // ============================================================================
  // LEGACY FUNCTIONS (기존 코드 호환성 유지)
  // ============================================================================

  // 자동 진입 시퀀스 처리 함수 (시작 화면 → 섹션 안내 화면 → 실제 문제 화면)
  // NOTE: Moved to src/flow/navigator.js (SATNavigator.handleInitialNavigation)
  // 모든 문제를 자동으로 수집하는 함수 (전체 흐름 재구성)
  // ============================================================================
  // LEGACY FUNCTION (더 이상 사용하지 않음 - SATScraper.collectAllProblems 사용)
  // ============================================================================
  // 이 함수는 엄격한 순차 실행 로직이 없어서 섹션 순서가 꼬일 수 있습니다.
  // 새로운 SATScraper.collectAllProblems()를 사용하세요.
  // 특정 모듈의 모든 문제 수집 (강화된 상태머신: ANSWER → GRADE → EXTRACT → NEXT)
  // NOTE: Moved to src/flow/stateMachine.js (placeholder for now)
  // Progress 상태 가져오기 (예: "3/27") - 수정: 27 고정
  /**
   * Progress 상태 가져오기 (대폭 강화 - 화면 전체에서 정규식으로 찾기)
   * @returns {string|null} Progress 상태 (예: "1/27", "5/27")
   * NOTE: Moved to src/dom/extract.js
   */
  // 현재 섹션이 Reading인지 Math인지 감지
  // NOTE: Moved to src/dom/extract.js
  // 다음 버튼 클릭 (강화된 성공 판정 + 폴백 전략)
  /**
   * 다음 버튼 클릭 로직 강화 (다양한 셀렉터, 비활성화 대기, 문제 번호 변경 확인)
   * @param {number} beforeProblemNum - 클릭 전 문제 번호
   * @returns {Promise<boolean>} 성공 여부
   * NOTE: Moved to src/dom/buttons.js
   */
  // 다음 모듈 시작 (Module 2로 이동)
  // NOTE: Moved to src/legacy/legacy.js
  // Math 섹션으로 이동
  // NOTE: Moved to src/flow/navigator.js (SATNavigator.navigateToMathSection)
  // 현재 문제 번호 가져오기 (100% 신뢰 가능 + 폴백) - 수정: body text regex 금지, 27 고정
  // NOTE: Moved to src/dom/extract.js
  /**
   * 문제 시그니처 생성 (지문 해시 기반 - 문제 번호를 못 찾을 때 폴백용)
   * @returns {string} 문제 시그니처 해시
   * NOTE: Moved to src/dom/extract.js
   */
  // 네비게이션 버튼 찾기 (aria-label/data-testid 우선, Shadow DOM 포함)
  // NOTE: Moved to src/dom/buttons.js
  // 콘텐츠 로드 대기 구현은 src/dom/wait.js의 waitForContentLoad를 사용

  // SAT 문제 데이터 추출 함수 (현재 화면만) - 수정: 섹션 감지 후 분기
  // NOTE: Moved to src/dom/extract.js
  // Reading 섹션 데이터 추출 (실제 화면에서 보이는 텍스트 직접 추출)
  // NOTE: Moved to src/dom/extract.js
  // Math 섹션 데이터 추출 (실제 화면에서 보이는 텍스트 직접 추출)
  // NOTE: Moved to src/dom/extract.js
  // 텍스트 패턴 기반 추출 (대체 방법)
  // NOTE: Moved to src/dom/extract.js
  // 텍스트 추출 헬퍼 함수
  // NOTE: Moved to src/dom/extract.js
  // 선택지 추출
  // 선택지 추출 - 수정: 클릭 가능한 요소에서만 추출 (A-D만)
  // NOTE: Moved to src/dom/extract.js
  // 현재 문제 추출 (지문, 문제 본문, 선택지만 - 정답/해설 제외)
  // 데이터 구조 고정: { problemNumber, question, choices: {A, B, C, D}, correctAnswer, explanation }
  // NOTE: Moved to src/dom/extract.js
  // 채점 상태 확인 (초록 박스가 이미 표시되어 있는지)
  // NOTE: Moved to src/dom/extract.js
  // 선택지 클릭 (A/B/C/D 중 첫 번째 유효한 것) - 강제 클릭
  // clickFirstChoice 함수는 src/dom/buttons.js로 이동됨

  /**
   * 채점 완료 대기 (정답/해설 로딩 대기 강화)
   * @returns {Promise<string|null>} 'correct' | 'incorrect' | null
   * NOTE: Moved to src/dom/extract.js
   */
  // 정답 추출 (초록색 선택지에서 DOM 상태로)
  // NOTE: Moved to src/dom/extract.js
  // Explanation 추출 (채점 후 DOM에서만)
  // NOTE: Moved to src/dom/extract.js
  // 정답 UI(초록 박스)가 나타날 때까지 대기 및 정답 추출 (next 버튼 활성화도 확인) - DEPRECATED
  // NOTE: Moved to src/dom/extract.js
  // 이미 채점된 상태에서 정답 추출
  // NOTE: Moved to src/dom/extract.js
  // 정답 추출 (레거시 함수 - 호환성 유지)
  // NOTE: Moved to src/dom/extract.js
  // 문제지 PDF 생성 (지문 + 문제 + 선택지, 정답/해설 없음)
  // NOTE: Moved to src/pdf/pdfGenerator.js
  // 문제지용: 섹션을 PDF에 추가 (정답/해설 제외)
  // NOTE: Moved to src/pdf/pdfGenerator.js
  // 정답지용: 섹션을 PDF에 추가 (정답 + 해설만)
  // NOTE: Moved to src/pdf/pdfGenerator.js
  // 토스트 메시지 표시 함수
  // NOTE: Moved to src/dom/wait.js
  // function showToast(message, type = 'info') { ... }

  // Export 버튼 생성 및 이벤트 연결
  // NOTE: Moved to src/entry/content.entry.js (SATApp.createExportButton)
  // SATApp 인스턴스 생성 및 초기화
  // NOTE: SATApp is now imported from src/entry/content.entry.js
  console.log('[BOOT] creating SATApp instance', 'top?', window === window.top);
  const app = new SATApp();
  window.satApp = app; // 전역에 저장
  window.__SAT_APP = app; // 호환성을 위해 __SAT_APP도 설정
  window.SATApp = SATApp; // 디버깅용 전역 클래스
  window.PDFGenerator = PDFGenerator; // 디버깅용 전역 클래스

  // 버튼 생존력 극대화: 최상단에서 즉시 실행
  console.log('[BOOT] calling initButtonSafely', 'top?', window === window.top);
  initButtonSafely();

  // DOMContentLoaded 이벤트도 대비
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[SAT PDF Exporter] DOMContentLoaded - 버튼 생성');
      app.init();
    });
  }

  // 버튼 생존력 강화: document.documentElement 레벨 MutationObserver (Zombie Button)
  const zombieButtonObserver = new MutationObserver(() => {
    try {
      // 컨텍스트 유효성 체크
      if (typeof chrome !== 'undefined' && chrome.runtime && !chrome.runtime.id) {
        return; // Extension context invalidated
      }

      const button = document.getElementById('gemini-sat-pdf-export-btn');
      if (!button && document.body) {
        console.log('[SAT-DEBUG] [Zombie Button] 버튼이 사라짐 감지 - 즉시 부활 (0.5초 내)');
        setTimeout(() => {
          try {
            initButtonSafely();
          } catch (error) {
            console.error('[SAT-DEBUG] [Zombie Button] 버튼 재생성 실패:', error);
          }
        }, 500); // 0.5초 내 즉시 부활
      } else if (button) {
        // 버튼이 있지만 숨겨져 있을 수 있으므로 확인
        const computedStyle = window.getComputedStyle(button);
        if (computedStyle.display === 'none' || 
            computedStyle.visibility === 'hidden' || 
            computedStyle.opacity === '0') {
          console.log('[SAT PDF Exporter] [Zombie Button] 버튼이 숨겨져 있음 - 스타일 강제 적용');
          button.style.display = 'block';
          button.style.visibility = 'visible';
          button.style.opacity = '1';
          button.style.zIndex = '2147483647';
        }
      }
    } catch (error) {
      console.error('[SAT PDF Exporter] [Zombie Button] 오류 (스크립트는 계속 실행):', error);
    }
  });

  // document.documentElement 레벨로 관찰 시작 (최상위 레벨)
  if (document.documentElement) {
    zombieButtonObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    console.log('[SAT PDF Exporter] [Zombie Button] document.documentElement 레벨 관찰 시작');
  }

  // 동적 콘텐츠 로딩 대응 (기존 로직 유지)
  const observer = new MutationObserver((mutations) => {
    try {
      // 컨텍스트 유효성 체크
      if (typeof chrome !== 'undefined' && chrome.runtime && !chrome.runtime.id) {
        return;
      }

      const button = document.getElementById('gemini-sat-pdf-export-btn');
      if (!button && document.body) {
        console.log('[SAT PDF Exporter] 버튼이 없어서 재생성합니다.');
        app.init();
      }
    } catch (error) {
      console.error('[SAT PDF Exporter] Observer 오류:', error);
    }
  });

  // body가 있으면 즉시 관찰 시작
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    // body가 없으면 대기 후 관찰 시작
    const bodyObserver = new MutationObserver(() => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        bodyObserver.disconnect();
      }
    });
    bodyObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  // 주기적으로 버튼 존재 확인 (백업 - 컨텍스트 유효성 체크 포함)
  setInterval(() => {
    try {
      // 컨텍스트 유효성 체크
      if (typeof chrome !== 'undefined' && chrome.runtime && !chrome.runtime.id) {
        console.warn('[SAT PDF Exporter] Extension context invalidated - 주기적 확인 스킵');
        return;
      }

      const button = document.getElementById('gemini-sat-pdf-export-btn');
      if (!button && document.body) {
        console.log('[SAT PDF Exporter] 주기적 확인 - 버튼 재생성');
        app.init();
      } else if (button) {
        // 버튼이 있지만 보이지 않을 수 있으므로 스타일 강제 적용
        const computedStyle = window.getComputedStyle(button);
        if (computedStyle.display === 'none' || 
            computedStyle.visibility === 'hidden' || 
            computedStyle.opacity === '0') {
          console.log('[SAT PDF Exporter] 버튼이 숨겨져 있음 - 스타일 강제 적용');
          button.style.display = 'block';
          button.style.visibility = 'visible';
          button.style.opacity = '1';
          button.style.zIndex = '2147483647';
        }
      }
    } catch (error) {
      console.error('[SAT PDF Exporter] 주기적 확인 오류 (스크립트는 계속 실행):', error);
    }
  }, 2000);

})();

