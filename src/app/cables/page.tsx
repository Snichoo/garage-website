import type { Metadata } from "next";
import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";

export const metadata: Metadata = {
  title: "Garage Door Cables - Repair & Replacement | Sparrow Garage Doors",
  description:
    "Lift and safety cable replacement for garage doors across Brisbane. Stop your door dropping, jamming or running off the drum with same-day cable repairs.",
};

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

export default function CablesPage() {
  return <PartServicePage content={content} />;
}
