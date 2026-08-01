import Link from "next/link";
import { ArchitectureFigure } from "@/components/architecture/diagrams";
import { ProjectRow } from "@/components/projects/project-row";
import { TextCta } from "@/components/marketing/text-cta";
import { getArchitecture } from "@/content/architecture";
import { getProject, type Project } from "@/content/projects";

export function CaseStudyBody({ project }: { project: Project }) {
  const diagramId = project.heroDiagramId;

  return (
    <article
      data-pagefind-body
      data-pagefind-meta={`title:${project.title}`}
      className="prose-case max-w-[68ch]"
    >
      <Section title="Problem">{project.problem}</Section>
      <Section title="Constraints">{project.constraints}</Section>
      <Section title="Architecture">{project.architecture}</Section>
      {diagramId ? (
        <div className="my-8 overflow-auto rounded-lg border border-border bg-surface p-6 shadow-soft">
          <ArchitectureFigure id={diagramId} />
          <p className="mt-3 font-mono text-[length:var(--text-caption)] text-muted">
            {getArchitecture(diagramId)?.caption ?? "Architecture figure"}
          </p>
        </div>
      ) : null}
      <Section title="Implementation">{project.implementation}</Section>
      <section className="mb-8">
        <h2 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">Outcomes</h2>
        <ul className="mb-4 list-none space-y-2 p-0">
          {project.outcomes.map((outcome) => (
            <li key={outcome.label} className="text-muted">
              <span className="font-mono text-sm text-mint-deep">{outcome.confidence}</span>
              {" — "}
              {outcome.label}
            </li>
          ))}
        </ul>
        <p className="text-muted">{project.outcomesNarrative}</p>
      </section>
      <Section title="Lessons">{project.lessons}</Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">{title}</h2>
      <p className="text-muted">{children}</p>
    </section>
  );
}

export function CaseStudyRelated({ project }: { project: Project }) {
  const relatedProjects = project.relatedSlugs
    .map((slug) => getProject(slug))
    .filter((item): item is Project => Boolean(item));
  const relatedArch = project.relatedArchitectureIds
    .map((id) => getArchitecture(id))
    .filter(Boolean);

  return (
    <div className="mt-12">
      <p className="mb-4 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
        Related
      </p>
      {relatedArch.map((diagram) =>
        diagram ? (
          <div
            key={diagram.id}
            className="border-t border-border transition-colors hover:bg-[rgb(157_184_168_/0.12)]"
          >
            <Link
              href={`/architecture/${diagram.id}/`}
              className="grid gap-3 py-6 md:grid-cols-[1.4fr_1fr] md:items-center"
            >
              <div>
                <h3 className="mb-1 text-[length:var(--text-h3)] font-semibold text-ink">{diagram.title}</h3>
                <p className="text-muted">Architecture writeup · inspect the diagram</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
                  {diagram.category}
                </span>
                <span className="font-mono text-sm text-muted">See the architecture →</span>
              </div>
            </Link>
          </div>
        ) : null,
      )}
      {relatedProjects.map((item) => (
        <ProjectRow key={item.slug} project={item} />
      ))}
      <div className="border-y border-border py-6">
        <TextCta href="/projects/">All projects →</TextCta>
      </div>
    </div>
  );
}
