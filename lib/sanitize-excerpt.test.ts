import { describe, expect, it } from "vitest";
import { sanitizeSearchExcerpt } from "@/lib/sanitize-excerpt";

describe("sanitizeSearchExcerpt", () => {
  it("keeps mark tags and strips other HTML", () => {
    expect(sanitizeSearchExcerpt('Hello <mark>GitOps</mark> <script>alert(1)</script>')).toBe(
      "Hello <mark>GitOps</mark> alert(1)",
    );
  });
});
