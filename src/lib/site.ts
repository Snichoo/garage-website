import type { Metadata } from "next";

/**
 * Central site + business configuration.
 *
 * The public site URL is used for canonical tags, Open Graph URLs, the sitemap
 * and JSON-LD structured data. Override it per environment with the
 * NEXT_PUBLIC_SITE_URL variable (e.g. in .env.local or your host's dashboard).
 */
export const siteConfig = {
  /** Canonical, production origin. No trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sparrowgaragedoors.com").replace(
    /\/$/,
    "",
  ),
  name: "Sparrow Garage Doors",
  /** Short brand used as the title-tag suffix. */
  shortName: "Sparrow Garage Doors",
  /** Primary service region shown in default titles/descriptions. */
  primaryLocation: "Brisbane",
  description:
    "Local Brisbane garage door specialists. Installation, replacement and same-day repairs for sectional, roller and tilt doors, plus motors, springs and cables.",
  phoneDisplay: "07 3180 3857",
  phoneIntl: "+61731803857",
  email: "sparrowgaragedoors@gmail.com",
  /** Real photo used for JSON-LD business/article imagery. */
  ogImage: "/images/residential.webp",
  /** Dynamic branded social card endpoint (1200x630), used for OG/Twitter. */
  ogCard: "/og",
  ogCardAlt:
    "Sparrow Garage Doors: Garage Doors Brisbane, Installation, Replacement & Repairs",
  geo: { latitude: -27.4698, longitude: 153.0251 },
  areaServed: "Brisbane and South East Queensland",
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build a consistent Metadata object for a page. `title` is used verbatim as
 * the <title> (it is not run through the layout's brand-suffix template), so
 * pass the full, keyword-first title you want in the SERP.
 *
 * The OG/Twitter image points at the shared branded card served by the /og
 * endpoint (see app/og/route.tsx), so every page ships one 1200x630 image.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type ?? "website",
      url: absoluteUrl(opts.path),
      siteName: siteConfig.name,
      locale: "en_AU",
      title: opts.title,
      description: opts.description,
      images: [
        { url: siteConfig.ogCard, width: 1200, height: 630, alt: siteConfig.ogCardAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [siteConfig.ogCard],
    },
  };
}

type Json = Record<string, unknown>;

/**
 * Site-wide LocalBusiness schema. Rendered once in the root layout so every
 * page carries the business's NAP (name, phone, area served) for local search.
 */
export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl("/images/logo.png"),
    telephone: siteConfig.phoneIntl,
    email: siteConfig.email,
    description: siteConfig.description,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: { "@type": "State", name: "Greater Brisbane, Queensland" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

/** FAQPage schema built from a list of question/answer pairs. */
export function faqPageSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** BreadcrumbList schema. Pass ordered { name, path } crumbs. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** BlogPosting schema for individual articles. */
export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image: absoluteUrl(opts.image ?? siteConfig.ogImage),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@id": `${siteConfig.url}/#business` },
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}

/** Service schema, used on service + suburb pages to reinforce intent + area. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: { "@type": "Place", name: opts.areaServed ?? siteConfig.areaServed },
  };
}
