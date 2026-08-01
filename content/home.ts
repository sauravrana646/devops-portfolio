import { featuredCerts } from "@/content/certifications";
import { openSourceRepos } from "@/content/open-source";
import { getFeaturedProjects } from "@/content/projects";
import { getAllPosts } from "@/lib/blog";

const featured = getFeaturedProjects().slice(0, 3);
const latestPosts = getAllPosts().slice(0, 3);

export const homeContent = {
  hero: {
    title: "How would you like your platform to feel?",
    support:
      "Calm, clear DevOps & reliability consulting—Kubernetes, delivery, and security without the noise.",
    primaryCta: { href: "/contact/", label: "Book a discovery call" },
    secondaryCta: { href: "/projects/", label: "Browse cases" },
    meta: "open to advisory & hands-on engagements · remote",
    aside: "I design paved roads your team can actually run—soft on the eyes, sharp on the outcomes.",
    cards: [
      { title: "Golden path", body: "PR → GitOps → prod" },
      { title: "Quiet ops", body: "SLOs, not pager theater" },
    ],
  },
  logos: ["Northwind Cloud", "Harbor Pay", "Lattice Health", "Orbit Logistics"],
  positioning: {
    eyebrow: "Positioning",
    title: "Senior ownership without a full-time hire.",
    support: "Platform · Kubernetes · SRE · DevSecOps — scoped engagements, clear boundaries.",
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
    eyebrow: "How I engage",
    title: "Clear modes. Soft edges.",
    modes: [
      {
        title: "Audit",
        body: "Assess maturity and risk—then leave a prioritized plan your team can run.",
      },
      {
        title: "Build",
        body: "Hands-on paved roads: GitOps, golden paths, security gates, observability.",
      },
      {
        title: "Advise",
        body: "Fractional Staff+ judgment for architecture, incidents, and hiring loops.",
      },
    ],
  },
  architecture: {
    eyebrow: "Systems lens",
    title: "Architecture you can breathe with.",
    support: "Diagrams as proof—clear, not chaotic.",
    diagramId: "gitops-hub-spoke",
  },
  quote: {
    text: "Cut deploy lead time without turning the platform team into a ticket queue.",
    attribution: "Head of Platform · Series-B fintech · anonymized",
  },
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
