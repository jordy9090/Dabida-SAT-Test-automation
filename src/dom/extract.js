// Extracted DOM extraction utilities from content.js
// NOTE: Logic must remain identical to original implementation.

import { deepQuerySelectorAll, isElementVisible } from './deepQuery.js';
import { findSatRoot } from './query.js';

// findSatRoot는 query.js로 이동됨 (순환 의존성 해결)
// Re-export for backward compatibility
export { findSatRoot } from './query.js';

// 문제 화면 판별 (핵심: 문제 화면이 아닐 때는 추출 금지) - 개선
export function isQuestionScreen() {
  // 방법 1: 선택지 요소 확인
  const hasChoices = !!(
    document.querySelector('[role=\"radio\"]') ||
    document.querySelector('button[aria-label*=\"Choice\"]') ||
    document.querySelector('button[class*=\"choice\"]') ||
    document.querySelector('[class*=\"option\"]')
  );
  
  // 방법 2: 문제 번호 확인
  const problemNum = getCurrentProblemNumber();
  const hasProblemNumber = problemNum > 0 && problemNum <= 27;
  
  // 방법 3: Progress 표시 확인
  const progress = getProgressState();
  const hasProgress = progress !== null && progress.includes('/27');
  
  // 방법 4: 문제 텍스트 패턴 확인
  const bodyText = (document.body.innerText || '').toLowerCase();
  const hasQuestionPattern = bodyText.includes('which choice') || 
                             bodyText.includes('what') ||
                             bodyText.includes('based on') ||
                             bodyText.includes('문제') ||
                             /^\d+\./.test(bodyText);
  
  const result = hasChoices || (hasProblemNumber && hasProgress) || hasQuestionPattern;
  
  console.log(`[SAT PDF Exporter] 문제 화면 판별: choices=${hasChoices}, problemNum=${problemNum}, progress=${progress}, pattern=${hasQuestionPattern} → ${result}`);
  
  return result;
}

// 현재 섹션이 Reading인지 Math인지 감지
export function detectCurrentSection() {
  const bodyText = (document.body.innerText || document.body.textContent || '').toLowerCase();
  
  // Reading 섹션 키워드
  const readingKeywords = [
    'reading and writing',
    'reading',
    'passage',
    'text 1',
    'text 2',
    'which choice',
    'best states',
    'best expresses',
    'main purpose'
  ];
  
  // Math 섹션 키워드
  const mathKeywords = [
    'math',
    '수학',
    'calculator',
    'equation',
    'solve for',
    'what is the value',
    'if x =',
    'graph'
  ];
  
  let readingScore = 0;
  let mathScore = 0;
  
  for (const keyword of readingKeywords) {
    if (bodyText.includes(keyword)) {
      readingScore++;
    }
  }
  
  for (const keyword of mathKeywords) {
    if (bodyText.includes(keyword)) {
      mathScore++;
    }
  }
  
  // UI 요소로도 확인
  const sectionHeaders = document.querySelectorAll('h1, h2, h3, [class*=\"section\"], [class*=\"title\"]');
  for (const header of sectionHeaders) {
    const text = (header.innerText || header.textContent || '').toLowerCase();
    if (text.includes('reading') || text.includes('writing')) {
      readingScore += 2;
    }
    if (text.includes('math') || text.includes('수학')) {
      mathScore += 2;
    }
  }
  
  if (readingScore > mathScore && readingScore > 0) {
    console.log(`[SAT PDF Exporter] detected section: reading (score: ${readingScore} vs ${mathScore})`);
    return 'reading';
  } else if (mathScore > readingScore && mathScore > 0) {
    console.log(`[SAT PDF Exporter] detected section: math (score: ${mathScore} vs ${readingScore})`);
    return 'math';
  }
  
  console.warn(`[SAT PDF Exporter] 섹션 감지 실패 (reading: ${readingScore}, math: ${mathScore}). unknown으로 처리`);
  return 'unknown';
}

