/** Curated public portfolio demos — also tracked under ~/Documents/Projects/case-studies */
export const openSourceRepos: readonly {
  title: string;
  body: string;
  tags: readonly string[];
  meta: string;
  href: string;
}[] = [
  {
    title: "portfolio-secure-cicd",
    body: "CI/CD with Trivy fail-on-CRITICAL gates, SBOM artifacts, and a hardened multi-stage image—plus a vulnerable Dockerfile for before/after demos.",
    tags: ["cicd", "security", "trivy"],
    meta: "Security Hardening sprint demo",
    href: "https://github.com/sauravrana646/portfolio-secure-cicd",
  },
  {
    title: "portfolio-cloud-platform",
    body: "Local-first platform path: Compose API/worker/Redis, Prometheus/Grafana, Helm chart, optional Argo CD, and Terraform deploy_target (local | ecs | eks).",
    tags: ["kubernetes", "terraform", "helm"],
    meta: "K8s Deploy Pack demo",
    href: "https://github.com/sauravrana646/portfolio-cloud-platform",
  },
  {
    title: "portfolio-cloud-cost-optimizer",
    body: "Read-only AWS cost waste CLI, sample report, weekly Actions dry-run, and Terraform budget/scheduler skeletons behind enable_resources=false.",
    tags: ["aws", "finops", "terraform"],
    meta: "Cost Audit sprint demo",
    href: "https://github.com/sauravrana646/portfolio-cloud-cost-optimizer",
  },
];
