import type { MetadataRoute } from "next";
import { getAllArchitectureIds } from "@/content/architecture";
import { getAllProjectSlugs } from "@/content/projects";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site-url";

const staticRoutes = [
  "/",
  "/about/",
  "/projects/",
  "/architecture/",
  "/services/",
  "/blog/",
  "/resume/",
  "/contact/",
  "/certifications/",
  "/testimonials/",
  "/open-source/",
  "/resources/",
  "/privacy/",
  "/terms/",
  "/search/",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  for (const slug of getAllProjectSlugs()) {
    entries.push({
      url: absoluteUrl(`/projects/${slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const id of getAllArchitectureIds()) {
    entries.push({
      url: absoluteUrl(`/architecture/${id}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of getAllPosts()) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}
