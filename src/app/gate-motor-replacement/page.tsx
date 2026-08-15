import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Gate Motor Replacement Brisbane | Sliding & Swing Gates",
    description: `Gate motor replacement across Brisbane. New motors matched to your gate's weight and span, with the board and remotes reprogrammed and safety beams tested. Call ${cfg.phoneDisplay}.`,
    path: "/gate-motor-replacement",
  });
}

const content: PartServiceContent = {
  titleLead: "Gate Motor",
  titleAccent: "Replacement",
  intro:
    "Gate motors live outside. Years of sun, storms, dust and the odd power surge take their toll, and eventually the gate starts crawling, stalling partway, or ignoring the remote altogether.",
  introExtra:
    "We replace motors on sliding, swing and telescopic gates across Brisbane. The new unit is matched to the weight and span of your gate rather than whatever happens to be on the van, then the control board and remotes are reprogrammed, the travel limits set and the safety beams tested before we leave.",
  heroIcon: "/images/icons/help-gates.svg",
  heroIconAlt: "Gate motor icon",
  heroImage: "/images/gates/sliding-gate.avif",
  heroImageAlt: "Automated sliding gate driven by an electric gate motor",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Sliding, swing and telescopic gate motors on any brand.",
    "Motor matched to your gate's actual weight and span.",
    "Board, remotes and keypads reprogrammed on the day.",
    "Safety beams and auto-reverse tested before handover.",
  ],
  services: [
    "Motor Diagnosis",
    "Motor Replacement",
    "Board Replacement",
    "Remote & Keypad Programming",
    "Travel Limit Setting",
    "Safety Beam Testing",
  ],
};

export default async function GateMotorReplacementPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            { name: "Gate Motor Replacement", path: "/gate-motor-replacement" },
          ]),
          await serviceSchema({
            name: "Gate Motor Replacement",
            description:
              "Replacement of sliding, swing and telescopic gate motors across Brisbane and South East Queensland, including control boards and remote programming.",
            path: "/gate-motor-replacement",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
