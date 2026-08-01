import { permanentRedirect } from "next/navigation";

/** Spec alias: `/work/` → `/projects/` */
export default function WorkRedirectPage() {
  permanentRedirect("/projects/");
}
