// Extracted SATApp class and IIFE initialization from content.js
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { SATNavigator } from '../flow/navigator.js';
import { SATScraper } from '../flow/stateMachine.js';
import { PDFGenerator } from '../pdf/pdfGenerator.js';
import { looksLikeSatQuestionUI, findWorkerFrame } from '../frame/workerFrame.js';
import { showToast, setExportRunning, waitForCondition, safeClick } from '../dom/wait.js';
import { showSetCountModal } from '../dom/modal.js';
import { GeminiChatAutomator, isGeminiChatPage, isSATTestPage } from '../flow/geminiChat.js';
import { runSetupSequence } from '../flow/geminiSetup.js';
import { configureAndStartTest } from '../flow/navigator.js';

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
    
    // Export 버튼은 top frame에만 생성 (iframe에 생성 시 구글 개인정보/계정 iframe과 겹쳐 탭이 열림)
    if (window !== window.top) {
      return;
    }
    
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
      event.preventDefault();
      event.stopPropagation();
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
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      console.log('[CLICK] export button clicked', {
        isTrusted: event.isTrusted,
        top: window === window.top,
        location: location.href,
        timestamp: Date.now()
      });
      this.handleExportClick(button);
    });
    return button;
  }

  /**
   * 생성할 PDF 세트 수를 사용자에게 입력받음 (페이지 내 모달 UI 사용)
   * @returns {Promise<number|null>} 유효한 세트 수 또는 취소(null)
   */
  async promptExportSetCount() {
    const count = await showSetCountModal();
    return count;
  }

  /**
   * 새 채팅(Gemini 로고 /app) 클릭 후 초기 화면 로드 대기
   * 세트 2 이상 시 PDF 생성 후 다음 세트를 위해 호출
   */
  async clickNewChatAndWaitForReady() {
    const topDoc = window.top && window.top.document ? window.top.document : document;
    let link = null;

    // 1) Gemini 로고 텍스트( data-test-id="bard-text" )를 포함한 <a> 찾기 — 사용자가 누르는 버튼
    const bardText = topDoc.querySelector('[data-test-id="bard-text"]') ||
      topDoc.querySelector('.bard-text');
    if (bardText) {
      link = bardText.closest('a');
    }
    if (!link && topDoc !== document && document.querySelector) {
      const bardTextLocal = document.querySelector('[data-test-id="bard-text"]') || document.querySelector('.bard-text');
      if (bardTextLocal) link = bardTextLocal.closest('a');
    }
    try {
      for (let i = 0; i < (window.top?.frames?.length || 0); i++) {
        try {
          const fr = window.top.frames[i];
          const d = fr.document;
          if (!d) continue;
          const bt = d.querySelector('[data-test-id="bard-text"]') || d.querySelector('.bard-text');
          if (bt) {
            const a = bt.closest('a');
            if (a) {
              link = a;
              break;
            }
          }
        } catch (_) {}
      }
    } catch (_) {}

    // 2) 폴백: href/aria-label 기반
    if (!link) {
      link = topDoc.querySelector('a[href="/app"]') ||
        topDoc.querySelector('a[aria-label="새 채팅"]') ||
        topDoc.querySelector('a[aria-label="New chat"]') ||
        topDoc.querySelector('.bard-logo-container a[href="/app"]') ||
        topDoc.querySelector('a[href*="/app"]');
    }

    if (!link) {
      throw new Error('새 채팅 버튼을 찾을 수 없습니다. (Gemini 로고 또는 a[href="/app"])');
    }
    showToast('새 채팅으로 이동 중...', 'info');
    link.scrollIntoView({ behavior: 'instant', block: 'center' });
    await new Promise(r => setTimeout(r, 400));
    try {
      const clicked = await safeClick(link);
      if (!clicked) link.click();
    } catch (_) {
      link.click();
    }
    await new Promise(r => setTimeout(r, 500));
    await waitForCondition(
      () => (window.top?.location?.href || '').includes('/app'),
      15000,
      200
    );
    await new Promise(r => setTimeout(r, 1200));
    showToast('초기 화면 로드 완료. 다음 세트 준비 중...', 'info');
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
      setExportRunning(true);
      console.log('[SATApp] ===== Export to PDF 버튼 클릭됨 =====');
      console.log('[SATApp] 현재 프레임:', window.location.href, 'top?', window === window.top);

      const exportSetCount = await this.promptExportSetCount();
      if (exportSetCount === null) {
        showToast('PDF 생성이 취소되었습니다.', 'info');
        this.isProcessing = false;
        setExportRunning(false);
        return;
      }
      
      button.disabled = true;
      button.classList.add('loading');
      button.textContent = '';

      for (let setIndex = 1; setIndex <= exportSetCount; setIndex += 1) {
        showToast(`세트 ${setIndex}/${exportSetCount} 진행 중...`, 'info');

        if (setIndex > 1) {
          await this.clickNewChatAndWaitForReady();
          await new Promise(r => setTimeout(r, 1500));
          showToast('입력창 로드 대기 중...', 'info');
          await new Promise(r => setTimeout(r, 1000));
        }

        // 0-a. SAT 화면이 아니면: "I want to take a practice SAT test." 입력 → SAT UI 대기
        const isSAT = isSATTestPage();
        if (!isSAT) {
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
          try {
            if (typeof app.init === 'function') app.init();
          } catch (e) {
            console.warn('[SATApp] init 재호출 중 오류:', e);
          }
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // 0. 설정 시퀀스 + 테스트 시작
        try {
          console.log('[SATApp] Export 전 설정 시퀀스 실행 시도');
          await runSetupSequence();
        } catch (setupError) {
          console.warn('[SATApp] 설정 시퀀스 실행 중 오류 (계속 진행):', setupError);
        }
        try {
          console.log('[SATApp] 테스트 시작 버튼 클릭 시도');
          showToast('테스트 시작 버튼 클릭 중...', 'info');
          await configureAndStartTest();
          showToast('문제 화면 로드 대기 중...', 'info');
          await new Promise(resolve => setTimeout(resolve, 400));
        } catch (startError) {
          console.warn('[SATApp] 테스트 시작 처리 중 오류 (계속 진행):', startError);
        }

        // 1. Worker 프레임 찾기 → 문제 수집
        showToast('문제 화면 프레임 찾는 중...', 'info');
        const worker = await findWorkerFrame();
        let allData = null;

        if (!worker) {
          if (looksLikeSatQuestionUI()) {
            window.__SAT_IS_WORKER = true;
            showToast('자동 진입 시퀀스 실행 중...', 'info');
            await this.navigator.handleInitialNavigation();
            showToast('모든 문제를 수집하는 중...', 'info');
            allData = await this.scraper.collectAllProblems();
          } else {
            showToast('문제 화면 프레임을 찾지 못했습니다. 현재 프레임에서 시도합니다.', 'error');
            showToast('자동 진입 시퀀스 실행 중...', 'info');
            await this.navigator.handleInitialNavigation();
            showToast('모든 문제를 수집하는 중...', 'info');
            allData = await this.scraper.collectAllProblems();
          }
        } else {
          console.log('[SATApp] Worker 프레임 발견:', worker.href);
          showToast('문제 화면 프레임 발견! 작업 시작...', 'success');
          window.postMessage({ type: 'SAT_START', workerHref: worker.href }, location.origin);
          allData = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              window.removeEventListener('message', onMsg);
              reject(new Error('Worker 프레임에서 수집 완료 메시지를 받지 못했습니다 (타임아웃 5분)'));
            }, 5 * 60 * 1000);
            function onMsg(ev) {
              if (ev?.data?.type === 'SAT_COLLECTION_COMPLETE') {
                clearTimeout(timeout);
                window.removeEventListener('message', onMsg);
                resolve(ev.data.data);
              } else if (ev?.data?.type === 'SAT_COLLECTION_ERROR') {
                clearTimeout(timeout);
                window.removeEventListener('message', onMsg);
                reject(new Error(ev.data.error));
              }
            }
            window.addEventListener('message', onMsg);
          });
        }

        console.log('[SATApp] 문제 수집 완료 (세트 ' + setIndex + '):', {
          reading: allData.reading.length,
          math: allData.math.length
        });

        if ((!allData.reading || allData.reading.length === 0) && (!allData.math || allData.math.length === 0)) {
          throw new Error('추출할 SAT 문제를 찾을 수 없습니다.');
        }

        const totalProblems = allData.reading.length + allData.math.length;
        if (!allData.timestamp) allData.timestamp = new Date().toISOString();
        showToast(`${totalProblems}개 수집. PDF 4개 생성 중 (세트 ${setIndex}/${exportSetCount})...`, 'info');

        const readingCount = (allData.reading || []).length;
        const mathCount = (allData.math || []).length;

        showToast(`Reading 문제지 PDF 생성 중... (세트 ${setIndex})`, 'info');
        const readingProblemsDoc = this.pdfGenerator.generateSectionProblemsPDF(allData, 'reading');
        showToast(`Reading 해설지 PDF 생성 중... (세트 ${setIndex})`, 'info');
        const readingAnswersDoc = this.pdfGenerator.generateSectionAnswersPDF(allData, 'reading');
        showToast(`Math 문제지 PDF 생성 중... (세트 ${setIndex})`, 'info');
        const mathProblemsDoc = this.pdfGenerator.generateSectionProblemsPDF(allData, 'math');
        showToast(`Math 해설지 PDF 생성 중... (세트 ${setIndex})`, 'info');
        const mathAnswersDoc = this.pdfGenerator.generateSectionAnswersPDF(allData, 'math');

        await this.pdfGenerator.downloadFourPDFs(
          readingProblemsDoc,
          readingAnswersDoc,
          mathProblemsDoc,
          mathAnswersDoc,
          { copyIndex: setIndex, totalCopies: exportSetCount }
        );
      }

      showToast(`PDF ${exportSetCount}세트(총 ${exportSetCount * 4}개)가 성공적으로 생성되었습니다!`, 'success');
      button.textContent = '✓ Exported!';
      setTimeout(() => {
        button.textContent = 'Export to PDF';
        button.disabled = false;
        button.classList.remove('loading');
        this.isProcessing = false;
        setExportRunning(false);
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
      setExportRunning(false);
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
