"use client";

import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger";
import { buttonClassName } from "@/components/ui/button";
import { site } from "@/content/site";
import { useCoarsePointer, useCompactViewport } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type HeroCard = { title: string; body: string };

export function HomeHero({
  title,
  support,
  primaryCta,
  secondaryCta,
  meta,
  aside,
  cards,
}: {
  title: string;
  support: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  meta: string;
  aside: string;
  cards: readonly [HeroCard, HeroCard] | readonly HeroCard[];
}) {
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const compact = useCompactViewport();
  const gentle = reduced || coarse || compact;
  const asideRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: asideRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], gentle ? [0, 0] : [24, -36]);
  const cardA = useTransform(scrollYProgress, [0, 1], gentle ? [0, 0] : [12, -18]);
  const cardB = useTransform(scrollYProgress, [0, 1], gentle ? [0, 0] : [-8, 22]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <StaggerChildren>
        <StaggerItem>
          <p className="mb-4 text-[length:var(--text-display-md)] font-bold uppercase tracking-[0.08em] text-ink">
            {site.brand}
            <span className="text-mint-deep">.</span>
          </p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="mb-6 max-w-[14ch] text-[length:var(--text-display-xl)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            {title}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mb-8 max-w-[36ch] text-lg leading-relaxed text-muted">{support}</p>
        </StaggerItem>
        <StaggerItem>
          <div className="flex flex-wrap gap-3">
            <Link href={primaryCta.href} className={buttonClassName({ variant: "primary" })}>
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className={buttonClassName({ variant: "secondary" })}>
              {secondaryCta.label}
            </Link>
          </div>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 text-sm text-faint">
            <span
              className="mr-2 inline-block h-2 w-2 rounded-full bg-mint-deep align-middle"
              aria-hidden="true"
            />
            {meta}
          </p>
        </StaggerItem>
      </StaggerChildren>

      <div ref={asideRef}>
        <div className="relative grid min-h-[320px] place-items-center">
          <m.div
            style={{ y: blobY }}
            className="hero-blob aspect-square w-full max-w-[420px] shadow-[var(--shadow-lift)]"
            aria-hidden="true"
          />
          <m.div
            style={{ y: cardA }}
            className="absolute left-[4%] top-[12%] -rotate-6 rounded-md border border-border bg-[color-mix(in_srgb,var(--ds-butter)_55%,var(--ds-surface))] px-4 py-3.5 text-sm text-ink-soft shadow-soft"
          >
            <strong className="mb-1 block font-semibold text-ink">{cards[0].title}</strong>
            {cards[0].body}
          </m.div>
          <m.div
            style={{ y: cardB }}
            className="absolute bottom-[18%] right-[2%] rotate-[5deg] rounded-md border border-border bg-surface px-4 py-3.5 text-sm text-ink-soft shadow-soft"
          >
            <strong className="mb-1 block font-semibold text-ink">{cards[1].title}</strong>
            {cards[1].body}
          </m.div>
        </div>
        <p className="mx-auto mt-7 max-w-[32ch] text-center leading-relaxed text-muted">{aside}</p>
      </div>
    </div>
  );
}
