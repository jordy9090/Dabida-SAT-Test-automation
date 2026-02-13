// Extracted PDFGenerator and PDF generation functions from content.js
// NOTE: Logic must remain identical to original implementation.

import { CONFIG } from '../config/constants.js';
import { showToast } from '../dom/wait.js';

/**
 * jsPDF 라이브러리 가져오기
 * @returns {Function} jsPDF 생성자 함수
 * @throws {Error} jsPDF를 찾을 수 없을 때
 */
function getJSPDF() {
  try {
    // UMD 형식: window.jspdf.jsPDF
    if (window.jspdf && window.jspdf.jsPDF) {
      console.log('[SAT PDF Exporter] window.jspdf.jsPDF 사용');
      return window.jspdf.jsPDF;
    }
    // 대체: window.jsPDF
    if (window.jsPDF) {
      console.log('[SAT PDF Exporter] window.jsPDF 사용');
      return window.jsPDF;
    }
    // 전역 jspdf 변수
    if (typeof jspdf !== 'undefined' && jspdf.jsPDF) {
      console.log('[SAT PDF Exporter] jspdf.jsPDF 사용');
      return jspdf.jsPDF;
    }
    
    console.error('[SAT PDF Exporter] jsPDF를 찾을 수 없습니다. manifest.json에서 jspdf.umd.min.js가 먼저 로드되었는지 확인하세요.');
    throw new Error('jsPDF not found. Check if jspdf.umd.min.js is loaded in manifest.json');
  } catch (error) {
    if (error.message && error.message.includes('Extension context invalidated')) {
      console.error('[SAT PDF Exporter] Extension context invalidated - jsPDF 접근 실패');
      // NOTE: showToast is imported from wait.js
      showToast('확장 프로그램이 재로드되었습니다. 페이지를 새로고침하고 다시 시도해주세요.', 'error');
      throw error;
    }
    throw error;
  }
}

