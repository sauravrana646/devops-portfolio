import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchitectureGallery } from "@/components/architecture/architecture-gallery";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { architectureDiagrams } from "@/content/architecture";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Diagrams as a primary proof surface—inspectable patterns for platform, delivery, security, and reliability.",
};

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        eyebrow="Systems lens"
        title="Architecture"
        lede="Diagrams as a primary proof surface—inspectable patterns for platform, delivery, security, and reliability. Not slide-deck decoration."
      />
      <Section
        className="border-b border-border bg-[image:var(--gradient-band)] !pt-10"
        size="wide"
      >
        <Suspense fallback={<p className="text-muted">Loading gallery…</p>}>
          <ArchitectureGallery diagrams={architectureDiagrams} />
        </Suspense>
      </Section>
      <FinalCta
        title="Need a diagram for your system?"
        body={`Architecture reviews and writeups are part of scoped ${site.brand} engagements.`}
        primaryCta={{ href: "/contact/", label: "Book a discovery call" }}
        secondaryCta={{ href: "/projects/", label: "View projects" }}
      />
    </>
  );
}
