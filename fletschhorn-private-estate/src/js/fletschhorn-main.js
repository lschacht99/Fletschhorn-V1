(function(){
  function initRouting(){
    document.addEventListener('click',e=>{ const link=e.target.closest('[data-fh-route]'); if(link && document.querySelector('[data-fh-page]')){ e.preventDefault(); location.hash=link.dataset.fhRoute; } });
    const pages=[...document.querySelectorAll('[data-fh-page]')];
    if(!pages.length) return;
    function show(){ const slug=(location.hash||'#home').replace('#','')||'home'; pages.forEach(p=>p.classList.toggle('is-active',p.dataset.fhPage===slug)); document.querySelectorAll('[data-fh-route]').forEach(a=>a.toggleAttribute('aria-current',a.dataset.fhRoute===slug)); window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); }
    window.addEventListener('hashchange',show); show();
  }
  document.addEventListener('DOMContentLoaded',async()=>{ initRouting(); FHUi.initMobileMenu(); FHUi.initForms(); FHUi.initReveal(); const data=await FHApi.getProperty(); FHApi.applyProperty(data); FHI18n.initI18n(); });
})();
