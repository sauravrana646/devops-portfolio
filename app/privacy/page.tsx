import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Eyebrow, Heading } from "@/components/layout/heading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy practices for ${site.brand}.`,
};

export default function PrivacyPage() {
  const hasPlausible = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  const hasFormspree = Boolean(process.env.NEXT_PUBLIC_FORMSPREE_ID);

  return (
    <section className="bg-[image:var(--gradient-hero)] py-16">
      <Container size="narrow">
        <Eyebrow>Privacy</Eyebrow>
        <Heading level={1} className="mb-6">
          How this site handles information
        </Heading>
        <div className="space-y-4 text-muted">
          <p>
            This is a static marketing site. No advertising cookies are used.
            {hasPlausible
              ? " Analytics use privacy-friendly Plausible (cookieless pageviews)."
              : " Analytics are disabled until a Plausible domain is configured."}
          </p>
          <p>
            {hasFormspree
              ? "Contact form submissions are processed by Formspree and used only to respond to engagement inquiries."
              : "Contact form submissions open a mailto draft in your email client when Formspree is not configured."}{" "}
            Messages are not sold or used for advertising.
          </p>
          <p>
            Search runs entirely in your browser via a Pagefind index shipped with the static site—query text is not
            sent to a third-party search API.
          </p>
          <p>
            Questions:{" "}
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
