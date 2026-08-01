export const site = {
  brand: "[Brand]",
  consultantName: "[Consultant Name]",
  tagline:
    "Senior platform, reliability, and DevSecOps consulting—scoped like a product.",
  description:
    "Senior DevOps, platform, and reliability consulting—scoped like a product, delivered like an owner.",
  email: "[Email]",
  timezone: "[Timezone]",
  responseDays: "[N]",
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
    { href: "/certifications/", label: "Certifications" },
    { href: "/testimonials/", label: "Testimonials" },
    { href: "/resume/", label: "Resume" },
  ],
  company: [
    { href: "/contact/", label: "Contact" },
    { href: "/privacy/", label: "Privacy" },
    { href: "/terms/", label: "Terms" },
  ],
} as const;
