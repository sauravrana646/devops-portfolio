import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <div data-pagefind-ignore>
        <SiteHeader />
      </div>
      <main id="main">{children}</main>
      <div data-pagefind-ignore>
        <SiteFooter />
      </div>
    </>
  );
}
