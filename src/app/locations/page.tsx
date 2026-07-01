import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";
import { regions, getSuburbsByRegion } from "@/data/suburbs";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Garage Door Service Areas | Brisbane & South East QLD",
  description:
    "Sparrow Garage Doors is a mobile service operating across the Greater Brisbane area. See the suburbs we cover for installation, servicing and emergency repairs.",
  path: "/locations",
});

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-4 w-4"
    >
      <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 7.5 12.5 7.5 12.5s7.5-6.9 7.5-12.5C19.5 5.3 16.2 2 12 2zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
    </svg>
  );
}

export default function LocationsPage() {
  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/Jims-Hero-Image.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-36 text-center md:pb-28 md:pt-48">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            <span className="text-brand-yellow">Locations</span>{" "}
            <span className="text-white">We Service</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            We&apos;re a mobile service operating right across the Greater
            Brisbane area. From the city out to the bay, north to Morayfield and
            west to Jindalee, our technicians come to you.
          </p>
        </div>
      </section>

      {/* Suburb list */}
      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="relative mb-10 h-[88px] md:mb-12 md:h-[160px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[44px] font-extrabold leading-none tracking-tight md:text-[100px]">
              SUBURBS WE COVER
            </h2>
            <h2 className="absolute bottom-0 left-2 font-display text-[38px] font-extrabold leading-none tracking-tight text-brand-navy md:left-6 md:text-[88px]">
              SUBURBS WE COVER
            </h2>
          </div>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            Click through to any of our local service areas for more information.
            Don&apos;t see your suburb? We still cover most of Greater Brisbane,
            so give us a call.
          </p>

          <div className="space-y-12">
            {regions.map((region) => {
              const list = getSuburbsByRegion(region.slug);
              if (list.length === 0) return null;
              return (
                <div key={region.slug}>
                  <h3 className="mb-5 font-display text-2xl font-extrabold uppercase tracking-wide text-brand-navy md:text-3xl">
                    {region.name}
                  </h3>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {list.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/suburbs/${s.slug}`}
                          className="flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-yellow hover:shadow-md"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-navy shadow-md">
                            <PinIcon />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-base font-extrabold tracking-wide text-brand-navy md:text-lg">
                              {s.name}
                            </span>
                            <span className="block text-xs font-medium text-neutral-500">
                              QLD {s.postcode}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-medium italic text-neutral-600 md:text-base">
                    ...and more across the {region.name} area.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
      <LocationMap />
      <Footer />
    </main>
  );
}
