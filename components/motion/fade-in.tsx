"use client";

import { m, useInView, type HTMLMotionProps } from "framer-motion";
import { useMemo, useRef } from "react";
import { useCoarsePointer, useCompactViewport } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

/** Soft, product-like ease — longer settle, less snap. */
const easeFluent = [0.16, 1, 0.3, 1] as const;

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** When true, animate only the first time. Default false = both scroll directions. */
  once?: boolean;
  amount?: number;
};

/** Viewport reveal that re-plays on scroll up and down (desktop + touch). */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 22,
  once = false,
  amount,
  ...props
}: FadeInProps) {
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const compact = useCompactViewport();
  const touchLike = coarse || compact;
  const direction = useScrollDirection();
  const ref = useRef<HTMLDivElement>(null);

  // Pixel margins beat % on mobile Safari (visualViewport / URL bar resize).
  const rootMargin = touchLike ? "-40px 0px -56px 0px" : "-48px 0px -64px 0px";
  const viewAmount = amount ?? (touchLike ? 0.12 : 0.18);

  const inView = useInView(ref, {
    once,
    amount: viewAmount,
    margin: rootMargin,
  });

  const travel = useMemo(() => {
    if (reduced) return 0;
    if (touchLike) return Math.min(y, 14);
    return y;
  }, [reduced, touchLike, y]);

  const hiddenY = direction > 0 ? travel : -travel;
  const duration = reduced ? 0.16 : touchLike ? 0.55 : 0.78;
  const exitOpacity = touchLike ? 0.06 : 0;

  return (
    <m.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial={false}
      animate={
        inView
          ? reduced
            ? { opacity: 1 }
            : { opacity: 1, y: 0, ...(touchLike ? {} : { scale: 1 }) }
          : reduced
            ? { opacity: 0.2 }
            : {
                opacity: exitOpacity,
                y: hiddenY,
                ...(touchLike ? {} : { scale: 0.992 }),
              }
      }
      transition={{
        duration,
        delay: inView ? (touchLike ? Math.min(delay, 0.06) : delay) : 0,
        ease: easeFluent,
        opacity: { duration: duration * 0.9, ease: easeFluent },
        y: { duration, ease: easeFluent },
        scale: { duration, ease: easeFluent },
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}
