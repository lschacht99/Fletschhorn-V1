# Multilingual plan

The site is structured for four launch languages: English, French, German and Russian. The language switcher must always present the options as `EN / FR / DE / RU` so Russian can be added without redesigning the navigation or mobile menu.

## Source files

- `src/data/languages.json` is the language registry and now includes `en`, `fr`, `de` and `ru`.
- `src/js/fletschhorn-i18n.js` stores the selected language, validates it against the supported list, updates `document.documentElement.lang`, marks the active switcher option with `aria-current`, and can hydrate any future `[data-i18n]` strings.
- Page-level translated content should be added to `src/data/page-content.json` or a future provider-specific translation feed using stable page keys.

## Translation workflow

1. Keep English as the fallback language.
2. Add approved French, German and Russian copy by page and by key.
3. Use stable keys such as `home.hero.headline`, `property.spa.title`, and `contact.form.submit`.
4. Test desktop navigation, mobile menu, footer language display and Squarespace page code blocks after every language addition.
5. Avoid hard-coding provider API text directly into the frontend unless it is already normalized and translated server-side.
