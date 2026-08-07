import { describe, expect, it } from "vitest";
import { filterCommandItems, getCommandItems } from "@/lib/command-items";

describe("command items", () => {
  it("includes primary navigation and theme actions", () => {
    const items = getCommandItems();
    expect(items.some((item) => item.href === "/projects/")).toBe(true);
    expect(items.some((item) => item.action === "theme-dark")).toBe(true);
  });

  it("filters by label and keywords", () => {
    const items = getCommandItems();
    const matched = filterCommandItems(items, "reach");
    expect(matched.some((item) => item.href === "/contact/")).toBe(true);
    expect(filterCommandItems(items, "zzz-nope")).toHaveLength(0);
  });
});
