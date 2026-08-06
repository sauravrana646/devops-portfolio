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
    "Selected DevOps and cloud work—public demos plus employment outcomes with measured constraints.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        lede={`Public demo repos and employment outcomes from ${site.consultantName}—constraints, approach, and metrics. Illustrative consulting fiction removed for honesty.`}
      />
      <Section className="!pt-10">
        <Suspense fallback={<p className="text-muted">Loading projects…</p>}>
          <ProjectFilters projects={projects} />
        </Suspense>
      </Section>
      <FinalCta
        title="Hiring or need a similar outcome?"
        body={`Tell me about the role or constraint. I’ll reply within ${site.responseDays} business days.`}
        primaryCta={{ href: "/contact/", label: "Get in touch" }}
        secondaryCta={{ href: "/architecture/", label: "See architecture" }}
      />
    </>
  );
}
