import Link from "next/link";
import { footerNav, site } from "@/content/site";

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.1em] text-[var(--color-faint)]">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-mint-deep)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] px-[var(--page-gutter)] pb-10 pt-16">
      <div className="mx-auto grid w-full max-w-[var(--content-max)] gap-8 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <Link href="/" className="text-[0.95rem] font-bold uppercase tracking-[0.08em]">
            {site.brand}
            <span className="text-[var(--color-mint-deep)]">.</span>
          </Link>
          <p className="mt-3 max-w-[28ch] text-sm text-[var(--color-muted)]">{site.tagline}</p>
        </div>
        <FooterColumn title="Work" items={footerNav.work} />
        <FooterColumn title="Insights" items={footerNav.insights} />
        <FooterColumn title="Credibility" items={footerNav.credibility} />
        <FooterColumn title="Company" items={footerNav.company} />
      </div>
      <div className="mx-auto mt-12 flex w-full max-w-[var(--content-max)] flex-wrap justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-faint)]">
        <span>
          © {new Date().getFullYear()} {site.consultantName}
        </span>
        <span>systems · secured · shipping</span>
      </div>
    </footer>
  );
}
