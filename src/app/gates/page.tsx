import JsonLd from "@/components/JsonLd";
import { GatesLandingPage } from "@/components/lp/GatesLandingPage";
import { faqs } from "@/components/lp/gates-content";
import {
  breadcrumbSchema,
  faqPageSchema,
  getSiteConfig,
  pageMetadata,
  serviceSchema,
} from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "New Gates Brisbane | Sliding & Swing Gates Installed",
    description: `New driveway gates supplied and installed across Brisbane. Sliding and swing gates built to suit your property, with the motor, remotes and safety gear fitted as one complete package. Call ${cfg.phoneDisplay}.`,
    path: "/gates",
  });
}

export default async function GatesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gates", path: "/gates" },
          ]),
          await serviceSchema({
            name: "Automatic Gate Supply, Installation & Automation",
            description:
              "Supply, installation and automation of sliding, swing and telescopic driveway gates across Brisbane and South East Queensland.",
            path: "/gates",
          }),
          faqPageSchema(faqs),
        ]}
      />
      <GatesLandingPage />
    </>
  );
}
