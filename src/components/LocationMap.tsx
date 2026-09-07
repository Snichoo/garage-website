import { getContent } from "@/lib/content";
import InteractiveMap from "./InteractiveMap";

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

  return <InteractiveMap search={search} embedSrc={embedSrc} />;
}
