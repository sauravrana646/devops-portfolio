export type EngagementType = "advisory" | "hands-on" | "rescue" | "build" | "employment";
export type Confidentiality = "anonymized" | "public-reference" | "synthetic";
export type OutcomeConfidence = "Verified" | "Approximate" | "Client-reported";

export type ProjectOutcome = {
  label: string;
  confidence: OutcomeConfidence;
};

export type Project = {
  slug: string;
  title: string;
  clientAlias: string;
  role: string;
  engagementType: EngagementType;
  status: "published";
  featured: boolean;
  dateStart: string;
  dateEnd: string;
  summary: string;
  subtitle: string;
  metric: string;
  problem: string;
  constraints: string;
  architecture: string;
  implementation: string;
  outcomesNarrative: string;
  lessons: string;
  outcomes: ProjectOutcome[];
  tags: string[];
  stack: string[];
  confidentiality: Confidentiality;
  timeline: string;
  heroDiagramId?: string;
  relatedArchitectureIds: string[];
  relatedSlugs: string[];
  /** Public demo repo when this case study is backed by portfolio code */
  repoUrl?: string;
};

export const projectTags = [
  "kubernetes",
  "security",
  "cloud",
  "cicd",
  "observability",
  "aws",
] as const;

/**
 * v1.0 case studies: employment-grounded work + public demo repos only.
 * Removed synthetic “principal platform” stories that overstated experience.
 */
