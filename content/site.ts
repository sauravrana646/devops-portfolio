export const site = {
  brand: "Saurav Rana",
  consultantName: "Saurav Rana",
  tagline:
    "DevOps and Cloud Engineer—Kubernetes, CI/CD, cloud automation, and security that ships.",
  description:
    "DevOps and Cloud Engineer (Kubernetes, CI/CD, AWS/GCP, infrastructure automation, security hardening) — portfolio of outcomes, systems, and writing.",
  email: "sauravrana646@gmail.com",
  timezone: "IST (UTC+5:30)",
  responseDays: "2",
  githubUrl: "https://github.com/sauravrana646",
} as const;

export type NavItem = {
  href: string;
  label: string;
  cta?: boolean;
};

/** Primary header navigation (CTA separate). */
export const primaryNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "Why me" },
  { href: "/projects/", label: "Cases" },
  { href: "/architecture/", label: "Systems" },
  { href: "/services/", label: "Approach" },
  { href: "/blog/", label: "Notes" },
  { href: "/resume/", label: "Resume" },
] as const;

export const ctaNav: NavItem = {
  href: "/contact/",
  label: "Reach out",
  cta: true,
};

export const footerNav = {
  work: [
    { href: "/projects/", label: "Projects" },
    { href: "/architecture/", label: "Architecture" },
    { href: "/services/", label: "Services" },
    { href: "/open-source/", label: "Open Source" },
  ],
  insights: [
    { href: "/blog/", label: "Blog" },
    { href: "/resources/", label: "Resources" },
  ],
  credibility: [
    { href: "/about/", label: "About" },
    { href: "/resume/", label: "Resume" },
  ],
  company: [
    { href: "/contact/", label: "Contact" },
    { href: "/privacy/", label: "Privacy" },
    { href: "/terms/", label: "Terms" },
  ],
} as const;
