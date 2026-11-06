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
    title: "Gate Repairs & Automation Brisbane | Sliding & Swing Gates",
    description: `Gate repairs, servicing and automation across Brisbane. Sliding, swing and telescopic gates fixed on any brand, plus motors, remotes and safety beams fitted to the gate you already have. Call ${cfg.phoneDisplay}.`,
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
            name: "Gate Repairs, Servicing & Automation",
            description:
              "Repairs, servicing and automation of existing sliding, swing and telescopic driveway gates across Brisbane and South East Queensland.",
            path: "/gates",
          }),
          faqPageSchema(faqs),
        ]}
      />
      <GatesLandingPage />
    </>
  );
}
