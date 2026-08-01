import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type TextLinkProps = ComponentProps<typeof Link> & {
  muted?: boolean;
};

export function TextLink({ className, muted = false, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "font-semibold transition-colors duration-[var(--duration-fast)]",
        muted
          ? "text-[var(--color-ink-soft)] hover:text-[var(--color-mint-deep)]"
          : "text-[var(--color-mint-deep)] hover:text-[var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}
