import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import QuoteModal from "@/components/QuoteModal";
import ScrollAnimator from "@/components/ScrollAnimator";
import JsonLd from "@/components/JsonLd";
import { siteConfig, localBusinessSchema } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Garage Doors ${siteConfig.primaryLocation} | Installation, Replacement & Repairs`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "garage doors Brisbane",
    "garage door repairs Brisbane",
    "garage door installation Brisbane",
    "garage door replacement",
    "roller doors Brisbane",
    "sectional garage doors",
    "tilt garage doors",
    "garage door motors",
    "garage door springs",
    "emergency garage door repairs",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `Garage Doors ${siteConfig.primaryLocation} | Installation, Replacement & Repairs`,
    description: siteConfig.description,
    images: [
      { url: siteConfig.ogCard, width: 1200, height: 630, alt: siteConfig.ogCardAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Garage Doors ${siteConfig.primaryLocation} | Installation, Replacement & Repairs`,
    description: siteConfig.description,
    images: [siteConfig.ogCard],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${dmSans.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={localBusinessSchema()} />
        {children}
        <QuoteModal />
        <ScrollAnimator />
      </body>
    </html>
  );
}
