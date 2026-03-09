# Release Playbook

## Release goal
Ship a stable, trust-preserving soft launch without surprising users or creating unclear product promises.

## Branch discipline
- Do not deploy directly from exploratory branches.
- Build and verify on the working branch.
- Merge only the intended release commit into the designated deploy branch.
- Record the exact deploy commit hash before release.

## Pre-release checklist
- Run `npm run build`.
- Review `git status` and confirm only intended files are included.
- Review pricing, Pro, calculator, FAQ, and footer copy together for consistency.
- Review one desktop-width pass and one mobile-width pass.
- Confirm analytics and waitlist environment variables are present.

## Deployment steps
1. Merge approved changes into the deploy branch.
2. Trigger deployment.
3. Record deployment time, branch, and commit hash.
4. Open the production URL as soon as the deployment is live.

## Post-deploy verification
- Homepage loads and primary CTA works.
- Calculator renders without console-breaking errors.
- Print summary opens.
- Waitlist form submits.
- Pricing and Pro pages render the updated positioning.
- Footer remains a single centered line.
- Analytics events show page traffic and calculator interaction.

## Bug triage notes
- P0: calculator broken, build broken, or key routes unavailable.
- P1: misleading pricing or trust copy, broken waitlist flow, major mobile layout issue.
- P2: rough copy, minor layout imbalance, lower-priority content issue.

## Rollback awareness
Rollback if any of these happen:
- Calculator result flow fails.
- Waitlist API breaks publicly.
- Core trust pages fail to load.
- Production copy introduces a serious contradiction.

Rollback method:
- Re-deploy the previous known-good production commit.
- Re-run homepage, calculator, print, and waitlist smoke checks.
- Document what changed and what caused the rollback.