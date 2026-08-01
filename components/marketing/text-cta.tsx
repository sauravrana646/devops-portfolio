import Link from "next/link";

export function TextCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-mint-deep transition-colors hover:text-ink">
      {children}
    </Link>
  );
}
