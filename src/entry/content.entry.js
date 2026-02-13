// Extracted SATApp class and IIFE initialization from content.js
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { SATNavigator } from '../flow/navigator.js';
import { SATScraper } from '../flow/stateMachine.js';
import { PDFGenerator } from '../pdf/pdfGenerator.js';
import { looksLikeSatQuestionUI, findWorkerFrame } from '../frame/workerFrame.js';
import { showToast } from '../dom/wait.js';
import { GeminiChatAutomator, isGeminiChatPage, isSATTestPage } from '../flow/geminiChat.js';
import { runSetupSequence } from '../flow/geminiSetup.js';

/**
 * SATApp 클래스
 * 전체 프로세스를 관리하는 메인 컨트롤러
 */
export class SATApp {
  constructor() {
    this.navigator = new SATNavigator();
    this.scraper = new SATScraper();
    this.pdfGenerator = new PDFGenerator();
    this.isProcessing = false;
  }

  /**
   * Export 버튼 생성 및 이벤트 바인딩
   */
  init() {
    console.log('[BOOT] about to create export button', 'top?', window === window.top);
    
    // 컨텍스트 유효성 체크
    if (typeof chrome !== 'undefined' && chrome.runtime && !chrome.runtime.id) {
      console.warn('[SATApp] Extension context invalidated - 버튼 생성 스킵');
      // NOTE: showToast is imported from wait.js
      showToast('확장 프로그램이 재로드되었습니다. 페이지를 새로고침해주세요.', 'error');
      return;
    }

    try {
      if (!document.body) {
        console.log('[SATApp] document.body가 없습니다. 100ms 후 재시도...');
        setTimeout(() => this.init(), 100);
        return;
      }

      // 페이지 타입 감지
      const isChatPage = isGeminiChatPage();
      const isSATPage = isSATTestPage();
      
      console.log('[SATApp] 페이지 타입 감지:', { isChatPage, isSATPage });

      // 채팅 페이지면 Export 버튼 (클릭 시 메시지 입력 + SAT UI 대기 후 PDF 추출), SAT 페이지면 Export 버튼
      if (isChatPage && !isSATPage) {
        // 기존 Start 버튼 제거 (있다면)
        const existingStartBtn = document.getElementById('gemini-sat-start-btn');
        if (existingStartBtn) {
          existingStartBtn.remove();
        }
        
        // 채팅 페이지에서도 Export to PDF 버튼 생성 (클릭 시 자동으로 메시지 입력 + SAT UI 대기 후 진행)
        const existingExportBtn = document.getElementById('gemini-sat-pdf-export-btn');
        if (existingExportBtn) {
          console.log('[SATApp] Export 버튼이 이미 존재합니다.');
          existingExportBtn.style.display = 'block';
          existingExportBtn.style.visibility = 'visible';
          existingExportBtn.style.opacity = '1';
          existingExportBtn.style.zIndex = '2147483647';
          return;
        }
        
        console.log('[SATApp] Export to PDF 버튼 생성 (채팅 페이지)...');
        const button = this.createExportButton();
        document.body.appendChild(button);
        console.log('[BOOT] exportButtonInserted (chat page)', button.id);
        return;
      } else if (isSATPage || !isChatPage) {
        // 기존 Start 버튼 제거 (있다면)
        const existingStartBtn = document.getElementById('gemini-sat-start-btn');
        if (existingStartBtn) {
          existingStartBtn.remove();
        }
        
        // Export 버튼 생성
        const existingBtn = document.getElementById('gemini-sat-pdf-export-btn');
        if (existingBtn) {
          console.log('[SATApp] 버튼이 이미 존재합니다.');
          // 버튼이 있지만 보이지 않을 수 있으므로 스타일 강제 적용
          existingBtn.style.display = 'block';
          existingBtn.style.visibility = 'visible';
          existingBtn.style.opacity = '1';
          existingBtn.style.zIndex = '2147483647';
          console.log('[BOOT] buttonInserted (existing)', existingBtn.id, 'visible?', window.getComputedStyle(existingBtn).display !== 'none');
          return;
        }

        console.log('[SATApp] 버튼 생성 시작...');
        const button = this.createExportButton();
        document.body.appendChild(button);
        console.log('[BOOT] buttonInserted', button.id, 'top?', window === window.top, 'ownerDocument:', button.ownerDocument === document);
        
        const computedStyle = window.getComputedStyle(button);
        const rect = button.getBoundingClientRect();
        const isVisible = computedStyle.display !== 'none' && 
                         computedStyle.visibility !== 'hidden' && 
                         computedStyle.opacity !== '0' &&
                         rect.width > 0 && rect.height > 0;
        
        console.log('[BOOT] buttonVisible?', isVisible, {
          display: computedStyle.display,
          visibility: computedStyle.visibility,
          opacity: computedStyle.opacity,
          zIndex: computedStyle.zIndex,
          position: computedStyle.position,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        });
        
        console.log('[SATApp] 버튼이 생성되었습니다. 위치:', {
          top: button.style.top,
          right: button.style.right,
          zIndex: button.style.zIndex,
          display: computedStyle.display,
          visibility: computedStyle.visibility,
          opacity: computedStyle.opacity
        });
      }
    } catch (error) {
      console.error('[SATApp] 버튼 생성 중 오류 (스크립트는 계속 실행):', error);
      // 에러가 발생해도 스크립트는 계속 실행되도록 함
    }
  }

