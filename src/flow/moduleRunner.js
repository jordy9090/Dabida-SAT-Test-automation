// Module runner - handles per-module problem collection loop
// Extracted from stateMachine.js to separate concerns

import { CONFIG, TEMP_MODE, TEMP_TARGET_NUMBERS } from '../config/constants.js';
import { isElementVisible } from '../dom/deepQuery.js';
import { waitForCondition, waitForContentLoad } from '../dom/wait.js';
import { isQuestionScreen, getCurrentProblemNumber, getProgressState, extractCurrentProblem, getQuestionSignature, isGraded, waitForGrading, detectCorrectAnswer, extractExplanationAfterGrading, findSatRoot } from '../dom/extract.js';
import { clickNextButtonWithFallback, clickFirstChoice, clickSubmitWithConfirmation, findNavigationButton } from '../dom/buttons.js';

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
  
  // ============================================================================
  // TEMP 모드: 정확한 번호(1,2,3)만 수집
  // ============================================================================
  const maxProblems = TEMP_MODE ? TEMP_TARGET_NUMBERS.length : CONFIG.collection.maxProblems;
  const targetNumbers = TEMP_MODE ? new Set(TEMP_TARGET_NUMBERS) : null; // TEMP 모드일 때만 사용
  const collectedNumbers = new Set(); // 수집된 문제 번호 추적
  
  if (TEMP_MODE) {
    console.log(`[TEMP] TEMP 모드 활성화: 정확히 ${TEMP_TARGET_NUMBERS.join(', ')}번 문제만 수집합니다.`);
  } else {
    console.log(`[FLOW] 수집 시작: ${moduleName}, 최대 ${maxProblems}개 문제`);
  }
  // ============================================================================
  
  const seenSignatures = new Set();
  let consecutiveDuplicates = 0;
  const maxConsecutiveDuplicates = 3;
  
  while ((TEMP_MODE ? collectedNumbers.size < targetNumbers.size : targetArray.length < maxProblems) && consecutiveDuplicates < maxConsecutiveDuplicates) {
    // STEP 3: TEMP 모드 체크는 문제 push 후에 수행 (아래로 이동)
    // 현재 문제 화면 확인
    if (!isQuestionScreen()) {
      console.warn(`[FLOW] 문제 화면이 아닙니다. 대기 중...`);
      await waitForCondition(() => isQuestionScreen(), CONFIG.timeouts.screenTransition);
      if (!isQuestionScreen()) {
        console.warn(`[FLOW] 문제 화면을 찾을 수 없습니다. 수집 종료.`);
        break;
      }
    }
    
    // 현재 문제 번호 확인 (여러 번 읽어서 정확도 향상)
    let currentProblemNum = getCurrentProblemNumber();
    const progressState = getProgressState();
    
    // 문제 번호가 0이거나 없으면 Progress에서 다시 읽기
    if (!currentProblemNum || currentProblemNum <= 0) {
      if (progressState) {
        const progressMatch = progressState.match(/(\d+)\s*\/\s*\d+/);
        if (progressMatch) {
          currentProblemNum = parseInt(progressMatch[1]);
          console.log(`[FLOW] 문제 번호를 Progress에서 추출: ${currentProblemNum}`);
        }
      }
    }
    
    // 문제 번호를 다시 한 번 확인 (DOM이 업데이트되었을 수 있음)
    await new Promise(resolve => setTimeout(resolve, 200));
    const retryProblemNum = getCurrentProblemNumber();
    if (retryProblemNum > 0 && retryProblemNum !== currentProblemNum) {
      console.log(`[FLOW] 문제 번호 재확인: ${currentProblemNum} → ${retryProblemNum}`);
      currentProblemNum = retryProblemNum;
    }
    
    console.log(`[FLOW] 현재 문제: ${currentProblemNum}, Progress: ${progressState}`);
    
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
    const signature = getQuestionSignature();
    if (seenSignatures.has(signature)) {
      console.warn(`[FLOW] 중복 문제 감지: ${signature}`);
      consecutiveDuplicates++;
      if (consecutiveDuplicates >= maxConsecutiveDuplicates) {
        console.log(`[FLOW] 연속 중복 ${maxConsecutiveDuplicates}회. 수집 종료.`);
        break;
      }
    } else {
      consecutiveDuplicates = 0;
      seenSignatures.add(signature);
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
    
    // 정답과 해설 변수 선언 (블록 밖에서 선언하여 스코프 문제 해결)
    let correctAnswer = null;
    let explanation = '';
    
    // 선택지 클릭 및 채점 (정답 추출을 위해 필수)
    // TEMP_MODE에서도 정답 추출을 위해 선택지 클릭 → submit → grading 필요
    if (!alreadyGraded) {
      // 선택지 클릭 (A)
      console.log(`[FLOW] 선택지 클릭 중...`);
      const clicked = await clickFirstChoice(sectionType);
      if (!clicked) {
        console.warn(`[FLOW] 선택지 클릭 실패. 다음 문제로 이동 시도.`);
      } else {
        console.log(`[FLOW] ✓ 선택지 클릭 성공`);
      }
      
      // 제출
      console.log(`[FLOW] 제출 버튼 클릭 중...`);
      const submitted = await clickSubmitWithConfirmation();
      if (!submitted) {
        console.warn(`[FLOW] 제출 실패. 다음 문제로 이동 시도.`);
      } else {
        console.log(`[FLOW] ✓ 제출 성공`);
      }
      
      // 채점 대기
      console.log(`[FLOW] 채점 대기 중...`);
      const gradingResult = await waitForGrading();
      
      if (!gradingResult) {
        console.warn(`[FLOW] 채점 완료 대기 실패. 다음 문제로 이동 시도.`);
      } else {
        console.log(`[FLOW] ✓ 채점 완료`);
        
        // 채점 완료 후 정답 표시가 DOM에 완전히 반영될 때까지 추가 대기
        console.log(`[FLOW] 정답 표시 DOM 반영 대기 중...`);
        await new Promise(resolve => setTimeout(resolve, 300)); // 300ms 추가 대기
        
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
          await new Promise(resolve => setTimeout(resolve, 100));
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
            await new Promise(resolve => setTimeout(resolve, 200));
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
    }
    
    // STEP 4: 문제 추출 (답변 실패와 분리)
    console.log(`[FLOW] 문제 추출 중...`);
    const problem = await extractCurrentProblem(sectionType);
    let problemExtracted = false;
    
    if (problem) {
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
      const finalProblemNum = problem.problemNumber || currentProblemNum;
      console.log(`[FLOW] 추출된 문제 번호: ${finalProblemNum} (currentProblemNum: ${currentProblemNum}, problem.problemNumber: ${problem.problemNumber})`);
      
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
      targetArray.push(problem);
      problemExtracted = true;
      
      // TEMP 모드: 수집된 번호 추적 (최종 문제 번호 사용)
      if (TEMP_MODE && finalProblemNum > 0) {
        collectedNumbers.add(finalProblemNum);
        console.log(`[TEMP] ✓ 문제 번호 ${finalProblemNum} 수집 완료`);
      }
      
      const collectedCount = targetArray.length;
      console.log(`[FLOW] 문제 ${collectedCount} 수집 완료: ${finalProblemNum}`);
      
      if (TEMP_MODE) {
        console.log(`[TEMP] 수집된 문제 번호: ${Array.from(collectedNumbers).sort((a, b) => a - b).join(', ')}`);
        // TEMP 모드: 모든 대상 번호를 수집했으면 즉시 종료
        if (collectedNumbers.size >= targetNumbers.size) {
          console.log(`[TEMP] 모든 대상 문제 수집 완료 (${Array.from(collectedNumbers).sort((a, b) => a - b).join(', ')}). 즉시 종료합니다.`);
          return collectedCount;
        }
      }
    } else {
      console.warn(`[FLOW] 문제 추출 실패. 하지만 다음 문제로 이동은 시도합니다.`);
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
    
    // TEMP 모드: 모든 대상 번호를 수집했으면 다음으로 이동하지 않음
    if (TEMP_MODE && collectedNumbers.size >= targetNumbers.size) {
      console.log(`[TEMP] 모든 대상 문제 수집 완료. 다음 문제로 이동하지 않습니다.`);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:tempModeComplete',message:'TEMP mode complete, breaking loop',data:{collectedNumbers:Array.from(collectedNumbers),targetNumbers:Array.from(targetNumbers || [])},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      break;
    }
    
    // 다음 문제로 이동
    const beforeProblemNum = getCurrentProblemNumber();
    console.log(`[FLOW] 다음 문제로 이동 중... (현재: ${beforeProblemNum})`);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:beforeNext',message:'before moving to next problem',data:{beforeProblemNum,currentProblemNum,collectedNumbers:Array.from(collectedNumbers),targetArrayLength:targetArray.length,maxProblems,TEMP_MODE},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    
    // TEMP 모드: 정확히 +1씩만 이동하도록 강제 확인
    let nextAttempts = 0;
    const maxNextAttempts = 5;
    let correctNext = false;
    
    while (!correctNext && nextAttempts < maxNextAttempts) {
      nextAttempts++;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:clickNextAttempt',message:'attempting to click next button',data:{beforeProblemNum,nextAttempts,maxNextAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      const moved = await clickNextButtonWithFallback(beforeProblemNum);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterClickNext',message:'after clicking next button',data:{beforeProblemNum,moved,nextAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      
      if (!moved) {
        console.warn(`[FLOW] 다음 문제로 이동 실패 (시도 ${nextAttempts}/${maxNextAttempts}). 수집 종료.`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:nextFailed',message:'next button click failed',data:{beforeProblemNum,nextAttempts,maxNextAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        break;
      }
      
      // 화면 전환 대기
      await waitForContentLoad(CONFIG.timeouts.screenTransition);
      
      // 문제 번호가 정확히 +1 증가했는지 확인 (여러 번 읽어서 정확도 향상)
      await new Promise(resolve => setTimeout(resolve, 300)); // DOM 업데이트 대기
      let afterProblemNum = getCurrentProblemNumber();
      
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
      
      console.log(`[FLOW] Next 클릭 후 문제 번호: ${beforeProblemNum} → ${afterProblemNum}`);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:afterNextCheck',message:'checking problem number after next click',data:{beforeProblemNum,afterProblemNum,expectedNext:beforeProblemNum+1,correctNext:afterProblemNum===beforeProblemNum+1},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      
      if (afterProblemNum === beforeProblemNum + 1) {
        // 정확히 +1 증가 - 성공
        correctNext = true;
        console.log(`[FLOW] ✓ 정확히 +1 증가 확인: ${beforeProblemNum} → ${afterProblemNum}`);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'moduleRunner.js:nextSuccess',message:'successfully moved to next problem',data:{beforeProblemNum,afterProblemNum},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        break;
      } else if (afterProblemNum > beforeProblemNum + 1) {
        // 점프 발생!
        console.error(`[FLOW] ✗ 점프 탐지! ${beforeProblemNum} → ${afterProblemNum} (예상: ${beforeProblemNum + 1})`);
        
        // TEMP 모드: 놓친 번호 확인
        if (TEMP_MODE && targetNumbers) {
          const missedNumbers = [];
          for (let num = beforeProblemNum + 1; num < afterProblemNum; num++) {
            if (targetNumbers.has(num) && !collectedNumbers.has(num)) {
              missedNumbers.push(num);
            }
          }
          
          if (missedNumbers.length > 0) {
            console.warn(`[TEMP] 놓친 문제 번호: ${missedNumbers.join(', ')}`);
            
            // Previous 버튼 찾기 및 되돌리기 시도
            const previousButton = findNavigationButton('previous', '이전', 'prev', 'back');
            if (previousButton && !previousButton.disabled) {
              const jumpSize = afterProblemNum - beforeProblemNum;
              console.log(`[TEMP] Previous 버튼 발견. ${jumpSize - 1}번 되돌리기 시도...`);
              
              for (let i = 0; i < jumpSize - 1; i++) {
                previousButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                await waitForContentLoad(CONFIG.timeouts.screenTransition);
              }
              
              // 되돌린 후 문제 번호 확인
              const afterBackNum = getCurrentProblemNumber();
              console.log(`[TEMP] 되돌리기 후 문제 번호: ${afterProblemNum} → ${afterBackNum}`);
              
              if (afterBackNum === beforeProblemNum + 1) {
                // 정확히 되돌림 성공
                correctNext = true;
                console.log(`[TEMP] ✓ 되돌리기 성공! 정확히 ${beforeProblemNum + 1}번 문제로 이동`);
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
      } else if (afterProblemNum <= beforeProblemNum) {
        // 문제 번호가 증가하지 않았거나 감소함
        console.warn(`[FLOW] 문제 번호가 증가하지 않음: ${beforeProblemNum} → ${afterProblemNum}. 재시도...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
    }
    
    if (!correctNext) {
      console.error(`[FLOW] Next 클릭 실패: 정확히 +1 증가하지 못함 (시도 ${nextAttempts}회). 수집 종료.`);
      break;
    }
    
    // STEP 3: TEMP 모드에서는 모듈 완료 검증 스킵
    // (원래 코드는 유지하되, TEMP 모드에서는 실행되지 않음 - 위에서 이미 break됨)
  }
  
  console.log(`[FLOW] collectModuleProblems 완료: ${targetArray.length}개 수집`);
  return targetArray.length;
}

