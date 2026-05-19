import type { Metadata } from "next";
import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";

export const metadata: Metadata = {
  title: "Garage Door Springs - Repair & Replacement | Sparrow Garage Doors",
  description:
    "Torsion and extension spring repair and replacement across Brisbane. Restore balance, fix loud bangs, and keep your garage door operating safely.",
};

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Springs",
  intro:
    "One minute your garage door works fine, and the next it won't open or closes on its own. Worn or broken springs are often to blame. Replacing your garage door springs on time brings back balance, safety and reliable operation, stopping more damage to your door or opener.",
  introExtra:
    "We at Sparrow Garage Doors are experts at replacing garage springs for both homes and businesses. We make sure your door works safely and well across Sydney, Melbourne, Brisbane and the Gold Coast.",
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
  return <PartServicePage content={content} />;
}
