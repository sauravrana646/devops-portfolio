import { describe, expect, it } from "vitest";
import { parseTagsParam, serializeTagsParam, toggleTag } from "@/lib/filters";
import { filterProjectsByTags, getAllProjectSlugs, getProject } from "@/content/projects";
import { getAllArchitectureIds, getArchitecture } from "@/content/architecture";

describe("tag query helpers", () => {
  it("parses comma-separated tags and legacy tag=", () => {
    expect(parseTagsParam("kubernetes,security")).toEqual(["kubernetes", "security"]);
    expect(parseTagsParam(null, "platform")).toEqual(["platform"]);
    expect(parseTagsParam("")).toEqual([]);
  });

  it("serializes tags stably", () => {
    expect(serializeTagsParam(["security", "kubernetes"])).toBe("kubernetes,security");
    expect(serializeTagsParam([])).toBeNull();
  });

  it("toggles tags", () => {
    expect(toggleTag(["kubernetes"], "security")).toEqual(["kubernetes", "security"]);
    expect(toggleTag(["kubernetes", "security"], "kubernetes")).toEqual(["security"]);
  });
});

describe("project content", () => {
  it("exposes six build-ready case studies", () => {
    expect(getAllProjectSlugs()).toHaveLength(6);
    expect(getProject("supply-chain-cicd-hardening")?.featured).toBe(true);
    expect(getProject("supply-chain-cicd-hardening")?.repoUrl).toContain("portfolio-secure-cicd");
    expect(getProject("platform-golden-paths")?.repoUrl).toContain("portfolio-cloud-platform");
    expect(getProject("finops-k8s-rightsizing")?.repoUrl).toContain("portfolio-cloud-cost-optimizer");
  });

  it("filters by all selected tags", () => {
    const results = filterProjectsByTags(["security", "cicd"]);
    expect(
      results.every((project) => project.tags.includes("security") && project.tags.includes("cicd")),
    ).toBe(true);
    expect(results.some((project) => project.slug === "supply-chain-cicd-hardening")).toBe(true);
  });
});

describe("architecture content", () => {
  it("exposes four gallery diagrams with related projects", () => {
    expect(getAllArchitectureIds()).toHaveLength(4);
    expect(getArchitecture("gitops-hub-spoke")?.relatedProjectSlug).toBe(
      "multi-cluster-gitops-rescue",
    );
  });
});
