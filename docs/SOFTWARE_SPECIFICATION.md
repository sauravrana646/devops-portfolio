# DevOps / Cloud / DevSecOps Portfolio — Software Specification

**Status:** APPROVED  
**Approved:** 2026-08-01  
**Visual system approved:** 2026-08-01 — minimal pastel mint · Plus Jakarta Sans · see `design/preview/`  
**Repo:** https://github.com/sauravrana646/devops-portfolio  
**Process rule:** Application source code may proceed milestone-by-milestone (M1→M6) per §19.

---

## Canonical decisions (normative)

| Topic | Decision |
|--------|----------|
| Positioning | Premium consulting product site (Stripe / Vercel / Linear / Cloudflare / Warp feel), not a résumé template |
| Visual system | **Light pastel default** · soft mint canvas · charcoal ink · sage/mint + butter/peach accents · Plus Jakarta Sans (fluent) + Source Serif 4 for quotes · dark theme deferred |
| Primary nav | About · Projects · Architecture · Services · Blog · Resume · **Contact** |
| Secondary / footer | Certifications · Testimonials · Open Source · Resources · Privacy · Terms |
| Case studies URL | `/projects/` (redirect `/work/` and `/case-studies/` → `/projects/`) |
| Contact | **Formspree** + mailto fallback · optional Cal.com / Calendly |
| Stack | Next.js App Router · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · Lucide · MDX · Mermaid / React Flow · Recharts |
| Hosting | `output: 'export'` → GitHub Pages · Pagefind post-build · Plausible |
| Trailing slashes | On (`trailingSlash: true`) |
| Quality bar | Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO) · WCAG 2.2 AA |
| Placeholders | `[Consultant Name]`, `[Brand]`, `[Email]`, `[Timezone]`, `[Company]` until real content |
| GitHub Pages basePath | Project site: `/devops-portfolio` · Custom domain at root: empty |

---

# 1. Product Vision

## 1.1 Vision statement

**[Consultant Name]**’s site is a conversion-grade operating system for premium DevOps / Cloud / Platform / Kubernetes / SRE / DevSecOps consulting: it proves competence through systems thinking, architecture clarity, and measurable outcomes—not a chronological résumé. It should feel like a product marketing site from Stripe, Vercel, Linear, Cloudflare, or Warp: sparse, confident, technically precise, and fast.

North-star promise: a hiring manager or founder should leave the first visit knowing *exactly* what problems [Consultant Name] owns end-to-end, how they work, and how to start a scoped engagement within minutes.

## 1.2 Positioning

| Dimension | Definition |
|---|---|
| **Category** | Independent platform engineering & reliability consultancy |
| **Market** | Series A–D / scale-up / enterprise teams on Kubernetes, multi-cloud, or regulated production |
| **Role claimed** | Fractional Staff+/Principal Platform, SRE, or DevSecOps partner for 4–16 week outcomes |
| **Against** | Résumé templates, Upwork-style gigs, generic “I do AWS” freelancers, agency slide decks |
| **For** | Teams that need senior ownership without a full-time hire |

**Positioning statement:** For engineering leaders who need production-grade platform, reliability, or security outcomes without hiring a full-time principal, [Consultant Name] is the independent specialist who ships measurable infrastructure and operating improvements—proven through case studies, architecture writeups, and a product-quality site experience.

## 1.3 Value proposition

1. **Owned outcomes** — CI/CD hardening, Kubernetes platform maturity, observability baselines, cost/reliability tradeoffs, DevSecOps gates.
2. **Senior judgment** — clear recommendations, risk callouts, and “what not to build.”
3. **Low-friction engagement** — defined packages, discovery call, written SOW path.
4. **Signal of quality** — the site itself evidences product taste and operational rigor.

**One-liner:** “Senior DevOps, platform, and reliability consulting—scoped like a product, delivered like an owner.”

## 1.4 Brand personality

1. Precise
2. Calm confidence
3. Operator-minded
4. Modern product taste
5. Honest

**Hard bans:** emoji-heavy CTAs, “ninja/rockstar,” purple SaaS cliché as identity, dense timeline résumé as hero, tool-logo bingo without outcomes.

## 1.5 Success metrics

### Business (90-day post-launch)

| Metric | Target |
|---|---|
| Qualified inbound | ≥ 8 / month |
| Discovery booked | ≥ 4 / month |
| Proposal rate | ≥ 50% of discoveries |
| Close rate | ≥ 25% of proposals |
| Referral attribution | ≥ 40% of qualified cite site / case study / blog |

