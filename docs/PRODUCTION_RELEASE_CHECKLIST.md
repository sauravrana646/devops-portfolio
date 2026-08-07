# Production release checklist

Track two releases against `[SOFTWARE_SPECIFICATION.md](./SOFTWARE_SPECIFICATION.md)`:


| Release                   | Intent                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| **v1.0.0**                | Honest content + live GitHub Pages + CI green (MVP launch)                                      |
| **v1.1+ flagship polish** | Stripe / Linear / Vercel-level motion, interactive architecture, tools, and remaining spec gaps |


Live target: `https://sauravrana646.github.io/devops-portfolio/`

Identity already set in `content/site.ts`:

- Brand / name: **Saurav Rana**
- Email: **[sauravrana646@gmail.com](mailto:sauravrana646@gmail.com)**
- Timezone default: **IST (UTC+5:30)** — confirm
- Response SLA default: **2** business days — confirm

Visual system note: polish must stay on the **approved pastel mint** design (not the rejected dark-cyan era). Spec tokens that say “cyan” map to mint / deep-mint accents in the current system.

---



# Part A — v1.0.0 launch (do first)



## A1. Content & identity

- [x] Confirm `timezone` and `responseDays` in `content/site.ts` (IST · 2 days)
- [x] Resume / About curated from `SauravRana_ResumeV4.pdf` (Dronapay + Unthinkable + education)
- [x] Resume PDF hosted at `/resume.pdf` with Download on Resume page
- [x] Positioning: **DevOps and Cloud Engineer** (not platform engineering)
- [x] Soft-review services for hiring + DevOps/cloud (not principal consulting)
- [x] Case studies: 3 public demos + 2 employment-grounded; removed synthetic PE fiction
- [x] Certifications skipped for now (honest empty / coming-soon page)
- [x] Open source: profile link only until curated repo URLs arrive (`github.com/sauravrana646`)
- [x] Testimonials skipped for now (coming-soon page; home quote/signals hidden)
- [x] License: MIT

## A2. Contact & integrations

- [x] Formspree form ID set as GitHub Variable (`NEXT_PUBLIC_FORMSPREE_ID`)
- [ ] Confirm Formspree notification email = `sauravrana646@gmail.com` in Formspree dashboard
- [x] Plausible skipped for v1.0.0
- [ ] Local `.env.local` mirrors Formspree var for testing (optional)
- [ ] Submit a real contact-form test after first production deploy
- [ ] Confirm mailto fallback still works if Formspree is unset
- [ ] Privacy / Terms pages accurately describe Formspree (no Plausible)
- [x] Cal.com / Calendly skipped for v1.0.0

## A3. GitHub Pages & deploy

