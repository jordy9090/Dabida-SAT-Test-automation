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
  // 타임아웃 설정 (밀리초) - 속도 최적화 (문제 스크랩 집중)
  timeouts: {
    elementWait: 80,         // 요소 대기 간격
    maxElementWait: 2500,    // 최대 요소 대기 시간
    screenTransition: 150,  // 화면 전환 대기 (UI 반응 빠름)
    contentLoad: 150,        // 콘텐츠 로드 대기
    gradingWait: 1000,      // 채점 완료 대기
    clickDelay: 120,        // 클릭 후 대기
    scrollDelay: 150,       // 스크롤 후 대기
    pdfDownloadDelay: 300,  // PDF 다운로드 간격
    // 문제 생성 탭: 선지 선택 구간 대기 (너무 빨리 지나가는 것 방지, 특히 사진 있는 문제)
    beforeChoiceClick: 400,           // 선지 클릭 전 대기 (문제/선지 인지 시간)
    beforeChoiceClickWithImage: 2800, // 이미지 있는 문제: 선지 클릭 전 2.8초 대기
    afterChoiceClick: 450,            // 선지 클릭 후 제출 전 대기
    afterChoiceClickWithImage: 2800,  // 이미지 있는 문제: 선지 클릭 후 2.8초 대기
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
    maxProblems: 27,          // Reading 모듈당 최대 문제 수
    mathMaxProblems: 22,      // Math 모듈당 최대 문제 수 (주관식 포함)
  },
  // Gemini 채팅 자동화 설정
  geminiChat: {
    inputSelectors: [
      '[data-testid*="input"]',
      '[data-testid*="textbox"]',
      '[role="textbox"]',
      '[role="combobox"]',
      '[contenteditable="true"]',
      'textarea[aria-label*="message"]',
      'textarea[aria-label*="prompt"]',
      'textarea[aria-label*="chat"]',
      'textarea[aria-label*="입력"]',
      'textarea[aria-label*="물어보기"]',
      'textarea[aria-label*="ask"]',
      'textarea[placeholder*="message"]',
      'textarea[placeholder*="prompt"]',
      'textarea[placeholder*="chat"]',
      'textarea[placeholder*="입력"]',
      'textarea[placeholder*="물어보기"]'
    ],
    submitSelectors: [
      'button[data-testid*="send"]',
      'button[data-testid*="submit"]',
      'button[aria-label*="send"]',
      'button[aria-label*="Send"]',
      'button[aria-label*="전송"]',
      'button[type="submit"]',
      'button[aria-label*="submit"]'
    ],
    message: 'I want to take a full practice SAT TEST.',
    satUIWaitTimeout: 60000,  // SAT UI 대기 타임아웃 (1분)
  },
  // Gemini SAT UI 진입 후 설정 단계 (geminiSetup.js)
  geminiSetup: {
    startButtonSelectors: [
      'section-overview glowing-card:first-child .section-button-container button',
      'glowing-card .section-button-container.ng-star-inserted button',
      'activity-set section-overview .glowing-card .section-button-container button',
    ],
    firstToggleSelectors: [
      'button[id^="mat-mdc-slide-toggle-"]',
      '.mdc-switch',
      'span.mdc-switch__handle-track',
      'span.mdc-switch__shadow',
    ],
    secondToggleSelectors: [
      'button[id^="mat-mdc-slide-toggle-"]',
      'span.mdc-switch__track',
    ],
    setupSequenceTimeout: 15000,  // 설정 시퀀스 최대 대기 (15초)
  },
};

// TEMP 모드 설정 (비활성화: Module 1 전체 수집)
export const TEMP_MODE = false;
export const TEMP_TARGET_NUMBERS = [1, 2, 3]; // TEMP 모드 비활성화로 사용 안 함


