import type { Metadata } from "next";
import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, siteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
  title: "Garage Door Spring Repairs Brisbane | Replacement Service",
  description: `Broken garage door spring? We replace torsion and extension springs across Brisbane to restore balance and safe, quiet operation. Same-day service, call ${siteConfig.phoneDisplay}.`,
  path: "/springs",
});
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Springs",
  intro:
    "One minute your garage door works fine, and the next it won't open or closes on its own. Worn or broken springs are often to blame. Replacing your garage door springs on time brings back balance, safety and reliable operation, stopping more damage to your door or opener.",
  introExtra:
    "We at Sparrow Garage Doors are experts at replacing garage springs for both homes and businesses. We make sure your door works safely and well across Brisbane and South East Queensland.",
  heroIcon: "/images/icons/help-springs.png",
  heroIconAlt: "Garage door spring icon",
  heroImage: "/images/springs-hero.webp",
  heroImageAlt: "Technician performing a garage door spring replacement",
  heroBullets: [
    "Torsion and extension springs for every door type and weight.",
    "Same-day replacements with high-cycle, Australian-standard parts.",
    "Balance, tension and safety checks included on every job.",
  ],
};

export default function SpringsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Garage Door Springs", path: "/springs" },
          ]),
          serviceSchema({
            name: "Garage Door Spring Replacement",
            description:
              "Torsion and extension spring repair and replacement for garage doors across Brisbane and South East Queensland.",
            path: "/springs",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
