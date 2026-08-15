import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Sliding Gates Brisbane | New Gates Supplied & Automated",
    description: `New sliding driveway gates supplied, installed and automated across Brisbane. Space-saving, secure and built for sloped or short driveways. Free measure and quote, call ${cfg.phoneDisplay}.`,
    path: "/sliding-gates",
  });
}

const content: PartServiceContent = {
  titleLead: "Sliding",
  titleAccent: "Gates",
  intro:
    "A sliding gate runs horizontally along the fence line instead of swinging into the driveway, which makes it the practical choice for properties with a slope, a short driveway or cars parked close to the entrance.",
  introExtra:
    "We build and install complete new sliding gates across Brisbane, sized to your opening and finished to match the house, then fit the motor, remotes and safety beams as part of the same job. Track-mounted and cantilever options are both available depending on the ground and the span.",
  heroIcon: "/images/icons/help-gates.svg",
  heroIconAlt: "Sliding gate icon",
  heroImage: "/images/gates/sliding-gate.avif",
  heroImageAlt: "New automated sliding driveway gate running along a fence line",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Space-saving: no swing arc needed into the driveway.",
    "Handles sloped and uneven ground better than a swing gate.",
    "Strong locking and sturdy construction for real security.",
    "Custom sizes, infills and colours to match your home.",
  ],
  services: [
    "New Gate Supply & Install",
    "Automation Installation",
    "Track & Roller Service",
    "Board Replacement",
    "Motor Replacement",
    "Maintenance Service",
  ],
};

export default async function SlidingGatesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gates", path: "/gates" },
            { name: "Sliding Gates", path: "/sliding-gates" },
          ]),
          await serviceSchema({
            name: "Sliding Gate Supply, Installation & Automation",
            description:
              "Supply, installation and automation of new sliding driveway gates across Brisbane and South East Queensland.",
            path: "/sliding-gates",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