// 선택지 추출
// 선택지 추출 - 수정: 클릭 가능한 요소에서만 추출 (A-D만)
export function extractChoices(container) {
  // FRAME GUARD: DOM 작업은 worker frame에서만 실행
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [extractChoices] Worker frame이 아닌 iframe에서 실행 시도 - 스킵');
    return [];
  }
  
  const choices = [];
  
  // ============================================================================
  // ACCESSIBILITY-BASED CHOICE EXTRACTION
  // Priority order:
  // 1. role="radio"
  // 2. input[type="radio"] + label
  // 3. elements with aria-checked / aria-selected
  // 4. role="option"
  // ============================================================================
  
  const candidates = [];
  
  // Priority 1: role="radio"
  const radioElements = deepQuerySelectorAll('[role="radio"]', container);
  console.log(`[SAT-DEBUG] [extractChoices] Priority 1 (role="radio"): ${radioElements.length}개 발견`);
  
  for (const el of radioElements) {
    if (!isElementVisible(el) || el.disabled) continue;
    
    const text = (el.innerText || el.textContent || '').trim();
    const ariaLabel = (el.getAttribute('aria-label') || '').trim();
    const ariaChecked = el.getAttribute('aria-checked');
    
    // aria-label에서 Choice A, Choice B 등 추출 시도
    let choiceLetter = null;
    if (ariaLabel) {
      const match = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
      if (match) choiceLetter = match[1].toUpperCase();
    }
    
    // 텍스트에서 A-D 추출 시도 (폴백)
    if (!choiceLetter) {
      const textMatch = text.match(/^([A-D])[\.\)]?\s*/);
      if (textMatch) choiceLetter = textMatch[1].toUpperCase();
    }
    
    // data-testid에서 추출 시도
    if (!choiceLetter) {
      const testId = el.getAttribute('data-testid') || '';
      const testIdMatch = testId.match(/choice[_-]?([A-D])/i) || testId.match(/option[_-]?([A-D])/i);
      if (testIdMatch) choiceLetter = testIdMatch[1].toUpperCase();
    }
    
    // 라벨을 못 찾았으면 인덱스 기반으로 할당 (A, B, C, D 순서)
    if (!choiceLetter) {
      const existingLetters = candidates.map(c => c.label).filter(l => l >= 'A' && l <= 'D');
      const availableLetters = ['A', 'B', 'C', 'D'].filter(l => !existingLetters.includes(l));
      if (availableLetters.length > 0) {
        choiceLetter = availableLetters[0];
      }
    }
    
    if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D') {
      const choiceText = text.replace(/^[A-D][\.\)]\s*/, '').trim() || ariaLabel || '선택지';
      
      // 중복 방지
      if (!candidates.find(c => c.label === choiceLetter && c.element === el)) {
        candidates.push({
          label: choiceLetter,
          text: choiceText,
          element: el,
          priority: 1,
          source: 'role="radio"'
        });
      }
    }
  }
  
  // Priority 2: input[type="radio"] + label
  if (candidates.length < 4) {
    const radioInputs = deepQuerySelectorAll('input[type="radio"]', container);
    console.log(`[SAT-DEBUG] [extractChoices] Priority 2 (input[type="radio"]): ${radioInputs.length}개 발견`);
    
    for (const input of radioInputs) {
      if (!isElementVisible(input) || input.disabled) continue;
      
      // label 찾기
      let labelEl = null;
      const inputId = input.getAttribute('id');
      if (inputId) {
        labelEl = container.querySelector(`label[for="${inputId}"]`);
      }
      
      // 부모가 label인 경우
      if (!labelEl && input.parentElement && input.parentElement.tagName === 'LABEL') {
        labelEl = input.parentElement;
      }
      
      // label의 텍스트 가져오기
      const labelText = labelEl ? (labelEl.innerText || labelEl.textContent || '').trim() : '';
      const inputAriaLabel = input.getAttribute('aria-label') || '';
      const text = labelText || inputAriaLabel;
      
      // A-D 추출
      let choiceLetter = null;
      const match = text.match(/^([A-D])[\.\)]?\s*/) || inputAriaLabel.match(/choice\s*([A-D])/i);
      if (match) {
        choiceLetter = match[1].toUpperCase();
      } else {
        // 인덱스 기반 할당
        const existingLetters = candidates.map(c => c.label).filter(l => l >= 'A' && l <= 'D');
        const availableLetters = ['A', 'B', 'C', 'D'].filter(l => !existingLetters.includes(l));
        if (availableLetters.length > 0) {
          choiceLetter = availableLetters[0];
        }
      }
      
      if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D') {
        const choiceText = text.replace(/^[A-D][\.\)]\s*/, '').trim() || '선택지';
        const targetElement = labelEl || input;
        
        if (!candidates.find(c => c.element === targetElement)) {
          candidates.push({
            label: choiceLetter,
            text: choiceText,
            element: targetElement,
            priority: 2,
            source: 'input[type="radio"] + label'
          });
        }
      }
    }
  }
  
  // Priority 3: elements with aria-checked / aria-selected
  if (candidates.length < 4) {
    const ariaCheckedElements = deepQuerySelectorAll('[aria-checked], [aria-selected]', container);
    console.log(`[SAT-DEBUG] [extractChoices] Priority 3 (aria-checked/selected): ${ariaCheckedElements.length}개 발견`);
    
    for (const el of ariaCheckedElements) {
      if (!isElementVisible(el) || el.disabled) continue;
      
      // 이미 후보에 포함되어 있으면 스킵
      if (candidates.find(c => c.element === el)) continue;
      
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      
      // A-D 추출
      let choiceLetter = null;
      const match = text.match(/^([A-D])[\.\)]?\s*/) || ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
      if (match) {
        choiceLetter = match[1].toUpperCase();
      } else {
        // 인덱스 기반 할당
        const existingLetters = candidates.map(c => c.label).filter(l => l >= 'A' && l <= 'D');
        const availableLetters = ['A', 'B', 'C', 'D'].filter(l => !existingLetters.includes(l));
        if (availableLetters.length > 0) {
          choiceLetter = availableLetters[0];
        }
      }
      
      if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D') {
        const choiceText = text.replace(/^[A-D][\.\)]\s*/, '').trim() || ariaLabel || '선택지';
        
        if (!candidates.find(c => c.label === choiceLetter && c.element === el)) {
          candidates.push({
            label: choiceLetter,
            text: choiceText,
            element: el,
            priority: 3,
            source: 'aria-checked/selected'
          });
        }
      }
    }
  }
  
  // Priority 4: role="option"
  if (candidates.length < 4) {
    const optionElements = deepQuerySelectorAll('[role="option"]', container);
    console.log(`[SAT-DEBUG] [extractChoices] Priority 4 (role="option"): ${optionElements.length}개 발견`);
    
    for (const el of optionElements) {
      if (!isElementVisible(el) || el.disabled) continue;
      
      // 이미 후보에 포함되어 있으면 스킵
      if (candidates.find(c => c.element === el)) continue;
      
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      
      // A-D 추출
      let choiceLetter = null;
      const match = text.match(/^([A-D])[\.\)]?\s*/) || ariaLabel.match(/choice\s*([A-D])/i);
      if (match) {
        choiceLetter = match[1].toUpperCase();
      } else {
        // 인덱스 기반 할당
        const existingLetters = candidates.map(c => c.label).filter(l => l >= 'A' && l <= 'D');
        const availableLetters = ['A', 'B', 'C', 'D'].filter(l => !existingLetters.includes(l));
        if (availableLetters.length > 0) {
          choiceLetter = availableLetters[0];
        }
      }
      
      if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D') {
        const choiceText = text.replace(/^[A-D][\.\)]\s*/, '').trim() || ariaLabel || '선택지';
        
        if (!candidates.find(c => c.label === choiceLetter && c.element === el)) {
          candidates.push({
            label: choiceLetter,
            text: choiceText,
            element: el,
            priority: 4,
            source: 'role="option"'
          });
        }
      }
    }
  }
  
  // Priority로 정렬 (낮은 숫자가 우선)
  candidates.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.label.localeCompare(b.label);
  });
  
  // A-D만 선택하고 중복 제거
  const seenLabels = new Set();
  for (const candidate of candidates) {
    if (candidate.label >= 'A' && candidate.label <= 'D' && !seenLabels.has(candidate.label)) {
      choices.push({
        label: candidate.label,
        text: candidate.text
      });
      seenLabels.add(candidate.label);
    }
  }
  
  // 로그 출력: total candidates, first 5 candidate labels
  console.log(`[SAT-DEBUG] [extractChoices] 총 후보: ${candidates.length}개, 추출된 선택지: ${choices.length}개`);
  if (candidates.length > 0) {
    const first5 = candidates.slice(0, 5).map(c => ({
      label: c.label,
      text: c.text.substring(0, 30) + (c.text.length > 30 ? '...' : ''),
      source: c.source
    }));
    console.log(`[SAT-DEBUG] [extractChoices] 첫 5개 후보:`, first5);
  }
  
  // Priority 5: 텍스트 기반 폴백 - 클릭 가능한 요소 중 A/B/C/D 텍스트가 있는 것
  if (candidates.length < 4) {
    console.log(`[SAT-DEBUG] [extractChoices] Priority 5 (텍스트 기반 폴백): 클릭 가능한 요소 탐색`);
    const allClickable = Array.from(container.querySelectorAll('button, [role="button"], [tabindex], [data-testid], div[onclick], span[onclick]'));
    console.log(`[SAT-DEBUG] [extractChoices] 전체 클릭 가능 요소: ${allClickable.length}개`);
    
    const visibleClickable = allClickable.filter(el => {
      try {
        const r = el.getBoundingClientRect();
        if (r.width < 20 || r.height < 20) return false;
        if (r.bottom < 0 || r.top > window.innerHeight) return false;
        const style = window.getComputedStyle(el);
        if (style.visibility === 'hidden' || style.display === 'none' || style.opacity === '0') return false;
        return true;
      } catch (e) {
        return false;
      }
    });
    
    console.log(`[SAT-DEBUG] [extractChoices] 화면에 보이는 클릭 가능 요소: ${visibleClickable.length}개`);
    
    for (const el of visibleClickable) {
      if (el.disabled) continue;
      if (candidates.find(c => c.element === el)) continue;
      
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      const combinedText = (text + ' ' + ariaLabel).trim();
      
      // A/B/C/D 패턴 매칭 (더 유연하게)
      let choiceLetter = null;
      const patterns = [
        /^(A|B|C|D)\b/i,
        /\b(A|B|C|D)\b/i,
        /^(A|B|C|D)[\.\)]\s*/i,
        /choice\s*(A|B|C|D)/i,
        /option\s*(A|B|C|D)/i,
        /선택지\s*(A|B|C|D)/i
      ];
      
      for (const pattern of patterns) {
        const match = combinedText.match(pattern);
        if (match) {
          choiceLetter = match[1].toUpperCase();
          break;
        }
      }
      
      if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D') {
        const existingLetters = candidates.map(c => c.label).filter(l => l >= 'A' && l <= 'D');
        if (!existingLetters.includes(choiceLetter)) {
          const choiceText = text.replace(/^(A|B|C|D)[\.\)]\s*/i, '').trim() || ariaLabel || '선택지';
          candidates.push({
            label: choiceLetter,
            text: choiceText,
            element: el,
            priority: 5,
            source: '텍스트 기반 폴백'
          });
          console.log(`[SAT-DEBUG] [extractChoices] 텍스트 기반 후보 발견: ${choiceLetter} - ${choiceText.substring(0, 30)}`);
        }
      }
    }
    
    // Priority로 다시 정렬
    candidates.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.label.localeCompare(b.label);
    });
    
    // A-D만 선택하고 중복 제거 (element 포함)
    choices.length = 0;
    const seenLabels = new Set();
    for (const candidate of candidates) {
      if (candidate.label >= 'A' && candidate.label <= 'D' && !seenLabels.has(candidate.label)) {
        choices.push({
          label: candidate.label,
          text: candidate.text,
          element: candidate.element, // ★ element 포함 (클릭에 필요)
          source: candidate.source || 'unknown',
          priority: candidate.priority || 5
        });
        seenLabels.add(candidate.label);
      }
    }
  }
  
  // 최종 폴백: 순수 텍스트 기반 추출
  if (choices.length === 0) {
    console.warn('[SAT PDF Exporter] 모든 방법으로 선택지를 찾지 못함 - 순수 텍스트 기반 폴백 시도');
    const text = container.innerText || '';
    const choicePattern = /^([A-D])[\.\)]\s*([^\n]+)/gm;
    let match;
    const textChoices = [];
    while ((match = choicePattern.exec(text)) !== null && textChoices.length < 4) {
      const label = match[1];
      if (label >= 'A' && label <= 'D') {
        textChoices.push({
          label: label,
          text: match[2].trim()
        });
      }
    }
    if (textChoices.length >= 2) {
      console.log(`[SAT-DEBUG] [extractChoices] 텍스트 기반 추출 성공: ${textChoices.length}개`);
      return textChoices;
    }
  }

  return choices;
}

