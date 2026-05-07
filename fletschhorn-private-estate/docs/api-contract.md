# API contract

Frontend requests only GET /api/fletschhorn-property. Proxies for Cloudflare, Netlify and Vercel keep Guesty/Getty credentials server-side, normalize data into propertyName, headline, location, maxGuests, roomsSuites, rentalType, images, amenities, bookingUrl, inquiryEmail and languages, and return fallback data on failure.
