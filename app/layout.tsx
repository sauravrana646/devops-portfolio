import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { Plausible } from "@/components/analytics/plausible";
import { SiteShell } from "@/components/layout/site-shell";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.brand} · Platform & reliability consulting`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: site.brand,
    title: `${site.brand} · Platform & reliability consulting`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} · Platform & reliability consulting`,
    description: site.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <SiteJsonLd />
        <Plausible />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
