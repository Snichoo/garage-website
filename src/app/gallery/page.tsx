import Image from "next/image";
import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";
import QuoteButton from "@/components/QuoteButton";

export const metadata: Metadata = {
  title: "Our Work | Sparrow Garage Doors Brisbane",
  description:
    "Browse recent garage door installations, upgrades and repairs by Sparrow Garage Doors across Brisbane. See the quality behind every project.",
};

type GalleryImage = {
  src: string;
  alt: string;
  span?: "wide" | "tall";
};

// 9 items in 3 columns with col-span-2 + row-span-2 placed so every cell fills
// (4 rows x 3 cols = 12 cells; spans consume exactly the extra 3 cells).
const gallery: GalleryImage[] = [
  {
    src: "/images/gallery/09-2.jpg",
    alt: "Aerial view of a completed garage door installation",
    span: "wide",
  },
  {
    src: "/images/gallery/04-5.jpg",
    alt: "Custom garage door finish",
    span: "tall",
  },
  {
    src: "/images/gallery/07-4.jpg",
    alt: "Modern garage door fitted on a Brisbane home",
  },
  {
    src: "/images/gallery/08-1.jpg",
    alt: "Premium sectional garage door install",
  },
  {
    src: "/images/gallery/03-5.jpg",
    alt: "Stylish garage door replacement",
    span: "wide",
  },
  {
    src: "/images/gallery/05-4.jpg",
    alt: "Residential garage door upgrade",
  },
  {
    src: "/images/gallery/06-3.jpg",
    alt: "Garage door fitted to suit a contemporary facade",
  },
  {
    src: "/images/gallery/02-5.jpg",
    alt: "Quality garage door installation",
  },
  {
    src: "/images/gallery/10-sams.jpg",
    alt: "Recent Sparrow garage door installation",
  },
];

export default function GalleryPage() {
  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/gallery/09-2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-brand-navy/85" />
        <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />

        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-36 text-center md:pb-28 md:pt-48">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            <span className="text-brand-yellow">OUR WORK</span>{" "}
            <span className="text-white">in Action</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold uppercase tracking-[0.2em] text-white/80 md:text-base">
            See the Quality Behind Every Project
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <QuoteButton className="inline-flex w-full items-center justify-center bg-brand-yellow px-8 py-3.5 font-display text-base font-extrabold uppercase tracking-wide text-brand-navy shadow-md transition hover:bg-brand-yellow/90 sm:w-auto md:text-lg">
              Get a Free Quote
            </QuoteButton>
            <a
              href="tel:0731803857"
              className="inline-flex w-full items-center justify-center border-2 border-white/30 bg-white/5 px-8 py-3 font-display text-base font-extrabold uppercase tracking-wide text-white transition hover:bg-white/10 sm:w-auto md:text-lg"
            >
              Call 07 3180 3857
            </a>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="relative mb-10 h-[68px] md:mb-12 md:h-[136px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[52px] font-extrabold leading-none tracking-tight md:text-[112px]">
              GALLERY
            </h2>
            <h2 className="absolute bottom-0 left-3 font-display text-[44px] font-extrabold leading-none tracking-tight text-brand-navy md:left-6 md:text-[96px]">
              GALLERY
            </h2>
          </div>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            Sectional doors, roller doors, custom finishes and full
            installations. Explore our recent work and see what&apos;s
            possible for your home.
          </p>

          <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:auto-rows-[260px] md:gap-6 lg:grid-cols-3">
            {gallery.map((img) => (
              <li
                key={img.src + img.alt}
                className={`group relative overflow-hidden rounded-xl shadow-md ring-1 ring-black/10 ${
                  img.span === "wide"
                    ? "col-span-2"
                    : img.span === "tall"
                      ? "row-span-2"
                      : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-bottom transition duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
      <LocationMap />
      <Footer />
    </main>
  );
}
