import { Container } from "@/components/layout/container";
import { Eyebrow, Heading } from "@/components/layout/heading";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="bg-[image:var(--gradient-hero)] pb-10 pt-16 md:pb-14 md:pt-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={1} className="mb-4 max-w-[18ch] text-[length:var(--text-display-lg)]">
          {title}
        </Heading>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
      </Container>
    </section>
  );
}
