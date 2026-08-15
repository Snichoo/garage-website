import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Gate Repairs Brisbane | Sliding & Swing Gate Specialists",
    description: `Automatic gate repairs across Brisbane. Dragging wheels, bent tracks, dead motors, control boards and safety sensors fixed on sliding and swing gates. Call ${cfg.phoneDisplay}.`,
    path: "/gate-repairs",
  });
}

const content: PartServiceContent = {
  titleLead: "Gate",
  titleAccent: "Repairs",
  intro:
    "A gate that crawls, judders, stops halfway or refuses to respond to the remote is usually telling you something specific: a worn roller, a track full of grit, a hinge dropping out of square, or a motor and control board reaching the end of their life.",
  introExtra:
    "We repair sliding, swing and telescopic gates across Brisbane, both the gate itself and the automation that drives it. Every repair finishes with a full travel and safety test so the gate stops and reverses the way it should.",
  heroIcon: "/images/icons/help-gates.svg",
  heroIconAlt: "Driveway gate icon",
  heroImage: "/images/gates/sliding-gate.avif",
  heroImageAlt: "Automated sliding driveway gate running on its track",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Sliding, swing and telescopic gates on every major brand.",
    "Tracks, rollers, hinges, posts and gate frames.",
    "Motors, control boards, remotes, keypads and safety beams.",
  ],
  services: [
    "Track & Roller Service",
    "Re-Alignment",
    "Motor Repair",
    "Board Replacement",
    "Remote & Keypad Fix",
    "Safety Beam Testing",
  ],
};

export default async function GateRepairsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Repairs", path: "/repairs" },
            { name: "Gate Repairs", path: "/gate-repairs" },
          ]),
          await serviceSchema({
            name: "Gate Repairs",
            description:
              "Repair of sliding, swing and telescopic gates and their automation across Brisbane and South East Queensland.",
            path: "/gate-repairs",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
