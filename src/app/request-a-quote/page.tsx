import EnquiryPage, { type EnquiryPageContent } from "@/components/EnquiryPage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: `Request a Quote | ${cfg.name} ${cfg.primaryLocation}`,
    description: `Request a free quote for garage doors, gates, repairs or automation across ${cfg.primaryLocation}. No call-out fee and upfront fixed pricing. Call ${cfg.phoneDisplay} or send your details.`,
    path: "/request-a-quote",
  });
}

const content: EnquiryPageContent = {
  titleHighlight: "Request",
  titleRest: "A Free Quote",
  intro:
    "Tell us what you need and we'll come back with a straight, fixed price. New doors and gates include a free on-site measure, and there is never a call-out fee.",
  heroImage: "/images/contact-bg.avif",
  formTitle: "Get Your",
  formTitleHighlight: "Free Quote",
  formText:
    "Send through your details and a short description of the job. The more you can tell us about the door or gate, the more accurate we can be before we even arrive.",
  submitLabel: "Request my free quote",
  steps: [
    {
      title: "We read your enquiry",
      text: "One of our two managers goes over the details you sent, usually within a couple of hours.",
    },
    {
      title: "We come back with a price",
      text: "For most repairs we can quote over the phone. For new doors and gates we book a free on-site measure so the price is exact.",
    },
    {
      title: "You decide, no pressure",
      text: "The quote is fixed and itemised. If you go ahead, we lock in a time that suits you.",
    },
  ],
  callPrompt: "Prefer to talk it through?",
};

export default async function RequestAQuotePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
            { name: "Request a Quote", path: "/request-a-quote" },
          ]),
        ]}
      />
      <EnquiryPage content={content} />
    </>
  );
}
