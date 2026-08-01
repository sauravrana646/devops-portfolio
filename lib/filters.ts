/** Parse `?tags=a,b` (and legacy `?tag=a`) into a normalized tag list. */
export function parseTagsParam(value: string | null, legacyTag: string | null = null): string[] {
  const raw = value ?? legacyTag;
  if (!raw) return [];
  return [
    ...new Set(
      raw
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];
}

export function serializeTagsParam(tags: string[]): string | null {
  if (tags.length === 0) return null;
  return [...tags].sort().join(",");
}

export function toggleTag(current: string[], tag: string): string[] {
  const normalized = tag.toLowerCase();
  if (current.includes(normalized)) {
    return current.filter((item) => item !== normalized);
  }
  return [...current, normalized].sort();
}
