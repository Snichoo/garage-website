import LegalPage, { type LegalPageContent } from "@/components/LegalPage";
import { pageMetadata, getSiteConfig } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: `Terms & Conditions | ${cfg.name}`,
    description: `The terms that apply to quotes, bookings, workmanship, warranties and payment for garage door and gate work carried out by ${cfg.name}.`,
    path: "/terms",
  });
}

const content: LegalPageContent = {
  title: "Terms & Conditions",
  lastUpdated: "August 2026",
  intro:
    "These terms apply to the use of this website and to any quote, booking or work carried out by {name}. By asking us to quote or to carry out work, you agree to these terms. Nothing here limits your rights under the Australian Consumer Law.",
  sections: [
    {
      heading: "Quotes",
      paragraphs: [
        "Quotes are based on the information available to us at the time, including what you tell us and, where applicable, an on-site measure. Unless stated otherwise, a written quote is valid for 30 days.",
        "If we find conditions on site that could not reasonably have been identified when the quote was prepared, for example concealed damage, non-standard framing, structural issues or a power supply that needs additional work, we will let you know before continuing and provide a revised price for your approval.",
      ],
    },
    {
      heading: "Bookings and Access",
      paragraphs: [
        "We will agree a date and an arrival window with you. Occasionally an earlier emergency job or a supplier delay means we need to reschedule, and we will contact you as soon as we know.",
        "You are responsible for providing safe and clear access to the work area, including moving vehicles and belongings out of the garage or driveway, and for making sure a responsible adult is available where required. If we cannot access the site at the agreed time, a rebooking fee may apply.",
      ],
    },
    {
      heading: "Cancellations",
      paragraphs: [
        "Please give us as much notice as you can if you need to cancel or reschedule. For custom-made doors and gates, cancellation after the order has been placed with the manufacturer may incur charges for materials already committed. We will always tell you before that point is reached.",
      ],
    },
    {
      heading: "Payment",
      paragraphs: [
        "Repairs and service work are payable on completion unless we have agreed otherwise in writing. New door and gate installations may require a deposit at the time of order, with the balance payable on completion.",
        "Title to any supplied goods remains with {name} until payment has been received in full.",
      ],
    },
    {
      heading: "Workmanship and Warranty",
      paragraphs: [
        "Our installation and repair work is covered by our workmanship warranty. Products we supply, such as doors, motors, springs and remotes, carry the warranty offered by their manufacturer, and we will pass on the details of that cover.",
        "Warranties do not cover fair wear and tear, damage caused by impact, storm, flood, corrosion from coastal conditions, misuse, or work carried out or altered by someone else after we have finished. Doors and gates require regular servicing, and warranty cover assumes reasonable maintenance has been carried out.",
      ],
    },
    {
      heading: "Safety",
      paragraphs: [
        "Garage doors and gates are heavy, and springs and cables are under extreme tension. Please do not attempt to adjust, dismantle or force any part of the system yourself. If a door or gate has failed, use the manual release, leave it where it is and call us on {phone}.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. To the extent permitted by law, our liability for any other loss is limited to resupplying the service, or the cost of having it resupplied.",
        "We are not liable for pre-existing defects in structures we work on, or for loss arising from your failure to maintain the door, gate or motor.",
      ],
    },
    {
      heading: "Website Content",
      paragraphs: [
        "The content on this website, including text, images, logos and video, belongs to {name} or is used with permission, and may not be reproduced without our consent.",
        "Information on this site, including any indicative pricing or product description, is provided in good faith as general guidance. It does not form a quote or a contract.",
      ],
    },
    {
      heading: "Governing Law",
      paragraphs: [
        "These terms are governed by the laws of Queensland, Australia.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "For any question about these terms, contact {name} on {phone} or at {email}.",
      ],
    },
  ],
};

export default async function TermsPage() {
  return <LegalPage content={content} />;
}