// 현재 문제 추출 (지문, 문제 본문, 선택지만 - 정답/해설 제외)
// 데이터 구조 고정: { problemNumber, question, choices: {A, B, C, D}, correctAnswer, explanation }
export async function extractCurrentProblem(sectionType) {
  // FRAME GUARD: DOM 작업은 worker frame에서만 실행
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [extractCurrentProblem] Worker frame이 아닌 iframe에서 실행 시도 - 스킵');
    return null;
  }
  
  // ============================================================================
  // STEP 4: DOM 안정화 대기 (최소 보강)
  // ============================================================================
  await new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
  await new Promise(resolve => setTimeout(resolve, 300)); // 300ms 추가 대기
  // ============================================================================
  
  // ============================================================================
  // STEP 1: problemNumber 강제 주입 (절대 undefined 방지)
  // ============================================================================
  let problemNum = getCurrentProblemNumber();
  const progressState = getProgressState();
  
  // 폴백 1: progress에서 파싱
  if (!problemNum || problemNum <= 0) {
    if (progressState) {
      const progressMatch = progressState.match(/(\d+)\s*\/\s*\d+/);
      if (progressMatch) {
        problemNum = parseInt(progressMatch[1]);
        console.log(`[SAT-DEBUG] [extractCurrentProblem] problemNumber 폴백 1: progress에서 파싱 → ${problemNum}`);
      }
    }
  }
  
  // 폴백 2: 전역 카운터 사용 (최후의 수단)
  if (!problemNum || problemNum <= 0) {
    if (!window.__SAT_PROBLEM_COUNTER) {
      window.__SAT_PROBLEM_COUNTER = 0;
    }
    window.__SAT_PROBLEM_COUNTER++;
    problemNum = window.__SAT_PROBLEM_COUNTER;
    console.warn(`[SAT-DEBUG] [extractCurrentProblem] problemNumber 폴백 2: 전역 카운터 사용 → ${problemNum}`);
  }
  
  // 최종 확정: problemNum은 반드시 숫자여야 함
  problemNum = problemNum || 1;
  console.log(`[SAT-DEBUG] [extractCurrentProblem] 최종 problemNumber: ${problemNum}`);
  // ============================================================================
  
  let problemText = '';
  let passageText = '';
  
  // 문제 본문 및 지문 추출
  const allTextElements = document.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
  for (const el of allTextElements) {
    const text = (el.innerText || el.textContent || '').trim();
    if (text.match(new RegExp(`^${problemNum}\\.`)) || text.match(new RegExp(`^${problemNum}\\s+Text`))) {
      const parent = el.closest('[class*=\"container\"], [class*=\"content\"], [class*=\"question\"], main, article');
      if (parent) {
        const fullText = (parent.innerText || parent.textContent || '').trim();
        // "Text 1", "Text 2" 같은 지문 찾기
        const textMatch = fullText.match(/Text\s+\d+[^\n]*/g);
        if (textMatch) {
          passageText = textMatch.join('\n\n');
        }
        // 문제 본문 추출 (선택지 전까지)
        const questionMatch = fullText.match(new RegExp(`${problemNum}\\.\\s*([^A-D]+?)(?=[A-D]\\.|$)`, 's'));
        if (questionMatch) {
          problemText = questionMatch[1].trim();
        } else {
          problemText = fullText.split(/[A-D]\./)[0].trim();
        }
        break;
      }
    }
  }
  
  // 전체 body 텍스트에서 추출 (대체 방법)
  if (!problemText) {
    const bodyText = document.body.innerText || document.body.textContent;
    const problemMatch = bodyText.match(new RegExp(`${problemNum}\\.\\s*([\\s\\S]+?)(?=\\d+\\.|$)`, 'i'));
    if (problemMatch) {
      problemText = problemMatch[1].trim();
      problemText = problemText.split(/[A-D][\.\)]\s*/)[0].trim();
    }
  }
  
  // ============================================================================
  // STEP 3: question DOM 탐지 로직 최소 보강
  // ============================================================================
  if (!problemText) {
    // passage 블록 바로 아래 텍스트 찾기
    const passageNodes = Array.from(document.querySelectorAll('p, div, span')).filter(el => {
      const text = (el.innerText || el.textContent || '').trim();
      return text.includes('Text') || text.length > 100; // 지문 후보
    });
    
    for (const passageNode of passageNodes) {
      // 다음 형제 요소들 중 텍스트 블록 찾기
      let nextSibling = passageNode.nextElementSibling;
      let attempts = 0;
      while (nextSibling && attempts < 5) {
        const text = (nextSibling.innerText || nextSibling.textContent || '').trim();
        if (text.length > 20 && text.length < 500 && !text.match(/^[A-D][\.\)]/)) {
          problemText = text;
          console.log(`[SAT-DEBUG] [extractCurrentProblem] question 폴백: passage 다음 요소에서 발견`);
          break;
        }
        nextSibling = nextSibling.nextElementSibling;
        attempts++;
      }
      if (problemText) break;
    }
    
    // 선택지 영역 위쪽 텍스트 찾기
    if (!problemText) {
      const choicesContainer = document.querySelector('[role="radio"], button[aria-label*="Choice"]');
      if (choicesContainer) {
        let parent = choicesContainer.parentElement;
        let attempts = 0;
        while (parent && attempts < 3) {
          const text = (parent.innerText || parent.textContent || '').trim();
          const beforeChoices = text.split(/[A-D][\.\)]/)[0].trim();
          if (beforeChoices.length > 20 && beforeChoices.length < 500) {
            problemText = beforeChoices;
            console.log(`[SAT-DEBUG] [extractCurrentProblem] question 폴백: 선택지 위쪽에서 발견`);
            break;
          }
          parent = parent.parentElement;
          attempts++;
        }
      }
    }
    
    // role="heading" 또는 큰 font-size 텍스트 찾기
    if (!problemText) {
      const headings = Array.from(document.querySelectorAll('[role="heading"], h1, h2, h3, h4, h5, h6, [class*="heading"], [class*="title"]'));
      for (const heading of headings) {
        const text = (heading.innerText || heading.textContent || '').trim();
        if (text.length > 10 && text.length < 300 && !text.match(/^[A-D][\.\)]/) && !text.match(/Text\s+\d+/)) {
          problemText = text;
          console.log(`[SAT-DEBUG] [extractCurrentProblem] question 폴백: heading에서 발견`);
          break;
        }
      }
    }
  }
  // ============================================================================
  
  // 선택지 추출 (A-D만)
  const choicesArray = extractChoices(document.body);
  
  // choices를 {A: \"...\", B: \"...\", C: \"...\", D: \"...\"} 형태로 변환
  const choices = {};
  for (const choice of choicesArray) {
    if (choice.label >= 'A' && choice.label <= 'D') {
      choices[choice.label] = choice.text;
    }
  }
  
  // ============================================================================
  // STEP 2: questionText 비어 있을 때 placeholder 처리
  // ============================================================================
  if (!problemText || problemText.trim().length === 0) {
    console.warn(`[SAT-DEBUG] [extractCurrentProblem] question 텍스트 추출 실패 - placeholder 사용`);
    problemText = '[QUESTION_NOT_EXTRACTED]';
  }
  // ============================================================================
  
  // 최소한 passage나 question 중 하나는 있어야 함
  if (!passageText && !problemText) {
    console.warn(`[SAT-DEBUG] [extractCurrentProblem] passage와 question 모두 없음 - 최소한 question은 placeholder로 생성`);
    problemText = '[QUESTION_NOT_EXTRACTED]';
  }
  
  // 고정된 데이터 구조 반환 (사용자 요구사항에 맞춤)
  return {
    section: sectionType === 'reading' ? 'Reading and Writing' : 'Math',
    module: 0, // 나중에 채워짐 (collectModuleProblems에서)
    problemNumber: problemNum, // 절대 undefined 아님 (위에서 보장)
    passage: passageText || null,
    question: problemText, // stem 대신 question 사용 (비어있으면 placeholder)
    choices: choices, // {A: \"...\", B: \"...\", C: \"...\", D: \"...\"} 형태
    correctAnswer: '', // 나중에 채워짐 (detectCorrectAnswer에서)
    explanation: '' // 나중에 채워짐 (extractExplanationAfterGrading에서)
  };
}

/**
 * Progress 상태 가져오기 (대폭 강화 - 화면 전체에서 정규식으로 찾기)
 * @returns {string|null} Progress 상태 (예: "1/27", "5/27")
 */
export function getProgressState() {
  // FRAME GUARD: DOM 작업은 worker frame에서만 실행 (단, 읽기 전용이므로 완화)
  // 읽기 전용 함수이므로 guard는 경고만 출력
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [getProgressState] Worker frame이 아닌 iframe에서 실행 - 경고만 출력');
  }
  
  // SAT root container 찾기 (매번 재탐색 - 리렌더로 바뀔 수 있음)
  const satRoot = findSatRoot();
  if (!satRoot) {
    console.warn('[DIAG] satRoot not found, progress 판독 실패');
    return null;
  }
  
  // 방법 1: satRoot 내부 텍스트에서만 정규식으로 찾기 (전역 텍스트 금지)
  const satRootText = satRoot.innerText || satRoot.textContent || '';
  const progressRegex = /(\d+)\s*\/\s*(\d+)/g;
  const matches = satRootText.match(progressRegex);
  
  if (matches && matches.length > 0) {
    // 가장 많이 나타나는 패턴 선택 (보통 정확한 progress)
    const matchCounts = {};
    matches.forEach(match => {
      matchCounts[match] = (matchCounts[match] || 0) + 1;
    });
    
    const mostCommon = Object.keys(matchCounts).reduce((a, b) => 
      matchCounts[a] > matchCounts[b] ? a : b
    );
    
    const parts = mostCommon.split('/').map(s => s.trim());
    const current = parseInt(parts[0]);
    const total = parseInt(parts[1]);
    
    if (current > 0 && current <= total && total === 27) {
      console.log(`[SAT PDF Exporter] Progress 발견 (satRoot text regex): ${mostCommon}`);
      console.log(`[DIAG] progress text raw: "${satRootText.slice(0, 200)}"`);
      return mostCommon;
    }
  }
  
  // 방법 1-2: satRoot 내부에서 특정 셀렉터로 찾기
  const satRootProgressElements = satRoot.querySelectorAll('[class*="progress"], [aria-label*="progress"], [class*="indicator"]');
  for (const el of satRootProgressElements) {
    if (!isElementVisible(el)) continue;
    const text = (el.innerText || el.textContent || '').trim();
    const match = text.match(/(\d+)\s*\/\s*(\d+)/);
    if (match) {
      const current = parseInt(match[1]);
      const total = parseInt(match[2]);
      if (current > 0 && current <= total && total === 27) {
        console.log(`[SAT PDF Exporter] Progress 발견 (satRoot selector): ${match[0]}`);
        return match[0];
      }
    }
  }
  
  // Progress를 찾을 수 없으면 hard fail (기본값 사용 금지)
  console.error('[DIAG] Progress를 찾을 수 없습니다. satRoot snippet:', satRoot?.innerText?.slice(0, 500));
  return null;
}

// 현재 문제 번호 가져오기 (100% 신뢰 가능 + 폴백) - 수정: satRoot 내부로 제한
export function getCurrentProblemNumber() {
  // SAT root container 찾기
  const satRoot = findSatRoot();
  if (!satRoot) {
    console.warn('[DIAG] satRoot not found, problem number 판독 실패');
    return 0;
  }
  
  // 방법 1: satRoot 내부에서 UI 상단 progress 표시 요소를 정확히 찾기
  const progressSelectors = [
    '[class*="progress"]',
    '[class*="indicator"]',
    '[aria-label*="progress"]',
    '[class*="slider"]',
    '[class*="step"]'
  ];
  
  for (const selector of progressSelectors) {
    const elements = satRoot.querySelectorAll(selector);
    for (const el of elements) {
      if (!isElementVisible(el)) continue; // 보이지 않는 요소 제외
      
      const text = (el.innerText || el.textContent || '').trim();
      // SAT는 27 고정이므로 /\b(\d+)\s*\/\s*27\b/만 허용
      const match = text.match(/\b(\d+)\s*\/\s*27\b/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > 0 && num <= 27) {
          console.log(`[SAT PDF Exporter] 문제 번호 발견 (satRoot progress UI): ${num}/27 (raw: "${text}")`);
          return num;
        }
      }
    }
  }
  
  // 방법 2: satRoot 내부 텍스트에서 progress 패턴 찾기
  const satRootText = satRoot.innerText || satRoot.textContent || '';
  const match = satRootText.match(/\b(\d+)\s*\/\s*27\b/);
  if (match) {
    const num = parseInt(match[1]);
    if (num > 0 && num <= 27) {
      console.log(`[SAT PDF Exporter] 문제 번호 발견 (satRoot text): ${num}/27`);
      return num;
    }
  }
  
  // 방법 3: satRoot 내부의 문제 번호로 시작하는 텍스트 찾기
  const problemNumberElements = satRoot.querySelectorAll('[class*="question"], [class*="problem"], [class*="number"]');
  for (const el of problemNumberElements) {
    if (!isElementVisible(el)) continue;
    const text = (el.innerText || el.textContent || '').trim();
    const numMatch = text.match(/^(\d+)\./);
    if (numMatch) {
      const num = parseInt(numMatch[1]);
      if (num > 0 && num <= 27) {
        console.log(`[SAT PDF Exporter] 문제 번호 발견 (satRoot 텍스트 패턴): ${num}`);
        return num;
      }
    }
  }
  
  console.warn('[SAT PDF Exporter] 문제 번호를 찾을 수 없습니다. 기본값 1 사용');
  return 1; // 기본값
}

