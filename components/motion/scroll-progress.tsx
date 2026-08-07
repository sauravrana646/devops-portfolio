"use client";

import { useEffect, useRef } from "react";

/**
 * Thin reading progress along the top edge.
 * Updates via rAF + direct DOM transforms (no CSS transition lag / React scroll thrash).
 */
export function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const track = trackRef.current;
    if (!bar || !track) return;

    let frame = 0;
    let lastAnnounced = -1;

    const readProgress = () => {
      const root = document.documentElement;
      // clientHeight is more stable than visualViewport during mobile URL-bar show/hide.
      const max = Math.max(root.scrollHeight - root.clientHeight, 1);
      const y = window.scrollY || root.scrollTop || 0;
      return Math.min(Math.max(y / max, 0), 1);
    };

    const paint = () => {
      frame = 0;
      const progress = readProgress();
      bar.style.transform = `scaleX(${progress})`;

      const announced = Math.round(progress * 100);
      if (announced !== lastAnnounced) {
        lastAnnounced = announced;
        track.setAttribute("aria-valuenow", String(announced));
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      data-pagefind-ignore
    >
      <div
        ref={barRef}
        className="h-full origin-left will-change-transform bg-[linear-gradient(90deg,var(--ds-mint-deep),var(--ds-mint),var(--ds-butter))]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
