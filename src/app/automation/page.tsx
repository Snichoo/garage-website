import ServiceHubPage, { type ServiceHubContent } from "@/components/ServiceHubPage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door & Gate Motors Brisbane | Automation Specialists",
    description: `Motors and automation for garage doors and gates across Brisbane. Openers, motor replacements, remotes, keypads and smart systems supplied, installed and programmed. Call ${cfg.phoneDisplay}.`,
    path: "/automation",
  });
}

const content: ServiceHubContent = {
  titleLead: "Motors &",
  titleAccent: "Automation",
  intro:
    "The motor is the part you actually interact with every day, and the part that tends to fail first. We supply, install, replace and program automation for both garage doors and gates across Brisbane, on every major brand.",
  heroBullets: [
    "Garage door openers and gate motors, supplied and installed.",
    "All major brands: B&D, Merlin, Centurion, Steel-Line, Chamberlain.",
    "Remotes, keypads, safety sensors and smart phone control.",
  ],
  heroTiles: [
    {
      src: "/images/openers-hero.webp",
      alt: "Garage door remote being used outside a home",
      label: "Garage Door Motors",
    },
    {
      src: "/images/automated-gates.webp",
      alt: "Automated gate driven by an electric motor",
      label: "Gate Motors",
    },
    {
      src: "/images/smart-kits/back-view-businesswoman-with-smartphone.avif",
      alt: "Person operating a gate from a smartphone",
      label: "Smart Systems",
    },
  ],
  heroCta: { label: "See automation options", href: "#services" },
  sectionHeading: "AUTOMATION SERVICES",
  sectionIntro:
    "Whether you are automating something for the first time, replacing a motor that has finally given up, or adding phone control to a system that already works, it is the same team and the same number.",
  services: [
    {
      title: "Garage Door Openers",
      href: "/openers",
      image: "/images/openers-hero.webp",
      alt: "Hand holding a garage door opener remote",
      description:
        "Belt, chain, screw and jackshaft openers supplied, installed and programmed, plus remotes, keypads, Wi-Fi modules and safety sensors.",
      points: [
        "Every major brand carried",
        "Same-day fitting on most models",
        "Remotes and keypads programmed on site",
      ],
    },
    {
      title: "Garage Door Motor Replacement",
      href: "/garage-door-motor-replacement",
      image: "/images/gallery/09-2.jpg",
      alt: "Garage door motor mounted to a garage ceiling",
      description:
        "Motor humming but not moving, reversing halfway or clicking with no response? We diagnose first and only replace when a repair genuinely will not last.",
      points: [
        "Diagnosis before replacement",
        "Old unit removed and disposed of",
        "New motor, remotes and warranty",
      ],
    },
    {
      title: "Gate Motors & Automation",
      href: "/gate-automation",
      image: "/images/automated-gates.webp",
      alt: "Automated telescopic gate with overlapping panels",
      description:
        "Automation for sliding, swing and telescopic gates, on a gate we built or one that was already there. Motors, remotes, keypads, intercoms and safety beams.",
      points: [
        "Sliding, swing and telescopic gates",
        "Power supply included in the quote",
        "Safety beams fitted and tested",
      ],
    },
    {
      title: "Gate Motor Replacement",
      href: "/gate-motor-replacement",
      image: "/images/gates/sliding-gate.avif",
      alt: "Gate motor at the base of an automated sliding gate",
      description:
        "Gate motors cop sun, rain and dust for years. When one fails we match a replacement to the weight and span of your gate rather than fitting whatever is on the van.",
      points: [
        "Motor matched to gate weight and span",
        "Control board and remotes reprogrammed",
        "Often replaced the same day",
      ],
    },
    {
      title: "Smart Systems",
      href: "/smart-systems",
      image: "/images/smart-kits/back-view-businesswoman-with-smartphone.avif",
      alt: "Person using a smartphone to control a gate",
      description:
        "Wi-Fi control, cameras, motion sensors and extra remotes so you can open, close and check your door or gate from anywhere.",
      points: [
        "Open and close from your phone",
        "Cameras, sensors and live alerts",
        "Works with most existing systems",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does a garage door motor last?",
      a: "Most quality openers last somewhere between 10 and 15 years depending on how many cycles a day they run and whether the door itself has been kept balanced. A door that is out of balance is the single fastest way to wear out a motor early.",
    },
    {
      q: "Can my motor be repaired instead of replaced?",
      a: "Often, yes. Faulty limit switches, worn gears, dead capacitors, damaged sensors and failed remotes are all repairable. We diagnose first and will tell you honestly when a repair is worth doing and when it is throwing money at a unit that is done.",
    },
    {
      q: "Can I control my garage door or gate from my phone?",
      a: "Yes. A Wi-Fi receiver added to most existing openers lets you open, close and check the status of your door or gate from an app, anywhere. See our smart systems page for the options.",
    },
    {
      q: "Can I pair my garage door and gate to the same remote?",
      a: "Absolutely. They can be paired to a single remote using an external receiver, or by running the same brand of motor on both.",
    },
    {
      q: "Do you fit safety sensors with new motors?",
      a: "Yes. Every automation install includes safety sensors or beams and a tested auto-reverse, so the door or gate stops and backs off if something crosses its path.",
    },
    {
      q: "What happens to my old motor?",
      a: "We remove it and take it away as part of the job, so there is nothing left in the garage for you to deal with.",
    },
  ],
  faqIntro:
    "Common questions about garage door openers, gate motors and smart automation across Brisbane.",
};

export default async function AutomationPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
          ]),
          await serviceSchema({
            name: "Garage Door & Gate Automation",
            description:
              "Supply, installation and replacement of garage door openers, gate motors and smart automation systems across Brisbane and South East Queensland.",
            path: "/automation",
          }),
        ]}
      />
      <ServiceHubPage content={content} />
    </>
  );
}
