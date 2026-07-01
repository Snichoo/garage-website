import type { Metadata } from "next";
import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, siteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Garage Door Openers & Motors Brisbane | Supply & Repair",
  description: `Garage door opener and motor supply, installation and repair across Brisbane. Motors, remotes, sensors and Wi-Fi upgrades for every door type and brand. Call ${siteConfig.phoneDisplay}.`,
  path: "/openers",
});

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Openers",
  intro:
    "Your opener is the motor, the brain and the convenience of your garage. Whether the remote stopped working, the door reverses halfway, or you want to upgrade to Wi-Fi, we supply, install and repair openers from every major brand.",
  heroIcon: "/images/icons/help-openers.png",
  heroIconAlt: "Garage door opener remote icon",
  heroImage: "/images/openers-hero.webp",
  heroImageAlt: "Hand holding a garage door opener remote with a modern home in the background",
  heroBullets: [
    "All major brands: B&D, Merlin, Centurion, Steel-Line, Chamberlain.",
    "Belt, chain, screw and jackshaft motors fitted same-day.",
    "Remotes, keypads, Wi-Fi modules and safety sensors in stock.",
  ],
};

export default function OpenersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Garage Door Openers", path: "/openers" },
          ]),
          serviceSchema({
            name: "Garage Door Opener & Motor Supply, Installation & Repair",
            description:
              "Supply, installation and repair of garage door openers and motors across Brisbane and South East Queensland.",
            path: "/openers",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
