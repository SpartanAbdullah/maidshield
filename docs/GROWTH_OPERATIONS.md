# Phase 4 Growth Operations Implementation

## 1) Analytics events enabled

All analytics events are privacy-first and avoid sending PII (no names/emails in event payloads).
Events are sent through `lib/analytics.ts` and include `page_path` context automatically.

### Core conversion/product events
- `homepage_cta_clicked` — main homepage CTA clicks.
- `calc_started` — calculator flow entry (top nav + page view).
- `calc_submitted` — calculate action with valid inputs.
- `result_printed` — print summary action.
- `result_downloaded` — CSV export download.
- `waitlist_signup` — successful non-duplicate waitlist submission.
- `waitlist_duplicate_submission` — duplicate submission gracefully handled.
- `faq_question_opened` — FAQ details panel opened.
- `pricing_cta_clicked` — pricing page CTA clicks.
- `internal_link_clicked` — all internal link clicks.

### Growth/content/monitoring events
- `scroll_depth_reached` — 25/50/75/100% page depth.
- `content_engagement` — 15-second engagement marker.
- `feature_flag_exposed` — user exposed to flag state.
- `feature_flag_interaction` — reserved for experiment click outcomes.
- `front_end_error` — `window.error` and unhandled promise rejection.
- `analytics_delivery_missing` — analytics client missing in production.
- `user_abandonment` — `pagehide` marker.
- `broken_page_detected` — 404 route detection.

## 2) Dashboard set (Plausible recommended)

### Dashboard A — Daily calculator activity
Tracks:
- Unique visitors on `/calculator`
- `calc_started`
- `calc_submitted`

How to read:
- If `calc_started` rises but `calc_submitted` drops, input friction likely increased.

Where to fix:
- `app/calculator/page.tsx` validation and form UX.

### Dashboard B — Funnel conversion
Tracks:
- `homepage_cta_clicked` -> `calc_started` -> `result_printed`

How to read:
- Drop from homepage CTA to calculator start indicates routing, trust, or CTA clarity issue.
- Drop from submitted to print implies output trust/usability issue.

Where to fix:
- Homepage hero + CTA copy (`app/page.tsx`), calculator summary panel (`app/calculator/page.tsx`).

### Dashboard C — Waitlist conversion
Tracks:
- Waitlist form view pages (`/`, `/pro`, `/checklist`)
- `waitlist_signup`
- `waitlist_duplicate_submission`

How to read:
- High duplicates + low net signups means reminder copy can be improved.

Where to fix:
- `components/forms/LeadCapture.tsx`, `app/pro/page.tsx`.

### Dashboard D — SEO/content performance
Tracks:
- Pageviews + unique visitors for content pages (`/faq`, `/checklist`, `/sources`, `/settlement-planning-guide`)
- `scroll_depth_reached`
- `content_engagement`

How to read:
- High views + low 50% depth suggests weak intro or mismatch to search intent.

Where to fix:
- Respective content page copy and CTA placement.

### Dashboard E — Quality and reliability
Tracks:
- `front_end_error`
- `analytics_delivery_missing`
- `broken_page_detected`

How to read:
- Spikes indicate regressions or script loading issues.

Where to fix:
- `components/analytics/AnalyticsObserver.tsx`, deployment script loading, route integrity.

## 3) Feature flags

Location:
- `config/featureFlags.ts`
- `lib/featureFlags.ts`

Current flags:
- `alternateCtaText`
- `newUxFlowExperiment`
- `proTipTimingExperiment`
- `scenarioComparisonPlaceholder`
- `exportSpreadsheet`
- `languageSelector`

### Add/remove flags
1. Add key in `FeatureFlagKey` and config entry in `config/featureFlags.ts`.
2. Consume via `useFeatureFlag("yourFlag")` in client components.
3. Optional local override in browser devtools:
   - `localStorage.setItem("maidshield.feature_flag.yourFlag", "true")`

## 4) Waitlist workflow automation

Backend:
- `POST /api/lead` validates inputs and registers lead in `lib/server/waitlist.ts`.
- Duplicate emails are accepted gracefully and return `duplicate: true`.

Provider integrations:
- Mailchimp upsert (optional) via:
  - `MAILCHIMP_API_KEY`
  - `MAILCHIMP_AUDIENCE_ID`
  - `MAILCHIMP_SERVER_PREFIX`
- Webhook forwarding fallback via `LEADS_WEBHOOK_URL`.

Admin visibility:
- `GET /api/admin/waitlist` with header `x-admin-token: <WAITLIST_ADMIN_TOKEN>`
- Returns hashed email entries and counts (no raw email exposure).

## 5) Content growth prompts

Use low scroll depth + high impressions pages to prioritize refreshes.
Suggested sequence:
1. Improve CTA blocks where 75% scroll depth drops after engagement.
2. Add intent-matching FAQs on pages with high exits.
3. Add calculator deep links on high-performing SEO pages where `calc_started` is low.

## 6) Internationalization readiness

Delivered:
- Locale dictionaries in `lib/i18n/locales.ts`
- Language selector placeholder in `components/i18n/LanguageSelectorPlaceholder.tsx`
- Initial hreflang signals in `app/layout.tsx`

Next for full rollout:
- Route-level locale segments (`/en`, `/ar`)
- RTL CSS utility strategy
- Localized metadata per route + language sitemaps.

## 7) Monitoring and triage runbook

Alert rules (in analytics provider or error tool):
- `front_end_error` above baseline for 15m.
- `analytics_delivery_missing` non-zero after release.
- `broken_page_detected` spikes > baseline.

Triage order:
1. Confirm deploy + script availability.
2. Validate route map and recent content URL edits.
3. Roll back recent UI release if event volume correlates.
4. File issue with repro steps and impacted path.

## 8) Platform notes

### Vercel / Netlify
- Configure env vars for Plausible and waitlist integrations.
- Ensure production domain matches `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- Protect `WAITLIST_ADMIN_TOKEN` as secret.

### Hostinger / Odoo.sh or custom hosting
- Confirm outbound HTTPS allowed for Mailchimp/webhook.
- Ensure reverse proxy preserves `x-forwarded-for` for rate limiting.

## 9) Recommended roadmap priorities

### Short term (0–6 weeks)
- Turn on `alternateCtaText` and compare `homepage_cta_clicked` -> `calc_started`.
- Enable dashboard alerts and baseline conversion thresholds.
- Add first waitlist preview campaign to validate update cadence.

### Mid term (2–4 months)
- Implement true scenario comparison UI and CSV column expansion.
- Add Search Console integration for query/page cohorts.
- Introduce authenticated saved calculations.

### Long term (6+ months)
- Launch multilingual routes with full RTL support.
- Ship PDF certificate template with signed assumptions.
- Add lifecycle messaging by intent segment.
