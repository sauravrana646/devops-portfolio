"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ctaNav, primaryNav, site } from "@/content/site";
import { buttonClassName } from "@/components/ui/button";
import { trapTabKey } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgb(238_245_241_/0.88)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[var(--nav-height)] w-full max-w-[var(--content-wide)] items-center justify-between gap-6 px-[var(--page-gutter)]">
        <Link href="/" className="text-[0.95rem] font-bold uppercase tracking-[0.08em] text-ink">
          {site.brand}
          <span className="text-mint-deep">.</span>
        </Link>

        <nav className="hidden items-center gap-[clamp(18px,2.5vw,32px)] lg:flex" aria-label="Primary">
          {primaryNav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "relative text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                  isCurrent(pathname, item.href)
                    ? "text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-mint-deep"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search/"
            className="hidden text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-soft transition-colors hover:text-ink md:inline"
          >
            Search
          </Link>
          <Link href={ctaNav.href} className={cn(buttonClassName({ size: "sm" }), "hidden sm:inline-flex")}>
            {ctaNav.label}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-pill border border-border bg-surface text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <nav
        ref={panelRef}
        id={panelId}
        aria-label="Mobile"
        className={cn(
          "flex-col gap-2 border-t border-border bg-canvas-elevated px-[var(--page-gutter)] py-8 lg:hidden",
          open ? "flex" : "hidden",
        )}
      >
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
        <Link href="/search/" className="border-b border-border py-4 text-lg text-ink-soft" onClick={closeMenu}>
          Search
        </Link>
        <Link
          href={ctaNav.href}
          className={cn(buttonClassName({ size: "md" }), "mt-4 w-full")}
          onClick={closeMenu}
        >
          {ctaNav.label}
        </Link>
      </nav>
    </header>
  );
}
