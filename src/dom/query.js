// DOM query utilities - shared "finding elements" logic
// This module breaks the circular dependency between extract.js and buttons.js
// by providing shared query/selector functions.

import { deepQuerySelectorAll, isElementVisible } from './deepQuery.js';

/** Progress 전용 엘리먼트만 사용 (satRoot.innerText regex 오염 방지). root 내부에서만 검색. */
export function findProgressEl(root = document) {
  const sels = [
    '[data-testid="progress-indicator"]',
    '[data-testid="question-progress"]',
    'learning-activity-progress',
    'activity-set [class*="progress"]',
    'activity-set [aria-label*="/"]',
    '[class*="progress"]',
    '[aria-label*="progress"]',
    '[class*="indicator"]'
  ];
  const scope = root && root.querySelector ? root : document;
  for (const s of sels) {
    try {
      const el = scope.querySelector(s);
      if (el && (el.textContent || '').trim()) return el;
    } catch (_) {}
  }
  return null;
}

/** Progress 숫자만 progress 엘리먼트의 textContent에서 파싱. root.innerText 사용 금지. */
export function readProgressNumber(root = document) {
  const el = findProgressEl(root);
  if (!el) return null;
  const t = (el.textContent || '').trim();
  const m = t.match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) return null;
  const cur = Number(m[1]);
  const total = Number(m[2]);
  if (cur < 1 || total < 1 || cur > total || (total !== 27 && total !== 22)) return null;
  return { cur, total, raw: m[0].trim() };
}

/**
 * SAT 문제 영역 root — activity-set 고정 (progress+choices 휴리스틱 제거로 9번 점프 방지).
 * @returns {HTMLElement|null}
 */
export function findSatRootStable() {
  const byActivity = document.querySelector('activity-set') ||
    document.querySelector('learning-immersive-panel activity-set');
  if (byActivity) {
    return byActivity;
  }
  const byTestId = document.querySelector('[data-testid="activity-set"]');
  if (byTestId) return byTestId;
  const bySat = document.querySelector('[data-testid*="sat"], [data-testid*="question"], [data-testid*="problem"]');
  if (bySat) return bySat;
  return null;
}

/**
 * SAT 문제 영역 root container 찾기
 * 우선 activity-set 고정, 없으면 기존 휴리스틱 폴백
 */
export function findSatRoot() {
  const stable = findSatRootStable();
  if (stable) {
    return stable;
  }
  // 폴백: progress+choices 공통 조상 (기존 로직)
  const progressElements = deepQuerySelectorAll('[class*="progress"], [aria-label*="progress"], [class*="indicator"]');
  const choicesElements = deepQuerySelectorAll('[role="radio"], [class*="choice"], [class*="option"], button[aria-label*="Choice"]');
  for (const progressEl of progressElements) {
    if (!isElementVisible(progressEl)) continue;
    const progressText = (progressEl.textContent || '').trim();
    if (!/\d+\s*\/\s*\d+/.test(progressText)) continue;
    for (const choiceEl of choicesElements) {
      if (!isElementVisible(choiceEl)) continue;
      let commonAncestor = progressEl;
      while (commonAncestor && commonAncestor !== document.body) {
        if (commonAncestor.contains(choiceEl)) {
          const children = Array.from(commonAncestor.children);
          for (const child of children) {
            if (child.contains(progressEl) && child.contains(choiceEl)) {
              commonAncestor = child;
              break;
            }
          }
          return commonAncestor;
        }
        commonAncestor = commonAncestor.parentElement;
      }
    }
  }
  const main = document.querySelector('main, [role="main"]');
  if (main) return main;
  console.warn('[DIAG] satRoot not found, using body as fallback');
  return document.body;
}

