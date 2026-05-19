import Image from "next/image";
import AreasWeServe from "@/components/AreasWeServe";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowCanWeHelp from "@/components/HowCanWeHelp";
import LocationMap from "@/components/LocationMap";
import OurWorkInAction from "@/components/OurWorkInAction";
import QuoteButton from "@/components/QuoteButton";
import Reviews from "@/components/Reviews";

export type PartServiceContent = {
  titleLead: string;
  titleAccent: string;
  intro: string;
  introExtra?: string;
  heroIcon: string;
  heroIconAlt: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroBullets: string[];
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

export default function PartServicePage({ content }: { content: PartServiceContent }) {
  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(253,215,16,0.15),transparent_55%)]" />

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-40 md:pb-24 md:pt-48 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:pt-40">
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
            {content.introExtra && (
              <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                {content.introExtra}
              </p>
            )}
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
              <a
                href="tel:0468789795"
                className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
              >
                Call 0468 789 795
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-5 w-5"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
                </svg>
              </a>
              <QuoteButton
                className="inline-flex items-center gap-3 rounded-none border-2 border-white/30 bg-white/5 px-6 py-3.5 font-display text-base font-extrabold tracking-wide text-white transition hover:bg-white/10 md:text-lg"
              >
                Get a free quote
              </QuoteButton>
            </div>
          </div>

          {/* Right: hero photo (if provided) or icon panel */}
          <div className="flex items-center justify-center">
            {content.heroImage ? (
              <div className="relative aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-3xl border border-white/15 shadow-2xl md:aspect-[5/6]">
                <Image
                  src={content.heroImage}
                  alt={content.heroImageAlt ?? content.heroIconAlt}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/95 p-12 shadow-2xl md:p-16">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(253,215,16,0.18),transparent_70%)]"
                />
                <Image
                  src={content.heroIcon}
                  alt={content.heroIconAlt}
                  width={420}
                  height={420}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <Reviews />

      <HowCanWeHelp />

      <OurWorkInAction />

      <AreasWeServe />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
