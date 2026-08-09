export type ArchitectureCategory =
  | "kubernetes"
  | "network-security"
  | "cicd-supply-chain"
  | "sre-observability";

export type ArchitectureDiagram = {
  id: string;
  title: string;
  summary: string;
  category: ArchitectureCategory;
  pattern: string;
  engine: "static-svg";
  relatedProjectSlug?: string;
  legend: string[];
  tradeoffs: string[];
  nonGoals: string;
  operability: string;
  caption: string;
};

export const architectureCategories = [
  "kubernetes",
  "network-security",
  "cicd-supply-chain",
] as const;

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: "gitops-hub-spoke",
    title: "GitOps hub-and-spoke",
    summary:
      "One control plane syncing desired state into clusters—Git as the change path, with clear rollback and failure domains.",
    category: "kubernetes",
    pattern: "Hub → spoke clusters · Git as source of truth",
    engine: "static-svg",
    relatedProjectSlug: "platform-golden-paths",
    legend: [
      "Solid edges — desired state syncing to clusters",
      "Butter-accent nodes — Git as the source of truth",
      "Gray edges — review/preview before merge",
      "Hub holds the sync plane; spokes do not pull from each other",
    ],
    tradeoffs: [
      "One policy surface over many one-off cluster setups.",
      "Git revert as the normal rollback—not ad-hoc cluster edits.",
      "Deferred multi-cluster mesh and portal UX to later work.",
    ],
    nonGoals:
      "Progressive delivery, multi-cloud federation, and developer portal UX were out of scope.",
    operability:
      "Watch sync health. Routine rollback = revert in Git and resync.",
    caption: "Fig. Hub syncs desired state · Git remains the change path",
  },
  {
    id: "zero-trust-mesh",
    title: "Zero-trust ingress mesh",
    summary:
      "Authenticated edge plus identity-aware east-west mTLS—security controls that respect a latency budget.",
    category: "network-security",
    pattern: "Edge authn → mesh identity → workload policy",
    engine: "static-svg",
    relatedProjectSlug: "supply-chain-cicd-hardening",
    legend: [
      "Top band — edge / ingress trust boundary",
      "Side boxes — workload identities in the mesh",
      "Center node — policy + mTLS control point",
    ],
    tradeoffs: [
      "Chose mesh identity over expanding CIDR allowlists.",
      "Accepted modest data-plane cost within a published p99 budget.",
      "Deferred multi-cluster federation until single-cluster posture was boring.",
    ],
    nonGoals: "Full WAF rewrite and API gateway replacement were out of scope.",
    operability: "Latency and authz denial rates are watched per wave; rollback is namespace policy revert.",
    caption: "Fig. Edge trust boundary with mesh-backed east-west identity",
  },
  {
    id: "signed-supply-chain",
    title: "Secure CI/CD pipeline",
    summary:
      "A clear path from change to release—checks that block real risk, then a signed artifact deploy can verify.",
    category: "cicd-supply-chain",
    pattern: "Change → Checks → Build → Sign → Release",
    engine: "static-svg",
    relatedProjectSlug: "supply-chain-cicd-hardening",
    legend: [
      "Left to right — the only path a change should take",
      "Checks — tests and security scans before build continues",
      "Sign — prove where the release came from",
      "Release — what deploy and admission will trust",
    ],
    tradeoffs: [
      "Preferred gates that fail the build over scanners nobody acts on.",
      "Signed releases over “trust the green checkmark.”",
      "Kept a deliberate release step instead of auto-shipping every merge.",
    ],
    nonGoals: "Full compliance platform purchase and multi-cloud federation were out of scope.",
    operability:
      "Failed checks stop the change. Signed releases leave evidence for review, audit, and admission.",
    caption: "Fig. Secure path from change to trusted release",
  },
  {
    id: "idp-golden-paths",
    title: "Golden path",
    summary:
      "One paved path from signed release to running workloads—policy first, then deploy, then observe.",
    category: "kubernetes",
    pattern: "Signed release → Policy → Deploy → Observe",
    engine: "static-svg",
    relatedProjectSlug: "platform-golden-paths",
    legend: [
      "Signed release — built and signed in secure CI/CD",
      "Policy — unsafe or unsigned images do not enter the cluster",
      "Deploy — one GitOps path",
      "Observe — health and alerts on the path, not bolted on later",
    ],
    tradeoffs: [
      "Verify and run signed images instead of rebuilding the app on the platform.",
      "One excellent path over many custom deploy scripts.",
      "Policy at admit time so shortcuts cannot skip CI.",
    ],
    nonGoals: "A full developer portal and outsourced 24/7 managed ops were out of scope.",
    operability:
      "Path health is time-to-running-service plus clear allow/deny from policy. Rollback is Git revert and resync.",
    caption: "Fig. Golden path for shipping trusted software",
  },
];

export function getArchitecture(id: string) {
  return architectureDiagrams.find((diagram) => diagram.id === id);
}

export function getAllArchitectureIds() {
  return architectureDiagrams.map((diagram) => diagram.id);
}

export function filterArchitectureByCategory(category: string | null) {
  if (!category || category === "all") return architectureDiagrams;
  return architectureDiagrams.filter((diagram) => diagram.category === category);
}
