import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/lib/blog-types";

export type { BlogCategory, BlogFrontmatter, BlogPost } from "@/lib/blog-types";
export { blogCategories } from "@/lib/blog-types";
export { extractHeadings, slugifyHeading } from "@/lib/blog-heading";

const blogDir = path.join(process.cwd(), "content/blog");

function readingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function assertPost(data: BlogFrontmatter, file: string) {
  for (const key of ["title", "description", "date", "slug"] as const) {
    if (!data[key]) {
      throw new Error(`Missing frontmatter "${key}" in ${file}`);
    }
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  assertPost(frontmatter, fullPath);
  if (frontmatter.draft) return null;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    ...frontmatter,
    slug: frontmatter.slug || slug,
    content,
    wordCount,
    readingTimeMinutes: readingTimeMinutes(content),
  };
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPost(): BlogPost | undefined {
  return getAllPosts().find((post) => post.featured) ?? getAllPosts()[0];
}

export function filterPostsByCategory(category: string | null): BlogPost[] {
  const posts = getAllPosts();
  if (!category || category === "all") return posts;
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

/** Spec scoring: series +4 (unused), category +3, tags +1, cap 3. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === post.category) score += 3;
      const tags = post.tags ?? [];
      for (const tag of candidate.tags ?? []) {
        if (tags.includes(tag)) score += 1;
      }
      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.candidate.date < b.candidate.date ? 1 : -1))
    .slice(0, limit)
    .map((item) => item.candidate);
}