### UX / quality

| Metric | Target |
|---|---|
| Time-to-value on home | ≤ 15s |
| Case study completion (reach Outcomes) | ≥ 55% |
| Primary CTA CTR (home) | ≥ 4% |
| Contact form completion | ≥ 60% |
| Lighthouse (all four categories) | ≥ 95 |
| CWV | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 |

## 1.6 Audiences (JTBD)

**Primary — Engineering / Platform leaders:** Decide fit, scope 6–12 week engagement, justify spend.
**Secondary — Technical founders:** Avoid overbuild, start quickly, learn enough to interview vendors.
**Tertiary — Peer engineers:** Learn / share / refer (optimize writeups, not homepage).

## 1.7 Differentiation

Proof surface + sales surface, not a CV. Hero = problem space + outcome promise + one proof artifact. Capabilities as productized services. Case studies = problem → constraints → architecture → metrics → lessons.

## 1.8 Tone of voice

Stripe clarity + Cloudflare pragmatism + Linear restraint. First person singular. CTAs: “Book a discovery call,” “Start a scoped engagement,” “See the architecture”—not “Let’s chat!” or “Hire me.”

## 1.9 North-star user outcome

In one sitting: (1) understand three problem domains owned, (2) verify fit via one case study or architecture writeup, (3) initiate discovery or structured brief. Emotional outcome: **relieved confidence**.

---

# 2. Design System

**Aesthetic (updated):** Minimal pastel — soft mint canvas, charcoal ink, sage accents, butter/peach highlights. Light default. Fluent rounded sans (Plus Jakarta Sans). Spacious composition inspired by calm agency sites (e.g. soft mint heroes, pill CTAs, generous whitespace). Dark ink+cyan direction is superseded unless revisited.

## 2.1 Color tokens

| Token | Dark (default) | Role |
|---|---|---|
| `--color-ink-950` | `#05070D` | App canvas |
| `--color-ink-900` | `#0A0F1A` | Elevated canvas |
| `--color-ink-800` | `#151E32` | Panel |
| `--color-cyan-400` | `#22D3EE` | Primary interactive, links, focus |
| `--color-cyan-300` | `#67E8F9` | Hover |
| `--color-cyan-500` | `#06B6D4` | Pressed |
| `--color-fg-primary` | `#F1F5F9` | Headings |
| `--color-fg-secondary` | `#94A3B8` | Body secondary |
| `--color-fg-tertiary` | `#64748B` | Meta |
| `--color-success` | `#34D399` | Pass |
| `--color-warning` | `#FBBF24` | Caution |
| `--color-danger` | `#F87171` | Errors |
| `--color-border-subtle` | white @ 8% | Separators |
| `--color-border-default` | white @ 12% | Controls |
| `--gradient-hero` | cyan radial + ink | Marketing heroes |
| `--gradient-cta` | `#22D3EE` → `#06B6D4` | Primary CTA |

Light theme under `[data-theme="light"]` with inverted ink/cyan pairs.

**Hard bans:** Purple-to-indigo default; warm cream + terracotta; broadsheet identity; pill-heavy CTAs; glow on every element.

## 2.2 Typography

| Role | Family |
|---|---|
| Display / UI | **Söhne** or **General Sans** (never Inter/Roboto/Arial/system as brand) |
| Mono | **IBM Plex Mono** |
| Editorial accent (blog pull quotes only) | Newsreader |

**Scale (desktop):** Display XL 72px (home brand only) · Display LG 56 · Display MD 40 · H1 32 · H2 24 · H3 20 · body 16 · body-lg 18 · caption 12 · mono 13–14.

Mobile: Display XL → 40px; body ≥ 16px. Max body measure ~68ch.

## 2.3 Spacing, radius, shadow

4px base scale through 128px. Page gutters: 48 / 32 / 20. Content max 1120 · wide 1280 · narrow 720. Nav height 64. Section Y 96–128 desktop / 64–80 mobile.

Radius: sm 6 · md 10 · lg 14 — soft-rect, not pill-heavy. Prefer border + inset over heavy shadows. One cyan glow focal max per viewport.

## 2.4 Motion

