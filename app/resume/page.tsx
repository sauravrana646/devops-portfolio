import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { buttonClassName } from "@/components/ui/button";
import { resumeContent } from "@/content/resume";
import { site } from "@/content/site";
import { withBasePath } from "@/lib/paths";

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
            href={withBasePath("/resume.pdf")}
            className={buttonClassName({ variant: "primary" })}
            download
          >
            Download PDF
          </a>
          <Link href="/contact/?intent=hiring" className={buttonClassName({ variant: "secondary" })}>
            Contact
          </Link>
        </div>
        <p className="mt-6 text-sm text-faint">
          {site.email} · {site.timezone} · India ·{" "}
          <a className="font-semibold text-mint-deep" href={site.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[8fr_4fr]">
          <div>
            <SectionHeader eyebrow="Experience" title="Roles & outcomes." />
            {resumeContent.experience.map((role) => (
              <article key={`${role.period}-${role.title}`} className="border-t border-border py-6">
                <p className="mb-1.5 font-mono text-sm text-muted">{role.period}</p>
                <h2 className="mb-1 text-[length:var(--text-h3)] font-semibold text-ink">{role.title}</h2>
                <p className="mb-3 text-muted">{role.org}</p>
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

            <SectionHeader eyebrow="Education" title="Foundation." className="mt-10" />
            {resumeContent.education.map((item) => (
              <article key={item.period} className="border-t border-border py-6">
                <p className="mb-1.5 font-mono text-sm text-muted">{item.period}</p>
                <h2 className="mb-1 text-[length:var(--text-h3)] font-semibold text-ink">{item.title}</h2>
                <p className="text-muted">{item.org}</p>
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
          </aside>
        </div>
      </Section>

      <FinalCta
        title="Hiring or scoping DevOps / cloud work?"
        body="Reach out for a conversation—or download the PDF for ATS and internal sharing."
        primaryCta={{ href: "/contact/?intent=hiring", label: "Contact" }}
        secondaryCta={{ href: "/projects/", label: "See projects" }}
      />
    </>
  );
}
