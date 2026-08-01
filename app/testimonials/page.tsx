import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Specific outcomes from anonymized real engagements—approved quotes, not composites presented as praise.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Social proof"
        title="Testimonials"
        lede="Specific outcomes from anonymized real engagements—approved quotes, not composites presented as praise."
      />
      <Section className="!pt-8">
        {testimonials.map((item) => (
          <figure key={item.attribution} className="border-t border-border py-10">
            <blockquote className="mb-4 max-w-[44rem] font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.35] text-ink">
              “{item.quote}”
            </blockquote>
            <figcaption className="text-sm text-faint">{item.attribution}</figcaption>
          </figure>
        ))}
      </Section>
      <FinalCta
        title="Start a similar engagement."
        body={`Tell me the constraint that hurts most—I’ll reply within ${site.responseDays} business days.`}
        primaryCta={{ href: "/contact/", label: "Book a discovery call" }}
        secondaryCta={{ href: "/services/", label: "See services" }}
      />
    </>
  );
}
