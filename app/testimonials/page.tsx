import type { Metadata } from "next";
import { ComingSoon } from "@/components/marketing/coming-soon";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client testimonials will appear here when approved quotes are available.",
};

export default function TestimonialsPage() {
  return (
    <ComingSoon
      eyebrow="Social proof"
      title="Testimonials coming soon"
      body="I only publish quotes with permission. Approved testimonials will land here—no composites presented as praise."
    />
  );
}