/**
 * 문제 시그니처 생성 (지문 해시 기반 - 문제 번호를 못 찾을 때 폴백용)
 * @returns {string} 문제 시그니처 해시
 */
export function getQuestionSignature() {
  const bodyText = (document.body.innerText || document.body.textContent || '').trim();
  
  // 지문(passage) 추출 - Reading 섹션의 경우
  let passageText = '';
  const passageSelectors = [
    '[class*="passage"]',
    '[class*="text"]',
    'div[class*="content"]',
    'p'
  ];
  
  for (const selector of passageSelectors) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      const text = (el.innerText || el.textContent || '').trim();
      // 지문은 보통 길고, 문제 번호나 선택지가 없는 텍스트
      if (text.length > 100 && !text.match(/^\d+\./) && !text.match(/^[A-D][\.\)]/)) {
        passageText += text.substring(0, 200); // 지문의 앞부분만 사용
        break;
      }
    }
    if (passageText) break;
  }
  
  // 문제 질문 부분 추출
  let questionText = '';
  const questionMatch = bodyText.match(/\d+\.\s*([^\n]+?)(?=[A-D][\.\)]|$)/);
  if (questionMatch) {
    questionText = questionMatch[1].substring(0, 150);
  }
  
  // 선택지 일부 추출
  let choicesText = '';
  const choicesMatch = bodyText.match(/([A-D][\.\)]\s*[^\n]+)/g);
  if (choicesMatch && choicesMatch.length > 0) {
    choicesText = choicesMatch.slice(0, 2).join(' ').substring(0, 100); // A, B 선택지만
  }
  
  // 지문 + 문제 + 선택지를 합쳐서 시그니처 생성
  const signature = (passageText + questionText + choicesText).trim();
  
  if (!signature) {
    // 아무것도 못 찾았으면 bodyText의 일부를 사용
    return bodyText.substring(0, 200).replace(/\s+/g, ' ');
  }
  
  // 해시 생성 (더 강력한 해시)
  let hash = 0;
  for (let i = 0; i < signature.length; i++) {
    const char = signature.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const hashStr = Math.abs(hash).toString(36);
  console.log(`[SAT PDF Exporter] 문제 시그니처 생성: ${hashStr} (지문: ${passageText ? '있음' : '없음'}, 문제: ${questionText ? '있음' : '없음'})`);
  
  return hashStr;
}

// 채점 완료 판별 (더 엄격하게)
export function isGraded() {
  // FRAME GUARD: DOM 작업은 worker frame에서만 실행
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [isGraded] Worker frame이 아닌 iframe에서 실행 - 경고만 출력');
  }
  
  const satRoot = findSatRoot();
  if (!satRoot) {
    return false;
  }
  
  // 조건 1: answered-correct/incorrect 클래스가 있는지 확인
  const hasAnsweredClass = !!satRoot.querySelector('[class*="answered-correct"], [class*="answered-incorrect"]');
  
  // 조건 2: aria-label에 Correct/Incorrect가 포함된 옵션이 있는지 확인
  const hasCorrectAria = !!satRoot.querySelector('[aria-label*="Correct" i], [aria-label*="Incorrect" i], [aria-label*="정답"], [aria-label*="오답"]');
  
  // 조건 3: 해설 컨테이너가 나타났는지 확인
  const hasExplanation = !!satRoot.querySelector('[class*="explanation"], [class*="해설"], [class*="solution"]');
  
  const result = hasAnsweredClass || hasCorrectAria || hasExplanation;
  
  // #region agent log
  if (typeof window !== 'undefined' && window.location) {
    const logData = {
      location: 'extract.js:isGraded',
      message: 'isGraded check',
      data: {
        hasAnsweredClass,
        hasCorrectAria,
        hasExplanation,
        result,
        satRootExists: !!satRoot
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'initial',
      hypothesisId: 'A'
    };
    console.log('[DEBUG-LOG]', logData);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    }).catch(err => console.warn('[DEBUG-LOG] HTTP log failed:', err));
  }
  // #endregion
  
  return result;
}

/**
 * 채점 완료 대기 (더 엄격한 조건: 정답 표시가 실제로 나타날 때까지 대기)
 * @returns {Promise<string|null>} 'correct' | 'incorrect' | null
 */
export async function waitForGrading() {
  console.log('[GRADING] 채점 대기 시작 (엄격한 조건: 정답 표시 확인)');
  const timeoutMs = 6000; // 6초 타임아웃 (증가)
  
  // SAT root container 찾기
  const satRoot = findSatRoot();
  if (!satRoot) {
    console.error('[GRADING] satRoot not found, 채점 대기 실패');
    // #region agent log
    if (typeof window !== 'undefined' && window.location) {
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'extract.js:waitForGrading',
          message: 'satRoot not found',
          data: {},
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'initial',
          hypothesisId: 'A'
        })
      }).catch(() => {});
    }
    // #endregion
    return null;
  }
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    let resolved = false;
    
    // 폴링 방식으로 채점 완료 확인 (더 엄격한 조건)
    const checkGrading = () => {
      if (resolved) return;
      
      const progressState = getProgressState();
      
      // 조건 1: answered-correct/incorrect 클래스 확인
      const answeredCorrect = satRoot.querySelector('[class*="answered-correct"]');
      const answeredIncorrect = satRoot.querySelector('[class*="answered-incorrect"]');
      
      // 조건 2: aria-label에 Correct/Incorrect 포함 확인
      const correctAria = satRoot.querySelector('[aria-label*="Correct" i], [aria-label*="정답"]');
      const incorrectAria = satRoot.querySelector('[aria-label*="Incorrect" i], [aria-label*="오답"]');
      
      // 조건 3: 해설 컨테이너 확인
      const explanation = satRoot.querySelector('[class*="explanation"], [class*="해설"], [class*="solution"]');
      
      // 조건 4: 옵션 요소들에서 정답 마킹 확인
      const options = satRoot.querySelectorAll('[role="radio"], button[aria-label*="Choice"], [class*="option"], .mat-mdc-list-item');
      let foundCorrectOption = false;
      let foundIncorrectOption = false;
      
      for (const opt of options) {
        if (!isElementVisible(opt) || !satRoot.contains(opt)) continue;
        
        const className = opt.className || '';
        const ariaLabel = (opt.getAttribute('aria-label') || '').toLowerCase();
        
        // answered-correct 클래스 또는 correct 관련 aria-label
        if (/\banswered-correct\b/.test(className) || 
            /\bcorrect\b/.test(className) ||
            ariaLabel.includes('correct') || ariaLabel.includes('정답')) {
          foundCorrectOption = true;
        }
        
        // answered-incorrect 클래스 또는 incorrect 관련 aria-label
        if (/\banswered-incorrect\b/.test(className) ||
            /\bincorrect\b/.test(className) ||
            ariaLabel.includes('incorrect') || ariaLabel.includes('오답')) {
          foundIncorrectOption = true;
        }
      }
      
      // 채점 완료 판정: 위 조건 중 하나라도 만족하면 완료
      const isGradedNow = !!(answeredCorrect || answeredIncorrect || 
                            correctAria || incorrectAria || 
                            explanation || foundCorrectOption || foundIncorrectOption);
      
      // #region agent log (최대 5번만 로깅하여 스팸 방지)
      if (typeof window !== 'undefined' && window.location && (Date.now() - startTime) % 400 < 80) {
        const logData = {
          location: 'extract.js:waitForGrading:checkGrading',
          message: 'grading check iteration',
          data: {
            progressState,
            answeredCorrect: !!answeredCorrect,
            answeredIncorrect: !!answeredIncorrect,
            correctAria: !!correctAria,
            incorrectAria: !!incorrectAria,
            explanation: !!explanation,
            foundCorrectOption,
            foundIncorrectOption,
            isGradedNow,
            optionsCount: options.length,
            elapsedMs: Date.now() - startTime,
            satRootTextSlice: (satRoot.innerText || '').substring(0, 400)
          },
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'initial',
          hypothesisId: 'A'
        };
        console.log('[DEBUG-LOG]', logData);
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData)
        }).catch(err => console.warn('[DEBUG-LOG] HTTP log failed:', err));
      }
      // #endregion
      
      if (isGradedNow) {
        resolved = true;
        const result = (answeredCorrect || correctAria || foundCorrectOption) ? 'correct' : 'incorrect';
        console.log(`[GRADING] ✓ 채점 완료 감지: ${result}`);
        resolve(result);
        return;
      }
      
      // 타임아웃 체크
      if (Date.now() - startTime >= timeoutMs) {
        resolved = true;
        console.error(`[GRADING] ✗ 채점 대기 타임아웃 (${timeoutMs}ms)`);
        console.error(`[DIAG] satRoot snippet:`, satRoot?.innerText?.slice(0, 500));
        // #region agent log
        if (typeof window !== 'undefined' && window.location) {
          const logData = {
            location: 'extract.js:waitForGrading:timeout',
            message: 'grading timeout',
            data: {
              elapsedMs: Date.now() - startTime,
              satRootHTMLSlice: (satRoot.innerHTML || '').substring(0, 800),
              satRootTextSlice: (satRoot.innerText || '').substring(0, 400)
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'initial',
            hypothesisId: 'A'
          };
          console.error('[DEBUG-LOG]', logData);
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
          }).catch(err => console.warn('[DEBUG-LOG] HTTP log failed:', err));
        }
        // #endregion
        resolve(null);
        return;
      }
      
      // 80ms마다 재확인
      setTimeout(checkGrading, 80);
    };
    
    // 즉시 첫 확인
    checkGrading();
  });
}

