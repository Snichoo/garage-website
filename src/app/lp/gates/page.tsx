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
      absolute: `Gate Repairs & Automation Brisbane | ${business.name}`,
    },
    description: `Sliding, swing and telescopic driveway gates repaired, serviced and automated across Brisbane. Gate, motor and safety gear sorted by one team in one fixed quote. $0 call out. Call ${business.phoneDisplay}.`,
    alternates: { canonical: "/gates" },
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function GatesLandingPage() {
  return <GatesLandingPageContent />;
}
