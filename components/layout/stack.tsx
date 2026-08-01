import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const gaps = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
} as const;

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: keyof typeof gaps;
  horizontal?: boolean;
};

export function Stack({ gap = 4, horizontal = false, className, ...props }: StackProps) {
  return (
    <div
      className={cn("flex", horizontal ? "flex-row flex-wrap items-center" : "flex-col", gaps[gap], className)}
      {...props}
    />
  );
}