// 정답 추출 (개선된 로직: 여러 신호 확인)
export function detectCorrectAnswer() {
  console.log('[ANSWER] 정답 추출 중 (개선된 로직)...');
  
  // FRAME GUARD: DOM 작업은 worker frame에서만 실행
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [detectCorrectAnswer] Worker frame이 아닌 iframe에서 실행 시도 - 스킵');
    return null;
  }
  
  // SAT root container 찾기
  const satRoot = findSatRoot();
  if (!satRoot) {
    console.error('[ANSWER] satRoot not found, 정답 추출 실패');
    // #region agent log
    if (typeof window !== 'undefined' && window.location) {
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'extract.js:detectCorrectAnswer',
          message: 'satRoot not found',
          data: {},
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'initial',
          hypothesisId: 'B'
        })
      }).catch(() => {});
    }
    // #endregion
    return null;
  }
  
  // 옵션 후보 수집 (더 robust한 selector)
  const optionSelectors = [
    '[role="radio"]',
    'button[aria-label*="Choice"]',
    '.option',
    '[class*="option"]',
    '.mat-mdc-list-item'
  ];
  
  const candidates = [];
  for (const selector of optionSelectors) {
    const elements = satRoot.querySelectorAll(selector);
    for (const el of elements) {
      if (!isElementVisible(el) || !satRoot.contains(el)) continue;
      if (candidates.find(c => c.element === el)) continue; // 중복 제거
      candidates.push({ element: el, selector });
    }
  }
  
  // 각 후보에서 choice letter 결정
  const optionCandidates = [];
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const el = candidate.element;
    
    const className = el.className || '';
    const ariaLabel = (el.getAttribute('aria-label') || '').trim();
    const dataTestId = (el.getAttribute('data-testid') || '').trim();
    const text = (el.innerText || el.textContent || '').trim();
    
    // choice letter 결정 (우선순위 순)
    let choiceLetter = null;
    
    // 방법 1: aria-label에서 "Choice A/B/C/D" 추출
    const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
    if (ariaMatch) {
      choiceLetter = ariaMatch[1].toUpperCase();
    }
    
    // 방법 2: 텍스트에서 "A." "B." 등으로 시작하는지 확인
    if (!choiceLetter) {
      const textMatch = text.match(/^([A-D])[\.\)]\s*/);
      if (textMatch) {
        choiceLetter = textMatch[1].toUpperCase();
      }
    }
    
    // 방법 3: data-testid에서 추출
    if (!choiceLetter) {
      const testIdMatch = dataTestId.match(/choice[_-]?([A-D])/i) || dataTestId.match(/option[_-]?([A-D])/i);
      if (testIdMatch) {
        choiceLetter = testIdMatch[1].toUpperCase();
      }
    }
    
    // 방법 4: 폴백 - 인덱스 기반 (0..3 => A..D)
    if (!choiceLetter && i < 4) {
      choiceLetter = String.fromCharCode(65 + i); // A, B, C, D
    }
    
    if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D') {
      optionCandidates.push({
        letter: choiceLetter,
        element: el,
        className,
        ariaLabel: ariaLabel.substring(0, 50),
        dataTestId: dataTestId.substring(0, 30),
        text: text.substring(0, 50),
        visible: isElementVisible(el),
        index: i
      });
    }
  }
  
  // #region agent log
  if (typeof window !== 'undefined' && window.location) {
    const logData = {
      location: 'extract.js:detectCorrectAnswer:afterCandidateCollection',
      message: 'option candidates collected',
      data: {
        candidatesCount: optionCandidates.length,
        candidates: optionCandidates.map(c => ({
          letter: c.letter,
          className: c.className.substring(0, 100),
          ariaLabel: c.ariaLabel,
          dataTestId: c.dataTestId,
          text: c.text,
          visible: c.visible,
          index: c.index
        })),
        satRootTextSlice: (satRoot.innerText || '').substring(0, 400)
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'initial',
      hypothesisId: 'B'
    };
    console.log('[DEBUG-LOG]', logData);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    }).catch(err => console.warn('[DEBUG-LOG] HTTP log failed:', err));
  }
  // #endregion
  
  // 정답 판별 (우선순위 순)
  for (const candidate of optionCandidates) {
    const el = candidate.element;
    const className = el.className || '';
    const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
    const fullText = (el.innerText || el.textContent || '').toLowerCase();
    
    // 신호 1: className에 answered-correct 또는 correct 포함
    if (/\banswered-correct\b/.test(className) || /\bcorrect\b/.test(className)) {
      console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (className: answered-correct/correct)`);
      return candidate.letter;
    }
    
    // 신호 2: aria-label에 correct 포함
    if (ariaLabel.includes('correct') || ariaLabel.includes('정답')) {
      console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (aria-label: correct)`);
      return candidate.letter;
    }
    
    // 신호 3: 요소 내부 텍스트에 "정답입니다" 또는 "Correct" 포함
    if (fullText.includes('정답입니다') || fullText.includes('정답입니다!') || 
        fullText.includes('this is correct') || fullText.includes('correct!')) {
      console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (내부 텍스트: 정답입니다/Correct)`);
      return candidate.letter;
    }
    
    // 신호 4: 초록색 테두리/배경색 확인 (CSS computed style)
    try {
      const style = window.getComputedStyle(el);
      const borderColor = style.borderColor || '';
      const backgroundColor = style.backgroundColor || '';
      const outlineColor = style.outlineColor || '';
      
      // 초록색 RGB 값 확인 (rgb(76, 175, 80) 또는 유사한 값)
      const isGreenBorder = borderColor.includes('76, 175, 80') || borderColor.includes('rgb(76, 175, 80)') ||
                          borderColor.includes('4caf50') || borderColor.includes('#4caf50');
      const isGreenBg = backgroundColor.includes('76, 175, 80') || backgroundColor.includes('rgb(76, 175, 80)') ||
                       backgroundColor.includes('4caf50') || backgroundColor.includes('#4caf50');
      const isGreenOutline = outlineColor.includes('76, 175, 80') || outlineColor.includes('rgb(76, 175, 80)') ||
                            outlineColor.includes('4caf50') || outlineColor.includes('#4caf50');
      
      if (isGreenBorder || isGreenBg || isGreenOutline) {
        console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (초록색 테두리/배경)`);
        return candidate.letter;
      }
    } catch (e) {
      // 스타일 확인 실패 시 무시
    }
    
    // 신호 5: 요소 내부에 correct 아이콘/마커 찾기
    const iconElements = el.querySelectorAll('svg, [class*="icon"], [class*="marker"], [class*="check"], [class*="correct"]');
    for (const icon of iconElements) {
      const iconTitle = (icon.getAttribute('title') || '').toLowerCase();
      const iconAriaLabel = (icon.getAttribute('aria-label') || '').toLowerCase();
      const iconText = (icon.textContent || '').toLowerCase();
      if (iconTitle.includes('correct') || iconAriaLabel.includes('correct') ||
          iconTitle.includes('정답') || iconAriaLabel.includes('정답') ||
          iconText.includes('정답') || iconText.includes('correct')) {
        console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (icon/marker)`);
        return candidate.letter;
      }
    }
    
    // 신호 6 제거: 부모 요소 검색은 너무 넓게 매칭하여 잘못된 정답을 반환할 수 있음
    // 대신 요소 자체의 신호만 사용
  }
  
  // 폴백 1: "정답입니다" 텍스트가 있는 옵션 찾기 (전체 텍스트 검색)
  for (const candidate of optionCandidates) {
    const el = candidate.element;
    // 요소와 그 자식 요소들의 전체 텍스트 확인
    const allText = (el.innerText || el.textContent || '').toLowerCase();
    if (allText.includes('정답입니다') || allText.includes('정답입니다!') ||
        allText.includes('this is correct') || allText.includes('correct!')) {
      console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (전체 텍스트에서 "정답입니다" 발견)`);
      return candidate.letter;
    }
  }
  
  // 폴백 2: explanation 영역에서 "Correct answer: X" 패턴 파싱
  const explanationSelectors = [
    '[class*="explanation"]',
    '[class*="solution"]',
    '[class*="해설"]'
  ];
  
  for (const selector of explanationSelectors) {
    const explanationEl = satRoot.querySelector(selector);
    if (explanationEl && isElementVisible(explanationEl)) {
      const text = (explanationEl.innerText || explanationEl.textContent || '').trim();
      const match = text.match(/(?:Correct answer|정답|Answer)[:\s]*([A-D])/i);
      if (match) {
        const answer = match[1];
        console.log(`[SAT PDF Exporter] 정답 발견: ${answer} (explanation 텍스트)`);
        return answer;
      }
    }
  }
  
  // 폴백 3: satRoot 전체에서 "정답입니다" 텍스트가 있는 옵션 찾기
  const allOptionsWithText = satRoot.querySelectorAll('*');
  for (const el of allOptionsWithText) {
    if (!isElementVisible(el)) continue;
    const text = (el.innerText || el.textContent || '').toLowerCase();
    if (text.includes('정답입니다') || text.includes('this is correct')) {
      // 이 요소가 어떤 옵션(A-D)에 속하는지 확인
      for (const candidate of optionCandidates) {
        if (candidate.element === el || candidate.element.contains(el) || el.contains(candidate.element)) {
          console.log(`[SAT PDF Exporter] 정답 발견: ${candidate.letter} (satRoot 전체 검색에서 "정답입니다" 발견)`);
          return candidate.letter;
        }
      }
    }
  }
  
  // #region agent log
  if (typeof window !== 'undefined' && window.location) {
    const logData = {
      location: 'extract.js:detectCorrectAnswer:failed',
      message: 'correct answer not found',
      data: {
        candidatesCount: optionCandidates.length,
        candidates: optionCandidates.map(c => ({
          letter: c.letter,
          className: c.className.substring(0, 100),
          ariaLabel: c.ariaLabel,
          visible: c.visible
        })),
        satRootHTMLSlice: (satRoot.innerHTML || '').substring(0, 800),
        satRootTextSlice: (satRoot.innerText || '').substring(0, 400)
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'initial',
      hypothesisId: 'B'
    };
    console.error('[DEBUG-LOG]', logData);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    }).catch(err => console.warn('[DEBUG-LOG] HTTP log failed:', err));
  }
  // #endregion
  
  console.warn('[SAT PDF Exporter] 정답을 찾을 수 없습니다');
  return null;
}

