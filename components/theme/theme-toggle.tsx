"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function subscribe() {
  return () => {};
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex h-9 items-center rounded-pill border border-border bg-surface p-0.5",
          className,
        )}
        aria-hidden
      >
        <span className="h-8 w-8" />
        <span className="h-8 w-8" />
        <span className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-pill border border-border bg-surface p-0.5",
        className,
      )}
      role="group"
      aria-label="Color theme"
    >
      {modes.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={`${label} theme`}
            aria-pressed={active}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-pill text-ink-soft transition-colors",
              active ? "bg-surface-soft text-ink shadow-soft" : "hover:text-ink",
            )}
            onClick={() => setTheme(value)}
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
