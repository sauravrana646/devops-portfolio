"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterChips } from "@/components/ui/filter-chips";
import { blogCategories, type BlogPost } from "@/lib/blog-types";

export function BlogFilters({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const active = category && category !== "all" ? [category] : [];

  const featured = useMemo(() => posts.find((post) => post.featured) ?? posts[0], [posts]);
  const list = useMemo(() => {
    const filtered = category
      ? posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
      : posts;
    return filtered.filter((post) => post.slug !== featured?.slug || Boolean(category));
  }, [category, featured?.slug, posts]);

  const showFeatured = featured && !category;

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
    <div>
      <FilterChips
        label="Categories"
        options={blogCategories}
        active={active}
        onChange={setCategory}
        exclusive
      />

      {showFeatured ? (
        <Link
          href={`/blog/${featured.slug}/`}
          className="mb-8 block rounded-lg border border-border bg-surface p-8 shadow-soft transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[var(--shadow-lift)]"
        >
          <span className="mb-3 inline-block text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
            Featured
          </span>
          <h2 className="mb-3 text-[length:var(--text-display-md)] font-semibold tracking-[-0.03em] text-ink">
            {featured.title}
          </h2>
          <p className="mb-4 max-w-2xl text-muted">{featured.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-pill border border-border bg-canvas-elevated px-3 py-1 font-medium text-ink-soft">
              {featured.category}
            </span>
            <span className="font-mono text-muted">
              {featured.date} · {featured.readingTimeMinutes} min
            </span>
          </div>
        </Link>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {list.length} posts
      </p>

      {list.length === 0 ? (
        <p className="border-t border-border py-10 text-muted">No posts in that category yet.</p>
      ) : (
        list.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="grid gap-2 border-t border-border py-5 last:border-b md:grid-cols-[180px_1fr_auto] md:items-center"
          >
            <span className="font-mono text-sm text-muted">
              {post.date} · {post.readingTimeMinutes} min
            </span>
            <h3 className="text-[length:var(--text-h3)] font-semibold text-ink transition-colors hover:text-mint-deep">
              {post.title}
            </h3>
            <span className="rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft md:justify-self-end">
              {post.category}
            </span>
          </Link>
        ))
      )}
    </div>
  );
}
