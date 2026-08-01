export const servicesContent = {
  hero: {
    eyebrow: "Services",
    title: "Scoped engagements. Explicit boundaries.",
    lede: "Productized consulting for platform, reliability, and DevSecOps outcomes—4–16 weeks, remote, with written SOW paths.",
  },
  models: {
    eyebrow: "Engagement models",
    title: "Clear modes. No vague retainers without outcomes.",
    items: [
      {
        title: "Project",
        body: "Fixed-scope delivery: GitOps rescue, IDP golden paths, observability baseline, or security gate hardening—with measurable exit criteria.",
      },
      {
        title: "Retainer",
        body: "Fractional Staff+ capacity for ongoing platform ownership, incident pattern work, and architecture reviews across a quarter.",
      },
      {
        title: "Advisory",
        body: "High-judgment sessions: design reviews, hiring loops, vendor selection, and “what not to build” recommendations.",
      },
    ],
  },
  catalog: {
    eyebrow: "Catalog",
    title: "What I own end-to-end.",
    items: [
      {
        title: "Kubernetes & platform engineering",
        summary:
          "Multi-cluster maturity, GitOps, and paved roads so product teams ship without becoming a ticket queue.",
        bullets: [
          "Cluster topology, tenancy, and upgrade strategy",
          "Argo CD / Flux hub-and-spoke or app-of-apps patterns",
          "Internal developer platform golden paths",
          "Environment promotion and progressive delivery readiness",
        ],
      },
      {
        title: "SRE & reliability",
        summary: "Error budgets, observability baselines, and incident learning that leadership can act on.",
        bullets: [
          "SLI/SLO design and burn-rate alerting",
          "On-call and incident process hardening",
          "Metrics, logs, traces—signal over noise",
          "Capacity and cost/reliability tradeoff reviews",
        ],
      },
      {
        title: "DevSecOps & cloud operations",
        summary:
          "Security gates and cloud foundations that fit delivery velocity—not a parallel compliance theater.",
        bullets: [
          "CI/CD supply-chain and policy-as-code gates",
          "Zero-trust ingress / mesh hardening reviews",
          "IAM, secrets, and least-privilege remediations",
          "Runbooks and operational ownership maps",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "From constraint to scoped outcome.",
    steps: [
      {
        num: "01",
        title: "Discovery",
        body: "30–45 min to map the constraint, stakeholders, and success metrics.",
      },
      {
        num: "02",
        title: "Written scope",
        body: "SOW with outcomes, out-of-scope, timeline, and communication cadence.",
      },
      {
        num: "03",
        title: "Delivery",
        body: "Hands-on or advisory work with weekly demos and risk callouts.",
      },
      {
        num: "04",
        title: "Handoff",
        body: "Docs, runbooks, metrics deltas, and a clear next-horizon plan.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Straight answers before you book.",
    items: [
      {
        q: "Do you take full-time roles?",
        a: "No. I take scoped consulting and fractional engagements. For hiring, I can advise on role design and interview loops.",
      },
      {
        q: "How fast can we start?",
        a: "Typically within 1–3 weeks after SOW signature, depending on current capacity and access readiness.",
      },
      {
        q: "Remote only?",
        a: "Default is remote across [Timezone] ± a few hours. On-site kickoffs are possible when the outcome justifies travel.",
      },
      {
        q: "What do you need on day one?",
        a: "A named sponsor, access to the systems in scope, and the constraint you want measured by the end of the engagement.",
      },
    ],
  },
  finalCta: {
    title: "Discuss an engagement.",
    body: "Share the constraint, preferred model, and timeline—I’ll reply with fit and next steps within [N] business days.",
    primaryCta: { href: "/contact/", label: "Book a discovery call" },
    secondaryCta: { href: "/projects/", label: "See selected work" },
  },
} as const;
