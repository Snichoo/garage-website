import Image from "next/image";
import Link from "next/link";
import { fill, type SiteContent } from "@/content/defaults";
import { getSuburbsByRegion, regions } from "@/data/suburbs";
import { ChevronIcon, PhoneIcon } from "./icons";

type LpFooterProps = {
  business: SiteContent["business"];
  footer: SiteContent["footer"];
};

export function LpFooter({ business, footer }: LpFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div className="max-w-[360px]">
            <a href="/" aria-label="Home" className="inline-block">
              <Image
                src={business.logo}
                alt={`${business.name} logo`}
                width={280}
                height={280}
                sizes="88px"
                className="h-[88px] w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70">
              {fill(footer.blurb, { suburb: business.primaryLocation })}
            </p>
            <a
              href={`tel:${business.phoneLink}`}
              className="mt-6 inline-flex items-center gap-2.5 rounded-md bg-brand-yellow px-6 py-3.5 text-[18px] font-bold tracking-wide text-brand-navy transition-colors hover:bg-brand-yellowDark"
            >
              <PhoneIcon className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/50">
              {footer.servicesHeading}
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {footer.services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/80 transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/50">
              {footer.companyHeading}
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {footer.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/80 transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/50">
              {footer.regionsHeading}
            </h3>
            <p className="mt-3 text-[15px] italic leading-relaxed text-white/60">
              {footer.regionsIntro}
            </p>
            <ul className="mt-4 space-y-1">
              {regions.map((region) => {
                const suburbs = getSuburbsByRegion(region.slug);
                if (suburbs.length === 0) return null;

                return (
                  <li key={region.slug}>
                    <details className="group border-b border-white/10 py-2">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[15px] font-semibold text-white/80 transition-colors hover:text-brand-yellow [&::-webkit-details-marker]:hidden">
                        <span>{region.name}</span>
                        <ChevronIcon
                          className="h-4 w-4 shrink-0 rotate-180 transition-transform group-open:rotate-0"
                          aria-hidden
                        />
                      </summary>
                      <ul className="mt-2 space-y-1.5 pb-2 pl-1">
                        {suburbs.map((suburb) => (
                          <li key={suburb.slug}>
                            <Link
                              href={`/suburbs/${suburb.slug}`}
                              className="text-[14px] font-semibold text-brand-yellow/90 transition-colors hover:text-brand-yellow"
                            >
                              {suburb.name}
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
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-6 text-center text-[13px] text-white/45 md:flex-row md:text-left lg:px-10">
          <p>{fill(footer.copyright, { year })}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-semibold text-white/60 transition-colors hover:text-brand-yellow"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Website by{" "}
            <a
              href="https://moonlanemedia.com.au"
              target="_blank"
              rel="noopener"
              className="font-semibold text-white/60 transition-colors hover:text-brand-yellow"
            >
              Moonlane Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
