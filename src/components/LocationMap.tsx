type LocationMapProps = {
  query?: string;
};

export default function LocationMap({ query }: LocationMapProps = {}) {
  const address = query ?? "1/24 Lisburn St, East Brisbane QLD 4169";
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address,
  )}&output=embed`;

  return (
    <section className="w-full">
      <iframe
        title={`Map showing ${address}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[360px] w-full border-0 md:h-[480px]"
      />
    </section>
  );
}
