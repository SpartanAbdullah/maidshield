# Launch Checklist

## Before release
- Confirm `npm run build` passes on the release branch.
- Confirm calculator sanity cases:
  - Valid dates + valid salary shows estimate.
  - End date before start date shows validation.
  - Unpaid leave reduces adjusted service days.
  - Print summary opens correctly.
- Confirm homepage CTA opens calculator.
- Confirm checklist, FAQ, sources, pricing, privacy, and terms links work.
- Confirm footer text is centered and reads `Made with 💖 in 🇦🇪`.
- Confirm no visible mojibake or broken separators remain.
- Confirm pricing and Pro copy do not contradict the live calculator.
- Confirm waitlist form submits and duplicate handling still behaves correctly.
- Confirm Plausible or analytics script is present in production when expected.

## Pre-deploy sanity checks
- Verify target branch is the intended deploy branch, not a working Codex branch.
- Confirm production environment variables exist.
- Confirm canonical URLs and sitemap paths are still correct.
- Confirm feature flags match the intended launch posture.
- Confirm no placeholder UI is exposed unintentionally.

## Immediately after deploy
- Open homepage on desktop and mobile width.
- Open calculator and run one real estimate.
- Open print summary.
- Open pricing, FAQ, checklist, privacy, and terms.
- Submit one waitlist test with a non-production email if safe.
- Confirm analytics events begin arriving for page views and calculator actions.

## First 24 hours
- Check calculator completion rate.
- Check print action rate.
- Check waitlist signups and duplicate pattern.
- Check for front-end errors or broken pages.
- Log any user confusion around print limits, saved scenarios, or result interpretation.