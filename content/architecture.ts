export type ArchitectureCategory =
  | "platform"
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
  "platform",
  "kubernetes",
  "network-security",
  "cicd-supply-chain",
] as const;

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: "gitops-hub-spoke",
    title: "GitOps hub-and-spoke",
    summary:
      "One management plane syncing desired state into spoke clusters—Git as the only mutate path, with clear failure domains and rollback semantics.",
    category: "kubernetes",
    pattern: "Hub ApplicationSet → spokes",
    engine: "static-svg",
    relatedProjectSlug: "multi-cluster-gitops-rescue",
    legend: [
      "Solid mint edges — desired-state sync from hub to spoke",
      "Butter-accent nodes — Git as authoritative source",
      "Gray edges — CI preview / non-prod mutate path",
      "Dashed — secret materialization (External Secrets)",
      "Hub holds credentials via IRSA; spokes never pull from each other",
    ],
    tradeoffs: [
      "Chose hub-and-spoke over per-cluster Argo — one policy surface, clearer blast radius for bootstrap.",
      "Accepted hub as a critical dependency; mitigated with HA control plane and documented freeze procedure.",
      "Rejected live kubectl “break glass” in CI — break-glass is offline, audited, time-boxed.",
      "Deferred multi-cluster service mesh to a later engagement.",
    ],
    nonGoals:
      "Progressive delivery, multi-cloud federation, and developer portal UX were explicitly out of scope for this diagram’s engagement.",
    operability:
      "Sync lag and application health are first-class SLIs. Rollback = Git revert + sync; no cluster-side mutate runbooks for routine work.",
    caption: "Fig. Hub ApplicationSet → spoke clusters · Git remains the only mutate path",
  },
  {
    id: "zero-trust-mesh",
    title: "Zero-trust ingress mesh",
    summary:
      "Authenticated edge plus identity-aware east-west mTLS—security controls that respect a latency budget.",
    category: "network-security",
    pattern: "Edge authn → mesh identity → workload policy",
    engine: "static-svg",
    relatedProjectSlug: "zero-trust-ingress-mesh",
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
    title: "Signed supply-chain pipeline",
    summary:
      "OIDC-federated CI, signed artifacts, and admission policy so provenance is enforced—not screenshotted.",
    category: "cicd-supply-chain",
    pattern: "OIDC → build → Cosign → policy admission",
    engine: "static-svg",
    relatedProjectSlug: "supply-chain-cicd-hardening",
    legend: [
      "Left-to-right — pipeline stages",
      "Dashed lower band — policy/SBOM/signature gates",
      "Right node — deploy target that rejects unsigned artifacts",
    ],
    tradeoffs: [
      "Chose keyless Cosign over managing long-lived signing keys in-quarter.",
      "Accepted GitHub-hosted runners with OIDC over self-hosted complexity.",
      "Kept a dual-control break-glass path instead of pretending incidents never need one.",
    ],
    nonGoals: "Full in-toto attestation platform purchase deferred.",
    operability: "Admission failures page security+platform; evidence bundles exportable for auditors.",
    caption: "Fig. Signed path from commit to admission-controlled deploy",
  },
  {
    id: "idp-golden-paths",
    title: "IDP golden paths",
    summary:
      "A thin portal over versioned templates—paved roads for deploy, secrets, and observability defaults.",
    category: "platform",
    pattern: "Portal → templates → GitOps + observability",
    engine: "static-svg",
    relatedProjectSlug: "platform-golden-paths",
    legend: [
      "Top — golden path portal / entry",
      "Lower left — service templates & CI",
      "Lower right — default observability bundle",
    ],
    tradeoffs: [
      "Chose thin portal over rewriting every pipeline from scratch.",
      "Accepted fewer languages on day one to keep the path excellent.",
      "Documented escape hatches instead of blocking all custom work.",
    ],
    nonGoals: "Multi-cloud template matrix and internal marketplace UX.",
    operability: "Path health = time-to-first-deploy + template drift checks.",
    caption: "Fig. Golden path from portal entry to paved production defaults",
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