// 옵션 요소에서 letter (A-D) 추출 헬퍼 함수
function getLetterFromOptionEl(el) {
  const text = (el.innerText || el.textContent || '').trim();
  const match = text.match(/^\s*([A-D])\b/);
  if (match) return match[1];
  
  // fallback: aria-label, data-choice-letter 등
  const ariaLabel = el.getAttribute('aria-label') || '';
  const match2 = ariaLabel.match(/\b([A-D])\b/);
  if (match2) return match2[1];
  
  const dataLetter = el.getAttribute('data-choice-letter') || el.getAttribute('data-choice');
  if (dataLetter && /^[A-D]$/.test(dataLetter)) return dataLetter;
  
  return null;
}

// Explanation 추출 (채점 후 DOM에서만, 정답 옵션 기준)
export function extractExplanationAfterGrading(correctAnswer = null, expectedProblemNumber = null) {
  console.log('[SAT PDF Exporter] Explanation 추출 중 (정답 옵션 기준)...', correctAnswer ? `정답: ${correctAnswer}` : '', expectedProblemNumber ? `예상 문제 번호: ${expectedProblemNumber}` : '');
  
  // #region agent log
  const currentProblemNum = getCurrentProblemNumber();
  const currentProgress = getProgressState();
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:entry',message:'extractExplanationAfterGrading called',data:{correctAnswer,expectedProblemNumber,currentProblemNum,currentProgress,problemNumberMatch:expectedProblemNumber===currentProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // 문제 번호 불일치 체크: 예상 문제 번호가 제공되었고 현재 문제 번호와 다르면 경고
  if (expectedProblemNumber !== null && currentProblemNum !== expectedProblemNumber) {
    console.warn(`[SAT PDF Exporter] ⚠️ 문제 번호 불일치 감지! 예상: ${expectedProblemNumber}, 현재 DOM: ${currentProblemNum}. 해설 추출은 계속 진행하지만 주의가 필요합니다.`);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:problemNumberMismatch',message:'problem number mismatch detected',data:{expectedProblemNumber,currentProblemNum,currentProgress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  }
  
  // FRAME GUARD: DOM 작업은 worker frame에서만 실행
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [extractExplanationAfterGrading] Worker frame이 아닌 iframe에서 실행 시도 - 스킵');
    return '';
  }
  
  // SAT root container 찾기
  const satRoot = findSatRoot();
  if (!satRoot) {
    console.warn('[SAT PDF Exporter] satRoot not found, Explanation 추출 실패');
    return '';
  }
  
  // #region agent log
  const satRootProgress = getProgressState();
  const satRootProblemNum = getCurrentProblemNumber();
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:satRootFound',message:'satRoot found, checking problem number',data:{satRootProgress,satRootProblemNum,currentProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // 정답 옵션 요소 찾기 (정답이 제공된 경우)
  let correctOptionElement = null;
  if (correctAnswer) {
    // 옵션 후보 수집 (detectCorrectAnswer와 동일한 로직)
    const optionSelectors = [
      '[role="radio"]',
      'button[aria-label*="Choice"]',
      '.option',
      '[class*="option"]',
      '.mat-mdc-list-item'
    ];
    
    const candidates = [];
    for (const selector of optionSelectors) {
      const elements = satRoot.querySelectorAll(selector);
      for (const el of elements) {
        if (!isElementVisible(el) || !satRoot.contains(el)) continue;
        if (candidates.find(c => c.element === el)) continue;
        candidates.push({ element: el, selector });
      }
    }
    
    console.log(`[SAT PDF Exporter] 정답 옵션 요소 검색 시작 (정답: ${correctAnswer}, 후보: ${candidates.length}개)`);
    
    // 정답 옵션 찾기
    for (const candidate of candidates) {
      const el = candidate.element;
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      
      // choice letter 결정
      let choiceLetter = null;
      const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
      if (ariaMatch) {
        choiceLetter = ariaMatch[1].toUpperCase();
      } else {
        const textMatch = text.match(/^([A-D])[\.\)]\s*/);
        if (textMatch) {
          choiceLetter = textMatch[1].toUpperCase();
        }
      }
      
      console.log(`[SAT PDF Exporter] 옵션 후보: letter=${choiceLetter}, text=${text.substring(0, 30)}..., ariaLabel=${ariaLabel.substring(0, 30)}...`);
      
      // 정답과 일치하는 옵션 찾기
      if (choiceLetter === correctAnswer) {
        // 정답 표시 확인 (className, aria-label, 텍스트 등)
        const className = el.className || '';
        const fullText = text.toLowerCase();
        const hasCorrectClass = /\banswered-correct\b/.test(className) || /\bcorrect\b/.test(className);
        const hasCorrectAria = ariaLabel.toLowerCase().includes('correct') || ariaLabel.toLowerCase().includes('정답');
        const hasCorrectText = fullText.includes('정답입니다') || fullText.includes('this is correct');
        
        console.log(`[SAT PDF Exporter] 정답 옵션 매칭 확인: hasCorrectClass=${hasCorrectClass}, hasCorrectAria=${hasCorrectAria}, hasCorrectText=${hasCorrectText}`);
        
        if (hasCorrectClass || hasCorrectAria || hasCorrectText) {
          correctOptionElement = el;
          console.log(`[SAT PDF Exporter] 정답 옵션 요소 발견: ${correctAnswer}`);
          // #region agent log
          const optionProblemNum = getCurrentProblemNumber();
          const optionParentText = (el.parentElement?.innerText || '').substring(0, 200);
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:correctOptionFound',message:'correct option element found',data:{correctAnswer,optionProblemNum,currentProblemNum,optionParentText:optionParentText.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          break;
        } else {
          // 정답 표시가 없어도 정답 letter와 일치하면 사용 (폴백)
          console.warn(`[SAT PDF Exporter] 정답 표시가 없지만 letter 일치: ${correctAnswer}, 폴백으로 사용`);
          correctOptionElement = el;
          // #region agent log
          const optionProblemNum = getCurrentProblemNumber();
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:correctOptionFallback',message:'correct option found via fallback',data:{correctAnswer,optionProblemNum,currentProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          break;
        }
      }
    }
    
    if (!correctOptionElement) {
      console.warn(`[SAT PDF Exporter] 정답 옵션 요소를 찾지 못함 (정답: ${correctAnswer}, 후보: ${candidates.length}개)`);
    }
  }
  
  // 정답 옵션 요소가 있으면 그 요소 내부/하단에서만 explanation 찾기
  if (correctOptionElement) {
    const explanationSelectors = [
      '[class*="explanation"]',
      '[class*="solution"]',
      '[data-testid*="explanation"]',
      '[class*="hint"]',
      '[class*="reasoning"]',
      '[class*="해설"]'
    ];
    
    console.log(`[SAT PDF Exporter] 정답 옵션 요소에서 해설 검색 시작 (정답: ${correctAnswer})`);
    
    // 방법 1: 정답 옵션 요소 내부에서 찾기
    for (const selector of explanationSelectors) {
      const element = correctOptionElement.querySelector(selector);
      if (element && isElementVisible(element)) {
        const text = (element.innerText || element.textContent || '').trim();
        console.log(`[SAT PDF Exporter] 해설 후보 발견 (정답 옵션 내부, ${selector}): ${text.substring(0, 100)}...`);
        if (text.length > 10) {
          // "정답입니다" 또는 "정답" 이후의 텍스트 추출
          let explanationText = text;
          const correctMatch = text.split(/정답입니다[!]?/i);
          const correctEngMatch = text.split(/this is correct[!]?/i);
          
          if (correctMatch.length > 1) {
            explanationText = correctMatch.slice(1).join(' ').trim();
          } else if (correctEngMatch.length > 1) {
            explanationText = correctEngMatch.slice(1).join(' ').trim();
          } else {
            // "정답입니다"가 없으면 전체 텍스트 사용 (이미 정답 옵션 내부이므로)
            explanationText = text;
          }
          
          // 선택지 텍스트 제거
          explanationText = explanationText.replace(/^[A-D][\.\)]\s*[^\n]*/gm, '').trim();
          const cleaned = explanationText.replace(/\s+/g, ' ').trim();
          
          if (cleaned.length > 10) {
            console.log(`[SAT PDF Exporter] Explanation 발견 (정답 옵션 내부, ${selector}): ${cleaned.substring(0, 50)}...`);
            // #region agent log
            const explanationProblemNum = getCurrentProblemNumber();
            const explanationProgress = getProgressState();
            fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:explanationFoundInside',message:'explanation found inside correct option',data:{correctAnswer,explanationProblemNum,explanationProgress,currentProblemNum,explanationPreview:cleaned.substring(0,100),explanationLength:cleaned.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            return cleaned;
          } else {
            console.warn(`[SAT PDF Exporter] 해설 텍스트가 너무 짧음: ${cleaned.length}자`);
          }
        }
      }
    }
    
    // 방법 2 제거: 부모 요소 검색은 너무 넓게 매칭하여 잘못된 해설을 반환할 수 있음
    // 대신 정답 옵션 요소 자체의 해설만 사용
    
    console.warn(`[SAT PDF Exporter] 정답 옵션 요소에서 해설을 찾지 못함 (정답: ${correctAnswer})`);
  } else {
    console.warn(`[SAT PDF Exporter] 정답 옵션 요소를 찾지 못함 (정답: ${correctAnswer})`);
  }
  
  // 폴백: satRoot 전체에서 "정답" 표시가 있는 explanation만 찾기 (오답 설명 제외)
  console.log(`[SAT PDF Exporter] 폴백: satRoot 전체에서 해설 검색 시작 (정답: ${correctAnswer || '없음'})`);
  const explanationSelectors = [
    '[class*="explanation"]',
    '[class*="solution"]',
    '[data-testid*="explanation"]',
    '[class*="hint"]',
    '[class*="reasoning"]',
    '[class*="해설"]'
  ];
  
  let foundExplanations = [];
  for (const selector of explanationSelectors) {
    const elements = satRoot.querySelectorAll(selector);
    console.log(`[SAT PDF Exporter] 폴백: ${selector}로 ${elements.length}개 요소 발견`);
    for (const element of elements) {
      if (!isElementVisible(element)) continue;
      const text = (element.innerText || element.textContent || '').trim();
      const textLower = text.toLowerCase();
      
      // "정답" 또는 "정답입니다"가 포함되고, "오답"이 포함되지 않은 explanation만 추출
      if (text.length > 10 && 
          (textLower.includes('정답') || textLower.includes('correct')) &&
          !textLower.includes('오답') && !textLower.includes('incorrect')) {
        
        console.log(`[SAT PDF Exporter] 폴백: 해설 후보 발견 (${selector}): ${text.substring(0, 100)}...`);
        
        let explanationText = text;
        const correctMatch = text.split(/정답입니다[!]?/i);
        const correctEngMatch = text.split(/this is correct[!]?/i);
        
        if (correctMatch.length > 1) {
          explanationText = correctMatch.slice(1).join(' ').trim();
        } else if (correctEngMatch.length > 1) {
          explanationText = correctEngMatch.slice(1).join(' ').trim();
        }
        
        // 선택지 텍스트 제거
        explanationText = explanationText.replace(/^[A-D][\.\)]\s*[^\n]*/gm, '').trim();
        const cleaned = explanationText.replace(/\s+/g, ' ').trim();
        
        if (cleaned.length > 10) {
          foundExplanations.push({ selector, text: cleaned });
          console.log(`[SAT PDF Exporter] Explanation 발견 (폴백, ${selector}): ${cleaned.substring(0, 50)}...`);
        }
      }
    }
  }
  
  // 여러 해설이 발견되면 첫 번째 것 반환
  if (foundExplanations.length > 0) {
    // #region agent log
    const explanationProblemNum = getCurrentProblemNumber();
    const explanationProgress = getProgressState();
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractExplanationAfterGrading:explanationFoundFallback',message:'explanation found via fallback',data:{correctAnswer,explanationProblemNum,explanationProgress,currentProblemNum,foundCount:foundExplanations.length,explanationPreview:foundExplanations[0].text.substring(0,100),explanationLength:foundExplanations[0].text.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    return foundExplanations[0].text;
  }
  
  // 폴백: 초록/빨강 박스 근처에서 찾기 (satRoot 내부에서만)
  const gradedBoxes = satRoot.querySelectorAll('[class*="correct"], [class*="incorrect"], [class*="정답"], [class*="오답"]');
  for (const box of gradedBoxes) {
    if (!isElementVisible(box)) continue;
    
    const parent = box.closest('[class*="container"], [class*="content"], [class*="card"]');
    if (parent && satRoot.contains(parent)) {
      const fullText = (parent.innerText || parent.textContent || '').trim();
      // "정답입니다" 또는 "This is correct" 이후 텍스트 추출
      const explanationMatch = fullText.split(/정답입니다|This is correct|정답|Correct/i)[1];
      if (explanationMatch) {
        const explanation = explanationMatch.split(/[A-D][\.\)]/)[0].trim();
        if (explanation.length > 10) {
          const cleaned = explanation.replace(/\s+/g, ' ').trim();
          console.log(`[SAT PDF Exporter] Explanation 발견 (박스 근처): ${cleaned.substring(0, 50)}...`);
          return cleaned;
        }
      }
    }
  }
  
  // #region agent log
  if (typeof window !== 'undefined' && window.location) {
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'extract.js:extractExplanationAfterGrading:notFound',
        message: 'explanation not found',
        data: {
          satRootTextSlice: (satRoot.innerText || '').substring(0, 400),
          gradedBoxesCount: gradedBoxes.length
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'initial',
        hypothesisId: 'C'
      })
    }).catch(() => {});
  }
  // #endregion
  
  console.warn('[SAT PDF Exporter] Explanation을 찾을 수 없습니다');
  return '';
}

