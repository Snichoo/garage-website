import type { Metadata } from "next";

/**
 * Central site + business configuration.
 *
 * The public site URL is used for canonical tags, Open Graph URLs, the sitemap
 * and JSON-LD structured data. Override it per environment with the
 * NEXT_PUBLIC_SITE_URL variable (e.g. in .env.local or your host's dashboard).
 */
import { getContent } from "./content";

/**
 * Business fields (name, phone, email, ...) are getters backed by the
 * editable content store, so changes made in the admin dashboard flow into
 * page metadata, JSON-LD and the sitemap as well as the visible pages.
 * Server-side only: do not import this module from client components.
 */
export const siteConfig = {
  /** Canonical, production origin. No trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sparrowgaragedoors.com").replace(
    /\/$/,
    "",
  ),
  get name() {
    return getContent().business.name;
  },
  /** Short brand used as the title-tag suffix. */
  get shortName() {
    return getContent().business.name;
  },
  /** Primary service region shown in default titles/descriptions. */
  get primaryLocation() {
    return getContent().business.primaryLocation;
  },
  get description() {
    return getContent().business.description;
  },
  get phoneDisplay() {
    return getContent().business.phoneDisplay;
  },
  get phoneIntl() {
    const digits = getContent().business.phoneLink.replace(/\D/g, "");
    return digits.startsWith("0") ? `+61${digits.slice(1)}` : `+${digits}`;
  },
  get email() {
    return getContent().business.email;
  },
  get logo() {
    return getContent().business.logo;
  },
  /** Real photo used for JSON-LD business/article imagery. */
  ogImage: "/images/residential.webp",
  /** Dynamic branded social card endpoint (1200x630), used for OG/Twitter. */
  ogCard: "/og",
  get ogCardAlt() {
    const { name, primaryLocation } = getContent().business;
    return `${name}: Garage Doors ${primaryLocation}, Installation, Replacement & Repairs`;
  },
  geo: { latitude: -27.4698, longitude: 153.0251 },
  get areaServed() {
    return getContent().business.areaServed;
  },
};

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
    logo: absoluteUrl(siteConfig.logo),
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

export { faqPageSchema } from "./faqSchema";

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
