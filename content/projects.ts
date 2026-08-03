export type EngagementType = "advisory" | "hands-on" | "rescue" | "build";
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
  "platform",
  "cicd",
  "sre",
  "observability",
  "networking",
] as const;

export const projects: Project[] = [
  {
    slug: "supply-chain-cicd-hardening",
    title: "Secure CI/CD & Container Hardening",
    clientAlias: "Series-A SaaS (anonymized pattern)",
    role: "DevSecOps (hands-on) · public demo",
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
      "Analogous engagements cut container findings from 150+ toward under 30 by fixing bases and privileges. This repo proves the gate itself: CRITICAL fails the PR; SBOM is a required artifact.",
    lessons:
      "Gates beat dashboards nobody opens. Document .trivyignore with owners or ignores become debt. Never store long-lived cloud keys when OIDC is available.",
    outcomes: [
      { label: "PR fails on CRITICAL Trivy findings", confidence: "Verified" },
      { label: "SBOM artifact on every CI image build", confidence: "Verified" },
      { label: "150+ → <30 findings in analogous hardening work", confidence: "Approximate" },
    ],
    tags: ["cicd", "security"],
    stack: ["GitHub Actions", "Trivy", "Syft", "Docker", "Python"],
    confidentiality: "public-reference",
    timeline: "1–2 weeks (sprint-shaped)",
    heroDiagramId: "signed-supply-chain",
    relatedArchitectureIds: ["signed-supply-chain"],
    relatedSlugs: ["platform-golden-paths", "finops-k8s-rightsizing"],
    repoUrl: "https://github.com/sauravrana646/portfolio-secure-cicd",
  },
  {
    slug: "platform-golden-paths",
    title: "Local-First Cloud Platform Path",
    clientAlias: "B2B SaaS (anonymized pattern)",
    role: "Platform eng (build) · public demo",
    engagementType: "build",
    status: "published",
    featured: true,
    dateStart: "2023-09",
    dateEnd: "2023-12",
    summary:
      "A paved path from Compose + Helm/kind to optional ECS—so startups get a real platform demo without burning an EKS budget on day one.",
    subtitle: "Public demo · K8s Deploy Pack",
    metric: "15-minute local demo",
    problem:
      "Ad-hoc deploys, no standard Helm chart, monitoring bolted on late, and cloud-cost fear blocking Kubernetes experiments.",
    constraints:
      "Prefer local demos; Terraform apply only with sandbox approval; EKS off by default; cheap ECS path optional.",
    architecture:
      "Docker Compose runs API, worker, Redis, Prometheus, and Grafana. Helm chart targets kind/k3d; optional Argo CD Application. Terraform deploy_target switches local | ecs | eks (eks placeholder only).",
    implementation:
      "Public portfolio-cloud-platform repo: healthz/work API, worker, CI (tests, Trivy, helm lint, terraform validate), and case study for a 2–4 week deploy pack.",
    outcomesNarrative:
      "Teams can demo locally in about 15 minutes. Analogous CI/CD optimization work cut deploy lead time ~40%. Observability baseline is included in the Compose stack.",
    lessons:
      "Local-first beats slideware platforms. Keep EKS optional until budget and ops maturity exist. Rollback and teardown must be first-class docs.",
    outcomes: [
      { label: "Compose stack with /healthz ready locally", confidence: "Verified" },
      { label: "Helm lint + terraform validate in CI", confidence: "Verified" },
      { label: "~40% faster deploys in analogous CI/CD work", confidence: "Approximate" },
    ],
    tags: ["platform", "kubernetes", "observability"],
    stack: ["Docker Compose", "Helm", "Terraform", "Prometheus", "Grafana", "GitHub Actions"],
    confidentiality: "public-reference",
    timeline: "2–4 weeks",
    heroDiagramId: "idp-golden-paths",
    relatedArchitectureIds: ["idp-golden-paths", "gitops-hub-spoke"],
    relatedSlugs: ["supply-chain-cicd-hardening", "finops-k8s-rightsizing"],
    repoUrl: "https://github.com/sauravrana646/portfolio-cloud-platform",
  },
  {
    slug: "finops-k8s-rightsizing",
    title: "AWS Cost Audit & Quick Wins",
    clientAlias: "Growth-stage SaaS (anonymized pattern)",
    role: "FinOps + platform advisory · public demo",
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
      "Analogous work reduced infra cost ~20% via right-sizing and scheduled workloads. This repo proves the audit workflow without mutating accounts by default.",
    lessons:
      "FinOps without guardrails is just cutting. Tagging first makes Cost Explorer trustworthy. Dry-run reports beat surprise deletes.",
    outcomes: [
      { label: "Sample + live dry-run CLI (--sample / AWS)", confidence: "Verified" },
      { label: "Terraform validate with resources off by default", confidence: "Verified" },
      { label: "~20% cost reduction in analogous engagements", confidence: "Approximate" },
    ],
    tags: ["platform", "kubernetes"],
    stack: ["Python", "boto3", "Terraform", "AWS Budgets", "GitHub Actions"],
    confidentiality: "public-reference",
    timeline: "1–2 weeks",
    relatedArchitectureIds: [],
    relatedSlugs: ["platform-golden-paths", "supply-chain-cicd-hardening"],
    repoUrl: "https://github.com/sauravrana646/portfolio-cloud-cost-optimizer",
  },
  {
    slug: "multi-cluster-gitops-rescue",
    title: "Multi-Cluster GitOps Rescue on EKS",
    clientAlias: "Series-B fintech (EU)",
    role: "Principal Platform (hands-on rescue)",
    engagementType: "rescue",
    status: "published",
    featured: false,
    dateStart: "2024-03",
    dateEnd: "2024-05",
    summary:
      "Restored a single path to production across three EU clusters—cutting deploy lead time from 45 minutes to 12 without turning the platform team into a ticket queue.",
    subtitle: "Series-B fintech (EU) · rescue engagement",
    metric: "lead time 45m → 12m",
    problem:
      "Three production clusters drifted independently. Releases required manual kubectl, ad-hoc Helm values, and Slack-threaded approvals. A failed canary left two regions on incompatible chart versions for 36 hours. Leadership needed a reversible path back to Git as the sole source of truth—without a freeze.",
    constraints:
      "EU data residency; no downtime windows longer than 15 minutes; existing Terraform modules had to stay; team of four platform engineers with uneven Argo CD experience; change advisory board required for anything touching the payment path.",
    architecture:
      "Hub-and-spoke Argo CD: one management cluster syncing ApplicationSets into spoke prod clusters. App-of-apps for bootstrap; progressive sync waves for mesh, then workloads. Cluster credentials via IRSA; secrets via External Secrets + sealed bootstrap only. Rollback is a Git revert—never a live mutate.",
    implementation:
      "Week 1–2: inventory live vs desired state; freeze non-critical deploys. Week 3–5: stand up hub, migrate platform charts with sync waves, wire GitHub Actions for PR preview diffs only. Week 6–8: cut over payment path behind feature flags; delete local kubectl credentials from CI. Week 9–10: runbooks, error-budget dashboards for sync lag, handoff workshops.",
    outcomesNarrative:
      "Median deploy lead time 45m → 12m; zero emergency kubectl in prod for 6 weeks post-handoff. Change failure rate −40% (client-reported from incident tags). Platform on-call pages related to “mystery drift” dropped to near zero.",
    lessons:
      "Don’t introduce progressive delivery before Git is the only path. ApplicationSets beat hand-written Apps for three-plus clusters. The CAB approved faster when rollback was a revert link in the PR template—not a slide. What we did not do: multi-cluster service mesh in the same engagement.",
    outcomes: [
      { label: "Deploy lead time 45m → 12m", confidence: "Verified" },
      { label: "Zero emergency kubectl for 6 weeks post-handoff", confidence: "Verified" },
      { label: "Change failure rate −40%", confidence: "Client-reported" },
    ],
    tags: ["kubernetes", "cicd"],
    stack: ["EKS", "Argo CD", "Terraform", "GitHub Actions"],
    confidentiality: "anonymized",
    timeline: "10 weeks",
    heroDiagramId: "gitops-hub-spoke",
    relatedArchitectureIds: ["gitops-hub-spoke"],
    relatedSlugs: ["platform-golden-paths", "supply-chain-cicd-hardening"],
  },
  {
    slug: "zero-trust-ingress-mesh",
    title: "Zero-Trust Ingress & Service Mesh Hardening",
    clientAlias: "B2B SaaS",
    role: "DevSecOps lead (hands-on)",
    engagementType: "hands-on",
    status: "published",
    featured: false,
    dateStart: "2024-06",
    dateEnd: "2024-08",
    summary:
      "Hardened edge and east-west paths with mTLS and policy gates—closing pen-test findings without a latency cliff.",
    subtitle: "B2B SaaS · hands-on DevSecOps",
    metric: "pen-test findings closed",
    problem:
      "Public ingress terminated TLS once and trusted the VPC thereafter. Lateral movement paths showed up in a third-party pen test. Product velocity depended on shared clusters, so a blunt network freeze was not an option.",
    constraints:
      "p99 budget of +5ms for mesh data plane; no customer-facing maintenance windows; existing NGINX Ingress had to coexist during cutover; security team required evidence packs for auditors.",
    architecture:
      "Edge terminates at a controlled ingress with authenticated upstreams; mesh provides identity-based mTLS and authorization for east-west. Policy-as-code gates in CI blocked unsigned images and overly broad ServiceAccounts. Break-glass paths are offline, audited, and time-boxed.",
    implementation:
      "Baseline traffic maps → pilot namespace with strict mTLS → progressive namespace onboarding → ingress authn/authz → evidence pack for residual risks. Latency budgets guarded every wave.",
    outcomesNarrative:
      "All critical and high pen-test findings closed. Measured p99 impact stayed within +3.2ms on the pilot path. Unsigned production images blocked at merge.",
    lessons:
      "Identity beats CIDR lists once namespaces multiply. Ship a latency budget before the mesh, or the mesh becomes the villain. Deferred full multi-cluster mesh federation.",
    outcomes: [
      { label: "Critical/high pen-test findings closed", confidence: "Verified" },
      { label: "p99 +3.2ms on pilot path", confidence: "Verified" },
      { label: "Unsigned images blocked at merge", confidence: "Verified" },
    ],
    tags: ["security", "networking"],
    stack: ["Istio", "cert-manager", "OPA/Gatekeeper", "AWS ALB"],
    confidentiality: "anonymized",
    timeline: "9 weeks",
    heroDiagramId: "zero-trust-mesh",
    relatedArchitectureIds: ["zero-trust-mesh"],
    relatedSlugs: ["supply-chain-cicd-hardening", "multi-cluster-gitops-rescue"],
  },
  {
    slug: "sre-error-budgets-slo",
    title: "Payment API SLOs & Error Budgets",
    clientAlias: "Marketplace",
    role: "SRE advisor + implementer",
    engagementType: "advisory",
    status: "published",
    featured: false,
    dateStart: "2024-01",
    dateEnd: "2024-03",
    summary:
      "Turned reliability from vibes into product-negotiable error budgets—and cut noisy pages without hiding real pain.",
    subtitle: "Marketplace · advisory + implementation",
    metric: "pages −55%",
    problem:
      "On-call was drowning in symptom alerts. Leadership argued about “is it down?” without shared SLIs. Feature freezes happened after incidents, not before budgets burned.",
    constraints:
      "Existing Prometheus/Grafana stack; product managers needed a non-jargon scoreboard; no headcount for a dedicated SRE team yet.",
    architecture:
      "User-journey SLIs for checkout authorization latency/availability; burn-rate multi-window alerts; error-budget policy tied to release cadence; incident tags feeding a monthly reliability review.",
    implementation:
      "Instrumented critical path → defined SLOs with product → rewired alerts to burn rate → ran two budget reviews → documented freeze/unfreeze rules.",
    outcomesNarrative:
      "Pages −55% while catching the two real regressions that mattered. Error-budget reviews became a product conversation, not an SRE monologue.",
    lessons:
      "Error budgets are useless without a release policy. Symptom alerts train people to ignore pages. Deferred tracing-wide rollout until SLIs were trusted.",
    outcomes: [
      { label: "On-call pages −55%", confidence: "Verified" },
      { label: "Budget reviews with product monthly", confidence: "Verified" },
    ],
    tags: ["sre", "observability"],
    stack: ["Prometheus", "Grafana", "PagerDuty", "OpenTelemetry"],
    confidentiality: "anonymized",
    timeline: "8 weeks",
    relatedArchitectureIds: [],
    relatedSlugs: ["platform-golden-paths"],
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
