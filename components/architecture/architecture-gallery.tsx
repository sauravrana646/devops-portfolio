"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArchitectureThumb } from "@/components/architecture/diagrams";
import { DiagramLightbox } from "@/components/architecture/diagram-lightbox";
import { FilterChips } from "@/components/ui/filter-chips";
import {
  architectureCategories,
  filterArchitectureByCategory,
  type ArchitectureDiagram,
} from "@/content/architecture";

export function ArchitectureGallery({ diagrams }: { diagrams: ArchitectureDiagram[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const category = searchParams.get("category");
  const active = category && category !== "all" ? [category] : [];

  const visible = useMemo(() => filterArchitectureByCategory(category), [category]);
  const lightbox = diagrams.find((diagram) => diagram.id === lightboxId) ?? null;

  const setCategory = useCallback(
    (next: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next[0]) params.set("category", next[0]);
      else params.delete("category");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <FilterChips
        label="Filter architecture by category"
        options={architectureCategories}
        active={active}
        onChange={setCategory}
        exclusive
      />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} diagrams
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((diagram) => (
          <article
            key={diagram.id}
            className="overflow-hidden rounded-lg border border-border bg-surface shadow-soft transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[var(--shadow-lift)]"
          >
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => setLightboxId(diagram.id)}
              aria-label={`Open lightbox for ${diagram.title}`}
            >
              <div className="aspect-[16/10] border-b border-border bg-canvas-elevated">
                <ArchitectureThumb id={diagram.id} />
              </div>
            </button>
            <div className="p-5">
              <h3 className="mb-1 text-[length:var(--text-h3)] font-semibold text-ink">
                <Link href={`/architecture/${diagram.id}/`} className="hover:text-mint-deep">
                  {diagram.title}
                </Link>
              </h3>
              <p className="font-mono text-[length:var(--text-caption)] text-muted">{diagram.category}</p>
            </div>
          </article>
        ))}
      </div>
      <DiagramLightbox diagram={lightbox} onClose={() => setLightboxId(null)} />
    </>
  );
}
