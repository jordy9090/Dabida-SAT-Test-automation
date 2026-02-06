# 버튼 가시성 진단 체크리스트

## [1] 즉시 진단: 실행이 시작조차 하는지 확인

### 크롬 콘솔에서 확인할 로그들:

1. **첫 번째 로그 (content.js 최상단)**
   ```
   [BOOT] content.js loaded <URL> top? true/false
   ```
   - ✅ **로그가 뜬다**: content script가 로드됨
   - ❌ **로그가 안 뜬다**: content script 로딩/파싱에서 죽은 것 → **import 파싱 에러 가능성 높음**

2. **두 번째 로그 (SATApp 생성)**
   ```
   [BOOT] creating SATApp instance top? true/false
   ```
   - ✅ **로그가 뜬다**: import가 성공하고 실행이 진행됨
   - ❌ **로그가 안 뜬다**: import 에러 또는 런타임 에러로 중단

3. **세 번째 로그 (initButtonSafely 호출)**
   ```
   [BOOT] calling initButtonSafely top? true/false
   ```
   - ✅ **로그가 뜬다**: 초기화 로직까지 도달
   - ❌ **로그가 안 뜬다**: 위 단계에서 에러

4. **네 번째 로그 (버튼 생성 직전)**
   ```
   [BOOT] about to create export button
   ```
   - ✅ **로그가 뜬다**: 버튼 생성 로직까지 도달
   - ❌ **로그가 안 뜬다**: initButtonSafely에서 에러

5. **다섯 번째 로그 (버튼 삽입 후)**
   ```
   [BOOT] buttonInserted <button-id> top? true/false ownerDocument: true/false
   [BOOT] buttonVisible? true/false { display, visibility, opacity, zIndex, position, rect }
   ```
   - ✅ **buttonVisible? true**: 버튼이 보임
   - ❌ **buttonVisible? false**: 버튼이 DOM에는 있지만 숨겨짐

### 진단 결과:

- **로그가 아예 안 뜬다** → content script 로딩/파싱에서 죽은 것
  - **원인**: `content.js`에 import가 있는데 manifest에 `"type":"module"`이 없음
  - **해결**: manifest.json에 `"type":"module"` 추가 (완료)

- **첫 로그만 뜬다** → 중간 import 에러/런타임 에러로 중단
  - **확인**: 콘솔의 빨간 에러 메시지 확인
  - **원인**: import 경로 오류, 순환 import, 모듈 로드 실패

- **둘 다 뜬다** → 버튼 생성은 시도했는데 DOM 삽입/스타일/프레임에서 안 보이는 것
  - **확인**: `[BOOT] buttonVisible?` 로그 확인
  - **원인**: CSS 숨김, iframe 내부 생성, z-index 문제

## [2] 가장 유력 원인 해결: import 파싱 에러

### 적용된 해결책: 옵션 2 (module content script 전환)

- ✅ manifest.json에 `"type":"module"` 추가
- ✅ jspdf.umd.min.js는 그대로 유지 (pdfGenerator에서 window.jspdf로 접근)
- ✅ content.js의 모든 import 경로는 상대 경로로 유지

### 확인 사항:

1. **manifest.json 확인**
   ```json
   "content_scripts": [{
     "type": "module",  // ← 이게 추가되었는지 확인
     "js": ["jspdf.umd.min.js", "content.js"],
     ...
   }]
   ```

2. **콘솔 에러 확인**
   - `Failed to load module` → import 경로 오류
   - `Cannot use import statement` → manifest에 type: module이 없음
   - `jspdf is not defined` → jspdf.umd.min.js 로드 실패

## [3] 실행 경로 검증

### 전역 변수 확인:

콘솔에서 다음을 실행:
```javascript
// 전역 변수들이 존재하는지 확인
console.log('window.satApp:', window.satApp);
console.log('window.__SAT_APP:', window.__SAT_APP);
console.log('window.SATApp:', window.SATApp);
console.log('window.PDFGenerator:', window.PDFGenerator);
console.log('window.__SAT_BOOT_TS__:', window.__SAT_BOOT_TS__);
```

- ✅ 모두 존재 → 전역 참조 정상
- ❌ undefined → 모듈화 과정에서 전역 설정 누락

### Import 경로 검증:

1. **content.js의 import 경로 확인**
   - `./src/config/constants.js` → 실제 파일 존재 확인
   - `./src/dom/extract.js` → 실제 파일 존재 확인
   - 모든 import 경로가 content.js 기준 상대 경로인지 확인

2. **순환 import 확인**
   - entry → frame → entry 같은 순환이 있는지 확인
   - 콘솔에 "Circular dependency" 에러가 있는지 확인

### 프레임별 실행 확인:

- `all_frames: true`이므로 모든 프레임에서 실행됨
- 버튼은 **top frame에서만** 생성되어야 함
- 로그에서 `top? true`인 경우에만 버튼 생성 확인

## [4] 버튼이 안 보이는 경우 (2차 원인)

### 1) DOM에 버튼이 실제로 삽입됐는지

콘솔에서:
```javascript
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
}
```

### 2) CSS로 숨겨지는지

- `styles.css`에 `#gemini-sat-pdf-export-btn { display: none; }` 같은 규칙이 있는지 확인
- computedStyle의 display/visibility/opacity 확인

### 3) 버튼이 iframe 내부에 생성되는지

- `[BOOT] buttonInserted` 로그에서 `ownerDocument` 확인
- `window === window.top`이 false인 프레임에서 생성되었는지 확인

### 4) MutationObserver가 삭제하는지

- 콘솔에서 버튼 생성/삭제 이벤트 로그 확인
- `[Zombie Button]` 로그 확인

## [5] 결과물

### 최소 로그 5줄:

1. `[BOOT] content.js loaded` - 스크립트 로드 확인
2. `[BOOT] creating SATApp instance` - 인스턴스 생성 확인
3. `[BOOT] about to create export button` - 버튼 생성 시작 확인
4. `[BOOT] buttonInserted` - 버튼 DOM 삽입 확인
5. `[BOOT] buttonVisible? true/false` - 버튼 가시성 확인

### 예상 원인 (1차):

**import 파싱 에러로 content script 실행 자체 실패**

- content.js에 import가 있는데 manifest에 `"type":"module"`이 없어서 파싱 단계에서 실패
- 해결: manifest.json에 `"type":"module"` 추가 완료

### 다음 단계:

1. 확장 프로그램 재로드
2. gemini.google.com 페이지 새로고침
3. 콘솔에서 위 5개 로그 확인
4. 로그 결과에 따라 추가 진단 진행

