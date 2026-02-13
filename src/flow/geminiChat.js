// Gemini 채팅 자동화 모듈
// Gemini 채팅 페이지에서 "I want to take a sat test"를 입력하고 SAT UI 진입까지 담당

import { CONFIG } from '../config/constants.js';
import { deepQuerySelectorAll, isElementVisible } from '../dom/deepQuery.js';
import { waitForElement, waitForCondition, waitForContentLoad, safeClick, showToast } from '../dom/wait.js';
import { looksLikeSatQuestionUI } from '../frame/workerFrame.js';
import { isQuestionScreen, getProgressState } from '../dom/extract.js';

/**
 * Gemini 채팅 페이지인지 확인
 * @returns {boolean}
 */
export function isGeminiChatPage() {
  try {
    // URL 패턴 확인
    if (!window.location.href.includes('gemini.google.com')) {
      return false;
    }
    
    // SAT UI 요소가 이미 있으면 채팅 페이지가 아님
    if (looksLikeSatQuestionUI() || isQuestionScreen() || getProgressState() !== null) {
      return false;
    }
    
    // 채팅 입력창이 있는지 확인 (느슨한 체크)
    const allInputs = deepQuerySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
    const inputsWithAttrs = allInputs.map(el => {
      const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
      const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
      const title = (el.getAttribute('title') || '').toLowerCase();
      const text = (el.innerText || '').slice(0, 80).toLowerCase();
      return { visible: isElementVisible(el), placeholder, ariaLabel, title, text };
    });
    const hasInput = allInputs.some(el => {
      if (!isElementVisible(el)) return false;
      const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
      const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
      const title = (el.getAttribute('title') || '').toLowerCase();
      const text = (el.innerText || '').slice(0, 80).toLowerCase();
      return placeholder.includes('message') || placeholder.includes('prompt') || placeholder.includes('chat') || placeholder.includes('입력') ||
             placeholder.includes('물어보기') || placeholder.includes('ask') ||
             ariaLabel.includes('message') || ariaLabel.includes('prompt') || ariaLabel.includes('chat') || ariaLabel.includes('입력') ||
             ariaLabel.includes('프롬프트') || ariaLabel.includes('물어보기') || ariaLabel.includes('ask') ||
             title.includes('message') || title.includes('prompt') || title.includes('chat') || title.includes('프롬프트') ||
             text.includes('물어보기') || text.includes('ask');
    });
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:isGeminiChatPage',message:'isGeminiChatPage result',data:{hasInput,inputCount:allInputs.length,sampleAttrs:inputsWithAttrs.slice(0,3)},timestamp:Date.now(),runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return hasInput;
  } catch (error) {
    console.warn('[GeminiChat] isGeminiChatPage 오류:', error);
    return false;
  }
}

/**
 * SAT 테스트 페이지인지 확인
 * @returns {boolean}
 */
export function isSATTestPage() {
  try {
    return looksLikeSatQuestionUI() || isQuestionScreen() || getProgressState() !== null;
  } catch (error) {
    console.warn('[GeminiChat] isSATTestPage 오류:', error);
    return false;
  }
}

/**
 * Gemini 채팅 자동화 클래스
 */
export class GeminiChatAutomator {
  constructor() {
    this.isProcessing = false;
  }

