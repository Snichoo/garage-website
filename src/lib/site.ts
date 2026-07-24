import type { Metadata } from "next";
import { getContent } from "./content";

/**
 * Central site + business configuration.
 *
 * Static, deploy-time values (canonical URL, OG card path, coordinates) live
 * in `siteConfig`. Business fields (name, phone, email, ...) come from the
 * editable content store and are resolved with the async `getSiteConfig()`,
 * so changes made in the admin dashboard flow into page metadata, JSON-LD and
 * the sitemap as well as the visible pages.
 *
 * Server-side only: do not import this module from client components.
 * The public site URL can be overridden per environment with the
 * NEXT_PUBLIC_SITE_URL variable (e.g. in .env.local or your host's dashboard).
 */
export const siteConfig = {
  /** Canonical, production origin. No trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sparrowgaragedoors.com").replace(
    /\/$/,
    "",
  ),
  /** Real photo used for JSON-LD business/article imagery. */
  ogImage: "/images/residential.webp",
  /** Dynamic branded social card endpoint (1200x630), used for OG/Twitter. */
  ogCard: "/og",
  geo: { latitude: -27.4698, longitude: 153.0251 },
};

export type ResolvedSiteConfig = typeof siteConfig & {
  name: string;
  shortName: string;
  primaryLocation: string;
  description: string;
  phoneDisplay: string;
  phoneLink: string;
  phoneIntl: string;
  email: string;
  logo: string;
  ogCardAlt: string;
  areaServed: string;
};

/** Static config plus the editable business fields from the content store. */
export async function getSiteConfig(): Promise<ResolvedSiteConfig> {
  const { business } = await getContent();
  const digits = business.phoneLink.replace(/\D/g, "");
  return {
    ...siteConfig,
    name: business.name,
    shortName: business.name,
    primaryLocation: business.primaryLocation,
    description: business.description,
    phoneDisplay: business.phoneDisplay,
    phoneLink: business.phoneLink,
    phoneIntl: digits.startsWith("0") ? `+61${digits.slice(1)}` : `+${digits}`,
    email: business.email,
    logo: business.logo,
    ogCardAlt: `${business.name}: Garage Doors ${business.primaryLocation}, Installation, Replacement & Repairs`,
    areaServed: business.areaServed,
  };
}

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
export async function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Promise<Metadata> {
  const cfg = await getSiteConfig();
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type ?? "website",
      url: absoluteUrl(opts.path),
      siteName: cfg.name,
      locale: "en_AU",
      title: opts.title,
      description: opts.description,
      images: [
        { url: cfg.ogCard, width: 1200, height: 630, alt: cfg.ogCardAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [cfg.ogCard],
    },
  };
}

type Json = Record<string, unknown>;

/**
 * Site-wide LocalBusiness schema. Rendered once in the root layout so every
 * page carries the business's NAP (name, phone, area served) for local search.
 */
export async function localBusinessSchema(): Promise<Json> {
  const cfg = await getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${cfg.url}/#business`,
    name: cfg.name,
    url: cfg.url,
    image: absoluteUrl(cfg.ogImage),
    logo: absoluteUrl(cfg.logo),
    telephone: cfg.phoneIntl,
    email: cfg.email,
    description: cfg.description,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cfg.geo.latitude,
      longitude: cfg.geo.longitude,
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
export async function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}): Promise<Json> {
  const cfg = await getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image: absoluteUrl(opts.image ?? cfg.ogImage),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Organization", name: cfg.name, url: cfg.url },
    publisher: { "@id": `${cfg.url}/#business` },
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}

/** Service schema, used on service + suburb pages to reinforce intent + area. */
export async function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}): Promise<Json> {
  const cfg = await getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": `${cfg.url}/#business` },
    areaServed: { "@type": "Place", name: opts.areaServed ?? cfg.areaServed },
  };
}
