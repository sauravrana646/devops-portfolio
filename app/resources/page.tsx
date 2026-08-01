import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { resourceGroups } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Templates, checklists, and tools grouped by job—not a link dump.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Library"
        title="Resources"
        lede="Templates, checklists, and tools grouped by job—not a link dump. Open, download, or adapt."
      />
      <Section>
        {resourceGroups.map((group) => (
          <div key={group.title} className="mb-12">
            <h2 className="mb-4 text-[length:var(--text-h2)] font-semibold text-ink">{group.title}</h2>
            {group.items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-5 last:border-b"
              >
                <h3 className="text-[length:var(--text-h3)] font-semibold text-ink">{item.title}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
                    {item.kind}
                  </span>
                  <span className="font-mono text-sm text-muted">{item.meta}</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </Section>
      <FinalCta
        title="Need a template tailored to your estate?"
        body="Tell me the constraint—I'll point you at the right artifact or adapt one."
        primaryCta={{ href: "/contact/?ref=resources", label: "Request a resource" }}
        secondaryCta={{ href: "/services/", label: "See services" }}
      />
    </>
  );
}
