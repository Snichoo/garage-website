import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getContent } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";

/**
 * Confirmation page every form on the site redirects to after a successful
 * send. Kept out of the index (and the sitemap) so it never shows up in search
 * results, while still being a clean, single-purpose URL for conversion
 * tracking in Google Tag Manager / GA4.
 */
export async function generateMetadata() {
  const cfg = await getSiteConfig();
  return {
    title: { absolute: `Thank You | ${cfg.name}` },
    description: `Thanks for contacting ${cfg.name}. We'll be in touch within one business day.`,
    alternates: { canonical: "/thank-you" },
    robots: { index: false, follow: true },
  };
}

function CheckIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
    </svg>
  );
}

export default async function ThankYouPage() {
  const { business, thankYouPage } = await getContent();

  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src={thankYouPage.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-36 text-center md:pb-28 md:pt-48">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-brand-navy shadow-lg md:h-20 md:w-20">
            <CheckIcon className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            <span className="text-brand-yellow">
              {thankYouPage.heroTitleHighlight}
            </span>{" "}
            <span className="text-white">{thankYouPage.heroTitleRest}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {thankYouPage.heroText}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent)]" />
      </section>

      {/* What happens next */}
      <section className="relative w-full">
        <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {thankYouPage.steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-white p-7 shadow-xl ring-1 ring-black/5"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-brand-yellow font-display text-xl font-extrabold text-brand-navy shadow-md">
                  {i + 1}
                </div>
                <h2 className="mt-5 font-display text-lg font-extrabold uppercase tracking-wide text-brand-navy">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Call + home */}
          <div className="mt-12 flex flex-col items-center gap-5 text-center">
            <p className="font-display text-base font-semibold text-brand-navy md:text-lg">
              {thankYouPage.callPrompt}
            </p>
            <a
              href={`tel:${business.phoneLink}`}
              className="inline-flex items-center gap-3 rounded-full bg-brand-yellow px-7 py-4 text-brand-navy shadow-lg transition hover:opacity-90"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="font-display text-lg font-extrabold tracking-wide">
                {business.phoneDisplay}
              </span>
            </a>
            <Link
              href="/"
              className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-navy underline underline-offset-4 transition hover:text-brand-navy/70"
            >
              {thankYouPage.homeButtonLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
