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
    default: `${site.brand} | DevOps and Cloud Engineer`,
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
    title: `${site.brand} | DevOps and Cloud Engineer`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} | DevOps and Cloud Engineer`,
    description: site.description,
  },

  icons: {
    // Absolute URLs required: with basePath (/devops-portfolio), a leading "/icon.svg"
    // resolves against the github.io origin and 404s (drops the project path).
    icon: [
      { url: absoluteUrl("/favicon.ico"), sizes: "any" },
      { url: absoluteUrl("/favicon-32.png"), type: "image/png", sizes: "32x32" },
      { url: absoluteUrl("/icon.svg"), type: "image/svg+xml" },
    ],
    apple: [{ url: absoluteUrl("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-canvas font-sans antialiased">
        <SiteJsonLd />
        <Plausible />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
