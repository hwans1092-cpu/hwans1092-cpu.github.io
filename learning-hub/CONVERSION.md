# 노션 SAP Learning Hub → HTML 변환 규칙

원본: 노션 페이지 `SAP Learning Hub` (id `3a9a087b-1d4b-809b-81ca-c95fb44d4183`)
대상: 이 폴더(`SAP_STUDY_WEB/learning-hub`)

## 1. 변환 단위

| 노션 | HTML |
|---|---|
| Learning Journey (6개) | `journey.html?j=<key>` — data.js 에서 렌더링 |
| COURSE 1개 | **노트 파일 1건** `notes/<journey>/<slug>.html` |
| 노션 하위 페이지 (`N-M. …`) | 그 노트 안의 **LESSON N** |
| Unit / 레슨 | LESSON 안의 `h3` / `h4` |

코스가 아주 큰 경우(원본 9~10장)는 `-1` `-2` 로 노트를 나눈다. data.js 에 두 건으로 등록.

## 2. 블록 매핑

| 노션 | HTML |
|---|---|
| `<table header-row>` | `div.tbl-wrap > table` (첫 열 nowrap, 긴 셀은 `td.wrap`) |
| `<details> 🔰 초보자 설명` | `div.note > div.t + p` |
| `> 📌 SD-MM-FI 프로젝트와의 연결점` | `div.note.ok` |
| `> ⚠️` · 주의 | `div.note.warn` |
| 굵은 용어 | `.key`(인디고) · `.hl`(형광) · `.bad` · `.good` |
| T-Code · 테이블 · 필드명 | `<code>` |
| 순서 있는 절차 | `div.step > span.n + p` |
| 이미지 | `figure > img + figcaption > span.fno + ol.legend` |

## 3. 변환하면서 반드시 더하는 것

그대로 옮기기만 하면 노션이 더 편하다. HTML 로 가는 값은 아래 셋이다.

1. **SVG 도해** — 원본 강의노트에는 그림이 거의 없다. 프로세스·결정 흐름·계층 구조는
   인라인 `<svg class="dgm">` 로 그린다. 스타일 세트는 노트 전용 `<style>` 에 복사
   (원본: `notes/sd/s46200-pricing.html` 상단)
2. **"언제 이걸 알아야 하는가"** 도입부 — 각 LESSON 을 강의 요약이 아니라
   운영에서 걸리는 지점으로 연다
3. **확인 필요 표시** — 버전·시스템별로 갈리는 내용은 단정하지 않고 `.note.warn` 으로
   남긴다. 실제 시스템(winerp01 / MEP)에서 확인 후 보강

## 4. 이미지

- 노션 첨부 이미지는 **서명 URL 이라 만료된다.** 변환 시점에 반드시 내려받아
  `assets/img/<journey>/<slug>/NN-이름.png` 로 저장
- base64 인라인 금지
- 캡션·legend 는 **이미지를 직접 본 뒤** 작성. 추측 금지

## 5. 노트 추가 절차

1. `notes/<journey>/<slug>.html` 작성 (스켈레톤은 s46200-pricing.html 복사)
2. 경로는 전부 `../../assets/` · `../../index.html` · `../../journey.html?j=<key>`
3. `assets/data.js` 에서 해당 코스의 `st` 를 `"todo"` → `"done"` 으로
4. 이전/다음 네비게이션과 홈 통계는 자동 반영 — 손대지 않는다

## 6. 하지 말 것

- `assets/notes-paper.css` 수정 (기존 노트가 전부 깨진다)
- 노트 안에 이전/다음 링크 직접 작성 (hub.js 가 주입)
- index.html · journey.html 에 코스를 하드코딩 (data.js 가 유일한 출처)
- 원본을 확인하지 않고 기억으로 SAP 동작 단정
