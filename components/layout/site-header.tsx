"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { openCommandPalette } from "@/components/widgets/command-palette-host";
import { buttonClassName } from "@/components/ui/button";
import { ctaNav, primaryNav, site } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { trapTabKey } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (panel) trapTabKey(event, panel);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  const openSearch = () => {
    closeMenu();
    // Let the drawer unlock body scroll before the palette locks it.
    window.setTimeout(() => openCommandPalette(), 0);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[color-mix(in_srgb,var(--ds-canvas)_88%,transparent)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[var(--nav-height)] w-full max-w-[var(--content-wide)] items-center justify-between gap-3 px-[var(--page-gutter)] sm:gap-6">
        <Link
          href="/"
          className="min-w-0 truncate text-[0.95rem] font-bold uppercase tracking-[0.08em] text-ink"
        >
          {site.brand}
          <span className="text-mint-deep">.</span>
        </Link>

        <nav className="hidden items-center gap-[clamp(18px,2.5vw,32px)] lg:flex" aria-label="Primary">
          {primaryNav
            .filter((item) => item.href !== "/")
            .map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "relative pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                    current ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  {current ? (
                    <m.span
                      layoutId={reducedMotion ? undefined : "nav-underline"}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-[linear-gradient(90deg,var(--ds-mint-deep),var(--ds-mint))]"
                      initial={reducedMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </Link>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <ThemeToggle className="hidden md:inline-flex" />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-border bg-surface text-ink-soft transition-colors hover:text-ink md:hidden"
            onClick={openSearch}
            aria-label="Open search"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-soft transition-colors hover:text-ink md:inline-flex"
            onClick={() => openCommandPalette()}
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
            <span>Search</span>
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-faint">
              ⌘K
            </kbd>
          </button>
          <Link href={ctaNav.href} className={cn(buttonClassName({ size: "sm" }), "hidden sm:inline-flex")}>
            {ctaNav.label}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-border bg-surface text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        ref={panelRef}
        id={panelId}
        aria-label="Mobile"
        className={cn(
          "fixed inset-0 z-40 flex-col bg-[color-mix(in_srgb,var(--ds-canvas)_98%,transparent)] px-[var(--page-gutter)] pt-[calc(var(--nav-height)+0.75rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden",
          "min-h-[100dvh]",
          open ? "flex" : "hidden",
        )}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 text-sm text-ink-soft"
            onClick={openSearch}
          >
            <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            Search
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className="border-b border-border py-4 text-lg text-ink-soft"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search/"
            className="border-b border-border py-4 text-lg text-ink-soft"
            onClick={closeMenu}
          >
            Full search
          </Link>
        </div>
        <Link
          href={ctaNav.href}
          className={cn(buttonClassName({ size: "md" }), "mt-6 w-full")}
          onClick={closeMenu}
        >
          {ctaNav.label}
        </Link>
      </nav>
    </header>
  );
}
