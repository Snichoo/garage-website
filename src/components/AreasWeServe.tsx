import Image from "next/image";
import Link from "next/link";
import { regions } from "@/data/suburbs";
import { getContent } from "@/lib/content";
import { fill } from "@/content/defaults";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-4 w-4"
    >
      <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.5 0 5.6 7.5 12.5 7.5 12.5s7.5-6.9 7.5-12.5C19.5 5.3 16.2 2 12 2zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
    </svg>
  );
}

type AreasWeServeProps = {
  suburb?: string;
  blurb?: string;
};

export default async function AreasWeServe({
  suburb,
  blurb,
}: AreasWeServeProps = {}) {
  const { areasWeServe, business } = await getContent();
  const place = suburb ?? business.primaryLocation;
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative isolate overflow-hidden rounded-2xl bg-brand-navy px-8 py-12 text-white shadow-xl md:px-14 md:py-16">
          {/* Background image */}
          <Image
            src={areasWeServe.backgroundImage}
            alt=""
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="-z-20 object-cover object-center"
            priority={false}
          />
          {/* Overlay for legibility - uniform on mobile, directional on desktop */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-navy/75 md:bg-gradient-to-l md:from-brand-navy md:via-brand-navy/85 md:to-brand-navy/40" />
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-yellow/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />

          {/* Heading row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr] md:gap-12">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {areasWeServe.headingTop}
              <br />
              <span className="text-brand-yellow">{areasWeServe.headingHighlight}</span>
            </h2>
            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              {fill(areasWeServe.intro, { suburb: place })}
              {blurb ? `, ${blurb}` : ""}. {areasWeServe.rest}
            </p>
          </div>

          {/* Regions grid */}
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:grid-cols-3 lg:grid-cols-4">
            {regions.map((r) => (
              <li key={r.slug}>
                <Link
                  href="/locations"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition hover:border-brand-yellow/40 hover:bg-white/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-navy shadow-md">
                    <PinIcon />
                  </span>
                  <span className="font-display text-base font-extrabold tracking-wide md:text-lg">
                    {r.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