| Token | Value |
|---|---|
| fast | 150ms |
| base | 220ms |
| slow | 380ms |
| hero | 700–900ms |
| ease | `cubic-bezier(0.22, 1, 0.36, 1)` |

Ship: (1) hero brand stagger, (2) nav underline grow, (3) section reveal once. Respect `prefers-reduced-motion`.

## 2.5 Breakpoints

sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 — 12-col from lg.

## 2.6 Iconography

Lucide only · stroke 1.5 · sizes 16/20/24 · no emoji UI.

## 2.7 Component visual principles

Primary button = cyan gradient, radius-md, height 40/44, not pill. Cards only when they contain interaction. Code blocks: ink panel + mono + copy. shadcn restyled to ink/cyan tokens.

---

# 3. Figma-Level Design Specification

## 3.0 Global chrome

**Nav (desktop):** 64px sticky glass · wordmark left · About Projects Architecture Services Blog Resume · Contact CTA right · active = gradient-edge underline.
**Mobile:** hamburger → full-screen drawer · Contact full-width bottom.
**Footer:** Work · Insights · Credibility · Company · Connect.
**Hero rules:** Full-bleed · brand dominant · one headline · one support · CTA group · no cards/stats/badges on media.

## 3.1–3.17 Page structures

| Page | Key layout notes |
|---|---|
| **Home** | 100vh hero → selected work rows → engage modes → architecture band → one quote → signals → insights → final CTA |
| **About** | Compact hero · 8/4 narrative + sticky meta · principles with cyan rail · timeline |
| **Projects** | Hero + filters · interactive rows/tiles · URL-serializable filters |
| **Project Detail** | Full-bleed title hero · meta bar · Challenge→Approach→Architecture→Outcomes · next/prev |
| **Architecture** | Mesh hero · 2-up figures · lightbox · filters |
| **Services** | Offerings as sections not price cards · process 01–04 · FAQ · CTA |
| **Blog** | Featured row + chronological list |
| **Blog Detail** | 720px prose · optional full-bleed cover · calm motion |
| **Resume** | Download PDF + Contact · 8/4 experience + skills · print CSS |
| **Certifications** | Featured + dense verify list |
| **Testimonials** | Large quotes + hairlines · logos below fold only |
| **Open Source** | Curated repo rows · not raw GitHub skin |
| **Resources** | Grouped link rows · accordions on mobile |
| **Contact** | Split brand + glass form panel · success replaces form |
| **404** | Centered mono 404 · Home + Contact |
| **Privacy / Terms** | Narrow prose + TOC · compact title band |

---

# 4. Sitemap

## 4.1 Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/about/` | About |
| `/projects/` | Projects index |
| `/projects/[slug]/` | Case study |
| `/architecture/` | Gallery |
| `/architecture/[slug]/` | Diagram detail |
| `/services/` | Services |
| `/blog/` | Blog index |
| `/blog/[slug]/` | Post |
| `/resume/` | Resume + PDF |
| `/certifications/` | Credentials |
| `/testimonials/` | Social proof |
| `/open-source/` | OSS |
| `/resources/`, `/resources/[slug]/` | Resources |
| `/contact/` | Hire / booking |
| `/privacy/`, `/terms/` | Legal |
| 404 | Recovery |

Optional SEO service cluster pages: `/services/kubernetes-platform/`, `/services/sre-reliability/`, `/services/devsecops/`, `/services/cloud-operations/` — anchors on `/services/` in MVP OK.

## 4.2 Slug conventions

- Projects: `{domain}-{outcome}-{context}/`
- Architecture: `{system}-{pattern}/`
- Blog: `{topic}-{angle}/` (immutable after publish)
- Drafts: `draft: true` excluded from build, sitemap, RSS

## 4.3 Redirects

`/work/` → `/projects/` · `/case-studies/` → `/projects/` · `/cv/` → `/resume/` · `/hire/` → `/contact/` · `/writing/` → `/blog/` · `/oss/` → `/open-source/`

## 4.4 Collections

`content/projects/*.mdx` · `content/architecture/*` · `content/blog/*.mdx` · `content/resources/*.mdx` · `content/testimonials/*` · certifications structured data · `content/diagrams/{id}/`

---

# 5. User Flow

**A. Discovery → hire:** Entry → Home → Services or Projects → Contact → validate → success / booking.
**B. Recruiter → resume:** Resume → PDF → optional Contact.
**C. CTO → case study:** Projects → filter → Detail → Architecture/Blog → Contact `?project=`.
**D. Architecture explore:** Gallery → detail → zoom/pan → related project / Contact.
**E. Contact / booking:** Formspree · calendar · mailto · honeypot silent success.
**F. Blog → project:** Post → related project → CTA.

