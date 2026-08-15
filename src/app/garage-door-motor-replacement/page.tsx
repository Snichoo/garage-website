import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door Motor Replacement Brisbane | Same Day Fitting",
    description: `Garage door motor replacement across Brisbane. We diagnose first, then supply and fit a new opener with remotes, safety sensors and warranty, often same day. Call ${cfg.phoneDisplay}.`,
    path: "/garage-door-motor-replacement",
  });
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Motor Replacement",
  intro:
    "Humming without moving, running halfway then reversing, clicking with no response, or making a noise the whole street can hear? Those are the classic signs of an opener nearing the end of its life, usually somewhere past the ten year mark.",
  introExtra:
    "We diagnose before we quote, because plenty of these faults are a limit switch, a capacitor, a worn gear set or a door that has fallen out of balance rather than a dead motor. When a replacement genuinely is the right call, we remove the old unit, fit and program the new one, set the travel and force limits, and take the old motor away.",
  heroIcon: "/images/icons/help-openers.png",
  heroIconAlt: "Garage door motor icon",
  heroImage: "/images/gallery/09-2.jpg",
  heroImageAlt: "Garage door motor unit mounted to a garage ceiling",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Diagnosed first, replaced only when it is genuinely warranted.",
    "Belt, chain, screw and jackshaft motors fitted same day.",
    "New remotes, safety sensors and manufacturer warranty included.",
    "Old motor removed and taken away.",
  ],
  services: [
    "Motor Diagnosis",
    "Opener Replacement",
    "Remote Programming",
    "Safety Sensor Fitting",
    "Travel & Force Setting",
    "Door Balance Check",
  ],
};

export default async function GarageDoorMotorReplacementPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            {
              name: "Garage Door Motor Replacement",
              path: "/garage-door-motor-replacement",
            },
          ]),
          await serviceSchema({
            name: "Garage Door Motor Replacement",
            description:
              "Diagnosis and replacement of garage door motors and openers across Brisbane and South East Queensland, including remotes and safety sensors.",
            path: "/garage-door-motor-replacement",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
