# devops-portfolio

Premium DevOps / Cloud / Platform / Kubernetes / SRE / DevSecOps consultant portfolio.

Built as a static Next.js (App Router) site for **GitHub Pages**.

## Status

- [x] M0 — Software specification approved
- [x] Visual system — pastel mint mockups approved (`design/preview/`)
- [x] M1 — Scaffold & toolchains (Next 16.2.10, pinned ≥2 weeks old)
- [x] M2 — Design system & layout shell (pastel tokens + chrome)
- [x] M3 — Home + core pages (About, Services, Contact, 404; stubs for remaining IA)
- [x] M4 — Projects & architecture (filters, case studies, gallery + lightbox, SVG diagrams)
- [x] M5 — Blog + MDX + Pagefind (+ RSS)
- [x] M6 — Polish, SEO, a11y, credibility pages, GitHub Actions → Pages

- [ ] v1.0.0 launch — Part A in [`docs/PRODUCTION_RELEASE_CHECKLIST.md`](docs/PRODUCTION_RELEASE_CHECKLIST.md)
- [ ] v1.1+ flagship polish — motion, interactive arch, ⌘K, tools (Part B in same doc)

## Spec

See [`docs/SOFTWARE_SPECIFICATION.md`](docs/SOFTWARE_SPECIFICATION.md).  
Package age policy: [`docs/PACKAGE_POLICY.md`](docs/PACKAGE_POLICY.md).  
Security / secrets: [`docs/SECURITY.md`](docs/SECURITY.md).  
Production release: [`docs/PRODUCTION_RELEASE_CHECKLIST.md`](docs/PRODUCTION_RELEASE_CHECKLIST.md).

## UI design preview (HTML mockups)

Figma-like static pages (**minimal pastel mint**, fluent Plus Jakarta Sans) live in [`design/preview/`](design/preview/).

```bash
open design/preview/gallery.html
# or
npx --yes serve design/preview
```

## Stack

- **Now:** Next.js 16.2.10 · React 19.1.0 · TypeScript 5.8.3 · Tailwind 4.1.11 · Vitest 3.2.6 · `next-mdx-remote` · Pagefind 1.5.2
- **Later optional:** shadcn/ui · Framer Motion · Mermaid / React Flow · Recharts · LHCI gate

Exact versions only (no `^`). New/upgraded packages must be **≥14 days old** — see package policy.

`npm run build` runs RSS generation → Next export → Pagefind index into `out/pagefind/`.

CI (`.github/workflows/deploy.yml`): secret scan (Gitleaks + pattern guard) → lint / typecheck / test / npm audit → cached build → GitHub Pages on `main`.

## GitHub Pages notes

| Setting | Value |
|---------|--------|
| Site URL (project Pages) | `https://sauravrana646.github.io/devops-portfolio/` |
| `NEXT_PUBLIC_BASE_PATH` | `/devops-portfolio` |
| `NEXT_PUBLIC_SITE_URL` | `https://sauravrana646.github.io/devops-portfolio` |

Copy `.env.example` → `.env.local` (gitignored). Optional Formspree/Plausible: set GitHub **Variables** (not Secrets) — they are client-visible.

## Local development

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
NEXT_PUBLIC_BASE_PATH=/devops-portfolio npm run build   # → out/
npx serve out
```

## License

[MIT](./LICENSE) © Saurav Rana
