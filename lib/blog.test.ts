import { describe, expect, it } from "vitest";
import {
  extractHeadings,
  getAllPosts,
  getFeaturedPost,
  getPostBySlug,
  getRelatedPosts,
  slugifyHeading,
} from "@/lib/blog";

describe("blog content", () => {
  it("loads published MDX posts newest-first", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(6);
    expect(posts[0].date >= posts[1].date).toBe(true);
    expect(posts.every((post) => !post.draft)).toBe(true);
  });

  it("reads featured progressive-delivery post", () => {
    const featured = getFeaturedPost();
    expect(featured?.slug).toBe("progressive-delivery-git-only-path");
    const post = getPostBySlug("progressive-delivery-git-only-path");
    expect(post?.readingTimeMinutes).toBeGreaterThan(0);
    expect(post?.content.includes("single merge path")).toBe(true);
  });

  it("scores related posts by category/tags", () => {
    const post = getPostBySlug("error-budgets-product-conversation");
    expect(post).toBeTruthy();
    const related = getRelatedPosts(post!);
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((item) => item.slug !== post!.slug)).toBe(true);
  });

  it("extracts h2 headings for TOC", () => {
    expect(slugifyHeading("Make policy readable in code")).toBe("make-policy-readable-in-code");
    const headings = extractHeadings("## One\n\npara\n\n## Two");
    expect(headings).toEqual([
      { id: "one", text: "One" },
      { id: "two", text: "Two" },
    ]);
  });
});
