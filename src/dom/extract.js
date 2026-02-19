// Extracted DOM extraction utilities from content.js
// NOTE: Logic must remain identical to original implementation.

import { deepQuerySelectorAll, isElementVisible } from './deepQuery.js';
import { findSatRoot, readProgressNumber } from './query.js';

// ============================================================================
// 텍스트 정제: Gemini UI 아이콘/깨진 유니코드 제거 (모든 문제·Reading/Math 공통)
// ============================================================================
/** Æ$20, È 20, È ²õ, È 2õÇ...²Èzä! 등 — 보기/해설 옆 아이콘 폰트가 innerText에 섞여 나오는 패턴 */
const GARBAGE_UNICODE_RE = /\s*[ÆÈ][\s\$²³õö0-9Çäz!]{0,35}\s*/g;

export function stripGarbageUnicode(str) {
  if (str == null || typeof str !== 'string') return '';
  return str.replace(GARBAGE_UNICODE_RE, ' ').replace(/\s{2,}/g, ' ').trim();
}

// ============================================================================
// LaTeX → PDF/텍스트용 읽기 가능 문자열 (수식 깨짐 방지)
// ============================================================================
function latexToReadable(latex) {
  if (!latex || typeof latex !== 'string') return '';
  return latex
    .replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, '($1)/($2)')
    .replace(/\\sqrt\s*\{\s*([^}]+)\s*\}/g, '√($1)')
    .replace(/\\sqrt\s*([^\s\{\\]+)/g, '√$1')
    .replace(/\\\^\s*\{\s*([^}]+)\s*\}/g, '^($1)')
    .replace(/\\\^\s*\(/g, '^(')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\pm/g, '±')
    .replace(/\\text\s*\{\s*([^}]*)\s*\}/g, '$1')
    .replace(/\\left|\\right/g, '')
    .replace(/\\\(|\\\)|\\\[|\\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 노드 트리에서 텍스트 + [data-math] LaTeX를 순서대로 읽기 가능 문자열로 결합 (수식 줄바꿈/깨짐 방지) */
function getTextWithMathFromNode(container) {
  if (!container || !container.childNodes) return '';
  const parts = [];
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || '').trim();
      if (t) parts.push(t);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node;
    const dataMath = el.getAttribute && el.getAttribute('data-math');
    if (dataMath) {
      const readable = latexToReadable(dataMath);
      if (readable) parts.push(readable);
      return;
    }
    for (let i = 0; i < el.childNodes.length; i++) walk(el.childNodes[i]);
  }
  walk(container);
  return parts.join(' ').replace(/\s{2,}/g, ' ').trim();
}

// ============================================================================
// Figure 추출 유틸리티 함수들
// ============================================================================

/**
 * Blob을 DataURL로 변환
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * <img> 요소를 DataURL로 변환
 * @param {HTMLImageElement} img
 * @returns {Promise<{dataUrl: string, width: number, height: number} | null>}
 */
async function extractImageFromImg(img) {
  try {
    const src = img.currentSrc || img.src;
    if (!src) return null;

    // data: URL이면 그대로 사용
    if (src.startsWith('data:')) {
      const rect = img.getBoundingClientRect();
      return {
        dataUrl: src,
        width: rect.width || img.naturalWidth || 100,
        height: rect.height || img.naturalHeight || 100
      };
    }

    // blob: 또는 https: URL이면 fetch로 변환
    if (src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) {
      // CORS 설정 시도
      if (img.tagName === 'IMG') {
        img.crossOrigin = 'anonymous';
      }

      try {
        const response = await fetch(src);
        if (!response.ok) {
          console.warn(`[FIGURE] 이미지 fetch 실패: ${src} (status: ${response.status})`);
          return null;
        }
        const blob = await response.blob();
        const dataUrl = await blobToDataURL(blob);
        const rect = img.getBoundingClientRect();
        return {
          dataUrl,
          width: rect.width || img.naturalWidth || 100,
          height: rect.height || img.naturalHeight || 100
        };
      } catch (fetchError) {
        console.warn(`[FIGURE] 이미지 fetch 오류: ${src}`, fetchError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.warn('[FIGURE] extractImageFromImg 오류:', error);
    return null;
  }
}

/**
 * <canvas> 요소를 DataURL로 변환
 * @param {HTMLCanvasElement} canvas
 * @returns {{dataUrl: string, width: number, height: number} | null}
 */
function extractImageFromCanvas(canvas) {
  try {
    const dataUrl = canvas.toDataURL('image/png');
    return {
      dataUrl,
      width: canvas.width || canvas.getBoundingClientRect().width,
      height: canvas.height || canvas.getBoundingClientRect().height
    };
  } catch (error) {
    // tainted canvas 에러 등
    console.warn('[FIGURE] extractImageFromCanvas 오류 (tainted canvas 가능):', error);
    return null;
  }
}

/**
 * <svg> 요소를 DataURL로 변환
 * @param {SVGElement} svg
 * @returns {Promise<{dataUrl: string, width: number, height: number} | null>}
 */
async function extractImageFromSVG(svg) {
  try {
    const rect = svg.getBoundingClientRect();
    const width = rect.width || 100;
    const height = rect.height || 100;

    // SVG outerHTML을 직렬화
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // 이미지로 로드 후 canvas에 그리기
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(svgUrl);
          resolve({ dataUrl, width, height });
        } catch (error) {
          console.warn('[FIGURE] SVG canvas draw 오류:', error);
          URL.revokeObjectURL(svgUrl);
          resolve(null);
        }
      };
      img.onerror = () => {
        console.warn('[FIGURE] SVG 이미지 로드 실패');
        URL.revokeObjectURL(svgUrl);
        resolve(null);
      };
      img.src = svgUrl;
    });
  } catch (error) {
    console.warn('[FIGURE] extractImageFromSVG 오류:', error);
    return null;
  }
}

/**
 * background-image CSS 속성에서 이미지 추출
 * @param {HTMLElement} el
 * @returns {Promise<{dataUrl: string, width: number, height: number} | null>}
 */
async function extractImageFromBackground(el) {
  try {
    const style = window.getComputedStyle(el);
    const bgImage = style.backgroundImage;
    if (!bgImage || bgImage === 'none') return null;

    // url("...") 또는 url(...) 패턴 파싱
    const match = bgImage.match(/url\(["']?([^"']+)["']?\)/);
    if (!match) return null;

    const url = match[1];
    if (url.startsWith('data:')) {
      const rect = el.getBoundingClientRect();
      return {
        dataUrl: url,
        width: rect.width,
        height: rect.height
      };
    }

    // http/https/blob URL이면 fetch
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
      try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const blob = await response.blob();
        const dataUrl = await blobToDataURL(blob);
        const rect = el.getBoundingClientRect();
        return {
          dataUrl,
          width: rect.width,
          height: rect.height
        };
      } catch (error) {
        console.warn('[FIGURE] background-image fetch 오류:', error);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.warn('[FIGURE] extractImageFromBackground 오류:', error);
    return null;
  }
}

/**
 * html2canvas로 DOM 요소를 이미지로 변환 (최종 폴백)
 * @param {HTMLElement} el
 * @returns {Promise<{dataUrl: string, width: number, height: number} | null>}
 */
async function extractImageWithHtml2Canvas(el) {
  try {
    // html2canvas가 로드되어 있는지 확인
    let html2canvas = null;
    if (window.html2canvas) {
      html2canvas = window.html2canvas;
    } else if (window.jspdf && window.jspdf.html2canvas) {
      html2canvas = window.jspdf.html2canvas;
    } else {
      console.warn('[FIGURE] html2canvas를 찾을 수 없습니다');
      return null;
    }

    const canvas = await html2canvas(el, {
      backgroundColor: '#fff',
      scale: 2, // 해상도 향상
      useCORS: true,
      allowTaint: false,
      logging: false
    });

    const dataUrl = canvas.toDataURL('image/png');
    return {
      dataUrl,
      width: canvas.width,
      height: canvas.height
    };
  } catch (error) {
    console.warn('[FIGURE] html2canvas 오류:', error);
    return null;
  }
}

/**
 * figure 후보 요소 찾기
 * @param {HTMLElement} satRoot
 * @returns {Array<HTMLElement>}
 */
