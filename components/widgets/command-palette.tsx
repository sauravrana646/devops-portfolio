"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { filterCommandItems, getCommandItems, type CommandItem } from "@/lib/command-items";
import { trapTabKey } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: Props) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const dialogId = useId();
  const listId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => getCommandItems(), []);
  const results = useMemo(() => filterCommandItems(items, query), [items, query]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
  }, [onOpenChange]);

  const runItem = useCallback(
    (item: CommandItem) => {
      if (item.action === "theme-light") setTheme("light");
      else if (item.action === "theme-dark") setTheme("dark");
      else if (item.action === "theme-system") setTheme("system");
      else if (item.href) router.push(item.href);
      close();
    },
    [close, router, setTheme],
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Delay focus so mobile keyboards / drawers settle first.
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const item = results[activeIndex];
        if (item) runItem(item);
        return;
      }
      if (dialogRef.current) trapTabKey(event, dialogRef.current);
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, open, results, runItem]);

  if (!open) return null;

  const groups = ["Navigate", "Actions"] as const;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-start sm:p-4 sm:pt-[12vh]"
      data-pagefind-ignore
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgb(36_48_56_/0.42)] backdrop-blur-[2px]"
        aria-label="Close command palette"
        onClick={close}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogId}
        className={cn(
          "relative z-10 flex w-full max-h-[min(88dvh,720px)] flex-col overflow-hidden border border-border-strong bg-surface shadow-[var(--shadow-lift)]",
          "rounded-t-lg sm:max-h-[min(70vh,560px)] sm:w-[min(560px,calc(100%-2rem))] sm:rounded-lg",
          "pb-[env(safe-area-inset-bottom)]",
        )}
      >
        <h2 id={dialogId} className="sr-only">
          Command palette
        </h2>
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-pill bg-border-strong sm:hidden" aria-hidden />
        <div className="border-b border-border px-4 py-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Jump to a page or action…"
            // 16px prevents iOS Safari input zoom.
            className="w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-faint sm:text-base"
            aria-controls={listId}
            aria-autocomplete="list"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
          />
        </div>
        <div
          id={listId}
          role="listbox"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 [-webkit-overflow-scrolling:touch]"
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted">No matches.</p>
          ) : (
            groups.map((group) => {
              const groupItems = results.filter((item) => item.group === group);
              if (groupItems.length === 0) return null;
              return (
                <div key={group} className="mb-2">
                  <p className="px-3 py-1.5 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.1em] text-mint-deep">
                    {group}
                  </p>
                  <ul className="list-none p-0">
                    {groupItems.map((item) => {
                      const index = results.indexOf(item);
                      const active = index === activeIndex;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={active}
                            className={cn(
                              "flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-3 py-3 text-left text-base transition-colors sm:min-h-0 sm:py-2.5 sm:text-sm",
                              active ? "bg-surface-soft text-ink" : "text-ink-soft hover:bg-canvas-elevated",
                            )}
                            onPointerEnter={() => setActiveIndex(index)}
                            onClick={() => runItem(item)}
                          >
                            <span>{item.label}</span>
                            {item.href ? (
                              <span className="hidden font-mono text-[length:var(--text-caption)] text-faint sm:inline">
                                {item.href}
                              </span>
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>
        <p className="hidden border-t border-border px-4 py-2 text-[length:var(--text-caption)] text-faint sm:block">
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">↑↓</kbd> move ·{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">↵</kbd> open ·{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">esc</kbd> close
        </p>
        <p className="border-t border-border px-4 py-3 text-center text-[length:var(--text-caption)] text-faint sm:hidden">
          Tap a result · swipe down or tap outside to close
        </p>
      </div>
    </div>
  );
}
