import html2canvas from 'html2canvas';
import { BUILD_INFO } from './src/generated/buildInfo.js';
import { boot } from './src/runtime/app.js';

window.html2canvas = html2canvas;
console.info(`[Gemini SAT Exporter] build=${BUILD_INFO.gitSha} time=${BUILD_INFO.timestamp}`);
boot();
