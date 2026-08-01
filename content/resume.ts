export const resumeContent = {
  lede: "Independent platform, SRE, and DevSecOps consultant. Fractional Staff+/Principal outcomes for Kubernetes, CI/CD, reliability, and security.",
  experience: [
    {
      period: "2023 — Present",
      title: "Independent Consultant — Platform / SRE / DevSecOps",
      org: "[Brand] · Remote",
      bullets: [
        "Led multi-cluster GitOps rescues and IDP golden-path builds for Series A–D teams",
        "Delivered observability and error-budget programs with measurable burn-rate alerting",
        "Hardened CI/CD and ingress paths without sacrificing deploy velocity",
      ],
    },
    {
      period: "2019 — 2023",
      title: "Staff Platform Engineer / SRE",
      org: "[Company] · [Location]",
      bullets: [
        "Owned Kubernetes platform maturity across production clusters",
        "Reduced deploy lead time and toil via paved roads and policy-as-code",
        "Partnered with product orgs on SLOs and incident learning loops",
      ],
    },
    {
      period: "2015 — 2019",
      title: "DevOps / Cloud Engineer",
      org: "[Company] · [Location]",
      bullets: [
        "Built CI/CD and cloud foundations for regulated and high-growth workloads",
        "Introduced infrastructure-as-code and production hardening baselines",
        "Supported on-call and reliability improvements across critical services",
      ],
    },
  ],
  skills: [
    {
      title: "Platform",
      body: "Kubernetes · GitOps (Argo CD / Flux) · Terraform · Internal developer platforms · Progressive delivery",
    },
    {
      title: "Reliability",
      body: "SLI/SLO · Incident management · Observability (metrics / logs / traces) · Capacity planning",
    },
    {
      title: "Security",
      body: "DevSecOps gates · Policy-as-code · Supply chain · IAM · Zero-trust ingress reviews",
    },
    {
      title: "Cloud",
      body: "AWS · GCP · Azure · Networking · Cost / reliability tradeoffs",
    },
  ],
} as const;
