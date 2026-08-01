import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Eyebrow, Heading } from "@/components/layout/heading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${site.brand}.`,
};

export default function TermsPage() {
  return (
    <section className="bg-[image:var(--gradient-hero)] py-16">
      <Container size="narrow">
        <Eyebrow>Terms</Eyebrow>
        <Heading level={1} className="mb-6">
          Site use & advice disclaimer
        </Heading>
        <div className="space-y-4 text-muted">
          <p>
            Content on this site is for general information about consulting services. It is not a
            substitute for a scoped statement of work, legal advice, or production runbooks for your
            environment.
          </p>
          <p>
            Engagements begin only after written scope and mutual agreement. Tool logos and anonymized
            case details are illustrative unless otherwise stated.
          </p>
          <p>
            Contact:{" "}
            <a className="font-semibold text-mint-deep" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
