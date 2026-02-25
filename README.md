# MaidShield

Next.js App Router + TypeScript + Tailwind application for estimate-driven planning flows.

## Commands

```bash
npm run dev      # start local dev server
npm run build    # create production build
npm run start    # run built app
npm run lint     # run eslint checks
```

## Folder Structure

```text
app/                # App Router routes, layouts, and route handlers
components/
  ui/               # primitive reusable UI components
  forms/            # form-specific UI components
  layout/           # shell/navigation/page framing components
docs/               # PRD, SRS, legal, security, and brand docs
lib/
  rules/            # calculation/rule tables and helpers
  validation/       # input/output validation logic
  pdf/              # print/export/PDF-related utilities
types/              # shared TypeScript types and interfaces
public/             # static assets
```

## Conventions

- Keep route behavior in `app/` stable; avoid changing URL paths without explicit requirement.
- Keep business logic in `lib/` and keep React components focused on rendering and interactions.
- Prefer typed interfaces in `types/` for shared request/response and domain models.
- Use ESLint as the baseline quality gate; keep formatting Prettier-friendly (consistent spacing, quotes, and line length).

## Contribution Workflow

1. Pull latest changes and create a focused branch.
2. Implement changes in the correct layer (`app`, `components`, `lib`, `types`, `docs`).
3. Run `npm run lint` and `npm run build` locally before opening a PR.
4. In the PR description, include:
   - what changed
   - why it changed
   - risk/impact on existing routes and behavior
5. Keep PRs small and reviewable; follow up with separate PRs for unrelated work.

## Documentation

- [PRD](docs/PRD.md)
- [SRS](docs/SRS.md)
- [Legal](docs/LEGAL.md)
- [Security](docs/SECURITY.md)
- [Brand](docs/BRAND.md)