// STEP 1: 엄격한 Next 버튼 선택 로직
export function selectNextButton() {
  const allButtons = deepQuerySelectorAll('button, [role="button"], div[role="button"]');
  const satRoot = findSatRoot();
  
  console.log(`[SAT-DEBUG] selectNextButton: 전체 후보 ${allButtons.length}개, SAT root:`, satRoot ? satRoot.tagName : 'null');
  
  // STEP 1-A: 필터링 - SAT root 내부만, header/nav/sidebar 제외
  const filteredCandidates = [];
  
  for (const btn of allButtons) {
    // 기본 가시성 체크
    if (!isElementVisible(btn) || btn.disabled || btn.getAttribute('aria-disabled') === 'true') continue;
    
    // 외부 링크 제외
    if (btn.tagName === 'A') {
      const href = btn.getAttribute('href');
      if (href && (href.startsWith('http') || href !== '#' && !href.startsWith('javascript:'))) continue;
    }
    
    // header/nav/sidebar 제외
    const headerNav = btn.closest('header, nav, [aria-label*="navigation"], [data-testid*="sidebar"], [class*="sidebar"], [class*="header"]');
    if (headerNav) {
      console.log('[SAT-DEBUG] header/nav/sidebar 내부 요소 제외:', btn.tagName);
      continue;
    }
    
    // SAT root 내부인지 확인
    if (!satRoot || !satRoot.contains(btn)) {
      console.log('[SAT-DEBUG] SAT root 외부 요소 제외:', btn.tagName);
      continue;
    }
    
    // "다음" 관련 텍스트/속성 확인
    const text = (btn.innerText || btn.textContent || '').trim();
    const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
    const dataTestId = (btn.getAttribute('data-test-id') || btn.getAttribute('data-testid') || '').trim();
    
    const hasNextText = text.includes('다음') || text.toLowerCase().includes('next') || 
                       text.toLowerCase().includes('continue') || text.includes('계속');
    const hasNextAria = ariaLabel && (
      ariaLabel.includes('다음') || 
      ariaLabel.toLowerCase().includes('next') ||
      ariaLabel.toLowerCase().includes('continue') ||
      ariaLabel.toLowerCase().includes('계속')
    );
    const hasTestId = dataTestId && (
      dataTestId.includes('next') || 
      dataTestId === 'next-button' ||
      dataTestId.includes('continue')
    );
    
    if (!hasNextText && !hasNextAria && !hasTestId) continue;
    
    // progress와 choices를 모두 포함하는 부모 확인
    const progressInParent = satRoot.innerText && satRoot.innerText.match(/\d+\s*\/\s*27/);
    const choicesInParent = satRoot.querySelector('[role="radio"], [class*="choice"]');
    
    const rect = btn.getBoundingClientRect();
    const satRootRect = satRoot.getBoundingClientRect();
    
    filteredCandidates.push({
      button: btn,
      dataTestId: dataTestId,
      hasTestId: dataTestId === 'next-button',
      rect: rect,
      area: rect.width * rect.height,
      distanceFromBottomRight: {
        x: satRootRect.right - rect.right,
        y: satRootRect.bottom - rect.bottom
      },
      hasProgressInParent: !!progressInParent,
      hasChoicesInParent: !!choicesInParent
    });
  }
  
  console.log(`[SAT-DEBUG] selectNextButton: 필터링 후 ${filteredCandidates.length}개 후보`);
  
  if (filteredCandidates.length === 0) {
    console.warn('[SAT-DEBUG] selectNextButton: 필터링 후 후보 없음');
    return null;
  }
  
  // STEP 1-B: 우선순위 정렬
  // 1. data-testid="next-button" 우선
  const withTestId = filteredCandidates.filter(c => c.hasTestId);
  if (withTestId.length > 0) {
    console.log('[SAT-DEBUG] selectNextButton: data-testid="next-button" 후보 선택');
    return withTestId[0].button;
  }
  
  // 2. 가장 큰 rect area + bottom-right 위치
  filteredCandidates.sort((a, b) => {
    // area 우선
    if (Math.abs(a.area - b.area) > 1000) {
      return b.area - a.area;
    }
    // bottom-right 거리 (작을수록 좋음)
    const distA = Math.sqrt(a.distanceFromBottomRight.x ** 2 + a.distanceFromBottomRight.y ** 2);
    const distB = Math.sqrt(b.distanceFromBottomRight.x ** 2 + b.distanceFromBottomRight.y ** 2);
    return distA - distB;
  });
  
  const selected = filteredCandidates[0];
  console.log('[SAT-DEBUG] selectNextButton: 선택된 버튼:', {
    dataTestId: selected.dataTestId,
    area: selected.area,
    distanceFromBottomRight: selected.distanceFromBottomRight
  });
  
  return selected.button;
}

