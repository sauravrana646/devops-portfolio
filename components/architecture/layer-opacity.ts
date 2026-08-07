export type ArchitectureLayerId = "git" | "hub" | "spokes" | "secrets" | "ci";

export type ArchitectureLayerState = Record<ArchitectureLayerId, boolean>;

export const defaultArchitectureLayers: ArchitectureLayerState = {
  git: true,
  hub: true,
  spokes: true,
  secrets: true,
  ci: true,
};

/** SVG presentation opacity for a layer toggle. */
export function layerOpacity(
  layers: ArchitectureLayerState | undefined,
  id: ArchitectureLayerId,
  on = 1,
  off = 0.12,
) {
  if (!layers) return on;
  return layers[id] ? on : off;
}
