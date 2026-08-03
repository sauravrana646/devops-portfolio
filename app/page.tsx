import Link from "next/link";
import { Container } from "@/components/layout/container";
import { FinalCta } from "@/components/marketing/final-cta";
import { ArchitectureFigure } from "@/components/architecture/diagrams";
import { Section, SectionHeader } from "@/components/marketing/section";
import { TextCta } from "@/components/marketing/text-cta";
import { buttonClassName } from "@/components/ui/button";
import { homeContent } from "@/content/home";
import { site } from "@/content/site";

export default function HomePage() {
  const { hero, logos, positioning, work, engage, architecture, quote, signals, insights, finalCta } =
    homeContent;

  return (
    <>
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-16 md:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-rise">
              <p className="mb-4 text-[length:var(--text-display-md)] font-bold uppercase tracking-[0.08em] text-ink">
                {site.brand}
                <span className="text-mint-deep">.</span>
              </p>
              <h1 className="mb-6 max-w-[14ch] text-[length:var(--text-display-xl)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                {hero.title}
              </h1>
              <p className="mb-8 max-w-[36ch] text-lg leading-relaxed text-muted">{hero.support}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={hero.primaryCta.href} className={buttonClassName({ variant: "primary" })}>
                  {hero.primaryCta.label}
                </Link>
                <Link href={hero.secondaryCta.href} className={buttonClassName({ variant: "secondary" })}>
                  {hero.secondaryCta.label}
                </Link>
              </div>
              <p className="mt-6 text-sm text-faint">
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full bg-mint-deep align-middle"
                  aria-hidden="true"
                />
                {hero.meta}
              </p>
            </div>

            <div>
              <div className="relative grid min-h-[320px] place-items-center">
                <div
                  className="hero-blob aspect-square w-full max-w-[420px] shadow-[var(--shadow-lift)]"
                  aria-hidden="true"
                />
                <div className="absolute left-[4%] top-[12%] -rotate-6 rounded-md border border-border bg-[#f7efd2] px-4 py-3.5 text-sm text-ink-soft shadow-soft">
                  <strong className="mb-1 block font-semibold text-ink">{hero.cards[0].title}</strong>
                  {hero.cards[0].body}
                </div>
                <div className="absolute bottom-[18%] right-[2%] rotate-[5deg] rounded-md border border-border bg-surface px-4 py-3.5 text-sm text-ink-soft shadow-soft">
                  <strong className="mb-1 block font-semibold text-ink">{hero.cards[1].title}</strong>
                  {hero.cards[1].body}
                </div>
              </div>
              <p className="mx-auto mt-7 max-w-[32ch] text-center leading-relaxed text-muted">
                {hero.aside}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {logos.length > 0 ? (
        <Section className="!py-0">
          <p className="mb-4 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
            Teams with a quieter week
          </p>
          <div
            className="flex flex-wrap items-center gap-8 py-10 font-semibold tracking-[0.04em] text-faint"
            aria-label="Client references"
          >
            {logos.map((logo) => (
              <span key={logo} className="opacity-55">
                {logo}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <SectionHeader
          eyebrow={positioning.eyebrow}
          title={positioning.title}
          support={positioning.support}
          className="mb-0"
        />
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow={work.eyebrow} title={work.title} />
        <div>
          {work.items.map((item) => (
            <div
              key={item.title}
              className="border-t border-border transition-colors hover:bg-[rgb(157_184_168_/0.12)] last:border-b"
            >
              <Link href={item.href} className="grid gap-3 py-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                <div>
                  <h3 className="mb-1 text-[length:var(--text-h3)] font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="text-muted">{item.subtitle}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="font-mono text-sm text-muted">{item.metric}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6">
          <TextCta href="/projects/">All projects →</TextCta>
        </p>
      </Section>

      <Section>
        <SectionHeader eyebrow={engage.eyebrow} title={engage.title} />
        <div className="grid gap-8 md:grid-cols-3">
          {engage.modes.map((mode) => (
            <div
              key={mode.title}
              className="rounded-lg border border-border bg-surface p-6 shadow-soft"
            >
              <h3 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">{mode.title}</h3>
              <p className="text-muted">{mode.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8">
          <TextCta href="/services/">Explore services →</TextCta>
        </p>
      </Section>

      <Section className="border-y border-border bg-[image:var(--gradient-band)]" size="wide">
        <SectionHeader
          eyebrow={architecture.eyebrow}
          title={architecture.title}
          support={architecture.support}
        />
        <div className="overflow-auto rounded-lg border border-border bg-surface p-8 shadow-soft">
          <ArchitectureFigure id={architecture.diagramId} />
        </div>
        <p className="mt-6">
          <TextCta href="/architecture/">Architecture gallery →</TextCta>
        </p>
      </Section>

      {quote ? (
        <Section>
          <blockquote className="mb-6 max-w-[44rem] font-serif text-[length:var(--text-display-md)] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
            “{quote.text}”
          </blockquote>
          <footer className="text-sm text-faint">{quote.attribution}</footer>
          <p className="mt-6">
            <TextCta href="/testimonials/">All testimonials →</TextCta>
          </p>
        </Section>
      ) : null}

      {signals.certs.length > 0 || signals.repos.length > 0 ? (
        <Section>
          <SectionHeader eyebrow={signals.eyebrow} title={signals.title} />
          <div className="grid gap-10 md:grid-cols-2">
            {signals.certs.length > 0 ? (
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-mint-deep">
                  Certifications
                </p>
                {signals.certs.map((cert) => (
                  <Link
                    key={cert.title}
                    href={cert.href}
                    className="flex items-center justify-between gap-3 border-t border-border py-4 last:border-b"
                  >
                    <span className="font-semibold text-ink">{cert.title}</span>
                    <span className="rounded-pill border border-border px-3 py-1 text-xs text-ink-soft">
                      {cert.tag}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
            {signals.repos.length > 0 ? (
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-mint-deep">
                  Open source
                </p>
                {signals.repos.map((repo) => (
                  <Link
                    key={repo.title}
                    href={repo.href}
                    className="flex items-center justify-between gap-3 border-t border-border py-4 last:border-b"
                  >
                    <span className="font-semibold text-ink">{repo.title}</span>
                    <span className="font-mono text-sm text-muted">{repo.meta}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      <Section className="!pt-0">
        <SectionHeader eyebrow={insights.eyebrow} title={insights.title} />
        {insights.posts.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className="grid gap-2 border-t border-border py-5 last:border-b"
          >
            <span className="font-mono text-sm text-muted">{post.meta}</span>
            <h3 className="text-[length:var(--text-h3)] font-semibold text-ink transition-colors hover:text-mint-deep">
              {post.title}
            </h3>
          </Link>
        ))}
      </Section>

      <FinalCta
        title={finalCta.title.replace("[N]", site.responseDays)}
        body={finalCta.body.replace("[N]", site.responseDays)}
        primaryCta={finalCta.primaryCta}
        secondaryCta={finalCta.secondaryCta}
      />
    </>
  );
}
