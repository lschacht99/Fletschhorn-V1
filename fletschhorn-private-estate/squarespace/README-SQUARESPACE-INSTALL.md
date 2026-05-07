# Squarespace install


1. Paste `squarespace/custom-css.css` into Squarespace Custom CSS.
2. Paste `squarespace/global-header-injection.html` into Header Code Injection.
3. Paste `squarespace/global-footer-injection.html` into Footer Code Injection.
4. Create the seven pages manually in Squarespace.
5. Paste the matching file from `squarespace/pages/` into a Code Block on each page.
6. Update `window.FH_CONFIG.apiEndpoint` to your deployed `/api/fletschhorn-property` endpoint and set `useApi: true`.
7. Deploy an API proxy separately and connect it.
