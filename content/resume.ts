export const resumeContent = {
  lede: "DevOps and Cloud Engineer focused on Kubernetes, CI/CD, cloud infrastructure, and security hardening—with measurable delivery and cost outcomes.",
  experience: [
    {
      period: "05/2023 — Present",
      title: "DevOps and Applications Engineer",
      org: "Dronapay Private Ltd · India",
      bullets: [
        "Partner with architects and engineers to design environments that meet business requirements, security specs, and SLAs",
        "Reduced container image vulnerabilities from 150+ to under 30; applied CIS benchmarks and secure operational practices",
        "Benchmarked and load-tested applications to identify bottlenecks and raise throughput to ~3,000 TPS",
        "Built hardened AMIs aligned to Secure Configuration Documents for VMs and Kubernetes clusters",
        "Drove compliance readiness across SOC 2, VAPT, ISO 27001, and data-localization requirements—gap analysis, audit evidence, remediation",
        "Operate and upgrade cloud infrastructure, Kubernetes clusters, and Helm charts for reliable application delivery",
        "Cut infrastructure cost ~20% by rightsizing and dynamically spawning capacity for end-of-day workloads",
        "Documented cloud practices and ran training sessions; maintained DR / backup / failover plans for continuity",
      ],
    },
    {
      period: "06/2022 — 03/2024",
      title: "Junior Associate IT — DevOps",
      org: "Unthinkable Solutions · India",
      bullets: [
        "Provisioned, deployed, and managed Kubernetes clusters and workloads with Helm for consistent delivery",
        "Delivered Terraform IaC that cut manual effort and provisioning errors ~70% and improved environment consistency",
        "Stood up Prometheus + Grafana monitoring to speed incident response and improve uptime visibility",
        "Built Jenkins CI/CD pipelines that reduced deployment time ~40% and increased deploy frequency to multiple times per day",
      ],
    },
  ],
  education: [
    {
      period: "08/2018 — 07/2022",
      title: "Bachelor of Technology — Information Technology",
      org: "Himachal Pradesh University · Himachal Pradesh, India",
    },
  ],
  skills: [
    {
      title: "Cloud & DevOps",
      body: "AWS · GCP · Docker · Kubernetes · Argo CD · Terraform · Ansible · Helm",
    },
    {
      title: "Delivery & automation",
      body: "Jenkins · GitHub Actions · CI/CD optimization · Infrastructure as Code",
    },
    {
      title: "Observability",
      body: "Prometheus · Grafana · Loki · Fluent Bit · ELK",
    },
    {
      title: "Data & systems",
      body: "Kafka · Redis · Airflow · Python · Bash",
    },
    {
      title: "Security & compliance",
      body: "Image hardening · CIS benchmarks · SOC 2 · VAPT · ISO 27001 · secure AMIs",
    },
  ],
} as const;
