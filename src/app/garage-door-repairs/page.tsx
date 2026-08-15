import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door Repairs Brisbane | All Brands, Fixed Fast",
    description: `Garage door repairs across Brisbane. Noisy, slow, crooked or half-opening doors fixed on sectional, roller and tilt doors, every major brand. Upfront pricing, call ${cfg.phoneDisplay}.`,
    path: "/garage-door-repairs",
  });
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Repairs",
  intro:
    "Grinding on the way up, stopping halfway, sitting crooked in the opening or shaking the whole house every time it runs? Those are all signs of a door that needs attention now rather than after it fails completely.",
  introExtra:
    "We repair every common garage door and brand across Brisbane, from worn rollers and bent tracks to cracked panels, tired motors and sensors that have drifted out of alignment. Most jobs are diagnosed and finished in a single visit.",
  heroIcon: "/images/icons/help-maintenance.png",
  heroIconAlt: "Garage door repair icon",
  heroImage: "/images/gallery/03-5.jpg",
  heroImageAlt: "Charcoal sectional garage door repaired and running smoothly on a Brisbane home",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Sectional, roller and tilt doors on every major brand.",
    "Rollers, hinges, tracks, panels, motors and sensors.",
    "Upfront fixed pricing with no call-out fee.",
  ],
  services: [
    "Roller & Hinge Replacement",
    "Track Realignment",
    "Panel Replacement",
    "Motor Repair",
    "Sensor & Remote Fix",
    "Full Door Service",
  ],
};

export default async function GarageDoorRepairsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Repairs", path: "/repairs" },
            { name: "Garage Door Repairs", path: "/garage-door-repairs" },
          ]),
          await serviceSchema({
            name: "Garage Door Repairs",
            description:
              "Repair of sectional, roller and tilt garage doors across Brisbane and South East Queensland, including rollers, tracks, panels, motors and sensors.",
            path: "/garage-door-repairs",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
