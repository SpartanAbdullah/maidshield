# Product Requirements Document (PRD)

## Product
MaidShield MVP: a web calculator that provides estimate ranges and supporting assumptions for domestic worker cost/compliance planning.

## MVP Scope
- Input collection for core estimate factors:
  - Location (state/region)
  - Worker type and expected weekly hours
  - Pay cadence and hourly/rate assumptions
  - Start date and coverage period
  - Optional benefits/taxes toggles
- Calculation engine that returns:
  - Low/median/high estimate range
  - Line-item breakdown (wages, taxes, fees, optional add-ons)
  - Assumption summary and confidence notes
- Result presentation:
  - On-screen summary cards + detailed table
  - Export-ready printable summary format (future PDF generation hooks)
- Basic health endpoint/status route for deployment checks.

## Personas
- Household Employer (Primary): needs a quick planning estimate before hiring.
- Operations/Advisor (Secondary): needs transparent assumptions to explain estimates to clients.
- Internal Product/Support (Tertiary): needs reproducible scenarios for QA and troubleshooting.

## Success Metrics
- 95%+ successful calculation completion rate for valid forms.
- Median time to first estimate under 90 seconds.
- Less than 2% validation-error loops after initial form completion.
- 99.9% health endpoint uptime in production.

## Non-Goals (MVP)
- No legal determination or jurisdiction-specific legal advice.
- No payroll filing, tax submission, or payment processing.
- No account-based history syncing in MVP.
- No automated legal document generation in MVP.