function findFigureCandidates(satRoot) {
  const candidates = [];
  const MIN_SIZE = 60; // 최소 크기 (px) - 작은 차트/그래프도 포함

  // 우선순위 1: figure, .figure, data-testid, class에 figure/image 포함 (Shadow DOM 포함)
  const figureSelectors = [
    'figure',
    '.figure',
    '[data-testid*="figure"]',
    '[data-testid*="image"]',
    '[data-testid*="graph"]',
    '[data-testid*="chart"]',
    '[class*="figure"]',
    '[class*="image"]',
    '[class*="illustration"]',
    '[class*="diagram"]',
    '[class*="media"]'
  ];

  for (const selector of figureSelectors) {
    const elements = deepQuerySelectorAll(selector, satRoot);
    for (const el of elements) {
      if (!isElementVisible(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width >= MIN_SIZE && rect.height >= MIN_SIZE) {
        if (!candidates.find(c => c.element === el)) {
          candidates.push({ element: el, type: 'container', selector });
        }
      }
    }
  }

  // 우선순위 2: img, svg, canvas (직접 이미지 요소, Shadow DOM 포함)
  const imageSelectors = ['img', 'svg', 'canvas'];
  for (const selector of imageSelectors) {
    const elements = deepQuerySelectorAll(selector, satRoot);
    for (const el of elements) {
      if (!isElementVisible(el)) continue;
      const rect = el.getBoundingClientRect();
      // 너무 작은 요소 제외
      if (rect.width >= MIN_SIZE && rect.height >= MIN_SIZE) {
        // 선택지 영역이나 UI 버튼이 아닌지 확인
        const parent = el.closest('[role="radio"], button, [class*="button"], [class*="icon"]');
        if (parent && (parent.getBoundingClientRect().width < 100 || parent.getBoundingClientRect().height < 100)) {
          continue; // 작은 버튼/아이콘 내부 이미지는 제외
        }

        if (!candidates.find(c => c.element === el)) {
          candidates.push({ element: el, type: selector, selector });
        }
      }
    }
  }

  // 디버그: 후보별 정보 출력
  console.log(`[FIGURE] figure 후보 발견: ${candidates.length}개`);
  candidates.forEach((candidate, idx) => {
    const rect = candidate.element.getBoundingClientRect();
    const tagName = candidate.element.tagName;
    const className = candidate.element.className ? candidate.element.className.substring(0, 50) : '';
    const src = candidate.element.src || candidate.element.getAttribute('src') || '';
    console.log(`[FIGURE] 후보 ${idx + 1}: tagName=${tagName}, type=${candidate.type}, rect=(${rect.width.toFixed(0)}x${rect.height.toFixed(0)}), src=${src.substring(0, 50)}, className=${className}`);
  });

  return candidates;
}

/**
 * figure 요소를 이미지로 변환
 * @param {HTMLElement} element
 * @returns {Promise<{dataUrl: string, width: number, height: number} | null>}
 */
async function convertFigureToImage(element) {
  const tagName = element.tagName.toLowerCase();

  // A. <img> 요소
  if (tagName === 'img') {
    const result = await extractImageFromImg(element);
    if (result) {
      console.log(`[FIGURE] <img> 추출 성공: ${result.width}x${result.height}`);
      return result;
    }
    // fetch 실패(CORS 등) 시 아래 E 단계 html2canvas 폴백으로 진행
  }

  // B. <canvas> 요소
  if (tagName === 'canvas') {
    const result = extractImageFromCanvas(element);
    if (result) {
      console.log(`[FIGURE] <canvas> 추출 성공: ${result.width}x${result.height}`);
      return result;
    }
  }

  // C. <svg> 요소
  if (tagName === 'svg') {
    const result = await extractImageFromSVG(element);
    if (result) {
      console.log(`[FIGURE] <svg> 추출 성공: ${result.width}x${result.height}`);
      return result;
    }
  }

  // D. background-image 확인
  const bgResult = await extractImageFromBackground(element);
  if (bgResult) {
    console.log(`[FIGURE] background-image 추출 성공: ${bgResult.width}x${bgResult.height}`);
    return bgResult;
  }

  // E. html2canvas 폴백 (복합 DOM)
  console.log(`[FIGURE] html2canvas 폴백 시도: ${tagName}`);
  const html2canvasResult = await extractImageWithHtml2Canvas(element);
  if (html2canvasResult) {
    console.log(`[FIGURE] html2canvas 추출 성공: ${html2canvasResult.width}x${html2canvasResult.height}`);
    return html2canvasResult;
  }

  return null;
}

/**
 * 문제에서 figure 이미지 추출
 * @param {HTMLElement} satRoot
 * @returns {Promise<Array<{dataUrl: string, width: number, height: number}>>}
 */
export async function extractFigures(satRoot) {
  const figures = [];
  let html2canvasCount = 0;

  // #region agent log - DEBUG STEP 2: extractFigures 진입
  console.log(`[DEBUG STEP 2] extractFigures 진입`);
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:entry',message:'DEBUG STEP 2: extractFigures 진입',data:{satRootFound:!!satRoot},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  try {
    // #region agent log - DEBUG STEP 2: 후보 탐색 전 기본 셀렉터 검증
    const imgCount = satRoot.querySelectorAll('img').length;
    const canvasCount = satRoot.querySelectorAll('canvas').length;
    const svgCount = satRoot.querySelectorAll('svg').length;
    const bgImageElements = Array.from(satRoot.querySelectorAll('*')).filter(el => {
      try {
        const style = window.getComputedStyle(el);
        return style.backgroundImage && style.backgroundImage !== 'none';
      } catch { return false; }
    }).length;
    console.log(`[DEBUG STEP 2] 기본 셀렉터 결과: img=${imgCount}, canvas=${canvasCount}, svg=${svgCount}, background-image=${bgImageElements}`);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:beforeFindCandidates',message:'DEBUG STEP 2: 후보 탐색 전 기본 셀렉터 검증',data:{imgCount,canvasCount,svgCount,bgImageElements},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    const candidates = findFigureCandidates(satRoot);

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:afterFindCandidates',message:'math image extract: candidates count',data:{imgCount,canvasCount,svgCount,candidatesCount:candidates.length},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    // #region agent log - DEBUG STEP 2: 후보 탐색 결과
    console.log(`[DEBUG STEP 2] findFigureCandidates 결과: ${candidates.length}개 후보`);
    const candidateDetails = candidates.map((c, idx) => {
      const rect = c.element.getBoundingClientRect();
      const style = window.getComputedStyle(c.element);
      return {
        idx: idx + 1,
        tagName: c.element.tagName,
        type: c.type,
        width: rect.width,
        height: rect.height,
        minSizeFilter: rect.width >= 80 && rect.height >= 80,
        backgroundImage: style.backgroundImage && style.backgroundImage !== 'none' ? style.backgroundImage.substring(0, 100) : null,
        src: c.element.src || c.element.getAttribute('src') || ''
      };
    });
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:afterFindCandidates',message:'DEBUG STEP 2: 후보 탐색 결과',data:{candidatesCount:candidates.length,candidateDetails},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    for (const candidate of candidates) {
      try {
        // #region agent log - DEBUG STEP 2: 각 후보 변환 시도
        const rect = candidate.element.getBoundingClientRect();
        console.log(`[DEBUG STEP 2] 후보 변환 시도: ${candidate.element.tagName}, ${rect.width}x${rect.height}`);
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:beforeConvert',message:'DEBUG STEP 2: 후보 변환 시도',data:{tagName:candidate.element.tagName,width:rect.width,height:rect.height,type:candidate.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        const imageData = await convertFigureToImage(candidate.element);
        
        // #region agent log - DEBUG STEP 2: 각 후보 변환 결과
        console.log(`[DEBUG STEP 2] 후보 변환 결과: ${imageData ? '성공' : '실패'}`);
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:afterConvert',message:'DEBUG STEP 2: 후보 변환 결과',data:{tagName:candidate.element.tagName,success:!!imageData,imageData:imageData?{w:imageData.width,h:imageData.height,hasDataUrl:!!imageData.dataUrl}:null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        if (imageData) {
          figures.push(imageData);
          // html2canvas 사용 여부 카운트
          if (candidate.type === 'container' || candidate.type === 'div' || candidate.type === 'span') {
            html2canvasCount++;
          }
        }
      } catch (error) {
        console.warn(`[FIGURE] figure 변환 실패 (계속 진행):`, error);
        // #region agent log - DEBUG STEP 2: 변환 오류
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:convertError',message:'DEBUG STEP 2: 후보 변환 오류',data:{tagName:candidate.element.tagName,errorMessage:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        // 실패해도 계속 진행
      }
    }

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:complete',message:'math image extract: figures result',data:{figuresLength:figures.length,html2canvasCount,candidatesCount:candidates.length},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
    // #endregion
    console.log(`[DEBUG STEP 2] extractFigures 완료: ${figures.length}개 figure 추출`);

    console.log(`[FIGURE] 총 ${figures.length}개 figure 추출 완료 (html2canvas 사용: ${html2canvasCount}개)`);
  } catch (error) {
    console.warn('[FIGURE] extractFigures 전체 오류 (빈 배열 반환):', error);
    // #region agent log - DEBUG STEP 2: extractFigures 전체 오류
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractFigures:error',message:'DEBUG STEP 2: extractFigures 전체 오류',data:{errorMessage:error.message,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    // 전체 실패 시에도 빈 배열 반환 (플로우 중단 방지)
  }

  return figures;
}

// findSatRoot는 query.js로 이동됨 (순환 의존성 해결)
// Re-export for backward compatibility
export { findSatRoot } from './query.js';

/**
 * 선지가 실제로 선택된 상태인지 DOM으로 확인 (클릭 성공 검증용)
 * 리딩 이미지 문제에서 도표/갤러리 내 selected·checked는 제외하고, 실제 선지(radio/option)만 검사
 * @returns {boolean}
 */
export function hasAnyChoiceSelected() {
  const satRoot = findSatRoot();
  if (!satRoot) return false;
  const candidates = satRoot.querySelectorAll(
    '[role="radio"][aria-checked="true"], [role="option"][aria-selected="true"]'
  );
  for (const el of candidates) {
    if (el.closest('figure, [class*="figure"], [class*="image"], [data-testid*="figure"], [data-testid*="image"]')) continue;
    return true;
  }
  return false;
}

/**
 * Module Start Screen 판별 (모듈 2 시작 전 전환 화면)
 * - Progress UI 없음, 선택지 없음
 * - "다음: Reading and Writing 모듈 2" 또는 "모듈 2 시작" 버튼
 * @returns {boolean}
 */
