"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState, useTransition } from "react";
import { getBasePath, withBasePath } from "@/lib/paths";
import { sanitizeSearchExcerpt } from "@/lib/sanitize-excerpt";

type PagefindResult = {
  id: string;
  data: () => Promise<{
    url: string;
    meta: { title?: string };
    excerpt: string;
  }>;
};

type PagefindApi = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

declare global {
  interface Window {
    pagefind?: PagefindApi;
  }
}

async function loadPagefind(basePath: string): Promise<PagefindApi> {
  if (window.pagefind) return window.pagefind;
  const url = `${basePath}/pagefind/pagefind.js`;
  const dynamicImport = new Function("u", "return import(u)") as (u: string) => Promise<PagefindApi>;
  const mod = await dynamicImport(url);
  window.pagefind = mod;
  return mod;
}

function toAppPath(url: string, basePath: string) {
  let path = url;
  if (basePath && path.startsWith(basePath)) {
    path = path.slice(basePath.length) || "/";
  }
  try {
    const parsed = new URL(path, "https://example.invalid");
    path = parsed.pathname + parsed.search + parsed.hash;
  } catch {
    // keep path
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return path;
}

export function SearchBox() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "missing" | "error">("loading");
  const [hits, setHits] = useState<{ url: string; title: string; excerpt: string }[]>([]);
  const [, startTransition] = useTransition();
  const basePath = useMemo(() => getBasePath(), []);
  const trimmed = query.trim();

  useEffect(() => {
    let cancelled = false;
    void loadPagefind(basePath)
      .then(() => {
        if (!cancelled) {
          startTransition(() => setStatus("ready"));
        }
      })
      .catch(() => {
        if (!cancelled) {
          startTransition(() => setStatus("missing"));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [basePath]);

  useEffect(() => {
    if (!trimmed || status !== "ready" || !window.pagefind) {
      return;
    }

    const handle = window.setTimeout(() => {
      void (async () => {
        try {
          const response = await window.pagefind!.search(trimmed);
          const top = await Promise.all(
            response.results.slice(0, 8).map(async (result) => {
              const data = await result.data();
              return {
                url: toAppPath(data.url, basePath),
                title: data.meta.title ?? data.url,
                excerpt: sanitizeSearchExcerpt(data.excerpt),
              };
            }),
          );
          startTransition(() => setHits(top));
        } catch {
          startTransition(() => setStatus("error"));
        }
      })();
    }, 180);

    return () => window.clearTimeout(handle);
  }, [basePath, status, trimmed]);

  const visibleHits = trimmed && status === "ready" ? hits : [];

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-ink-soft">
        Search the site
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          if (!event.target.value.trim()) {
            setHits([]);
          }
        }}
        placeholder="GitOps, SLOs, golden paths…"
        className="field mb-4"
        autoComplete="off"
      />

      {status === "loading" ? <p className="text-sm text-muted">Loading search index…</p> : null}
      {status === "missing" ? (
        <p className="text-sm text-muted">
          Search index not found. Run <code className="font-mono">npm run build</code> so Pagefind can
          index the export (also browse{" "}
          <a className="font-semibold text-mint-deep" href={withBasePath("/blog/")}>
            /blog/
          </a>
          ).
        </p>
      ) : null}
      {status === "error" ? <p className="text-sm text-[var(--ds-danger)]">Search failed. Try again.</p> : null}

      {trimmed && status === "ready" ? (
        <div aria-live="polite">
          {visibleHits.length === 0 ? (
            <p className="text-muted">No results for “{trimmed}”.</p>
          ) : (
            <ul className="list-none space-y-4 p-0">
              {visibleHits.map((hit) => (
                <li key={hit.url} className="border-t border-border pt-4">
                  <Link href={hit.url} className="font-semibold text-ink hover:text-mint-deep">
                    {hit.title}
                  </Link>
                  <p
                    className="mt-1 text-sm text-muted [&_mark]:rounded [&_mark]:bg-butter [&_mark]:px-0.5"
                    dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
