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
 * v1 case studies: three public demo repos only (honest, cloneable proof).
 */
export const projects: Project[] = [
  {
    slug: "supply-chain-cicd-hardening",
    title: "Secure CI/CD & Container Hardening",
    clientAlias: "Pattern from production hardening",
    role: "DevOps and Cloud Engineer",
    engagementType: "hands-on",
    status: "published",
    featured: true,
    dateStart: "2024-09",
    dateEnd: "2024-11",
    summary:
      "CI/CD that blocks real risk before release—hardened containers and signed artifacts teams can trust downstream.",
    subtitle: "Security Hardening · CI/CD",
    metric: "Trusted releases",
    problem:
      "Scanners that only warn, unsigned software in the registry, and shortcuts around review. Leadership wants weekly shipping without guessing what shipped—or whether it was safe.",
    constraints:
      "Keep shipping on a steady cadence. Managed CI is fine; long-lived cloud keys in pipelines are not. Signing material stays in a secrets platform, federated at release time.",
    architecture:
      "Every change is reviewed, tested, and scanned before it can move forward. Critical findings fail the build. Containers ship non-root with a slim base. Releases are signed so deploy and admission can verify origin—not assume it.",
    implementation:
      "Wire fail-closed quality gates, a controlled path into release, hardened images, and signed artifacts with a policy handoff ops and security can run. Scoped as a 1–2 week Security Hardening engagement.",
    outcomesNarrative:
      "In related hardening work, container findings dropped from 150+ toward under 30 by fixing bases and privileges. The lasting win is process: risk stops before release, and every artifact is verifiable.",
    lessons:
      "Gates beat dashboards nobody opens. Sign what you ship. Document exceptions with owners—or they become permanent debt.",
    outcomes: [
      { label: "Critical findings block the release path", confidence: "Verified" },
      { label: "Releases are signed and traceable", confidence: "Verified" },
      { label: "Hardened, non-root container images", confidence: "Verified" },
      { label: "150+ → <30 findings in related hardening work", confidence: "Approximate" },
    ],
    tags: ["cicd", "security"],
    stack: ["GitHub Actions", "Trivy", "Cosign", "Docker", "Python"],
    confidentiality: "public-reference",
    timeline: "1–2 weeks (sprint-shaped)",
    heroDiagramId: "signed-supply-chain",
    relatedArchitectureIds: ["signed-supply-chain", "idp-golden-paths"],
    relatedSlugs: ["platform-golden-paths", "finops-k8s-rightsizing"],
    repoUrl: "https://github.com/sauravrana646/portfolio-secure-cicd",
  },
  {
    slug: "platform-golden-paths",
    title: "Golden Path for Trusted Deploys",
    clientAlias: "Enterprise Kubernetes / platform",
    role: "DevOps and Cloud Engineer",
    engagementType: "build",
    status: "published",
    featured: true,
    dateStart: "2023-09",
    dateEnd: "2023-12",
    summary:
      "One paved path from signed release to running workloads—admission policy, GitOps delivery, and observability built in so every team ships the same safe way.",
    subtitle: "Golden path",
    metric: "One paved path",
    problem:
      "Every squad deploys differently. Unsigned or unvetted images still reach the cluster. Monitoring and access controls arrive late—after the outage.",
    constraints:
      "Consume signed releases from secure CI/CD—do not rebuild the app on the platform. Git is the change path; cluster shortcuts are exceptions with audit, not the default.",
    architecture:
      "Signed artifacts enter a single golden path: verify and admit, deploy via GitOps, then baseline monitoring and controlled access. The platform trusts what CI already signed—and refuses the rest.",
    implementation:
      "Stand up the path: workload charts, cluster policy, GitOps promotion, infrastructure as code, and runbooks your on-call can use. Scoped as a 2–4 week platform engagement.",
    outcomesNarrative:
      "Engineering gets one clear way to ship. Related delivery work cut lead time ~40%. Unsafe or unsigned images are rejected before they run in the cluster.",
    lessons:
      "Separate build-and-sign from deploy-and-verify. The easy path must also be the safe path—or teams will invent side doors.",
    outcomes: [
      { label: "Single golden path from release to running service", confidence: "Verified" },
      { label: "Policy blocks unsigned / unsafe images", confidence: "Verified" },
      { label: "GitOps deploy with baseline observability", confidence: "Verified" },
      { label: "~40% faster deploys in related delivery work", confidence: "Approximate" },
    ],
    tags: ["kubernetes", "cloud", "security"],
    stack: ["Helm", "Argo CD", "Kyverno", "Terraform", "Prometheus", "Grafana"],
    confidentiality: "public-reference",
    timeline: "2–4 weeks",
    heroDiagramId: "idp-golden-paths",
    relatedArchitectureIds: ["idp-golden-paths", "signed-supply-chain"],
    relatedSlugs: ["supply-chain-cicd-hardening", "finops-k8s-rightsizing"],
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
    relatedSlugs: ["platform-golden-paths", "supply-chain-cicd-hardening"],
    repoUrl: "https://github.com/sauravrana646/portfolio-cloud-cost-optimizer",
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
