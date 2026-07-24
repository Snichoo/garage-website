import Image from "next/image";
import Link from "next/link";
import { regions, getSuburbsByRegion } from "@/data/suburbs";
import { getContent } from "@/lib/content";
import { fill } from "@/content/defaults";

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
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

const services = [
  { label: "Sectional Garage Doors", href: "/sectional-garage-doors" },
  { label: "Roller Doors", href: "/roller-doors" },
  { label: "Tilt Doors", href: "/tilt-doors" },
  { label: "Automated Gates", href: "/automated-gates" },
  { label: "Emergency Repairs", href: "/emergency-repairs" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Door Installations", href: "/garage-doors" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

type FooterProps = {
  suburb?: string;
};

export default async function Footer({ suburb }: FooterProps = {}) {
  const year = new Date().getFullYear();
  const { business, footer } = await getContent();
  const place = suburb ?? business.primaryLocation;

  return (
    <footer className="garage-bg-navy relative w-full text-white">
      {/* Subtle dark overlay for legibility on top of the panelled bg */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="relative mx-auto max-w-[1240px] px-6 pb-10 pt-14 md:px-12 md:pb-12 md:pt-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <a href="/" aria-label="Home" className="inline-block">
              <Image
                src={business.logo}
                alt={`${business.name} logo`}
                width={280}
                height={100}
                className="h-16 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              {fill(footer.blurb, { suburb: place })}
            </p>

            <a
              href={`tel:${business.phoneLink}`}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-brand-yellow px-6 py-3 text-brand-navy shadow-lg transition hover:opacity-90"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="font-display text-base font-extrabold tracking-wide">
                {business.phoneDisplay}
              </span>
            </a>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
              {footer.servicesHeading}
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-display text-base font-semibold text-white/85 transition hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
              {footer.companyHeading}
            </h3>
            <ul className="mt-5 space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-display text-base font-semibold text-white/85 transition hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our regions */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
              {footer.regionsHeading}
            </h3>
            <p className="mt-3 text-sm italic leading-relaxed text-white/70">
              {footer.regionsIntro}
            </p>
            <ul className="mt-4 space-y-1">
              {regions.map((region) => {
                const list = getSuburbsByRegion(region.slug);
                if (list.length === 0) return null;
                return (
                  <li key={region.slug}>
                    <details className="group border-b border-white/10 py-2">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-display text-base font-semibold text-white/90 transition hover:text-brand-yellow [&::-webkit-details-marker]:hidden">
                        <span>{region.name}</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                          aria-hidden
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>
                      <ul className="mt-2 space-y-1.5 pl-1 pb-2">
                        {list.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/suburbs/${s.slug}`}
                              className="font-display text-sm font-semibold text-brand-yellow/90 transition hover:text-brand-yellow"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/15 pt-6 md:mt-16">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/60 md:flex-row md:text-sm">
            <p>{fill(footer.copyright, { year })}</p>
            <p>
              Website by{" "}
              <a
                href="https://moonlanemedia.com.au"
                target="_blank"
                rel="noopener"
                className="font-semibold text-white/80 transition hover:text-brand-yellow"
              >
                Moonlane Media
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