export function isModuleStartScreen() {
  const searchRoot = document.body;
  const text = (searchRoot.innerText || searchRoot.textContent || '').trim();
  const textLower = text.toLowerCase();

  // (a) Visible button with text matching ["모듈 2 시작", "Module 2", "Start Module", "시작"]
  const btnLabels = ['모듈 2 시작', 'Module 2', 'Start Module', '시작'];
  const buttons = searchRoot.querySelectorAll('button, [role="button"], a, .mat-mdc-button, .mdc-button');
  const hasModule2StartButton = Array.from(buttons).some(btn => {
    const rect = btn.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    if (btn.disabled) return false;
    const btnText = (btn.innerText || btn.textContent || '').trim();
    return btnLabels.some(label => btnText.includes(label) || (btnText.includes('모듈 2') && btnText.includes('시작')));
  });

  // (b) Phrase "다음: Reading and Writing 모듈 2"
  const hasNextModule2Phrase = text.includes('다음: Reading and Writing 모듈 2') ||
    textLower.includes('reading and writing') && textLower.includes('모듈 2');

  // (c) Progress absent AND choices absent (required - must NOT be question screen)
  const progress = getProgressState();
  const hasProgress = progress !== null && /\d+\s*\/\s*27/.test(progress);
  const hasChoices = !!(searchRoot.querySelector('[role="radio"]') || searchRoot.querySelector('button[aria-label*="Choice"]'));
  const noProgressNoChoices = !hasProgress && !hasChoices;

  // Must NOT be question screen; must match (a) or (b)
  const result = noProgressNoChoices &&
    (hasModule2StartButton || hasNextModule2Phrase);

  if (result) {
    console.log('[SAT PDF Exporter] Module Start Screen 감지됨:', { hasModule2StartButton, hasNextModule2Phrase });
  }
  return result;
}

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
  const hasProblemNumber = problemNum > 0 && (problemNum <= 27 || problemNum <= 22);
  
  // 방법 3: Progress 표시 확인 (Reading 27, Math 22)
  const progress = getProgressState();
  const hasProgress = progress !== null && (progress.includes('/27') || progress.includes('/22'));
  
  // 방법 4: 문제 텍스트 패턴 확인
  const bodyText = (document.body.innerText || '').toLowerCase();
  const hasQuestionPattern = bodyText.includes('which choice') || 
                             bodyText.includes('what') ||
                             bodyText.includes('based on') ||
                             bodyText.includes('문제') ||
                             /^\d+\./.test(bodyText);
  
  // 방법 5: Math 주관식 - 입력창이 있으면 문제 화면
  const hasSubjectiveInput = !!document.querySelector('input[placeholder*="입력"], input[placeholder*="여기에"], input[placeholder*="Enter"], textarea[placeholder*="입력"]');
  
  const result = hasChoices || (hasProblemNumber && hasProgress) || hasQuestionPattern || hasSubjectiveInput;
  
  console.log(`[SAT PDF Exporter] 문제 화면 판별: choices=${hasChoices}, problemNum=${problemNum}, progress=${progress}, pattern=${hasQuestionPattern}, subjectiveInput=${hasSubjectiveInput} → ${result}`);
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:isQuestionScreen',message:'isQuestionScreen result',data:{hasChoices,problemNum,hasProblemNumber,progress,hasProgress,hasQuestionPattern,result,bodyTextPreview:bodyText.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
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

// 스크롤 가능한 부모 찾기 (buttons.js 로직과 동일)
function getScrollableParent(el) {
  let p = el && el.parentElement;
  while (p) {
    try {
      const style = window.getComputedStyle(p);
      if (/(auto|scroll|overlay)/.test(style.overflowY || '') && p.scrollHeight > p.clientHeight) return p;
    } catch (_) {}
    p = p.parentElement;
  }
  return null;
}

/** 문서 상태 로그용 (프레임/타이밍 원인 확정). */
export function describeDoc(doc) {
  if (!doc) return { href: undefined, title: undefined, ready: undefined, hasNext: false, hasActivitySet: false, hasScroll: false, hasChoices: false };
  return {
    href: doc.location?.href,
    title: doc.title,
    ready: doc.readyState,
    hasNext: !!doc.querySelector?.('[data-test-id="next-button"]'),
    hasActivitySet: !!doc.querySelector?.('activity-set'),
    hasScroll: !!doc.querySelector?.('.scroll-container'),
    hasChoices: !!doc.querySelector?.('mat-action-list.choices-container')
  };
}

/** next 탐색 통일: 현재 document만, 타이밍 대응 polling. 호출 시점마다 [NEXT-CTX]/[NEXT-FOUND]/[NEXT-NOTFOUND] 로그. */
export async function getNextButtonStrict(timeoutMs = 5000) {
  const t0 = Date.now();
  const isTop = typeof window !== 'undefined' && window.top === window;
  console.log('[NEXT-CTX]', { isTop, href: location.href, ready: document.readyState });

  while (Date.now() - t0 < timeoutMs) {
    const next = document.querySelector('[data-test-id="next-button"]');
    if (next) {
      console.log('[NEXT-FOUND]', { dt: Date.now() - t0, doc: describeDoc(document), html: next.outerHTML.slice(0, 140) });
      return next;
    }
    await new Promise(r => setTimeout(r, 100));
  }

  console.log('[NEXT-NOTFOUND]', { dt: Date.now() - t0, doc: describeDoc(document) });
  const err = Object.assign(new Error('NEXT_NOT_FOUND'), { code: 'NEXT_NOT_FOUND', doc: describeDoc(document) });
  throw err;
}

/** getNextButtonStrict + root 파생. next 탐색은 getNextButtonStrict()만 사용. */
export async function getRootFromNextButtonAsync(timeoutMs = 5000) {
  const next = await getNextButtonStrict(timeoutMs);
  const root = next.closest('activity-set') || next.closest('main') || (next.ownerDocument && next.ownerDocument.body) || document.body;
  return { root, next };
}

/** root만 필요하고 fallback 허용할 때 (PDF·extractCurrentProblem 등). next 없으면 findSatRoot. */
export async function getRootForExtract(timeoutMs = 2000) {
  try {
    const next = await getNextButtonStrict(timeoutMs);
    return next.closest('activity-set') || next.closest('main') || (next.ownerDocument && next.ownerDocument.body) || document.body;
  } catch (_) {
    return findSatRoot();
  }
}

/** root: document.querySelector('activity-set') 로 통일. (모든 query/choices/clickFirstChoice 동일 root) */
export function getSatRootForChoices() {
  return document.querySelector('activity-set') || document.body;
}

/** scroll 이벤트 dispatch + scrollend(있으면) + 200ms 대기 */
function dispatchScrollAndWait(scroller) {
  scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
  try { scroller.dispatchEvent(new Event('scrollend', { bubbles: true })); } catch (_) {}
  return new Promise(r => setTimeout(r, 200));
}

/** scrollScanForChoices용: .scroll-container 찾기 */
function getPreferredScrollContainer(container) {
  const el = (container && container.querySelector && container.querySelector('.scroll-container')) || document.querySelector('activity-set .scroll-container') || document.querySelector('.scroll-container');
  return el || null;
}

/** satRoot 내부 스크롤 가능 컨테이너 목록. .scroll-container 있으면 최우선, 그 다음 overflow+중앙/가시 정렬. */
function findScrollContainerCandidates(satRoot) {
  if (!satRoot || !satRoot.querySelectorAll) return [];
  const preferred = getPreferredScrollContainer(satRoot);
  if (preferred) {
    console.log('[CHOICE-VIS] scroll-container 사용 (.scroll-container)');
  }
  const scrollables = [];
  try {
    const candidates = satRoot.querySelectorAll('*');
    for (const el of candidates) {
      if (el === preferred) continue;
      try {
        const style = window.getComputedStyle(el);
        const overflowOk = /(auto|scroll|overlay)/.test(style.overflowY || '') || (el.classList && el.classList.contains('scroll-container'));
        if (!overflowOk) continue;
        const scrollableHeight = el.scrollHeight - el.clientHeight;
        if (scrollableHeight < 50) continue;
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportCenter = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
        const distanceFromCenter = Math.abs(centerY - viewportCenter);
        const visibilityScore = Math.max(0, rect.height - Math.max(0, -rect.top) - Math.max(0, rect.bottom - (window.innerHeight || 800)));
        scrollables.push({
          el,
          scrollableHeight,
          distanceFromCenter,
          visibilityScore: visibilityScore + (rect.height > 0 ? 1 : 0)
        });
      } catch (_) {}
    }
  } catch (_) {}
  scrollables.sort((a, b) => {
    if (a.distanceFromCenter !== b.distanceFromCenter) return a.distanceFromCenter - b.distanceFromCenter;
    if (b.visibilityScore !== a.visibilityScore) return b.visibilityScore - a.visibilityScore;
    return b.scrollableHeight - a.scrollableHeight;
  });
  const list = scrollables.map(s => s.el);
  if (preferred) return [preferred, ...list];
  return list;
}

function findScrollContainer(satRoot) {
  const list = findScrollContainerCandidates(satRoot);
  return list.length > 0 ? list[0] : null;
}

/** 선지 후보 — DOM 존재만 (가시성 필터 없음). SAT UI: mat-action-list.choices-container 내 button.mat-mdc-list-item.option */
function getChoiceCandidates(container) {
  const sels = [
    'mat-action-list.choices-container button.option',
    'mat-action-list button.mat-mdc-list-item.option',
    '.choices-container button.option',
    'button.mat-mdc-list-item.option',
    '[role="radio"]',
    'button[aria-label*="Choice"]',
    'mat-list-option',
    '[role="option"]',
    '.option',
    '[class*="option"]',
    '.mat-mdc-list-item'
  ];
  const set = new Set();
  for (const s of sels) {
    try {
      const nodes = deepQuerySelectorAll(s, container);
      nodes.forEach(el => { if (!el.disabled && container.contains(el)) set.add(el); });
    } catch (_) {}
  }
  return Array.from(set);
}

