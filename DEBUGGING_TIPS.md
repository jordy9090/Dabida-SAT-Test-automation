# 디버깅 팁

## UI 요소 찾기 실패 시

버튼 클릭, 요소 선택 등이 안 될 때는 **먼저** F12 개발자 도구로 실제 DOM 구조를 확인해달라고 요청한다.

### 요청할 정보

1. **요소 선택자**  
   - Elements 탭에서 해당 요소 우클릭 → Copy → **Copy selector**  
   - 또는 `document.querySelector("...")` 형태로 알려주기

2. **핵심 구조**  
   - 예: `button > span.mdc-button__label`  
   - 또는: `activity-set > glowing-card > ... > button`

3. **텍스트**  
   - 예: `<span class="mdc-button__label">모듈 2 시작</span>`

이 정보를 미리 받으면 선택자/클릭 로직을 더 빠르고 정확하게 수정할 수 있다.
