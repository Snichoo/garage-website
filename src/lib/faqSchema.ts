/**
 * FAQPage schema built from a list of question/answer pairs.
 * Kept separate from lib/site.ts so client components (Faq.tsx) can import it
 * without pulling the server-only content store into the client bundle.
 */
export function faqPageSchema(
  items: { q: string; a: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
