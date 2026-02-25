# Software Requirements Specification (SRS)

## Functional Requirements
- FR-1 Input Form
  - System shall collect all required estimate inputs before calculation.
  - System shall display inline validation for missing/invalid fields.
- FR-2 Calculation Execution
  - System shall compute an estimate range and a line-item breakdown from inputs.
  - System shall support recalculation on user edits without route change.
- FR-3 Assumption Disclosure
  - System shall show assumptions used for each estimate component.
  - System shall label estimates as informational and non-binding.
- FR-4 Result Presentation
  - System shall render a summary view and detailed breakdown view.
  - System shall support a print-friendly output state.
- FR-5 Operational Reliability
  - System shall expose a health endpoint returning service readiness.

## Calculation Inputs
- Required:
  - `location`: jurisdiction/state identifier
  - `workerType`: role category
  - `hoursPerWeek`: numeric, > 0
  - `baseRate`: hourly/rate value, > 0
  - `startDate`: valid date
  - `coverageMonths`: integer, 1-12 (MVP default window)
- Optional:
  - `overtimeEnabled`: boolean
  - `benefitsIncluded`: boolean
  - `insuranceIncluded`: boolean
  - `agencyFeeMode`: none/fixed/percentage

## Calculation Outputs
- `estimateRange`: `{ low, median, high }`
- `lineItems`: array of `{ key, label, amount, basis }`
- `totals`: `{ monthly, periodTotal }`
- `assumptions`: array of text assumptions applied
- `warnings`: array of non-blocking informational flags

## Validation Rules (MVP baseline)
- Numeric inputs must be finite and within sensible ranges.
- Dates must be parseable and not malformed.
- Optional toggles must map to known enum values.
- Form submission must be blocked until required fields validate.

## Assumptions
- Rates and multipliers are rule-driven from internal tables, not live legal sources.
- Jurisdiction rules are simplified for MVP and may be coarse-grained.
- Estimates reflect planning values, not exact payroll outcomes.
- Currency and locale formatting default to U.S. conventions in MVP.

