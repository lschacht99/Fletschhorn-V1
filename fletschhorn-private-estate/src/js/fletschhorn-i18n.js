(function(){
  const supportedLanguages = ['en', 'fr', 'de', 'ru'];
  const fallbackLanguage = 'en';
  const translations = window.FH_TRANSLATIONS || {};

  function getValue(language, key){
    return translations?.[language]?.[key] || translations?.[fallbackLanguage]?.[key] || '';
  }

  function getInitialLanguage(){
    const stored = localStorage.getItem('fh_language');
    if(supportedLanguages.includes(stored)) return stored;
    return fallbackLanguage;
  }

  function applyTranslations(language){
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = getValue(language, node.getAttribute('data-i18n'));
      if(value) node.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
      const value = getValue(language, node.getAttribute('data-i18n-placeholder'));
      if(value) node.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-fh-lang]').forEach(btn => {
      const active = btn.dataset.fhLang === language;
      btn.toggleAttribute('aria-current', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('type', 'button');
    });
  }

  function setLanguage(code){
    const language = supportedLanguages.includes(code) ? code : fallbackLanguage;
    localStorage.setItem('fh_language', language);
    applyTranslations(language);
    return language;
  }

  function initI18n(){
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-fh-lang]');
      if(!button) return;
      event.preventDefault();
      setLanguage(button.dataset.fhLang);
      const menu = button.closest('[data-fh-mobile-menu]');
      if(menu && window.FHUi && typeof window.FHUi.closeMobileMenu === 'function') window.FHUi.closeMobileMenu();
    });
    applyTranslations(getInitialLanguage());
  }

  window.FHI18n = { initI18n, setLanguage, refresh: () => applyTranslations(getInitialLanguage()), supportedLanguages, fallbackLanguage };
})();
