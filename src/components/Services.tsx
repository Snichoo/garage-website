import Image from "next/image";
import Link from "next/link";
import QuoteButton from "./QuoteButton";
import { getContent } from "@/lib/content";

function BulletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
    </svg>
  );
}

export default async function Services() {
  const { business, services } = await getContent();
  const cards = services.cards;
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="relative mb-10 h-[88px] md:mb-12 md:h-[160px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[68px] font-extrabold leading-none tracking-tight md:text-[120px]">
            {services.heading}
          </h2>
          <h2 className="absolute bottom-0 left-4 font-display text-[58px] font-extrabold leading-none tracking-tight text-brand-navy md:left-8 md:text-[104px]">
            {services.heading}
          </h2>
        </div>

        {/* Service cards - one per main category */}
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group mx-auto flex w-full max-w-[360px] flex-col bg-brand-navy text-white shadow-md transition hover:shadow-xl sm:max-w-none"
            >
              <Link
                href={c.href}
                aria-label={c.title}
                className="relative block aspect-[16/10] w-full overflow-hidden"
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 285px, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition duration-300 group-hover:scale-105 ${c.imagePosition ?? "object-[center_70%]"}`}
                />
              </Link>

              <div className="flex flex-1 flex-col gap-5 p-5 lg:p-5 md:p-6">
                <h3 className="font-display text-xl font-extrabold uppercase leading-tight text-brand-yellow md:text-2xl lg:text-xl">
                  <Link href={c.href} className="transition hover:underline">
                    {c.title}
                  </Link>
                </h3>

                <ul className="flex flex-col gap-3">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-bold leading-snug text-white"
                    >
                      <BulletIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3">
                  {c.callCta ? (
                    <a
                      href={`tel:${business.phoneLink}`}
                      className="inline-flex w-full items-center justify-center gap-2 bg-brand-yellow py-3 text-center font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 lg:text-sm"
                    >
                      <PhoneIcon />
                      {business.phoneDisplay}
                    </a>
                  ) : (
                    <QuoteButton
                      className="inline-block w-full bg-brand-yellow py-3 text-center font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 lg:text-sm"
                    >
                      {services.quoteButtonLabel}
                    </QuoteButton>
                  )}
                  <Link
                    href={c.href}
                    className="group/learn inline-flex items-center justify-center gap-2 text-center font-display text-sm font-bold uppercase tracking-wide text-white/90 underline-offset-4 transition hover:text-brand-yellow hover:underline"
                  >
                    {services.learnMoreLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 transition-transform group-hover/learn:translate-x-1"
                      aria-hidden
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
