# 변환 작업 지침 (에이전트용)

노션 SAP Learning Hub 코스 1개 → HTML 노트 1건. 이 문서 + CONVERSION.md + 기준 노트를
읽고 작업한다.

## 기준 노트 (템플릿)

`notes/sd/s46000-sales-essentials.html` — **이 파일을 반드시 먼저 읽고 그 구조·톤·클래스
사용을 그대로 따른다.** head의 `<style>` 도해 정의 블록은 통째로 복사한다.

## 작업 순서

1. `cat notes/sd/s46000-sales-essentials.html` 로 템플릿 확인
2. 배정받은 노션 페이지를 `mcp__Notion__notion-fetch` 로 **전부** 가져온다 (ID 목록은 과제에 있음)
3. 노트 HTML 1건을 작성해 지정된 경로에 쓴다 (`device_bash` heredoc, `<<'HTMLEOF'` 인용형)
4. 아래 검증을 돌리고 실패하면 고친다

## 노트 구조

```
crumb → doc-head → lead → toc → LESSON 1..N → APPENDIX
```

- **LESSON = 노션 하위 페이지 1장.** 페이지가 6장이면 LESSON 6개
- 각 LESSON 첫머리에 `<p><span class="tag">Unit x</span><span class="tag">레슨 n개</span>…</p>`
- 각 LESSON은 `<h3>언제 이걸 알아야 하는가</h3>` 로 연다 — 강의 요약이 아니라
  **운영에서 걸리는 지점**에서 출발. 실제 문의 문장("…가 안 됩니다") 한 줄 + 답이 어디 있는지
  (LESSON이 3개 이하로 짧은 노트는 첫 LESSON에만 둬도 된다)
- `lead` 는 `<b>결론부터.</b>` 로 시작하는 2문단
- **APPENDIX** 필수: `한 장 요약` 표(질문/답) + `반드시 지킬 것`(.note.warn) + `참고`(원본 출처,
  앞뒤 노트 이름)

## 도해 (SVG) — 노트당 2~3장 필수

- 인라인 `<svg class="dgm" viewBox="0 0 1000 H" role="img" aria-label="…">`, `figure.figwrap` 으로 감쌈
- `aria-label` 에 이 도해의 결론을 한 문장으로
- 캡션 `<figcaption><span class="fno">그림 N</span>…</figcaption>`, 번호는 1부터 연속
- marker(화살촉) id 는 노트 안에서 유일하게 (다른 노트와 겹쳐도 무방, 같은 노트 안에서만 유일)
- 그릴 대상: 프로세스 흐름 / 결정 순서 / 계층 구조 / 숫자 예시의 시각화 / 비교
- 텍스트가 박스를 넘치지 않게 — 한 박스에 13px 텍스트 기준 24자 이내

## 쓸 수 있는 클래스 (notes-paper.css 에 이미 정의됨 · 수정 금지)

`.lesson#lN > h2 > span.no` / `.hl` `.key` `.bad` `.good` / `span.tag` `.tag.warn` `.tag.ok` /
`div.note > div.t + p` `.note.warn` `.note.ok` / `<kbd>` / `<pre><code>` /
`div.tbl-wrap > table` (첫 열 nowrap, 긴 셀 `td.wrap`) / `div.step > span.n + p` /
`figure > img + figcaption > span.fno + ol.legend` / `div.keys > div.keycard`

## 내용 규칙

- **노션 원문이 1차 소스.** 없는 내용을 지어내지 않는다. 원문 오타는 조용히 고친다
- 버전·시스템별로 갈리는 내용은 단정하지 말고 `.note.warn` 으로 "확인 필요 — 실제 시스템
  (winerp01 / MEP)에서 확정할 것" 표시
- T-Code · 테이블 · 필드 · 앱ID 는 `<code>` 로 정확히
- 원문의 `🔰 초보자 설명` 토글 → `div.note`, `📌 프로젝트와의 연결점` → `div.note.ok`
- **📌 블록은 원문보다 구체적으로 다시 쓴다.** 아래 개인 프로젝트 사실에 맞춰:
  - 회사코드 CL04 / 플랜트 GATE(입고게이트) · STOR(보관)
  - STOR 저장위치 = 온도군 × 정상·임박 6개 (냉동 1100/1900 · 냉장 2100/2900 · 실온 3100/3900)
  - 자재그룹 CHKN RICE(냉동·냉장) / SHAK PROT PBAR(실온)
  - 배치관리 + 유통기한(MCHA-VFDAT), SD는 FEFO 배치결정, 이동평균가(V)
  - CBO 3종: ZBATCH_ZONE(잔여 유통기한 30% 미달 시 정상→임박 311 자동이동) /
    ZPRICE_CHECK(EINE-NETPR vs MBEW-VERPR 괴리 알림) /
    ZGATE_INSPECT(GR 101 vs STOR이관 301 차이 → 송장 미발생 건 122 자동반품)
  - 원칙: 표준 우선, 회계 영향 처리는 자동화 안 함, 전표는 BAPI, CBO 테이블에 상태필드(W/P/H)
  - 연결점이 억지스러우면 쓰지 않는다. 있는 것만

## 경로 (절대 틀리면 안 됨)

- `../../assets/gate.js` (head 최상단 script) · `../../assets/favicon.svg` ·
  `../../assets/notes-paper.css` · `../../assets/hub.js` (body 끝 defer)
- crumb: `<a href="../../index.html">← 자료실 홈</a> · <a href="../../journey.html?j=<저니키>">
  <저니라벨> 저니</a> · <코스코드> <짧은제목>`

## 검증 (반드시 실행)

```
python3 - <<'PY'
import re
f='notes/<저니>/<slug>.html'
h=open(f,encoding='utf-8').read()
ids=set(re.findall(r'id="(l\w+)"',h)); anc=set(re.findall(r'href="#(l\w+)"',h))
print("div",h.count('<div'),h.count('</div>'),"| 앵커누락",sorted(anc-ids),
      "| doc-head",h.count('doc-head'),"| body",h.count('<body>'),
      "| svg",h.count('<svg'),"| bytes",len(h.encode()))
PY
```
`div` 개수 일치 · 앵커누락 없음 · doc-head 1 · body 1 · svg 2 이상이어야 통과.

## 하지 말 것

- `assets/data.js` · `index.html` · `journey.html` · `assets/notes-paper.css` ·
  `assets/hub.js` · `assets/hub.css` 수정 — **다른 에이전트와 충돌한다. 절대 건드리지 않는다**
- 노트 안에 이전/다음 링크 직접 작성 (hub.js 가 주입)
- 자기 노트 외의 파일 생성·수정
- base64 이미지 인라인
