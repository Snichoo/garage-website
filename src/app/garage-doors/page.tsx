import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LazyVideo from "@/components/LazyVideo";
import LocationMap from "@/components/LocationMap";
import QuoteButton from "@/components/QuoteButton";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
  title: "New Garage Doors Brisbane | Supplied & Installed",
  description: `New garage doors supplied and installed across Brisbane. Sectional, roller and tilt doors in a huge range of colours and finishes, with the motor fitted. Free on-site measure and a fixed quote—call ${cfg.phoneDisplay}.`,
  path: "/garage-doors",
});
}

const features = [
  "New sectional, roller and tilt doors supplied and installed.",
  "Free on-site measure before you commit to anything.",
  "Wide range of designs, colours and finishes to suit any home.",
  "Motor, remotes and removal of the old door included in the quote.",
];

const garageDoorFaqs = [
  {
    q: "Which type of garage door is best for my home?",
    a: "It depends on your space and style preferences. Sectional doors suit short driveways and offer great insulation, roller doors are ideal for tight spaces with limited headroom, and tilt doors offer a classic look for homes with ample outdoor clearance. We can guide you through the options during a free on-site consultation.",
  },
  {
    q: "How long does a garage door installation take?",
    a: "Most standard residential garage door installations are completed in a single day. The exact time depends on the door type, the condition of the existing opening and whether automation or extra hardware is being installed.",
  },
  {
    q: "Can you replace an existing garage door with a different type?",
    a: "Yes. We frequently swap older tilt doors for modern sectional or roller doors. We'll assess the headroom, side clearance and motor placement, then recommend the door types that will fit cleanly.",
  },
  {
    q: "Do you supply and install motors and remotes with new doors?",
    a: "Absolutely. Every new door can be supplied with a quality automatic opener, remotes, wall controls and optional Wi-Fi receivers so you can operate the door from your smartphone.",
  },
  {
    q: "Do you offer warranties on new garage doors?",
    a: "Yes, all of our installed garage doors and motors are covered by a manufacturer warranty, plus our own workmanship warranty on the installation itself.",
  },
];

type DoorType = {
  id: string;
  name: string;
  media:
    | { kind: "image"; src: string; alt: string }
    | { kind: "video"; src: string; poster: string; objectPosition?: string };
  intro: string;
  benefits: string[];
  services: string[];
  href: string;
};

const doorTypes: DoorType[] = [
  {
    id: "sectional",
    name: "Sectional Garage Doors",
    media: {
      kind: "video",
      src: "/videos/sectional-door-v2.mp4",
      poster: "/images/video-posters/sectional-door-v2.webp",
      objectPosition: "60% center",
    },
    intro:
      "Sectional doors are made of multiple horizontal panels connected by hinges, opening vertically and sliding smoothly into the ceiling space. Space-efficient and modern, they're an excellent choice for almost any home.",
    benefits: [
      "Space-saving vertical opening, ideal for short driveways.",
      "Superior thermal and acoustic insulation.",
      "Wide range of colours, materials and finishes.",
      "Built tough for long-lasting, reliable performance.",
    ],
    services: [
      "Installation",
      "Spring Replacement",
      "Panel Replacement",
      "Door Opener Replacement",
    ],
    href: "/sectional-garage-doors",
  },
  {
    id: "roller",
    name: "Roller Garage Doors",
    media: {
      kind: "video",
      src: "/videos/roller-door-v2.mp4",
      poster: "/images/video-posters/roller-door-v2.webp",
    },
    intro:
      "Roller doors are made of narrow horizontal slats that roll up into a compact drum above the opening. Known for their durability, security and space-saving design, they're an excellent choice for garages with restricted headroom.",
    benefits: [
      "Compact drum design, perfect for low headroom and tight spaces.",
      "Strong materials handle daily use and harsh weather.",
      "Low maintenance and long lasting with minimal upkeep.",
      "Customisable finishes and colours to match your property.",
    ],
    services: [
      "Installation",
      "Door Maintenance",
      "Door Opener Replacement",
      "Re-Alignment",
    ],
    href: "/roller-doors",
  },
  {
    id: "tilt",
    name: "Tilt Garage Doors",
    media: {
      kind: "video",
      src: "/videos/tilt-door-v2.mp4",
      poster: "/images/video-posters/tilt-door-v2.webp",
    },
    intro:
      "Tilt doors operate as a single solid panel that tilts outward and upward when opening. With a timeless design and robust construction, they're perfect for garages with ample outdoor space and homeowners seeking a traditional aesthetic.",
    benefits: [
      "Classic, elegant look that suits traditional and modern homes.",
      "Simple operation with minimal moving parts.",
      "Built tough to withstand frequent use and harsh weather.",
      "Customisable finishes and materials to match your style.",
    ],
    services: [
      "Installation",
      "Door Maintenance",
      "Door Opener Replacement",
      "Re-Alignment",
    ],
    href: "/tilt-doors",
  },
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

type DoorTileProps = {
  label: string;
  aspect: string;
  priority?: boolean;
  span2?: boolean;
} & (
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string }
);

