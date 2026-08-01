"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterChips } from "@/components/ui/filter-chips";
import { ProjectRow } from "@/components/projects/project-row";
import { filterProjectsByTags, projectTags, type Project } from "@/content/projects";
import { parseTagsParam, serializeTagsParam } from "@/lib/filters";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTags = useMemo(
    () => parseTagsParam(searchParams.get("tags"), searchParams.get("tag")),
    [searchParams],
  );

  const visible = useMemo(() => filterProjectsByTags(activeTags), [activeTags]);

  const setTags = useCallback(
    (next: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tag");
      const serialized = serializeTagsParam(next);
      if (serialized) params.set("tags", serialized);
      else params.delete("tags");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div>
      <FilterChips
        label="Filter projects by tag"
        options={projectTags}
        active={activeTags}
        onChange={setTags}
      />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>
      {visible.length === 0 ? (
        <p className="border-t border-border py-10 text-muted">
          No projects match those tags.{" "}
          <button type="button" className="font-semibold text-mint-deep" onClick={() => setTags([])}>
            Clear filters
          </button>
        </p>
      ) : (
        visible.map((project) => <ProjectRow key={project.slug} project={project} />)
      )}
    </div>
  );
}
