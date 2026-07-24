import type { Metadata } from "next";
import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
  title: "Garage Door Cable Repairs Brisbane | Fast Replacement",
  description: `Frayed or snapped garage door cable? We replace lift and safety cables across Brisbane to stop your door dropping or jamming. Same-day repairs, call ${cfg.phoneDisplay}.`,
  path: "/cables",
});
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Cables",
  intro:
    "If your garage door suddenly looks crooked or refuses to open properly, don't force it. A frayed or broken cable is often the problem that isn't obvious. Cables do the hard work behind the scenes, working with the springs to safely open and close the door. When one of them fails, the whole system becomes unstable.",
  introExtra:
    "Professional cable replacement brings things back into balance, protects the rest of the door, and stops more damage. Act quickly and you can avoid paying for bigger repairs later.",
  heroIcon: "/images/icons/help-cables.png",
  heroIconAlt: "Garage door cable icon",
  heroImage: "/images/cables-hero.webp",
  heroImageAlt: "Garage door lifting cable wrapped around its drum",
  heroBullets: [
    "Lift cables, safety cables and counterweight cables fitted same-day.",
    "Matched gauge and breaking strain for your door's exact weight.",
    "Drum, bracket and end-stop inspection included with every cable job.",
  ],
};

export default async function CablesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Garage Door Cables", path: "/cables" },
          ]),
          await serviceSchema({
            name: "Garage Door Cable Replacement",
            description:
              "Lift and safety cable repair and replacement for garage doors across Brisbane and South East Queensland.",
            path: "/cables",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
