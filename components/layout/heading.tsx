import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const styles = {
  1: "text-[length:var(--text-display-lg)] font-semibold tracking-[-0.035em] leading-[1.1]",
  2: "text-[length:var(--text-display-md)] font-semibold tracking-[-0.03em] leading-[1.15]",
  3: "text-[length:var(--text-h2)] font-semibold tracking-[-0.02em]",
  4: "text-[length:var(--text-h3)] font-semibold tracking-[-0.02em]",
} as const;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
};

export function Heading({ level = 2, as, className, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as "h1" | "h2" | "h3" | "h4");
  return <Tag className={cn("text-[var(--color-ink)]", styles[level], className)} {...props} />;
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mb-3 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-[var(--color-mint-deep)]",
        className,
      )}
      {...props}
    />
  );
}
