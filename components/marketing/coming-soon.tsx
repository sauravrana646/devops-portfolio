import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Eyebrow, Heading } from "@/components/layout/heading";
import { buttonClassName } from "@/components/ui/button";

export function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="bg-[image:var(--gradient-hero)]">
      <Container className="flex min-h-[50vh] flex-col justify-center py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={1} className="mb-4 max-w-[16ch]">
          {title}
        </Heading>
        <p className="mb-8 max-w-xl text-lg text-muted">{body}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact/" className={buttonClassName({ variant: "primary" })}>
            Reach out
          </Link>
          <Link href="/" className={buttonClassName({ variant: "secondary" })}>
            Back home
          </Link>
        </div>
      </Container>
    </section>
  );
}
