# 번들링 복구 체크리스트

## ✅ 완료된 작업

1. **esbuild 설치 및 빌드 스크립트 추가**
   - `npm install --save-dev esbuild` 완료
   - `package.json`에 `"build"` 스크립트 추가 완료

2. **content.js 번들링**
   - `npm run build` 실행 완료
   - `dist/content.js` 생성 완료 (89.3kb)
   - ✅ **검증**: `dist/content.js`에 `import` 문 없음 (0개)
   - ✅ **검증**: `[BOOT]` 로그 포함 확인

3. **manifest.json 수정**
   - `"js": ["jspdf.umd.min.js", "dist/content.js"]`로 변경
   - `"type": "module"` 제거 (classic content script로 로드)

## 🔍 검증 단계

### 1. 파일 존재 확인
```bash
# dist/content.js 파일이 존재하는지 확인
ls dist/content.js
```

### 2. import 문 검증 (완료)
```bash
# dist/content.js에 import 문이 없는지 확인
grep -E "^import |^export " dist/content.js
# 결과: No matches found ✅
```

### 3. [BOOT] 로그 포함 확인 (완료)
```bash
# [BOOT] 로그가 포함되어 있는지 확인
grep "\[BOOT\]" dist/content.js
# 결과: 5개 이상의 [BOOT] 로그 확인됨 ✅
```

## 🚀 실행 단계

### 1. 확장 프로그램 재로드
1. Chrome 확장 프로그램 관리 페이지 열기 (`chrome://extensions/`)
2. "Gemini SAT PDF Exporter" 확장 프로그램 찾기
3. **새로고침 버튼** 클릭 (또는 토글 OFF → ON)

### 2. 페이지 하드 리프레시
1. `https://gemini.google.com` 페이지 열기
2. **Ctrl + Shift + R** (또는 **Ctrl + F5**)로 하드 리프레시
   - 캐시를 무시하고 새로고침

### 3. 콘솔 로그 확인
브라우저 개발자 도구 콘솔(F12)에서 다음 로그들을 확인:

#### ✅ 성공 케이스 (예상 로그 순서):
```
[BOOT] content.js loaded https://gemini.google.com/... top? true/false
[BOOT] creating SATApp instance top? true/false
[BOOT] calling initButtonSafely top? true/false
[BOOT] initButtonSafely called top? true/false
[BOOT] about to create export button top? true/false
[BOOT] buttonInserted gemini-sat-pdf-export-btn top? true/false ownerDocument: true
[BOOT] buttonVisible? true { display: 'block', visibility: 'visible', ... }
```

#### ❌ 실패 케이스:
- **"Cannot use import statement outside a module" 에러**
  - → `dist/content.js`가 제대로 로드되지 않음
  - → manifest.json의 경로 확인
  - → 확장 프로그램 재로드 확인

- **로그가 전혀 안 뜸**
  - → content script가 로드되지 않음
  - → manifest.json의 `matches` 확인
  - → 확장 프로그램이 활성화되어 있는지 확인

- **첫 로그만 뜨고 멈춤**
  - → 번들링 과정에서 런타임 에러
  - → 콘솔의 빨간 에러 메시지 확인
  - → `npm run build` 재실행

### 4. 버튼 존재 확인
콘솔에서 다음 명령어 실행:
```javascript
// 버튼이 DOM에 존재하는지 확인
const btn = document.querySelector('#gemini-sat-pdf-export-btn');
console.log('Button exists?', !!btn);

if (btn) {
  console.log('Button style:', {
    display: window.getComputedStyle(btn).display,
    visibility: window.getComputedStyle(btn).visibility,
    opacity: window.getComputedStyle(btn).opacity,
    zIndex: window.getComputedStyle(btn).zIndex,
    position: window.getComputedStyle(btn).position
  });
  console.log('Button rect:', btn.getBoundingClientRect());
  console.log('Button visible?', btn.getBoundingClientRect().width > 0 && btn.getBoundingClientRect().height > 0);
}
```

### 5. 전역 변수 확인
콘솔에서 다음 명령어 실행:
```javascript
console.log('window.satApp:', window.satApp);
console.log('window.__SAT_APP:', window.__SAT_APP);
console.log('window.SATApp:', window.SATApp);
console.log('window.PDFGenerator:', window.PDFGenerator);
console.log('window.__SAT_BOOT_TS__:', window.__SAT_BOOT_TS__);
```

## 🔧 문제 해결

### 문제 1: "Cannot use import statement outside a module" 에러가 계속 발생
**원인**: `dist/content.js`가 로드되지 않거나, 여전히 원본 `content.js`가 로드됨

**해결**:
1. `manifest.json` 확인: `"js": ["jspdf.umd.min.js", "dist/content.js"]`인지 확인
2. 확장 프로그램 재로드
3. `dist/content.js` 파일이 실제로 존재하는지 확인
4. `npm run build` 재실행

### 문제 2: 로그는 뜨는데 버튼이 안 보임
**원인**: CSS 숨김, z-index 문제, iframe 내부 생성

**해결**:
1. 콘솔에서 `[BOOT] buttonVisible?` 로그 확인
2. `buttonVisible? false`인 경우:
   - `display`, `visibility`, `opacity` 값 확인
   - `rect` 값이 0인지 확인
   - 버튼이 iframe 내부에 있는지 확인 (`top? false`인 경우)

### 문제 3: jsPDF 관련 에러
**원인**: `jspdf.umd.min.js`가 로드되지 않음

**해결**:
1. manifest.json에서 `jspdf.umd.min.js`가 `dist/content.js` **이전**에 로드되는지 확인
2. 콘솔에서 `window.jspdf` 또는 `window.jsPDF` 확인
3. `jspdf.umd.min.js` 파일이 extension root에 존재하는지 확인

## 📝 빌드 재실행

코드를 수정한 후에는 반드시 빌드를 재실행해야 합니다:

```bash
npm run build
```

빌드 후:
1. 확장 프로그램 재로드
2. 페이지 하드 리프레시
3. 콘솔 로그 확인

## ✅ 최종 확인 체크리스트

- [ ] `dist/content.js` 파일 존재
- [ ] `dist/content.js`에 `import` 문 없음
- [ ] `dist/content.js`에 `[BOOT]` 로그 포함
- [ ] `manifest.json`에 `dist/content.js` 경로 설정
- [ ] `manifest.json`에 `"type": "module"` 제거됨
- [ ] 확장 프로그램 재로드 완료
- [ ] 페이지 하드 리프레시 완료
- [ ] 콘솔에 `[BOOT] content.js loaded` 로그 확인
- [ ] 콘솔에 `[BOOT] buttonInserted` 로그 확인
- [ ] 콘솔에 `[BOOT] buttonVisible? true` 로그 확인
- [ ] 화면에 "Export to PDF" 버튼 표시 확인

## 🎯 예상 결과

**성공 시**:
- 콘솔에 모든 `[BOOT]` 로그가 순서대로 출력됨
- 화면 우측 상단에 "Export to PDF" 버튼이 표시됨
- 버튼 클릭 시 PDF 생성 기능이 정상 작동

**실패 시**:
- 콘솔에 에러 메시지 출력
- 위의 "문제 해결" 섹션 참고하여 단계별로 확인

