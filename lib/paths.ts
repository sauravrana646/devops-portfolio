const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Normalized base path: "" or "/repo" (no trailing slash). */
export function getBasePath(): string {
  if (!rawBase || rawBase === "/") return "";
  return rawBase.startsWith("/") ? rawBase.replace(/\/$/, "") : `/${rawBase.replace(/\/$/, "")}`;
}

/** Prefix an app-absolute path with basePath for GitHub Pages project sites. */
export function withBasePath(path: string = "/"): string {
  const base = getBasePath();
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (!base) return path;
  if (path === "/") return `${base}/`;
  return `${base}${path}`;
}
