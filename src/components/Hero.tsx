import Image from "next/image";
import HeroQuoteForm from "./HeroQuoteForm";
import { getContent } from "@/lib/content";
import { fill } from "@/content/defaults";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-brand-yellow"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm4.78-12.97a.75.75 0 1 0-1.06-1.06L11 12.69l-2.22-2.22a.75.75 0 1 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l5.25-5.25z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
    </svg>
  );
}

type HeroProps = {
  suburb?: string;
  heroImage?: string;
  heroImageAlt?: string;
  accent?: string;
  heroTagline?: string;
};

/**
 * Brighten a hex colour so it remains legible on the dark navy hero.
 * If the colour already has high luminance we leave it alone; otherwise
 * we mix it with white until it clears the threshold.
 */
function lightenForDarkBg(hex?: string): string | undefined {
  if (!hex) return undefined;
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  const r = (value >> 16) & 0xff;
  const g = (value >> 8) & 0xff;
  const b = value & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const TARGET = 0.62;
  if (luminance >= TARGET) return hex;
  const mix = Math.min(1, (TARGET - luminance) / (1 - luminance));
  const blend = (channel: number) =>
    Math.round(channel + (255 - channel) * mix)
      .toString(16)
      .padStart(2, "0");
  return `#${blend(r)}${blend(g)}${blend(b)}`;
}

export default function Hero({
  suburb,
  heroImage,
  heroImageAlt = "",
  accent,
  heroTagline,
}: HeroProps = {}) {
  const { hero, business } = getContent();
  const place = suburb ?? business.primaryLocation;
  const image = heroImage ?? hero.image;
  const features = hero.features;
  const callLabel = fill(hero.callButton, { suburb: place });
  const quoteSubmitLabel = fill(hero.formSubmitLabel, { suburb: place });
  const accentReadable = lightenForDarkBg(accent);
  return (
    <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
      <Image
        src={image}
        alt={heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 pb-8 pt-32 md:gap-10 md:pb-14 md:pt-48 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-36">
        {/* Left: copy */}
        <div className="flex flex-col gap-5 md:gap-6">
          <h1 className="font-display text-[34px] font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            <span style={accentReadable ? { color: accentReadable } : undefined}>
              {place}&apos;s
            </span>{" "}
            {hero.titleMiddle}
            <br />
            <span className="text-brand-yellow">
              {hero.titleHighlight}
            </span>
          </h1>
          {heroTagline && (
            <p className="max-w-2xl text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] md:text-base">
              {heroTagline}
            </p>
          )}

          {/* Google rating badge */}
          <div className="flex w-fit items-center gap-3 rounded-md bg-white px-3 py-2 text-[#1E1E1E] shadow-md">
            <Image
              src="/images/google-g.png"
              alt="Google"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <div className="leading-tight">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-amber-500">★★★★★</span>
                <span className="font-bold">{business.ratingScore}</span>
              </div>
              <div className="text-xs font-bold">{business.ratingLabel}</div>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-bold md:text-base">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a
            href={`tel:${business.phoneLink}`}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 bg-brand-yellow px-4 py-3.5 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 sm:w-fit sm:gap-3 sm:px-6 sm:py-4 sm:text-lg md:text-xl"
          >
            <PhoneIcon />
            <span className="sm:hidden">{callLabel} {business.phoneDisplay}</span>
            <span className="hidden sm:inline">{callLabel} on {business.phoneDisplay}</span>
          </a>
        </div>

        {/* Right: contact card */}
        <div className="rounded-xl bg-white p-6 text-brand-black shadow-2xl md:p-8">
          <h2 className="mb-6 text-center font-display text-2xl font-extrabold text-[#1E1E1E] md:text-3xl">
            {hero.formTitle}{" "}
            <span className="font-bold text-brand-navy">
              {hero.formTitleHighlight}
            </span>
          </h2>

          <HeroQuoteForm submitLabel={quoteSubmitLabel} />
        </div>
      </div>
    </section>
  );
}
