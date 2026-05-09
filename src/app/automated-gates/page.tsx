import Image from "next/image";
import AreasWeServe from "@/components/AreasWeServe";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";
import QuoteButton from "@/components/QuoteButton";
import WhyChooseUs from "@/components/WhyChooseUs";

const features = [
  "Professional installation of automation for swing, sliding and double gates.",
  "Custom designs, finishes and materials to suit any property.",
  "Robust construction built to handle daily use and harsh weather.",
  "Comprehensive maintenance and repair to keep your gate operating safely.",
];

const gateFaqs = [
  {
    q: "What is the difference between swing, sliding or double gates?",
    a: "Swing gates open inward or outward on hinges, sliding gates move horizontally along a track, and double gates consist of two symmetrical panels that open either inward or outward. Each type is suited to different property layouts and space requirements.",
  },
  {
    q: "Can all gates be automated?",
    a: "Yes, we offer automation upgrades for all types of gates, including swing, sliding, and double gates. Automation enhances convenience and security.",
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
    id: "swing",
    name: "Automated Swing Gates",
    image: "/images/gates/swing-gate.avif",
    alt: "Modern wrought iron automated swing gate",
    intro:
      "Swing gates open inward or outward on sturdy hinges, a classic, sophisticated entrance ideal for properties with the room to swing freely.",
    benefits: [
      "Timeless, traditional design that suits almost any property.",
      "Smooth, quiet operation with minimal maintenance.",
      "Available in a wide range of materials, styles and finishes.",
      "Built to withstand frequent use and changing weather.",
    ],
    services: [
      "Automation Installation",
      "Cable Replacement",
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
      "Space-saving design ideal where swing gates aren't an option.",
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

export default function AutomatedGatesPage() {
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
              Automated Gates,
              <br />
              <span className="text-brand-yellow">Built to Last</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              From professional installation to regular maintenance and reliable
              repairs, our team makes sure your automated gate operates smoothly
              and securely, whether you&apos;re setting up a brand-new system
              or fixing an existing one.
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
              src="/images/gates/swing-gate.avif"
              alt="Modern wrought iron automated swing gate"
              label="Swing Gates"
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
              TYPES OF GATES
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              TYPES OF GATES
            </h2>
          </div>

          <p className="mb-12 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            We design, install and service every common style of automated
            gate. Find the layout that fits your property, then we&apos;ll take
            care of the rest.
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

      <WhyChooseUs />

      <AreasWeServe />

      <Faq
        items={gateFaqs}
        intro="Common questions about our automated swing, sliding and double gate services."
      />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