  /**
   * 채팅 입력창 찾기 (우선순위: data-testid/role → aria-label/placeholder → 전체 스캔)
   * @returns {Promise<HTMLElement|null>}
   */
  async findChatInput() {
    console.log('[GeminiChat] 입력창 찾기 시작...');
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:findChatInput:entry',message:'findChatInput entry',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    // 1순위: data-testid, role 기반 셀렉터
    for (const selector of CONFIG.geminiChat.inputSelectors.slice(0, 4)) {
      const elements = deepQuerySelectorAll(selector);
      for (const el of elements) {
        if (isElementVisible(el) && !el.disabled && !el.readOnly) {
          console.log('[GeminiChat] 입력창 발견 (1순위):', selector, el);
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:findChatInput:found1',message:'input found tier1',data:{selector,tagName:el.tagName,hasValue:!!el.value,contentEditable:el.contentEditable},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          return el;
        }
      }
    }
    
    // 2순위: aria-label, placeholder 기반
    for (const selector of CONFIG.geminiChat.inputSelectors.slice(4)) {
      const elements = deepQuerySelectorAll(selector);
      for (const el of elements) {
        const isEditable = el.contentEditable === 'true' || (!el.disabled && el.readOnly !== true);
        if (isElementVisible(el) && isEditable) {
          const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
          const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
          const title = (el.getAttribute('title') || '').toLowerCase();
          const matches = placeholder.includes('message') || placeholder.includes('prompt') || placeholder.includes('chat') || placeholder.includes('입력') ||
              placeholder.includes('물어보기') || placeholder.includes('ask') ||
              ariaLabel.includes('message') || ariaLabel.includes('prompt') || ariaLabel.includes('chat') || ariaLabel.includes('입력') ||
              ariaLabel.includes('물어보기') || ariaLabel.includes('ask') ||
              title.includes('message') || title.includes('prompt') || title.includes('chat') || title.includes('물어보기');
          if (matches) {
            console.log('[GeminiChat] 입력창 발견 (2순위):', selector, el);
            return el;
          }
        }
      }
    }
    
    // 3순위: textarea, input, contenteditable 전체 스캔 (최후의 fallback)
    const allInputs = deepQuerySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
    for (const el of allInputs) {
      if (isElementVisible(el) && (el.disabled === false || el.disabled === undefined) && el.readOnly !== true) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) {
          console.log('[GeminiChat] 입력창 발견 (3순위 - 전체 스캔):', el);
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:findChatInput:found3',message:'input found tier3',data:{tagName:el.tagName,contentEditable:el.contentEditable,rectBottom:rect.bottom,innerHeight:window.innerHeight},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          return el;
        }
      }
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:findChatInput:notFound',message:'input not found',data:{allInputsCount:allInputs.length},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    console.warn('[GeminiChat] 입력창을 찾을 수 없습니다.');
    return null;
  }

  /**
   * 메시지 입력 및 전송
   * @param {string} message - 입력할 메시지
   * @returns {Promise<boolean>} 성공 여부
   */
  async typeMessage(message) {
    console.log('[GeminiChat] 메시지 입력 시작:', message);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:typeMessage:entry',message:'typeMessage entry',data:{messageLen:message?.length},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    const input = await this.findChatInput();
    if (!input) {
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:typeMessage:inputNull',message:'findChatInput returned null',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      throw new Error('채팅 입력창을 찾을 수 없습니다.');
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:typeMessage:inputFound',message:'input found for typing',data:{tagName:input.tagName,contentEditable:input.contentEditable,hasValueProp:!!('value' in input)},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    try {
      // 입력창에 포커스
      input.focus();
      await new Promise(resolve => setTimeout(resolve, 120));
      
      // 기존 내용 지우기
      if (input.value) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      }
      if (input.contentEditable === 'true') {
        input.textContent = '';
        input.innerHTML = '';
        input.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'deleteContentForward' }));
      }
      
      // 텍스트 입력 (여러 방법 시도)
      if (input.contentEditable === 'true') {
        input.textContent = message;
        input.innerText = message;
        input.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertText', data: message }));
      } else {
        input.value = message;
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      }
      
      // 키보드 이벤트도 시뮬레이션
      const textarea = input.tagName === 'TEXTAREA' ? input : null;
      if (textarea) {
        textarea.value = message;
        textarea.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // #region agent log
      const afterValue = input.contentEditable === 'true' ? input.textContent || input.innerText : input.value;
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiChat.js:typeMessage:afterSet',message:'value after set',data:{afterValue:afterValue?.slice(0,50),expectedMatch:afterValue?.includes('SAT')},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      // 전송 버튼 찾기 및 클릭
      const submitButton = await this.findSubmitButton();
      if (submitButton) {
        console.log('[GeminiChat] 전송 버튼 클릭');
        await safeClick(submitButton);
        await waitForContentLoad(1000);
        return true;
      } else {
        // 전송 버튼을 못 찾으면 Enter 키 시뮬레이션
        console.log('[GeminiChat] 전송 버튼을 찾지 못함. Enter 키 시뮬레이션');
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
        await waitForContentLoad(1000);
        return true;
      }
    } catch (error) {
      console.error('[GeminiChat] 메시지 입력 오류:', error);
      throw error;
    }
  }

  /**
   * 전송 버튼 찾기
   * @returns {Promise<HTMLElement|null>}
   */
  async findSubmitButton() {
    for (const selector of CONFIG.geminiChat.submitSelectors) {
      const buttons = deepQuerySelectorAll(selector);
      for (const btn of buttons) {
        if (isElementVisible(btn) && !btn.disabled) {
          return btn;
        }
      }
    }
    return null;
  }

  /**
   * SAT UI가 나타날 때까지 대기
   * @returns {Promise<boolean>} SAT UI 감지 성공 여부
   */
  async waitForSATUI() {
    console.log('[GeminiChat] SAT UI 대기 시작...');
    showToast('SAT 테스트 화면이 나타날 때까지 대기 중...', 'info');
    
    const startTime = Date.now();
    const timeout = CONFIG.geminiChat.satUIWaitTimeout;
    
    // 처음 15초 대기 후 첫 확인
    console.log('[GeminiChat] 초기 15초 대기 중...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    while (Date.now() - startTime < timeout) {
      // 여러 방법으로 SAT UI 감지
      if (looksLikeSatQuestionUI()) {
        console.log('[GeminiChat] SAT UI 감지됨 (looksLikeSatQuestionUI)');
        return true;
      }
      
      if (isQuestionScreen()) {
        console.log('[GeminiChat] SAT UI 감지됨 (isQuestionScreen)');
        return true;
      }
      
      if (getProgressState() !== null) {
        console.log('[GeminiChat] SAT UI 감지됨 (getProgressState)');
        return true;
      }
      

      const bodyTextRaw = (document.body?.innerText || document.body?.textContent || '');
      const bodyText = bodyTextRaw.toLowerCase();

      // Gem 삭제/비활성 상태 메시지 감지
      if (bodyText.includes('conversation was created with a gem that has been deleted') ||
          bodyText.includes('create a new gem') ||
          bodyText.includes('deleted gem')) {
        throw new Error('현재 대화가 삭제된 Gem에 연결되어 SAT 테스트를 시작할 수 없습니다. Gemini에서 새 일반 채팅을 열거나 새 Gem을 만든 뒤 다시 시도해주세요.');
      }

      // "Reading", "Writing", "Math" 텍스트 확인
      if (bodyText.includes('reading') && bodyText.includes('writing')) {
        console.log('[GeminiChat] SAT UI 감지됨 (Reading/Writing 텍스트)');
        return true;
      }
      
      if (bodyText.includes('math') && (bodyText.includes('module') || bodyText.includes('section'))) {
        console.log('[GeminiChat] SAT UI 감지됨 (Math 섹션 텍스트)');
        return true;
      }
      
      if (Date.now() - startTime >= timeout) break;
      
      // 그 다음부터 4초마다 확인 (총 1분 대기)
      await new Promise(resolve => setTimeout(resolve, 4000));
    }
    
    console.warn('[GeminiChat] SAT UI 대기 타임아웃');
    return false;
  }

  /**
   * 전체 자동화 플로우 실행
   * @param {SATApp} satApp - SATApp 인스턴스
   * @returns {Promise<boolean>} 성공 여부
   */
  async triggerSATFlow(satApp) {
    if (this.isProcessing) {
      console.log('[GeminiChat] 이미 처리 중입니다.');
      return false;
    }
    
    try {
      this.isProcessing = true;
      console.log('[GeminiChat] ===== 자동화 플로우 시작 =====');
      
      // 1. 메시지 입력 및 전송
      showToast('메시지 입력 중...', 'info');
      await this.typeMessage(CONFIG.geminiChat.message);
      console.log('[GeminiChat] 메시지 전송 완료');
      
      // 2. SAT UI 대기
      const satUIDetected = await this.waitForSATUI();
      if (!satUIDetected) {
        throw new Error('SAT 테스트 화면이 나타나지 않았습니다. 타임아웃되었습니다.');
      }
      
      console.log('[GeminiChat] SAT UI 진입 완료');
      showToast('SAT 테스트 화면 진입 완료!', 'success');
      
      // 3. SAT UI 전환 후 Export 버튼이 아직 없을 수 있으므로 SATApp을 재초기화하여 버튼 생성 시도
      try {
        if (window.satApp && typeof window.satApp.init === 'function') {
          console.log('[GeminiChat] SATApp.init 재호출로 Export 버튼 생성 시도');
          window.satApp.init();
        } else if (window.__SAT_APP && typeof window.__SAT_APP.init === 'function') {
          console.log('[GeminiChat] __SAT_APP.init 재호출로 Export 버튼 생성 시도');
          window.__SAT_APP.init();
        }
      } catch (e) {
        console.warn('[GeminiChat] SATApp 재초기화 중 오류:', e);
      }
      
      console.log('[GeminiChat] 기존 자동화 로직 시작...');
      showToast('SAT 테스트 자동화 시작...', 'info');
      
      // 4. Export to PDF 버튼 자동 클릭
      // SATApp의 handleExportClick을 직접 호출
      const exportButton = document.getElementById('gemini-sat-pdf-export-btn');
      if (exportButton && satApp) {
        console.log('[GeminiChat] Export to PDF 버튼 자동 클릭');
        showToast('PDF 생성 시작...', 'info');
        await satApp.handleExportClick(exportButton);
        return true;
      } else {
        // 버튼이 아직 없으면 대기 후 재시도
        console.log('[GeminiChat] Export 버튼 대기 중...');
        const button = await waitForElement(() => {
          return document.getElementById('gemini-sat-pdf-export-btn');
        }, 30, 1000);
        
        if (button && satApp) {
          console.log('[GeminiChat] Export to PDF 버튼 발견, 자동 클릭');
          showToast('PDF 생성 시작...', 'info');
          await satApp.handleExportClick(button);
          return true;
        } else {
          throw new Error('Export to PDF 버튼을 찾을 수 없습니다.');
        }
      }
    } catch (error) {
      console.error('[GeminiChat] 자동화 플로우 오류:', error);
      showToast(`자동화 중 오류: ${error.message}`, 'error');
      throw error;
    } finally {
      this.isProcessing = false;
    }
  }
}

