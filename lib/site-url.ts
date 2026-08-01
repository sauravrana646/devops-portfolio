import { getBasePath } from "@/lib/paths";

/** Site origin without trailing slash, e.g. https://user.github.io/devops-portfolio */
export function getSiteUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return fromEnv;
}

/** Absolute URL for an app path (honors SITE_URL which may already include basePath). */
export function absoluteUrl(path: string = "/"): string {
  const site = getSiteUrl();
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;

  // If SITE_URL already ends with basePath, don't double-prefix.
  if (base && site.endsWith(base)) {
    return normalized === "/" ? `${site}/` : `${site}${normalized}`;
  }

  if (!base) {
    return normalized === "/" ? `${site}/` : `${site}${normalized}`;
  }

  if (normalized === "/") return `${site}${base}/`;
  return `${site}${base}${normalized}`;
}
