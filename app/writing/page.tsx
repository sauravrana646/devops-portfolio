import { permanentRedirect } from "next/navigation";

export default function WritingRedirectPage() {
  permanentRedirect("/blog/");
}
