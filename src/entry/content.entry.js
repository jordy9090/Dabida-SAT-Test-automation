// Extracted SATApp class and IIFE initialization from content.js
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { SATNavigator } from '../flow/navigator.js';
import { SATScraper } from '../flow/stateMachine.js';
import { PDFGenerator } from '../pdf/pdfGenerator.js';
import { looksLikeSatQuestionUI, findWorkerFrame } from '../frame/workerFrame.js';
import { showToast } from '../dom/wait.js';

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
    } catch (error) {
      console.error('[SATApp] 버튼 생성 중 오류 (스크립트는 계속 실행):', error);
      // 에러가 발생해도 스크립트는 계속 실행되도록 함
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
    
    // 앱 인스턴스 확인
    if (!window.__SAT_APP) {
      console.error('[ERROR] __SAT_APP missing');
      showToast('앱 인스턴스를 찾을 수 없습니다. 페이지를 새로고침해주세요.', 'error');
      return;
    }

    try {
      this.isProcessing = true;
      console.log('[SATApp] ===== Export to PDF 버튼 클릭됨 =====');
      console.log('[SATApp] 현재 프레임:', window.location.href, 'top?', window === window.top);
      
      button.disabled = true;
      button.classList.add('loading');
      button.textContent = '';

      // 0. Worker 프레임 찾기 (문제 UI가 있는 프레임)
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
      showToast(`${totalProblems}개의 문제를 수집했습니다. PDF 생성 중...`, 'info');
      
      showToast('문제지 PDF 생성 중...', 'info');
      const problemDoc = this.pdfGenerator.generateProblemsPDF(allData);
      
      showToast('정답지 PDF 생성 중...', 'info');
      const answerDoc = this.pdfGenerator.generateAnswersPDF(allData);

      // 4. PDF 다운로드
      await this.pdfGenerator.downloadPDFs(problemDoc, answerDoc);

      // 성공 메시지
      showToast('PDF가 성공적으로 생성되었습니다!', 'success');
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

    console.log('[BOOT] about to create export button (initButtonSafely)');
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

