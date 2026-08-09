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
    body: "Secure CI/CD reference: checks that block real risk, hardened containers, and signed releases you can verify.",
    tags: ["cicd", "security"],
    meta: "Security Hardening",
    href: "https://github.com/sauravrana646/portfolio-secure-cicd",
  },
  {
    title: "portfolio-cloud-platform",
    body: "Golden path for trusted software: signed releases into Kubernetes, with policy that rejects unsafe images.",
    tags: ["kubernetes", "gitops"],
    meta: "Golden path",
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
