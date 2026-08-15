import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door Safety Inspection Brisbane | Full Check",
    description: `Garage door safety inspections across Brisbane. Springs, cables, brackets, auto-reverse and sensors tested, with a written report. Ideal before a sale or after a storm. Call ${cfg.phoneDisplay}.`,
    path: "/garage-door-safety-inspection",
  });
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Safety Inspection",
  intro:
    "Springs and cables hold a door weighing well over 100kg under enormous tension, and the parts that stop it closing on a child, a car or a pet quietly drift out of adjustment over time. A safety inspection tells you exactly what condition yours are in.",
  introExtra:
    "We test the auto-reverse and photo-eye sensors, check spring cycles, cable condition, brackets, fixings and door balance, then hand you a written report of what passed, what needs watching and what needs fixing. It is worth booking before selling a home, after a storm or if you have young children.",
  heroIcon: "/images/icons/help-maintenance.png",
  heroIconAlt: "Garage door safety inspection icon",
  heroImage: "/images/gallery/07-4.jpg",
  heroImageAlt: "Garage door being safety inspected on a residential home",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Auto-reverse and photo-eye sensors tested to standard.",
    "Springs, cables, brackets and fixings inspected for wear.",
    "Written report on what passed and what needs attention.",
  ],
  services: [
    "Auto-Reverse Testing",
    "Sensor Alignment",
    "Spring & Cable Check",
    "Bracket & Fixing Check",
    "Door Balance Test",
    "Written Report",
  ],
};

export default async function GarageDoorSafetyInspectionPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Repairs", path: "/repairs" },
            {
              name: "Garage Door Safety Inspection",
              path: "/garage-door-safety-inspection",
            },
          ]),
          await serviceSchema({
            name: "Garage Door Safety Inspection",
            description:
              "Garage door safety inspections across Brisbane and South East Queensland, covering auto-reverse, sensors, springs, cables and door balance.",
            path: "/garage-door-safety-inspection",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
