(function(){
  const supportedLanguages = ['en', 'fr', 'de', 'ru'];
  const fallbackLanguage = 'en';
  const translations = window.FH_TRANSLATIONS || {};
  const storedLanguage = localStorage.getItem('fh_language');
  const browserLanguage = (navigator.language || fallbackLanguage).slice(0, 2).toLowerCase();
  const state = {
    language: supportedLanguages.includes(storedLanguage) ? storedLanguage : (supportedLanguages.includes(browserLanguage) ? browserLanguage : fallbackLanguage)
  };

  function translateNode(node, language){
    const key = node.getAttribute('data-i18n');
    const value = translations?.[language]?.[key] || translations?.[fallbackLanguage]?.[key];
    if(value) node.textContent = value;
  }

  function setLanguage(code){
    const nextLanguage = supportedLanguages.includes(code) ? code : fallbackLanguage;
    state.language = nextLanguage;
    localStorage.setItem('fh_language', nextLanguage);
    document.documentElement.lang = nextLanguage;
    document.querySelectorAll('[data-fh-current-lang]').forEach(el => { el.textContent = nextLanguage.toUpperCase(); });
    document.querySelectorAll('[data-fh-lang]').forEach(btn => { btn.toggleAttribute('aria-current', btn.dataset.fhLang === nextLanguage); });
    document.querySelectorAll('[data-i18n]').forEach(node => translateNode(node, nextLanguage));
  }

  function initI18n(){
    document.querySelectorAll('[data-fh-lang]').forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', () => setLanguage(btn.dataset.fhLang));
    });
    setLanguage(state.language);
  }

  window.FHI18n = { initI18n, setLanguage, supportedLanguages, fallbackLanguage };
})();
