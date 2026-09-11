/* SAP 학습 자료실 — 공용 UI 유틸리티
   읽기 진행률 바 · 맨 위로 가기 · 코드 복사 버튼 · 문서 간 이전/다음 이동 · 홈 검색 필터.
   페이지별 디자인 시스템(색상 변수)에 의존하지 않도록 자체 스타일을 주입합니다. */
(function () {
  "use strict";

  var SITE_CSS =
    ".reading-progress{position:fixed;top:0;left:0;height:3px;width:0%;" +
      "background:linear-gradient(90deg,#3A3CC0,#6D6FE0);z-index:2147482000;" +
      "transition:width .08s linear;}" +
    "@media print{.reading-progress{display:none;}}" +

    ".back-to-top{position:fixed;right:22px;bottom:22px;width:44px;height:44px;" +
      "border-radius:50%;border:none;background:#26273A;color:#fff;font-size:18px;" +
      "line-height:1;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.28);" +
      "display:flex;align-items:center;justify-content:center;" +
      "opacity:0;transform:translateY(8px);pointer-events:none;" +
      "transition:opacity .18s ease,transform .18s ease,background .15s ease;" +
      "z-index:2147481000;}" +
    ".back-to-top.show{opacity:1;transform:translateY(0);pointer-events:auto;}" +
    ".back-to-top:hover{background:#3A3CC0;}" +
    "@media print{.back-to-top{display:none;}}" +

    "pre{position:relative;}" +
    ".copy-btn{position:absolute;top:8px;right:8px;padding:4px 10px;font-size:10.5px;" +
      "font-family:inherit;font-weight:600;letter-spacing:.02em;color:#fff;" +
      "background:rgba(30,30,40,.55);border:1px solid rgba(255,255,255,.18);" +
      "border-radius:5px;cursor:pointer;opacity:0;transition:opacity .12s ease,background .15s ease;}" +
    "pre:hover .copy-btn,.copy-btn:focus-visible{opacity:1;}" +
    ".copy-btn:hover{background:rgba(58,60,192,.85);}" +
    ".copy-btn.copied{background:rgba(14,122,82,.9);opacity:1;}" +
    "@media print{.copy-btn{display:none;}}" +
    "@media (max-width:640px){.copy-btn{opacity:1;}}";

  function injectStyle(css) {
    var s = document.createElement("style");
    s.setAttribute("data-source", "site.js");
    s.textContent = css;
    document.head.appendChild(s);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function initProgressBar() {
    var bar = document.createElement("div");
    bar.className = "reading-progress";
    document.body.appendChild(bar);

    function update() {
      var el = document.documentElement;
      var scrollTop = el.scrollTop || document.body.scrollTop;
      var scrollHeight = (el.scrollHeight || document.body.scrollHeight) - el.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initBackToTop() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "맨 위로 이동");
    btn.textContent = "↑";
    document.body.appendChild(btn);

    function toggle() {
      if (window.scrollY > 480) btn.classList.add("show");
      else btn.classList.remove("show");
    }
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  function flashCopied(btn) {
    var original = btn.textContent;
    btn.textContent = "복사됨";
    btn.classList.add("copied");
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 1400);
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); flashCopied(btn); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function initCopyButtons() {
    var pres = document.querySelectorAll("pre");
    if (!pres.length) return;
    pres.forEach(function (pre) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "복사";
      btn.addEventListener("click", function () {
        var text = pre.innerText;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(
            function () { flashCopied(btn); },
            function () { fallbackCopy(text, btn); }
          );
        } else {
          fallbackCopy(text, btn);
        }
      });
      pre.appendChild(btn);
    });
  }

  /* 학습 순서 — 홈 화면에 표시되는 01·02·03 순서와 동일 */
  var DOCS = [
    { file: "abap-parallel-file-staging.html", title: "병렬처리 확장편 — 대외 연계 · AL11 Staging" },
    { file: "eai-integration-suite.html", title: "SAP Integration Suite 학습 노트" },
    { file: "abap-debugging.html", title: "ABAP 디버깅 실무 노트" }
  ];

  function initDocNav() {
    var path = location.pathname.replace(/\/+$/, "");
    var idx = -1;
    for (var i = 0; i < DOCS.length; i++) {
      if (path.indexOf(DOCS[i].file) !== -1) { idx = i; break; }
    }
    if (idx === -1) return;

    var container = document.querySelector(".sheet") || document.querySelector(".wrap");
    if (!container) return;

    var prev = idx > 0 ? DOCS[idx - 1] : null;
    var next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null;

    var nav = document.createElement("div");
    nav.className = "doc-nav";

    var left = document.createElement("div");
    left.className = "prev";
    left.innerHTML = prev
      ? '<a href="/notes/' + prev.file + '">← ' + prev.title + '</a>'
      : '<a href="/">← SAP 학습 자료실 홈</a>';
    nav.appendChild(left);

    var right = document.createElement("div");
    right.className = "next";
    right.innerHTML = next
      ? '<a href="/notes/' + next.file + '">' + next.title + ' →</a>'
      : '<a href="/">SAP 학습 자료실 홈 →</a>';
    nav.appendChild(right);

    container.appendChild(nav);
  }

  function initIndexSearch() {
    var input = document.getElementById("site-search-input");
    if (!input) return;

    var countEl = document.getElementById("site-search-count");
    var allCards = Array.prototype.slice.call(document.querySelectorAll(".card"));
    if (!allCards.length) return;

    function norm(s) { return (s || "").toLowerCase(); }

    /* 카드 자체 문구뿐 아니라, 카드가 속한 패키지 제목·설명·내부 코드,
       그리고 눈에 안 보이는 data-keywords(문서 안 실제 용어)까지 검색 대상에 포함 */
    function searchText(card) {
      var pkg = card.closest(".pkg");
      var pkgText = "";
      if (pkg) {
        var h2 = pkg.querySelector(".pkg-head h2");
        var desc = pkg.querySelector(".pkg-desc");
        var pkgId = pkg.querySelector(".pkg-id");
        pkgText = (h2 ? h2.textContent : "") + " " +
                  (desc ? desc.textContent : "") + " " +
                  (pkgId ? pkgId.textContent : "");
      }
      return norm(card.textContent + " " + (card.dataset.keywords || "") + " " + pkgText);
    }

    function filter() {
      var q = norm(input.value).trim();
      var shown = 0;

      allCards.forEach(function (card) {
        if (!q) {
          card.style.display = "";
          if (!card.classList.contains("empty")) shown++;
          return;
        }
        if (card.classList.contains("empty")) {
          card.style.display = "none";
          return;
        }
        var match = searchText(card).indexOf(q) !== -1;
        card.style.display = match ? "" : "none";
        if (match) shown++;
      });

      if (countEl) countEl.textContent = q ? shown + "건 검색됨" : "";

      document.querySelectorAll(".pkg").forEach(function (pkg) {
        if (!q) { pkg.style.display = ""; return; }
        var visible = pkg.querySelectorAll(".card:not(.empty)");
        var any = Array.prototype.some.call(visible, function (c) {
          return c.style.display !== "none";
        });
        pkg.style.display = any ? "" : "none";
      });
    }

    input.addEventListener("input", filter);
  }

  ready(function () {
    injectStyle(SITE_CSS);
    initProgressBar();
    initBackToTop();
    initCopyButtons();
    initDocNav();
    initIndexSearch();
  });
})();
