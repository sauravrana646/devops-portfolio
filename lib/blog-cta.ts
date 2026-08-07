import type { BlogFrontmatter } from "@/lib/blog-types";
import { site } from "@/content/site";

export type BlogCta = {
  title: string;
  body: string;
  label: string;
};

/** Fallback when a note omits cta* frontmatter — keep topic-neutral. */
export const defaultBlogCta: BlogCta = {
  title: "Working through a similar constraint?",
  body: `Tell me what’s stuck—reliability, delivery, security, or cost—and what “good” looks like next quarter. I’ll reply within ${site.responseDays} business days.`,
  label: "Get in touch",
};

/** Resolve per-note CTA with defaults. Body may omit the SLA line; we append if missing. */
export function resolveBlogCta(post: Pick<BlogFrontmatter, "ctaTitle" | "ctaBody" | "ctaLabel">): BlogCta {
  const title = post.ctaTitle?.trim() || defaultBlogCta.title;
  const label = post.ctaLabel?.trim() || defaultBlogCta.label;
  let body = post.ctaBody?.trim() || defaultBlogCta.body;

  const sla = `I’ll reply within ${site.responseDays} business days.`;
  if (!/business days/i.test(body)) {
    body = `${body.replace(/\s+$/, "")} ${sla}`;
  }

  return { title, body, label };
}
