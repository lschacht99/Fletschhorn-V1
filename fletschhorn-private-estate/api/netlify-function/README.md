# Netlify Function proxy

Deploy this endpoint as `/api/fletschhorn-property`. It reads Guesty/Getty credentials only from environment variables, normalizes provider data into the frontend contract, sends CORS for `ALLOWED_ORIGIN`, caches where supported, and returns fallback property data if the upstream API fails.

Update the marked mapping logic once the final Guesty or Getty schema is confirmed. Do not place API keys in Squarespace or frontend JavaScript.
