"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/** Soft drifting orbs + light scroll parallax. Decorative only. */
export function AmbientBackground({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const viewportH = window.visualViewport?.height ?? window.innerHeight;
        const max = Math.max(document.documentElement.scrollHeight - viewportH, 1);
        const t = Math.min(y / max, 1);
        root.style.setProperty("--ambient-shift-x", `${(t * 28 - 8).toFixed(1)}px`);
        root.style.setProperty("--ambient-shift-y", `${(t * 40).toFixed(1)}px`);
        root.style.setProperty("--ambient-drift", `${(t * 12).toFixed(1)}deg`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
      data-pagefind-ignore
    >
      <div className="ambient-mesh absolute inset-0" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
