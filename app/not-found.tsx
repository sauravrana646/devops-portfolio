import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-content-center gap-4 px-[var(--page-gutter)] py-20 text-center">
      <p className="text-[clamp(4rem,12vw,7rem)] font-bold tracking-[-0.04em] text-mint">404</p>
      <p className="text-lg font-bold uppercase tracking-[0.08em] text-ink">
        {site.brand}
        <span className="text-mint-deep">.</span>
      </p>
      <p className="mx-auto max-w-md text-muted">
        This route isn’t in the map. Head home or start a conversation.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={buttonClassName({ variant: "primary" })}>
          Home
        </Link>
        <Link href="/contact/" className={buttonClassName({ variant: "secondary" })}>
          Contact
        </Link>
      </div>
    </section>
  );
}
