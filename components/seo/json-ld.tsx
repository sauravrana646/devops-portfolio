import { absoluteUrl } from "@/lib/site-url";
import { site } from "@/content/site";

export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: site.consultantName,
        url: absoluteUrl("/"),
        jobTitle: "Independent Platform / SRE / DevSecOps Consultant",
        email: site.email.includes("@") ? `mailto:${site.email}` : undefined,
        worksFor: { "@id": absoluteUrl("/#service") },
      },
      {
        "@type": "ProfessionalService",
        "@id": absoluteUrl("/#service"),
        name: site.brand,
        url: absoluteUrl("/"),
        description: site.description,
        areaServed: "Remote",
        serviceType: ["Platform engineering", "SRE", "DevSecOps", "Kubernetes consulting"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Person",
      name: site.consultantName,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}/`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
