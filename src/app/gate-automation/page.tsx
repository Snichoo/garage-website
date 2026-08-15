import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";
import QuoteButton from "@/components/QuoteButton";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, getSiteConfig, breadcrumbSchema, serviceSchema } from "@/lib/site";

export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return pageMetadata({
  title: "Gate Motors & Automation Brisbane | Supply & Installation",
  description: `Gate motors and automation across Brisbane. Sliding, swing and telescopic gates automated with remotes, keypads, safety beams and smart control. Free quote, call ${cfg.phoneDisplay}.`,
  path: "/gate-automation",
});
}

const features = [
  "Motors supplied and installed for telescopic, sliding and double gates.",
  "Remotes, keypads, intercoms and smart phone control.",
  "Safety beams and auto-reverse fitted and tested on every install.",
  "Motor replacement, maintenance and repair on any brand.",
];

const gateFaqs = [
  {
    q: "What is the difference between telescopic, sliding or double gates?",
    a: "Telescopic gates use two or more overlapping panels that slide and nest together, halving the run-off space a standard sliding gate needs. Sliding gates move horizontally along a single track, and double gates consist of two symmetrical panels that open either inward or outward. Each type is suited to different property layouts and space requirements.",
  },
  {
    q: "Can all gates be automated?",
    a: "Yes, we offer automation upgrades for all types of gates, including telescopic, sliding, and double gates. Automation enhances convenience and security.",
  },
  {
    q: "How often should I schedule gate maintenance?",
    a: "Regular maintenance is recommended at least once a year to ensure optimal performance and longevity of your gate system.",
  },
  {
    q: "Can you repair gates with alignment issues?",
    a: "Yes, we provide re-alignment services for all gate types to ensure smooth and secure operation.",
  },
  {
    q: "Do you replace gate motors and control boards?",
    a: "Absolutely. We specialize in motor replacement for all gate types and board replacement specifically for sliding gates.",
  },
];

type GateType = {
  id: string;
  name: string;
  image: string;
  alt: string;
  intro: string;
  benefits: string[];
  services: string[];
};

const gateTypes: GateType[] = [
  {
    id: "telescopic",
    name: "Automated Telescopic Gates",
    image: "/images/automated-gates.webp",
    alt: "Modern automated telescopic gate with overlapping panels",
    intro:
      "Telescopic gates use two or more overlapping panels that slide and nest together, delivering a wide opening in roughly half the run-off space of a standard sliding gate.",
    benefits: [
      "Ideal for narrow driveways and properties with limited side clearance.",
      "Wide clear opening without sacrificing kerbside space.",
      "Smooth, synchronised panel motion with quiet operation.",
      "Available in a wide range of materials, styles and finishes.",
    ],
    services: [
      "Automation Installation",
      "Track & Roller Service",
      "Maintenance Service",
      "Motor Replacement",
    ],
  },
  {
    id: "sliding",
    name: "Automated Sliding Gates",
    image: "/images/gates/sliding-gate.avif",
    alt: "Automated sliding driveway gate on a track",
    intro:
      "Sliding gates run horizontally along a track, perfect for properties with limited driveway space, combining function with a clean, modern look.",
    benefits: [
      "Space-saving design ideal where double gates aren't an option.",
      "Robust locking and sturdy construction for enhanced security.",
      "Low maintenance with consistent, reliable performance.",
      "Customisable in a range of designs, colours and materials.",
    ],
    services: [
      "Automation Installation",
      "Board Replacement",
      "Maintenance Service",
      "Motor Replacement",
    ],
  },
  {
    id: "double",
    name: "Double Gates Automation",
    image: "/images/gates/double-gates.avif",
    alt: "Symmetrical automated double entry gates",
    intro:
      "Double gates use two symmetrical panels that open inward or outward together, a wide, grand entrance for properties that want both presence and access.",
    benefits: [
      "Balanced, stylish appearance that elevates the property.",
      "Wide opening for larger vehicles and equipment.",
      "Customisable finishes, styles and materials.",
      "High-quality construction for long-lasting performance.",
    ],
    services: [
      "Automation Installation",
      "Maintenance Service",
      "Motor Replacement",
      "Re-Alignment",
    ],
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

type GateTileProps = {
  src: string;
  alt: string;
  label: string;
  aspect: string;
  priority?: boolean;
  span2?: boolean;
};

function GateTile({
  src,
  alt,
  label,
  aspect,
  priority = false,
  span2 = false,
}: GateTileProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl ring-1 ring-white/5 ${aspect} ${
        span2 ? "col-span-2" : ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={span2 ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 50vw"}
        priority={priority}
        className="object-cover"
      />
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

export default async function GateAutomationPage() {
  return (
    <main className="garage-bg">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Automation", path: "/automation" },
            { name: "Gate Motors & Automation", path: "/gate-automation" },
          ]),
          await serviceSchema({
            name: "Gate Motors & Automation",
            description:
              "Supply, installation and replacement of gate motors and automation for sliding, swing and telescopic gates across Brisbane and South East Queensland.",
            path: "/gate-automation",
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
              Gate Motors &amp;
              <br />
              <span className="text-brand-yellow">Automation</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Whether you want the gate you already have automated, a tired
              motor replaced, or a full system installed alongside a brand new
              gate, we supply and fit the motor, remotes, keypads and safety
              gear and hand it over working properly on the day.
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
                Explore gate types
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

          {/* Right: three gate-type images, bento layout */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <GateTile
              src="/images/automated-gates.webp"
              alt="Modern automated telescopic gate with overlapping panels"
              label="Telescopic Gates"
              aspect="aspect-[16/9]"
              priority
              span2
            />
            <GateTile
              src="/images/gates/sliding-gate.avif"
              alt="Automated sliding driveway gate on a track"
              label="Sliding Gates"
              aspect="aspect-[4/3]"
            />
            <GateTile
              src="/images/gates/double-gates.avif"
              alt="Symmetrical automated double entry gates"
              label="Double Gates"
              aspect="aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Gate types - detailed */}
      <section id="types" className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Stencil heading */}
          <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
              WHAT WE AUTOMATE
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              WHAT WE AUTOMATE
            </h2>
          </div>

          <p className="mb-12 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            We automate every common gate layout, on gates we have built and on
            gates that were already there. If you are after a complete new gate
            as well, see our{" "}
            <Link
              href="/gates"
              className="font-bold text-brand-navy underline underline-offset-4 transition hover:text-brand-yellow"
            >
              new gates
            </Link>{" "}
            page.
          </p>

          <div className="flex flex-col gap-12 md:gap-16">
            {gateTypes.map((g, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={g.id}
                  id={g.id}
                  className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10"
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-brand-navy/5 shadow-md md:aspect-[16/11] ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={g.image}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 1024px) 580px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Copy card */}
                  <div className="flex flex-col bg-brand-navy text-white shadow-md">
                    <span aria-hidden className="h-1.5 w-full bg-brand-yellow" />
                    <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
                      <h3 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
                        {g.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/85 md:text-base">
                        {g.intro}
                      </p>

                      <ul className="flex flex-col gap-2.5">
                        {g.benefits.map((b) => (
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
                          {g.services.map((s) => (
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

                      <QuoteButton
                        className="mt-auto inline-flex w-full items-center justify-center gap-3 bg-brand-yellow px-6 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 md:text-lg"
                      >
                        Get a free quote
                      </QuoteButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Faq
        items={gateFaqs}
        intro="Common questions about our automated telescopic, sliding and double gate services."
      />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
