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
    slug: "multi-cluster-gitops-rescue",
    title: "Multi-Cluster GitOps Rescue on EKS",
    clientAlias: "Series-B fintech (EU)",
    role: "Principal Platform (hands-on rescue)",
    engagementType: "rescue",
    status: "published",
    featured: true,
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
    featured: true,
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
    slug: "platform-golden-paths",
    title: "Internal Developer Platform Golden Paths",
    clientAlias: "Logistics tech",
    role: "Platform eng lead (build)",
    engagementType: "build",
    status: "published",
    featured: true,
    dateStart: "2023-09",
    dateEnd: "2023-12",
    summary:
      "Paved a boring golden path from repo template to production so product teams stopped inventing their own CI folklore.",
    subtitle: "Logistics tech · platform build",
    metric: "15d → 2d to first deploy",
    problem:
      "New services took weeks: copy-paste pipelines, snowflake Helm charts, and tribal knowledge for secrets and observability. Platform became a ticket queue; product teams still owned outages they couldn’t diagnose.",
    constraints:
      "No big-bang portal rewrite; must reuse existing GitHub Enterprise and cluster estate; security review on every new privileged capability; success measured as time-to-first-prod-deploy.",
    architecture:
      "Thin portal over versioned templates: repo scaffolding, CI reusable workflows, GitOps app bootstrap, default dashboards/alerts, and a paved secrets path. Escape hatches documented; privileged paths require explicit platform approval.",
    implementation:
      "Interviewed three product teams → distilled one golden path → shipped templates + docs → measured first deploy → iterated on the two most common escape hatches.",
    outcomesNarrative:
      "Time-to-first-deploy 15d → 2d for the pilot cohort. Platform tickets for “how do I deploy” dropped sharply. Observability coverage became default, not optional.",
    lessons:
      "Golden paths win when defaults are excellent and escapes are honest. Portals without paved roads are wallpaper. Deferred multi-language templates until the Node/Go path was boring.",
    outcomes: [
      { label: "Time-to-first-deploy 15d → 2d", confidence: "Verified" },
      { label: "Default observability on new services", confidence: "Verified" },
      { label: "Fewer “how do I deploy” tickets", confidence: "Approximate" },
    ],
    tags: ["platform", "observability"],
    stack: ["Backstage", "GitHub Actions", "Argo CD", "OpenTelemetry"],
    confidentiality: "anonymized",
    timeline: "12 weeks",
    heroDiagramId: "idp-golden-paths",
    relatedArchitectureIds: ["idp-golden-paths"],
    relatedSlugs: ["multi-cluster-gitops-rescue", "sre-error-budgets-slo"],
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
  {
    slug: "supply-chain-cicd-hardening",
    title: "Supply-Chain CI/CD Hardening",
    clientAlias: "Regulated SaaS",
    role: "DevSecOps (synthetic composite)",
    engagementType: "hands-on",
    status: "published",
    featured: false,
    dateStart: "2024-09",
    dateEnd: "2024-11",
    summary:
      "Gated merges and releases with OIDC, signatures, and policy—so “who built this?” stopped being a forensic exercise.",
    subtitle: "Regulated SaaS · synthetic composite",
    metric: "OIDC + Cosign gated",
    problem:
      "Pipelines used long-lived cloud keys. Images reached prod without provenance. Auditors asked questions the team answered with screenshots.",
    constraints:
      "GitHub-hosted runners preferred; no full binary authorization platform purchase in-quarter; must not break hotfix path.",
    architecture:
      "OIDC federation to cloud roles; Cosign keyless signing; policy checks in CI for signature + SBOM presence; break-glass workflow with dual control and expiry.",
    implementation:
      "Federate CI identity → sign images → verify at deploy admission → evidence bundle for auditors → tabletop the break-glass path.",
    outcomesNarrative:
      "Long-lived deploy keys removed from CI. Prod admission rejects unsigned artifacts. Hotfix path remains, with dual control.",
    lessons:
      "Provenance beats secret rotation theater. Document break-glass before you need it. Synthetic composite: pattern drawn from multiple engagements.",
    outcomes: [
      { label: "OIDC replaces long-lived deploy keys", confidence: "Verified" },
      { label: "Unsigned artifacts blocked at admission", confidence: "Verified" },
    ],
    tags: ["cicd", "security"],
    stack: ["GitHub Actions", "Cosign", "Kyverno", "AWS OIDC"],
    confidentiality: "synthetic",
    timeline: "7 weeks",
    heroDiagramId: "signed-supply-chain",
    relatedArchitectureIds: ["signed-supply-chain"],
    relatedSlugs: ["zero-trust-ingress-mesh"],
  },
  {
    slug: "finops-k8s-rightsizing",
    title: "Kubernetes Rightsizing with Karpenter",
    clientAlias: "Growth-stage SaaS",
    role: "Platform + FinOps advisory",
    engagementType: "advisory",
    status: "published",
    featured: false,
    dateStart: "2023-05",
    dateEnd: "2023-07",
    summary:
      "Cut wasteful compute without surprising latency—rightsizing workloads and letting Karpenter reclaim idle capacity.",
    subtitle: "Growth-stage SaaS · FinOps + platform",
    metric: "compute −31%",
    problem:
      "Cluster spend grew faster than traffic. Requests were folklore; bin-packing was poor; night-time capacity sat idle with nobody accountable.",
    constraints:
      "No availability regressions on checkout; finance needed monthly attribution; cluster upgrades already scheduled.",
    architecture:
      "Workload rightsize recommendations → gradual request/limit alignment → Karpenter consolidation for non-stateful pools → cost dashboards by team namespace.",
    implementation:
      "Baseline cost + latency → pilot two services → expand consolidation windows → hand finance a namespace attribution view.",
    outcomesNarrative:
      "Compute spend −31% over six weeks with no SLO burn from the change set. Teams could see their own waste.",
    lessons:
      "FinOps without SLOs is just cutting. Start with request hygiene before fancy schedulers. Deferred GPU pools to a later phase.",
    outcomes: [
      { label: "Compute spend −31%", confidence: "Approximate" },
      { label: "No SLO burn attributed to rightsizing", confidence: "Verified" },
    ],
    tags: ["kubernetes", "platform"],
    stack: ["EKS", "Karpenter", "Prometheus", "Kubecost"],
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
