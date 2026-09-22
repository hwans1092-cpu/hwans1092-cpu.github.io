/* SAP Learning Hub 자료실 — 홈/저니 렌더링 + 노트 이전·다음 네비게이션
   화면은 전부 assets/data.js 의 window.HUB 하나에서 만들어진다.
   노트를 추가하면 data.js 의 st 를 "todo" → "done" 으로 바꾸기만 하면 된다. */
(function(){
  var H = window.HUB; if(!H) return;

  /* ── 공용 계산 ─────────────────────────────────────── */
  function own(j){ return j.courses.filter(function(c){ return c.st!=='ref'; }); }
  function stats(j){
    var o=own(j), d=o.filter(function(c){return c.st==='done';});
    return { notes:o.length, done:d.length, pages:o.reduce(function(a,c){return a+c.pages;},0),
             pct: o.length? Math.round(d.length/o.length*100) : 0 };
  }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }

  /* ── 홈 ────────────────────────────────────────────── */
  function renderHome(el){
    var tn=0, td=0, tp=0;
    var html = H.journeys.map(function(j){
      var s=stats(j); tn+=s.notes; td+=s.done; tp+=s.pages;
      return '<a class="jcard" href="journey.html?j='+j.key+'" style="border-top-color:'+j.color+'"'+
        ' data-k="'+esc(j.key+' '+j.label+' '+j.title+' '+j.desc+' '+j.courses.map(function(c){return c.code+' '+c.title;}).join(' '))+'">'+
        '<span class="badge" style="background:'+j.color+'18;color:'+j.color+'">'+esc(j.label)+'</span>'+
        '<h3>'+esc(j.title)+'</h3><p>'+esc(j.desc)+'</p>'+
        '<div class="bar"><i style="width:'+s.pct+'%;background:'+j.color+'"></i></div>'+
        '<div class="meta"><span>노트 '+s.done+' / '+s.notes+'건</span><span>노션 원본 '+s.pages+'장</span><span>'+s.pct+'%</span></div>'+
        '</a>';
    }).join('');
    el.innerHTML = html;
    var m={notes:tn,done:td,pages:tp};
    Object.keys(m).forEach(function(k){
      var n=document.querySelector('[data-stat="'+k+'"]'); if(n) n.textContent=m[k];
    });
  }

  /* ── 저니 ──────────────────────────────────────────── */
  function renderJourney(el){
    var key=(location.search.match(/[?&]j=([\w-]+)/)||[])[1];
    var j=H.journeys.filter(function(x){return x.key===key;})[0];
    if(!j){ el.innerHTML='<div class="empty">저니를 찾을 수 없습니다. <a href="index.html">홈으로</a></div>'; return; }
    var s=stats(j);
    document.title = j.label+' — '+j.title;
    var h=document.querySelector('[data-jtitle]'); if(h) h.textContent=j.title;
    var d=document.querySelector('[data-jdesc]');  if(d) d.textContent=j.desc;
    var b=document.querySelector('[data-jbadge]');
    if(b){ b.textContent=j.label; b.style.background=j.color+'18'; b.style.color=j.color; }
    var st=document.querySelector('[data-jstat]');
    if(st) st.innerHTML='노트 <b>'+s.done+' / '+s.notes+'</b>건 변환 · 노션 원본 <b>'+s.pages+'</b>장 · 진행률 <b>'+s.pct+'%</b>';

    el.innerHTML = j.courses.map(function(c){
      var label = c.st==='done'?'변환 완료':(c.st==='ref'?'링크 재사용':'변환 대기');
      var body =
        '<div class="no">'+String(c.no).padStart(2,'0')+'</div>'+
        '<div class="ti"><span class="code">'+esc(c.code)+'</span>'+esc(c.title)+'</div>'+
        '<div class="hr">'+esc(c.hours)+' · 원본 '+c.pages+'장</div>'+
        '<div class="stt '+c.st+'">'+label+'</div>';
      if(c.st==='todo') return '<div class="crow is-todo">'+body+'</div>';
      var href = c.st==='ref' ? 'notes/'+c.slug.replace(/^\.\.\//,'')+'.html'
                              : 'notes/'+j.key+'/'+c.slug+'.html';
      return '<a class="crow" href="'+href+'">'+body+'</a>';
    }).join('');
  }

  /* ── 노트 이전/다음 ────────────────────────────────── */
  function renderNoteNav(){
    var m = location.pathname.replace(/\\/g,'/').match(/notes\/([\w-]+)\/([\w.-]+)\.html$/);
    if(!m) return;
    var jkey=m[1], slug=m[2];
    var j=H.journeys.filter(function(x){return x.key===jkey;})[0]; if(!j) return;
    var done=own(j).filter(function(c){return c.st==='done';});
    var i=done.findIndex(function(c){return c.slug===slug;});
    if(i<0) return;
    var nav=document.createElement('div'); nav.className='doc-nav';
    var prev=done[i-1], next=done[i+1];
    nav.innerHTML =
      (prev?'<a class="prev" href="'+prev.slug+'.html">← '+esc(prev.title)+'</a>':'<a class="prev" href="../../journey.html?j='+jkey+'">← '+esc(j.label)+' 저니 목록</a>')+
      (next?'<a class="next" href="'+next.slug+'.html">'+esc(next.title)+' →</a>':'<a class="next" href="../../index.html">자료실 홈 →</a>');
    var sheet=document.querySelector('.sheet'); if(sheet) sheet.appendChild(nav);
  }

  /* ── 검색 (홈) ─────────────────────────────────────── */
  function bindSearch(){
    var inp=document.querySelector('.search input'); if(!inp) return;
    inp.addEventListener('input', function(){
      var q=this.value.trim().toLowerCase();
      document.querySelectorAll('.jcard').forEach(function(c){
        c.style.display = (!q || (c.dataset.k||'').toLowerCase().indexOf(q)>=0) ? '' : 'none';
      });
    });
  }

  /* ── 읽기 진행바 (노트) ────────────────────────────── */
  function progressBar(){
    if(!document.querySelector('.sheet')) return;
    var bar=document.createElement('div');
    bar.style.cssText='position:fixed;top:0;left:0;height:3px;width:0;background:#4338CA;z-index:99;transition:width .1s';
    document.body.appendChild(bar);
    addEventListener('scroll', function(){
      var h=document.documentElement.scrollHeight-innerHeight;
      bar.style.width = (h>0 ? (scrollY/h*100) : 0)+'%';
    }, {passive:true});
  }

  document.addEventListener('DOMContentLoaded', function(){
    var home=document.getElementById('jgrid');       if(home) { renderHome(home); bindSearch(); }
    var jour=document.getElementById('clist');       if(jour) renderJourney(jour);
    renderNoteNav(); progressBar();
  });
})();