  /**
   * Start SAT Test 버튼 생성
   * @returns {HTMLElement} 버튼 요소
   */
  createStartButton() {
    const button = document.createElement('button');
    button.id = 'gemini-sat-start-btn';
    button.className = 'gemini-sat-start-btn';
    button.textContent = 'Start SAT Test';
    button.type = 'button';
    button.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      color: white !important;
      border: none !important;
      padding: 12px 24px !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
      transform: none !important;
      clip: auto !important;
      clip-path: none !important;
    `;
    
    button.setAttribute('style', button.style.cssText);

    button.addEventListener('click', (event) => {
      console.log('[CLICK] start button clicked', {
        isTrusted: event.isTrusted,
        top: window === window.top,
        location: location.href,
        timestamp: Date.now()
      });
      this.handleStartClick(button);
    });
    return button;
  }

  /**
   * Start 버튼 클릭 핸들러
   * @param {HTMLElement} button - 클릭된 버튼 요소
   */
  async handleStartClick(button) {
    console.log('[FLOW] handleStartClick entered', {
      isProcessing: this.isProcessing,
      top: window === window.top
    });
    
    if (this.isProcessing) {
      console.log('[FLOW] 이미 처리 중입니다. 스킵.');
      return;
    }
    
    try {
      this.isProcessing = true;
      console.log('[SATApp] ===== Start SAT Test 버튼 클릭됨 =====');
      
      button.disabled = true;
      button.classList.add('loading');
      button.textContent = 'Starting...';
      
      // GeminiChatAutomator 인스턴스 생성 및 실행
      const chatAutomator = new GeminiChatAutomator();
      showToast('SAT 테스트 자동화 시작...', 'info');
      
      // triggerSATFlow 호출 (자동으로 Export까지 실행됨)
      await chatAutomator.triggerSATFlow(this);
      
      // 성공 메시지
      button.textContent = '✓ Started!';
      setTimeout(() => {
        button.textContent = 'Start SAT Test';
        button.disabled = false;
        button.classList.remove('loading');
        this.isProcessing = false;
      }, 2000);
      
    } catch (error) {
      console.error('[ERROR] handleStartClick failed:', error);
      showToast(`자동화 중 오류가 발생했습니다: ${error.message}`, 'error');
      button.disabled = false;
      button.classList.remove('loading');
      button.textContent = 'Start SAT Test';
      this.isProcessing = false;
    }
  }

  /**
   * Export 버튼 생성
   * @returns {HTMLElement} 버튼 요소
   */
  createExportButton() {
    const button = document.createElement('button');
    button.id = 'gemini-sat-pdf-export-btn';
    button.className = 'gemini-sat-pdf-export-btn';
    button.textContent = 'Export to PDF';
    button.type = 'button';
    button.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      border: none !important;
      padding: 12px 24px !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: none !important;
      clip: auto !important;
      clip-path: none !important;
    `;
    
    // 추가 보장: 인라인 스타일로도 명시
    button.setAttribute('style', button.style.cssText);

    button.addEventListener('click', (event) => {
      console.log('[CLICK] export button clicked', {
        isTrusted: event.isTrusted,
        top: window === window.top,
        location: location.href,
        timestamp: Date.now()
      });
      console.trace('[TRACE] export click stack');
      this.handleExportClick(button);
    });
    return button;
  }

