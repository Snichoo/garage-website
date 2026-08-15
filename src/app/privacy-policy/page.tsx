import LegalPage, { type LegalPageContent } from "@/components/LegalPage";
import { pageMetadata, getSiteConfig } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
    title: `Privacy Policy | ${cfg.name}`,
    description: `How ${cfg.name} collects, uses, stores and protects the personal information you provide through our website, quote forms and phone enquiries.`,
    path: "/privacy-policy",
  });
}

const content: LegalPageContent = {
  title: "Privacy Policy",
  lastUpdated: "August 2026",
  intro:
    "{name} respects your privacy. This policy explains what personal information we collect, why we collect it, how we use and store it, and the choices you have. We handle personal information in line with the Australian Privacy Principles set out in the Privacy Act 1988 (Cth).",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "We only collect information that helps us quote, book and complete work for you. That usually means:",
      ],
      bullets: [
        "Your name, phone number and email address.",
        "The address where the work is to be carried out.",
        "Details about your garage door, gate or motor and the job you need done.",
        "Records of our correspondence with you, including quotes, invoices and service history.",
        "Basic technical information collected automatically by our website, such as your browser type, device and the pages you visited.",
      ],
    },
    {
      heading: "How We Collect It",
      paragraphs: [
        "We collect information directly from you when you call us, email us, or fill in a quote, contact or booking form on this website. We may also collect it when you speak to one of our technicians on site.",
        "Where our website uses cookies or similar technologies, they are used to keep the site working properly and to understand which pages are useful. You can block or delete cookies through your browser settings, though some parts of the site may not work as intended if you do.",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: ["We use your personal information to:"],
      bullets: [
        "Prepare and send you quotes.",
        "Book, schedule and carry out the work you have asked for.",
        "Contact you about your job, including confirming times and following up afterwards.",
        "Issue invoices and keep proper business records.",
        "Improve our services and our website.",
        "Meet our legal and insurance obligations.",
      ],
    },
    {
      heading: "Who We Share It With",
      paragraphs: [
        "We do not sell your personal information, and we do not share it for anyone else's marketing.",
        "We may share limited information with service providers who help us run the business, such as our email and form delivery provider, our website host, and our accounting software. These providers only receive what they need to perform their function. We may also disclose information where we are required or permitted to do so by law.",
      ],
    },
    {
      heading: "Storage and Security",
      paragraphs: [
        "We take reasonable steps to protect the information we hold from misuse, loss, unauthorised access, modification and disclosure. Information submitted through this website is transmitted over an encrypted connection and stored with reputable providers.",
        "No method of transmission or storage is completely secure, so while we work hard to protect your information we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "How Long We Keep It",
      paragraphs: [
        "We keep your information for as long as we need it for the purpose it was collected, and for as long as we are required to keep records for tax, warranty and legal purposes. When it is no longer needed we take reasonable steps to destroy or de-identify it.",
      ],
    },
    {
      heading: "Accessing and Correcting Your Information",
      paragraphs: [
        "You can ask us for a copy of the personal information we hold about you, and you can ask us to correct anything that is out of date or inaccurate. Contact us using the details below and we will respond within a reasonable time. In the rare case we cannot give you access, we will explain why in writing.",
      ],
    },
    {
      heading: "Complaints",
      paragraphs: [
        "If you believe we have mishandled your personal information, please contact us first so we can look into it. If you are not satisfied with our response, you can refer the matter to the Office of the Australian Information Commissioner at oaic.gov.au.",
      ],
    },
    {
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this policy from time to time. The current version will always be available on this page, with the date it was last updated shown at the top.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "For any privacy question or request, contact {name} on {phone} or at {email}.",
      ],
    },
  ],
};

export default async function PrivacyPolicyPage() {
  return <LegalPage content={content} />;
}