- [x] Repo Settings → Pages → Source: **GitHub Actions** (enabled via API)
- [x] Push to `main` **without** `[skip ci]` for launch deploy
- [x] Confirm CI jobs: secret-scan → quality → deploy (run [31128058538](https://github.com/sauravrana646/devops-portfolio/actions/runs/31128058538))
- [x] Confirm live URL loads (`https://sauravrana646.github.io/devops-portfolio/`)
- [x] Confirm `basePath` assets work (HTML 200 + brand strings)
- [ ] Confirm `.nojekyll` behavior (implicit via successful Pages serve)
- [ ] Note: if `push` does not auto-trigger Actions, use **Actions → CI / Deploy → Run workflow**

## A4–A7

Deferred until content (resume, case studies) is ready and deploy is requested. See full lists below / in git history of this doc.



## A4. Production smoke test (live URL)

- [ ] Home, About, Services, Contact
- [ ] Projects list + one case study
- [ ] Architecture gallery + lightbox (keyboard Esc / focus)
- [ ] Blog list + one post + RSS `/rss.xml`
- [ ] Pagefind search (`/search/`) returns results
- [ ] Resume, Testimonials, Certifications, Open Source, Resources
- [ ] Aliases: `/cv/`, `/hire/`, `/writing/`, `/oss/`, `/work/`, `/case-studies/`
- [ ] 404 page
- [ ] Mobile layout + primary nav / Reach out CTA
- [ ] External links open correctly; no obvious broken anchors



## A5. SEO & social (launch bar)

- [ ] Home title reads: `Saurav Rana | DevOps and Cloud Engineer`
- [ ] `sitemap.xml` and `robots.txt` reachable on Pages
- [ ] JSON-LD / metadata include real email and name
- [ ] Open Graph / Twitter preview looks acceptable (LinkedIn or [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Optional: dedicated OG image under `public/` if share cards look thin
- [ ] Optional custom domain later: update `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BASE_PATH` accordingly



## A6. Quality & security bar

- [ ] `npm run security:secrets` passes locally
- [ ] `npm run security:audit` passes (or known allowlist only)
- [ ] `npm run lint && npm run typecheck && npm run test` green
- [ ] Production build: `NEXT_PUBLIC_BASE_PATH=/devops-portfolio npm run build`
- [ ] Lighthouse on live URL ≥ **95** (Performance, Accessibility, Best Practices, SEO)
- [ ] Keyboard-only pass on nav, filters, lightbox, contact form
- [ ] No secrets in git (only `.env.example`; never commit `.env.local`)



## A7. Ops & follow-through

- [ ] `gh auth refresh` (or SSH) so future pushes/CI management work
- [ ] Dependabot PRs reviewed periodically
- [ ] When `next@16.2.12+` is ≥14 days old: bump pin, clear allowlist in `scripts/npm-audit-ci.mjs`
- [ ] Tag release `v1.0.0` after Part A is complete
- [ ] Announce URL (LinkedIn / resume / GitHub profile README)



### Quick local preflight

```bash
npm run security:secrets
npm run security:audit
npm run lint && npm run typecheck && npm run test
NEXT_PUBLIC_BASE_PATH=/devops-portfolio npm run build
```



### Definition of done — v1.0.0

- [ ] Identity and content are truthful and placeholder-free
- [ ] Contact delivers (Formspree and/or mailto)
- [ ] GitHub Pages deploy is green without skipping CI
- [ ] Smoke + Lighthouse bar met on the live URL
- [ ] Part A checked off and `v1.0.0` tagged

---



# Part B — Flagship polish (v1.1+)

Everything below is still in the original plan / stack intent but **not required** to soft-launch. This is the Stripe / Linear / Vercel-level bar.

Respect package age policy (`docs/PACKAGE_POLICY.md`): pin exact versions ≥14 days old. Prefer dynamic import / code-split for heavy widgets.

## B1. Motion system (Framer / shared wrappers)

*Spec §2.4, §7 home, §12 a11y/motion — branch `polish/v1.1-flagship`.*

- [x] Add Framer Motion behind shared wrappers: `FadeIn`, `StaggerChildren`
- [x] Use `LazyMotion` + `domAnimation`; no full bundle on every route
- [x] Gate all motion with `usePrefersReducedMotion` (opacity-only / instant when reduced)
- [x] **Hero brand stagger** — wordmark → headline → support → CTAs
- [x] **Nav active underline grow** (gradient mint underline + `layoutId`)
- [x] **Section reveal both ways** (enter/leave on scroll up + down) on home bands: work, engage, architecture, insights, CTA
- [x] Work-row / engage-card hover motion (subtle lift)
- [x] Timing tokens aligned to spec: fast 150 / base 220 / slow 380 / hero ~800 · ease `cubic-bezier(0.22, 1, 0.36, 1)`
- [x] Blog detail calm entrance; no layout thrash (CLS ≤ 0.1)
- [x] Document motion rules in `docs/design-system.md`



## B2. Interactive architecture (Mermaid + React Flow)

*Spec §8 — currently static SVG + lightbox only.*

- [ ] Content model: `content/diagrams/{id}/` with `meta.json` + `diagram.mmd` and/or `flow.json`
- [x] Keep **static SVG fallback** for every interactive diagram (JS-disabled readable)
- [x] **Layer toggles** on GitOps hub-spoke (home + detail) — CSS opacity groups
- [ ] **Mermaid** for narrative / sequence / git-diff-friendly diagrams (`accTitle` / `accDescr`)
- [ ] **React Flow** for interactive graphs (>12 nodes, before/after)
- [ ] `<ArchitectureEmbed id caption variant="interactive|static" />`
- [ ] Components: `ArchitectureCanvas`, `ArchitectureFallback`, `MermaidDiagram`, `DiagramFrame`
- [ ] Lazy-mount on viewport; dynamic `import()` so gallery list stays light
- [ ] Architecture Explorer route (`/explore/` or enhanced detail): ≤60 nodes
- [ ] Node keyboard a11y: Tab through nodes · Enter opens drawer · Esc closes · live region on selection
- [ ] Focus restore when closing node drawer / lightbox
- [ ] Categories complete per spec: platform · kubernetes · network-security · cicd-supply-chain · sre-observability · multi-cloud · data · finops
- [ ] Embed interactive (or static) diagrams in case studies by **id only**



## B3. Product interactions & tools

*Spec §9 Interactive Features.*

- [x] **Command palette** ⌘K / Ctrl+K — code-split on first open · dialog a11y · routes + theme actions
- [ ] Wire Pagefind into palette (in addition to `/search/`)
- [x] **Theme toggle** `light | dark | system` in header + palette · `next-themes` (class strategy)
- [ ] **Maturity checklist** `/tools/maturity/` — localStorage · radar · copy markdown · no PII upload
- [ ] **Cost/latency estimator** `/tools/estimator/` — disclaimer · pure TS formulas · noscript note
- [ ] **Skills matrix** `/skills/` or About section — table + mobile stacked · links to projects
- [ ] **Recharts** on case studies / tools — always “View as table” · estimated vs measured labeling
- [x] JS-disabled: core MDX + pre-rendered SVG remain readable; interactive layers degrade to static SVG



## B4. Design system & UI kit (product chrome)

*Spec §2–3, §12 — pastel mint approved; shadcn/Lucide largely deferred.*

- [ ] Adopt **shadcn/ui** restyled to current mint tokens (Dialog, Sheet, Tabs, Accordion, Tooltip, etc.)
- [x] **Lucide** icons only · stroke 1.5 · sizes 16/20/24 · no emoji UI (nav menu started)
- [ ] Shared CVA variants for Button / Badge / Input consistent with design system
- [ ] Primary CTA visual polish (spec-level confidence; keep mint system, not purple defaults)
- [ ] Cards **only** when they contain interaction (no decorative card sprawl)
- [x] Code blocks: ink panel + mono + **copy** button
- [x] Sticky glass header refinement + active gradient-edge underline (motion pass)
- [x] Mobile nav: full-screen drawer · Contact full-width at bottom
- [ ] Skeleton loaders for any deferred client islands
- [ ] Toast/sonner for copy / tool feedback where useful
- [x] Print CSS for Resume



## B5. Page-level product polish

*Spec §3.1–3.17 layout notes beyond MVP.*

- [ ] Home: true ~100vh hero composition discipline (brand-first, no clutter)
- [ ] Projects: sticky filter rail (desktop) + featured spotlight strip · `sort=recent|impact|az`
- [ ] Project detail: full-bleed title hero · meta bar · next/prev case study
- [ ] Architecture: mesh hero treatment · 2-up figures where it helps
- [ ] Blog: stronger featured row + chronological list polish
- [ ] Blog detail: optional cover · ToC highlight (`useTocHighlight`) · share links · post pager
- [ ] Services: optional SEO cluster pages (`/services/kubernetes-platform/` etc.) or keep anchors
- [ ] Contact: query prefill for `intent` / `service` / `project` fully exercised
- [ ] Resources: denser curated list quality bar
- [ ] Empty states / hide empty sections when content absent



## B6. Component & content architecture (spec inventory)

*Spec §12–13 — fill remaining inventory as polish work needs it.*

- [ ] `components/motion/` + `components/a11y/` (`VisuallyHidden`, `LiveRegion`, hooks)
- [ ] `components/widgets/` (Chart, DataTable, Timeline, CopyButton, CommandPalette, tools)
- [ ] `lib/seo.ts` → `buildPageMetadata` helper used across routes
- [ ] BreadcrumbList JSON-LD on nested routes
- [ ] Dedicated `public/og/` + generated 1200×630 images per key page
- [ ] Self-host fonts (WOFF2) if Google Fonts runtime is a perf/privacy concern
- [ ] Ensure `withBasePath()` everywhere raw URLs are built



## B7. Performance budgets (flagship)

*Spec §15.*

- [ ] LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 on key routes (home, project, architecture, blog)
- [ ] Initial JS (no demos) ≤ ~180KB critical · ≤ ~300KB heavy routes
- [ ] CSS ≤ ~60KB where practical
- [ ] Fonts ≤ 2 families × ≤ 2 weights · ≤ ~100KB WOFF2
- [ ] LCP image ≤ ~200KB
- [ ] Dynamic import: React Flow, Mermaid, Recharts, Pagefind, command palette
- [ ] Architecture / tools routes do not inflate home bundle



## B8. Accessibility (flagship)

*Spec §16 — beyond launch smoke.*

- [ ] WCAG 2.2 AA audit (axe + keyboard + one screen-reader pass)
- [ ] Contrast matrix documented for mint / ink / muted on pastel surfaces
- [ ] Keyboard map includes ⌘K, filters, lightbox, React Flow nodes, drawers
- [ ] Focus restore on all overlays
- [ ] Chart / metric “View as table” alternatives
- [ ] Reduced-motion verified across Framer + CSS
- [ ] CI **a11y-smoke** job (axe or equivalent) on built pages



## B9. SEO & content systems (beyond launch)

*Spec §14, §18 phase 1–2.*

- [ ] Unique title/description audit on every route
- [ ] OG image pipeline (build-time or scripted 1200×630)
- [ ] RSS + metadata alternate link verified in head
- [ ] Pagefind filters (tags/categories) if content volume warrants
- [ ] Visual regression (Playwright/Chromatic or similar) on chrome + home + case study
- [ ] Resume PDF generation or hosted artifact
- [ ] Optional CMS later (not blocking flagship polish)



## B10. CI / quality gates (flagship)

*Spec §17.*

- [ ] Lighthouse CI gate ≥ **0.95** on production URL or PR preview artifact
- [ ] `main` protection + Conventional Commits + squash-merge (repo settings)
- [ ] a11y-smoke in CI
- [ ] Bundle budget check (optional CI step)
- [ ] PR preview strategy (Pages preview env or external) if collaborating



## B11. Future roadmap (explicitly later)

*Spec §18 — do not block v1.1 unless prioritized.*

- [ ] Phase 1 leftovers: MDX hardening, compliance pages depth
- [ ] Phase 2: i18n · hiring portal · private case-study gating
- [ ] Phase 3: Labs · auth-gated content · advanced ⌘K actions



### Definition of done — v1.1 flagship polish

- [ ] Motion system ships the three required patterns (hero stagger, nav underline grow, section reveal) with reduced-motion support
- [ ] At least one architecture diagram is interactive (React Flow or Mermaid) with SVG fallback + keyboard a11y
- [ ] Command palette (⌘K) + theme toggle are production-ready
- [ ] Lighthouse CI ≥ 95 and performance budgets measured on home + one heavy route
- [ ] Design chrome feels intentional product UI (shadcn/Lucide or equivalent consistency), still pastel mint
- [ ] Tag `v1.1.0` (or `v1.1.0-flagship`) when Part B priority items above are done

---



## Suggested sequencing

```text
v1.0.0  Part A — content, Pages, Formspree, smoke, Lighthouse manual
   ↓
v1.1    B1 motion → B4 chrome → B2 interactive arch → B3 ⌘K/theme
   ↓
v1.1+   B5 page polish → B7/B8 budgets & a11y → B9/B10 OG + LHCI
   ↓
later   B11 roadmap / tools (maturity, estimator) as differentiators
```

Reference: full product intent remains in `[SOFTWARE_SPECIFICATION.md](./SOFTWARE_SPECIFICATION.md)`.