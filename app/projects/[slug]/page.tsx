import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { CaseStudyBody, CaseStudyRelated } from "@/components/projects/case-study-sections";
import { getAllProjectSlugs, getProject } from "@/content/projects";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Case study · ${project.tags.join(" · ")}`}
        title={project.title}
        lede={project.summary}
      />
      <Section className="!pt-8">
        <div
          data-pagefind-ignore
          className="mb-10 flex flex-wrap gap-6 border-y border-border py-6 text-sm text-muted"
          aria-label="Engagement metadata"
        >
          <span>
            <span className="text-faint">Role</span> · {project.role}
          </span>
          <span>
            <span className="text-faint">Timeline</span> · {project.timeline}
          </span>
          <span>
            <span className="text-faint">Stack</span> · {project.stack.join(" · ")}
          </span>
          <span>
            <span className="text-faint">Confidentiality</span> · {project.confidentiality}
          </span>
        </div>
        <CaseStudyBody project={project} />
        <CaseStudyRelated project={project} />
      </Section>
      <FinalCta
        title="Start a scoped engagement."
        body={`If drift, lead time, or multi-cluster ownership is your constraint, ${site.consultantName} can own the path.`}
        primaryCta={{ href: `/contact/?project=${project.slug}`, label: "Book a discovery call" }}
        secondaryCta={{ href: "/projects/", label: "More case studies" }}
      />
    </>
  );
}
