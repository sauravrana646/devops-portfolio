import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Eyebrow, Heading } from "@/components/layout/heading";
import { FinalCta } from "@/components/marketing/final-cta";
import { Section } from "@/components/marketing/section";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonClassName } from "@/components/ui/button";
import { openSourceRepos } from "@/content/open-source";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Open Source",
  description: `Public DevOps portfolio demos from ${site.consultantName} — secure CI/CD, cloud platform path, and AWS cost tooling.`,
};

export default function OpenSourcePage() {
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)]">
        <Container className="flex min-h-[40vh] flex-col justify-center py-20">
          <FadeIn y={18}>
            <Eyebrow>OSS</Eyebrow>
            <Heading level={1} className="mb-4 max-w-[16ch]">
              Open source
            </Heading>
            <p className="mb-8 max-w-xl text-lg text-muted">
              Public demo repos that back freelance offers—clone them, run locally, and read the case
              studies. Full profile: GitHub.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClassName({ variant: "primary" })}
              >
                GitHub profile
              </a>
              <Link href="/contact/?ref=oss" className={buttonClassName({ variant: "secondary" })}>
                Contact about OSS
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
      <Section>
        <ul className="m-0 list-none space-y-0 p-0">
          {openSourceRepos.map((repo) => (
            <li key={repo.href} className="border-t border-border last:border-b">
              <a
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                className="grid gap-3 py-8 transition-colors hover:bg-[rgb(157_184_168_/0.12)] md:grid-cols-[1.4fr_1fr] md:items-center"
              >
                <div>
                  <p className="mb-1 font-mono text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
                    {repo.meta}
                  </p>
                  <h2 className="mb-2 text-[length:var(--text-h3)] font-semibold text-ink">{repo.title}</h2>
                  <p className="max-w-[60ch] text-muted">{repo.body}</p>
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
                  <span className="font-mono text-sm text-muted">View on GitHub →</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCta
        title="Collaborate on OSS or need a private fork?"
        body="Happy to discuss contributions, sponsorship, or adapting patterns inside your estate."
        primaryCta={{ href: "/contact/?ref=oss", label: "Contact about OSS" }}
        secondaryCta={{ href: site.githubUrl, label: "GitHub profile" }}
      />
    </>
  );
}
