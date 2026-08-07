import { ctaNav, footerNav, primaryNav } from "@/content/site";

export type CommandItem = {
  id: string;
  label: string;
  href?: string;
  keywords?: string;
  group: "Navigate" | "Actions";
  action?: "theme-light" | "theme-dark" | "theme-system";
};

function dedupe(items: CommandItem[]): CommandItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.href ?? item.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getCommandItems(): CommandItem[] {
  const navigate: CommandItem[] = [
    ...primaryNav.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      href: item.href,
      keywords: item.label.toLowerCase(),
      group: "Navigate" as const,
    })),
    {
      id: "nav-contact",
      label: ctaNav.label,
      href: ctaNav.href,
      keywords: "contact reach hire email",
      group: "Navigate",
    },
    {
      id: "nav-search",
      label: "Search",
      href: "/search/",
      keywords: "find pagefind",
      group: "Navigate",
    },
    ...Object.values(footerNav)
      .flat()
      .map((item) => ({
        id: `footer-${item.href}`,
        label: item.label,
        href: item.href,
        keywords: item.label.toLowerCase(),
        group: "Navigate" as const,
      })),
  ];

  const actions: CommandItem[] = [
    {
      id: "theme-light",
      label: "Theme: Light",
      keywords: "appearance day",
      group: "Actions",
      action: "theme-light",
    },
    {
      id: "theme-dark",
      label: "Theme: Dark",
      keywords: "appearance night",
      group: "Actions",
      action: "theme-dark",
    },
    {
      id: "theme-system",
      label: "Theme: System",
      keywords: "appearance auto",
      group: "Actions",
      action: "theme-system",
    },
  ];

  return [...dedupe(navigate), ...actions];
}

export function filterCommandItems(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const hay = `${item.label} ${item.keywords ?? ""} ${item.href ?? ""}`.toLowerCase();
    return hay.includes(q);
  });
}
