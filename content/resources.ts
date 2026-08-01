export const resourceGroups = [
  {
    title: "Platform & delivery",
    items: [
      { title: "GitOps readiness checklist", kind: "checklist", meta: "PDF · 4 pages", href: "/contact/" },
      { title: "Golden path RFC template", kind: "template", meta: "Markdown", href: "/contact/" },
      { title: "CI policy gate sketch", kind: "example", meta: "YAML", href: "/contact/" },
    ],
  },
  {
    title: "Reliability & SRE",
    items: [
      { title: "Error budget working agreement", kind: "template", meta: "Doc · 2 pages", href: "/contact/" },
      { title: "Incident review one-pager", kind: "template", meta: "Markdown", href: "/contact/" },
      { title: "SLO burn-alert starter pack", kind: "tooling", meta: "Prometheus", href: "/contact/" },
    ],
  },
  {
    title: "Security & compliance",
    items: [
      { title: "Supply-chain baseline (SLSA-minded)", kind: "checklist", meta: "PDF", href: "/contact/" },
      { title: "Admission policy review worksheet", kind: "worksheet", meta: "Spreadsheet", href: "/contact/" },
    ],
  },
] as const;