Empty states: hide modules with no content; never fake tiles.

---

# 6. Home Page Design

## Component hierarchy

1. SkipLink
2. SiteHeader
3. HeroComposition — brand, headline, support, primary+secondary CTA, full-bleed visual
4. PositioningStrip
5. SelectedWork (≤3)
6. HowIEngage (Audit / Build / Advise)
7. SystemsLens
8. Proof (one quote)
9. Signals (certs + OSS)
10. Insights (3 posts)
11. FinalCTA
12. SiteFooter

## Wire copy (placeholders)

- Brand: `[Brand]`
- Headline: `[One-line positioning]`
- Support: `I help teams ship reliable platforms—cloud, Kubernetes, CI/CD, and security—without the theater.`
- Primary CTA → `/contact/` · Secondary → `/projects/`

## Motion / a11y

Hero stagger · work rows whileInView once · reduced-motion = opacity only · skip link · landmarks · WCAG AA on scrim text · hide empty sections.

---

# 7. Projects & Case Studies

## 7.1 Data model (frontmatter)

Required: `slug`, `title`, `clientAlias`, `role`, `engagementType` (`advisory|hands-on|rescue|build`), `status`, `featured`, `dateStart`, `dateEnd`, `summary`, `problem`, `outcomes[]`, `tags[]`, `stack[]`, `confidentiality` (`anonymized|public-reference|synthetic`).

Optional: `metrics[]`, `heroDiagramId`, `diagramIds[]`, `cover`, `relatedSlugs`, `ogImage`.

**Tags:** `cloud` · `kubernetes` · `security` · `platform` · `cicd` · `sre` · `observability` · `finops` · `iac` · `networking` · `data` · `compliance`

## 7.2 Body H2 contract

Problem → Constraints → Architecture → Implementation → Outcomes → Lessons
(Optional: Threat model, Runbook notes, What we did not do)

## 7.3 List UX

Desktop: sticky filter rail + grid · Featured spotlight strip.
Filters via query: `?tags=kubernetes,security&q=&sort=recent|impact|az`
Cards: one link target; tags in filter rail not nested links.

## 7.4 Sample stubs (build-ready)

1. `multi-cluster-gitops-rescue` — EKS GitOps rescue · lead time 45m→12m
2. `zero-trust-ingress-mesh` — Istio/ZTA · pen-test findings closed
3. `platform-golden-paths` — IDP · time-to-first-deploy 15d→2d
4. `sre-error-budgets-slo` — payment API SLOs · pages −55%
5. `finops-k8s-rightsizing` — Karpenter · compute −31%
6. `supply-chain-cicd-hardening` — Cosign/OIDC · synthetic composite

---

# 8. Architecture Gallery

**Routes:** `/architecture/`, `/architecture/[id]/`
**Engines:** Mermaid (narrative, sequences, git-diff-friendly) · React Flow (interactive, >12 nodes, layer toggles)
**Rules:** One source under `content/diagrams/{id}/` with `meta.json` + `diagram.mmd` and/or `flow.json` · embed by id only · static SVG fallback required for React Flow · lazy-mount on viewport

**Categories:** platform · kubernetes · network-security · cicd-supply-chain · sre-observability · multi-cloud · data · finops

**A11y:** Tab through nodes · Enter opens drawer · Esc closes · `accTitle`/`accDescr` for Mermaid · live region on selection

**Embed:** `<ArchitectureEmbed id caption variant="interactive|static" />`

---

# 9. Interactive Features

| Feature | Route / entry | Notes |
|---|---|---|
| Architecture Explorer | `/explore` or gallery detail | Layer toggles, before/after, ≤60 nodes |
| Maturity checklist | `/tools/maturity` | localStorage · radar · copy markdown · no PII upload |
| Cost/latency estimator | `/tools/estimator` | Disclaimer required · pure TS formulas |
| Command palette | ⌘K / Ctrl+K | Code-split on first open · dialog a11y |
| Theme toggle | Header + palette | `light\|dark\|system` · FOUC-prevent script |
| Pagefind search | `/search` + header + palette | Lazy index · basePath-aware |
| Skills matrix | `/skills` or About | Table + mobile stacked · links to projects |
| Recharts metrics | Case studies / tools | Always “View as table” · estimated vs measured |