/** 앵커 없이 스크롤만으로 선지 4개 이상. Angular virtual scroll 대응: scroll 이벤트 dispatch + 200ms 대기. */
export async function scrollScanForChoices(container, maxSteps = 12) {
  const candidates = findScrollContainerCandidates(container);
  const count = () => { try { return extractChoices(container).length; } catch (_) { return 0; } };
  if (candidates.length === 0) {
    console.warn('[CHOICE-VIS] scrollScanForChoices: 스크롤 컨테이너 없음');
    return count() >= 4;
  }
  for (const sc of candidates) {
    let stepsWithoutMove = 0;
    for (let i = 0; i < maxSteps; i++) {
      const choicesCount = count();
      if (choicesCount >= 4) {
        console.log(`[CHOICE-VIS] scrollScanForChoices: 스크롤 성공, choices ${choicesCount}개`);
        return true;
      }
      const before = sc.scrollTop;
      const delta = Math.floor(sc.clientHeight * 0.8);
      sc.scrollTop = Math.min(before + delta, sc.scrollHeight);
      sc.dispatchEvent(new Event('scroll'));
      await new Promise(r => setTimeout(r, 200));
      const after = sc.scrollTop;
      if (after === before) {
        stepsWithoutMove++;
        if (stepsWithoutMove >= 2) {
          console.log('[CHOICE-VIS] scrollScanForChoices: scrollTop 변화 없음 → 다음 컨테이너 시도');
          break;
        }
      } else {
        stepsWithoutMove = 0;
      }
    }
  }
  const final = count();
  console.log(`[CHOICE-VIS] scrollScanForChoices: ${maxSteps}단계 후 choices ${final}개`);
  return final >= 4;
}

/** 정답 옵션 검색과 동일한 셀렉터로 옵션 후보 수집 (SAT UI: mat-action-list 내 button.option). 반환: { element, letter }[] */
function getOptionCandidatesForAnchor(container) {
  const optionSelectors = [
    'mat-action-list.choices-container button.option',
    'mat-action-list button.mat-mdc-list-item.option',
    '.choices-container button.option',
    'button.mat-mdc-list-item.option',
    '[role="radio"]',
    'button[aria-label*="Choice"]',
    '.option',
    '[class*="option"]',
    '.mat-mdc-list-item'
  ];
  const seen = new Set();
  const elements = [];
  for (const sel of optionSelectors) {
    try {
      const nodes = deepQuerySelectorAll(sel, container);
      for (const el of nodes) {
        if (seen.has(el)) continue;
        try {
          if (el.disabled) continue;
          if (!isElementVisible(el) || !container.contains(el)) continue;
          seen.add(el);
          elements.push(el);
        } catch (_) {}
      }
    } catch (_) {}
  }
  const result = [];
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const text = (el.innerText || el.textContent || '').trim();
    const ariaLabel = (el.getAttribute('aria-label') || '').trim();
    let letter = null;
    const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
    if (ariaMatch) letter = ariaMatch[1].toUpperCase();
    if (!letter && text.match(/^([A-D])[\.\)]\s*/)) letter = text.match(/^([A-D])[\.\)]\s*/)[1].toUpperCase();
    if (!letter && i < 4) letter = String.fromCharCode(65 + i);
    if (letter && letter >= 'A' && letter <= 'D') result.push({ element: el, letter });
  }
  return result;
}

/** 선지 앵커 후보: (1) radio input 래퍼, (2) 없으면 option-candidates 첫 요소의 클릭 단위 래퍼 */
function getChoiceAnchors(container) {
  let anchorEl = null;
  try {
    const inputs = deepQuerySelectorAll('input[type=radio]', container);
    const firstInput = inputs.find(inp => !inp.disabled);
    if (firstInput) {
      anchorEl = firstInput.closest('.mat-mdc-radio-button, .mat-radio-button, mat-list-option, [role="radio"], label') || firstInput;
    }
  } catch (_) {}
  if (anchorEl) return [anchorEl];
  const optionCandidates = getOptionCandidatesForAnchor(container);
  if (optionCandidates.length === 0) return [];
  const first = optionCandidates[0].element;
  const wrapper = first.closest('mat-list-option, [role=option], button, .mat-mdc-list-item, .mat-mdc-radio-button, [role=radio], label') || first;
  return [wrapper];
}

function waitFrames(n = 2) {
  return new Promise(r => {
    let count = 0;
    function tick() {
      requestAnimationFrame(() => { count++; if (count >= n) r(); else tick(); });
    }
    tick();
  });
}

/** scrollParent 컨텍스트에서 anchorEl이 뷰포트 중앙으로 오도록 스크롤 */
function scrollIntoViewWithinParent(anchorEl, scrollParent) {
  if (!anchorEl) return;
  if (!scrollParent || scrollParent === document.body) {
    anchorEl.scrollIntoView({ block: 'center', inline: 'nearest' });
    return;
  }
  const er = anchorEl.getBoundingClientRect();
  const pr = scrollParent.getBoundingClientRect();
  const delta = (er.top + er.height / 2) - (pr.top + pr.height / 2);
  scrollParent.scrollTop += delta;
}

/** 가시성 + 클릭가능성: viewportRect 안에 있고 elementFromPoint(cx,cy)가 anchor/choice 계열인지 */
function isVisibleAndClickable(anchorEl, viewportRect) {
  if (!anchorEl || !anchorEl.getBoundingClientRect) return false;
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  if (cx < viewportRect.left || cx > viewportRect.right || cy < viewportRect.top || cy > viewportRect.bottom) return false;
  const topEl = document.elementFromPoint(cx, cy);
  if (!topEl) return false;
  if (topEl === anchorEl || anchorEl.contains(topEl) || topEl.contains(anchorEl)) return true;
  const choiceLike = topEl.closest('input[type=radio], [role=radio], .mat-mdc-radio-button, mat-list-option');
  if (choiceLike && (anchorEl.contains(choiceLike) || choiceLike.contains(anchorEl))) return true;
  return false;
}

const CHOICE_VIS_WAIT_MS = 80;
const CHOICE_VIS_MAX_ITER = 20;

/**
 * 성공 판정 = root.querySelectorAll(BTN_SEL).length >= 4. 선지 4개 미만일 때만 스크롤/가시화 실행.
 */
export async function ensureChoicesVisible(opts) {
  const { root: optsRoot } = opts || {};
  const root = optsRoot && optsRoot.querySelector ? optsRoot : getSatRootForChoices();
  const getCount = () => {
    try {
      return root.querySelectorAll('mat-action-list.choices-container button').length;
    } catch (_) {
      return 0;
    }
  };

  if (getCount() >= 4) return;

  const wait = () => new Promise((r) => setTimeout(r, CHOICE_VIS_WAIT_MS));
  const hasChoicesContainer = () => !!root.querySelector('mat-action-list.choices-container');
  const choicesContainer = () => root.querySelector('mat-action-list.choices-container');
  const firstOption = () =>
    root.querySelector('mat-action-list.choices-container button') ||
    root.querySelector('.choices-container button');
  const nextBtn = () => root.querySelector('button[data-test-id="next-button"]');
  const getChoiceNodes = () => root.querySelectorAll('mat-action-list.choices-container button');

  // [STEP 1] scrollIntoView — 4개 미만일 때만
  for (let iter = 0; iter < CHOICE_VIS_MAX_ITER; iter++) {
    const count = getCount();
    console.log('[CHOICE-VIS]', { iter, step: 1, count, hasChoicesContainer: hasChoicesContainer() });
    if (count >= 4) return;
    const choices = getChoiceNodes();
    const target =
      (choices[0] || choicesContainer() || firstOption() || nextBtn() || root);
    target.scrollIntoView({ block: 'center', inline: 'nearest' });
    await wait();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (getCount() >= 4) return;
  }

  // [STEP 2] 키보드 PageDown / Space / ArrowDown
  const focusTarget = document.querySelector('activity-set') || document.body;
  try {
    if (typeof focusTarget.focus === 'function') {
      if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus();
    }
  } catch (_) {}
  const keys = [
    { key: 'PageDown', code: 'PageDown' },
    { key: ' ', code: 'Space' },
    { key: 'ArrowDown', code: 'ArrowDown' }
  ];
  for (let iter = 0; iter < CHOICE_VIS_MAX_ITER; iter++) {
    const count = getCount();
    console.log('[CHOICE-VIS]', { iter, step: 2, count, hasChoicesContainer: hasChoicesContainer() });
    if (count >= 4) return;
    for (const { key, code } of keys) {
      focusTarget.dispatchEvent(new KeyboardEvent('keydown', { key, code, bubbles: true, cancelable: true }));
      focusTarget.dispatchEvent(new KeyboardEvent('keyup', { key, code, bubbles: true, cancelable: true }));
      await wait();
      if (getCount() >= 4) return;
    }
  }

  // [STEP 3] WheelEvent on window + scrollingElement.scrollBy
  for (let iter = 0; iter < CHOICE_VIS_MAX_ITER; iter++) {
    const count = getCount();
    console.log('[CHOICE-VIS]', { iter, step: 3, count, hasChoicesContainer: hasChoicesContainer() });
    if (count >= 4) return;
    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 800, bubbles: true, cancelable: true }));
    if (document.scrollingElement) {
      document.scrollingElement.scrollBy(0, 800);
    }
    await wait();
  }

  const err = new Error('CHOICES_NOT_FOUND');
  err.code = 'CHOICES_NOT_FOUND';
  throw err;
}

/** 스크롤 후 선지 마운트 (fold 아래/가상화 대응). container 내부 옵션이 2개 미만이면 스크롤 반복. */
export async function ensureChoicesPresent(container) {
  const optionSel = '.mat-mdc-radio-button, .mat-radio-button, mat-list-option, [role="radio"], [role="option"], input[type="radio"], .mat-mdc-list-item, .option';
  let rawCount = 0;
  try {
    rawCount = deepQuerySelectorAll(optionSel, container).length;
  } catch (_) {}
  console.log('[CHOICE-EXTRACT] raw option candidates before scroll:', rawCount);
  const parent = getScrollableParent(container) || findSatRoot() || container;
  let count = rawCount;
  for (let i = 0; i < 7 && count < 2; i++) {
    if (parent && parent.scrollHeight > parent.clientHeight) {
      parent.scrollTop += parent.clientHeight * 0.8;
      await new Promise(r => { requestAnimationFrame(() => requestAnimationFrame(r)); });
      await new Promise(r => setTimeout(r, 80));
      try {
        count = deepQuerySelectorAll(optionSel, container).length;
      } catch (_) {}
      console.log('[CHOICE-EXTRACT] scroll attempt', i + 1, 'raw count:', count, 'parent:', { scrollTop: parent.scrollTop, scrollHeight: parent.scrollHeight, clientHeight: parent.clientHeight });
      if (count >= 2) break;
    }
  }
  return count;
}

