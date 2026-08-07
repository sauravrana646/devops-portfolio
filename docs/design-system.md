# Design system (M2)

Approved visual direction: **minimal pastel mint**, fluent **Plus Jakarta Sans**, soft charcoal ink. Dark theme is a charcoal mint variant (`.dark` via `next-themes`).

## Tokens

Defined in `app/globals.css` as CSS variables:

- Canvas / surfaces: `--color-canvas`, `--color-surface`, `--color-surface-soft`
- Ink: `--color-ink`, `--color-ink-soft`, `--color-muted`, `--color-faint`
- Accents: `--color-mint`, `--color-mint-deep`, `--color-butter`, `--color-peach`
- CTA: `--color-cta` / `--color-cta-hover`
- Radii: `--radius-sm|md|lg|pill`
- Motion: `--duration-fast|base|slow|hero`, `--ease-out` (honors `prefers-reduced-motion`)

## Motion (v1.1 polish)

Framer Motion (`12.42.2`) via LazyMotion + `domAnimation`:

| Piece | Path |
|-------|------|
| Provider | `components/motion/motion-provider.tsx` |
| FadeIn (bidirectional scroll reveal) | `components/motion/fade-in.tsx` |
| StaggerChildren / StaggerItem | `components/motion/stagger.tsx` |
| Reduced-motion hook | `hooks/use-prefers-reduced-motion.ts` |

Ship patterns: hero brand stagger · nav underline grow (`layoutId`) · section reveal on all marketing pages (via `Section` / `PageHero` / `FinalCta`) · scroll progress · ambient background. Reduced motion → opacity-only / instant.

| Piece | Path |
|-------|------|
| Ambient background | `components/motion/ambient-background.tsx` |
| Scroll progress | `components/motion/scroll-progress.tsx` |
| Theme provider / toggle | `components/theme/*` |
| ⌘K command palette | `components/widgets/command-palette*.tsx` |
| Interactive architecture layers | `components/architecture/interactive-layers.tsx` |

## Fonts

- UI: `Plus_Jakarta_Sans` via `next/font` → `--font-plus-jakarta`
- Quotes: `Source_Serif_4` → `--font-source-serif`

## Components

| Area | Path |
|------|------|
| Button | `components/ui/button.tsx` |
| TextLink | `components/ui/text-link.tsx` |
| Container / Stack / Heading | `components/layout/*` |
| SkipLink / Header / Footer / Shell | `components/layout/*` |
| CodeBlock (copy) | `components/blog/code-block.tsx` |
| Icons | `lucide-react` (stroke 1.5) |
| IA config | `content/site.ts` |

## Preview

- Marketing shell: any app route (header + footer)
- Primitive gallery: `/design/` (`noindex`)
- HTML mockups (reference): `design/preview/`
