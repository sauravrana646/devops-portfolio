export const openSourceRepos = [
  {
    title: "gitops-policy-kit",
    body: "Reusable Kyverno / OPA snippets and CI gates for admission-as-code baselines.",
    tags: ["kubernetes", "policy"],
    meta: "Go · Apache-2.0",
    href: "https://github.com/",
  },
  {
    title: "slo-starter",
    body: "Prometheus recording rules, burn-alert templates, and a thin runbook skeleton for error budgets.",
    tags: ["sre", "observability"],
    meta: "YAML · MIT",
    href: "https://github.com/",
  },
  {
    title: "tf-module-boundary",
    body: "Opinionated Terraform module layout with plan policy hooks and example multi-account wiring.",
    tags: ["iac", "aws"],
    meta: "HCL · MPL-2.0",
    href: "https://github.com/",
  },
  {
    title: "pipeline-attest",
    body: "Cosign / SLSA-oriented helpers for signing artifacts and verifying provenance in GitHub Actions.",
    tags: ["supply-chain", "cicd"],
    meta: "Shell · Apache-2.0",
    href: "https://github.com/",
  },
  {
    title: "platform-adr-template",
    body: "Lightweight ADR + RFC templates tuned for platform decisions—options, non-goals, failure modes.",
    tags: ["docs", "platform"],
    meta: "Markdown · CC-BY-4.0",
    href: "https://github.com/",
  },
] as const;