// 네비게이션 버튼 찾기 (aria-label/data-testid 우선, Shadow DOM 포함)
export function findNavigationButton(type, ...keywords) {
  // 다음 버튼 찾기 (aria-label/data-testid 우선)
  if (type === 'next') {
    const allButtons = deepQuerySelectorAll('button, [role="button"], div[role="button"]');
    const candidates = [];
    const DEBUG = true; // 디버깅 플래그
    
    console.log(`[SAT] Next 버튼 검색 시작 (후보: ${allButtons.length}개)`);
    
    // SAT root 컨테이너 찾기
    const satRoot = findSatRoot();
    console.log(`[SAT-DEBUG] SAT root 컨테이너:`, satRoot ? satRoot.tagName + (satRoot.className ? '.' + satRoot.className.split(' ')[0] : '') : 'null');
    
    for (const btn of allButtons) {
      // 보이는 버튼만 확인
      if (!isElementVisible(btn)) continue;
      
      // disabled/aria-disabled 체크
      if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') continue;
      
      // 다른 창으로 넘어가는 요소 제외
      if (btn.tagName === 'A') {
        const href = btn.getAttribute('href');
        const target = btn.getAttribute('target');
        if (href && (href.startsWith('http') || target === '_blank' || target === '_new')) {
          if (DEBUG) console.log('[SAT-DEBUG] 네비게이션 링크 제외:', href);
          continue;
        }
      }
      
      if (btn.hasAttribute('href') && btn.getAttribute('href') !== '#' && !btn.getAttribute('href').startsWith('javascript:')) {
        continue;
      }
      
      if (btn.getAttribute('target') === '_blank' || btn.getAttribute('target') === '_new') {
        continue;
      }
      
      // aria-label, data-testid, title, innerText 모두 확인
      const text = (btn.innerText || btn.textContent || '').trim();
      const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
      const dataTestId = (btn.getAttribute('data-test-id') || btn.getAttribute('data-testid') || '').trim();
      const title = (btn.getAttribute('title') || '').trim();
      const role = btn.getAttribute('role') || '';
      const tabindex = btn.getAttribute('tabindex') || '';
      const className = (btn.className || '').toLowerCase();
      
      // 모든 텍스트를 합쳐서 검색
      const combinedText = `${text} ${ariaLabel} ${dataTestId} ${title}`.toLowerCase();
      
      // aria-label 우선 매칭 (가장 신뢰도 높음)
      const hasNextAria = ariaLabel && (
        ariaLabel.includes('다음') || 
        ariaLabel.toLowerCase().includes('next') ||
        ariaLabel.toLowerCase().includes('continue') ||
        ariaLabel.toLowerCase().includes('계속')
      );
      
      // data-testid 매칭 (두 번째로 신뢰도 높음)
      const hasTestId = dataTestId && (
        dataTestId.includes('next') || 
        dataTestId === 'next-button' ||
        dataTestId.includes('continue')
      );
      
      // 텍스트 매칭
      const hasNextText = text === '다음' || text.toLowerCase() === 'next' || 
                         text.includes('다음') || text.toLowerCase().includes('next') ||
                         text.toLowerCase().includes('continue') || text.includes('계속');
      
      // 클래스명 매칭
      const hasNextClass = className.includes('next') || className.includes('side-step');
      
      // .mdc-button__label 내부 텍스트도 확인
      let hasLabelText = false;
      const label = btn.querySelector('.mdc-button__label');
      if (label) {
        const labelText = (label.textContent || '').trim();
        if (labelText === '다음' || labelText.toLowerCase() === 'next' || 
            labelText.includes('다음') || labelText.toLowerCase().includes('next')) {
          hasLabelText = true;
        }
      }
      
      // 점수 계산 (aria-label/data-testid 우선)
      let score = 0;
      if (hasNextAria) score += 10; // aria-label 최우선
      if (hasTestId) score += 8;    // data-testid 두 번째
      if (hasNextText) score += 5;   // 텍스트 매칭
      if (hasLabelText) score += 4;  // label 내부 텍스트
      if (hasNextClass) score += 2;   // 클래스명
      if (role === 'button') score += 1;
      
      if (score > 0) {
        // STEP 0: 상세 디버깅 정보 수집
        const rect = btn.getBoundingClientRect();
        const style = window.getComputedStyle(btn);
        const isVisible = style.display !== 'none' && 
                         style.visibility !== 'hidden' && 
                         parseFloat(style.opacity) > 0 &&
                         rect.width > 0 && rect.height > 0;
        
        // 컨테이너 정보 수집
        const satRootAncestor = btn.closest('[data-sat-root]');
        const mainAncestor = btn.closest('main, [role="main"]');
        const progressContainer = satRoot && satRoot.contains(btn) ? satRoot : null;
        
        // progress UI 포함 여부 확인
        const progressText = (satRoot ? satRoot.innerText || satRoot.textContent : '').match(/\d+\s*\/\s*27/);
        const hasProgressInContainer = !!progressText;
        
        // dataset 정보
        const dataset = {};
        for (const key in btn.dataset) {
          dataset[key] = btn.dataset[key];
        }
        
        // CSS path 생성 (간단 버전)
        let cssPath = btn.tagName.toLowerCase();
        if (btn.id) cssPath += '#' + btn.id;
        if (btn.className) {
          const firstClass = btn.className.split(' ')[0];
          if (firstClass) cssPath += '.' + firstClass;
        }
        
        // outerHTML 일부 (처음 200자)
        const outerHTMLSlice = btn.outerHTML.substring(0, 200);
        
        const candidateInfo = {
          button: btn,
          score: score,
          text: text.substring(0, 30),
          ariaLabel: ariaLabel.substring(0, 30),
          dataTestId: dataTestId.substring(0, 30),
          // STEP 0: 상세 정보
          dataset: dataset,
          role: role,
          tabindex: tabindex,
          disabled: btn.disabled,
          ariaDisabled: btn.getAttribute('aria-disabled'),
          boundingClientRect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          },
          isVisible: isVisible,
          cssPath: cssPath,
          outerHTMLSlice: outerHTMLSlice,
          satRootAncestor: satRootAncestor ? 'found' : 'none',
          mainAncestor: mainAncestor ? 'found' : 'none',
          inSatRoot: satRoot && satRoot.contains(btn),
          hasProgressInContainer: hasProgressInContainer
        };
        
        candidates.push(candidateInfo);
      }
    }
    
    // STEP 0: 모든 후보 상세 로그 출력
    if (DEBUG && candidates.length > 0) {
      console.log(`[SAT-DEBUG] Next 버튼 후보 전체 목록 (${candidates.length}개):`);
      candidates.forEach((c, idx) => {
        console.log(`[SAT-DEBUG] 후보 #${idx + 1}:`, {
          score: c.score,
          text: c.text,
          dataTestId: c.dataTestId,
          ariaLabel: c.ariaLabel,
          dataset: c.dataset,
          role: c.role,
          tabindex: c.tabindex,
          disabled: c.disabled,
          ariaDisabled: c.ariaDisabled,
          boundingClientRect: c.boundingClientRect,
          isVisible: c.isVisible,
          cssPath: c.cssPath,
          satRootAncestor: c.satRootAncestor,
          mainAncestor: c.mainAncestor,
          inSatRoot: c.inSatRoot,
          hasProgressInContainer: c.hasProgressInContainer,
          outerHTMLSlice: c.outerHTMLSlice
        });
      });
    }
    
    // 점수 순으로 정렬하여 가장 높은 점수의 버튼 반환
    if (candidates.length > 0) {
      // 후보 선택 규칙: data-testid="next-button" 최우선, 동일하면 위치 기반
      candidates.sort((a, b) => {
        // 1순위: data-testid="next-button" 우선
        const aHasTestId = a.dataTestId === 'next-button' || a.dataTestId.includes('next-button');
        const bHasTestId = b.dataTestId === 'next-button' || b.dataTestId.includes('next-button');
        if (aHasTestId && !bHasTestId) return -1;
        if (!aHasTestId && bHasTestId) return 1;
        
        // 2순위: 점수
        if (b.score !== a.score) return b.score - a.score;
        
        // 3순위: 화면 우하단에 위치한 것 (큰 left/top 값)
        const aRect = a.boundingClientRect;
        const bRect = b.boundingClientRect;
        const aPos = aRect.x + aRect.y;
        const bPos = bRect.x + bRect.y;
        return bPos - aPos;
      });
      
      const bestMatch = candidates[0];
      console.log(`[SAT] Next 버튼 발견 (점수: ${bestMatch.score}, 후보: ${candidates.length}개)`);
      console.log(`[SAT] 선택된 버튼: text="${bestMatch.text}", aria-label="${bestMatch.ariaLabel}", data-testid="${bestMatch.dataTestId}"`);
      console.log(`[NEXT-DEBUG] 선택된 버튼 상세:`, {
        index: 0,
        textContent: bestMatch.text,
        ariaLabel: bestMatch.ariaLabel,
        role: bestMatch.role,
        dataTestId: bestMatch.dataTestId,
        className: bestMatch.cssPath,
        boundingClientRect: bestMatch.boundingClientRect,
        isVisible: bestMatch.isVisible,
        outerHTML: bestMatch.outerHTMLSlice,
        timestamp: Date.now()
      });
      
      // 상위 3개 후보 로그 출력 (실패 시 디버깅용)
      if (candidates.length > 1) {
        console.log('[SAT] Next 버튼 후보 (top 3):', candidates.slice(0, 3).map((c, idx) => ({
          index: idx,
          score: c.score,
          text: c.text,
          ariaLabel: c.ariaLabel,
          dataTestId: c.dataTestId,
          role: c.role,
          boundingClientRect: c.boundingClientRect,
          isVisible: c.isVisible,
          inSatRoot: c.inSatRoot,
          hasProgressInContainer: c.hasProgressInContainer,
          outerHTML: c.outerHTMLSlice.substring(0, 100)
        })));
      }
      
      return bestMatch.button;
    }
    
    console.warn('[SAT] Next 버튼을 찾을 수 없습니다. 후보:', candidates.length);
    return null;
  }
  
  // 제출 버튼 찾기 (aria-label/data-testid 우선)
  if (type === 'submit') {
    const allButtons = deepQuerySelectorAll('button, [role="button"]');
    const candidates = [];
    
    console.log(`[SAT] Submit 버튼 검색 시작 (후보: ${allButtons.length}개)`);
    
    for (const btn of allButtons) {
      if (!isElementVisible(btn) || btn.disabled) continue;
      
      const text = (btn.innerText || btn.textContent || '').trim();
      const ariaLabel = (btn.getAttribute('aria-label') || '').trim();
      const dataTestId = (btn.getAttribute('data-test-id') || btn.getAttribute('data-testid') || '').trim();
      const title = (btn.getAttribute('title') || '').trim();
      const className = (btn.className || '').toLowerCase();
      
      // aria-label 우선 매칭
      const hasSubmitAria = ariaLabel && (
        ariaLabel.includes('제출') || 
        ariaLabel.toLowerCase().includes('submit') ||
        ariaLabel.toLowerCase().includes('confirm')
      );
      
      // data-testid 매칭
      const hasTestId = dataTestId && (
        dataTestId.includes('submit') || 
        dataTestId.includes('confirm') ||
        dataTestId === 'submit-button'
      );
      
      // 텍스트 매칭
      const hasSubmitText = text === '제출' || text.toLowerCase() === 'submit' ||
                           text.includes('제출') || text.toLowerCase().includes('submit') ||
                           text.includes('확인') || text.toLowerCase().includes('confirm');
      
      // 클래스명 매칭
      const hasSubmitClass = className.includes('submit') || className.includes('confirm-submit');
      
      // .mdc-button__label 내부 텍스트 확인
      let hasLabelText = false;
      const label = btn.querySelector('.mdc-button__label');
      if (label) {
        const labelText = (label.textContent || '').trim();
        if (labelText === '제출' || labelText.toLowerCase() === 'submit') {
          hasLabelText = true;
        }
      }
      
      // 점수 계산
      let score = 0;
      if (hasSubmitAria) score += 10;
      if (hasTestId) score += 8;
      if (hasSubmitText) score += 5;
      if (hasLabelText) score += 4;
      if (hasSubmitClass) score += 2;
      
      // 모달 내부 버튼 가산점
      const dialog = btn.closest('.confirm-submit-dialog, [role="dialog"]');
      if (dialog) score += 3;
      
      if (score > 0) {
        candidates.push({ 
          button: btn, 
          score: score,
          text: text.substring(0, 30),
          ariaLabel: ariaLabel.substring(0, 30),
          dataTestId: dataTestId.substring(0, 30)
        });
      }
    }
    
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.score - a.score);
      const bestMatch = candidates[0];
      console.log(`[SAT] Submit 버튼 발견 (점수: ${bestMatch.score}, 후보: ${candidates.length}개)`);
      console.log(`[SAT] 선택된 버튼: text="${bestMatch.text}", aria-label="${bestMatch.ariaLabel}", data-testid="${bestMatch.dataTestId}"`);
      
      if (candidates.length > 1) {
        console.log('[SAT] Submit 버튼 후보 (top 3):', candidates.slice(0, 3).map(c => ({
          score: c.score,
          text: c.text,
          ariaLabel: c.ariaLabel
        })));
      }
      
      return bestMatch.button;
    }
    
    console.warn('[SAT] Submit 버튼을 찾을 수 없습니다. 후보:', candidates.length);
    return null;
  }
  
  // 첫 문제 버튼 찾기
  if (type === 'first') {
    const allButtons = document.querySelectorAll('button');
    for (const btn of allButtons) {
      const text = (btn.innerText || btn.textContent || '').trim().toLowerCase();
      if (text.includes('처음') || text.includes('first') || text === '1') {
        if (!btn.disabled && btn.offsetParent !== null) {
          return btn;
        }
      }
    }
    return null;
  }
  
  return null;
}