**JS-disabled:** Core MDX + pre-rendered SVG readable; tools show noscript note.

---

# 10. Blog System

## Frontmatter schema

Required: `title`, `description`, `date`, `slug`
Recommended: `updated`, `category`, `tags[]`, `draft`, `featured`, `cover`/`coverAlt`, `ogImage`, `canonicalUrl`, `author`, `series`/`seriesOrder`, `difficulty`, `audience[]`

Derived: `readingTimeMinutes`, `wordCount`, `relatedSlugs` (score: series +4, category +3, tags +1 cap 3)

**Categories:** Platform Engineering · CI/CD · Cloud · Reliability · Security · Culture · Tutorials · Notes

**RSS:** `/rss.xml` (last 20–50)
**Pagefind:** index after export · `data-pagefind-body` on prose · ignore nav/footer/related/TOC

---

# 11. Content Strategy

## Pillars

P1 Platform & Kubernetes · P2 Reliability & SRE · P3 Delivery & DevSecOps · P4 Cloud economics · P5 Engagement & operating model

Steady state ~2 long-form pieces/month.

## Case study template

Title (outcome-oriented) · meta strip · context · problem · constraints · approach · architecture · implementation · outcomes (Verified/Approximate/Client-reported) · lessons · optional next · CTA

## Architecture writeup template

Problem framing · requirements/non-goals · options · chosen design · failure modes · security/tenancy · operability · evolution · references · soft CTA · label reference vs client-derived

## Testimonials process

Ask within 5 business days of close · 4 prompts · written approval · max 3 on home · no composites presented as single-client praise

## Launch inventory (required)

Home copy · engagement page · ≥3 services · ≥3 case studies · ≥1 architecture · About · ≥2 testimonials (1 + references OK for soft launch) · FAQ · Contact · Privacy · OG/favicon · analytics map · calendar if discovery is primary CTA

## Real vs anonymized

Default **anonymized real** · named only with approval · composite/reference must be labeled · never publish hostnames, account IDs, PII dashboards

---

# Non-home page specs (summary)

| Page | Purpose | Primary CTA |
|---|---|---|
| About | Trust, principles, timeline | Discovery · Services · Resume |
| Services | Models + catalog + process + FAQ | Discuss engagement |
| Blog list | Filters + featured + Pagefind | Post · RSS |
| Blog detail | Prose + TOC + related | Contact `ref=blog-{slug}` |
| Resume | ATS/print + skills | PDF · Contact hiring |
| Certifications | Verifiable creds | Verify external · Contact |
| Testimonials | Specific quotes | Start similar engagement |
| Open Source | Curated repos | GitHub · Contact oss |
| Resources | Templates/checklists/tools | Open/Download · Contact |
| Contact | Formspree form + aside | Send · Book · mailto |
| 404 | Recover | Home · Services · Blog · Contact |
| Privacy | Plausible + Formspree disclosure | Privacy contact |
| Terms | Site use + advice disclaimer | Contact · Services |

**Contact fields:** name*, email*, company, intent*, service, budget, message*, timeline, honeypot, consent*
Prefill `intent`/`service` from query. Env: `NEXT_PUBLIC_FORMSPREE_ID`.

---

# 12. Components

## Conventions

Prefer RSC · `'use client'` only for state/motion/diagrams/charts/search · CVA variants · `@/` imports · `withBasePath()` for raw URLs · Framer via shared wrappers with reduced-motion gate.

## Inventory

