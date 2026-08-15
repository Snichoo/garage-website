import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door Off Track Brisbane | Same Day Repairs",
    description: `Garage door off its track? We reseat the door, straighten or replace bent tracks and fix the cause, not just the symptom. Same-day repairs across Brisbane, call ${cfg.phoneDisplay}.`,
    path: "/garage-door-off-track",
  });
}

const content: PartServiceContent = {
  titleLead: "Garage Door",
  titleAccent: "Off Track",
  intro:
    "A door that has jumped its track sits crooked in the opening, binds against the frame and can drop without warning. Please do not run the opener again, that is what turns a straightforward repair into bent tracks and torn panels.",
  introExtra:
    "Doors come off track after a knock from a car, a worn or seized roller, a snapped cable or a track that has worked loose. We reseat the door, repair or replace what caused it, and rebalance the whole system so it does not happen again next month.",
  heroIcon: "/images/icons/help-maintenance.png",
  heroIconAlt: "Garage door off track icon",
  heroImage: "/images/gallery/08-1.jpg",
  heroImageAlt: "Garage door being realigned on its track",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Door reseated and realigned, usually the same day.",
    "Bent tracks straightened or replaced, brackets refastened.",
    "Rollers, cables and balance checked before we leave.",
  ],
  services: [
    "Door Reseating",
    "Track Repair & Replacement",
    "Roller Replacement",
    "Cable Replacement",
    "Bracket Refastening",
    "Balance & Safety Check",
  ],
};

export default async function GarageDoorOffTrackPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Repairs", path: "/repairs" },
            { name: "Garage Door Off Track", path: "/garage-door-off-track" },
          ]),
          await serviceSchema({
            name: "Off Track Garage Door Repair",
            description:
              "Repair of off-track garage doors across Brisbane and South East Queensland, including door reseating, track straightening and roller replacement.",
            path: "/garage-door-off-track",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
