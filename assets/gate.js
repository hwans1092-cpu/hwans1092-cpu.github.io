/* SAP 학습 자료실 — 간단 접속 잠금 화면
   클라이언트 측 확인만 수행하는 가벼운 게이트입니다.
   진짜 보안이 필요한 자료라면 서버 측 인증으로 교체해야 합니다. */
(function () {
  var STORAGE_KEY = "sap_learning_auth";
  var PASSWORD = "CL04";
  var root = document.documentElement;

  root.style.visibility = "hidden";

  function reveal() {
    root.style.visibility = "";
  }

  if (sessionStorage.getItem(STORAGE_KEY) === "ok") {
    reveal();
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();

    var overlay = document.createElement("div");
    overlay.id = "sap-gate";
    overlay.innerHTML =
      '<form class="sap-gate-card" autocomplete="off">' +
        '<div class="sap-gate-eyebrow">ACCESS RESTRICTED</div>' +
        '<h1 class="sap-gate-title">SAP 학습 자료실</h1>' +
        '<p class="sap-gate-lede">비밀번호를 입력하면 학습 자료를 볼 수 있습니다.</p>' +
        '<label class="sap-gate-label" for="sap-gate-input">PASSWORD</label>' +
        '<input class="sap-gate-input" id="sap-gate-input" type="password" inputmode="text" autocomplete="off" spellcheck="false" required />' +
        '<p class="sap-gate-hint">영문 대문자 + 숫자 4자리 · 대소문자를 구분합니다</p>' +
        '<p class="sap-gate-error" role="alert">비밀번호가 올바르지 않습니다.</p>' +
        '<button class="sap-gate-btn" type="submit">입장</button>' +
      "</form>";

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    reveal();

    var form = overlay.querySelector("form");
    var input = overlay.querySelector(".sap-gate-input");
    var card = overlay.querySelector(".sap-gate-card");
    var errorMsg = overlay.querySelector(".sap-gate-error");

    setTimeout(function () {
      input.focus();
    }, 60);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (input.value === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, "ok");
        document.body.style.overflow = "";
        overlay.remove();
        return;
      }

      errorMsg.style.display = "block";
      card.classList.remove("sap-gate-shake");
      // restart animation
      void card.offsetWidth;
      card.classList.add("sap-gate-shake");
      input.value = "";
      input.focus();
    });
  });

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent =
      "#sap-gate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;" +
      "padding:24px;background:radial-gradient(760px 520px at 82% -6%,rgba(90,92,220,.16),transparent 60%),#15161C;" +
      "font-family:'IBM Plex Sans KR','Malgun Gothic',system-ui,-apple-system,sans-serif;}" +
      ".sap-gate-card{width:100%;max-width:360px;background:#1D1E27;border:1px solid #33354A;border-radius:12px;" +
      "padding:32px 30px 28px;box-shadow:0 24px 60px -20px rgba(0,0,0,.6);}" +
      ".sap-gate-eyebrow{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.12em;" +
      "color:#8B8DF0;font-weight:600;margin-bottom:14px;}" +
      ".sap-gate-title{margin:0 0 8px;font-size:21px;font-weight:700;color:#EEF0FA;letter-spacing:-.01em;}" +
      ".sap-gate-lede{margin:0 0 22px;font-size:13.5px;line-height:1.6;color:#9497AC;}" +
      ".sap-gate-label{display:block;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11px;" +
      "letter-spacing:.08em;color:#6D6FE0;font-weight:600;margin-bottom:8px;}" +
      ".sap-gate-input{width:100%;box-sizing:border-box;background:#12131A;border:1px solid #33354A;border-radius:7px;" +
      "padding:11px 13px;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:16px;letter-spacing:.06em;" +
      "color:#EEF0FA;outline:none;transition:border-color .15s ease;}" +
      ".sap-gate-input:focus{border-color:#6D6FE0;}" +
      ".sap-gate-hint{margin:9px 0 0;font-size:11.5px;color:#6A6D82;}" +
      ".sap-gate-error{display:none;margin:12px 0 0;font-size:12.5px;color:#F09590;font-weight:600;}" +
      ".sap-gate-btn{width:100%;margin-top:18px;padding:12px;border:none;border-radius:7px;background:#3A3CC0;" +
      "color:#fff;font-family:'IBM Plex Sans KR',system-ui,sans-serif;font-size:14.5px;font-weight:700;" +
      "cursor:pointer;transition:background .15s ease,transform .08s ease;}" +
      ".sap-gate-btn:hover{background:#4749D6;}" +
      ".sap-gate-btn:active{transform:scale(.98);}" +
      "@keyframes sapGateShake{10%,90%{transform:translateX(-1px);}20%,80%{transform:translateX(2px);}" +
      "30%,50%,70%{transform:translateX(-4px);}40%,60%{transform:translateX(4px);}}" +
      ".sap-gate-shake{animation:sapGateShake .4s ease;}";
    document.head.appendChild(style);
  }
})();
