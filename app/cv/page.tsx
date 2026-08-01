import { permanentRedirect } from "next/navigation";

export default function CvRedirectPage() {
  permanentRedirect("/resume/");
}
