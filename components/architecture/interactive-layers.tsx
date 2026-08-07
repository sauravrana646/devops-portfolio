"use client";

import { useState } from "react";
import { ArchitectureFigure } from "@/components/architecture/diagrams";
import {
  defaultArchitectureLayers,
  type ArchitectureLayerId,
  type ArchitectureLayerState,
} from "@/components/architecture/layer-opacity";
import { cn } from "@/lib/utils";

const allLayers: { id: ArchitectureLayerId; label: string; description: string }[] = [
  { id: "git", label: "Git source", description: "Monorepo as mutate path" },
  { id: "hub", label: "Argo hub", description: "Management cluster sync" },
  { id: "spokes", label: "Spoke clusters", description: "Workload destinations" },
  { id: "ci", label: "CI preview", description: "PR diffs, no prod mutate" },
  { id: "secrets", label: "Secrets (ESO)", description: "Dashed secret path" },
];

/** Compact home diagram only has git / hub / spokes groups. */
const compactLayerIds: ArchitectureLayerId[] = ["git", "hub", "spokes"];

/** Layer toggles for the GitOps diagram — opacity applied on SVG groups. */
export function InteractiveArchitecture({
  id,
  large = false,
}: {
  id: string;
  large?: boolean;
}) {
  const interactive = id === "gitops-hub-spoke";
  const [enabled, setEnabled] = useState<ArchitectureLayerState>(defaultArchitectureLayers);
  const available = large ? allLayers : allLayers.filter((layer) => compactLayerIds.includes(layer.id));

  if (!interactive) {
    return <ArchitectureFigure id={id} large={large} />;
  }

  return (
    <div className="relative z-[1] isolate">
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Toggle architecture layers"
      >
        {available.map((layer) => {
          const on = enabled[layer.id];
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={on}
              title={layer.description}
              className={cn(
                "relative z-[2] min-h-11 touch-manipulation rounded-pill border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.06em] transition-colors sm:min-h-0 sm:py-1.5",
                on
                  ? "border-mint-deep bg-[rgb(157_184_168_/0.22)] text-ink"
                  : "border-border bg-canvas-elevated text-faint",
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setEnabled((prev) => ({ ...prev, [layer.id]: !prev[layer.id] }));
              }}
            >
              {layer.label}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Layers:{" "}
        {available
          .filter((layer) => enabled[layer.id])
          .map((layer) => layer.label)
          .join(", ") || "none"}
      </p>
      <div className="overflow-x-auto">
        <ArchitectureFigure id={id} large={large} layers={enabled} />
      </div>
    </div>
  );
}
