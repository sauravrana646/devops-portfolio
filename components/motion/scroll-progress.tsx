"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Thin reading progress along the top edge. */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const viewportH = window.visualViewport?.height ?? window.innerHeight;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const max = Math.max(document.documentElement.scrollHeight - viewportH, 1);
      setProgress(Math.min(y / max, 1));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      data-pagefind-ignore
    >
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--ds-mint-deep),var(--ds-mint),var(--ds-butter))]"
        style={{
          transform: `scaleX(${progress})`,
          transition: reduced ? undefined : "transform 80ms linear",
        }}
      />
    </div>
  );
}
