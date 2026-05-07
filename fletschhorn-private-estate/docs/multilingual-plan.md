# Multilingual plan

The site now ships with a real runtime translation dictionary for English, French, German and Russian. The language switcher presents `EN / FR / DE / RU` in desktop navigation and the mobile hamburger menu, and text changes immediately without a page reload.

## Source files

- `src/data/languages.json` is the language registry and includes the full `translations` object.
- `src/data/page-content.json` mirrors the translation dictionary for content editing workflows.
- `src/js/fletschhorn-i18n.js` reads the selected language from `localStorage`, falls back to English, updates `document.documentElement.lang`, translates `[data-i18n]`, translates `[data-i18n-placeholder]`, and marks active language buttons with `aria-current` and `aria-pressed`.
- `src/js/fletschhorn-main.js` calls the translation refresh after preview page switching so the chosen language remains active while navigating.
- Squarespace header/footer injections inline `window.FH_TRANSLATIONS` so pages work without a build system or frontend API.

## Translation workflow

1. Keep English as the fallback language.
2. Edit approved French, German and Russian copy inside `src/data/languages.json` and the embedded `window.FH_TRANSLATIONS` source used by Squarespace injections.
3. Add new visible text with `data-i18n="namespace.key"` or `data-i18n-placeholder="namespace.placeholder"`.
4. Test EN, FR, DE and RU on desktop navigation, mobile menu, page switching and form placeholders.
5. Keep the design credit in English: `Designed by moshe.cohen.h1@gmail.com`.
