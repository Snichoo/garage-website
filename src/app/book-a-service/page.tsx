import EnquiryPage, { type EnquiryPageContent } from "@/components/EnquiryPage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: `Book a Service | ${cfg.name} ${cfg.primaryLocation}`,
    description: `Book a garage door or gate service across ${cfg.primaryLocation}. Annual servicing, repairs and safety inspections, often available same day. Call ${cfg.phoneDisplay} or book online.`,
    path: "/book-a-service",
  });
}

const content: EnquiryPageContent = {
  titleHighlight: "Book",
  titleRest: "A Service",
  intro:
    "Due for an annual service, or something needs fixing? Send through your details and a preferred day, and we'll confirm a time that works. Same-day slots are often available.",
  heroImage: "/images/contact-bg.avif",
  formTitle: "Book Your",
  formTitleHighlight: "Service",
  formText:
    "Let us know what the door or gate is doing and which days suit you. If it is an emergency, please call us instead so we can get someone out straight away.",
  submitLabel: "Book my service",
  steps: [
    {
      title: "Tell us what's happening",
      text: "A quick description of the fault or the service you're after, plus the days that suit you.",
    },
    {
      title: "We confirm your time",
      text: "We'll call or email back within one business day to lock in a slot, often the same or next day.",
    },
    {
      title: "We come to you",
      text: "Our technician arrives with the common parts on board, so most jobs are finished in a single visit.",
    },
  ],
  callPrompt: "Need us today?",
};

export default async function BookAServicePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
            { name: "Book a Service", path: "/book-a-service" },
          ]),
        ]}
      />
      <EnquiryPage content={content} />
    </>
  );
}
