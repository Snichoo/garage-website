import { getContent } from "@/lib/content";

type LocationMapProps = {
  query?: string;
};

export default async function LocationMap({ query }: LocationMapProps = {}) {
  // Searching Google Maps for an administrative area like "Brisbane, Queensland, Australia"
  // shows the region with its boundary highlighted automatically.
  const search = query ?? (await getContent()).locationMap.query;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    search,
  )}&output=embed`;

  return (
    <section className="w-full">
      <iframe
        title={`Map showing ${search}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[360px] w-full border-0 md:h-[480px]"
      />
    </section>
  );
}