  /**
   * 생성할 PDF 세트 수를 사용자에게 입력받음
   * @returns {number|null} 유효한 세트 수 또는 취소(null)
   */
  promptExportSetCount() {
    const input = window.prompt('문제지/해설지 세트를 몇 개 생성할까요?\n(1 이상의 정수를 입력하세요)', '1');
    if (input === null) {
      return null;
    }

    const count = Number.parseInt(input.trim(), 10);
    if (!Number.isInteger(count) || count < 1) {
      throw new Error('생성 개수는 1 이상의 정수여야 합니다.');
    }

    return count;
  }

  /**
   * Export 버튼 클릭 핸들러
   * @param {HTMLElement} button - 클릭된 버튼 요소
   */
  async handleExportClick(button) {
    console.log('[FLOW] handleExportClick entered', {
      isProcessing: this.isProcessing,
      top: window === window.top,
      hasApp: !!window.__SAT_APP,
      hasClass: !!window.SATApp
    });
    
    if (this.isProcessing) {
      console.log('[FLOW] 이미 처리 중입니다. 스킵.');
      return;
    }
    
    // 앱 인스턴스 확인 (satApp 또는 __SAT_APP)
    const app = window.__SAT_APP || window.satApp || this;
    if (!app) {
      console.error('[ERROR] SATApp 인스턴스 missing');
      showToast('앱 인스턴스를 찾을 수 없습니다. 페이지를 새로고침해주세요.', 'error');
      return;
    }

    try {
      this.isProcessing = true;
      console.log('[SATApp] ===== Export to PDF 버튼 클릭됨 =====');
      console.log('[SATApp] 현재 프레임:', window.location.href, 'top?', window === window.top);

      const exportSetCount = this.promptExportSetCount();
      if (exportSetCount === null) {
        showToast('PDF 생성이 취소되었습니다.', 'info');
        this.isProcessing = false;
        return;
      }
      
      button.disabled = true;
      button.classList.add('loading');
      button.textContent = '';

      // 0-a. Gemini 채팅 페이지(기본 창)에서 Export 클릭 시: 메시지 입력 → SAT UI 대기 후 진행
      const isChat = isGeminiChatPage();
      const isSAT = isSATTestPage();
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'content.entry.js:handleExportClick:chatCheck',message:'handleExportClick chat block check',data:{isChat,isSAT,willEnterChatBlock:isChat&&!isSAT,url:location.href},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      if (isChat && !isSAT) {
        showToast('SAT 테스트 요청 메시지 입력 중...', 'info');
        const automator = new GeminiChatAutomator();
        await automator.typeMessage(CONFIG.geminiChat.message);
        console.log('[SATApp] 메시지 전송 완료, SAT UI 대기 중...');
        showToast('SAT 테스트 화면이 나타날 때까지 대기 중...', 'info');
        const satUIDetected = await automator.waitForSATUI();
        if (!satUIDetected) {
          throw new Error('SAT 테스트 화면이 나타나지 않았습니다. 타임아웃되었습니다.');
        }
        console.log('[SATApp] SAT UI 진입 완료, 다음 단계 진행');
        showToast('SAT 테스트 화면 진입 완료!', 'success');
        // SAT UI 전환 후 버튼 상태 갱신
        try {
          if (typeof app.init === 'function') app.init();
        } catch (e) {
          console.warn('[SATApp] init 재호출 중 오류:', e);
        }
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // 0. 스크래핑 이전에 Gemini SAT 설정 시퀀스 실행 (시작 버튼/토글 자동 클릭)
      try {
        console.log('[SATApp] Export 전 설정 시퀀스 실행 시도');
        await runSetupSequence();
      } catch (setupError) {
        console.warn('[SATApp] 설정 시퀀스 실행 중 오류 (계속 진행):', setupError);
      }

      // 1. Worker 프레임 찾기 (문제 UI가 있는 프레임)
      console.log('[FRAME] selectWorkerFrame start');
      // NOTE: showToast is imported from wait.js
      showToast('문제 화면 프레임 찾는 중...', 'info');
      console.log('[SATApp] Worker 프레임 찾기 시작');
      const worker = await findWorkerFrame();
      console.log('[FRAME] selectWorkerFrame result:', worker ? 'found' : 'not found', {
        frameCount: window.frames.length,
        top: window === window.top
      });
      
      let allData = null;
      
      if (!worker) {
        // Worker 프레임을 못 찾았지만, 현재 프레임이 문제 UI일 수도 있음
        if (looksLikeSatQuestionUI()) {
          console.log('[SATApp] 현재 프레임이 문제 UI입니다. 이 프레임에서 작업합니다.');
          window.__SAT_IS_WORKER = true;
          
          // 현재 프레임에서 직접 실행
          // 1. 자동 진입 시퀀스
          console.log('[SATApp] 자동 진입 시퀀스 시작');
          showToast('자동 진입 시퀀스 실행 중...', 'info');
          await this.navigator.handleInitialNavigation();
          console.log('[SATApp] 자동 진입 시퀀스 완료');

          // 2. 문제 수집
          showToast('모든 문제를 수집하는 중...', 'info');
          console.log('[SATApp] 문제 수집 시작 (현재 프레임:', window.location.href, ')');
          allData = await this.scraper.collectAllProblems();
        } else {
          console.warn('[SATApp] Worker 프레임을 찾지 못했습니다. 현재 프레임에서 시도합니다.');
          showToast('문제 화면 프레임을 찾지 못했습니다. 현재 프레임에서 시도합니다.', 'error');
          
          // 현재 프레임에서 시도
          // 1. 자동 진입 시퀀스
          console.log('[SATApp] 자동 진입 시퀀스 시작');
          showToast('자동 진입 시퀀스 실행 중...', 'info');
          await this.navigator.handleInitialNavigation();
          console.log('[SATApp] 자동 진입 시퀀스 완료');

          // 2. 문제 수집
          console.log('[FLOW] start scraper called (current frame fallback)');
          showToast('모든 문제를 수집하는 중...', 'info');
          console.log('[SATApp] 문제 수집 시작 (현재 프레임:', window.location.href, ')');
          allData = await this.scraper.collectAllProblems();
        }
      } else {
        console.log('[SATApp] Worker 프레임 발견:', worker.href);
        showToast('문제 화면 프레임 발견! 작업 시작...', 'success');
        
        // Worker 프레임에 작업 시작 명령 전송
        console.log('[FRAME] SAT_START sent', { workerHref: worker.href, top: window === window.top });
        window.postMessage({ type: 'SAT_START', workerHref: worker.href }, '*');
        
        // Worker 프레임에서 수집 완료 메시지 대기
        allData = await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            window.removeEventListener('message', onMsg);
            reject(new Error('Worker 프레임에서 수집 완료 메시지를 받지 못했습니다 (타임아웃 5분)'));
          }, 5 * 60 * 1000); // 5분 타임아웃
          
          function onMsg(ev) {
            if (ev?.data?.type === 'SAT_COLLECTION_COMPLETE') {
              clearTimeout(timeout);
              window.removeEventListener('message', onMsg);
              console.log('[SATApp] Worker 프레임에서 수집 완료 메시지 수신');
              resolve(ev.data.data);
            } else if (ev?.data?.type === 'SAT_COLLECTION_ERROR') {
              clearTimeout(timeout);
              window.removeEventListener('message', onMsg);
              console.error('[SATApp] Worker 프레임에서 수집 오류:', ev.data.error);
              reject(new Error(ev.data.error));
            }
          }
          
          window.addEventListener('message', onMsg);
        });
      }
      console.log('[SATApp] 문제 수집 완료:', {
        reading: allData.reading.length,
        math: allData.math.length
      });

      if ((!allData.reading || allData.reading.length === 0) && 
          (!allData.math || allData.math.length === 0)) {
        throw new Error('추출할 SAT 문제를 찾을 수 없습니다.');
      }

      // 3. PDF 생성
      const totalProblems = allData.reading.length + allData.math.length;
      showToast(`${totalProblems}개의 문제를 수집했습니다. PDF ${exportSetCount}세트 생성 중...`, 'info');

      for (let i = 1; i <= exportSetCount; i += 1) {
        showToast(`문제지 PDF 생성 중... (${i}/${exportSetCount})`, 'info');
        const problemDoc = this.pdfGenerator.generateProblemsPDF(allData);

        showToast(`해설지 PDF 생성 중... (${i}/${exportSetCount})`, 'info');
        const answerDoc = this.pdfGenerator.generateAnswersPDF(allData);

        // 4. PDF 다운로드
        await this.pdfGenerator.downloadPDFs(problemDoc, answerDoc, {
          copyIndex: i,
          totalCopies: exportSetCount
        });
      }

      // 성공 메시지
      showToast(`PDF ${exportSetCount}세트가 성공적으로 생성되었습니다!`, 'success');
      button.textContent = '✓ Exported!';
      setTimeout(() => {
        button.textContent = 'Export to PDF';
        button.disabled = false;
        button.classList.remove('loading');
        this.isProcessing = false;
      }, 2000);

    } catch (error) {
      console.error('[ERROR] handleExportClick failed:', error);
      console.error('[ERROR] error.stack:', error.stack);
      console.error('[SATApp] PDF 생성 오류:', error);
      let errorMessage = error.message || '알 수 없는 오류';
      
      if (error.message && error.message.includes('Extension context invalidated')) {
        errorMessage = '확장 프로그램이 재로드되었습니다. 페이지를 새로고침하고 다시 시도해주세요.';
      }
      
      showToast(`PDF 생성 중 오류가 발생했습니다: ${errorMessage}`, 'error');
      button.disabled = false;
      button.classList.remove('loading');
      button.textContent = 'Export to PDF';
      this.isProcessing = false;
    }
  }
}

