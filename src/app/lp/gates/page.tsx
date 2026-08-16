import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import {
  GatesLandingPage as GatesLandingPageContent,
} from "@/components/lp/GatesLandingPage";

/**
 * Paid-traffic landing page for gate campaigns.
 *
 * It is deliberately kept out of the sitemap and marked noindex because this
 * paid campaign page overlaps the organic gate service pages. Ads can still
 * crawl and serve it.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { business } = await getContent();
  return {
    title: {
      absolute: `Automatic Gates Brisbane | Installed & Automated | ${business.name}`,
    },
    description: `Sliding, swing and telescopic driveway gates supplied, installed and automated across Brisbane. Gate, motor, power and safety gear in one fixed quote. $0 call out, free on-site measure. Call ${business.phoneDisplay}.`,
    alternates: { canonical: "/gates" },
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function GatesLandingPage() {
  return <GatesLandingPageContent />;
}
