# Gemini SAT PDF Exporter

A Chrome Extension that starts Gemini's interactive SAT, captures Reading/Writing and Math questions (including grid-ins), and downloads four PDFs.

## Build and load

```bash
npm install
npm test
npm run build:extension
```

In `chrome://extensions`, enable Developer mode and load **only `extension-build/`** as an unpacked extension. After source changes, run `npm run build:extension`, reload the extension, then refresh Gemini.

## Use

1. Sign in and open `https://gemini.google.com/`.
2. Click **Export to PDF** once.
3. Keep the tab open until the button reads **Done**.

The extension sends `I want to take a full practice SAT TEST.`, enables the answer/explanation setup option when present, traverses Reading/Writing modules 1–2 and Math modules 1–2, and downloads:

- `SAT_Reading_Problems_<date>.pdf`
- `SAT_Reading_Answers_<date>.pdf`
- `SAT_Math_Problems_<date>.pdf`
- `SAT_Math_Answers_<date>.pdf`

The button reports `Starting SAT`, the active section/module, `Building PDFs`, `Done`, or a contextual `Error`. A run is incomplete if any problem lacks its question, correct answer, or explanation.

## Architecture

`content.js` is the sole source entry. The top frame owns one control button; it discovers the same-origin Gemini document containing the SAT UI and ignores unrelated frames. `src/runtime/runner.js` owns the deterministic question state machine, `extractor.js` owns semantic extraction and validation, and `pdf.js` owns the four outputs.

`npm run build:extension` builds the bundle, embeds timestamp/git identity, copies every runtime asset to `extension-build/`, and verifies manifest references, bundling, build identity, and absence of localhost telemetry.
