import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { AmbientBackground } from "@/components/motion/ambient-background";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CommandPaletteHost } from "@/components/widgets/command-palette-host";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <AmbientBackground />
        <ScrollProgress />
        <SkipLink />
        <div data-pagefind-ignore>
          <SiteHeader />
        </div>
        <main id="main" className="relative">
          {children}
        </main>
        <div data-pagefind-ignore>
          <SiteFooter />
        </div>
        <CommandPaletteHost />
      </MotionProvider>
    </ThemeProvider>
  );
}
