// Module runner - handles per-module problem collection loop
// Extracted from stateMachine.js to separate concerns

import { CONFIG, TEMP_MODE, TEMP_TARGET_NUMBERS } from '../config/constants.js';
import { isElementVisible } from '../dom/deepQuery.js';
import { waitForCondition, waitForContentLoad } from '../dom/wait.js';
import { isQuestionScreen, getCurrentProblemNumber, getProgressState, extractCurrentProblem, getQuestionSignature, isGraded, waitForGrading, detectCorrectAnswer, extractExplanationAfterGrading, findSatRoot, isModuleStartScreen } from '../dom/extract.js';
import { clickNextButtonWithFallback, clickFirstChoice, clickSubmitWithConfirmation, findNavigationButton } from '../dom/buttons.js';

/** 현재 문제 영역에 이미지/사진이 있는지 여부 (선지 구간 대기 시간 조절용) */
function currentProblemHasImage() {
  const root = findSatRoot();
  if (!root) return false;
  return !!root.querySelector('img, figure, [class*="figure"], [class*="image"], [data-testid*="figure"], [data-testid*="image"]');
}

/**
 * 모듈의 모든 문제 수집
 * @param {Object} allData - 전체 데이터 객체 {reading: [], math: []}
 * @param {string} sectionType - 'reading' | 'math'
 * @param {string} moduleName - 'Module 1' | 'Module 2'
 */
