import { describe, expect, it } from "vitest";
import { defaultBlogCta, resolveBlogCta } from "@/lib/blog-cta";

describe("blog CTA", () => {
  it("falls back to topic-neutral defaults", () => {
    expect(resolveBlogCta({})).toEqual(defaultBlogCta);
  });

  it("uses per-note title and body and appends SLA when missing", () => {
    const cta = resolveBlogCta({
      ctaTitle: "Need a quieter on-call?",
      ctaBody: "Tell me which path breaks at 3am.",
      ctaLabel: "Talk on-call readiness",
    });
    expect(cta.title).toBe("Need a quieter on-call?");
    expect(cta.label).toBe("Talk on-call readiness");
    expect(cta.body).toContain("Tell me which path breaks at 3am.");
    expect(cta.body).toMatch(/business days/i);
  });

  it("does not duplicate SLA when already present", () => {
    const cta = resolveBlogCta({
      ctaBody: "Cost is climbing. I’ll reply within 2 business days.",
    });
    expect(cta.body.match(/business days/gi)?.length).toBe(1);
  });
});