/** 선지 셀렉터 고정. root 기준만 사용, document.body 금지. */
/** 1순위: class 필터 없음. activity-set 내 choices-container 내 모든 button. */
const BTN_SEL = 'mat-action-list.choices-container button';
export const SEL_OPTION = 'mat-action-list.choices-container button.mat-mdc-list-item.option, button.mat-mdc-list-item.option';

/**
 * 선택지 추출 — 입력 root만 사용 (순수 함수). document/findSatRoot/body 금지.
 */
export function extractChoices(container) {
  const root = container;
  if (!root || !root.querySelectorAll) {
    const err = new Error('extractChoices requires root (no document.body)');
    err.code = 'NO_ROOT';
    throw err;
  }
  console.log('[EXTRACT-CTX]', {
    href: typeof location !== 'undefined' ? location.href : '',
    isTop: typeof window !== 'undefined' && window.top === window,
    hasActivitySet: typeof document !== 'undefined' && !!document.querySelector('activity-set'),
    rootTag: root?.tagName,
    rootHasChoices: !!root?.querySelector?.('mat-action-list.choices-container'),
    rootDirect: root?.querySelectorAll?.('mat-action-list.choices-container button')?.length ?? 0,
    rootOption: root?.querySelectorAll?.('mat-action-list.choices-container button.mat-mdc-list-item.option')?.length ?? 0
  });
  const buttons = root.querySelectorAll(BTN_SEL);
  if (buttons.length >= 4) {
    console.log('[CHOICES-DIRECT]', buttons.length, buttons[0]?.outerHTML?.slice(0, 120));
    const list = Array.from(buttons).slice(0, 8).sort((a, b) => {
      try { return (a.getBoundingClientRect().top) - (b.getBoundingClientRect().top); } catch (_) { return 0; }
    });
    const result = [];
    for (let i = 0; i < 4; i++) {
      const el = list[i];
      const L = ['A', 'B', 'C', 'D'][i];
      const raw = (el.innerText || el.textContent || '').trim();
      const text = stripGarbageUnicode(raw.replace(/^\s*[A-D]\s*[\.\)]\s*/, '').trim() || raw);
      result.push({ label: L, text, element: el, priority: -2, source: 'sat-ui' });
    }
    return result;
  }

  let nodes = [];
  try {
    nodes = root.querySelectorAll(SEL_OPTION);
  } catch (_) {}
  if (nodes.length < 4) {
    const err = new Error('CHOICES_NOT_FOUND');
    err.code = 'CHOICES_NOT_FOUND';
    throw err;
  }
  const list = Array.from(nodes).slice(0, 8).sort((a, b) => {
    try { return (a.getBoundingClientRect().top) - (b.getBoundingClientRect().top); } catch (_) { return 0; }
  });
  const seen = new Set();
  const result = [];
  for (let i = 0; i < list.length && result.length < 4; i++) {
    const el = list[i];
    const prefixEl = el && el.querySelector ? el.querySelector('.option-prefix') : null;
    const letter = prefixEl ? (prefixEl.textContent || '').trim().replace(/[\.\)]/g, '').trim().slice(0, 1).toUpperCase() : ['A', 'B', 'C', 'D'][result.length];
    const L = (letter >= 'A' && letter <= 'D') ? letter : ['A', 'B', 'C', 'D'][result.length];
    if (seen.has(L)) continue;
    seen.add(L);
    const raw = (el.innerText || el.textContent || '').trim();
    const text = stripGarbageUnicode(raw.replace(/^\s*[A-D]\s*[\.\)]\s*/, '').trim() || raw);
    result.push({ label: L, text, element: el, priority: -2, source: 'sat-ui' });
  }
  if (result.length < 4) {
    const err = new Error('CHOICES_NOT_FOUND');
    err.code = 'CHOICES_NOT_FOUND';
    throw err;
  }
  return result;
}

/** root 없거나 4개 미만이면 [] 반환 (throw 안 함). PDF/추출 등 비게이트 경로용. */
export function extractChoicesSafe(container) {
  if (!container || !container.querySelectorAll) return [];
  try {
    return extractChoices(container);
  } catch (_) {
    return [];
  }
}