export async function collectModuleProblems(allData, sectionType, moduleName) {
  console.log(`[FLOW] collectModuleProblems start: ${sectionType} ${moduleName}`);
  
  const moduleNumber = moduleName === 'Module 1' ? 1 : 2;
  const targetArray = sectionType === 'reading' ? allData.reading : allData.math;

  // Guard: Reading Module 2 - do NOT start without Q1 (progress=1/27)
  if (sectionType === 'reading' && moduleNumber === 2) {
    const progress = getProgressState();
    const isQ1 = progress && /^1\s*\/\s*27/i.test(progress);
    if (isModuleStartScreen()) {
      console.error('[FLOW] ABORT: Module 2 수집 시작 불가 - Module Start Screen이 아직 처리되지 않았습니다. startModule2()를 먼저 호출하세요.');
      return 0;
    }
    if (!isQ1 && !isQuestionScreen()) {
      console.error('[FLOW] ABORT: Module 2 수집 시작 불가 - progress=1/27 또는 Q1 화면이 필요합니다. current progress:', progress);
      return 0;
    }
  }
  
  // ============================================================================
  // BUG FIX: Module별로 수집된 문제 수를 별도로 카운트
  // ============================================================================
  const moduleProblemsBefore = targetArray.filter(p => p.module === moduleNumber).length;
  console.log(`[FLOW] ${moduleName} 시작 전 수집된 문제 수: ${moduleProblemsBefore}개 (전체: ${targetArray.length}개)`);
  // ============================================================================
  
  // ============================================================================
  // TEMP 모드: 정확한 번호(1,2,3)만 수집
  // ============================================================================
  const maxProblems = TEMP_MODE ? TEMP_TARGET_NUMBERS.length : (sectionType === 'math' ? (CONFIG.collection.mathMaxProblems ?? 22) : CONFIG.collection.maxProblems);
  const targetNumbers = TEMP_MODE ? new Set(TEMP_TARGET_NUMBERS) : null; // TEMP 모드일 때만 사용
  const collectedNumbers = new Set(); // 수집된 문제 번호 추적
  
  if (TEMP_MODE) {
    console.log(`[TEMP] TEMP 모드 활성화: 정확히 ${TEMP_TARGET_NUMBERS.join(', ')}번 문제만 수집합니다.`);
  } else {
    console.log(`[FLOW] 수집 시작: ${moduleName}, 최대 ${maxProblems}개 문제 (현재 모듈: ${moduleProblemsBefore}개)`);
  }
  // ============================================================================
  
  const seenSignatures = new Set();
  let consecutiveDuplicates = 0;
  const maxConsecutiveDuplicates = 3;
  let consecutiveExtractFailures = 0;
  const maxExtractRetries = 5;

  // 루프 조건: TEMP 모드가 아니면 현재 모듈에서 정확히 27개까지 수집 (27번 문제 포함)
  // BUG FIX: targetArray.length가 아닌 현재 모듈의 문제 수를 기준으로 루프 조건 설정
  // BUG FIX: Module 2에서는 progress 증가 확인 시 consecutiveDuplicates 체크 완화
  let lastProgressState = null;
  while ((TEMP_MODE ? collectedNumbers.size < targetNumbers.size : targetArray.filter(p => p.module === moduleNumber).length < maxProblems) && (moduleNumber === 2 ? true : consecutiveDuplicates < maxConsecutiveDuplicates)) {
    // STEP 3: TEMP 모드 체크는 문제 push 후에 수행 (아래로 이동)
    // 현재 문제 화면 확인
    const isQuestion = isQuestionScreen();
    const progressState = getProgressState();
    const bodyText = (document.body.innerText || document.body.textContent || '').substring(0, 200);
    
    // BUG FIX: Module 2에서 progress 상태 추적 초기화
    if (lastProgressState === null) {
      lastProgressState = progressState;
    }
    
    // BUG FIX: Module 2에서 progress 상태 추적 초기화
    if (lastProgressState === null) {
      lastProgressState = progressState;
    }
    
    // #region agent log
    const moduleProblemsCount = targetArray.filter(p => p.module === moduleNumber).length;
    const loopCondition = TEMP_MODE ? collectedNumbers.size < targetNumbers.size : moduleProblemsCount < maxProblems;
    const allProblems = targetArray.map(p => ({module: p.module, problemNumber: p.problemNumber}));
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:loopStart',message:'collectModuleProblems loop start',data:{targetArrayLength:targetArray.length,moduleProblemsCount,maxProblems,loopCondition,consecutiveDuplicates,maxConsecutiveDuplicates,isQuestion,progressState,bodyText,moduleName,moduleNumber,allProblems},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    
    if (!isQuestion) {
      console.warn(`[FLOW] 문제 화면이 아닙니다. 대기 중...`);
      await waitForCondition(() => isQuestionScreen(), CONFIG.timeouts.screenTransition);
      if (!isQuestionScreen()) {
        console.warn(`[FLOW] 문제 화면을 찾을 수 없습니다. 수집 종료.`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:questionScreenNotFound',message:'question screen not found, breaking',data:{targetArrayLength:targetArray.length,bodyText:(document.body.innerText||'').substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        break;
      }
    }
    
    // 현재 문제 번호 확인 (여러 번 읽어서 정확도 향상)
    let currentProblemNum = getCurrentProblemNumber();
    const progressStateCheck = getProgressState();
    
    // 문제 번호가 0이거나 없으면 Progress에서 다시 읽기
    if (!currentProblemNum || currentProblemNum <= 0) {
      if (progressStateCheck) {
        const progressMatch = progressStateCheck.match(/(\d+)\s*\/\s*\d+/);
        if (progressMatch) {
          currentProblemNum = parseInt(progressMatch[1]);
          console.log(`[FLOW] 문제 번호를 Progress에서 추출: ${currentProblemNum}`);
        }
      }
    }
    
    // 문제 번호를 다시 한 번 확인 (DOM이 업데이트되었을 수 있음)
    await new Promise(resolve => setTimeout(resolve, 120));
    const retryProblemNum = getCurrentProblemNumber();
    if (retryProblemNum > 0 && retryProblemNum !== currentProblemNum) {
      console.log(`[FLOW] 문제 번호 재확인: ${currentProblemNum} → ${retryProblemNum}`);
      currentProblemNum = retryProblemNum;
    }
    
    console.log(`[FLOW] 현재 문제: ${currentProblemNum}, Progress: ${progressStateCheck}`);
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:problemNumberCheck',message:'problem number check',data:{currentProblemNum,progressState:progressStateCheck,targetArrayLength:targetArray.length,isQuestionScreen:isQuestionScreen(),bodyText:(document.body.innerText||'').substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    
    // TEMP 모드: 원하는 번호가 아니면 수집하지 않고 다음으로 이동 (강제)
    if (TEMP_MODE && targetNumbers) {
      if (!currentProblemNum || currentProblemNum <= 0) {
        console.error(`[TEMP] ✗ 문제 번호를 읽을 수 없습니다 (${currentProblemNum}). 다음으로 이동합니다.`);
        const beforeProblemNum = 0;
        const moved = await clickNextButtonWithFallback(beforeProblemNum);
        if (!moved) {
          console.warn(`[FLOW] 다음 문제로 이동 실패. 수집 종료.`);
          break;
        }
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        continue;
      }
      
      if (!targetNumbers.has(currentProblemNum)) {
        console.error(`[TEMP] ✗ 문제 번호 ${currentProblemNum}는 수집 대상이 아닙니다! 다음으로 이동합니다.`);
        console.error(`[TEMP] 수집 대상: ${Array.from(targetNumbers).join(', ')}, 이미 수집: ${Array.from(collectedNumbers).join(', ')}`);
        
        // 다음 문제로 이동
        const beforeProblemNum = currentProblemNum;
        const moved = await clickNextButtonWithFallback(beforeProblemNum);
        
        if (!moved) {
          console.warn(`[FLOW] 다음 문제로 이동 실패. 수집 종료.`);
          break;
        }
        
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        continue; // 수집하지 않고 다음 루프로
      }
    }
    
    // 문제 시그니처 생성 (중복 확인용)
    // BUG FIX: Module 2에서는 (module, problemNumber) 조합으로 시그니처 생성
    const baseSignature = getQuestionSignature();
    const signature = moduleNumber === 2 ? `${moduleNumber}-${currentProblemNum}-${baseSignature}` : baseSignature;
    
    // #region agent log
    const beforeProgressState = getProgressState();
    const beforeProblemNum = getCurrentProblemNumber();
    // BUG FIX: Module 2에서 progress 상태 업데이트
    if (moduleNumber === 2 && beforeProgressState !== lastProgressState) {
      lastProgressState = beforeProgressState;
    }
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:signatureCheck',message:'checking problem signature for duplicates',data:{baseSignature,signature,moduleNumber,currentProblemNum,beforeProblemNum,seenSignatures:Array.from(seenSignatures),consecutiveDuplicates,isDuplicate:seenSignatures.has(signature),beforeProgressState,lastProgressState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    
    if (seenSignatures.has(signature)) {
      console.warn(`[FLOW] 중복 문제 감지: ${signature} (모듈: ${moduleNumber}, 문제: ${currentProblemNum})`);
      consecutiveDuplicates++;
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:duplicateDetected',message:'duplicate problem detected, incrementing consecutiveDuplicates',data:{signature,moduleNumber,currentProblemNum,consecutiveDuplicates,maxConsecutiveDuplicates,reason:'signature already seen',beforeProgressState,lastProgressState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
      
      // BUG FIX: Module 2에서 progress 증가 확인 시 consecutiveDuplicates 리셋
      if (moduleNumber === 2) {
        const currentProgressState = getProgressState();
        const currentProblemNumFromProgress = getCurrentProblemNumber();
        // Module 2에서 progress가 증가했으면 consecutiveDuplicates 리셋
        if (lastProgressState !== currentProgressState && currentProblemNumFromProgress > 0) {
          console.log(`[FLOW] Module 2: progress 변화 감지 (${lastProgressState} → ${currentProgressState}), consecutiveDuplicates 리셋`);
          consecutiveDuplicates = 0;
          lastProgressState = currentProgressState;
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:module2ProgressChange',message:'Module 2: progress changed, resetting consecutiveDuplicates',data:{lastProgressState,currentProgressState,currentProblemNumFromProgress,consecutiveDuplicates:0,moduleNumber},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
          // #endregion
          // 새로운 시그니처로 추가하고 계속 진행
          seenSignatures.add(signature);
          continue; // 다음 루프로 계속 진행
        }
      }
      
      if (consecutiveDuplicates >= maxConsecutiveDuplicates) {
        console.warn(`[FLOW] 연속 중복 ${maxConsecutiveDuplicates}회. 수집 종료.`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:breakConsecutiveDuplicates',message:'BREAK: consecutive duplicates exceeded',data:{reason:'consecutiveDuplicatesExceeded',currentProblemNum,moduleProblemsCount:targetArray.filter(p => p.module === moduleNumber).length,consecutiveDuplicates,maxConsecutiveDuplicates,progressState:getProgressState(),isQuestion:isQuestionScreen(),signature,moduleNumber,lastProgressState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
        // #endregion
        break;
      }
    } else {
      consecutiveDuplicates = 0;
      seenSignatures.add(signature);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:newSignature',message:'new signature detected, resetting consecutiveDuplicates',data:{signature,moduleNumber,currentProblemNum,consecutiveDuplicates:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
    }
    
    // TEMP 모드: 이미 수집한 번호면 스킵
    if (TEMP_MODE && collectedNumbers.has(currentProblemNum)) {
      console.log(`[TEMP] 문제 번호 ${currentProblemNum}는 이미 수집했습니다. 다음으로 이동합니다.`);
      
      const beforeProblemNum = currentProblemNum;
      const moved = await clickNextButtonWithFallback(beforeProblemNum);
      
      if (!moved) {
        console.warn(`[FLOW] 다음 문제로 이동 실패. 수집 종료.`);
        break;
      }
      
      await waitForContentLoad(CONFIG.timeouts.screenTransition);
      continue;
    }
    
    // 이미 채점된 상태인지 확인
    const alreadyGraded = isGraded();
    
    // BUG FIX: 27번 문제는 제출 전에 문제 추출 (화면 전환 전에)
    const isLastProblem = currentProblemNum === maxProblems;
    
    // BUG FIX: 27번 문제는 제출 전에 문제 추출 (화면 전환 전에)
    let problem = null;
    if (isLastProblem && !alreadyGraded) {
      console.log(`[FLOW] 27번 문제 감지: 제출 전에 문제 추출 중...`);
      // #region agent log
      const beforeExtractProblemNum = getCurrentProblemNumber();
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:extract27BeforeSubmit',message:'extracting problem 27 before submit',data:{currentProblemNum,maxProblems,beforeExtractProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      problem = await extractCurrentProblem(sectionType);
      // BUG FIX: 27번 문제는 무조건 27로 강제 설정 (extractCurrentProblem이 1을 반환할 수 있음)
      if (problem) {
        problem.problemNumber = currentProblemNum; // 무조건 currentProblemNum(27)로 설정
        console.log(`[FLOW] 27번 문제 번호 강제 설정: ${currentProblemNum} (extractCurrentProblem 결과: ${problem.problemNumber})`);
      }
      // #region agent log
      const afterExtractProblemNum = getCurrentProblemNumber();
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:extract27BeforeSubmitDone',message:'extracted problem 27 before submit',data:{problemNumber:problem?.problemNumber,currentProblemNum,beforeExtractProblemNum,afterExtractProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
    }
    
    // 정답과 해설 변수 선언 (블록 밖에서 선언하여 스코프 문제 해결)
    let correctAnswer = null;
    let explanation = '';
    
    // 선택지 클릭 및 채점 (정답 추출을 위해 필수)
    // TEMP_MODE에서도 정답 추출을 위해 선택지 클릭 → submit → grading 필요
    // BUG FIX: 27번 문제는 제출 전에 문제 추출 + 정답 추출 (선택지 클릭 직후, 제출 전)
    // 이유: 제출 시 화면 전환이 즉시 발생하여 제출 후에는 정답 DOM이 사라짐
    if (!alreadyGraded) {
      // 선지 선택 구간이 너무 빨리 지나가지 않도록 대기 (특히 사진 있는 문제)
      const hasImage = currentProblemHasImage();
      const beforeMs = hasImage ? CONFIG.timeouts.beforeChoiceClickWithImage : CONFIG.timeouts.beforeChoiceClick;
      console.log(`[FLOW] 선지 클릭 전 대기 ${beforeMs}ms${hasImage ? ' (이미지 있음)' : ''}...`);
      await new Promise(resolve => setTimeout(resolve, beforeMs));

      // 선택지 클릭 (A)
      console.log(`[FLOW] 선택지 클릭 중...`);
      const clicked = await clickFirstChoice(sectionType);
      if (!clicked) {
        console.warn(`[FLOW] 선택지 클릭 실패. 다음 문제로 이동 시도.`);
      } else {
        console.log(`[FLOW] ✓ 선택지 클릭 성공`);
        // 선지 클릭 후 제출 전 대기 (다음 선지 구간이 너무 빨리 지나가지 않도록)
        const afterMs = hasImage ? CONFIG.timeouts.afterChoiceClickWithImage : CONFIG.timeouts.afterChoiceClick;
        console.log(`[FLOW] 선지 클릭 후 제출 전 대기 ${afterMs}ms${hasImage ? ' (이미지 있음)' : ''}...`);
        await new Promise(resolve => setTimeout(resolve, afterMs));
      }

      // BUG FIX: 27번 문제는 제출 전에 정답 추출 (선택지 클릭 시 즉시 채점됨)
      if (isLastProblem && clicked) {
        console.log(`[FLOW] 27번: 제출 전에 정답 추출 (화면 전환 전)...`);
        await new Promise(resolve => setTimeout(resolve, 120));
        correctAnswer = detectCorrectAnswer();
        explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
        if (correctAnswer) {
          console.log(`[FLOW] ✓ 27번 문제 정답 추출 성공 (제출 전): ${correctAnswer}`);
        }
      }
      
      // 제출
      console.log(`[FLOW] 제출 버튼 클릭 중...`);
      // BUG FIX: 27번은 확인 버튼 클릭 직후(화면 전환 전)에 정답을 캡처하도록 콜백 전달
      const onAfterConfirm = isLastProblem ? async () => {
        console.log('[FLOW] 27번: 확인 클릭 직후 정답 폴링 시작...');
        const deadline = Date.now() + 3000;
        while (Date.now() < deadline && !correctAnswer) {
          const polled = detectCorrectAnswer();
          if (polled) {
            correctAnswer = polled;
            explanation = extractExplanationAfterGrading(polled, currentProblemNum) || '';
            console.log(`[FLOW] 27번: 확인 직후 정답 확보 → ${polled}`);
            fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:lastProblemOnConfirm',message:'27 answer captured in onAfterConfirm',data:{currentProblemNum,polled},timestamp:Date.now(),runId:'run1',hypothesisId:'K'})}).catch(()=>{});
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } : undefined;
      const submitted = await clickSubmitWithConfirmation(onAfterConfirm);
      if (!submitted) {
        console.warn(`[FLOW] 제출 실패. 다음 문제로 이동 시도.`);
      } else {
        console.log(`[FLOW] ✓ 제출 성공`);
      }
      
      // 채점 대기 (27번은 onAfterConfirm에서 이미 정답 확보했으면 스킵)
      console.log(`[FLOW] 채점 대기 중...`);
      let gradingResult = !!correctAnswer;
      if (!gradingResult) {
        gradingResult = await waitForGrading(1500);
      }
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterGrading',message:'after grading wait',data:{gradingResult,isLastProblem,currentProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      
      if (!gradingResult) {
        console.warn(`[FLOW] 채점 완료 대기 실패. 다음 문제로 이동 시도.`);
        // BUG FIX: 27번 문제는 채점 실패해도 정답 추출 시도 (이미 선택지 클릭했으므로)
        if (isLastProblem) {
          console.log(`[FLOW] 27번 문제: 채점 대기 실패했지만 정답 추출 시도...`);
          await new Promise(resolve => setTimeout(resolve, 50));
          correctAnswer = detectCorrectAnswer();
          explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
          if (correctAnswer) {
            console.log(`[FLOW] ✓ 27번 문제 정답 추출 성공 (채점 대기 실패 후): ${correctAnswer}`);
          }
        }
      } else {
        console.log(`[FLOW] ✓ 채점 완료`);
        
        // 채점 완료 후 정답 표시가 DOM에 완전히 반영될 때까지 추가 대기
        console.log(`[FLOW] 정답 표시 DOM 반영 대기 중...`);
        await new Promise(resolve => setTimeout(resolve, 120)); // DOM 반영 대기
        
        // 정답 표시가 실제로 나타났는지 재확인
        let retryCount = 0;
        let answerMarkingFound = false;
        while (retryCount < 5) {
          const satRoot = findSatRoot();
          if (satRoot) {
            const hasAnswerMarking = satRoot.querySelector('[class*="answered-correct"], [class*="answered-incorrect"], [aria-label*="Correct" i], [aria-label*="Incorrect" i]');
            if (hasAnswerMarking) {
              console.log(`[FLOW] ✓ 정답 표시 확인됨 (재시도 ${retryCount + 1}/5)`);
              answerMarkingFound = true;
              break;
            }
          }
          await new Promise(resolve => setTimeout(resolve, 120));
          retryCount++;
        }
        
        // 정답 표시가 확인되면 즉시 정답 추출 (DOM이 변경되기 전에)
        if (answerMarkingFound) {
          console.log(`[FLOW] 정답 추출 시도 중 (채점 직후)...`);
          // #region agent log
          const beforeExtractProblemNum = getCurrentProblemNumber();
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:beforeExtract',message:'before extracting answer and explanation',data:{currentProblemNum,beforeExtractProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          correctAnswer = detectCorrectAnswer();
          const beforeExplanationProblemNum = getCurrentProblemNumber();
          explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
          // #region agent log
          const afterExtractProblemNum = getCurrentProblemNumber();
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterExtract',message:'after extracting answer and explanation',data:{currentProblemNum,afterExtractProblemNum,beforeExplanationProblemNum,correctAnswer,explanationLength:explanation.length,explanationPreview:explanation.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          
          if (correctAnswer) {
            console.log(`[FLOW] ✓ 정답 추출 성공: ${correctAnswer}`);
          } else {
            console.warn(`[FLOW] ✗ 정답 추출 실패 (채점 직후 시도)`);
            // 추가 대기 후 재시도
            await new Promise(resolve => setTimeout(resolve, 120));
            // #region agent log
            const retryProblemNum = getCurrentProblemNumber();
            fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:retryExtract',message:'retrying answer extraction',data:{currentProblemNum,retryProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            correctAnswer = detectCorrectAnswer();
            const beforeRetryExplanationProblemNum = getCurrentProblemNumber();
            explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
            // #region agent log
            const afterRetryProblemNum = getCurrentProblemNumber();
            fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterRetryExtract',message:'after retry extraction',data:{currentProblemNum,afterRetryProblemNum,beforeRetryExplanationProblemNum,correctAnswer,explanationLength:explanation.length,explanationPreview:explanation.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            if (correctAnswer) {
              console.log(`[FLOW] ✓ 정답 추출 성공 (재시도): ${correctAnswer}`);
            }
          }
        }
      }
    } else {
      console.log(`[FLOW] 이미 채점된 상태입니다.`);
      // 이미 채점된 상태에서도 정답 추출 시도
      correctAnswer = detectCorrectAnswer();
      const beforeAlreadyGradedExplanationProblemNum = getCurrentProblemNumber();
      explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:alreadyGradedExtract',message:'extracting from already graded state',data:{currentProblemNum,beforeAlreadyGradedExplanationProblemNum,correctAnswer,explanationLength:explanation.length,explanationPreview:explanation.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // BUG FIX: 모듈 2 문제 1 - isGraded가 오탐할 수 있음 (신규 화면). 정답 없으면 클릭 경로 재시도
      if (!correctAnswer && moduleNumber === 2 && currentProblemNum === 1) {
        console.log(`[FLOW] 모듈 2 문제 1: 이미 채점 판별했으나 정답 없음. 선택지 클릭 경로 재시도...`);
        const retryClicked = await clickFirstChoice(sectionType);
        if (retryClicked) {
          await new Promise(resolve => setTimeout(resolve, 120));
          correctAnswer = detectCorrectAnswer();
          explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
          if (correctAnswer) {
            console.log(`[FLOW] ✓ 모듈 2 문제 1 정답 추출 성공 (재시도): ${correctAnswer}`);
          }
        }
      }
    }
    
    // STEP 4: 문제 추출 (답변 실패와 분리)
    // BUG FIX: 27번 문제는 이미 제출 전에 추출했으므로 스킵
    let problemExtracted = false;
    
    if (!problem) {
      // 27번 문제가 아니면 일반적으로 문제 추출
      console.log(`[FLOW] 문제 추출 중...`);
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:beforeExtractCurrentProblem',message:'math image extract debug: before extract',data:{sectionType,currentProblemNum,isLastProblem},timestamp:Date.now(),hypothesisId:'H5'})}).catch(()=>{});
      // #endregion
      problem = await extractCurrentProblem(sectionType);
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterExtractCurrentProblem',message:'math image extract debug: after extract',data:{sectionType,currentProblemNum,problemNull:problem===null,figuresLength:problem?.figures?.length??'n/a'},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
    } else {
      console.log(`[FLOW] 27번 문제는 이미 추출했습니다.`);
      // 27번 문제는 이미 추출했으므로 정답 추출 시도 (채점 완료 여부와 관계없이)
        if (isLastProblem && !correctAnswer) {
        console.log(`[FLOW] 27번 문제: 정답 추출 재시도 중...`);
        await new Promise(resolve => setTimeout(resolve, 50)); // 화면 전환 대기
        correctAnswer = detectCorrectAnswer();
        explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || '';
        if (correctAnswer) {
          console.log(`[FLOW] ✓ 27번 문제 정답 추출 성공: ${correctAnswer}`);
        }
      }
    }
    
    if (problem) {
      consecutiveExtractFailures = 0; // 추출 성공 시 리셋
      // ============================================================================
      // STEP 1 추가 보강: problemNumber 최종 확인 및 강제 주입
      // ============================================================================
      if (!problem.problemNumber || problem.problemNumber <= 0) {
        // currentProblemNum 우선 사용
        if (currentProblemNum > 0) {
          problem.problemNumber = currentProblemNum;
          console.log(`[SAT-DEBUG] [collectModuleProblems] problemNumber을 currentProblemNum으로 설정: ${currentProblemNum}`);
        } else {
          // Progress에서 추출
          const progressState = getProgressState();
          if (progressState) {
            const progressMatch = progressState.match(/(\d+)\s*\/\s*\d+/);
            if (progressMatch) {
              problem.problemNumber = parseInt(progressMatch[1]);
              console.log(`[SAT-DEBUG] [collectModuleProblems] problemNumber을 Progress에서 추출: ${problem.problemNumber}`);
            }
          }
          // 최후의 폴백: index + 1
          if (!problem.problemNumber || problem.problemNumber <= 0) {
            problem.problemNumber = targetArray.length + 1;
            console.warn(`[SAT-DEBUG] [collectModuleProblems] problemNumber 최후 폴백: index 기반 → ${problem.problemNumber}`);
          }
        }
      }
      
      // 최종 문제 번호 확인
      // BUG FIX: 27번 문제는 무조건 27로 강제 설정 (화면 전환으로 인한 오인식 방지)
      let finalProblemNum = problem.problemNumber || currentProblemNum;
      if (isLastProblem && finalProblemNum !== currentProblemNum) {
        console.warn(`[FLOW] 27번 문제 번호 오인식 감지: ${finalProblemNum} → ${currentProblemNum}로 강제 수정`);
        finalProblemNum = currentProblemNum;
        problem.problemNumber = currentProblemNum;
      }
      console.log(`[FLOW] 추출된 문제 번호: ${finalProblemNum} (currentProblemNum: ${currentProblemNum}, problem.problemNumber: ${problem.problemNumber})`);
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:finalProblemNum',message:'final problem number check',data:{finalProblemNum,currentProblemNum,problemProblemNumber:problem.problemNumber,isLastProblem},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      
      // TEMP 모드: 최종 문제 번호가 targetNumbers에 없으면 수집하지 않음
      if (TEMP_MODE && targetNumbers && !targetNumbers.has(finalProblemNum)) {
        console.warn(`[TEMP] ✗ 문제 번호 ${finalProblemNum}는 수집 대상이 아닙니다. 수집하지 않고 다음으로 이동합니다.`);
        console.warn(`[TEMP] 수집 대상: ${Array.from(targetNumbers).join(', ')}, 이미 수집: ${Array.from(collectedNumbers).join(', ')}`);
        
        // 다음 문제로 이동
        const beforeProblemNum = finalProblemNum > 0 ? finalProblemNum : currentProblemNum;
        const moved = await clickNextButtonWithFallback(beforeProblemNum);
        
        if (!moved) {
          console.warn(`[FLOW] 다음 문제로 이동 실패. 수집 종료.`);
          break;
        }
        
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        continue; // 수집하지 않고 다음 루프로
      }
      
      // TEMP 모드: 이미 수집한 번호면 스킵
      if (TEMP_MODE && collectedNumbers.has(finalProblemNum)) {
        console.warn(`[TEMP] ✗ 문제 번호 ${finalProblemNum}는 이미 수집했습니다. 수집하지 않고 다음으로 이동합니다.`);
        
        const beforeProblemNum = finalProblemNum;
        const moved = await clickNextButtonWithFallback(beforeProblemNum);
        
        if (!moved) {
          console.warn(`[FLOW] 다음 문제로 이동 실패. 수집 종료.`);
          break;
        }
        
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        continue;
      }
      
      // ============================================================================
      
      problem.module = moduleNumber;
      
      // #region agent log - DEBUG STEP 3: collectModuleProblems에서 problem.figures 검증
      console.log(`[DEBUG STEP 3] collectModuleProblems: 문제 ${finalProblemNum} push 직전, problem.figures=${problem.figures ? problem.figures.length : 'undefined'}`);
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:beforePush',message:'DEBUG STEP 3: collectModuleProblems에서 problem.figures 검증',data:{finalProblemNum,hasFigures:!!problem.figures,figuresLength:problem.figures?problem.figures.length:0,figures:problem.figures?problem.figures.map(f=>({w:f.width,h:f.height,hasDataUrl:!!f.dataUrl})):null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      targetArray.push(problem);
      problemExtracted = true;
      
      // TEMP 모드: 수집된 번호 추적 (최종 문제 번호 사용)
      if (TEMP_MODE && finalProblemNum > 0) {
        collectedNumbers.add(finalProblemNum);
        console.log(`[TEMP] ✓ 문제 번호 ${finalProblemNum} 수집 완료`);
      }
      
      const collectedCount = targetArray.length;
      const moduleCollectedCount = targetArray.filter(p => p.module === moduleNumber).length;
      console.log(`[FLOW] 문제 ${collectedCount} 수집 완료: ${finalProblemNum} (현재 모듈: ${moduleCollectedCount}개)`);
      
      // #region agent log
      const shouldBreakFor27 = !TEMP_MODE && finalProblemNum === maxProblems && moduleCollectedCount >= maxProblems;
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterPush',message:'after pushing problem to array',data:{collectedCount,moduleCollectedCount,finalProblemNum,maxProblems,shouldBreakFor27,TEMP_MODE,moduleNumber},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      
      // TEMP 모드가 아닌 경우, 27번 문제 수집 후에도 정답/해설 할당 로직을 먼저 실행한 뒤 루프를 종료한다.
      if (!TEMP_MODE && shouldBreakFor27) {
        console.log('[FLOW] 27번 문제 수집 완료 - 정답/해설 할당 후 루프 종료 예정');
      }
      
      if (TEMP_MODE) {
        console.log(`[TEMP] 수집된 문제 번호: ${Array.from(collectedNumbers).sort((a, b) => a - b).join(', ')}`);
        // TEMP 모드: 모든 대상 번호를 수집했으면 즉시 종료
        if (collectedNumbers.size >= targetNumbers.size) {
          console.log(`[TEMP] 모든 대상 문제 수집 완료 (${Array.from(collectedNumbers).sort((a, b) => a - b).join(', ')}). 즉시 종료합니다.`);
          return collectedCount;
        }
      }
    } else {
      console.warn(`[FLOW] 문제 추출 실패. 다음 문제로 넘어가지 않고 재시도합니다.`);
    }

    // extract가 아직 안 되었으면 다음 문제로 넘어가지 않음
    if (!problem) {
      consecutiveExtractFailures++;
      if (consecutiveExtractFailures >= maxExtractRetries) {
        console.warn(`[FLOW] 문제 추출 연속 ${maxExtractRetries}회 실패. 수집 종료.`);
        break;
      }
      console.log(`[FLOW] 추출 재시도 대기 후 같은 문제 다시 시도 (${consecutiveExtractFailures}/${maxExtractRetries})...`);
      await new Promise(resolve => setTimeout(resolve, 800));
      continue;
    }

    // STEP 4: 정답/해설 할당 (이미 채점 직후에 추출한 결과 사용)
    if (problemExtracted && problem) {
      const assignmentProblemNum = problem.problemNumber || currentProblemNum;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:beforeAssignment',message:'before assigning answer and explanation',data:{assignmentProblemNum,currentProblemNum,correctAnswer,explanationLength:explanation.length,explanationPreview:explanation.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      if (correctAnswer) {
        problem.correctAnswer = correctAnswer;
        problem.explanation = explanation || '';
        console.log(`[FLOW] 정답/해설 할당 완료: ${correctAnswer} (문제 번호: ${problem.problemNumber || currentProblemNum})`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterAssignment',message:'after assigning answer and explanation',data:{assignmentProblemNum,currentProblemNum,correctAnswer,explanationLength:problem.explanation.length,explanationPreview:problem.explanation.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      } else {
        // 정답 추출이 실패했지만, 다시 한 번 시도
        const retryProblemNum = problem.problemNumber || currentProblemNum;
        console.warn(`[FLOW] 정답 추출 실패. 재시도 중... (문제 번호: ${retryProblemNum})`);
        const retryAnswer = detectCorrectAnswer();
        const retryExplanation = extractExplanationAfterGrading(retryAnswer, retryProblemNum) || '';
        
        if (retryAnswer) {
          problem.correctAnswer = retryAnswer;
          problem.explanation = retryExplanation;
          console.log(`[FLOW] ✓ 정답 추출 성공 (재시도): ${retryAnswer}`);
          // #region agent log
          const retryAssignmentProblemNum = problem.problemNumber || currentProblemNum;
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterRetryAssignment',message:'after retry assignment',data:{retryAssignmentProblemNum,currentProblemNum,retryAnswer,explanationLength:problem.explanation.length,explanationPreview:problem.explanation.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
        } else {
          problem.correctAnswer = '';
          problem.explanation = retryExplanation || '';
          console.warn(`[FLOW] ✗ 정답 추출 최종 실패 (문제 번호: ${problem.problemNumber || currentProblemNum})`);
        }
      }
    }
    
    // 27번 문제에 대해 정답/해설까지 모두 할당이 끝난 뒤에만 루프를 종료한다.
    if (!TEMP_MODE && problemExtracted && problem && problem.problemNumber === maxProblems) {
      const moduleCollectedCountAfterAssign = targetArray.filter(p => p.module === moduleNumber).length;
      if (moduleCollectedCountAfterAssign >= maxProblems) {
        console.log(`[FLOW] 27번 문제 정답/해설 할당 완료 후 루프 종료 (모듈 ${moduleNumber}, 수집 개수: ${moduleCollectedCountAfterAssign})`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:breakFor27AfterAssign',message:'breaking loop after assigning problem 27',data:{moduleNumber,moduleCollectedCount:moduleCollectedCountAfterAssign,problemNumber:problem.problemNumber},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
        // #endregion
        break;
      }
    }
    
    // TEMP 모드: 모든 대상 번호를 수집했으면 다음으로 이동하지 않음
    if (TEMP_MODE && collectedNumbers.size >= targetNumbers.size) {
      console.log(`[TEMP] 모든 대상 문제 수집 완료. 다음 문제로 이동하지 않습니다.`);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:tempModeComplete',message:'TEMP mode complete, breaking loop',data:{collectedNumbers:Array.from(collectedNumbers),targetNumbers:Array.from(targetNumbers || [])},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      break;
    }
    
    // 다음 문제로 이동
    const problemNumBeforeNext = getCurrentProblemNumber();
    console.log(`[FLOW] 다음 문제로 이동 중... (현재: ${problemNumBeforeNext})`);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:beforeNext',message:'before moving to next problem',data:{problemNumBeforeNext,currentProblemNum,collectedNumbers:Array.from(collectedNumbers),targetArrayLength:targetArray.length,maxProblems,TEMP_MODE},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    
    // TEMP 모드: 정확히 +1씩만 이동하도록 강제 확인
    let nextAttempts = 0;
    const maxNextAttempts = 5;
    let correctNext = false;
    let afterProblemNum = problemNumBeforeNext; // 루프 밖에서 선언 (break 시 ReferenceError 방지)
    
    while (!correctNext && nextAttempts < maxNextAttempts) {
      nextAttempts++;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:clickNextAttempt',message:'attempting to click next button',data:{problemNumBeforeNext,nextAttempts,maxNextAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      const moved = await clickNextButtonWithFallback(problemNumBeforeNext);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterClickNext',message:'after clicking next button',data:{problemNumBeforeNext,moved,nextAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      
      if (!moved) {
        console.warn(`[FLOW] 다음 문제로 이동 실패 (시도 ${nextAttempts}/${maxNextAttempts}). 수집 종료.`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:nextFailed',message:'next button click failed',data:{problemNumBeforeNext,nextAttempts,maxNextAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        break;
      }
      
      // 화면 전환 대기
      await waitForContentLoad(CONFIG.timeouts.screenTransition);
      
      // 문제 번호가 정확히 +1 증가했는지 확인 (여러 번 읽어서 정확도 향상)
      await new Promise(resolve => setTimeout(resolve, 120)); // DOM 업데이트 대기
      afterProblemNum = getCurrentProblemNumber();
      
      // Progress에서도 확인
      const afterProgress = getProgressState();
      if (afterProgress) {
        const progressMatch = afterProgress.match(/(\d+)\s*\/\s*\d+/);
        if (progressMatch) {
          const progressNum = parseInt(progressMatch[1]);
          if (progressNum > 0 && (progressNum !== afterProblemNum || afterProblemNum <= 0)) {
            console.log(`[FLOW] 문제 번호를 Progress에서 재확인: ${afterProblemNum} → ${progressNum}`);
            afterProblemNum = progressNum;
          }
        }
      }
      
      console.log(`[FLOW] Next 클릭 후 문제 번호: ${problemNumBeforeNext} → ${afterProblemNum}`);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterNextCheck',message:'checking problem number after next click',data:{problemNumBeforeNext,afterProblemNum,expectedNext:problemNumBeforeNext+1,correctNext:afterProblemNum===problemNumBeforeNext+1,moduleNumber},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      
      if (afterProblemNum === problemNumBeforeNext + 1) {
        // 정확히 +1 증가 - 성공
        correctNext = true;
        console.log(`[FLOW] ✓ 정확히 +1 증가 확인: ${problemNumBeforeNext} → ${afterProblemNum}`);
        
        // BUG FIX: Module 2에서 progress 증가 확인 시 consecutiveDuplicates 리셋
        if (moduleNumber === 2) {
          const newProgressState = getProgressState();
          console.log(`[FLOW] Module 2: progress 증가 확인 (${lastProgressState} → ${newProgressState}), consecutiveDuplicates 리셋`);
          consecutiveDuplicates = 0;
          lastProgressState = newProgressState;
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:module2ProgressReset',message:'Module 2: progress increased, resetting consecutiveDuplicates',data:{problemNumBeforeNext,afterProblemNum,consecutiveDuplicates:0,moduleNumber,lastProgressState,newProgressState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
          // #endregion
        }
        
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:nextSuccess',message:'successfully moved to next problem',data:{problemNumBeforeNext,afterProblemNum,moduleNumber,consecutiveDuplicates},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        break;
      } else if (afterProblemNum > problemNumBeforeNext + 1) {
        // 점프 발생!
        console.error(`[FLOW] ✗ 점프 탐지! ${problemNumBeforeNext} → ${afterProblemNum} (예상: ${problemNumBeforeNext + 1})`);
        
        // TEMP 모드: 놓친 번호 확인
        if (TEMP_MODE && targetNumbers) {
          const missedNumbers = [];
          for (let num = problemNumBeforeNext + 1; num < afterProblemNum; num++) {
            if (targetNumbers.has(num) && !collectedNumbers.has(num)) {
              missedNumbers.push(num);
            }
          }
          
          if (missedNumbers.length > 0) {
            console.warn(`[TEMP] 놓친 문제 번호: ${missedNumbers.join(', ')}`);
            
            // Previous 버튼 찾기 및 되돌리기 시도
            const previousButton = findNavigationButton('previous', '이전', 'prev', 'back');
            if (previousButton && !previousButton.disabled) {
              const jumpSize = afterProblemNum - problemNumBeforeNext;
              console.log(`[TEMP] Previous 버튼 발견. ${jumpSize - 1}번 되돌리기 시도...`);
              
              for (let i = 0; i < jumpSize - 1; i++) {
                previousButton.click();
                await new Promise(resolve => setTimeout(resolve, 50));
                await waitForContentLoad(CONFIG.timeouts.screenTransition);
              }
              
              // 되돌린 후 문제 번호 확인
              const afterBackNum = getCurrentProblemNumber();
              console.log(`[TEMP] 되돌리기 후 문제 번호: ${afterProblemNum} → ${afterBackNum}`);
              
              if (afterBackNum === problemNumBeforeNext + 1) {
                // 정확히 되돌림 성공
                correctNext = true;
                console.log(`[TEMP] ✓ 되돌리기 성공! 정확히 ${problemNumBeforeNext + 1}번 문제로 이동`);
                break;
              } else {
                console.warn(`[TEMP] 되돌리기 실패. 다시 Next 클릭 시도...`);
                // 다시 Next 클릭 시도
                continue;
              }
            } else {
              console.warn(`[TEMP] Previous 버튼을 찾을 수 없습니다. 재시도...`);
              // Previous가 없으면 재시도
              continue;
            }
          }
        } else {
          // TEMP 모드가 아니면 재시도
          console.warn(`[FLOW] 점프 발생. 재시도 ${nextAttempts}/${maxNextAttempts}...`);
          continue;
        }
      } else if (afterProblemNum <= problemNumBeforeNext) {
        // 문제 번호가 증가하지 않았거나 감소함
        console.warn(`[FLOW] 문제 번호가 증가하지 않음: ${problemNumBeforeNext} → ${afterProblemNum}. 재시도...`);
        await new Promise(resolve => setTimeout(resolve, 120));
        continue;
      }
    }
    
    if (!correctNext) {
      console.error(`[FLOW] Next 클릭 실패: 정확히 +1 증가하지 못함 (시도 ${nextAttempts}회). 수집 종료.`);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:nextFailed',message:'next button click failed, breaking loop',data:{problemNumBeforeNext,afterProblemNum,nextAttempts,targetArrayLength:targetArray.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
      // #endregion
      break;
    }
    
    // 27번 문제까지 수집 확인: 현재 문제 번호가 27이고 이미 수집했는지 확인
    if (!TEMP_MODE && afterProblemNum === maxProblems) {
      // 27번 문제를 방금 수집했는지 확인
      const lastProblem = targetArray[targetArray.length - 1];
      const has27 = lastProblem && lastProblem.problemNumber === maxProblems;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:check27AfterNext',message:'checking if problem 27 collected after next click',data:{afterProblemNum,maxProblems,has27,lastProblemNumber:lastProblem?.problemNumber,targetArrayLength:targetArray.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      if (has27) {
        console.log(`[FLOW] 27번 문제 수집 완료 확인. 루프 종료 준비 중...`);
        // 다음 루프에서 종료되도록 하기 위해 추가 확인은 하지 않음
      }
    }
    
    // STEP 3: TEMP 모드에서는 모듈 완료 검증 스킵
    // (원래 코드는 유지하되, TEMP 모드에서는 실행되지 않음 - 위에서 이미 break됨)
  }
  
  // 최종 수집 결과 확인 및 로그
  const finalCount = targetArray.length;
  const moduleFinalCount = targetArray.filter(p => p.module === moduleNumber).length;
  const moduleCollectedProblemNumbers = targetArray.filter(p => p.module === moduleNumber).map(p => p.problemNumber).filter(n => n > 0).sort((a, b) => a - b);
  console.log(`[FLOW] collectModuleProblems 완료: ${moduleName} ${moduleFinalCount}개 수집 (전체: ${finalCount}개)`);
  // #region agent log - ANSWER DEBUG: 모듈별 정답/해설 누락 요약
  try {
    const missingAnswers = targetArray
      .filter(p => p.module === moduleNumber)
      .filter(p => !p.correctAnswer && !p.answer && !p.isGridIn);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'moduleRunner.js:missingAnswersSummary',
        message: 'collectModuleProblems missing answers summary',
        data: {
          sectionType,
          moduleName,
          moduleNumber,
          moduleFinalCount,
          missingCount: missingAnswers.length,
          missingProblemNumbers: missingAnswers
            .map(p => p.problemNumber || 0)
            .filter(n => n > 0)
            .sort((a, b) => a - b)
        },
        timestamp: Date.now(),
        runId: 'answers-bug',
        hypothesisId: 'H2'
      })
    }).catch(() => {});
  } catch {
    // 로깅 오류는 수집 플로우에 영향을 주지 않도록 무시
  }
  // #endregion
  if (!TEMP_MODE && moduleFinalCount > 0) {
    console.log(`[FLOW] ${moduleName} 수집된 문제 번호: ${moduleCollectedProblemNumbers.join(', ')}`);
    if (moduleFinalCount < maxProblems) {
      console.warn(`[FLOW] 경고: ${moduleName} 예상 문제 수(${maxProblems})보다 적게 수집됨 (${moduleFinalCount}개)`);
    }
    // 27번 문제가 수집되었는지 확인
    if (!moduleCollectedProblemNumbers.includes(maxProblems)) {
      console.warn(`[FLOW] 경고: ${moduleName} ${maxProblems}번 문제가 수집되지 않았습니다!`);
    }
  }
  return moduleFinalCount; // 현재 모듈의 수집된 문제 수 반환
}

