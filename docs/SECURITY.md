# Security Guidelines

## PWA and Caching Rules
- Do not cache personally identifiable or user-entered financial fields in persistent client caches.
- Cache only static assets (hashed JS/CSS/fonts/images) with immutable strategy.
- API/form responses containing estimate inputs must use no-store/no-cache directives.
- If service worker is introduced, default-deny dynamic route caching and explicitly allow only static shells.

## MVP PWA Policy
- Manifest and install assets are static-only (`/manifest.json`, app icons, and static files).
- Service worker is online-first for pages and calculator routes; navigations are never served from cache.
- Cache allowlist is restricted to static assets (`/_next/static/*`, scripts, styles, fonts, images).
- HTML documents, print summaries, and API responses are never cached by the service worker.
- No user-entered calculator inputs are persisted in service worker storage.

## Data Minimization
- Store only fields strictly required for current calculation/session behavior.
- Avoid long-lived storage of raw user inputs in localStorage/sessionStorage unless required.
- Prefer in-memory state for active calculator sessions.
- Redact or hash identifiers in logs; never log full sensitive payloads.

## HTTP Security Headers (Target Baseline)
- `Content-Security-Policy` with least-privilege script/style origins.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` to disable unused browser capabilities.
- `Strict-Transport-Security` in production HTTPS environments.

## Auth Plan (Phased)
- MVP: no end-user auth for public calculator flow.
- Phase 2: add authenticated workspace/history with role separation.
- Use secure, HTTP-only cookies for session tokens when auth is added.
- Enforce CSRF protections and route-level authorization for protected endpoints.

## Operational Practices
- Run dependency audits during CI and before release windows.
- Keep Next.js and runtime dependencies patched within supported versions.
- Treat PDF export/rendering as untrusted input boundary and sanitize all rendered content.
