import type { HTMLAttributes } from "react";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  size?: "narrow" | "default" | "wide";
  bleed?: boolean;
  /** Scroll reveal (on by default for site-wide motion). */
  reveal?: boolean;
};

export function Section({
  className,
  children,
  size = "default",
  bleed = false,
  reveal = true,
  ...props
}: SectionProps) {
  const section = (
    <section className={cn("py-[var(--section-y)]", className)} {...props}>
      {bleed ? children : <Container size={size}>{children}</Container>}
    </section>
  );

  if (!reveal) return section;
  return <FadeIn>{section}</FadeIn>;
}

export function SectionHeader({
  eyebrow,
  title,
  support,
  className,
}: {
  eyebrow?: string;
  title: string;
  support?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[length:var(--text-display-md)] font-semibold tracking-[-0.03em] leading-[1.15] text-ink">
        {title}
      </h2>
      {support ? <p className="mt-3 text-muted">{support}</p> : null}
    </div>
  );
}
