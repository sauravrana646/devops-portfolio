type ClassValue = string | false | null | undefined;

/** Lightweight className joiner (no runtime deps). */
export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(" ");
}
