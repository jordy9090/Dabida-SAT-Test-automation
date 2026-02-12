// Extracted from content.js - wait utilities
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { isElementVisible } from './deepQuery.js';

export async function waitForElement(selector, retries = CONFIG.retries.elementFind, interval = CONFIG.timeouts.elementWait) {
  for (let i = 0; i < retries; i++) {
    let element = null;
    if (typeof selector === 'function') {
      element = selector();
    } else {
      element = document.querySelector(selector);
    }
    
    // Gemini UI(Shadow DOM/portal)에서는 offsetParent가 null이어도 화면에 보이는 경우가 많음.
    // 따라서 getBoundingClientRect 기반 가시성 판정으로 교체.
    if (element && isElementVisible(element)) {
      return element;
    }
    
    if (i < retries - 1) {
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
  return null;
}

export async function waitForCondition(condition, maxWait = CONFIG.timeouts.maxElementWait, interval = CONFIG.timeouts.elementWait) {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWait) {
    if (condition()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  return false;
}

export function waitForContentLoad(delay = 1000) {
  return new Promise((resolve) => {
    // MutationObserver로 DOM 변경 감지
    let observer;
    let timeout;
    
    const cleanup = () => {
      if (observer) observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
    
    // 타임아웃 설정 (최대 대기 시간)
    timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, delay);
    
    // DOM 변경 감지
    observer = new MutationObserver(() => {
      cleanup();
      // 추가 대기 (애니메이션 등)
      setTimeout(resolve, 25);
    });
    
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
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
  });
}

/**
 * 강제 클릭 함수 (pointerdown 등 이벤트 포함)
 * @param {HTMLElement} button - 클릭할 버튼 요소
 * @param {number} retries - 재시도 횟수
 * @returns {Promise<boolean>} 성공 여부
 */
export async function forceClick(button, retries = 3) {
  if (!button) {
    return false;
  }
  
  // 다른 창으로 넘어가는 요소인지 확인
  if (button.tagName === 'A') {
    const href = button.getAttribute('href');
    const target = button.getAttribute('target');
    if (href && (href.startsWith('http') || target === '_blank' || target === '_new')) {
      console.error('[SAT-DEBUG] 외부 링크 클릭 방지:', href, target);
      return false;
    }
  }
  
  if (button.hasAttribute('href') && button.getAttribute('href') !== '#' && !button.getAttribute('href').startsWith('javascript:')) {
    console.error('[SAT-DEBUG] 네비게이션 링크 클릭 방지:', button.getAttribute('href'));
    return false;
  }
  
  if (button.getAttribute('target') === '_blank' || button.getAttribute('target') === '_new') {
    console.error('[SAT-DEBUG] 새 창 열기 속성 클릭 방지');
    return false;
  }
  
  // 현재 URL 저장 (클릭 후 변경 확인용)
  const currentUrl = window.location.href;
  
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`[SAT-DEBUG] forceClick 시도 ${i + 1}/${retries}`);
      
      // 가시성 확보
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // pointerdown -> mousedown -> click 순서
      const pointerDownEvent = new PointerEvent('pointerdown', {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: 1,
        pointerType: 'mouse',
        clientX: centerX,
        clientY: centerY,
        button: 0,
        buttons: 1
      });
      button.dispatchEvent(pointerDownEvent);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const mouseDownEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        buttons: 1,
        clientX: centerX,
        clientY: centerY
      });
      button.dispatchEvent(mouseDownEvent);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // focus
      if (button.focus) {
        button.focus();
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // pointerup -> mouseup -> click
      const pointerUpEvent = new PointerEvent('pointerup', {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: 1,
        pointerType: 'mouse',
        clientX: centerX,
        clientY: centerY,
        button: 0,
        buttons: 0
      });
      button.dispatchEvent(pointerUpEvent);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const mouseUpEvent = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        buttons: 0,
        clientX: centerX,
        clientY: centerY
      });
      button.dispatchEvent(mouseUpEvent);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        buttons: 1,
        clientX: centerX,
        clientY: centerY
      });
      button.dispatchEvent(clickEvent);
      await new Promise(resolve => setTimeout(resolve, 60));
      
      // 마지막 수단
      try {
        button.click();
      } catch (e) {
        console.warn('[SAT-DEBUG] button.click() 실패 (예상됨):', e);
      }
      await new Promise(resolve => setTimeout(resolve, 60));
      
      // URL 변경 확인
      if (window.location.href !== currentUrl) {
        console.error('[SAT-DEBUG] URL이 변경되었습니다! 다른 창으로 넘어갔을 수 있습니다.');
        // 원래 URL로 복귀 시도
        window.history.back();
        await new Promise(resolve => setTimeout(resolve, 500));
        return false;
      }
      
      console.log('[SAT-DEBUG] forceClick 성공');
      return true;
    } catch (error) {
      console.warn(`[SAT-DEBUG] forceClick 실패 (${i + 1}/${retries}):`, error);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 250));
      }
    }
  }
  
  return false;
}

/**
 * 안전한 버튼 클릭 (재시도 메커니즘 포함)
 * @param {Element} button - 클릭할 버튼 요소
 * @param {number} retries - 최대 재시도 횟수
 * @returns {Promise<boolean>} 클릭 성공 여부
 */
export async function safeClick(button, retries = CONFIG.retries.buttonClick) {
  // offsetParent는 Shadow DOM/portal 환경에서 신뢰 불가 → 가시성 기반으로 판정
  if (!button || !isElementVisible(button)) {
    return false;
  }

  for (let i = 0; i < retries; i++) {
    try {
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.scrollDelay));
      
      // 실제 유저 클릭처럼 동작하도록 dispatchEvent 사용
      const mouseEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1
      });
      button.dispatchEvent(mouseEvent);
      await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.clickDelay));
      
      // 추가로 일반 click()도 호출
      button.click();
      await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.clickDelay));
      
      // mousedown + mouseup 시퀀스
      button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, buttons: 1 }));
      await new Promise(resolve => setTimeout(resolve, 60));
      button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, buttons: 1 }));
      await new Promise(resolve => setTimeout(resolve, 60));
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      
      return true;
    } catch (error) {
      console.warn(`[SAT PDF Exporter] 버튼 클릭 재시도 ${i + 1}/${retries}:`, error);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.clickDelay));
      }
    }
  }
  return false;
}

/**
 * 토스트 메시지 표시
 * @param {string} message - 표시할 메시지
 * @param {string} type - 메시지 타입 ('info', 'success', 'error')
 */
export function showToast(message, type = 'info') {
  // 기존 토스트 제거
  const existingToast = document.getElementById('gemini-sat-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'gemini-sat-toast';
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 10001;
    background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;

  // 애니메이션 스타일 추가
  if (!document.getElementById('gemini-sat-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'gemini-sat-toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // 3초 후 자동 제거
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 3000);
}


