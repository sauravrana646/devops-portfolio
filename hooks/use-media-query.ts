"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onStoreChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

/** SSR-safe matchMedia. Server + first paint use `false`. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Touch / stylus primary input — tune motion for phones & tablets. */
export function useCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}

/** Narrow layout (phones in portrait, small windows). */
export function useCompactViewport() {
  return useMediaQuery("(max-width: 767px)");
}
