(function(){
  const state={language:localStorage.getItem('fh_language')||'en'};
  function setLanguage(code){ state.language=code; localStorage.setItem('fh_language',code); document.documentElement.lang=code; document.querySelectorAll('[data-fh-current-lang]').forEach(el=>el.textContent=code.toUpperCase()); }
  function initI18n(){ document.querySelectorAll('[data-fh-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.fhLang))); setLanguage(state.language); }
  window.FHI18n={initI18n,setLanguage};
})();
