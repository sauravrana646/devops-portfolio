import { afterEach, describe, expect, it, vi } from "vitest";

describe("withBasePath", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns path unchanged when base path is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    const { withBasePath } = await import("./paths");
    expect(withBasePath("/about/")).toBe("/about/");
    expect(withBasePath("/")).toBe("/");
  });

  it("prefixes paths when base path is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/devops-portfolio");
    const { withBasePath, getBasePath } = await import("./paths");
    expect(getBasePath()).toBe("/devops-portfolio");
    expect(withBasePath("/")).toBe("/devops-portfolio/");
    expect(withBasePath("/projects/")).toBe("/devops-portfolio/projects/");
  });
});
