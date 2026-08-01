import { permanentRedirect } from "next/navigation";

/** Spec alias: `/case-studies/` → `/projects/` */
export default function CaseStudiesRedirectPage() {
  permanentRedirect("/projects/");
}
