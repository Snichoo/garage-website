import type { Metadata } from "next";
import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";

export const metadata: Metadata = {
  title: "Garage Door Openers - Supply, Install & Repair | Sparrow Garage Doors",
  description:
    "Garage door opener supply, installation and repair across Brisbane. Motors, remotes, sensors and Wi-Fi upgrades for every door type and brand.",
};

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
  return <PartServicePage content={content} />;
}
