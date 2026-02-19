# Gemini SAT PDF Exporter

Google Gemini SAT 연습 시험에서 문제·정답·해설을 자동으로 수집하여 PDF로 내보내는 Chrome Extension입니다.

## 기능

- **테스트 시작**: Gemini 채팅에서 "테스트 시작" 버튼 클릭 시 자동으로 SAT 프롬프트 입력 및 전송
- **Reading 섹션 추출**: 지문, 문제, 선택지, 정답 및 해설
- **Math 섹션 추출**: 수학 문제, 선택지/Grid-in, 정답 및 해설 (LaTeX 기반 수식 처리)
- **섹션별 PDF 4개 생성**: Reading 문제지, Reading 해설지, Math 문제지, Math 해설지
- **자동 수집**: 모든 모듈(Module 1/2)을 순차 진행하며 전체 문제 수집
- **텍스트 정제**: 불필요한 유니코드·줄바꿈 제거, 수식 깨짐 방지

## 설치

1. 저장소를 클론하거나 압축 해제합니다.
2. Chrome에서 `chrome://extensions/`를 엽니다.
3. "개발자 모드"를 켭니다.
4. "압축해제된 확장 프로그램을 로드합니다"로 이 폴더를 선택합니다.

### 빌드가 필요한 경우

`dist/content.js`가 없다면 프로젝트 루트에서:

```bash
npm install
npm run build
```

## 사용 방법

### 1. Gemini 채팅 페이지에서 시작

1. [Google Gemini](https://gemini.google.com)에 접속합니다.
2. "테스트 시작" 버튼을 클릭합니다.
3. 자동으로 SAT 프롬프트가 입력·전송되고, SAT 연습 시험이 시작됩니다.
4. 설정 화면에서 토글을 조정한 뒤 "테스트 시작"을 눌러 시험을 진행합니다.
5. 수집이 끝나면 "Export to PDF"로 PDF를 내보냅니다.

### 2. 이미 SAT 화면에 있는 경우

1. SAT 문제 화면에서 "Export to PDF" 버튼을 클릭합니다.
2. 수집할 세트 수를 입력한 뒤 PDF를 생성합니다.

## 출력 파일

세트당 4개의 PDF가 생성됩니다.

| 파일명 | 내용 |
|--------|------|
| `SAT_Reading_Problems_YYYY-MM-DD.pdf` | Reading 문제지 |
| `SAT_Reading_Answers_YYYY-MM-DD.pdf` | Reading 해설지 |
| `SAT_Math_Problems_YYYY-MM-DD.pdf` | Math 문제지 |
| `SAT_Math_Answers_YYYY-MM-DD.pdf` | Math 해설지 |

## 프로젝트 구조

```
├── manifest.json
├── content.js                 # 진입점 (번들)
├── jspdf.umd.min.js           # PDF 라이브러리
├── styles.css
├── dist/
│   └── content.js             # esbuild 번들 결과물
└── src/
    ├── entry/content.entry.js # SATApp, Export 플로우
    ├── pdf/pdfGenerator.js    # 섹션별 PDF 생성
    ├── dom/extract.js         # 문제·선택지·해설 추출
    ├── dom/deepQuery.js       # Shadow DOM 탐색
    ├── flow/
    │   ├── geminiChat.js      # Gemini 채팅 자동화
    │   ├── geminiSetup.js     # SAT 설정(토글 등)
    │   ├── scraper.js         # 전체 수집 오케스트레이션
    │   ├── moduleRunner.js    # 문제별 수집 루프
    │   └── navigator.js       # 네비게이션/클릭
    ├── frame/workerFrame.js   # iframe 메시징
    └── config/constants.js    # 타임아웃·셀렉터 설정
```

## 기술 스택

- **Chrome Extension (Manifest V3)**
- **jsPDF** – PDF 생성
- **html2canvas** – 수학 도형/이미지 캡처
- **esbuild** – 번들링

## 설정

`src/config/constants.js`에서 조정 가능합니다.

- `timeouts`: 요소 대기, 화면 전환, PDF 다운로드 간격 등
- `collection.maxProblems`, `mathMaxProblems`: 섹션별 최대 문제 수
- `geminiChat.message`: Gemini에 보낼 SAT 프롬프트
- `geminiChat.inputSelectors`: 채팅 입력창 셀렉터

## 문제 해결

### "채팅 입력창을 찾을 수 없습니다"

- Gemini 페이지가 완전히 로드된 뒤에 "테스트 시작"을 다시 시도하세요.
- `src/config/constants.js`의 `geminiChat.inputSelectors`를 현재 UI에 맞게 수정할 수 있습니다.

### PDF가 2개만 생성됨

- Reading 또는 Math 중 한 섹션에만 문제가 수집되었을 수 있습니다.
- 콘솔에서 `[SATApp] PDF 생성 예정: Reading X개, Math Y개` 로그를 확인하세요.

### 수식이 깨지거나 이상한 문자가 보임

- 최신 버전은 `[data-math]` LaTeX 기반 추출과 유니코드 정제를 적용합니다.
- 계속 문제가 있으면 `src/dom/extract.js`의 `stripGarbageUnicode`, `latexToReadable`을 검토하세요.

## 라이선스

MIT