export const projects: Project[] = [
  {
    slug: "supply-chain-cicd-hardening",
    title: "Secure CI/CD & Container Hardening",
    clientAlias: "Public demo · pattern from production hardening",
    role: "DevOps and Cloud Engineer · public demo",
    engagementType: "hands-on",
    status: "published",
    featured: true,
    dateStart: "2024-09",
    dateEnd: "2024-11",
    summary:
      "Fail-on-CRITICAL Trivy gates, SBOM artifacts, and a multi-stage non-root image—so PRs cannot merge past known critical container risk.",
    subtitle: "Public demo · Security Hardening sprint",
    metric: "CRITICAL gates on PR",
    problem:
      "Optional scanners that nobody fails the build on. Images reach staging with outdated bases and root runtimes. Leadership wants shipping speed without ignoring CRITICAL findings.",
    constraints:
      "GitHub-hosted runners; no paid SaaS beyond free tiers; must keep a hotfix path; demo must run locally without cloud spend.",
    architecture:
      "PR → unit tests → Docker build → Trivy filesystem + image (fail CRITICAL) → Syft SBOM → SARIF to GitHub Security. Hardened Dockerfile is multi-stage and non-root; a vulnerable Dockerfile exists only for local before/after demos.",
    implementation:
      "Ship the public demo repo, document ignore policy, add OIDC deploy stub (disabled until AWS role exists), and map the pattern to a 1–2 week Security Hardening sprint.",
    outcomesNarrative:
      "In production hardening work I cut container findings from 150+ toward under 30 by fixing bases and privileges. This repo proves the gate itself: CRITICAL fails the PR; SBOM is a required artifact.",
    lessons:
      "Gates beat dashboards nobody opens. Document .trivyignore with owners or ignores become debt. Never store long-lived cloud keys when OIDC is available.",
    outcomes: [
      { label: "PR fails on CRITICAL Trivy findings", confidence: "Verified" },
      { label: "SBOM artifact on every CI image build", confidence: "Verified" },
      { label: "150+ → <30 findings in production hardening work", confidence: "Approximate" },
    ],
    tags: ["cicd", "security"],
    stack: ["GitHub Actions", "Trivy", "Syft", "Docker", "Python"],
    confidentiality: "public-reference",
    timeline: "1–2 weeks (sprint-shaped)",
    heroDiagramId: "signed-supply-chain",
    relatedArchitectureIds: ["signed-supply-chain"],
    relatedSlugs: ["container-hardening-compliance", "finops-k8s-rightsizing"],
    repoUrl: "https://github.com/sauravrana646/portfolio-secure-cicd",
  },
  {
    slug: "platform-golden-paths",
    title: "Local-First Cloud Deploy Path",
    clientAlias: "Public demo · Kubernetes / cloud path",
    role: "DevOps and Cloud Engineer · public demo",
    engagementType: "build",
    status: "published",
    featured: true,
    dateStart: "2023-09",
    dateEnd: "2023-12",
    summary:
      "A paved path from Compose + Helm/kind to optional ECS—so teams can demo a real deploy path without burning an EKS budget on day one.",
    subtitle: "Public demo · K8s / cloud deploy pack",
    metric: "15-minute local demo",
    problem:
      "Ad-hoc deploys, no standard Helm chart, monitoring bolted on late, and cloud-cost fear blocking Kubernetes experiments.",
    constraints:
      "Prefer local demos; Terraform apply only with sandbox approval; EKS off by default; cheap ECS path optional.",
    architecture:
      "Docker Compose runs API, worker, Redis, Prometheus, and Grafana. Helm chart targets kind/k3d; optional Argo CD Application. Terraform deploy_target switches local | ecs | eks (eks placeholder only).",
    implementation:
      "Public portfolio-cloud-platform repo: healthz/work API, worker, CI (tests, Trivy, helm lint, terraform validate), and write-up for a 2–4 week deploy pack.",
    outcomesNarrative:
      "Teams can demo locally in about 15 minutes. Related CI/CD optimization work cut deploy lead time ~40%. Observability baseline is included in the Compose stack.",
    lessons:
      "Local-first beats slideware. Keep EKS optional until budget and ops maturity exist. Rollback and teardown must be first-class docs.",
    outcomes: [
      { label: "Compose stack with /healthz ready locally", confidence: "Verified" },
      { label: "Helm lint + terraform validate in CI", confidence: "Verified" },
      { label: "~40% faster deploys in related CI/CD work", confidence: "Approximate" },
    ],
    tags: ["kubernetes", "cloud", "observability"],
    stack: ["Docker Compose", "Helm", "Terraform", "Prometheus", "Grafana", "GitHub Actions"],
    confidentiality: "public-reference",
    timeline: "2–4 weeks",
    heroDiagramId: "idp-golden-paths",
    relatedArchitectureIds: ["idp-golden-paths", "gitops-hub-spoke"],
    relatedSlugs: ["supply-chain-cicd-hardening", "iac-cicd-acceleration"],
    repoUrl: "https://github.com/sauravrana646/portfolio-cloud-platform",
  },
  {
    slug: "finops-k8s-rightsizing",
    title: "AWS Cost Audit & Quick Wins",
    clientAlias: "Public demo · FinOps pattern",
    role: "DevOps and Cloud Engineer · public demo",
    engagementType: "advisory",
    status: "published",
    featured: true,
    dateStart: "2023-05",
    dateEnd: "2023-07",
    summary:
      "Read-only waste findings (EBS, snapshots, idle-ish instances, tags) plus budget/scheduler Terraform skeletons—dry-run first, apply only with approval.",
    subtitle: "Public demo · AWS Cost Audit sprint",
    metric: "dry-run cost report",
    problem:
      "Unattached volumes, old snapshots, always-on non-prod capacity, and missing cost-allocation tags. Finance cannot explain month-over-month growth.",
    constraints:
      "CLI must be read-only; Terraform enable_resources=false by default; never apply to production without change control.",
    architecture:
      "Python boto3 cost_report.py → Markdown/CSV. Weekly GitHub Action sample dry-run. Terraform modules for instance-scheduler IAM and Budgets/SNS behind a feature flag.",
    implementation:
      "Ship portfolio-cloud-cost-optimizer with sample report, Makefile targets, sandbox warnings, and a 1–2 week Cost Audit sprint offer.",
    outcomesNarrative:
      "In production I reduced infra cost ~20% via right-sizing and dynamically spawning capacity for end-of-day workloads. This repo proves the audit workflow without mutating accounts by default.",
    lessons:
      "FinOps without guardrails is just cutting. Tagging first makes Cost Explorer trustworthy. Dry-run reports beat surprise deletes.",
    outcomes: [
      { label: "Sample + live dry-run CLI (--sample / AWS)", confidence: "Verified" },
      { label: "Terraform validate with resources off by default", confidence: "Verified" },
      { label: "~20% cost reduction in production cloud ops", confidence: "Approximate" },
    ],
    tags: ["aws", "cloud"],
    stack: ["Python", "boto3", "Terraform", "AWS Budgets", "GitHub Actions"],
    confidentiality: "public-reference",
    timeline: "1–2 weeks",
    relatedArchitectureIds: [],
    relatedSlugs: ["platform-golden-paths", "container-hardening-compliance"],
    repoUrl: "https://github.com/sauravrana646/portfolio-cloud-cost-optimizer",
  },
  {
    slug: "container-hardening-compliance",
    title: "Container Hardening & Compliance Readiness",
    clientAlias: "Dronapay · production employment",
    role: "DevOps and Applications Engineer",
    engagementType: "employment",
    status: "published",
    featured: false,
    dateStart: "2023-05",
    dateEnd: "2025-12",
    summary:
      "Cut container image vulnerabilities from 150+ to under 30 while driving CIS hardening, secure AMIs, and compliance evidence for SOC 2 / ISO / VAPT-style reviews.",
    subtitle: "Dronapay · employment outcomes",
    metric: "150+ → <30 image findings",
    problem:
      "Container estates and VM images accumulated findings faster than teams remediating them. Audits needed evidence; engineering needed a path that still shipped.",
    constraints:
      "Realtime decisioning / analytics workloads; bank-aligned secure configuration expectations; no freeze that blocked business SLAs.",
    architecture:
      "Hardened image pipeline + CIS baselines for VMs/Kubernetes; secure AMI provisioning; gap analysis and remediation tracking for SOC 2, VAPT, ISO 27001, and data-localization controls.",
    implementation:
      "Partnered with architects on environment design against SLAs; reduced image CVEs; provisioned hardened AMIs; produced audit reports and drove remediation; kept Helm/K8s upgrades routine.",
    outcomesNarrative:
      "Image findings 150+ → <30. Infra cost ~−20% via rightsizing and dynamic EOD capacity. Application path load-tested toward ~3,000 TPS. Compliance readiness improved with documented evidence packs.",
    lessons:
      "Security work sticks when it ships with the pipeline. Cost and compliance land better when tied to the same operational cadence as deploys.",
    outcomes: [
      { label: "Container findings 150+ → <30", confidence: "Approximate" },
      { label: "~20% infrastructure cost reduction", confidence: "Approximate" },
      { label: "~3,000 TPS throughput after load testing", confidence: "Approximate" },
    ],
    tags: ["security", "kubernetes", "aws"],
    stack: ["Kubernetes", "Helm", "AWS", "CIS benchmarks", "Docker"],
    confidentiality: "anonymized",
    timeline: "Ongoing employment outcomes (selected)",
    heroDiagramId: "signed-supply-chain",
    relatedArchitectureIds: ["signed-supply-chain"],
    relatedSlugs: ["supply-chain-cicd-hardening", "finops-k8s-rightsizing"],
  },
  {
    slug: "iac-cicd-acceleration",
    title: "IaC & CI/CD Acceleration",
    clientAlias: "Unthinkable Solutions · production employment",
    role: "Junior Associate IT — DevOps",
    engagementType: "employment",
    status: "published",
    featured: false,
    dateStart: "2022-06",
    dateEnd: "2024-03",
    summary:
      "Terraform IaC and Jenkins CI/CD that cut manual provisioning effort ~70% and deployment time ~40%, with Prometheus/Grafana for faster incident response.",
    subtitle: "Unthinkable Solutions · employment outcomes",
    metric: "deploy time ~−40%",
    problem:
      "Manual environment changes and slow pipelines made releases infrequent and error-prone. Monitoring was thin when something broke.",
    constraints:
      "Existing Kubernetes + Helm workloads; need consistency across environments without a full platform rewrite.",
    architecture:
      "Terraform for environment consistency; Jenkins pipelines for build/deploy frequency; Prometheus + Grafana for visibility; Helm for workload delivery on Kubernetes.",
    implementation:
      "Owned cluster/workload ops with Helm; delivered Terraform modules; stood up monitoring; redesigned CI/CD for multiple deploys per day.",
    outcomesNarrative:
      "Manual provisioning effort and errors down ~70%. Deployment time down ~40% with higher deploy frequency. Faster incident response from a usable monitoring baseline.",
    lessons:
      "IaC pays off when every environment shares the same modules. Pipelines only help if failure is visible—monitoring is part of delivery.",
    outcomes: [
      { label: "~70% less manual provisioning effort / errors", confidence: "Approximate" },
      { label: "~40% reduction in deployment time", confidence: "Approximate" },
      { label: "Prometheus + Grafana monitoring baseline", confidence: "Approximate" },
    ],
    tags: ["cicd", "kubernetes", "cloud"],
    stack: ["Terraform", "Jenkins", "Kubernetes", "Helm", "Prometheus", "Grafana"],
    confidentiality: "anonymized",
    timeline: "Selected outcomes from 06/2022 — 03/2024",
    heroDiagramId: "gitops-hub-spoke",
    relatedArchitectureIds: ["gitops-hub-spoke", "idp-golden-paths"],
    relatedSlugs: ["platform-golden-paths", "supply-chain-cicd-hardening"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function filterProjectsByTags(tagList: string[]) {
  if (tagList.length === 0) return projects;
  return projects.filter((project) => tagList.every((tag) => project.tags.includes(tag)));
}