// 텍스트 추출 헬퍼 함수
export function extractText(container, ...selectors) {
  for (const selector of selectors) {
    const element = container.querySelector(selector);
    if (element) {
      return element.innerText || element.textContent || '';
    }
  }
  return '';
}

// 정답 추출 (레거시 함수 - 호환성 유지)
export function extractAnswer(container) {
  // 정답 표시 요소 찾기
  const answerSelectors = [
    '[class*="answer"]',
    '[class*="correct"]',
    '[class*="solution"]',
    'strong',
    'b'
  ];

  for (const selector of answerSelectors) {
    const elements = container.querySelectorAll(selector);
    for (const el of elements) {
      const text = (el.innerText || el.textContent || '').trim();
      // 정답 패턴 확인 (예: "Answer: A", "정답: B", "Correct Answer: C")
      if (/answer|정답|correct/i.test(text) && /[A-D]/.test(text)) {
        const match = text.match(/([A-D])/);
        if (match) return match[1];
      }
    }
  }

  return '';
}

// 해설 추출
export function extractExplanation(container) {
  const explanationSelectors = [
    '[class*="explanation"]',
    '[class*="solution"]',
    '[class*="hint"]',
    '[class*="reasoning"]'
  ];

  for (const selector of explanationSelectors) {
    const element = container.querySelector(selector);
    if (element) {
      return element.innerText || element.textContent || '';
    }
  }

  return '';
}

// 채점 상태 확인 (초록 박스가 이미 표시되어 있는지)
export function checkIfGraded() {
  // 초록 박스 찾기 (정답 표시)
  const greenBoxes = document.querySelectorAll('[class*="correct"], [class*="정답"], [style*="green"], [style*="#4caf50"]');
  for (const box of greenBoxes) {
    const text = (box.innerText || box.textContent || '').trim();
    // "정답" 텍스트와 A-D 패턴이 함께 있으면 채점된 상태
    if ((text.includes('정답') || text.includes('Correct')) && /[A-D][\.\)]/.test(text)) {
      return true;
    }
  }
  
  // 빨간 박스(오답)가 있으면 채점된 상태
  const redBoxes = document.querySelectorAll('[class*="incorrect"], [class*="오답"], [style*="red"], [style*="#f44336"]');
  for (const box of redBoxes) {
    const text = (box.innerText || box.textContent || '').trim();
    if (text.includes('오답') || text.includes('Incorrect')) {
      return true;
    }
  }
  
  return false;
}

// 텍스트 패턴 기반 추출 (대체 방법)
export function extractByTextPattern(sectionType) {
  const problems = [];
  const bodyText = document.body.innerText || '';
  
  // 문제 번호 패턴 찾기 (예: "1.", "Question 1", "문제 1")
  const problemPattern = /(?:^|\n)\s*(\d+)\.\s*(.+?)(?=\n\s*\d+\.|$)/gs;
  const matches = [...bodyText.matchAll(problemPattern)];
  
  matches.forEach((match, index) => {
    problems.push({
      number: parseInt(match[1]) || index + 1,
      type: sectionType,
      stem: match[2].trim(),
      choices: [],
      answer: '',
      explanation: ''
    });
  });

  return problems;
}

// Reading 섹션 데이터 추출 (실제 화면에서 보이는 텍스트 직접 추출)
export function extractReadingSection() {
  const problems = [];
  
  console.log('[SAT PDF Exporter] Reading 섹션 추출 시작');
  
  // 현재 화면에 보이는 문제 번호 확인
  const problemNum = getCurrentProblemNumber();
  console.log(`[SAT PDF Exporter] 현재 문제 번호: ${problemNum}`);
  
  // 문제 본문 찾기 - 여러 방법 시도
  let problemText = '';
  let passageText = '';
  
  // 방법 1: 문제 번호로 시작하는 텍스트 찾기 (예: "1. Text 1", "1.")
  const allTextElements = document.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
  for (const el of allTextElements) {
    const text = (el.innerText || el.textContent || '').trim();
    // 문제 번호 패턴 찾기
    if (text.match(new RegExp(`^${problemNum}\\.`)) || text.match(new RegExp(`^${problemNum}\\s+Text`))) {
      // 문제 본문 추출
      const parent = el.closest('[class*="container"], [class*="content"], [class*="question"], main, article');
      if (parent) {
        const fullText = (parent.innerText || parent.textContent || '').trim();
        // "Text 1", "Text 2" 같은 지문 찾기
        const textMatch = fullText.match(/Text\s+\d+[^\n]*/g);
        if (textMatch) {
          passageText = textMatch.join('\n\n');
        }
        // 문제 본문 추출 (선택지 전까지)
        const questionMatch = fullText.match(new RegExp(`${problemNum}\\.\\s*([^A-D]+?)(?=[A-D]\\.|$)`, 's'));
        if (questionMatch) {
          problemText = questionMatch[1].trim();
        } else {
          problemText = fullText.split(/[A-D]\./)[0].trim();
        }
        break;
      }
    }
  }
  
  // 방법 2: 전체 body 텍스트에서 추출
  if (!problemText) {
    const bodyText = document.body.innerText || document.body.textContent;
    // 문제 번호로 시작하는 부분 찾기
    const problemMatch = bodyText.match(new RegExp(`${problemNum}\\.\\s*([\\s\\S]+?)(?=\\d+\\.|$)`, 'i'));
    if (problemMatch) {
      problemText = problemMatch[1].trim();
      // 선택지 전까지 자르기
      problemText = problemText.split(/[A-D][\.\)]\s*/)[0].trim();
    }
  }
  
  // 선택지 추출
  const choices = extractChoices(document.body);
  
  // 정답 및 해설 추출
  const answer = extractAnswer(document.body);
  const explanation = extractExplanation(document.body);
  
  // 문제가 있으면 추가
  if (problemText) {
    problems.push({
      number: problemNum,
      type: 'reading',
      stem: problemText,
      passage: passageText,
      choices: choices,
      answer: answer,
      explanation: explanation
    });
    console.log(`[SAT PDF Exporter] Reading 문제 ${problemNum} 추출 완료:`, {
      stem: problemText.substring(0, 50) + '...',
      passage: passageText ? passageText.substring(0, 50) + '...' : '없음',
      choicesCount: choices.length
    });
  } else {
    console.warn(`[SAT PDF Exporter] Reading 문제 ${problemNum} 추출 실패 - 텍스트를 찾을 수 없습니다`);
  }

  return problems;
}

