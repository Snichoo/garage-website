import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door Servicing Brisbane | Annual Maintenance",
    description: `Annual garage door servicing across Brisbane. Every bolt tightened, rails realigned, moving parts lubricated and opener pressure reset so the door runs quietly. Call ${cfg.phoneDisplay}.`,
    path: "/garage-door-servicing",
  });
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Servicing",
  intro:
    "A garage door is the heaviest moving object in most homes and it runs thousands of cycles a year. A service once a year keeps it quiet and smooth, and catches worn springs, cables and rollers while they are still a cheap fix rather than an emergency call-out.",
  introExtra:
    "Our full service covers every bolt and screw on the door, realigning the rails to a level position, lubricating every moving part, and resetting the pressure on the opener itself so it stops and reverses correctly. Cleaning is not included.",
  heroIcon: "/images/icons/help-maintenance.png",
  heroIconAlt: "Garage door servicing icon",
  heroImage: "/images/gallery/06-3.jpg",
  heroImageAlt: "Well maintained white double garage door on a Brisbane home",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Every bolt and screw on the door tightened.",
    "Rails realigned to level and all moving parts lubricated.",
    "Opener pressure and safety reverse reset and tested.",
  ],
  services: [
    "Full Door Service",
    "Rail Realignment",
    "Lubrication",
    "Spring Tension Check",
    "Opener Pressure Reset",
    "Wear Report",
  ],
};

export default async function GarageDoorServicingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Repairs", path: "/repairs" },
            { name: "Garage Door Servicing", path: "/garage-door-servicing" },
          ]),
          await serviceSchema({
            name: "Garage Door Servicing & Maintenance",
            description:
              "Annual garage door servicing and maintenance across Brisbane and South East Queensland, including realignment, lubrication and opener adjustment.",
            path: "/garage-door-servicing",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
