import ColorbondRange from "@/components/ColorbondRange";
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
  title: "Tilt Garage Doors Brisbane | Installation & Repairs",
  description: `Classic tilt garage doors installed, serviced and repaired across Brisbane. Timeless single-panel doors built tough for years of daily use. Get a quote today—call ${cfg.phoneDisplay}.`,
  path: "/tilt-doors",
});
}

const features = [
  "Classic design with a timeless, elegant look that suits traditional and modern homes.",
  "Simple operation with minimal moving parts for straightforward, reliable functionality.",
  "Built tough to withstand frequent use and harsh weather conditions.",
  "Customisable finishes and materials to match your property's style.",
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

export default async function TiltDoorsPage() {
  return (
    <main className="garage-bg">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tilt Doors", path: "/tilt-doors" },
          ]),
          await serviceSchema({
            name: "Tilt Garage Door Installation & Repairs",
            description:
              "Installation, servicing and repair of tilt garage doors across Brisbane and South East Queensland.",
            path: "/tilt-doors",
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
              Your Tilt Garage Door,
              <br />
              <span className="text-brand-yellow">Built to Last</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Tilt garage doors operate as a single solid panel that tilts
              outward and upward when opening. With a timeless design and robust
              construction, they&apos;re perfect for garages with ample outdoor
              space, a great option for homeowners seeking a traditional
              aesthetic with reliable functionality.
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
                href="#colours"
                className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
              >
                Explore colours
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
                Get a quote today
              </QuoteButton>
            </div>
          </div>

          {/* Right: video + services */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl">
              <video
                src="/videos/Tilt_Door.mp4"
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

      <div id="colours">
        <ColorbondRange />
      </div>

      <Faq />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
