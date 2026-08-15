import ServiceHubPage, { type ServiceHubContent } from "@/components/ServiceHubPage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Garage Door & Gate Repairs Brisbane | Same Day Service",
    description: `Garage door and gate repairs across Brisbane. Broken springs, snapped cables, off-track doors, faulty motors and gate faults fixed fast, often same day. Call ${cfg.phoneDisplay}.`,
    path: "/repairs",
  });
}

const content: ServiceHubContent = {
  titleLead: "Garage Door & Gate",
  titleAccent: "Repairs",
  intro:
    "Something stuck, jammed, noisy or refusing to move? Our Brisbane technicians carry the common parts on the van and fix most garage door and gate faults in a single visit, often the same day you call.",
  heroBullets: [
    "Same-day and 24/7 emergency call-outs across Greater Brisbane.",
    "Every brand and door type: sectional, roller, tilt and gates.",
    "Upfront fixed pricing with no call-out fee.",
  ],
  heroTiles: [
    {
      src: "/images/emergency.jpg",
      alt: "Technician carrying out an emergency garage door repair",
      label: "Emergency Repairs",
    },
    {
      src: "/images/springs-hero.webp",
      alt: "Garage door spring being replaced",
      label: "Springs & Cables",
    },
    {
      src: "/images/gates/sliding-gate.avif",
      alt: "Automated sliding driveway gate being repaired",
      label: "Gate Repairs",
    },
  ],
  heroCta: { label: "See what we repair", href: "#services" },
  sectionHeading: "WHAT WE REPAIR",
  sectionIntro:
    "From a snapped spring at 6am to an annual service that keeps the door running quietly, every repair below is handled in-house by our own technicians and backed by a workmanship guarantee.",
  services: [
    {
      title: "Emergency Garage Door Repairs",
      href: "/emergency-repairs",
      image: "/images/emergency.jpg",
      alt: "Emergency garage door repair technician at work",
      description:
        "Door stuck open, jammed shut or off its rails? We are on call 24/7, weekends and public holidays included.",
      points: [
        "24/7 call-outs across Greater Brisbane",
        "Doors made secure on the first visit",
        "Common parts carried on the van",
      ],
    },
    {
      title: "Garage Door Repairs",
      href: "/garage-door-repairs",
      image: "/images/gallery/03-5.jpg",
      alt: "Charcoal sectional garage door running smoothly after repair",
      description:
        "General repairs for doors that are noisy, slow, crooked or only opening halfway, on every brand and door type.",
      points: [
        "Rollers, hinges, tracks and panels",
        "Motor, sensor and remote faults",
        "Sectional, roller and tilt doors",
      ],
    },
    {
      title: "Gate Repairs",
      href: "/gate-repairs",
      image: "/images/gates/sliding-gate.avif",
      alt: "Automated sliding gate on its track",
      description:
        "Sliding and swing gate repairs, from dragging wheels and bent tracks to motors and control boards that have given up.",
      points: [
        "Track, roller and hinge repairs",
        "Motor, board and sensor faults",
        "Realignment and safety testing",
      ],
    },
    {
      title: "Broken Spring Replacement",
      href: "/springs",
      image: "/images/springs-hero.webp",
      alt: "Garage door torsion spring replacement",
      description:
        "A broken spring makes the door impossibly heavy and unsafe to force. We replace torsion and extension springs same day.",
      points: [
        "Torsion and extension springs",
        "High-cycle, Australian-standard parts",
        "Balance and tension reset included",
      ],
    },
    {
      title: "Cable Replacement",
      href: "/cables",
      image: "/images/cables-hero.webp",
      alt: "Garage door lifting cable wound around its drum",
      description:
        "Frayed or snapped cables leave the door hanging crooked. We rematch the gauge to your door weight and rebalance the lot.",
      points: [
        "Lift, safety and counterweight cables",
        "Drum and bracket inspection included",
        "Stops the door dropping or jamming",
      ],
    },
    {
      title: "Garage Door Off Track",
      href: "/garage-door-off-track",
      image: "/images/gallery/08-1.jpg",
      alt: "Garage door that has come off its track",
      description:
        "Doors come off track after a knock, a worn roller or a snapped cable. We reseat the door and fix the cause, not just the symptom.",
      points: [
        "Door reseated and realigned",
        "Bent tracks straightened or replaced",
        "Rollers and brackets checked",
      ],
    },
    {
      title: "Garage Door Servicing",
      href: "/garage-door-servicing",
      image: "/images/gallery/06-3.jpg",
      alt: "Well maintained white double garage door on a Brisbane home",
      description:
        "An annual service keeps the door quiet and catches worn parts before they strand you. Bolts tightened, rails levelled, everything lubricated.",
      points: [
        "Every bolt and screw tightened",
        "Rails realigned and lubricated",
        "Opener pressure reset",
      ],
    },
    {
      title: "Garage Door Safety Inspection",
      href: "/garage-door-safety-inspection",
      image: "/images/gallery/07-4.jpg",
      alt: "Garage door safety inspection on a residential home",
      description:
        "A full check of the springs, cables, auto-reverse and sensors, ideal before a sale, after a storm or if you have young kids at home.",
      points: [
        "Auto-reverse and sensor testing",
        "Spring, cable and bracket check",
        "Written report of what we found",
      ],
    },
  ],
  faqs: [
    {
      q: "How quickly can you get to a garage door repair in Brisbane?",
      a: "Most repairs are booked the same day or the next business day. For genuine emergencies such as a door stuck open, jammed shut or off its track, we run 24/7 call-outs including weekends and public holidays.",
    },
    {
      q: "Do you charge a call-out fee?",
      a: "No. There is no call-out fee. We quote the job upfront before any work starts, so you know the fixed price before we pick up a tool.",
    },
    {
      q: "Can you repair my brand of door or motor?",
      a: "Yes. We work on every common brand including B&D, Merlin, Steel-Line, Centurion, Gliderol, Chamberlain and Danmar, across sectional, roller and tilt doors as well as sliding and swing gates.",
    },
    {
      q: "Is it worth repairing an old garage door or should I replace it?",
      a: "In most cases a repair is the cheaper option and we will always try that first. If the door is past economical repair we will tell you straight, show you why, and quote a replacement so you can compare the two.",
    },
    {
      q: "My spring snapped. Can I still use the door?",
      a: "Please do not force it. Pull the manual release so the load comes off the opener, leave the door where it is and call us. A door with a broken spring can weigh well over 100kg and springs are under enormous tension, which makes DIY repairs genuinely dangerous.",
    },
    {
      q: "Do you guarantee your repair work?",
      a: "Yes. Parts carry their manufacturer warranty and every repair is covered by our own workmanship guarantee.",
    },
  ],
  faqIntro:
    "Common questions about our garage door and gate repair service across Brisbane.",
};

export default async function RepairsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Repairs", path: "/repairs" },
          ]),
          await serviceSchema({
            name: "Garage Door & Gate Repairs",
            description:
              "Emergency and general garage door and gate repairs across Brisbane and South East Queensland, including springs, cables, off-track doors, servicing and safety inspections.",
            path: "/repairs",
          }),
        ]}
      />
      <ServiceHubPage content={content} />
    </>
  );
}