// Math 섹션 데이터 추출 (실제 화면에서 보이는 텍스트 직접 추출)
export function extractMathSection() {
  const problems = [];
  
  console.log('[SAT PDF Exporter] Math 섹션 추출 시작');
  
  // 현재 화면에 보이는 문제 번호 확인
  const problemNum = getCurrentProblemNumber();
  console.log(`[SAT PDF Exporter] 현재 문제 번호: ${problemNum}`);
  
  // 문제 본문 찾기
  let problemText = '';
  
  // 방법 1: 문제 번호로 시작하는 텍스트 찾기
  const allTextElements = document.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
  for (const el of allTextElements) {
    const text = (el.innerText || el.textContent || '').trim();
    if (text.match(new RegExp(`^${problemNum}\\.`))) {
      const parent = el.closest('[class*="container"], [class*="content"], [class*="question"], main, article');
      if (parent) {
        const fullText = (parent.innerText || parent.textContent || '').trim();
        const questionMatch = fullText.match(new RegExp(`${problemNum}\\.\\s*([^A-D]+?)(?=[A-D]\\.|$)`, 's'));
        if (questionMatch) {
          problemText = questionMatch[1].trim();
        } else {
          problemText = fullText.split(/[A-D]\./)[0].trim();
        }
        break;
      }
    }
  }
  
  // 방법 2: 전체 body 텍스트에서 추출
  if (!problemText) {
    const bodyText = document.body.innerText || document.body.textContent;
    const problemMatch = bodyText.match(new RegExp(`${problemNum}\\.\\s*([\\s\\S]+?)(?=\\d+\\.|$)`, 'i'));
    if (problemMatch) {
      problemText = problemMatch[1].trim();
      problemText = problemText.split(/[A-D][\.\)]\s*/)[0].trim();
    }
  }
  
  // 선택지 추출
  const choices = extractChoices(document.body);
  
  // Grid-in 문제 확인
  const isGridIn = choices.length === 0;
  
  // 정답 및 해설 추출
  const answer = extractAnswer(document.body);
  const explanation = extractExplanation(document.body);
  
  // 문제가 있으면 추가
  if (problemText) {
    const problem = {
      number: problemNum,
      type: 'math',
      stem: problemText,
      choices: choices,
      answer: answer,
      explanation: explanation,
      isGridIn: isGridIn
    };
    
    if (isGridIn) {
      const gridInAnswer = extractText(document.body, '[class*="answer"], [class*="grid"]');
      if (gridInAnswer) {
        problem.gridInAnswer = gridInAnswer;
      }
    }
    
    problems.push(problem);
    console.log(`[SAT PDF Exporter] Math 문제 ${problemNum} 추출 완료:`, {
      stem: problemText.substring(0, 50) + '...',
      choicesCount: choices.length,
      isGridIn: isGridIn
    });
  } else {
    console.warn(`[SAT PDF Exporter] Math 문제 ${problemNum} 추출 실패 - 텍스트를 찾을 수 없습니다`);
  }

  return problems;
}

// SAT 문제 데이터 추출 함수 (현재 화면만) - 수정: 섹션 감지 후 분기
export function extractSATData() {
  const data = {
    reading: [],
    math: [],
    timestamp: new Date().toISOString()
  };

  try {
    // 현재 섹션 감지
    const currentSection = detectCurrentSection();
    
    if (currentSection === 'reading') {
      // Reading 섹션만 추출
      console.log('[SAT PDF Exporter] Reading 섹션으로 감지됨 - Reading만 추출');
      const readingSection = extractReadingSection();
      if (readingSection.length > 0) {
        data.reading = readingSection;
      }
    } else if (currentSection === 'math') {
      // Math 섹션만 추출
      console.log('[SAT PDF Exporter] Math 섹션으로 감지됨 - Math만 추출');
      const mathSection = extractMathSection();
      if (mathSection.length > 0) {
        data.math = mathSection;
      }
    } else {
      // 섹션 감지 실패 시 양쪽 모두 시도 (하지만 경고 로그)
      console.warn('[SAT PDF Exporter] 섹션 감지 실패 - Reading과 Math 모두 시도 (비권장)');
      const readingSection = extractReadingSection();
      if (readingSection.length > 0) {
        data.reading = readingSection;
      }
      const mathSection = extractMathSection();
      if (mathSection.length > 0) {
        data.math = mathSection;
      }
    }

    return data;
  } catch (error) {
    console.error('[SAT PDF Exporter] 데이터 추출 중 오류:', error);
    throw error;
  }
}

// 정답 UI(초록 박스)가 나타날 때까지 대기 및 정답 추출 (next 버튼 활성화도 확인) - DEPRECATED
export async function waitForAnswerUIWithNextButtonCheck() {
  let attempts = 0;
  const maxAttempts = 40; // 최대 8초 대기
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // 초록 박스 찾기
    const greenBoxes = document.querySelectorAll('*');
    for (const box of greenBoxes) {
      if (!box.offsetParent) continue;
      
      const text = (box.innerText || box.textContent || '').trim();
      const style = window.getComputedStyle(box);
      const bgColor = style.backgroundColor;
      const borderColor = style.borderColor;
      
      // 초록색 박스 확인 (색상 또는 텍스트로)
      const isGreen = bgColor.includes('rgb(76, 175, 80)') || 
                     bgColor.includes('#4caf50') ||
                     borderColor.includes('rgb(76, 175, 80)') ||
                     borderColor.includes('#4caf50') ||
                     (box.className || '').toLowerCase().includes('correct') ||
                     (box.className || '').toLowerCase().includes('정답');
      
      // "정답" 텍스트와 A-D 패턴이 함께 있으면 정답 추출
      if (isGreen && (text.includes('정답') || text.includes('Correct') || text.includes('정답입니다')) && /[A-D][\.\)]/.test(text)) {
        const answerMatch = text.match(/([A-D])[\.\)]/);
        if (answerMatch) {
          const answer = answerMatch[1];
          
          // 해설 추출 시도
          let explanation = '';
          const explanationElement = box.closest('[class*="container"], [class*="content"], [class*="explanation"]');
          if (explanationElement) {
            const fullText = (explanationElement.innerText || explanationElement.textContent || '').trim();
            // 해설 부분 추출 (정답 이후 텍스트)
            const explanationMatch = fullText.split(new RegExp(`${answer}[\.\)]`))[1];
            if (explanationMatch) {
              explanation = explanationMatch.split(/[A-D][\.\)]/)[0].trim();
            }
          }
          
          // next 버튼이 활성화되었는지 확인 (채점 완료 신호)
          const nextButton = findNavigationButton('next', '다음', 'next');
          if (nextButton && !nextButton.disabled) {
            console.log(`[SAT PDF Exporter] 정답 UI 발견: ${answer}, next 버튼 활성화 확인`);
            return { answer: answer, explanation: explanation };
          } else if (nextButton && nextButton.disabled) {
            // next 버튼이 비활성화되어 있으면 활성화될 때까지 대기
            console.log('[SAT PDF Exporter] 정답은 발견했지만 next 버튼이 비활성화됨. 활성화 대기...');
            let buttonWaitAttempts = 0;
            while (buttonWaitAttempts < 10 && nextButton.disabled) {
              await new Promise(resolve => setTimeout(resolve, 200));
              buttonWaitAttempts++;
            }
            if (!nextButton.disabled) {
              console.log(`[SAT PDF Exporter] next 버튼 활성화 확인. 정답: ${answer}`);
              return { answer: answer, explanation: explanation };
            }
          }
          
          // next 버튼 확인 없이도 정답은 반환
          console.log(`[SAT PDF Exporter] 정답 UI 발견: ${answer} (next 버튼 확인 실패)`);
          return { answer: answer, explanation: explanation };
        }
      }
    }
    
    // "정답" 또는 "오답" 텍스트가 나타났는지 확인 (초록 박스 없어도)
    const allText = document.body.innerText || '';
    if (allText.includes('정답') || allText.includes('Correct') || allText.includes('정답입니다')) {
      const answerMatch = allText.match(/([A-D])[\.\)]\s*[^\n]*(?:정답|Correct)/);
      if (answerMatch) {
        const answer = answerMatch[1];
        console.log(`[SAT PDF Exporter] 정답 텍스트 발견: ${answer}`);
        return { answer: answer, explanation: '' };
      }
    }
    
    attempts++;
  }
  
  console.warn('[SAT PDF Exporter] 정답 UI를 찾을 수 없습니다 (타임아웃)');
  return null;
}

// 이미 채점된 상태에서 정답 추출
export function extractAnswerFromGradedUI() {
  // 초록 박스에서 정답 추출
  const greenBoxes = document.querySelectorAll('*');
  for (const box of greenBoxes) {
    if (!box.offsetParent) continue;
    
    const text = (box.innerText || box.textContent || '').trim();
    const style = window.getComputedStyle(box);
    const bgColor = style.backgroundColor;
    
    const isGreen = bgColor.includes('rgb(76, 175, 80)') || 
                   bgColor.includes('#4caf50') ||
                   (box.className || '').toLowerCase().includes('correct') ||
                   (box.className || '').toLowerCase().includes('정답');
    
    if (isGreen && (text.includes('정답') || text.includes('Correct')) && /[A-D][\.\)]/.test(text)) {
      const answerMatch = text.match(/([A-D])[\.\)]/);
      if (answerMatch) {
        return { answer: answerMatch[1], explanation: '' };
      }
    }
  }
  
  return null;
}
