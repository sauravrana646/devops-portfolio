"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const itemReduced = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export function StaggerChildren({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <m.div className={cn(className)} variants={container} initial="hidden" animate="show" {...props}>
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduced = usePrefersReducedMotion();
  return (
    <m.div className={cn(className)} variants={reduced ? itemReduced : item} {...props}>
      {children}
    </m.div>
  );
}
