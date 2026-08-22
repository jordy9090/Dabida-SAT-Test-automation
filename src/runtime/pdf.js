import { dedupeAndValidate } from './extractor.js';

function getJsPDF() { const ctor = window.jspdf?.jsPDF || window.jsPDF; if (!ctor) throw new Error('jsPDF is unavailable'); return ctor; }
function addWrapped(doc, text, x, y, width, line = 6) { for (const part of doc.splitTextToSize(String(text || ''), width)) { if (y > 275) { doc.addPage(); y = 20; } doc.text(part, x, y); y += line; } return y; }
function makeDoc(section, problems, answers) {
  const Doc = getJsPDF(), doc = new Doc({ unit: 'mm', format: 'a4' }); let y = 20;
  doc.setFontSize(16); doc.text(`SAT ${section === 'reading' ? 'Reading' : 'Math'} ${answers ? 'Answers & Explanations' : 'Problems'}`, 20, y); y += 12;
  for (const p of problems) {
    if (y > 265) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setFont(undefined, 'bold'); doc.text(`Module ${p.module} - Problem ${p.problemNumber}`, 20, y); y += 7; doc.setFont(undefined, 'normal'); doc.setFontSize(10);
    if (answers) { y = addWrapped(doc, `Answer: ${p.correctAnswer}`, 20, y, 170); y = addWrapped(doc, `Explanation: ${p.explanation}`, 20, y, 170); }
    else {
      if (p.passage) y = addWrapped(doc, p.passage, 20, y, 170);
      y = addWrapped(doc, p.question, 20, y, 170);
      for (const choice of p.choices) y = addWrapped(doc, `${choice.label}. ${choice.text}`, 25, y, 165);
      for (const figure of p.figures || []) { try { const h = Math.min(70, 160 * figure.height / figure.width); if (y + h > 275) { doc.addPage(); y = 20; } doc.addImage(figure.dataUrl, 'PNG', 25, y, 160, h); y += h + 5; } catch {} }
    }
    y += 6;
  }
  return doc;
}
export function buildPdfDocuments(input) {
  const all = dedupeAndValidate(input), reading = all.filter(p => p.section === 'reading'), math = all.filter(p => p.section === 'math');
  if (!reading.length || !math.length) throw new Error(`Incomplete SAT set: reading=${reading.length}, math=${math.length}`);
  return { readingProblems: makeDoc('reading', reading, false), readingAnswers: makeDoc('reading', reading, true), mathProblems: makeDoc('math', math, false), mathAnswers: makeDoc('math', math, true), counts: { reading: reading.length, math: math.length } };
}
export async function downloadFour(documents) {
  const date = new Date().toISOString().slice(0,10), files = [['readingProblems',`SAT_Reading_Problems_${date}.pdf`],['readingAnswers',`SAT_Reading_Answers_${date}.pdf`],['mathProblems',`SAT_Math_Problems_${date}.pdf`],['mathAnswers',`SAT_Math_Answers_${date}.pdf`]];
  for (const [key, name] of files) { documents[key].save(name); await new Promise(resolve => setTimeout(resolve, 300)); }
}
