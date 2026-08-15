import ServiceHubPage, { type ServiceHubContent } from "@/components/ServiceHubPage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "New Gates Brisbane | Sliding & Swing Gates Installed",
    description: `New driveway gates supplied and installed across Brisbane. Sliding and swing gates built to suit your property, with the motor, remotes and safety gear fitted as one complete package. Call ${cfg.phoneDisplay}.`,
    path: "/gates",
  });
}

const content: ServiceHubContent = {
  titleLead: "New Gates,",
  titleAccent: "Supplied & Installed",
  intro:
    "We do not just automate the gate you already have. Sparrow supplies and installs complete new driveway gates across Brisbane, built to suit your opening, your slope and the look of your home, then fitted with the motor, remotes and safety gear as one finished job.",
  heroBullets: [
    "Complete new gates: designed, built, installed and automated.",
    "Sliding, swing and telescopic layouts to suit any driveway.",
    "One team for the gate and the automation, one point of contact.",
  ],
  heroTiles: [
    {
      src: "/images/gates/sliding-gate.avif",
      alt: "New automated sliding driveway gate",
      label: "Sliding Gates",
    },
    {
      src: "/images/gates/swing-gate.avif",
      alt: "New swing entry gate on a residential driveway",
      label: "Swing Gates",
    },
    {
      src: "/images/automated-gates.webp",
      alt: "Automated telescopic gate with overlapping panels",
      label: "Automation",
    },
  ],
  heroCta: { label: "Explore gate types", href: "#services" },
  band: {
    heading: "One Complete Gate & Automation Package",
    text: "Most gate jobs get split between a fabricator, an electrician and an automation company, and the customer ends up chasing all three. We handle the lot, so there is a single quote, a single install and a single number to call if anything needs attention later.",
    points: [
      "Site measure, slope and clearance assessment included.",
      "Gate supplied and installed to suit your driveway and home.",
      "Motor, remotes, keypad and safety beams fitted and tested.",
      "Handover with everything programmed and working on the day.",
    ],
    image: "/images/gates/double-gates.avif",
    alt: "Complete new automated double entry gates installed at a home",
  },
  sectionHeading: "TYPES OF GATES",
  sectionIntro:
    "The right layout comes down to your driveway width, the run-off space beside it and how much fall there is across the opening. Here is what we install most, and what each one suits.",
  services: [
    {
      title: "Sliding Gates",
      href: "/sliding-gates",
      image: "/images/gates/sliding-gate.avif",
      alt: "Automated sliding driveway gate on a track",
      description:
        "A single leaf that runs horizontally along the fence line. The workhorse of Brisbane driveways, and the right answer when a swing gate would foul the slope or the parked cars.",
      points: [
        "Ideal for sloped or short driveways",
        "Needs run-off space beside the opening",
        "Strong locking, low maintenance",
      ],
    },
    {
      title: "Swing Gates",
      href: "/swing-gates",
      image: "/images/gates/swing-gate.avif",
      alt: "Automated swing entry gates opening inward",
      description:
        "One or two leaves hinged at the posts, opening inward or outward. The classic look for a wide entrance, with no track along the driveway to keep clear of leaves and grit.",
      points: [
        "Grand, symmetrical entrance",
        "No ground track to maintain",
        "Needs level ground and swing clearance",
      ],
    },
    {
      title: "Gate Motors & Automation",
      href: "/gate-automation",
      image: "/images/automated-gates.webp",
      alt: "Automated telescopic gate with overlapping panels",
      description:
        "The automation side, whether it goes on a gate we built or the one already at your driveway. Motors, remotes, keypads, intercoms and safety beams supplied and installed.",
      points: [
        "Sliding, swing and telescopic automation",
        "Remotes, keypads and smart control",
        "Safety beams fitted and tested",
      ],
    },
    {
      title: "Gate Repairs",
      href: "/gate-repairs",
      image: "/images/emergency.jpg",
      alt: "Technician repairing an automatic gate",
      description:
        "Already have a gate that is dragging, juddering or ignoring the remote? We repair the gate and the automation, on any brand.",
      points: [
        "Tracks, rollers, hinges and frames",
        "Motors, boards and sensors",
        "Realignment and safety testing",
      ],
    },
  ],
  faqs: [
    {
      q: "Do you supply the actual gate, or only the automation?",
      a: "Both. We supply and install complete new gates, including the gate leaf, posts, hardware, motor and controls as one package. If you already have a gate you are happy with, we can automate that instead.",
    },
    {
      q: "Should I choose a sliding gate or a swing gate?",
      a: "It usually comes down to space. Sliding gates need clear run-off along the fence line but cope well with sloped or short driveways. Swing gates need level ground and room for the leaves to travel, but leave no track on the ground. We will assess both at the free site measure and tell you which actually fits.",
    },
    {
      q: "How long does a new gate installation take?",
      a: "After the measure, gates are typically fabricated and ready to install within a few weeks depending on the design and finish. The installation itself is normally one to two days on site, including running power, fitting the motor and programming the remotes.",
    },
    {
      q: "Do I need an electrician as well?",
      a: "Not separately. Power supply to the gate motor is part of the job we quote, so you are not left coordinating another trade.",
    },
    {
      q: "What happens in a power cut?",
      a: "Every automated gate we install has a manual release so you can push the gate open by hand during an outage. Battery backup is also available if you would rather the gate keep working normally.",
    },
    {
      q: "Can the gate be paired with my garage door remote?",
      a: "Yes. Openers can be paired to the same remote using an external receiver, or by using the same brand for both the gate and the garage door.",
    },
  ],
  faqIntro:
    "Common questions about new gate supply, installation and automation across Brisbane.",
};

export default async function GatesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gates", path: "/gates" },
          ]),
          await serviceSchema({
            name: "New Gate Supply, Installation & Automation",
            description:
              "Supply and installation of complete new sliding, swing and telescopic driveway gates, including motors and automation, across Brisbane and South East Queensland.",
            path: "/gates",
          }),
        ]}
      />
      <ServiceHubPage content={content} />
    </>
  );
}
