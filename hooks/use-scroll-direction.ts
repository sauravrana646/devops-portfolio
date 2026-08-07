"use client";

import { useSyncExternalStore } from "react";

export type ScrollDirection = 1 | -1;

let direction: ScrollDirection = 1;
let lastY = 0;
let frame = 0;
let listenerCount = 0;
const listeners = new Set<() => void>();

function readScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const current = readScrollY();
    const delta = current - lastY;
    const threshold = window.matchMedia("(pointer: coarse)").matches ? 8 : 3;
    if (Math.abs(delta) < threshold) return;
    const next: ScrollDirection = delta > 0 ? 1 : -1;
    if (next !== direction) {
      direction = next;
      notify();
    }
    lastY = current;
  });
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (listenerCount === 0) {
    lastY = readScrollY();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  listenerCount += 1;
  return () => {
    listeners.delete(onStoreChange);
    listenerCount -= 1;
    if (listenerCount === 0) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", onScroll);
    }
  };
}

/**
 * Shared scroll direction (1 = down, -1 = up).
 * One window listener for all consumers — safe on touch + desktop.
 */
export function useScrollDirection(): ScrollDirection {
  return useSyncExternalStore(
    subscribe,
    () => direction,
    () => 1,
  );
}
