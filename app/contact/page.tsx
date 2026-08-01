import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/marketing/contact-form";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a scoped engagement with ${site.brand}. Reply within ${site.responseDays} business days.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a scoped engagement."
        lede={`Tell me the constraint that hurts most. I’ll reply within ${site.responseDays} business days with fit, questions, and a path to discovery.`}
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-6 text-[length:var(--text-display-md)] font-bold uppercase tracking-[0.08em] text-ink">
              {site.brand}
              <span className="text-mint-deep">.</span>
            </p>
            <p className="mb-8 max-w-[32ch] text-muted">{site.description}</p>
            <div className="flex flex-col gap-5">
              <div>
                <div className="mb-1 text-sm text-muted">Availability</div>
                <div className="text-ink">Open to project, retainer, and advisory · remote</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-muted">Timezone</div>
                <div className="text-ink">{site.timezone}</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-muted">Response SLA</div>
                <div className="text-ink">Within {site.responseDays} business days</div>
              </div>
            </div>
            <p className="mt-8">
              <a className="font-semibold text-mint-deep" href={`mailto:${site.email}`}>
                Or email {site.email} directly →
              </a>
            </p>
          </div>

          <Suspense fallback={<p className="text-muted">Loading form…</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
