import type { Metadata } from "next";
import { SearchBox } from "@/components/blog/search-box";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Search",
  description: "Search notes, case studies, and architecture writeups.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find a constraint, pattern, or note."
        lede="Pagefind indexes the static export after build. Results stay on-device—no third-party search box."
      />
      <Section>
        <div className="max-w-2xl">
          <SearchBox />
        </div>
      </Section>
    </>
  );
}
