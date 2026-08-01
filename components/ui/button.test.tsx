import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, buttonClassName } from "@/components/ui/button";

describe("button", () => {
  it("primary variant includes light label + dark fill classes", () => {
    const className = buttonClassName({ variant: "primary" });
    expect(className).toContain("bg-cta");
    expect(className).toContain("text-on-cta");
  });

  it("renders primary button with expected classes", () => {
    render(<Button>Reach out</Button>);
    const button = screen.getByRole("button", { name: "Reach out" });
    expect(button.className).toContain("bg-cta");
    expect(button.className).toContain("text-on-cta");
  });
});
