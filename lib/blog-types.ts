export const blogCategories = [
  "Platform Engineering",
  "CI/CD",
  "Cloud",
  "Reliability",
  "Security",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  updated?: string;
  category: BlogCategory | string;
  tags?: string[];
  draft?: boolean;
  featured?: boolean;
  relatedProjectSlug?: string;
  /** End-of-note CTA — override per post for topic fit. */
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  readingTimeMinutes: number;
  wordCount: number;
};
