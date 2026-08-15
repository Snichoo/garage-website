import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroQuoteForm from "@/components/HeroQuoteForm";
import LocationMap from "@/components/LocationMap";
import Reviews from "@/components/Reviews";
import { getContent } from "@/lib/content";

/**
 * Shared layout for the focused enquiry pages under Contact (Request a Quote,
 * Book a Service). Both post through the same /api/send endpoint as the
 * homepage quote form and land on /thank-you.
 */

export type EnquiryPageContent = {
  titleHighlight: string;
  titleRest: string;
  intro: string;
  heroImage: string;
  formTitle: string;
  formTitleHighlight: string;
  formText: string;
  submitLabel: string;
  steps: { title: string; text: string }[];
  callPrompt: string;
};

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
    </svg>
  );
}

export default async function EnquiryPage({
  content,
}: {
  content: EnquiryPageContent;
}) {
  const { business } = await getContent();

  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src={content.heroImage}
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
            <span className="text-brand-yellow">{content.titleHighlight}</span>{" "}
            <span className="text-white">{content.titleRest}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {content.intro}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent)]" />
      </section>

      {/* Form + what happens next */}
      <section className="relative w-full">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          {/* Form card */}
          <div className="bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-10">
            <h2 className="font-display text-2xl font-extrabold text-brand-navy md:text-3xl">
              {content.formTitle}{" "}
              <span className="text-brand-yellow">
                {content.formTitleHighlight}
              </span>
            </h2>
            <p className="mb-8 mt-2 text-sm text-neutral-600 md:text-base">
              {content.formText}
            </p>

            <HeroQuoteForm submitLabel={content.submitLabel} />
          </div>

          {/* Steps + call card */}
          <div className="flex flex-col gap-5">
            <ol className="flex flex-col gap-5">
              {content.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 bg-white/95 p-5 shadow-lg ring-1 ring-black/5 md:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-navy font-display text-base font-extrabold text-brand-yellow">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-extrabold text-brand-navy md:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={`tel:${business.phoneLink}`}
              className="garage-bg-navy-tight relative overflow-hidden p-6 text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 md:p-7"
            >
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-yellow text-brand-navy shadow-md">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-yellow">
                    {content.callPrompt}
                  </h3>
                  <p className="mt-1 font-display text-xl font-extrabold">
                    {business.phoneDisplay}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Reviews />

      <LocationMap />

      <Footer />
    </main>
  );
}
