import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BlogFilters } from "@/components/blog/blog-filters";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { getAllPosts } from "@/lib/blog";
import { withBasePath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Notes on platform engineering, delivery, reliability, and the operating models that keep them honest.",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Notes"
        title="Writing"
        lede="Notes on platform engineering, delivery, reliability, and the operating models that keep them honest."
      />
      <Section className="!pt-10">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
          <Link href="/search/" className="font-semibold text-mint-deep">
            Search notes →
          </Link>
          <a href={withBasePath("/rss.xml")} className="font-semibold text-ink-soft hover:text-mint-deep">
            RSS
          </a>
        </div>
        <Suspense fallback={<p className="text-muted">Loading posts…</p>}>
          <BlogFilters posts={posts} />
        </Suspense>
      </Section>
    </>
  );
}
