// Extracted CONFIG from content.js
// NOTE: Logic must remain identical to original definition.

export const CONFIG = {
  // CSS 셀렉터
  selectors: {
    // 문제 화면 판별용
    choice: '[role="radio"], button[aria-label*="Choice"], button[class*="choice"], [class*="option"]',
    correct: '.correct, [aria-label*="Correct"], [aria-label*="정답"], [class*="correct"], [class*="정답"]',
    incorrect: '[class*="incorrect"], [class*="오답"]',
    // 버튼
    button: 'button, [role="button"]',
    // 문제 번호
    problemNumber: '[class*="problem"], [class*="question"], [data-problem-number]',
    // Progress 표시
    progress: '[class*="progress"], [aria-label*="progress"]',
  },
  // 타임아웃 설정 (밀리초)
  timeouts: {
    elementWait: 500,        // 요소 대기 간격
    maxElementWait: 5000,     // 최대 요소 대기 시간
    screenTransition: 2000,  // 화면 전환 대기
    contentLoad: 2000,        // 콘텐츠 로드 대기
    gradingWait: 3000,        // 채점 완료 대기
    clickDelay: 500,          // 클릭 후 대기
    scrollDelay: 800,         // 스크롤 후 대기
    pdfDownloadDelay: 800,    // PDF 다운로드 간격
  },
  // 재시도 설정
  retries: {
    elementFind: 15,          // 요소 찾기 재시도 횟수
    buttonClick: 3,           // 버튼 클릭 재시도 횟수
    navigation: 30,           // 네비게이션 재시도 횟수
    consecutiveFailures: 3,   // 최대 연속 실패 횟수
  },
  // 버튼 텍스트 (다국어 지원)
  buttonTexts: {
    open: ['열기', 'Open'],
    continue: ['계속', 'Continue'],
    start: ['시작', 'Start', '테스트 시작', 'Start Test'],
    next: ['다음', 'Next'],
    submit: ['제출', 'Submit', '확인', 'Confirm'],
    first: ['처음', 'First', '1'],
  },
  // 문제 수집 설정
  collection: {
    maxIterations: 60,        // 최대 반복 횟수
    maxProblems: 27,          // 모듈당 최대 문제 수
  },
};

// TEMP 모드 설정 (비활성화: Module 1 전체 수집)
export const TEMP_MODE = false;
export const TEMP_TARGET_NUMBERS = [1, 2, 3]; // TEMP 모드 비활성화로 사용 안 함


