"use client";

import { useEffect, useId, useRef } from "react";
import { ArchitectureFigure } from "@/components/architecture/diagrams";
import type { ArchitectureDiagram } from "@/content/architecture";
import { trapTabKey } from "@/lib/focus-trap";

export function DiagramLightbox({
  diagram,
  onClose,
}: {
  diagram: ArchitectureDiagram | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!diagram) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (dialogRef.current) trapTabKey(event, dialogRef.current);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [diagram, onClose]);

  if (!diagram) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(36_48_56_/0.45)] p-4 backdrop-blur-sm animate-fade-in"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg border border-border bg-surface p-4 shadow-soft md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
              {diagram.category}
            </p>
            <h2 id={titleId} className="text-[length:var(--text-h2)] font-semibold text-ink">
              {diagram.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="rounded-pill border border-border bg-canvas-elevated px-3 py-1.5 text-sm font-semibold text-ink"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="overflow-auto rounded-lg border border-border bg-canvas-elevated p-4">
          <ArchitectureFigure id={diagram.id} large />
        </div>
        <p className="mt-3 font-mono text-[length:var(--text-caption)] text-muted">{diagram.caption}</p>
      </div>
    </div>
  );
}
