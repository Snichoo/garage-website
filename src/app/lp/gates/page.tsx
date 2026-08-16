import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { LpHeader } from "@/components/lp/LpHeader";
import { LpFooter } from "@/components/lp/LpFooter";
import { Hero } from "@/components/lp/Hero";
import { Process } from "@/components/lp/Process";
import { Services } from "@/components/lp/Services";
import { WhyChooseUs } from "@/components/lp/WhyChooseUs";
import { OwnerSection } from "@/components/lp/OwnerSection";
import { ServiceAreas } from "@/components/lp/ServiceAreas";
import { TestimonialStrip } from "@/components/lp/TestimonialStrip";
import { Faq } from "@/components/lp/Faq";
import { faqs, testimonials } from "@/components/lp/gates-content";

/**
 * Paid-traffic landing page for gate campaigns.
 *
 * It is deliberately kept out of the sitemap and marked noindex: it targets the
 * same keywords as /gates, so letting both into the index would split the
 * organic signal. Ads can still crawl and serve it.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { business } = await getContent();
  return {
    title: {
      absolute: `Automatic Gates Brisbane | Installed & Automated | ${business.name}`,
    },
    description: `Sliding, swing and telescopic driveway gates supplied, installed and automated across Brisbane. Gate, motor, power and safety gear in one fixed quote. $0 call out, free on-site measure. Call ${business.phoneDisplay}.`,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function GatesLandingPage() {
  const { business, footer } = await getContent();

  const phone = { display: business.phoneDisplay, link: business.phoneLink };
  const hoursShort = "Open 7 days · Around the clock";

  return (
    <>
      <LpHeader hours={hoursShort} />

      <main className="flex-1">
        <Hero phone={phone} />

        <Process phone={phone} />

        {/* Reviews sit on the seam between two sections, so each strip paints
            the colour of the section it drops into. */}
        <TestimonialStrip testimonial={testimonials[0]} className="-mt-[40px] mb-10" />

        <Services />

        <WhyChooseUs />

        <TestimonialStrip
          testimonial={testimonials[1]}
          className="-mt-[40px] -mb-[32px] bg-black"
          backgroundClassName="bg-black"
          tone="dark"
        />

        <OwnerSection
          phone={phone}
          businessName={business.name}
        />

        <ServiceAreas />

        <Faq items={faqs} />
      </main>

      <LpFooter business={business} footer={footer} />
    </>
  );
}