/** 레거시/폴백용: container 없을 때만 사용. 4개 미만이면 throw하지 않고 빈 배열 또는 소량 반환. */
function extractChoicesLegacy(container) {
  const root = container || document.body;
  const choices = [];
  const candidates = [];
  let rawCandidates = 0;
  try {
    rawCandidates = deepQuerySelectorAll('.mat-mdc-radio-button, [role="radio"], input[type="radio"], mat-list-option', container).length;
  } catch (_) {}
  console.log('[CHOICE-EXTRACT] raw option candidates:', rawCandidates);

  // DOM 존재 기준 수집 (가시성 필터 없음) — 스크롤 밖 선지도 포함, 클릭 시 scrollIntoView
  const domOnlyEls = getChoiceCandidates(container);
  if (domOnlyEls.length >= 2) {
    domOnlyEls.sort((a, b) => {
      try { return (a.getBoundingClientRect?.()?.top ?? 0) - (b.getBoundingClientRect?.()?.top ?? 0); } catch (_) { return 0; }
    });
    const seenLabels = new Set();
    for (let i = 0; i < domOnlyEls.length; i++) {
      const el = domOnlyEls[i];
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      let letter = null;
      const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
      if (ariaMatch) letter = ariaMatch[1].toUpperCase();
      if (!letter && text.match(/^([A-D])[\.\)]\s*/)) letter = text.match(/^([A-D])[\.\)]\s*/)[1].toUpperCase();
      if (!letter && i < 4) letter = String.fromCharCode(65 + i);
      if (letter && letter >= 'A' && letter <= 'D' && !seenLabels.has(letter)) {
        seenLabels.add(letter);
        candidates.push({ label: letter, text: extractOptionText(el), element: el, priority: -1, source: 'dom-only' });
      }
    }
    if (candidates.length >= 2) {
      console.log(`[SAT-DEBUG] [extractChoices] DOM 존재 기준 후보: ${candidates.length}개 (가시성 무관)`);
    }
  }

  function extractLetterFromEl(el, idx) {
    const t = ((el && (el.innerText || el.textContent)) || '').trim();
    const m = t.match(/^\s*([A-D])\s*[\.\)]/);
    if (m) return m[1].toUpperCase();
    return ['A', 'B', 'C', 'D'][idx] ?? null;
  }
  function extractOptionText(el) {
    let raw = ((el && (el.innerText || el.textContent)) || '').trim();
    raw = stripGarbageUnicode(raw);
    const cleaned = raw.replace(/^\s*[A-D]\s*[\.\)]\s*/, '').trim();
    if (cleaned) return cleaned;
    const aria = (el && el.getAttribute && el.getAttribute('aria-label')) || '';
    if (aria.trim()) return aria.trim();
    const labelledBy = (el && el.getAttribute && el.getAttribute('aria-labelledby')) || '';
    if (labelledBy && el.ownerDocument) {
      const ref = el.ownerDocument.getElementById(labelledBy.split(/\s+/)[0]);
      if (ref) return (ref.innerText || ref.textContent || '').trim() || '선택지';
    }
    return '선택지';
  }

  // Priority 0: class 기반 (SAT UI: mat-action-list.choices-container 내 button.option / mat-mdc-list-item)
  const optionSelectors = 'mat-action-list button.option, .choices-container button.option, button.mat-mdc-list-item.option, .option, mat-list-option, .mat-mdc-list-item, .mat-mdc-radio-button, .mat-radio-button, [class*="list-item"][class*="option"], [class*="option"]';
  let optionEls = [];
  try {
    optionEls = deepQuerySelectorAll(optionSelectors, container);
  } catch (e) {
    optionEls = [];
  }
  function isNotHidden(el) {
    if (!el) return false;
    try {
      const s = window.getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
    } catch (_) { return true; }
  }
  optionEls = optionEls.filter(el => !el.disabled && isNotHidden(el));
  if (optionEls.length >= 2) {
    optionEls.sort((a, b) => {
      try {
        return (a.getBoundingClientRect().top) - (b.getBoundingClientRect().top);
      } catch (_) { return 0; }
    });
    const existingLabels = new Set();
    optionEls.forEach((el, idx) => {
      const letter = extractLetterFromEl(el, idx);
      if (!letter || letter < 'A' || letter > 'D') return;
      if (existingLabels.has(letter)) return;
      existingLabels.add(letter);
      candidates.push({
        label: letter,
        text: extractOptionText(el),
        element: el,
        priority: 0,
        source: 'class-based option'
      });
    });
    console.log(`[SAT-DEBUG] [extractChoices] Priority 0 (class 기반 option): ${optionEls.length}개 중 ${candidates.length}개 후보`);
  }

  // ============================================================================
  // ACCESSIBILITY-BASED CHOICE EXTRACTION
  // Priority order: 0(class) → 1. role="radio" → 2. input radio → 3. aria-checked → 4. role="option"
  // ============================================================================
  
  // Priority 1: role="radio" (후보 4개 미만일 때만)
  if (candidates.length < 4) {
  const radioElements = deepQuerySelectorAll('[role="radio"]', container);
  const radioVisibleCount = radioElements.filter(el => !el.disabled && isNotHidden(el)).length;
  console.log(`[CHOICE-EXTRACT] Priority 1 role=radio: ${radioElements.length}개 (notHidden=${radioVisibleCount})`);
  
  for (const el of radioElements) {
    if (el.disabled) continue;
    
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
      const choiceText = stripGarbageUnicode(text.replace(/^[A-D][\.\)]\s*/, '').trim() || ariaLabel || '선택지');
      
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
  }
  
  // Priority 2: input[type="radio"] + label
  if (candidates.length < 4) {
    const radioInputs = deepQuerySelectorAll('input[type="radio"]', container);
    console.log(`[SAT-DEBUG] [extractChoices] Priority 2 (input[type="radio"]): ${radioInputs.length}개 발견`);
    
    for (const input of radioInputs) {
      if (input.disabled) continue;
      
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
        const choiceText = stripGarbageUnicode(text.replace(/^[A-D][\.\)]\s*/, '').trim() || '선택지');
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
      if (el.disabled) continue;
      
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
        const choiceText = stripGarbageUnicode(text.replace(/^[A-D][\.\)]\s*/, '').trim() || ariaLabel || '선택지');
        
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
      if (el.disabled) continue;
      
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
        const choiceText = stripGarbageUnicode(text.replace(/^[A-D][\.\)]\s*/, '').trim() || ariaLabel || '선택지');
        
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

  // Priority 4.5: 정답 옵션과 동일 셀렉터, DOM 존재만 (가시성 필터 없음 — 화면 밖 선지 포함)
  if (candidates.length < 4) {
    const domOnlyOptionEls = getChoiceCandidates(container);
    console.log(`[SAT-DEBUG] [extractChoices] Priority 4.5 (option-candidates DOM만): ${domOnlyOptionEls.length}개`);
    const seenLetters = new Set(candidates.map(c => c.label));
    domOnlyOptionEls.sort((a, b) => {
      try { return (a.getBoundingClientRect?.()?.top ?? 0) - (b.getBoundingClientRect?.()?.top ?? 0); } catch (_) { return 0; }
    });
    for (let i = 0; i < domOnlyOptionEls.length; i++) {
      const el = domOnlyOptionEls[i];
      if (candidates.find(c => c.element === el)) continue;
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      let letter = null;
      const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
      if (ariaMatch) letter = ariaMatch[1].toUpperCase();
      if (!letter && text.match(/^([A-D])[\.\)]\s*/)) letter = text.match(/^([A-D])[\.\)]\s*/)[1].toUpperCase();
      if (!letter && i < 4) letter = String.fromCharCode(65 + i);
      if (letter && letter >= 'A' && letter <= 'D' && !seenLetters.has(letter)) {
        seenLetters.add(letter);
        candidates.push({
          label: letter,
          text: extractOptionText(el),
          element: el,
          priority: 4.5,
          source: 'option-candidates'
        });
      }
    }
  }

  // Priority 정렬 후 y좌표 순으로 정렬 (리딩+그림에서 A~D 순서 안정화)
  candidates.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    try {
      const ay = (a.element && a.element.getBoundingClientRect) ? a.element.getBoundingClientRect().top : 0;
      const by = (b.element && b.element.getBoundingClientRect) ? b.element.getBoundingClientRect().top : 0;
      if (ay !== by) return ay - by;
    } catch (_) {}
    return (a.label || '').localeCompare(b.label || '');
  });
  
  // A-D만 선택하고 중복 제거 (element 포함해 클릭 가능하게)
  const seenLabels = new Set();
  for (const candidate of candidates) {
    if (candidate.label >= 'A' && candidate.label <= 'D' && !seenLabels.has(candidate.label)) {
      choices.push({
        label: candidate.label,
        text: candidate.text,
        element: candidate.element
      });
      seenLabels.add(candidate.label);
    }
  }
  
  console.log(`[CHOICE-EXTRACT] 총 후보: ${candidates.length}개, 추출된 선택지: ${choices.length}개`);
  if (candidates.length > 0) {
    const first5 = candidates.slice(0, 5).map(c => ({
      label: c.label,
      text: c.text.substring(0, 30) + (c.text.length > 30 ? '...' : ''),
      source: c.source
    }));
    console.log(`[SAT-DEBUG] [extractChoices] 첫 5개 후보:`, first5);
  }
  
  // Priority 5: 최후 폴백 — 옵션 셀렉터만 사용 (전체 클릭 가능 요소 탐색 금지). 동일 셀렉터에서 텍스트/aria로 letter 추출.
  if (candidates.length < 4) {
    console.log(`[SAT-DEBUG] [extractChoices] Priority 5 (옵션 셀렉터 텍스트 폴백): 정답 옵션 셀렉터만`);
    const p5Els = getChoiceCandidates(container);
    p5Els.sort((a, b) => {
      try { return (a.getBoundingClientRect?.()?.top ?? 0) - (b.getBoundingClientRect?.()?.top ?? 0); } catch (_) { return 0; }
    });
    const existingLetters = new Set(candidates.map(c => c.label).filter(l => l >= 'A' && l <= 'D'));
    for (let i = 0; i < p5Els.length; i++) {
      const el = p5Els[i];
      if (candidates.find(c => c.element === el)) continue;
      const text = (el.innerText || el.textContent || '').trim();
      const ariaLabel = (el.getAttribute('aria-label') || '').trim();
      const combined = (text + ' ' + ariaLabel).trim();
      let choiceLetter = null;
      const m1 = combined.match(/choice\s*(A|B|C|D)/i) || combined.match(/^([A-D])[\.\)]\s*/i);
      if (m1) choiceLetter = m1[1].toUpperCase();
      if (!choiceLetter && i < 4) choiceLetter = String.fromCharCode(65 + i);
      if (choiceLetter && choiceLetter >= 'A' && choiceLetter <= 'D' && !existingLetters.has(choiceLetter)) {
        existingLetters.add(choiceLetter);
        candidates.push({
          label: choiceLetter,
          text: stripGarbageUnicode(text.replace(/^[A-D][\.\)]\s*/i, '').trim() || ariaLabel || '선택지'),
          element: el,
          priority: 5,
          source: '옵션 셀렉터 텍스트 폴백'
        });
        console.log(`[SAT-DEBUG] [extractChoices] P5 후보: ${choiceLetter} (옵션 셀렉터)`);
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
  
  // 최종 폴백 1: radio/radio-button DOM 순서 (텍스트 불필요 - Math SVG 등)
  if (choices.length === 0) {
    const radioFallbackSelectors = ['.mat-mdc-radio-button', '.mat-radio-button', '[role="radio"]', 'mat-list-option'];
    const radioFallbackEls = [];
    try {
      const inputs = deepQuerySelectorAll('input[type="radio"]', container);
      for (const inp of inputs) {
        if (inp.disabled) continue;
        const wrapper = inp.closest('.mat-mdc-radio-button, .mat-radio-button, label') || inp.parentElement;
        if (wrapper) radioFallbackEls.push(wrapper);
      }
    } catch (_) {}
    for (const sel of radioFallbackSelectors) {
      try {
        const nodes = deepQuerySelectorAll(sel, container);
        for (const el of nodes) {
          if (el.disabled) continue;
          try {
            const r = el.getBoundingClientRect();
            if (r.width >= 20 && r.height >= 20 && r.bottom >= 0 && r.top <= window.innerHeight) {
              radioFallbackEls.push(el);
            }
          } catch (_) {}
        }
      } catch (_) {}
    }
    let uniqueRadio = [...new Map(radioFallbackEls.map(e => [e, e])).values()];
    uniqueRadio = uniqueRadio.filter(el => !uniqueRadio.some(other => other !== el && other.contains(el)));
    uniqueRadio.sort((a, b) => (a.getBoundingClientRect?.()?.top ?? 0) - (b.getBoundingClientRect?.()?.top ?? 0));
    if (uniqueRadio.length >= 2) {
      uniqueRadio.slice(0, 4).forEach((el, i) => {
        choices.push({
          label: ['A', 'B', 'C', 'D'][i],
          text: extractOptionText(el),
          element: el,
          source: 'radio-dom-order',
          priority: 6
        });
      });
      console.log(`[SAT-DEBUG] [extractChoices] radio DOM 순서 폴백: ${choices.length}개`);
    }
  }
  // 최종 폴백 2: 순수 텍스트 기반 추출 (Shadow DOM 포함, 패턴 완화)
  if (choices.length === 0) {
    console.warn('[SAT PDF Exporter] 모든 방법으로 선택지를 찾지 못함 - 순수 텍스트 기반 폴백 시도');
    const tagSelectors = ['div', 'span', 'p', 'li', 'button', 'label', 'td', '[role="button"]'];
    const allElementsSet = new Set();
    for (const sel of tagSelectors) {
      try {
        const nodes = deepQuerySelectorAll(sel, container);
        nodes.forEach(el => allElementsSet.add(el));
      } catch (e) {
        // ignore
      }
    }
    const allElements = Array.from(allElementsSet).filter(el => {
      try {
        const r = el.getBoundingClientRect();
        return r.width >= 20 && r.height >= 20 && r.bottom >= 0 && r.top <= window.innerHeight;
      } catch { return false; }
    });
    // 작은 요소부터 시도 (가장 구체적인 선택지)
    allElements.sort((a, b) => (a.getBoundingClientRect().width * a.getBoundingClientRect().height) - (b.getBoundingClientRect().width * b.getBoundingClientRect().height));
    const seenLabels = new Set();
    const choicePatterns = [
      /^\s*([A-D])[\.\)]\s*([\s\S]+)$/,           // "A. text" or "A) text" (leading space ok)
      /^\s*\(([A-D])\)\s*([\s\S]+)$/,             // "(A) text"
      /^([A-D])\s*[\.\)]\s*([\s\S]+)$/            // "A ." or "A )"
    ];
    const lineChoiceRe = /^\s*([A-D])[\.\)]\s*(.*)$/;
    for (const el of allElements) {
      const rawText = (el.innerText || el.textContent || '').trim();
      if (!rawText || rawText.length > 600) continue;
      let m = null;
      for (const pattern of choicePatterns) {
        m = rawText.match(pattern);
        if (m) break;
      }
      if (!m && rawText.includes('\n')) {
        const firstLine = rawText.split('\n')[0];
        const lineMatch = firstLine.match(lineChoiceRe);
        if (lineMatch) m = [rawText, lineMatch[1], rawText.slice(firstLine.length).trim() || lineMatch[2]];
      }
      if (!m || m[1] < 'A' || m[1] > 'D' || seenLabels.has(m[1])) continue;
      const rest = stripGarbageUnicode((m[2] || '').trim());
      if (/[B-D][\.\)]/.test(rest)) continue;
      seenLabels.add(m[1]);
      choices.push({
        label: m[1],
        text: rest.substring(0, 100),
        element: el,
        priority: 5,
        source: '텍스트 기반 폴백'
      });
      console.log(`[SAT-DEBUG] [extractChoices] 텍스트 기반 후보 발견: ${m[1]} - ${rest.substring(0, 30)}`);
      if (choices.length >= 4) break;
    }
    if (choices.length >= 2) {
      console.log(`[SAT-DEBUG] [extractChoices] 텍스트 기반 추출 성공: ${choices.length}개 (element 포함)`);
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
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:frameGuard',message:'math image extract: return null (frame guard)',data:{sectionType},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
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
  await new Promise(resolve => setTimeout(resolve, 150)); // DOM 반영 대기
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
  
  // 선택지 추출 (A-D만). root 기준만 사용.
  const rootForExtract = await getRootForExtract();
  const choicesArray = rootForExtract ? extractChoicesSafe(rootForExtract) : [];

  // choices를 {A: \"...\", B: \"...\", C: \"...\", D: \"...\"} 형태로 변환
  const choices = {};
  for (const choice of choicesArray) {
    if (choice.label >= 'A' && choice.label <= 'D') {
      let text = choice.text;
      // Math: 선택지에 [data-math]가 있으면 LaTeX→읽기 가능 문자열로 수식 깨짐 방지
      if (sectionType === 'math' && choice.element && choice.element.querySelector && choice.element.querySelector('[data-math]')) {
        const withMath = getTextWithMathFromNode(choice.element);
        if (withMath) text = stripGarbageUnicode(withMath);
      }
      choices[choice.label] = text;
    }
  }

  // Math 섹션: [data-math] LaTeX가 있으면 수식 깨짐 방지를 위해 LaTeX→읽기 가능 문자열로 문제 본문 보강
  if (sectionType === 'math' && rootForExtract && rootForExtract.querySelector && rootForExtract.querySelector('[data-math]')) {
    const withMath = getTextWithMathFromNode(rootForExtract);
    const beforeChoices = withMath.split(/\s*[A-D]\s*[\.\)]\s*/)[0].trim();
    if (beforeChoices && beforeChoices.length > 15) {
      problemText = stripGarbageUnicode(beforeChoices);
    }
  }

  // 유니코드 쓰레기 패턴 제거 (Reading/Math 공통)
  problemText = stripGarbageUnicode(problemText);
  
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
  
  // ============================================================================
  // Figure 이미지 추출
  // ============================================================================
  // #region agent log - DEBUG STEP 1: extractFigures 호출 확인
  console.log(`[DEBUG STEP 1] extractCurrentProblem: 문제 ${problemNum}에서 extractFigures 호출 직전`);
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:beforeExtractFigures',message:'DEBUG STEP 1: extractFigures 호출 직전',data:{problemNum,sectionType},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  let figures = [];
  try {
    const satRoot = findSatRoot();
    const satRootTag = satRoot ? satRoot.tagName : null;
    const satRootIsBody = satRoot === document.body;
    const imgInRoot = satRoot ? satRoot.querySelectorAll('img').length : 0;
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:satRootCheck',message:'math image extract: satRoot before extractFigures',data:{sectionType,problemNum,satRootFound:!!satRoot,satRootTag,satRootIsBody,imgInRoot},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
    // #endregion

    if (satRoot) {
      console.log(`[DEBUG STEP 1] extractFigures 호출 시작: 문제 ${problemNum}`);
      figures = await extractFigures(satRoot);

      console.log(`[DEBUG STEP 1] extractFigures 완료: 문제 ${problemNum}, figures.length=${figures.length}`);
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:extractFiguresResult',message:'math image extract: after extractFigures',data:{sectionType,problemNum,figuresLength:figures.length},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
      // #endregion

      console.log(`[SAT-DEBUG] [extractCurrentProblem] 문제 ${problemNum}에서 ${figures.length}개 figure 추출 완료`);
    } else {
      console.warn('[SAT-DEBUG] [extractCurrentProblem] satRoot를 찾을 수 없어 figure 추출 스킵');
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:satRootNotFound',message:'math image extract: satRoot null',data:{sectionType,problemNum},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
    }
  } catch (error) {
    console.warn('[SAT-DEBUG] [extractCurrentProblem] figure 추출 오류 (계속 진행):', error);
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:extractFiguresError',message:'math image extract: extractFigures throw',data:{sectionType,problemNum,errorMessage:error.message},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
    // #endregion
    figures = []; // 실패 시 빈 배열
  }
  
  // #region agent log - DEBUG STEP 3: extractCurrentProblem 반환 직전 figures 검증
  console.log(`[DEBUG STEP 3] extractCurrentProblem 반환 직전: 문제 ${problemNum}, figures.length=${figures.length}`);
  fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'extract.js:extractCurrentProblem:beforeReturn',message:'DEBUG STEP 3: extractCurrentProblem 반환 직전 figures 검증',data:{problemNum,figuresLength:figures.length,figures:figures.map(f=>({w:f.width,h:f.height,hasDataUrl:!!f.dataUrl}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  // ============================================================================
  
  // 고정된 데이터 구조 반환 (사용자 요구사항에 맞춤)
  return {
    section: sectionType === 'reading' ? 'Reading and Writing' : 'Math',
    module: 0, // 나중에 채워짐 (collectModuleProblems에서)
    problemNumber: problemNum, // 절대 undefined 아님 (위에서 보장)
    passage: passageText || null,
    question: problemText, // stem 대신 question 사용 (비어있으면 placeholder)
    choices: choices, // {A: \"...\", B: \"...\", C: \"...\", D: \"...\"} 형태
    correctAnswer: '', // 나중에 채워짐 (detectCorrectAnswer에서)
    explanation: '', // 나중에 채워짐 (extractExplanationAfterGrading에서)
    figures: figures // figure 이미지 배열
  };
}

/**
 * Progress 상태 — progress 전용 엘리먼트 textContent만 사용 (satRoot innerText regex 제거, 16→9 점프 방지).
 * @returns {string|null} Progress 상태 (예: "1 / 27", "5 / 27")
 */
export function getProgressState() {
  if (window !== window.top && !window.__SAT_IS_WORKER) {
    console.warn('[SAT-DEBUG] [getProgressState] Worker frame이 아닌 iframe에서 실행 - 경고만 출력');
  }
  const satRoot = findSatRoot();
  const prog = (satRoot ? readProgressNumber(satRoot) : null) || readProgressNumber(document);
  if (prog) {
    console.log(`[SAT PDF Exporter] Progress 발견 (progress element): ${prog.raw}`);
    return prog.raw;
  }
  console.warn('[DIAG] Progress를 찾을 수 없습니다 (progress element만 사용, satRoot text 미사용).');
  return null;
}

// 현재 문제 번호 — progress 전용 엘리먼트 우선 (satRoot innerText regex 제거)
export function getCurrentProblemNumber() {
  const satRoot = findSatRoot();
  const prog = (satRoot ? readProgressNumber(satRoot) : null) || readProgressNumber(document);
  if (prog && prog.cur >= 1) {
    return prog.cur;
  }
  if (!satRoot) return 1;
  // 폴백: progress UI 셀렉터 (textContent만, innerText 아님)
  const progressSelectors = ['[class*="progress"]', '[class*="indicator"]', '[aria-label*="progress"]'];
  for (const selector of progressSelectors) {
    for (const el of satRoot.querySelectorAll(selector)) {
      const text = (el.textContent || '').trim();
      const match = text.match(/\b(\d+)\s*\/\s*(27|22)\b/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > 0 && num <= parseInt(match[2])) return num;
      }
    }
  }
  // 폴백: 문제 번호로 시작하는 텍스트 (요소 textContent만)
  for (const el of satRoot.querySelectorAll('[class*="question"], [class*="problem"], [class*="number"]')) {
    const text = (el.textContent || '').trim();
    const m = text.match(/^(\d+)\./);
    if (m) {
      const num = parseInt(m[1]);
      if (num > 0 && num <= 27) return num;
    }
  }
  return 1;
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
export async function waitForGrading(timeoutMs = 6000) {
  console.log('[GRADING] 채점 대기 시작 (엄격한 조건: 정답 표시 확인)');
  // timeoutMs 파라미터로 받도록 수정 (기본값 6000ms)
  
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
      
      // 20ms마다 재확인 (빠른 채점 감지)
      setTimeout(checkGrading, 20);
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
  
  // ---------------------------------------------------------------------------
  // Math 주관식: div.explanation → option-text-container → span.math-inline[data-math]
  // 객관식 선택지가 없으므로 먼저 확인
  // ---------------------------------------------------------------------------
  const explanationBlocks = satRoot.querySelectorAll('.explanation[class*="answered"], [class*="explanation"]');
  for (const block of explanationBlocks) {
    if (!isElementVisible(block)) continue;
    const optionTextContainer = block.querySelector('.option-text-container');
    if (!optionTextContainer) continue;
    // 1) LaTeX: span.math-inline[data-math]
    const mathInline = optionTextContainer.querySelector('span.math-inline[data-math]');
    if (mathInline) {
      const latex = mathInline.getAttribute('data-math');
      if (latex && typeof latex === 'string') {
        let readable = latex
          .replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, '$1/$2')
          .replace(/\\sqrt\s*\{\s*([^}]+)\s*\}/g, '√$1')
          .replace(/\\sqrt\s*([^\s\{\\]+)/g, '√$1')
          .replace(/\\cdot/g, '·')
          .replace(/\\times/g, '×')
          .replace(/\\div/g, '÷')
          .replace(/\\pm/g, '±')
          .replace(/\\text\s*\{\s*([^}]*)\s*\}/g, '$1')
          .replace(/\\left|\\right/g, '')
          .replace(/\\\(|\\\)/g, '')
          .trim();
        if (readable.length > 0) {
          console.log(`[SAT PDF Exporter] Math 주관식 정답 발견: ${readable} (LaTeX)`);
          return readable;
        }
      }
    }
    // 2) 폴백: data-math 속성 있는 모든 요소 (katex 등 다른 래퍼)
    const anyMath = optionTextContainer.querySelector('[data-math]');
    if (anyMath) {
      const latex = anyMath.getAttribute('data-math');
      if (latex && typeof latex === 'string') {
        let readable = latex
          .replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, '$1/$2')
          .replace(/\\sqrt\s*\{\s*([^}]+)\s*\}/g, '√$1')
          .replace(/\\cdot/g, '·')
          .replace(/\\times/g, '×')
          .replace(/\\div/g, '÷')
          .replace(/\\pm/g, '±')
          .replace(/\\text\s*\{\s*([^}]*)\s*\}/g, '$1')
          .replace(/\\left|\\right/g, '')
          .trim();
        if (readable.length > 0) {
          console.log(`[SAT PDF Exporter] Math 주관식 정답 발견: ${readable} ([data-math])`);
          return readable;
        }
      }
    }
    // 3) 폴백: 순수 텍스트 (숫자, 분수 등 - "8", "3/5", "1.5")
    const rawText = (optionTextContainer.innerText || optionTextContainer.textContent || '').trim();
    const cleaned = rawText
      .replace(/^(정답|오답|Correct|Incorrect)\s*/i, '')
      .replace(/\s*(정답|오답|Correct|Incorrect)$/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    const numericMatch = cleaned.match(/^[\d\s\/\.\-\(\)\*]+$/);
    if (cleaned.length > 0 && cleaned.length <= 20 && (numericMatch || /^[\d\.]+\s*\/\s*[\d\.]+$/.test(cleaned))) {
      console.log(`[SAT PDF Exporter] Math 주관식 정답 발견: ${cleaned} (텍스트 폴백)`);
      return cleaned;
    }
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
  // ---------------------------------------------------------------------------
  // 폴백 4: 선택된(aria-checked=true) 옵션 사용
  // - 일부 UI에서는 정답 옵션에 별도 correct 마킹 없이 aria-checked만 true로 유지되는 경우가 있음
  // ---------------------------------------------------------------------------
  try {
    const selectedCandidates = optionCandidates.filter(c => {
      try {
        const ariaChecked = c.element.getAttribute('aria-checked') || '';
        const ariaPressed = c.element.getAttribute('aria-pressed') || '';
        return ariaChecked.toLowerCase() === 'true' || ariaPressed.toLowerCase() === 'true';
      } catch {
        return false;
      }
    });
    if (selectedCandidates.length === 1) {
      const sel = selectedCandidates[0];
      console.log(`[SAT PDF Exporter] 정답 발견: ${sel.letter} (aria-checked/pressed=true 폴백)`);
      // #region agent log
      try {
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location: 'extract.js:detectCorrectAnswer:ariaCheckedFallback',
            message: 'correct answer inferred from aria-checked/pressed',
            data: {
              answer: sel.letter,
              candidatesCount: optionCandidates.length
            },
            timestamp: Date.now(),
            runId: 'answers-bug',
            hypothesisId: 'H3'
          })
        }).catch(() => {});
      } catch {
        // 로깅 실패는 무시
      }
      // #endregion
      return sel.letter;
    }
  } catch {
    // 폴백 로직 실패는 무시
  }

  // 폴백 5: 구조적 후보가 0일 때 텍스트 기반 옵션 탐색 (Reading Module 1 등 - role="radio" 없음)
  if (optionCandidates.length === 0) {
    const textOptionEls = Array.from(satRoot.querySelectorAll('div, span, p, li, button, [role="button"], label')).filter(el => {
      try {
        const r = el.getBoundingClientRect();
        return r.width >= 20 && r.height >= 20 && isElementVisible(el) && satRoot.contains(el);
      } catch { return false; }
    });
    for (const el of textOptionEls) {
      const text = (el.innerText || el.textContent || '').trim();
      const m = text.match(/^([A-D])[\.\)]\s*/);
      if (!m || text.length > 500) continue;
      const letter = m[1];
      const lower = text.toLowerCase();
      if (lower.includes('정답입니다') || lower.includes('this is correct') || /\bcorrect\b/.test(lower) ||
          (el.className && /\banswered-correct\b|\bcorrect\b/.test(String(el.className)))) {
        console.log(`[SAT PDF Exporter] 정답 발견: ${letter} (텍스트 기반 폴백)`);
        return letter;
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
  
  // ---------------------------------------------------------------------------
  // Math 주관식: correctAnswer가 없을 때 (A-D 선택지 없음) explanation-text에서 직접 추출
  // ---------------------------------------------------------------------------
  if (!correctAnswer) {
    const explanationTextContainers = satRoot.querySelectorAll(
      '.explanation-text, [class*="explanation-text"]'
    );
    for (const container of explanationTextContainers) {
      if (!isElementVisible(container)) continue;
      const msgContent = container.querySelector('message-content, [id*="rationale"], .markdown');
      const el = msgContent || container;
      const text = (el.innerText || el.textContent || '').trim();
      if (text.length > 10) {
        const cleaned = text.replace(/\s+/g, ' ').trim();
        console.log(`[SAT PDF Exporter] Math 주관식 해설 발견 (explanation-text): ${cleaned.substring(0, 50)}...`);
        return cleaned;
      }
    }
    // option-text-container가 있는 explanation 블록 내부에서 rationale 영역 찾기
    const explanationBlocks = satRoot.querySelectorAll('.explanation[class*="answered"], [class*="explanation"]');
    for (const block of explanationBlocks) {
      const optionText = block.querySelector('.option-text-container');
      if (!optionText) continue;
      const rationale = block.querySelector('[id*="rationale"], .explanation-text, [class*="explanation-text"]');
      if (!rationale) continue;
      const text = (rationale.innerText || rationale.textContent || '').trim();
      if (text.length > 10) {
        const cleaned = text.replace(/\s+/g, ' ').trim();
        console.log(`[SAT PDF Exporter] Math 주관식 해설 발견 (explanation 블록): ${cleaned.substring(0, 50)}...`);
        return cleaned;
      }
    }
  }
  
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

    // 구조적 후보가 0일 때 텍스트 기반으로 정답 옵션 요소 탐색 (Reading 등)
    if (!correctOptionElement && correctAnswer) {
      const textOptionEls = Array.from(satRoot.querySelectorAll('div, span, p, li, button, [role="button"], label')).filter(el => {
        try {
          const r = el.getBoundingClientRect();
          return r.width >= 20 && r.height >= 20 && isElementVisible(el) && satRoot.contains(el);
        } catch { return false; }
      });
      for (const el of textOptionEls) {
        const text = (el.innerText || el.textContent || '').trim();
        const m = text.match(/^([A-D])[\.\)]\s*/);
        if (!m || m[1] !== correctAnswer) continue;
        const lower = text.toLowerCase();
        if (lower.includes('정답입니다') || lower.includes('this is correct') || /\bcorrect\b/.test(lower) ||
            (el.className && /\banswered-correct\b|\bcorrect\b/.test(String(el.className)))) {
          correctOptionElement = el;
          console.log(`[SAT PDF Exporter] 정답 옵션 요소 발견 (텍스트 기반 폴백): ${correctAnswer}`);
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
      const isWrong = textLower.includes('오답') || textLower.includes('incorrect');
      // 정답/해설: "정답"|"correct" 포함이거나, 충분히 긴 설명(오답 아님)이면 수락 (Reading 11·12 등 영어 해설 추출 보강)
      const looksCorrect = textLower.includes('정답') || textLower.includes('correct');
      const longEnoughToBeExplanation = text.length > 40;
      if (text.length > 10 && !isWrong && (looksCorrect || longEnoughToBeExplanation)) {
        
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
        const cleaned = stripGarbageUnicode(explanationText.replace(/\s+/g, ' ').trim());
        
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
    return stripGarbageUnicode(foundExplanations[0].text);
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
export async function extractReadingSection() {
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
  
  // 선택지 추출 (root 기준)
  const rootForPdf = await getRootForExtract();
  const choices = rootForPdf ? extractChoicesSafe(rootForPdf) : [];
  
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
export async function extractMathSection() {
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
  
  // 선택지 추출 (root 기준)
  const rootForMath = await getRootForExtract();
  const choices = rootForMath ? extractChoicesSafe(rootForMath) : [];
  
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
export async function extractSATData() {
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
      const readingSection = await extractReadingSection();
      if (readingSection.length > 0) {
        data.reading = readingSection;
      }
    } else if (currentSection === 'math') {
      // Math 섹션만 추출
      console.log('[SAT PDF Exporter] Math 섹션으로 감지됨 - Math만 추출');
      const mathSection = await extractMathSection();
      if (mathSection.length > 0) {
        data.math = mathSection;
      }
    } else {
      // 섹션 감지 실패 시 양쪽 모두 시도 (하지만 경고 로그)
      console.warn('[SAT PDF Exporter] 섹션 감지 실패 - Reading과 Math 모두 시도 (비권장)');
      const readingSection = await extractReadingSection();
      if (readingSection.length > 0) {
        data.reading = readingSection;
      }
      const mathSection = await extractMathSection();
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
    await new Promise(resolve => setTimeout(resolve, 100));
    
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
              await new Promise(resolve => setTimeout(resolve, 100));
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
