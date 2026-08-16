import { getContent } from "@/lib/content";
import { LpHeader } from "./LpHeader";
import { LpFooter } from "./LpFooter";
import { Hero } from "./Hero";
import { Process } from "./Process";
import { Services } from "./Services";
import { WhyChooseUs } from "./WhyChooseUs";
import { OwnerSection } from "./OwnerSection";
import { ServiceAreas } from "./ServiceAreas";
import { TestimonialStrip } from "./TestimonialStrip";
import { Faq } from "./Faq";
import { faqs, testimonials } from "./gates-content";

/** Shared page body for the public Gates page and the paid-traffic URL. */
export async function GatesLandingPage() {
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
        <TestimonialStrip
          testimonial={testimonials[0]}
          className="-mt-[40px] mb-10"
        />

        <Services />

        <WhyChooseUs />

        <TestimonialStrip
          testimonial={testimonials[1]}
          className="-mt-[40px] -mb-[32px] bg-black"
          backgroundClassName="bg-black"
          tone="dark"
        />

        <OwnerSection phone={phone} businessName={business.name} />

        <ServiceAreas />

        <Faq items={faqs} />
      </main>

      <LpFooter business={business} footer={footer} />
    </>
  );
}
