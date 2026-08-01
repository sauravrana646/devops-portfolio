export const aboutContent = {
  hero: {
    eyebrow: "About",
    title: "Operator-minded. Product-tasteful. Honest about tradeoffs.",
    lede: "I’m [Consultant Name]—an independent platform, SRE, and DevSecOps partner for teams that need senior ownership without a full-time principal hire.",
  },
  narrative: [
    "I work where delivery, reliability, and security meet production reality: Kubernetes platforms, CI/CD that teams actually trust, observability baselines, and DevSecOps gates that don’t become theater.",
    "My engagements are scoped like a product—clear outcomes, explicit boundaries, and written recommendations when “what not to build” is the highest-leverage advice.",
    "Before consulting, I led platform and reliability work across scale-up and enterprise environments. I still prefer diagrams, metrics, and incident patterns over slide decks.",
  ],
  meta: [
    { label: "Focus", value: "Platform · SRE · DevSecOps" },
    { label: "Engagement", value: "4–16 week outcomes · remote" },
    { label: "Timezone", value: "[Timezone]" },
    { label: "Availability", value: "Open to advisory & hands-on" },
  ],
  principles: [
    {
      title: "Constraints before tooling",
      body: "Start from risk, latency, and ownership—not the latest platform fashion. The right boring path usually wins.",
    },
    {
      title: "Owned outcomes",
      body: "I don’t leave a pile of tickets. Engagements end with runnable paths, measured deltas, and a clear operating model.",
    },
    {
      title: "Honest recommendations",
      body: "Including “don’t build that yet.” Senior judgment means saying no with a rationale your leadership can defend.",
    },
    {
      title: "Proof over persona",
      body: "Case studies, architecture writeups, and incident patterns—not tool-logo bingo or résumé theater.",
    },
  ],
  timeline: [
    {
      period: "2023 — Present",
      title: "Independent consulting",
      body: "Fractional Staff+/Principal platform, SRE, and DevSecOps engagements for Series A–D and enterprise teams.",
    },
    {
      period: "2019 — 2023",
      title: "Staff Platform / SRE",
      body: "Multi-cluster Kubernetes, GitOps, and reliability programs at [Company]—paved roads and error-budget culture.",
    },
    {
      period: "2015 — 2019",
      title: "DevOps / Cloud engineering",
      body: "CI/CD, cloud foundations, and production hardening across regulated and high-growth environments.",
    },
  ],
  finalCta: {
    title: "Let’s scope the constraint that hurts most.",
    body: "Tell me about reliability, delivery, security, or cost—and I’ll reply within [N] business days.",
    primaryCta: { href: "/contact/", label: "Book a discovery call" },
    secondaryCta: { href: "/services/", label: "See services" },
  },
} as const;
