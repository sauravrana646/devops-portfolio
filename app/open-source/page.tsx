import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { openSourceRepos } from "@/content/open-source";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Curated repositories—tools and patterns I maintain or contribute to—not a raw GitHub skin dump.",
};

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        eyebrow="OSS"
        title="Open source"
        lede="Curated repositories—tools and patterns I maintain or contribute to—not a raw GitHub skin dump."
      />
      <Section>
        {openSourceRepos.map((repo) => (
          <a
            key={repo.title}
            href={repo.href}
            target="_blank"
            rel="noreferrer"
            className="grid gap-3 border-t border-border py-6 transition-colors hover:bg-[rgb(157_184_168_/0.12)] last:border-b md:grid-cols-[1.4fr_1fr] md:items-center"
          >
            <div>
              <h3 className="mb-1 text-[length:var(--text-h3)] font-semibold text-ink">{repo.title}</h3>
              <p className="text-muted">{repo.body}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {repo.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  {tag}
                </span>
              ))}
              <span className="font-mono text-sm text-muted">{repo.meta}</span>
            </div>
          </a>
        ))}
      </Section>
      <FinalCta
        title="Collaborate on OSS or need a private fork?"
        body="Happy to discuss contributions, sponsorship, or adapting these patterns inside your estate."
        primaryCta={{ href: "/contact/?ref=oss", label: "Contact about OSS" }}
        secondaryCta={{ href: "https://github.com/", label: "GitHub profile" }}
      />
    </>
  );
}