// 버튼 생존력 극대화: 최상단 try-catch로 보호 (다른 로직이 실패해도 버튼은 무조건 생성)
export function initButtonSafely() {
  try {
    console.log('[BOOT] initButtonSafely called', 'top?', window === window.top);
    
    // 컨텍스트 유효성 체크
    if (typeof chrome !== 'undefined' && chrome.runtime && !chrome.runtime.id) {
      console.warn('[SAT-DEBUG] Extension context invalidated - 버튼 생성 스킵');
      return;
    }

    if (!document.body) {
      console.log('[SAT-DEBUG] document.body가 없습니다. 100ms 후 재시도...');
      setTimeout(() => initButtonSafely(), 100);
      return;
    }

    // 페이지 타입에 따라 기존 버튼 확인
    const isChatPage = isGeminiChatPage();
    const isSATPage = isSATTestPage();
    
    if (isChatPage && !isSATPage) {
      // 채팅 페이지: Export 버튼 확인
      const existingExportBtn = document.getElementById('gemini-sat-pdf-export-btn');
      if (existingExportBtn) {
        console.log('[BOOT] exportButtonInserted (existing, chat page)', existingExportBtn.id);
        existingExportBtn.style.display = 'block';
        existingExportBtn.style.visibility = 'visible';
        existingExportBtn.style.opacity = '1';
        existingExportBtn.style.zIndex = '2147483647';
        return;
      }
    } else {
      // SAT 페이지: Export 버튼 확인
      const existingBtn = document.getElementById('gemini-sat-pdf-export-btn');
      if (existingBtn) {
        console.log('[BOOT] buttonInserted (existing)', existingBtn.id, 'visible?', window.getComputedStyle(existingBtn).display !== 'none');
        // 버튼이 있지만 보이지 않을 수 있으므로 스타일 강제 적용
        existingBtn.style.display = 'block';
        existingBtn.style.visibility = 'visible';
        existingBtn.style.opacity = '1';
        existingBtn.style.zIndex = '2147483647';
        return;
      }
    }

    console.log('[BOOT] about to create button (initButtonSafely)');
    const app = window.satApp || new SATApp();
    window.satApp = app; // 전역에 저장하여 재사용
    app.init();
    console.log('[BOOT] initButtonSafely completed');
  } catch (error) {
    console.error('[BOOT] initButtonSafely error:', error);
    // 에러가 발생해도 재시도
    setTimeout(() => initButtonSafely(), 1000);
  }
}
