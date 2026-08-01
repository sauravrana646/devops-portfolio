import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { servicesContent } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: servicesContent.hero.lede,
};

export default function ServicesPage() {
  const { hero, models, catalog, process, faq, finalCta } = servicesContent;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} />

      <Section>
        <SectionHeader eyebrow={models.eyebrow} title={models.title} />
        <div className="grid gap-8 md:grid-cols-3">
          {models.items.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-surface p-6 shadow-soft">
              <h3 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">{item.title}</h3>
              <p className="text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow={catalog.eyebrow} title={catalog.title} />
        {catalog.items.map((item) => (
          <div key={item.title} className="border-t border-border py-8">
            <h2 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">{item.title}</h2>
            <p className="text-muted">{item.summary}</p>
            <ul className="mt-4 list-none p-0">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="relative py-1.5 pl-[22px] text-muted">
                  <span
                    className="absolute left-0 top-3.5 h-2.5 w-2.5 rounded-full bg-mint"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section>
        <SectionHeader eyebrow={process.eyebrow} title={process.title} />
        <div className="mt-4 grid gap-6 md:grid-cols-4">
          {process.steps.map((step) => (
            <div key={step.num}>
              <div className="text-[length:var(--text-caption)] font-bold tracking-[0.08em] text-mint-deep">
                {step.num}
              </div>
              <h3 className="my-3 text-[length:var(--text-h3)] font-medium text-ink">{step.title}</h3>
              <p className="text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={faq.eyebrow} title={faq.title} />
        <div className="max-w-[68ch]">
          {faq.items.map((item, index) => (
            <details
              key={item.q}
              className={`border-t border-border py-5${index === faq.items.length - 1 ? " border-b" : ""}`}
            >
              <summary className="cursor-pointer font-medium text-ink">{item.q}</summary>
              <p className="mt-3 text-muted">
                {item.a.replace("[Timezone]", site.timezone)}
              </p>
            </details>
          ))}
        </div>
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
