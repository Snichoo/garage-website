import ColorbondRange from "@/components/ColorbondRange";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";
import QuoteButton from "@/components/QuoteButton";
import SectionalDesignPicker from "@/components/SectionalDesignPicker";
import SeriesGallery from "@/components/SeriesGallery";
import WindowOptions from "@/components/WindowOptions";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, siteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
  title: "Sectional Garage Doors Brisbane | Supply & Installation",
  description: `Insulated sectional garage doors supplied and installed across Brisbane. Space-saving panels in Colorbond colours, timber-look finishes and window options. Free quote, call ${siteConfig.phoneDisplay}.`,
  path: "/sectional-garage-doors",
});
}

const nativeSeries = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/native/${i === 0 ? "1-1-1" : `1-${i + 1}`}.jpg`,
  alt: `Native Series timberlook colour ${i + 1}`,
  aspect: "567 / 157",
}));

const platinumSeries = [
  { src: "/images/platinum/2.png", alt: "Platinum Series colour 1", aspect: "740 / 274" },
  { src: "/images/platinum/3.png", alt: "Platinum Series colour 2", aspect: "740 / 274" },
  { src: "/images/platinum/1.png", alt: "Platinum Series colour 3", aspect: "740 / 274" },
];

const features = [
  "Space-saving design that opens vertically, ideal for short driveways or tight spaces.",
  "Superior thermal and acoustic insulation, cutting energy costs and noise.",
  "Versatile style with a range of colours, materials and finishes to match any home.",
  "Built tough with robust materials for long-lasting, reliable performance.",
];

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export default function SectionalGarageDoorsPage() {
  return (
    <main className="garage-bg">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sectional Garage Doors", path: "/sectional-garage-doors" },
          ]),
          serviceSchema({
            name: "Sectional Garage Door Supply & Installation",
            description:
              "Supply and installation of insulated sectional garage doors across Brisbane and South East Queensland.",
            path: "/sectional-garage-doors",
          }),
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(253,215,16,0.15),transparent_55%)]" />

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-40 md:pb-24 md:pt-48 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pt-40">
          {/* Left copy */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
              Your Sectional Garage Door,
              <br />
              <span className="text-brand-yellow">Built to Last</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Sectional garage doors are made of multiple horizontal panels
              connected by hinges, opening vertically and sliding smoothly
              into the ceiling space. Space-efficient and modern, they&apos;re
              an excellent choice for almost any home.
            </p>
            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base leading-relaxed text-white/90 md:text-lg"
                >
                  <span className="mt-1 shrink-0 text-brand-yellow">
                    <CheckMark />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="#designs"
                className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
              >
                Explore designs
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-5 w-5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <QuoteButton
                className="inline-flex items-center gap-3 rounded-none border-2 border-white/30 bg-white/5 px-6 py-3.5 font-display text-base font-extrabold tracking-wide text-white transition hover:bg-white/10 md:text-lg"
              >
                Get a free quote
              </QuoteButton>
            </div>
          </div>

          {/* Right: video + services */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl">
              <video
                src="/videos/Sectional_Door_FrontBack_Colormatched-1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                Services We Offer
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[
                  "Installation",
                  "Spring Replacement",
                  "Door Maintenance",
                  "Panel Replacement",
                  "Door Opener Replacement",
                  "Re-Alignment",
                ].map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 font-display text-xs font-bold text-white/90 backdrop-blur md:text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Designs */}
      <section id="designs" className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Stencil heading */}
          <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
              SECTIONAL DOOR DESIGNS
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              SECTIONAL DOOR DESIGNS
            </h2>
          </div>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            Sparrow&apos;s sectional doors are available in multiple designs,
            each catering to a specific look and feel. Whether you&apos;re after
            a classic or modern style, Sparrow has a sectional garage door
            that fits your needs.
          </p>

          <SectionalDesignPicker />
        </div>
      </section>

      <ColorbondRange />

      <SeriesGallery
        title="Native Series Colour Range"
        description="Choose from the 8 timberlook colours in the Native Series Range."
        images={nativeSeries}
        gridCols="grid-cols-1 sm:grid-cols-2"
      />

      <SeriesGallery
        title="Platinum Series Colour Range"
        images={platinumSeries}
        gridCols="grid-cols-1 sm:grid-cols-2"
      />

      <WindowOptions />

      <Faq />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
