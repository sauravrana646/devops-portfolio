import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonClassName } from "@/components/ui/button";

function CtaLink({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const className = buttonClassName({ variant });
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function FinalCta({
  title,
  body,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  body: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}) {
  return (
    <FadeIn>
      <section className="border-t border-border bg-surface-soft px-[var(--page-gutter)] py-[var(--section-y)] text-center">
        <h2 className="mb-4 text-[length:var(--text-display-md)] font-semibold tracking-[-0.03em] text-ink">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-muted">{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CtaLink href={primaryCta.href} label={primaryCta.label} variant="primary" />
          <CtaLink href={secondaryCta.href} label={secondaryCta.label} variant="secondary" />
        </div>
      </section>
    </FadeIn>
  );
}
