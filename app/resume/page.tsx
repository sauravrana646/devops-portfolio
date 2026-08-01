import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { TextCta } from "@/components/marketing/text-cta";
import { buttonClassName } from "@/components/ui/button";
import { resumeContent } from "@/content/resume";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: resumeContent.lede,
};

export default function ResumePage() {
  return (
    <>
      <PageHero eyebrow="Resume" title={site.consultantName} lede={resumeContent.lede} />
      <Section className="!pt-8 print:hidden">
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}?subject=Resume%20PDF%20request`}
            className={buttonClassName({ variant: "primary" })}
          >
            Request PDF
          </a>
          <Link href="/contact/?intent=hiring" className={buttonClassName({ variant: "secondary" })}>
            Contact
          </Link>
        </div>
        <p className="mt-6 text-sm text-faint">
          {site.email} · {site.timezone} · remote
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[8fr_4fr]">
          <div>
            <SectionHeader eyebrow="Experience" title="Selected roles & outcomes." />
            {resumeContent.experience.map((role) => (
              <article key={role.period} className="border-t border-border py-6">
                <p className="mb-1.5 font-mono text-sm text-muted">{role.period}</p>
                <h2 className="mb-1 text-[length:var(--text-h3)] font-semibold text-ink">{role.title}</h2>
                <p className="mb-3 text-muted">{role.org.replace("[Brand]", site.brand)}</p>
                <ul className="list-none space-y-2 p-0">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-[22px] text-muted">
                      <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-mint" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <aside>
            <SectionHeader eyebrow="Skills" title="Capability groups." />
            {resumeContent.skills.map((skill) => (
              <div key={skill.title} className="mb-8">
                <h3 className="mb-2 text-[length:var(--text-h3)] font-medium text-ink">{skill.title}</h3>
                <p className="text-muted">{skill.body}</p>
              </div>
            ))}
            <p className="text-muted">
              See <TextCta href="/certifications/">certifications</TextCta> for verifiable links.
            </p>
          </aside>
        </div>
      </Section>

      <FinalCta
        title="Hiring or scoping a project?"
        body="Use contact for discovery—or request the PDF for ATS and internal sharing."
        primaryCta={{ href: "/contact/?intent=hiring", label: "Contact" }}
        secondaryCta={{ href: "/services/", label: "See services" }}
      />
    </>
  );
}
