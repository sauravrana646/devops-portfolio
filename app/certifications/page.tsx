import type { Metadata } from "next";
import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Verifiable credentials will be listed here when available.",
};

export default function CertificationsPage() {
  return (
    <ComingSoon
      eyebrow="Credentials"
      title="Certifications coming soon"
      body="I’m not listing credentials I can’t verify yet. When I add certifications, each entry will include an external verification link."
    />
  );
}
