import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="border-t border-border transition-colors hover:bg-[rgb(157_184_168_/0.12)] last:border-b">
      <Link
        href={`/projects/${project.slug}/`}
        className="grid gap-3 py-6 md:grid-cols-[1.4fr_1fr] md:items-center"
      >
        <div>
          <h3 className="mb-1 text-[length:var(--text-h3)] font-semibold tracking-[-0.02em] text-ink">
            {project.title}
          </h3>
          <p className="text-muted">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {tag}
            </span>
          ))}
          <span className="font-mono text-sm text-muted">{project.metric}</span>
        </div>
      </Link>
    </div>
  );
}
