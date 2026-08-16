import PartServicePage, { type PartServiceContent } from "@/components/PartServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: "Swing Gates Brisbane | New Gates Supplied & Automated",
    description: `New swing driveway gates supplied, installed and automated across Brisbane. Single and double leaf gates with a wide, grand opening and no ground track. Free quote, call ${cfg.phoneDisplay}.`,
    path: "/swing-gates",
  });
}

const content: PartServiceContent = {
  titleLead: "Swing",
  titleAccent: "Gates",
  intro:
    "Swing gates hinge at the posts and open inward or outward, either as a single leaf or as a symmetrical pair. They give a property the widest, most traditional entrance and leave no track running across the driveway to collect leaves and grit.",
  introExtra:
    "We supply and install complete new swing gates across Brisbane, matched to your opening, your fence line and the fall across the driveway, then automate them with underground or articulated arm motors, remotes and safety beams.",
  heroIcon: "/images/icons/help-gates.svg",
  heroIconAlt: "Swing gate icon",
  heroImage: "/images/gates/swing-gate.avif",
  heroImageAlt: "New automated swing entry gates on a residential driveway",
  heroImageAspect: "aspect-[4/3]",
  heroBullets: [
    "Balanced, stylish entrance in single or double leaf.",
    "Wide clear opening for larger vehicles and trailers.",
    "No ground track to keep clear or maintain.",
    "Custom finishes, infills and materials to match your style.",
  ],
  services: [
    "New Gate Supply & Install",
    "Automation Installation",
    "Underground & Arm Motors",
    "Re-Alignment",
    "Motor Replacement",
    "Maintenance Service",
  ],
};

export default async function SwingGatesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Swing Gates", path: "/swing-gates" },
          ]),
          await serviceSchema({
            name: "Swing Gate Supply, Installation & Automation",
            description:
              "Supply, installation and automation of new swing driveway gates across Brisbane and South East Queensland.",
            path: "/swing-gates",
          }),
        ]}
      />
      <PartServicePage content={content} />
    </>
  );
}
