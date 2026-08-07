import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractiveArchitecture } from "@/components/architecture/interactive-layers";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { TextCta } from "@/components/marketing/text-cta";
import { ProjectRow } from "@/components/projects/project-row";
import { getAllArchitectureIds, getArchitecture } from "@/content/architecture";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllArchitectureIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const diagram = getArchitecture(id);
  if (!diagram) return { title: "Architecture" };
  return {
    title: diagram.title,
    description: diagram.summary,
  };
}

export default async function ArchitectureDetailPage({ params }: Props) {
  const { id } = await params;
  const diagram = getArchitecture(id);
  if (!diagram) notFound();

  const relatedProject = diagram.relatedProjectSlug
    ? getProject(diagram.relatedProjectSlug)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow={`Architecture · ${diagram.category}`}
        title={diagram.title}
        lede={diagram.summary}
      />
      <Section className="!pt-8" size="wide">
        <div
          className="mb-8 flex flex-wrap gap-6 border-y border-border py-6 text-sm text-muted"
          aria-label="Diagram metadata"
        >
          <span>
            <span className="text-faint">Pattern</span> · {diagram.pattern}
          </span>
          <span>
            <span className="text-faint">Category</span> · {diagram.category}
          </span>
          <span>
            <span className="text-faint">Engine</span> ·{" "}
            {diagram.id === "gitops-hub-spoke" ? "interactive layers + SVG" : "static SVG"}
          </span>
        </div>

        <div data-pagefind-body data-pagefind-meta={`title:${diagram.title}`}>
        <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
          <InteractiveArchitecture id={diagram.id} large />
        </div>
        <p className="mt-3 font-mono text-[length:var(--text-caption)] text-muted">{diagram.caption}</p>
        <p className="sr-only">{diagram.summary}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[8fr_4fr]">
          <div>
            <p className="mb-3 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
              Legend
            </p>
            <ul className="mb-10 list-none space-y-2 p-0">
              {diagram.legend.map((item) => (
                <li key={item} className="relative pl-[22px] text-muted">
                  <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-mint" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mb-3 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
              Tradeoffs
            </p>
            <ul className="list-none space-y-2 p-0">
              {diagram.tradeoffs.map((item) => (
                <li key={item} className="relative pl-[22px] text-muted">
                  <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-mint" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-6">
            <div className="border-l-[3px] border-mint pl-4">
              <h3 className="mb-2 text-[length:var(--text-h3)] font-semibold text-ink">Non-goals</h3>
              <p className="text-muted">{diagram.nonGoals}</p>
            </div>
            <div className="border-l-[3px] border-mint pl-4">
              <h3 className="mb-2 text-[length:var(--text-h3)] font-semibold text-ink">Operability</h3>
              <p className="text-muted">{diagram.operability}</p>
            </div>
          </aside>
        </div>
        </div>

        {relatedProject ? (
          <div data-pagefind-ignore className="mt-12">
            <p className="mb-4 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
              Related project
            </p>
            <ProjectRow project={relatedProject} />
          </div>
        ) : null}

        <p className="mt-6">
          <TextCta href="/architecture/">← Architecture gallery</TextCta>
        </p>
        <p className="sr-only">
          <Link href="/architecture/">Back to architecture gallery</Link>
        </p>
      </Section>
      <FinalCta
        title="Discuss this pattern for your clusters."
        body={`${site.consultantName} ships architecture you can inspect—then operates it until the metrics move.`}
        primaryCta={{ href: "/contact/", label: "Book a discovery call" }}
        secondaryCta={{ href: "/architecture/", label: "More diagrams" }}
      />
    </>
  );
}
