# Soft Launch Readiness Review

Reviewed: March 7, 2026

## Verdict
Ready for soft launch.

Why:
- The homepage, calculator, checklist, FAQ, sources, and legal pages now tell a consistent trust-first story.
- The calculator produces a clear result, shows assumptions and warnings, and now guides users to the next logical steps instead of ending in a dead panel.
- Monetization can stay directional for launch. The product is credible as a free planning tool first, with paid workflow features introduced only after usage signals justify them.

## Launch Findings

### Must fix before soft launch
- No open product blockers after this phase.
- Manual device QA, analytics verification, and release checks should still be completed before publishing.

### Can launch with this
- The calculator still uses a separate `Calculate` button even though the estimate updates live. This is acceptable for soft launch because it now acts as a validation prompt, but it can be simplified later.
- Free print access uses a light fair-use limit. This is acceptable because the flow now frames printing as part of light planning use rather than a guaranteed unlimited export path.
- Saved scenarios are local to one browser and capped at 10. That is acceptable for MVP as long as the product keeps saying they are local drafts.

### Nice to improve soon
- Add a short first-use note on the calculator explaining why the result is an estimate and how to interpret excluded items.
- Add richer print output such as a cleaner cover note or structured settlement checklist attachment.
- Add a small content CTA block on the About page that points directly to the calculator or checklist.

## Audit Notes By Surface
- Homepage: clear enough for soft launch. Core promise, no-account claim, and calculator CTA are strong.
- CTA clarity: good after keeping the core route focused on `Start free estimate` and `Use final settlement checklist`.
- Trust flow: good. Homepage to calculator to checklist/sources/FAQ now feels intentional.
- About page: credible enough after color-coded cards and plain-language scope statements.
- FAQ: useful and now clearer about local saved scenarios and light print usage.
- Checklist: useful and actionable. Bolded key terms improve scan quality without making the section feel loud.
- Pricing: now credible as directional packaging instead of pretending future features already exist.
- Legal/disclaimer clarity: acceptable for launch. Privacy, terms, and calculator disclaimers are aligned.
- Calculator usability: good for soft launch. Inputs, warnings, filled states, and breakdown are clear.
- Result interpretation: improved via stronger post-calculation guidance.
- Print flow: useful for soft launch. Still lightweight, but no longer contains broken separators.
- Mobile readiness: structure appears responsive. Still verify on a real device before publish.
- Internal links: no obvious broken path surfaced during this audit.
- Empty/error states: acceptable in calculator, lead capture, feedback, and saved scenarios.
- Footer/header consistency: acceptable after removing the congested footer treatment.

## Monetization Recommendation

### Recommended primary monetization path
Freemium B2C household-employer model.

Rationale:
- The current free product is already strong enough to earn trust and acquisition: estimate, breakdown, checklist, FAQ, sources, print-ready summary, and local saved scenarios.
- The product is not yet deep enough to justify an accounts-first subscription.
- Paid value should come from workflow convenience, repeat-case handling, and stronger records, not from gating the basic estimate.

### Secondary future monetization option
Advisor or family office workflow tier.

Rationale:
- There is a believable secondary user: assistants, family offices, PROs, and advisors who handle repeated closeout cases.
- That tier becomes viable only after repeated-use behavior is visible and the product has stronger multi-case workflow support.

### Too early / avoid for now
- Full subscription-led model for all users.
- Broad B2B dashboard promises.
- Cloud accounts as the first paid move.
- Arabic rollout as a monetization lever.
- Legal review or compliance guarantee positioning.

## Product Packaging Proposal

### Free
Keep free now:
- Gratuity calculator
- Visible assumptions and warnings
- Print-ready summary for light planning use
- Checklist, FAQ, sources, and planning content
- Local saved scenarios in the same browser

Why keep this free:
- It builds trust.
- It supports SEO and word-of-mouth acquisition.
- It creates clear intent signals before any paid offer exists.

### Pro
Charge later for workflow, not for trust basics.

Most believable Pro scope:
- Scenario comparison
- Printable settlement pack
- Advisor-friendly export format
- Better repeat-case workflow

Do not promise yet:
- Cloud sync
- Unlimited legal certainty
- Payroll outsourcing
- Final settlement document automation beyond what is actually built

### Optional future advisor tier
Only introduce if repeated professional usage appears in analytics or feedback.

Buyer:
- Family office operators
- Advisors
- Assistants managing several cases

Use case:
- Multi-case handling
- Cleaner exports and handoff materials
- Shared internal process consistency

## Roadmap

### Now / already in MVP
- Free calculator with transparent breakdown
- Print-friendly summary
- Checklist, FAQ, sources, and planning content
- Local saved scenarios
- Waitlist capture
- Basic analytics instrumentation

### Next
- Scenario comparison
- Settlement pack export
- Better post-result education and action prompts
- Stronger release and analytics discipline

### Later
- Advisor workflow tier
- Arabic support when the content and UX are ready end-to-end
- Cross-device saved history only if repeated demand justifies accounts

### Not now
- Full payroll workflow
- Large dashboard product
- Complex subscription packaging
- Multi-step onboarding funnels
- Feature-heavy user account system

## Metrics To Watch

### Must watch weekly
- Homepage to calculator click-through
- Calculator completion rate
- Result view rate
- Print action rate
- Waitlist conversion rate

### Useful but secondary
- FAQ engagement
- Checklist CTA clicks
- Sources page CTA clicks
- Return visits if measurable
- Saved scenario usage rate

### Ignore for now
- Raw pageviews without action context
- Social vanity metrics
- Low-signal experiment slicing before baseline volume exists

## Recommended Operating Stance
- Launch as a credible free planning tool first.
- Treat Pro as a waitlist-backed workflow roadmap, not as a revenue commitment.
- Use real usage data to decide whether the next paid move is a household Pro offer or an advisor workflow tier.