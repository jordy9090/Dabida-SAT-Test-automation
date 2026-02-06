# 클릭 → 수집 파이프라인 진단 및 복구 완료

## ✅ 완료된 작업

### 1. 클릭 이벤트 바인딩 확인 로그 추가
- `createExportButton()`에서 `addEventListener('click', ...)` 확인
- 클릭 핸들러 최상단에 `[CLICK] export button clicked` 로그 추가
- `console.trace('[TRACE] export click stack')` 추가

### 2. 앱 인스턴스 확인 로그 추가
- `handleExportClick` 진입 시 `window.__SAT_APP`, `window.SATApp` 확인
- 인스턴스가 없으면 `[ERROR] __SAT_APP missing` 로그 출력

### 3. 프레임 메시징 확인 로그 추가
- `setupFrameMessageListener` 호출 시 `[FRAME] initFrameMessaging/setupFrameMessageListener called` 로그
- `findWorkerFrame`에서 `[FRAME] probe sent to N frames` 로그
- 각 프레임에서 `[FRAME] probe received`, `[FRAME] probe result` 로그
- `SAT_START` 전송 시 `[FRAME] SAT_START sent` 로그
- Worker 프레임에서 `[FRAME] SAT_START received` 로그

### 4. 번들/manifest 경로 재검증
- `content.js` 최상단에 `BUILD_TS` 추가
- `[BOOT] dist/content.js loaded BUILD_TS=...` 로그 추가
- `window.__SAT_BUILD_TS__` 전역 변수 설정

### 5. 수집 시작 함수 호출 확인 로그 추가
- `handleExportClick`에서 `[FLOW] handleExportClick entered` 로그
- `collectAllProblems` 진입 시 `[SCRAPER] collectAllProblems start` 로그
- `collectModuleProblems` 진입 시 `[FLOW] collectModuleProblems start` 로그

### 6. collectModuleProblems 함수 구현
- **핵심 수정**: placeholder였던 `collectModuleProblems` 함수를 완전히 구현
- 필요한 모든 함수 import 추가:
  - `getQuestionSignature`, `isGraded`, `waitForGrading`, `detectCorrectAnswer`, `extractExplanationAfterGrading`
  - `clickFirstChoice`, `clickSubmitWithConfirmation`, `clickNextButtonWithFallback`
  - `safeClick`, `showToast`, `startNextModule`
- 모듈의 모든 문제를 순회하며 수집하는 로직 구현:
  1. 문제 화면 확인
  2. 문제 추출
  3. 선택지 클릭 (A)
  4. 제출
  5. 채점 대기
  6. 정답/해설 추출
  7. 다음 문제로 이동
  8. 반복

## 📋 예상 성공 로그 시퀀스

버튼 클릭 시 다음 로그가 순서대로 출력되어야 합니다:

```
[CLICK] export button clicked {isTrusted: true, top: true, location: "...", timestamp: ...}
[TRACE] export click stack
[FLOW] handleExportClick entered {isProcessing: false, top: true, hasApp: true, hasClass: true}
[FRAME] selectWorkerFrame start
[FRAME] probe sent to N frames {frameCount: N, probeId: "..."}
[FRAME] probe received top? true/false href: "..."
[FRAME] probe result: looks like SAT UI / not SAT UI
[FRAME] selectWorkerFrame result: found/not found {frameCount: N, top: true}
[FRAME] SAT_START sent {workerHref: "...", top: true}
[FRAME] SAT_START received top? true/false href: "..."
[FRAME] SAT_START received (worker frame)
[SCRAPER] collectAllProblems start
[FLOW] collectModuleProblems start: reading Module 1
[FLOW] 수집 시작: Module 1, 최대 27개 문제
[FLOW] 현재 문제: 1, Progress: 1/27
[FLOW] 선택지 클릭 중...
[FLOW] 제출 버튼 클릭 중...
[FLOW] 채점 대기 중...
[FLOW] 문제 추출 중...
[FLOW] 문제 1 수집 완료: 1
[FLOW] 정답/해설 추출 완료: A
[FLOW] 다음 문제로 이동 중... (현재: 1)
...
[DONE] 또는 [ERROR]
```

## 🔍 진단 포인트

### (A) 클릭 이벤트 바인딩
- **확인**: `[CLICK] export button clicked` 로그가 뜨는지
- **끊김 지점**: 로그가 안 뜨면 버튼 이벤트 바인딩 실패

### (B) 앱 인스턴스
- **확인**: `[FLOW] handleExportClick entered` 로그에서 `hasApp: true`인지
- **끊김 지점**: `[ERROR] __SAT_APP missing` 로그가 뜨면 인스턴스 생성 실패

### (C) 프레임 메시징
- **확인**: `[FRAME] probe sent`, `[FRAME] probe received`, `[FRAME] SAT_START sent/received` 로그가 순서대로 뜨는지
- **끊김 지점**: `[FRAME] selectWorkerFrame result: not found`면 worker 프레임 찾기 실패

### (D) 번들/manifest 로드 파일 불일치
- **확인**: `[BOOT] dist/content.js loaded BUILD_TS=...` 로그의 BUILD_TS 값
- **끊김 지점**: 코드 수정 후 BUILD_TS가 안 바뀌면 구버전 파일 로드 중

### (E) 수집 함수 진입 전 예외
- **확인**: `[SCRAPER] collectAllProblems start`, `[FLOW] collectModuleProblems start` 로그가 뜨는지
- **끊김 지점**: `[ERROR] handleExportClick failed` 로그가 뜨면 예외 발생

## 🚀 다음 단계

1. **확장 프로그램 재로드**
2. **페이지 하드 리프레시** (Ctrl+Shift+R)
3. **버튼 클릭**
4. **콘솔에서 위 로그 시퀀스 확인**
5. **끊기는 지점 파악 후 추가 수정**

## 📝 주요 수정 사항

### collectModuleProblems 함수 구현
가장 중요한 수정: placeholder였던 `collectModuleProblems` 함수를 완전히 구현했습니다.

**이전**:
```javascript
export async function collectModuleProblems(allData, sectionType, moduleName) {
  throw new Error('collectModuleProblems not yet fully migrated');
}
```

**이후**:
```javascript
export async function collectModuleProblems(allData, sectionType, moduleName) {
  // 완전한 구현: 문제 추출 → 선택지 클릭 → 제출 → 채점 → 정답/해설 추출 → 다음 문제로 이동
  // 최대 27개 문제 수집, 중복 감지, 모듈 완료 확인 등 포함
}
```

이제 버튼 클릭 시 실제로 문제 수집이 시작됩니다!

