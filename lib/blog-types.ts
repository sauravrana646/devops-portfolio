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
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  readingTimeMinutes: number;
  wordCount: number;
};
