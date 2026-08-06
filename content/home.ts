import { featuredCerts } from "@/content/certifications";
import { openSourceRepos } from "@/content/open-source";
import { getFeaturedProjects } from "@/content/projects";
import { testimonials } from "@/content/testimonials";
import { getAllPosts } from "@/lib/blog";

const featured = getFeaturedProjects().slice(0, 3);
const latestPosts = getAllPosts().slice(0, 3);

export const homeContent = {
  hero: {
    title: "How would you like production to feel?",
    support:
      "Calm, clear DevOps and cloud engineering—Kubernetes, delivery, and security without the noise.",
    primaryCta: { href: "/contact/", label: "Get in touch" },
    secondaryCta: { href: "/projects/", label: "Browse work" },
    meta: "DevOps & Cloud · India · open to opportunities",
    aside: "I design paved roads your team can actually run—soft on the eyes, sharp on the outcomes.",
    cards: [
      { title: "Golden path", body: "PR → GitOps → prod" },
      { title: "Quiet ops", body: "SLOs, not pager theater" },
    ],
  },
  /** No fake client logos until real references exist. */
  logos: [] as string[],
  positioning: {
    eyebrow: "Positioning",
    title: "Cloud & DevOps ownership with clear outcomes.",
    support: "Kubernetes · CI/CD · cloud automation · security hardening — proof through delivery metrics.",
  },
  work: {
    eyebrow: "Selected work",
    title: "Proof through constraints and calm outcomes.",
    items: featured.map((project) => ({
      href: `/projects/${project.slug}/`,
      title: project.title,
      subtitle: project.subtitle,
      tags: project.tags,
      metric: project.metric,
    })),
  },
  engage: {
    eyebrow: "How I work",
    title: "Clear modes. Soft edges.",
    modes: [
      {
        title: "Full-time",
        body: "DevOps and Cloud Engineer roles—pipelines, Kubernetes, cloud infra, and secure delivery.",
      },
      {
        title: "Build",
        body: "Hands-on sprints: CI/CD gates, cost audits, local-first deploy paths, observability baselines.",
      },
      {
        title: "Review",
        body: "Short architecture or hardening reviews with a prioritized backlog you can run.",
      },
    ],
  },
  architecture: {
    eyebrow: "Systems lens",
    title: "Architecture you can breathe with.",
    support: "Diagrams as proof—clear, not chaotic.",
    diagramId: "gitops-hub-spoke",
  },
  quote: testimonials[0]
    ? { text: testimonials[0].quote, attribution: testimonials[0].attribution }
    : null,
  signals: {
    eyebrow: "Signals",
    title: "Proof beyond the case study.",
    certs: featuredCerts.slice(0, 3).map((cert) => ({
      title: cert.title,
      href: "/certifications/",
      tag: cert.tag,
    })),
    repos: openSourceRepos.slice(0, 3).map((repo) => ({
      title: repo.title,
      href: "/open-source/",
      meta: repo.meta,
    })),
  },
  insights: {
    eyebrow: "Insights",
    title: "Writing that starts with constraints.",
    posts: latestPosts.map((post) => ({
      href: `/blog/${post.slug}/`,
      meta: `${post.date} · ${post.readingTimeMinutes} min`,
      title: post.title,
    })),
  },
  finalCta: {
    title: "Ready when you are.",
    body: "Tell me the constraint that hurts most—reliability, delivery, security, or cost. I’ll reply within [N] business days.",
    primaryCta: { href: "/contact/", label: "Reach out" },
    secondaryCta: { href: "/services/", label: "See services" },
  },
};
