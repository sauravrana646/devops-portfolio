export const aboutContent = {
  hero: {
    eyebrow: "About",
    title: "Operator-minded. Security-aware. Clear about tradeoffs.",
    lede: "I’m [Consultant Name]—a DevOps and Cloud Engineer with hands-on ownership of Kubernetes, CI/CD, cloud infrastructure, and compliance-minded hardening.",
  },
  narrative: [
    "I work where delivery, reliability, and security meet production reality: containers, pipelines teams can trust, observability baselines, and controls that survive audits—not just demos.",
    "Across Dronapay and Unthinkable I’ve owned infrastructure automation, Kubernetes operations, CI/CD, monitoring, cost optimization, and security remediation with measurable outcomes.",
    "I prefer diagrams, metrics, and runbooks over slide decks. If you’re hiring for DevOps / cloud engineering—or need a focused review—reach out and I’ll reply within a few business days.",
  ],
  meta: [
    { label: "Focus", value: "DevOps · Cloud · Kubernetes · Security" },
    { label: "Experience", value: "~3 years · cloud & DevOps" },
    { label: "Timezone", value: "[Timezone]" },
    { label: "Based in", value: "India · remote-friendly" },
  ],
  principles: [
    {
      title: "Constraints before tooling",
      body: "Start from risk, latency, and ownership—not the latest fashion. The right boring path usually wins.",
    },
    {
      title: "Owned outcomes",
      body: "I care about runnable paths and measured deltas—fewer vulns, faster deploys, lower cost—not a pile of unfinished tickets.",
    },
    {
      title: "Security that ships",
      body: "Hardening, CIS baselines, and compliance evidence should unblock delivery, not become theater.",
    },
    {
      title: "Proof over persona",
      body: "Case studies, architecture writeups, and operational metrics—not tool-logo bingo.",
    },
  ],
  timeline: [
    {
      period: "05/2023 — Present",
      title: "DevOps and Applications Engineer · Dronapay",
      body: "Realtime decisioning / analytics — Kubernetes, hardened AMIs, compliance (SOC 2 / ISO / VAPT), cost and performance work (~3k TPS, ~20% infra savings, image vulns 150+ → <30).",
    },
    {
      period: "06/2022 — 03/2024",
      title: "Junior Associate IT — DevOps · Unthinkable Solutions",
      body: "Kubernetes + Helm ops, Terraform IaC (~70% less manual effort), Prometheus/Grafana, Jenkins CI/CD (~40% faster deploys).",
    },
    {
      period: "08/2018 — 07/2022",
      title: "B.Tech Information Technology",
      body: "Himachal Pradesh University — foundation in systems and software before specializing in cloud and DevOps.",
    },
  ],
  finalCta: {
    title: "Let’s talk about the constraint that hurts most.",
    body: "Hiring, cloud/DevOps work, or a scoped review—I’ll reply within [N] business days.",
    primaryCta: { href: "/contact/", label: "Reach out" },
    secondaryCta: { href: "/resume/", label: "View resume" },
  },
} as const;
