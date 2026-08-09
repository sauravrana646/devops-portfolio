export const servicesContent = {
  hero: {
    eyebrow: "How I work",
    title: "DevOps and cloud outcomes, scoped clearly.",
    lede: "Hands-on DevOps and Cloud Engineering—Kubernetes, CI/CD, AWS/GCP automation, and security hardening. Open to full-time roles and focused project work.",
  },
  models: {
    eyebrow: "Ways to engage",
    title: "Hiring or a focused build—both welcome.",
    items: [
      {
        title: "Full-time",
        body: "DevOps / Cloud Engineer roles where I own pipelines, Kubernetes, cloud infrastructure, and secure delivery day to day.",
      },
      {
        title: "Project sprint",
        body: "Time-boxed delivery: secure CI/CD, cost audit, or a Kubernetes golden path—with clear exit criteria.",
      },
      {
        title: "Advisory review",
        body: "Short reviews of cloud architecture, CI/CD, or hardening posture—written findings and a prioritized backlog.",
      },
    ],
  },
  catalog: {
    eyebrow: "What I deliver",
    title: "Skills I use in production.",
    items: [
      {
        title: "Secure CI/CD",
        summary:
          "Pipelines that block real risk before merge, harden containers, and ship signed releases—without slowing weekly delivery.",
        bullets: [
          "Automated tests and security checks that fail closed",
          "Hardened container images as the default",
          "Signed, traceable releases",
          "Security Hardening sprint (1–2 weeks)",
        ],
      },
      {
        title: "AWS cost audit",
        summary:
          "Read-only waste findings and cheap controls so finance sees where spend goes before anyone deletes anything.",
        bullets: [
          "Unattached EBS, old snapshots, idle-ish heuristics, tagging gaps",
          "Budget + SNS alert skeletons",
          "Instance scheduler IAM / tagging contract",
          "1–2 week Cost Audit sprint",
        ],
      },
      {
        title: "Kubernetes golden path",
        summary:
          "One paved path from signed release to running workloads—safer defaults, less snowflake delivery.",
        bullets: [
          "Standard path from signed release to running service",
          "Policy that rejects unsafe or unsigned images",
          "Monitoring and controlled access on the path",
          "2–4 week golden path engagement",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "From constraint to clear next step.",
    steps: [
      {
        num: "01",
        title: "Discovery",
        body: "30–45 min to map the constraint, stack, and what “done” looks like.",
      },
      {
        num: "02",
        title: "Written plan",
        body: "Scope, out-of-scope, timeline, and access needed—SOW for projects, or role fit notes for hiring.",
      },
      {
        num: "03",
        title: "Delivery",
        body: "Hands-on implementation with demos, metrics, and early risk callouts.",
      },
      {
        num: "04",
        title: "Handoff",
        body: "Docs, runbooks, and a clear next-horizon backlog your team can run.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Straight answers before you reach out.",
    items: [
      {
        q: "Are you open to full-time roles?",
        a: "Yes. I’m actively open to DevOps and Cloud Engineer roles—especially Kubernetes, CI/CD, AWS/GCP, and security-minded delivery.",
      },
      {
        q: "Do you also take project work?",
        a: "Yes—short, scoped sprints (secure CI/CD, cost audit, deploy path) when the outcome is clear.",
      },
      {
        q: "Remote only?",
        a: "Default is remote across [Timezone] ± a few hours. On-site is possible when the role or kickoff justifies travel.",
      },
      {
        q: "What do you need on day one?",
        a: "For projects: a named sponsor, access to the systems in scope, and the metric you want moved. For hiring: role context and stack details.",
      },
    ],
  },
  finalCta: {
    title: "Let’s talk.",
    body: "Share the role, stack, or constraint—I’ll reply within [N] business days.",
    primaryCta: { href: "/contact/", label: "Get in touch" },
    secondaryCta: { href: "/projects/", label: "See selected work" },
  },
} as const;
