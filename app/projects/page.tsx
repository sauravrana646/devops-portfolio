import type { Metadata } from "next";
import { Suspense } from "react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { ProjectFilters } from "@/components/projects/project-filters";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies with constraints, architecture decisions, and measured outcomes—not tool bingo.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        lede={`Case studies with constraints, architecture decisions, and measured outcomes—not tool bingo. Owned end-to-end by ${site.consultantName}.`}
      />
      <Section className="!pt-10">
        <Suspense fallback={<p className="text-muted">Loading projects…</p>}>
          <ProjectFilters projects={projects} />
        </Suspense>
      </Section>
      <FinalCta
        title="Need a similar outcome?"
        body={`Tell me the constraint that hurts most. I’ll reply within ${site.responseDays} business days with a scoped path.`}
        primaryCta={{ href: "/contact/", label: "Book a discovery call" }}
        secondaryCta={{ href: "/architecture/", label: "See architecture" }}
      />
    </>
  );
}
