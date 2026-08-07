"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const CommandPalette = dynamic(
  () => import("@/components/widgets/command-palette").then((mod) => mod.CommandPalette),
  { ssr: false },
);

const OPEN_EVENT = "portfolio:open-command-palette";

export function CommandPaletteHost() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const openPalette = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setMounted(true);
    setOpen((value) => !value);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, [openPalette, toggle]);

  if (!mounted) return null;
  return <CommandPalette open={open} onOpenChange={setOpen} />;
}

/** Open palette from header / search affordance. */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}
