import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Eyebrow, Heading } from "@/components/layout/heading";
import { Stack } from "@/components/layout/stack";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function DesignGalleryPage() {
  return (
    <Container className="py-[var(--section-y)]">
      <FadeIn y={18}>
        <Eyebrow>Internal</Eyebrow>
        <Heading level={1} className="mb-3">
          Design primitives
        </Heading>
        <p className="mb-12 max-w-2xl text-[var(--color-muted)]">
          Pastel mint tokens, fluent type, and shell components. Not linked in primary marketing IA.
        </p>
      </FadeIn>

      <FadeIn>
      <Stack gap={10}>
        <section>
          <Heading level={3} className="mb-4">
            Buttons
          </Heading>
          <Stack gap={3} horizontal>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </Stack>
        </section>

        <section>
          <Heading level={3} className="mb-4">
            Links
          </Heading>
          <Stack gap={2}>
            <TextLink href="/">Brand home link</TextLink>
            <TextLink href="/about/" muted>
              Muted nav-style link
            </TextLink>
          </Stack>
        </section>

        <section>
          <Heading level={3} className="mb-4">
            Type scale
          </Heading>
          <Stack gap={3}>
            <Heading level={1}>Display large</Heading>
            <Heading level={2}>Display medium</Heading>
            <Heading level={3}>Section title</Heading>
            <p className="font-serif text-2xl text-[var(--color-ink)]">
              Serif pull quote for testimonials.
            </p>
            <p className="text-[var(--color-muted)]">Body muted copy for supporting sentences.</p>
          </Stack>
        </section>

        <section>
          <Heading level={3} className="mb-4">
            Surfaces
          </Heading>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
              Surface
            </div>
            <div className="rounded-[var(--radius-lg)] bg-[var(--color-mint-soft)] p-6">Mint soft</div>
            <div className="rounded-[var(--radius-lg)] bg-[var(--color-butter)] p-6">Butter</div>
          </div>
        </section>
      </Stack>
      </FadeIn>
    </Container>
  );
}