// 문제지용: 섹션을 PDF에 추가 (정답/해설 제외)
function addProblemsSectionToPDF(doc, sectionName, problems, startY, maxWidth, margin, pageHeight, lineHeight, sectionSpacing) {
  let yPosition = startY;

  // 섹션 제목
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  
  // 페이지 체크
  if (yPosition + lineHeight * 3 > pageHeight - 20) {
    doc.addPage();
    yPosition = margin;
  }

  doc.text(`${sectionName} Section`, margin, yPosition);
  yPosition += lineHeight * 1.5;

  // 각 문제 추가
  problems.forEach((problem, index) => {
    // #region agent log - DEBUG STEP 4: PDFGenerator에서 problem.figures 검증
    const debugLabel = problem.problemNumber || problem.number || index + 1;
    console.log(`[DEBUG STEP 4] PDFGenerator 문제 루프 시작: 문제 ${debugLabel}, problem.figures=${problem.figures ? problem.figures.length : 'undefined'}`);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:loopStart',message:'DEBUG STEP 4: PDFGenerator 문제 루프 시작',data:{problemLabel:debugLabel,index,hasFigures:!!problem.figures,figuresLength:problem.figures?problem.figures.length:0,figures:problem.figures?problem.figures.map(f=>({w:f.width,h:f.height,hasDataUrl:!!f.dataUrl})):null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    // 페이지 체크
    if (yPosition + lineHeight * 10 > pageHeight - 20) {
      doc.addPage();
      yPosition = margin;
    }

    // 문제 번호 및 본문
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    // ============================================================================
    // 문제 번호: problem.problemNumber를 우선 사용 (실제 문제 번호)
    // index + 1은 폴백으로만 사용 (problemNumber가 없을 때만)
    // ============================================================================
    let problemLabel;
    if (problem.problemNumber && problem.problemNumber > 0) {
      // problemNumber가 있으면 그것을 사용 (실제 문제 번호)
      problemLabel = problem.problemNumber;
      console.log(`[PDF] 문제 번호 사용: ${problemLabel} (problem.problemNumber)`);
    } else if (problem.number && problem.number > 0) {
      // number가 있으면 그것을 사용
      problemLabel = problem.number;
      console.log(`[PDF] 문제 번호 사용: ${problemLabel} (problem.number)`);
    } else {
      // 폴백: index + 1 (문제 번호를 찾을 수 없을 때만)
      problemLabel = index + 1;
      console.warn(`[PDF] 문제 번호를 찾을 수 없어 index 사용: ${problemLabel} (index: ${index})`);
    }
    doc.text(`Problem ${problemLabel}`, margin, yPosition);
    yPosition += lineHeight;
    // ============================================================================

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    // 지문 (Reading의 경우)
    if (problem.passage) {
      const passageLines = doc.splitTextToSize(problem.passage, maxWidth);
      passageLines.forEach(line => {
        if (yPosition + lineHeight > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += lineHeight * 0.5;
    }

    // 문제 본문
    // question 사용 (stem 대신, 호환성 유지)
    // ============================================================================
    // STEP 5: PDFGenerator 방어 렌더링 - questionText 절대 비어있지 않게
    // ============================================================================
    let questionText = problem.question || problem.stem || '[QUESTION_NOT_EXTRACTED]';
    if (questionText && questionText.trim().length > 0) {
      const questionLines = doc.splitTextToSize(questionText, maxWidth);
      questionLines.forEach(line => {
        if (yPosition + lineHeight > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += lineHeight * 0.5;
    } else {
      // questionText가 비어있으면 placeholder 출력
      doc.setFontSize(10);
      doc.setFont(undefined, 'italic');
      doc.setTextColor(128, 128, 128);
      doc.text('[QUESTION_NOT_EXTRACTED]', margin, yPosition);
      yPosition += lineHeight;
      doc.setTextColor(0, 0, 0);
      yPosition += lineHeight * 0.5;
    }
    // ============================================================================

    // ============================================================================
    // Figure 이미지 삽입
    // ============================================================================
    // #region agent log - DEBUG STEP 4: figures 블록 진입 확인
    console.log(`[DEBUG STEP 4] figures 블록 체크: 문제 ${problemLabel}, figures 존재=${!!problem.figures}, 배열=${Array.isArray(problem.figures)}, 길이=${problem.figures ? problem.figures.length : 0}`);
    fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:figuresCheck',message:'DEBUG STEP 4: figures 블록 체크',data:{problemLabel,hasFigures:!!problem.figures,isArray:Array.isArray(problem.figures),figuresLength:problem.figures?problem.figures.length:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (problem.figures && Array.isArray(problem.figures) && problem.figures.length > 0) {
      // #region agent log - DEBUG STEP 4: figures 블록 진입
      console.log(`[DEBUG STEP 4] figures 블록 진입: 문제 ${problemLabel}, ${problem.figures.length}개 figure`);
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:figuresBlockEnter',message:'DEBUG STEP 4: figures 블록 진입',data:{problemLabel,figuresLength:problem.figures.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      console.log(`[PDF] 문제 ${problem.problemNumber || problem.number || index + 1}에 ${problem.figures.length}개 figure 삽입 시작`);
      
      for (let figIdx = 0; figIdx < problem.figures.length; figIdx++) {
        const figure = problem.figures[figIdx];
        try {
          // #region agent log - DEBUG STEP 5: addImage 호출 직전
          console.log(`[DEBUG STEP 5] addImage 호출 직전: 문제 ${problemLabel}, figure ${figIdx + 1}/${problem.figures.length}`);
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:beforeAddImage',message:'DEBUG STEP 5: addImage 호출 직전',data:{problemLabel,figIdx:figIdx+1,totalFigures:problem.figures.length,figureWidth:figure.width,figureHeight:figure.height,hasDataUrl:!!figure.dataUrl,dataUrlLength:figure.dataUrl?figure.dataUrl.length:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          // 이미지 가로폭 계산 (페이지 여백 고려)
          const maxImageWidth = maxWidth; // 이미지 최대 가로폭
          const imgWidth = figure.width || 100;
          const imgHeight = figure.height || 100;
          
          // 비율 유지하며 리사이즈
          let displayWidth = Math.min(maxImageWidth, imgWidth);
          const aspectRatio = imgHeight / imgWidth;
          let displayHeight = displayWidth * aspectRatio;
          
          // 이미지가 너무 크면 리사이즈
          if (displayHeight > pageHeight - yPosition - 30) {
            displayHeight = pageHeight - yPosition - 30;
            displayWidth = displayHeight / aspectRatio;
          }
          
          // 페이지 하단 체크
          if (yPosition + displayHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
            // 새 페이지에서도 크기 재계산
            if (displayHeight > pageHeight - yPosition - 30) {
              displayHeight = pageHeight - yPosition - 30;
              displayWidth = displayHeight / aspectRatio;
            }
          }
          
          console.log(`[PDF] figure ${figIdx + 1} 삽입: x=${margin}, y=${yPosition.toFixed(1)}, w=${displayWidth.toFixed(1)}, h=${displayHeight.toFixed(1)}`);
          
          // #region agent log - DEBUG STEP 5: addImage 호출
          console.log(`[DEBUG STEP 5] addImage 호출: x=${margin}, y=${yPosition.toFixed(1)}, w=${displayWidth.toFixed(1)}, h=${displayHeight.toFixed(1)}`);
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:addImageCall',message:'DEBUG STEP 5: addImage 호출',data:{problemLabel,figIdx:figIdx+1,x:margin,y:yPosition,w:displayWidth,h:displayHeight,dataUrlLength:figure.dataUrl?figure.dataUrl.length:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          
          // 이미지 삽입
          doc.addImage(figure.dataUrl, 'PNG', margin, yPosition, displayWidth, displayHeight);
          
          // #region agent log - DEBUG STEP 5: addImage 호출 완료
          console.log(`[DEBUG STEP 5] addImage 호출 완료: 문제 ${problemLabel}, figure ${figIdx + 1}`);
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:addImageComplete',message:'DEBUG STEP 5: addImage 호출 완료',data:{problemLabel,figIdx:figIdx+1},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          
          yPosition += displayHeight + lineHeight * 0.5; // 이미지 아래 여백
        } catch (error) {
          console.warn(`[PDF] figure ${figIdx + 1} 삽입 실패 (계속 진행):`, error);
          // #region agent log - DEBUG STEP 5: addImage 오류
          console.error(`[DEBUG STEP 5] addImage 오류: 문제 ${problemLabel}, figure ${figIdx + 1}`, error);
          fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdfGenerator.js:addProblemsSectionToPDF:addImageError',message:'DEBUG STEP 5: addImage 오류',data:{problemLabel,figIdx:figIdx+1,errorMessage:error.message,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          // 실패해도 계속 진행
        }
      }
      
      console.log(`[PDF] 문제 ${problem.problemNumber || problem.number || index + 1} figure 삽입 완료`);
    }
    // ============================================================================

    // 선택지 (choices가 객체 {A: "...", B: "...", C: "...", D: "..."} 형태)
    if (problem.choices) {
      // 배열 형태인 경우 (호환성)
      if (Array.isArray(problem.choices) && problem.choices.length > 0) {
        problem.choices.forEach(choice => {
          if (yPosition + lineHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
          }
          const choiceText = `${choice.label}. ${choice.text}`;
          const choiceLines = doc.splitTextToSize(choiceText, maxWidth - 10);
          choiceLines.forEach(line => {
            if (yPosition + lineHeight > pageHeight - 20) {
              doc.addPage();
              yPosition = margin;
            }
            doc.text(line, margin + 5, yPosition);
            yPosition += lineHeight;
          });
        });
      } 
      // 객체 형태인 경우 (새로운 구조)
      else if (typeof problem.choices === 'object' && !Array.isArray(problem.choices)) {
        const choiceLabels = ['A', 'B', 'C', 'D'];
        for (const label of choiceLabels) {
          if (problem.choices[label]) {
            if (yPosition + lineHeight > pageHeight - 20) {
              doc.addPage();
              yPosition = margin;
            }
            const choiceText = `${label}. ${problem.choices[label]}`;
            const choiceLines = doc.splitTextToSize(choiceText, maxWidth - 10);
            choiceLines.forEach(line => {
              if (yPosition + lineHeight > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
              }
              doc.text(line, margin + 5, yPosition);
              yPosition += lineHeight;
            });
          }
        }
      }
    } else if (problem.isGridIn) {
      // Grid-in 문제
      if (yPosition + lineHeight > pageHeight - 20) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text('Grid-in Problem', margin + 5, yPosition);
      yPosition += lineHeight;
      if (problem.gridInAnswer) {
        doc.text(`Answer: ${problem.gridInAnswer}`, margin + 5, yPosition);
        yPosition += lineHeight;
      }
    }

    yPosition += sectionSpacing;
  });

  return yPosition;
}

// 정답지용: 섹션을 PDF에 추가 (정답 + 해설만)
function addAnswersSectionToPDF(doc, sectionName, problems, startY, maxWidth, margin, pageHeight, lineHeight, sectionSpacing) {
  let yPosition = startY;

  // 섹션 제목
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0);
  
  // 페이지 체크
  if (yPosition + lineHeight * 3 > pageHeight - 20) {
    doc.addPage();
    yPosition = margin;
  }

  doc.text(`${sectionName} Section - Answers`, margin, yPosition);
  yPosition += lineHeight * 1.5;

  // 각 문제의 정답 추가
  problems.forEach((problem) => {
    // #region agent log - ANSWER DEBUG: 정답 섹션 문제 상태 기록
    try {
      const problemIndex = problems.indexOf(problem);
      const problemLabelForLog =
        (problem && typeof problem.problemNumber === 'number' && problem.problemNumber > 0)
          ? problem.problemNumber
          : (problem && typeof problem.number === 'number' && problem.number > 0)
            ? problem.number
            : problemIndex + 1;
      fetch('http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'pdfGenerator.js:addAnswersSectionToPDF:problemEntry',
          message: 'Answers PDF problem entry',
          data: {
            sectionName,
            problemIndex,
            problemLabel: problemLabelForLog,
            hasCorrectAnswer: !!(problem && problem.correctAnswer),
            correctAnswer: problem && problem.correctAnswer ? String(problem.correctAnswer) : null,
            hasAnswerField: !!(problem && problem.answer),
            answerField: problem && problem.answer ? String(problem.answer) : null
          },
          timestamp: Date.now(),
          runId: 'answers-bug',
          hypothesisId: 'H1'
        })
      }).catch(() => {});
    } catch {
      // 로깅 실패는 PDF 생성에 영향을 주지 않도록 무시
    }
    // #endregion
    // 페이지 체크
    if (yPosition + lineHeight * 5 > pageHeight - 20) {
      doc.addPage();
      yPosition = margin;
    }

    // 문제 번호 및 정답
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    // ============================================================================
    // 문제 번호: problem.problemNumber를 우선 사용 (실제 문제 번호)
    // index + 1은 폴백으로만 사용 (problemNumber가 없을 때만)
    // ============================================================================
    const problemIndex = problems.indexOf(problem);
    let problemLabel;
    if (problem.problemNumber && problem.problemNumber > 0) {
      // problemNumber가 있으면 그것을 사용 (실제 문제 번호)
      problemLabel = problem.problemNumber;
      console.log(`[PDF] 정답지 문제 번호 사용: ${problemLabel} (problem.problemNumber)`);
    } else if (problem.number && problem.number > 0) {
      // number가 있으면 그것을 사용
      problemLabel = problem.number;
      console.log(`[PDF] 정답지 문제 번호 사용: ${problemLabel} (problem.number)`);
    } else {
      // 폴백: index + 1 (문제 번호를 찾을 수 없을 때만)
      problemLabel = problemIndex + 1;
      console.warn(`[PDF] 정답지 문제 번호를 찾을 수 없어 index 사용: ${problemLabel} (index: ${problemIndex})`);
    }
    doc.text(`Problem ${problemLabel}`, margin, yPosition);
    yPosition += lineHeight;
    // ============================================================================

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    // 정답지에는 문제 텍스트를 표시하지 않음 (정답선지와 해설만)
    
    // 정답 (correctAnswer 사용) - 정답선지 텍스트 병기
    if (problem.correctAnswer) {
      doc.setFont(undefined, 'bold');
      // 정답선지 텍스트 가져오기
      let answerText = '';
      if (problem.choices && typeof problem.choices === 'object') {
        // 객체 형태인 경우
        if (problem.choices[problem.correctAnswer]) {
          answerText = problem.choices[problem.correctAnswer];
        }
      } else if (Array.isArray(problem.choices)) {
        // 배열 형태인 경우 (호환성)
        const choice = problem.choices.find(c => c.label === problem.correctAnswer);
        if (choice) {
          answerText = choice.text;
        }
      }
      
      // 정답선지 텍스트가 있으면 병기
      if (answerText && answerText.trim().length > 0) {
        const answerDisplay = `Answer: ${problem.correctAnswer} (${answerText.trim()})`;
        const answerLines = doc.splitTextToSize(answerDisplay, maxWidth);
        answerLines.forEach(line => {
          if (yPosition + lineHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
            doc.setFont(undefined, 'bold');
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      } else {
        // 정답선지 텍스트가 없으면 기존 형식
        doc.text(`Answer: ${problem.correctAnswer}`, margin, yPosition);
        yPosition += lineHeight;
      }
      doc.setFont(undefined, 'normal');
    } else if (problem.answer) {
      // 호환성: answer도 지원
      doc.setFont(undefined, 'bold');
      // 정답선지 텍스트 가져오기
      let answerText = '';
      if (problem.choices && typeof problem.choices === 'object') {
        if (problem.choices[problem.answer]) {
          answerText = problem.choices[problem.answer];
        }
      } else if (Array.isArray(problem.choices)) {
        const choice = problem.choices.find(c => c.label === problem.answer);
        if (choice) {
          answerText = choice.text;
        }
      }
      
      if (answerText && answerText.trim().length > 0) {
        const answerDisplay = `Answer: ${problem.answer} (${answerText.trim()})`;
        const answerLines = doc.splitTextToSize(answerDisplay, maxWidth);
        answerLines.forEach(line => {
          if (yPosition + lineHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
            doc.setFont(undefined, 'bold');
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      } else {
        doc.text(`Answer: ${problem.answer}`, margin, yPosition);
        yPosition += lineHeight;
      }
      doc.setFont(undefined, 'normal');
    } else if (problem.isGridIn && problem.gridInAnswer) {
      doc.setFont(undefined, 'bold');
      doc.text(`Answer: ${problem.gridInAnswer}`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += lineHeight;
    } else {
      // 정답이 없어도 placeholder 출력
      doc.setFont(undefined, 'italic');
      doc.setTextColor(128, 128, 128);
      doc.text(`Answer: [NOT_EXTRACTED]`, margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += lineHeight;
    }

    // 해설
    yPosition += lineHeight * 0.5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    if (problem.explanation && problem.explanation.trim().length > 0) {
      const explanationText = `Explanation: ${problem.explanation}`;
      const explanationLines = doc.splitTextToSize(explanationText, maxWidth);
      explanationLines.forEach(line => {
        if (yPosition + lineHeight > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
          doc.setTextColor(80, 80, 80);
          doc.setFont('helvetica', 'normal');
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    } else {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(128, 128, 128);
      doc.text('Explanation: [NOT_EXTRACTED]', margin, yPosition);
      yPosition += lineHeight;
    }
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    yPosition += sectionSpacing;
  });

  return yPosition;
}

// 문제지 PDF 생성 (지문 + 문제 + 선택지, 정답/해설 없음)
function generateProblemsPDF(data) {
  try {
    const jsPDF = getJSPDF();
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;
  const lineHeight = 7;
  const sectionSpacing = 10;

  // 헤더
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('SAT Practice Problems', margin, yPosition);
  yPosition += lineHeight * 1.5;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  const dateStr = new Date(data.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated: ${dateStr}`, margin, yPosition);
  yPosition += lineHeight * 2;

  // Reading 섹션 (문제지만)
  if (data.reading && data.reading.length > 0) {
    yPosition = addProblemsSectionToPDF(doc, 'Reading', data.reading, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
  }

  // Math 섹션 (문제지만)
  if (data.math && data.math.length > 0) {
    yPosition = addProblemsSectionToPDF(doc, 'Math', data.math, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
  }

  // 푸터
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Generated by Our Service (Powered by Gemini)', pageWidth / 2, footerY, {
    align: 'center'
  });

  return doc;
  } catch (error) {
    console.error('[SAT PDF Exporter] 문제지 PDF 생성 오류:', error);
    if (error.message && error.message.includes('Extension context invalidated')) {
      throw new Error('Extension context invalidated during PDF generation');
    }
    throw error;
  }
}

// 정답지 PDF 생성 (문제 번호별 정답 + 해설)
function generateAnswersPDF(data) {
  try {
    const jsPDF = getJSPDF();
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;
  const lineHeight = 7;
  const sectionSpacing = 10;

  // 헤더
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('SAT Practice Answers', margin, yPosition);
  yPosition += lineHeight * 1.5;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  const dateStr = new Date(data.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated: ${dateStr}`, margin, yPosition);
  yPosition += lineHeight * 2;

  // Reading 섹션 (정답만)
  if (data.reading && data.reading.length > 0) {
    yPosition = addAnswersSectionToPDF(doc, 'Reading', data.reading, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
  }

  // Math 섹션 (정답만)
  if (data.math && data.math.length > 0) {
    yPosition = addAnswersSectionToPDF(doc, 'Math', data.math, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
  }

  // 푸터
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Generated by Our Service (Powered by Gemini)', pageWidth / 2, footerY, {
    align: 'center'
  });

  return doc;
  } catch (error) {
    console.error('[SAT PDF Exporter] 정답지 PDF 생성 오류:', error);
    if (error.message && error.message.includes('Extension context invalidated')) {
      throw new Error('Extension context invalidated during PDF generation');
    }
    throw error;
  }
}

/**
 * PDFGenerator 클래스
 * PDF 생성 및 다운로드 로직을 담당
 */
export class PDFGenerator {
  /**
   * 문제지 PDF 생성
   * @param {Object} data - 문제 데이터
   * @returns {Object} jsPDF 문서 객체
   */
  generateProblemsPDF(data) {
    // 기존 함수 재사용
    return generateProblemsPDF(data);
  }

  /**
   * 정답지 PDF 생성
   * @param {Object} data - 문제 데이터
   * @returns {Object} jsPDF 문서 객체
   */
  generateAnswersPDF(data) {
    // 기존 함수 재사용
    return generateAnswersPDF(data);
  }

  /**
   * PDF 다운로드
   * @param {Object} problemDoc - 문제지 PDF 문서
   * @param {Object} answerDoc - 정답지 PDF 문서
   * @returns {Promise<void>}
   */
  async downloadPDFs(problemDoc, answerDoc, options = {}) {
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const copyIndex = Number.isInteger(options.copyIndex) ? options.copyIndex : 1;
      const totalCopies = Number.isInteger(options.totalCopies) ? options.totalCopies : 1;
      const copySuffix = totalCopies > 1 ? `_Set${String(copyIndex).padStart(2, '0')}` : '';
      const problemFileName = `SAT_Problems_${dateStr}${copySuffix}.pdf`;
      const answerFileName = `SAT_Answers_${dateStr}${copySuffix}.pdf`;

      console.log(`[PDFGenerator] 문제지 PDF 저장: ${problemFileName}`);
      problemDoc.save(problemFileName);
      
      await new Promise(resolve => setTimeout(resolve, CONFIG.timeouts.pdfDownloadDelay));
      
      console.log(`[PDFGenerator] 정답지 PDF 저장: ${answerFileName}`);
      answerDoc.save(answerFileName);
    } catch (error) {
      console.error('[PDFGenerator] PDF 다운로드 오류:', error);
      throw error;
    }
  }
}
