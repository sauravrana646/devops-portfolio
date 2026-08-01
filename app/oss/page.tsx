import { permanentRedirect } from "next/navigation";

export default function OssRedirectPage() {
  permanentRedirect("/open-source/");
}