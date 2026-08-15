import Image from "next/image";
import Link from "next/link";
import AreasWeServe from "@/components/AreasWeServe";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";
import OurWorkInAction from "@/components/OurWorkInAction";
import QuoteButton from "@/components/QuoteButton";
import Reviews from "@/components/Reviews";
import { getContent } from "@/lib/content";

/**
 * Shared layout for the four top-level service categories (Repairs, Garage
 * Doors, Gates, Automation). The hero mirrors the individual service pages,
 * then a card grid fans out to the child pages listed in the header dropdown
 * for that category.
 */

export type HubTile = {
  src: string;
  alt: string;
  label: string;
};

export type HubService = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  points: string[];
};

export type ServiceHubContent = {
  titleLead: string;
  titleAccent: string;
  intro: string;
  heroBullets: string[];
  /** Exactly three: the first spans both columns in the bento grid. */
  heroTiles: [HubTile, HubTile, HubTile];
  /** Yellow hero button. Omit to show the phone number instead. */
  heroCta?: { label: string; href: string };
  sectionHeading: string;
  sectionIntro: string;
  services: HubService[];
  /** Optional band between hero and cards, e.g. the complete-gate package. */
  band?: { heading: string; text: string; points: string[]; image: string; alt: string };
  faqs: { q: string; a: string }[];
  faqIntro: string;
};

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

function ArrowRight() {
  return (
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
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
    </svg>
  );
}

function Tile({
  tile,
  aspect,
  span2 = false,
  priority = false,
}: {
  tile: HubTile;
  aspect: string;
  span2?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl ring-1 ring-white/5 ${aspect} ${
        span2 ? "col-span-2" : ""
      }`}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes={
          span2
            ? "(min-width: 1024px) 640px, 100vw"
            : "(min-width: 1024px) 320px, 50vw"
        }
        priority={priority}
        className="object-cover"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-extrabold uppercase tracking-tight text-white drop-shadow-md md:p-5 md:text-2xl">
        {tile.label}
      </p>
    </div>
  );
}

export default async function ServiceHubPage({
  content,
}: {
  content: ServiceHubContent;
}) {
  const { business } = await getContent();

  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(253,215,16,0.15),transparent_55%)]" />

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-40 md:pb-24 md:pt-48 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pt-40">
          {/* Left copy */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
              {content.titleLead}
              <br />
              <span className="text-brand-yellow">{content.titleAccent}</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {content.intro}
            </p>
            <ul className="flex flex-col gap-3">
              {content.heroBullets.map((f) => (
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
              {content.heroCta ? (
                <a
                  href={content.heroCta.href}
                  className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
                >
                  {content.heroCta.label}
                  <ArrowRight />
                </a>
              ) : (
                <a
                  href={`tel:${business.phoneLink}`}
                  className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
                >
                  Call {business.phoneDisplay}
                  <PhoneIcon />
                </a>
              )}
              <QuoteButton className="inline-flex items-center gap-3 rounded-none border-2 border-white/30 bg-white/5 px-6 py-3.5 font-display text-base font-extrabold tracking-wide text-white transition hover:bg-white/10 md:text-lg">
                Get a free quote
              </QuoteButton>
            </div>
          </div>

          {/* Right: bento tiles */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Tile tile={content.heroTiles[0]} aspect="aspect-[16/9]" span2 priority />
            <Tile tile={content.heroTiles[1]} aspect="aspect-[4/3]" />
            <Tile tile={content.heroTiles[2]} aspect="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Optional feature band */}
      {content.band && (
        <section className="w-full py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy/5 shadow-md md:aspect-[16/11]">
                <Image
                  src={content.band.image}
                  alt={content.band.alt}
                  fill
                  sizes="(min-width: 1024px) 580px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col bg-brand-navy text-white shadow-md">
                <span aria-hidden className="h-1.5 w-full bg-brand-yellow" />
                <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
                  <h2 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
                    {content.band.heading}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/85 md:text-base">
                    {content.band.text}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {content.band.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-sm leading-relaxed text-white/90 md:text-base"
                      >
                        <span className="mt-1 shrink-0 text-brand-yellow">
                          <CheckMark />
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <QuoteButton className="mt-auto inline-flex w-full items-center justify-center gap-3 bg-brand-yellow px-6 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 md:text-lg">
                    Get a free quote
                  </QuoteButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sub-service cards */}
      <section id="services" className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Stencil heading */}
          <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
              {content.sectionHeading}
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              {content.sectionHeading}
            </h2>
          </div>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-700 md:mb-12 md:text-lg">
            {content.sectionIntro}
          </p>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((s) => (
              <li
                key={s.title}
                className="group mx-auto flex w-full max-w-[400px] flex-col bg-brand-navy text-white shadow-md transition hover:shadow-xl sm:max-w-none"
              >
                <Link
                  href={s.href}
                  aria-label={s.title}
                  className="relative block aspect-[16/10] w-full overflow-hidden"
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-brand-yellow md:text-2xl">
                    <Link href={s.href} className="transition hover:underline">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-white/85 md:text-base">
                    {s.description}
                  </p>

                  <ul className="flex flex-col gap-2.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-sm leading-snug text-white/90"
                      >
                        <span className="mt-0.5 shrink-0 text-brand-yellow">
                          <CheckMark />
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={s.href}
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 bg-brand-yellow px-5 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90"
                  >
                    Learn more
                    <ArrowRight />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reviews />

      <OurWorkInAction />

      <AreasWeServe />

      <Faq items={content.faqs} intro={content.faqIntro} />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
