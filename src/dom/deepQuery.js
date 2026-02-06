// Extracted from content.js - DOM utility functions (Shadow DOM traversal & visibility)
// NOTE: Logic must remain identical to original implementation.

export function deepQuerySelectorAll(selector, root = document) {
  const results = [];
  
  try {
    // 일반 셀렉터로 찾기
    const normalResults = root.querySelectorAll(selector);
    results.push(...Array.from(normalResults));
    
    // Shadow DOM 내부 탐색
    const allElements = root.querySelectorAll('*');
    for (const el of allElements) {
      // ShadowRoot가 있는지 확인
      if (el.shadowRoot) {
        // ShadowRoot 내부 재귀 탐색
        const shadowResults = deepQuerySelectorAll(selector, el.shadowRoot);
        results.push(...shadowResults);
      }
      
      // Web Components의 여러 ShadowRoot (assignedNodes)
      if (el.assignedNodes) {
        const assignedNodes = el.assignedNodes();
        for (const node of assignedNodes) {
          if (node.shadowRoot) {
            const assignedShadowResults = deepQuerySelectorAll(selector, node.shadowRoot);
            results.push(...assignedShadowResults);
          }
        }
      }
    }
  } catch (error) {
    console.warn('[SAT PDF Exporter] deepQuerySelectorAll 오류:', error);
  }
  
  return results;
}

export function isElementVisible(el) {
  if (!el) return false;
  
  try {
    const rect = el.getBoundingClientRect();
    // 너비나 높이가 0보다 크면 존재하는 것으로 간주
    return rect.width > 0 && rect.height > 0;
  } catch (error) {
    // getBoundingClientRect 실패 시 offsetParent로 폴백
    return !!el.offsetParent;
  }
}

export function dumpHTMLStructure(container = document.body, maxLength = 50000) {
  try {
    const mainContainer = container.querySelector('[role=\"main\"], main, [class*=\"main\"], [class*=\"content\"]') || container;
    const html = mainContainer.innerHTML;
    const truncated = html.length > maxLength ? html.substring(0, maxLength) + '... (truncated)' : html;
    
    console.log('[SAT PDF Exporter] ===== HTML 구조 덤프 시작 =====');
    console.log(truncated);
    console.log('[SAT PDF Exporter] ===== HTML 구조 덤프 끝 =====');
    
    return truncated;
  } catch (error) {
    console.error('[SAT PDF Exporter] HTML 덤프 실패:', error);
    return null;
  }
}