function DoorTile(props: DoorTileProps) {
  const { label, aspect, priority = false, span2 = false } = props;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl ring-1 ring-white/5 ${aspect} ${
        span2 ? "col-span-2" : ""
      }`}
    >
      {props.kind === "image" ? (
        <Image
          src={props.src}
          alt={props.alt}
          fill
          sizes={span2 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 50vw"}
          priority={priority}
          quality={70}
          className="object-cover"
        />
      ) : (
        <LazyVideo
          src={props.src}
          poster={props.poster}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-extrabold uppercase tracking-tight text-white drop-shadow-md md:p-5 md:text-2xl">
        {label}
      </p>
    </div>
  );
}

export default async function GarageDoorsPage() {
  return (
    <main className="garage-bg">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Garage Doors", path: "/garage-doors" },
          ]),
          await serviceSchema({
            name: "Garage Door Installation",
            description:
              "Supply and installation of new sectional, roller and tilt garage doors across Brisbane and South East Queensland.",
            path: "/garage-doors",
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
              New Garage Doors,
              <br />
              <span className="text-brand-yellow">Built to Last</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Buying a new garage door? We supply and install the full range of
              residential doors across Brisbane, from sectional and roller
              doors to classic tilt designs. We measure up for free, help you
              settle on the right style, colour and motor, then take the old
              door away and fit the new one from start to finish.
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
                href="#types"
                className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
              >
                Explore door types
                <ArrowRight />
              </a>
              <QuoteButton
                className="inline-flex items-center gap-3 rounded-none border-2 border-white/30 bg-white/5 px-6 py-3.5 font-display text-base font-extrabold tracking-wide text-white transition hover:bg-white/10 md:text-lg"
              >
                Get a quote today
              </QuoteButton>
            </div>
          </div>

          {/* Right: three door-type tiles, bento layout */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <DoorTile
              kind="video"
              src="/videos/sectional-door-v2.mp4"
              poster="/images/video-posters/sectional-door-v2.webp"
              label="Sectional Doors"
              aspect="aspect-[16/9]"
              span2
            />
            <DoorTile
              kind="video"
              src="/videos/roller-door-v2.mp4"
              poster="/images/video-posters/roller-door-v2.webp"
              label="Roller Doors"
              aspect="aspect-[4/3]"
            />
            <DoorTile
              kind="video"
              src="/videos/tilt-door-v2.mp4"
              poster="/images/video-posters/tilt-door-v2.webp"
              label="Tilt Doors"
              aspect="aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Door types - detailed */}
      <section id="types" className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Stencil heading */}
          <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
              TYPES OF GARAGE DOORS
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              TYPES OF GARAGE DOORS
            </h2>
          </div>

          <p className="mb-12 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            We supply and install every common style of residential garage
            door. Pick the type that fits your home and we&apos;ll handle the
            rest, from custom sizing and colour matching to professional
            installation and ongoing service. Already have a door that needs
            attention? Head to{" "}
            <Link
              href="/repairs"
              className="font-bold text-brand-navy underline underline-offset-4 transition hover:text-brand-yellow"
            >
              garage door repairs
            </Link>{" "}
            instead.
          </p>

          <div className="flex flex-col gap-12 md:gap-16">
            {doorTypes.map((d, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={d.id}
                  id={d.id}
                  className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10"
                >
                  {/* Media */}
                  <Link
                    href={d.href}
                    aria-label={`Learn more about ${d.name}`}
                    className={`group relative aspect-[4/3] w-full overflow-hidden bg-brand-navy shadow-md md:aspect-[16/11] ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    {d.media.kind === "image" ? (
                      <Image
                        src={d.media.src}
                        alt={d.media.alt}
                        fill
                        sizes="(min-width: 1024px) 580px, 100vw"
                        quality={70}
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <LazyVideo
                        src={d.media.src}
                        poster={d.media.poster}
                        style={d.media.objectPosition ? { objectPosition: d.media.objectPosition } : undefined}
                        className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </Link>

                  {/* Copy card */}
                  <div className="flex flex-col bg-brand-navy text-white shadow-md">
                    <span aria-hidden className="h-1.5 w-full bg-brand-yellow" />
                    <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
                      <h3 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
                        <Link href={d.href} className="transition hover:underline">
                          {d.name}
                        </Link>
                      </h3>
                      <p className="text-sm leading-relaxed text-white/85 md:text-base">
                        {d.intro}
                      </p>

                      <ul className="flex flex-col gap-2.5">
                        {d.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-sm leading-relaxed text-white/90 md:text-base"
                          >
                            <span className="mt-1 shrink-0 text-brand-yellow">
                              <CheckMark />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-1 border-t border-white/15 pt-5">
                        <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                          Services We Offer
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {d.services.map((s) => (
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

                      <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={d.href}
                          className="inline-flex flex-1 items-center justify-center gap-3 bg-brand-yellow px-6 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 md:text-lg"
                        >
                          Learn more
                          <ArrowRight />
                        </Link>
                        <QuoteButton
                          className="inline-flex flex-1 items-center justify-center gap-3 border-2 border-white/30 bg-white/5 px-6 py-3 font-display text-base font-extrabold tracking-wide text-white transition hover:bg-white/10 md:text-lg"
                        >
                          Get a quote today
                        </QuoteButton>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Faq
        items={garageDoorFaqs}
        intro="Common questions about choosing and installing a new sectional, roller or tilt garage door."
      />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
