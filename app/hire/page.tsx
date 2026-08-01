import { permanentRedirect } from "next/navigation";

export default function HireRedirectPage() {
  permanentRedirect("/contact/");
}
