import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { certList, featuredCerts } from "@/content/certifications";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Verifiable credentials—featured where they signal depth, listed densely where hiring needs a quick scan.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Credentials"
        title="Certifications"
        lede="Verifiable credentials—featured where they signal depth, listed densely where hiring needs a quick scan."
      />
      <Section>
        <SectionHeader eyebrow="Featured" title="Credentials that map to the work." />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredCerts.map((cert) => (
            <div key={cert.title} className="rounded-lg border border-border bg-surface p-6 shadow-soft">
              <span className="rounded-pill border border-border bg-canvas-elevated px-3 py-1 text-xs font-medium text-ink-soft">
                {cert.tag}
              </span>
              <h3 className="mt-3 mb-2 text-[length:var(--text-h3)] font-semibold text-ink">{cert.title}</h3>
              <p className="mb-4 text-muted">{cert.body}</p>
              <a href={cert.verifyUrl} className="font-mono text-sm font-semibold text-mint-deep">
                Verify credential →
              </a>
            </div>
          ))}
        </div>
      </Section>
      <Section className="!pt-0">
        <SectionHeader
          eyebrow="All credentials"
          title="Dense verify list"
          support="Issuer · status · external verification."
        />
        {certList.map((cert) => (
          <div
            key={cert.title}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-5 last:border-b"
          >
            <div>
              <strong className="text-ink">{cert.title}</strong>
              <div className="font-mono text-sm text-muted">{cert.issuer}</div>
            </div>
            <span className="font-mono text-sm text-muted">{cert.issued}</span>
            <a href={cert.verifyUrl} className="font-semibold text-mint-deep">
              Verify
            </a>
          </div>
        ))}
      </Section>
      <FinalCta
        title="Need proof links for a hiring loop?"
        body={`I can share verification URLs and scope a discovery call within ${site.responseDays} business days.`}
        primaryCta={{ href: "/contact/?intent=hiring", label: "Contact" }}
        secondaryCta={{ href: "/resume/", label: "View resume" }}
      />
    </>
  );
}
