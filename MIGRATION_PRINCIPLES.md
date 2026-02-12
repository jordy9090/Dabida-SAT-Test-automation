# Playwright 마이그레이션 고정 원칙

이 문서는 Chrome 확장 → Playwright 이전 시 팀/미래의 개발자가 중간에 딴 길로 샐 수 없도록 맥락을 고정한다.

## 경계: Browser vs Node

| Browser (page/evaluate) | Node |
|-------------------------|------|
| DOM 접근 | 오케스트레이션 (재시도/로그/저장) |
| 프레임 탐색 | PDF 생성 |
| 문제 추출 | 파일 저장 |
| figure 캡처 (html2canvas) | 진행상태 체크포인트 |

## problem 스키마 변경 금지

```ts
interface Problem {
  section: 'Reading and Writing' | 'Math';
  module: 1 | 2;
  problemNumber: number;
  passage: string | null;
  question: string;
  choices: { A: string; B: string; C?: string; D?: string };
  correctAnswer: string;
  explanation: string;
  figures: Array<{ dataUrl: string; width: number; height: number }>;
}
```

## Checkpoint 필수

- N문제마다 checkpoint.jsonl에 append
- 실패 시 `--resume`으로 재개
- 체크포인트 없이 진행 금지

## Chunking

- 1차 목표: checkpoint로 충분. 98문제 한 번에 전송 허용.
- 메모리 이슈 발생 시 Phase 6 이후 N문제 단위 chunk 도입 검토.

## Image cache

- SAT 문제는 figure가 문제별로 독립. 동일 이미지 중복 캡처 거의 없음.
- Phase 7에서 OOM 발생 시에만 src/hash 기반 중복 제거 도입 검토.

## 한 테스트당 최대 데이터량

- 문제 수: ~98 (Reading 54 + Math 44)
- 이미지: ~100~200개 (문제당 0~3개)
- 전체 크기: ~10~20MB (base64 포함 시)
