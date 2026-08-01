import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { TextCta } from "@/components/marketing/text-cta";
import { aboutContent } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.hero.lede,
};

export default function AboutPage() {
  const { hero, narrative, meta, principles, timeline, finalCta } = aboutContent;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede.replace("[Consultant Name]", site.consultantName)} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[8fr_4fr]">
          <div className="max-w-[68ch] space-y-5 text-muted">
            {narrative.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <aside className="sticky top-[calc(var(--nav-height)+24px)] self-start">
            <p className="mb-4 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
              At a glance
            </p>
            <div className="flex flex-col gap-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 text-sm text-muted">{item.label}</div>
                  <div className="text-ink">
                    {item.value.replace("[Timezone]", site.timezone)}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <TextCta href="/resume/">View resume →</TextCta>
            </p>
          </aside>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Principles" title="How I show up in the work." />
        <div className="space-y-6">
          {principles.map((principle) => (
            <div key={principle.title} className="border-l-[3px] border-mint pl-4">
              <h3 className="mb-2 text-[length:var(--text-h3)] font-semibold text-ink">{principle.title}</h3>
              <p className="text-muted">{principle.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Timeline" title="Selected chapters." />
        <ol className="list-none border-l border-border p-0">
          {timeline.map((item) => (
            <li key={item.period} className="relative pb-8 pl-6 last:pb-0">
              <span
                className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-mint-deep"
                aria-hidden="true"
              />
              <p className="mb-1.5 font-mono text-sm text-muted">{item.period}</p>
              <h3 className="mb-1.5 text-[length:var(--text-h3)] font-medium text-ink">{item.title}</h3>
              <p className="text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FinalCta
        title={finalCta.title}
        body={finalCta.body.replace("[N]", site.responseDays)}
        primaryCta={finalCta.primaryCta}
        secondaryCta={finalCta.secondaryCta}
      />
    </>
  );
}
