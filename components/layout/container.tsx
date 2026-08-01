import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  narrow: "max-w-[var(--content-narrow)]",
  default: "max-w-[var(--content-max)]",
  wide: "max-w-[var(--content-wide)]",
  full: "max-w-none",
} as const;

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof sizes;
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-[var(--page-gutter)]", sizes[size], className)}
      {...props}
    />
  );
}
