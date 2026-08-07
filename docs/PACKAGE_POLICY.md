# Package age policy

For this project, **runtime and toolchain packages must be at least 14 days old** at the time they are added or upgraded (no same-week / same-day releases).

## M1 pins (as of 2026-08-01)

| Package | Version | Published |
|---------|---------|-----------|
| `next` | 16.2.10 | 2026-07-01 |
| `eslint-config-next` | 16.2.10 | 2026-07-01 |
| `react` / `react-dom` | 19.1.0 | 2025-03-28 |
| `typescript` | 5.8.3 | 2025-04-05 |
| `tailwindcss` / `@tailwindcss/postcss` | 4.1.11 | 2025-06-26 |
| `vitest` | 3.2.6 | 2026-06-01 (bumped for GHSA-5xrq-8626-4rwp) |
| `eslint` | 9.30.1 | (pre–July 2026) |
| `@testing-library/user-event` | 14.6.1 | 2025-01-21 |

## M5 pins (as of 2026-08-01)

| Package | Version | Published |
|---------|---------|-----------|
| `next-mdx-remote` | 5.0.0 | 2024-05-22 |
| `gray-matter` | 4.0.3 | 2021-01-28 |
| `remark-gfm` | 4.0.1 | 2025-02-10 |
| `pagefind` | 1.5.2 | 2026-04-12 |

## Polish pins (as of 2026-08-07)

| Package | Version | Published |
|---------|---------|-----------|
| `framer-motion` | 12.42.2 | 2026-06-30 |
| `lucide-react` | 1.26.0 | 2026-07-23 |
| `next-themes` | 0.4.6 | 2025-03-11 |

Versions are **exact** in `package.json` (no `^` ranges) so installs stay reproducible.

## How to upgrade later

1. Pick a candidate version.
2. Confirm publish date: `npm view <pkg>@<version> time --json` (version key must be ≤ today − 14 days).
3. Update the exact pin + lockfile.
4. Run `npm run lint && npm run typecheck && npm run test && npm run build`.
