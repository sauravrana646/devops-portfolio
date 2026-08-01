"use client";

import { cn } from "@/lib/utils";

export function FilterChips({
  label,
  options,
  active,
  onChange,
  exclusive = false,
}: {
  label: string;
  options: readonly string[];
  active: string[];
  onChange: (next: string[]) => void;
  /** When true, selecting a chip replaces the selection (single-select). */
  exclusive?: boolean;
}) {
  const isAll = active.length === 0;

  return (
    <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={label}>
      <button
        type="button"
        className={cn(
          "rounded-pill border px-3.5 py-2 text-sm font-medium transition-colors",
          isAll
            ? "border-mint-deep bg-mint-soft text-ink"
            : "border-border bg-surface text-ink-soft hover:border-mint-deep",
        )}
        aria-pressed={isAll}
        onClick={() => onChange([])}
      >
        All
      </button>
      {options.map((option) => {
        const pressed = active.includes(option);
        return (
          <button
            key={option}
            type="button"
            className={cn(
              "rounded-pill border px-3.5 py-2 text-sm font-medium transition-colors",
              pressed
                ? "border-mint-deep bg-mint-soft text-ink"
                : "border-border bg-surface text-ink-soft hover:border-mint-deep",
            )}
            aria-pressed={pressed}
            onClick={() => {
              if (exclusive) {
                onChange(pressed ? [] : [option]);
                return;
              }
              onChange(
                pressed ? active.filter((item) => item !== option) : [...active, option].sort(),
              );
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
