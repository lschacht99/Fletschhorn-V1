# Fletschhorn Private Estate

A complete vanilla HTML/CSS/JavaScript repository for repositioning Waldhotel Fletschhorn as **Fletschhorn Private Estate**: a luxury Swiss alpine property available for exclusive whole-property rental.

Core message: this is not a room-booking hotel site. Visitors inquire to reserve the full estate for private stays, weddings, retreats, family gatherings, corporate events and meaningful alpine gatherings. The fallback property data presents 14 rooms and suites, with capacity up to 67 guests by arrangement.

## Local preview

Open `preview/index.html` directly in a browser, or run:

```bash
npm run preview
```

Then visit `http://localhost:4173`. The preview uses hash-based page routing for all seven pages and does not require the API.

## Squarespace install

1. Paste `squarespace/custom-css.css` into Squarespace Custom CSS.
2. Paste `squarespace/global-header-injection.html` into Header Code Injection.
3. Paste `squarespace/global-footer-injection.html` into Footer Code Injection.
4. Create the seven pages manually in Squarespace.
5. Paste the matching file from `squarespace/pages/` into a Code Block on each page.
6. Update `window.FH_CONFIG.apiEndpoint` to your deployed `/api/fletschhorn-property` endpoint and set `useApi: true`.
7. Deploy an API proxy separately and connect it.

## API proxy options

- `api/cloudflare-worker/worker.js`
- `api/netlify-function/fletschhorn-property.js`
- `api/vercel-api/fletschhorn-property.js`

Each proxy reads secrets from environment variables, restricts CORS to `ALLOWED_ORIGIN`, normalizes Guesty/Getty data, and returns fallback data if upstream calls fail.

## Editing content and images

- Page copy: `src/data/page-content.json` and the page code blocks.
- SEO metadata: `src/data/seo.json`.
- Fallback facts/images: `src/data/fallback-property.json`.
- Image treatment: CSS variables such as `--fh-hero-image`, with clay-white/mineral overlays and desaturated filters.
- Booking links/email: `src/js/fletschhorn-config.js`, `.env.example`, and Squarespace header injection.
- Translations: live English, French, German and Russian strings are managed in `src/data/languages.json`, mirrored in `src/data/page-content.json`, and applied by `src/js/fletschhorn-i18n.js` using `data-i18n` and `data-i18n-placeholder`.

## Header, hamburger menu and footer

Reusable source partials live in `src/partials/`. The Squarespace header/footer injection files include the same navigation DNA, mobile menu, language placeholder, footer CTA and discreet credit: `Designed by moshe.cohen.h1@gmail.com`.

## Design principles

The CSS enforces a sharp, architectural mineral-grey and clay-white luxury system: no rounded corners, no pill buttons, controlled 72–82vh desktop heroes, page-specific visual moods, mobile inquiry panels, thin lines, rectangular image panels, editorial typography, atmospheric overlays, scroll reveals, floating fact cards and reduced-motion support.