**ui/** Button, Link, Badge, Card, Separator, Tabs, Accordion, Dialog, Sheet, DropdownMenu, Tooltip, Input, Textarea, Label, Checkbox, Switch, Select, Skeleton, Avatar, ScrollArea, Sonner

**layout/** SiteShell, SiteHeader, MainNav, MobileNav, SiteFooter, Container, Section, PageHeader, ThemeToggle, SkipLink

**marketing/** Hero, FeatureGrid, SelectedWork, AboutTeaser, CtaBand, ContactSection, TechStrip

**projects/** ProjectCard, ProjectGrid, ProjectFilters, CaseStudyLayout, CaseStudyHero, RelatedProjects, StackList, MetricList

**architecture/** ArchitectureCanvas, ArchitectureFallback, MermaidDiagram, DiagramFrame, ArchitectureEmbed

**blog/** PostCard, PostList, TagFilter, PostLayout, Toc, MdxContent, CodeBlock, ShareLinks, PostPager, SearchBox

**widgets/** Chart, DataTable, Timeline, CopyButton, CommandPalette, MaturityChecklist, Estimator

**seo/** JsonLd · `buildPageMetadata` in `lib/seo.ts`

**a11y/motion/** VisuallyHidden, LiveRegion, Heading, AnchorHeading, FadeIn, StaggerChildren, hooks (`usePrefersReducedMotion`, `useMounted`, `useTocHighlight`, `useBasePath`)

---

# 13. Folder Structure

```text
.
├── .github/workflows/
├── app/
├── components/{ui,layout,marketing,projects,architecture,blog,widgets,seo,a11y,motion}/
├── content/{blog,projects,architecture,resources,testimonials,diagrams,site.ts}
├── hooks/
├── lib/{utils,paths,seo,slugify,content,search}/
├── public/{images,og,diagrams,.nojekyll}
├── scripts/
├── types/
├── docs/
├── mdx-components.tsx
├── next.config.ts
└── package.json
```

## next.config (normative)

```ts
output: 'export'
basePath / assetPrefix from NEXT_PUBLIC_BASE_PATH
images: { unoptimized: true }
trailingSlash: true
```

**Project Pages:** `NEXT_PUBLIC_BASE_PATH=/devops-portfolio`
Pagefind writes `out/pagefind/` — do not commit.

---

# 14. SEO Strategy

- `metadataBase` + unique title/description per page
- OG + `summary_large_image` Twitter cards
- JSON-LD: Person, ProfessionalService, BlogPosting/Article, BreadcrumbList
- Build-time `sitemap.xml` + `robots.txt`
- Canonical = preferred host + basePath + trailing-slash policy
- One H1 per page · no skipped heading levels
- OG images 1200×630 · RSS alternate link

---

# 15. Performance Strategy

| Budget | Target |
|---|---|
| LCP / INP / CLS | ≤2.5s / ≤200ms / ≤0.1 |
| Initial JS (no demos) | ≤180KB critical · ≤300KB route |
| CSS | ≤60KB |
| Fonts | ≤2 families × ≤2 weights · ≤100KB WOFF2 |
| LCP image | ≤200KB |

Dynamic import React Flow, Mermaid, Recharts, Pagefind, command palette. LazyMotion for Framer. Self-host fonts.

---

# 16. Accessibility

WCAG 2.2 AA · Lighthouse a11y ≥ 95 · contrast matrix for navy/cyan · keyboard map including ⌘K and diagrams · focus restore · form labels · chart table alternatives · axe + keyboard + screen reader testing.

---

# 17. DevOps Pipeline

`main` protected · Conventional Commits · squash-merge.

**CI:** lint · typecheck · unit · a11y-smoke · build + pagefind · upload `out/`
**Deploy:** GitHub Actions → Pages
**LHCI:** ≥ 0.95 after baseline

**Env:** `NEXT_PUBLIC_SITE_URL` · `NEXT_PUBLIC_BASE_PATH` · `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` · `NEXT_PUBLIC_FORMSPREE_ID`

---

# 18. Future Roadmap

| Phase | Items |
|---|---|
| **1** | MDX hardening · OG generation · visual regression · Pagefind filters · compliance |
| **2** | CMS · i18n · hiring portal · PR previews · resume PDF · RSS |
| **3** | Labs · auth-gated private case studies · advanced ⌘K |

---

# 19. Implementation Plan

```text
M0 Spec approval ✓
 → M1 Scaffold & toolchains
 → M2 Design system & layout shell
 → M3 Home + core content pages
 → M4 Projects & architecture interactivity
 → M5 Blog, MDX, Pagefind
 → M6 Polish, SEO, a11y, perf, CI/CD deploy
```

---

# 20. Development Tasks (128)

See full task IDs T001–T128 in the approved plan. M0/T008 complete. Next: M1 (T009+).

---

# Appendix A — Definition of Done (MVP)

- Static Next.js App Router portfolio on GitHub Pages
- Pagefind search operational (basePath-correct)
- Plausible receiving pageviews when configured
- CI green · Lighthouse CI ≥ 95
- Formspree contact + mailto fallback
- Release checklist for `v1.0.0`

---

*End of approved software specification.*
