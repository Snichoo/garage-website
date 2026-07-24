import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import QuoteModal from "@/components/QuoteModal";
import ScrollAnimator from "@/components/ScrollAnimator";
import JsonLd from "@/components/JsonLd";
import { ContentProvider } from "@/components/ContentProvider";
import { getContent } from "@/lib/content";
import { getSiteConfig, localBusinessSchema } from "@/lib/site";
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

/**
 * Google Tag Manager container. Override per environment with NEXT_PUBLIC_GTM_ID
 * (e.g. to point a staging deploy at a different container).
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PM22WN57";

export function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata();
}

async function buildRootMetadata(): Promise<Metadata> {
  const cfg = await getSiteConfig();
  return {
    metadataBase: new URL(cfg.url),
  title: {
    default: `Garage Doors ${cfg.primaryLocation} | Installation, Replacement & Repairs`,
    template: `%s | ${cfg.shortName}`,
  },
  description: cfg.description,
  applicationName: cfg.name,
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
  authors: [{ name: cfg.name }],
  creator: cfg.name,
  publisher: cfg.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: cfg.url,
    siteName: cfg.name,
    title: `Garage Doors ${cfg.primaryLocation} | Installation, Replacement & Repairs`,
    description: cfg.description,
    images: [
      { url: cfg.ogCard, width: 1200, height: 630, alt: cfg.ogCardAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Garage Doors ${cfg.primaryLocation} | Installation, Replacement & Repairs`,
    description: cfg.description,
    images: [cfg.ogCard],
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
  // Icons are provided by the app/ file conventions (favicon.ico, icon.png,
  // apple-icon.png), which Next renders as the correct <link> tags. Keeping
  // them there (not here) avoids the file convention silently overriding a
  // config block, and ensures Google sees a large 512px PNG icon.
    manifest: "/favicon/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${dmSans.variable} ${sora.variable}`}>
      <head>
        {/*
          Google Tag Manager. Rendered as a plain inline script (rather than
          next/script) so the container is in the <head> of the HTML the browser
          receives, as Google's install instructions require, instead of being
          injected after hydration. The snippet loads gtm.js asynchronously, so
          it does not block rendering.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ContentProvider content={await getContent()}>
          <JsonLd data={await localBusinessSchema()} />
          {children}
          <QuoteModal />
          <ScrollAnimator />
        </ContentProvider>
      </body>
    </html>
  );
}
