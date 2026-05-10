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
  "Wi-Fi receivers for full remote control of gates and garage doors.",
  "Security and monitoring kits with cameras, sensors and live alerts.",
  "Long-range and multi-device additional remotes for extra convenience.",
  "Professional installation, programming and ongoing support.",
];

const smartKitFaqs = [
  {
    q: "What is included in a Wi-Fi Control Kit?",
    a: "A Wi-Fi Control Kit typically includes a Wi-Fi receiver and all necessary components to connect your automated gate or garage door to your smartphone, allowing for remote control.",
  },
  {
    q: "Can I install a smart kit myself?",
    a: "While installation is straightforward, we recommend professional installation to ensure that all components are set up correctly and integrated with your existing systems.",
  },
  {
    q: "How do additional remotes work with my existing system?",
    a: "Additional remotes sync with your existing gate or door system, providing more flexibility for control. They can be programmed for multiple gates or additional functions such as opening lights or alarms.",
  },
  {
    q: "Do smart kits require a Wi-Fi connection?",
    a: "Yes, these kits require a stable Wi-Fi connection for remote control, monitoring, and alerts.",
  },
  {
    q: "How often should I replace the batteries in my remotes?",
    a: "We recommend checking the batteries every 6-12 months to ensure uninterrupted operation. If your remote becomes unresponsive, it may be time for a battery replacement.",
  },
];

type SmartKit = {
  id: string;
  name: string;
  tag?: string;
  image: string;
  alt: string;
  intro: string;
  benefits: string[];
  services: string[];
};

const smartKits: SmartKit[] = [
  {
    id: "wifi",
    name: "Wi-Fi Control Kits",
    image: "/images/smart-kits/back-view-businesswoman-with-smartphone.avif",
    alt: "Person using a smartphone to remotely control a gate",
    intro:
      "Wi-Fi Control Kits enable remote operation of your automated gates and garage doors through Wi-Fi receivers, letting you control your system from anywhere, anytime, using a smartphone app.",
    benefits: [
      "Remote access to your gates and doors from your phone, no matter where you are.",
      "Quick, hassle-free installation with minimal disruption.",
      "Seamless integration with most automated gate and garage door systems.",
      "Intuitive, user-friendly app for easy operation and customisation.",
    ],
    services: [
      "Installation Service",
      "App Support",
      "System Upgrades",
    ],
  },
  {
    id: "security",
    name: "Security and Monitoring Kits",
    image: "/images/smart-kits/video-intercom.avif",
    alt: "Wi-Fi video intercom mounted at the entrance of an automated gate",
    intro:
      "Combine Wi-Fi receivers with cameras, motion sensors and real-time alerts for enhanced security, ideal for monitoring your gates and garage doors remotely.",
    benefits: [
      "Advanced protection for entry points with added peace of mind.",
      "Real-time alerts when motion is detected or security issues arise.",
      "Live remote viewing from your smartphone, on the go.",
      "Integrated cameras and sensors for a comprehensive security solution.",
    ],
    services: [
      "Installation & Setup",
      "Integration Support",
      "Maintenance Services",
    ],
  },
  {
    id: "remotes",
    name: "Additional Remote Kits",
    image: "/images/smart-kits/remote-control.avif",
    alt: "Extra long-range remotes for automated gates and garage doors",
    intro:
      "Additional remote kits provide extra or specialised remotes for your gates and garage doors, adding convenience, long-range access and the ability to sync multiple devices.",
    benefits: [
      "Add more remotes for greater flexibility and convenience.",
      "Long-range access to control gates and doors from greater distances.",
      "Multi-device syncing to operate different gates or doors from one remote.",
      "Customisable features for controlling multiple gates or specific functions.",
    ],
    services: [
      "Remote Programming",
      "Battery Replacement",
      "Troubleshooting",
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

type KitTileProps = {
  src: string;
  alt: string;
  label: string;
  aspect: string;
  priority?: boolean;
  span2?: boolean;
};

function KitTile({
  src,
  alt,
  label,
  aspect,
  priority = false,
  span2 = false,
}: KitTileProps) {
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

export default function SmartKitsPage() {
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
              Smart Kits,
              <br />
              <span className="text-brand-yellow">Smarter Control</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Enhance your experience with automated gates and garage doors by
              exploring our range of smart kits. From Wi-Fi receivers to
              security cameras and additional remotes, our carefully curated
              kits combine the latest technology with seamless operation -
              making it easier than ever to manage your entry points.
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
                Explore smart kits
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

          {/* Right: three kit images, bento layout */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <KitTile
              src="/images/smart-kits/video-intercom.avif"
              alt="Wi-Fi video intercom mounted at the entrance of an automated gate"
              label="Security & Monitoring"
              aspect="aspect-[16/9]"
              priority
              span2
            />
            <KitTile
              src="/images/smart-kits/back-view-businesswoman-with-smartphone.avif"
              alt="Person using a smartphone to remotely control a gate"
              label="Wi-Fi Control"
              aspect="aspect-[4/3]"
            />
            <KitTile
              src="/images/smart-kits/remote-control.avif"
              alt="Remote control for garage door"
              label="Additional Remotes"
              aspect="aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Smart kit types - detailed */}
      <section id="types" className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Stencil heading */}
          <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
              TYPES OF SMART KITS
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              TYPES OF SMART KITS
            </h2>
          </div>

          <p className="mb-12 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            Whether you&apos;re upgrading with remote access, adding extra
            security, or expanding your control options, we supply, install
            and support a full range of smart kits for automated gates and
            garage doors.
          </p>

          <div className="flex flex-col gap-12 md:gap-16">
            {smartKits.map((k, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={k.id}
                  id={k.id}
                  className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10"
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-brand-navy/5 shadow-md md:aspect-[16/11] ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={k.image}
                      alt={k.alt}
                      fill
                      sizes="(min-width: 1024px) 580px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Copy card */}
                  <div className="flex flex-col bg-brand-navy text-white shadow-md">
                    <span aria-hidden className="h-1.5 w-full bg-brand-yellow" />
                    <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
                      {k.tag && (
                        <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                          {k.tag}
                        </p>
                      )}
                      <h3 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
                        {k.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/85 md:text-base">
                        {k.intro}
                      </p>

                      <ul className="flex flex-col gap-2.5">
                        {k.benefits.map((b) => (
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
                          {k.services.map((s) => (
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
        items={smartKitFaqs}
        intro="Common questions about our Wi-Fi control, security and additional remote kits for gates and garage doors."
      />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
