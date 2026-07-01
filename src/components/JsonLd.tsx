/**
 * Renders one or more JSON-LD structured-data blocks into the document.
 * Works in both server and client components (the script is present in the
 * server-rendered HTML, so search crawlers pick it up without executing JS).
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so a stray "</script>" in any string can't break out.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
