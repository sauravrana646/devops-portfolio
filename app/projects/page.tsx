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
    "Selected DevOps and cloud work—three public demos with measured constraints and cloneable repos.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        lede={`Three public demo repos from ${site.consultantName}—constraints, approach, and metrics you can clone and run.`}
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
