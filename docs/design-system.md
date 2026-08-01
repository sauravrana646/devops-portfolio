# Design system (M2)

Approved visual direction: **minimal pastel mint**, fluent **Plus Jakarta Sans**, soft charcoal ink.

## Tokens

Defined in `app/globals.css` as CSS variables:

- Canvas / surfaces: `--color-canvas`, `--color-surface`, `--color-surface-soft`
- Ink: `--color-ink`, `--color-ink-soft`, `--color-muted`, `--color-faint`
- Accents: `--color-mint`, `--color-mint-deep`, `--color-butter`, `--color-peach`
- CTA: `--color-cta` / `--color-cta-hover`
- Radii: `--radius-sm|md|lg|pill`
- Motion: `--duration-fast`, `--ease-out` (honors `prefers-reduced-motion`)

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
| IA config | `content/site.ts` |

## Preview

- Marketing shell: any app route (header + footer)
- Primitive gallery: `/design/` (`noindex`)
- HTML mockups (reference): `design/preview/`
