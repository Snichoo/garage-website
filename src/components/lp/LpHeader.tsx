"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { openQuoteModal } from "@/components/QuoteModal";
import { useSiteContent } from "@/components/ContentProvider";
import { fill } from "@/content/defaults";
import { ChevronIcon, ClockIcon, PhoneIcon } from "./icons";

const navLinkClass =
  "flex items-center gap-1 whitespace-nowrap font-display text-[11px] font-bold uppercase tracking-wide text-white/90 transition-colors hover:text-white xl:text-[13px]";

function MenuMark() {
  return (
    <span aria-hidden className="flex w-5 flex-col gap-1.5">
      <span className="h-0.5 w-full rounded-full bg-current" />
      <span className="h-0.5 w-full rounded-full bg-current" />
      <span className="h-0.5 w-full rounded-full bg-current" />
    </span>
  );
}

function CloseMark() {
  return (
    <span aria-hidden className="relative block h-5 w-5">
      <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
      <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
    </span>
  );
}

export function LpHeader({ hours }: { hours: string }) {
  const { business, header } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const shortQuoteLabel =
    header.quoteButtonLabel.replace(/^get\s+/i, "").trim() ||
    header.quoteButtonLabel;
  const [brandLead, ...brandTail] = business.name.toUpperCase().split(" ");

  useEffect(() => {
    if (!menuOpen) {
      setOpenSection(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-brand-navy text-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.45)]">
        <a
          href={`tel:${business.phoneLink}`}
          className="flex w-full items-center justify-center gap-2 bg-brand-yellow px-4 py-3 text-brand-navy transition hover:opacity-95 lg:hidden"
        >
          <PhoneIcon aria-hidden className="h-5 w-5" />
          <span className="font-display text-base font-extrabold tracking-wide">
            {fill(header.callBannerLabel, { phone: business.phoneDisplay })}
          </span>
        </a>

        <div
          aria-hidden
          className="absolute left-[330px] right-0 top-0 hidden h-11 bg-white [clip-path:polygon(0_0,100%_0,100%_100%,52px_100%)] lg:block"
        />

        <div className="relative flex h-16 w-full items-center px-4 sm:px-6 lg:h-[100px] lg:items-stretch lg:px-8">
          <a
            href="#top"
            className="relative z-20 flex shrink-0 items-center"
            aria-label={`${business.name} — back to top`}
          >
            <span className="relative block h-10 w-[62px] shrink-0 overflow-hidden sm:h-11 sm:w-[68px] lg:h-[62px] lg:w-[96px]">
              <Image
                src={business.logo}
                alt=""
                aria-hidden
                width={1080}
                height={1080}
                priority
                sizes="(min-width: 1024px) 96px, (min-width: 640px) 68px, 62px"
                className="absolute left-0 top-0 h-auto w-full brightness-0 invert"
              />
            </span>
            <span className="ml-1 flex flex-col leading-none sm:ml-1.5 lg:ml-2">
              <span className="font-display text-[19px] font-extrabold tracking-[0.04em] sm:text-[22px] lg:text-[31px]">
                {brandLead}
              </span>
              <span className="mt-1 font-display text-[7px] font-bold tracking-[0.16em] sm:text-[8px] lg:text-[11px]">
                {brandTail.join(" ")}
              </span>
            </span>
          </a>

          <div className="relative z-10 ml-auto hidden h-full flex-col lg:flex">
            <div className="flex h-11 items-center justify-end gap-5 text-[15px]">
              <a
                href={`tel:${business.phoneLink}`}
                className="flex items-center gap-2.5 font-semibold text-brand-ink transition-colors hover:text-brand-navy"
              >
                <PhoneIcon aria-hidden className="h-5 w-5 text-brand-navy" />
                {business.phoneDisplay}
              </a>
              <span aria-hidden className="h-5 w-px bg-brand-line" />
              <span className="flex items-center gap-2.5 font-semibold text-brand-ink">
                <ClockIcon aria-hidden className="h-5 w-5 text-brand-navy" />
                {hours}
              </span>
            </div>

            <nav className="flex h-14 items-center justify-end gap-3 xl:gap-5">
              {header.nav
                .filter((item) => !item.mobileOnly)
                .map((item) => (
                  <div key={item.label} className="group relative flex h-full items-center">
                    <a href={item.href} className={navLinkClass}>
                      {item.label}
                      {item.dropdown && (
                        // ChevronIcon points up by default; rotate it so a
                        // closed desktop dropdown consistently points down.
                        <ChevronIcon
                          aria-hidden
                          className="h-3.5 w-3.5 rotate-180"
                        />
                      )}
                    </a>

                    {item.dropdown && (
                      <div className="invisible absolute left-1/2 top-full z-30 w-max min-w-[15rem] max-w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                        <ul className="overflow-hidden rounded-xl bg-white py-2 text-brand-ink shadow-2xl ring-1 ring-black/5">
                          {item.dropdown.map((sub) => (
                            <li key={sub.label}>
                              <a
                                href={sub.href}
                                className="block px-5 py-2.5 font-display text-sm font-bold tracking-wide transition-colors hover:bg-brand-navy hover:text-white"
                              >
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}

              <QuoteButton className="ml-1 flex items-center gap-2 rounded-md bg-brand-yellow px-4 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-wide text-brand-navy shadow-sm transition-colors hover:bg-brand-yellowDark xl:px-5 xl:text-[13px]">
                {header.quoteButtonLabel}
              </QuoteButton>
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <QuoteButton
              ariaLabel={header.quoteButtonLabel}
              className="inline-flex rounded-md bg-brand-yellow px-3 py-2 font-display text-[12px] font-extrabold uppercase tracking-wide text-brand-navy sm:px-3.5 sm:text-[13px]"
            >
              <span className="min-[380px]:hidden">Quote</span>
              <span className="hidden min-[380px]:inline">{shortQuoteLabel}</span>
            </QuoteButton>
            <button
              type="button"
              aria-label="Open menu"
              aria-controls="lp-mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid size-9 place-items-center rounded-md bg-white text-brand-navy shadow-sm sm:size-10"
            >
              <MenuMark />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          <aside
            id="lp-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lp-mobile-menu-title"
            className="absolute right-0 top-0 flex h-full w-[min(88vw,370px)] flex-col overflow-y-auto bg-white text-brand-ink shadow-[-24px_0_60px_-28px_rgba(0,0,0,0.75)]"
          >
            <div className="flex items-center justify-between bg-brand-navy px-5 py-4 text-white">
              <span
                id="lp-mobile-menu-title"
                className="font-display text-base font-extrabold uppercase tracking-wide"
              >
                {header.menuTitle}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                autoFocus
                className="grid size-10 place-items-center rounded-md bg-white/10 transition-colors hover:bg-white/20"
              >
                <CloseMark />
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-2">
              {header.nav.map((item, index) => {
                const expanded = openSection === item.label;
                const sectionId = `lp-mobile-menu-section-${index}`;
                return (
                  <div key={item.label} className="border-b border-brand-line last:border-b-0">
                    <div className="flex items-center">
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="flex-1 rounded-lg px-3 py-3.5 font-display text-base font-extrabold uppercase tracking-wide text-brand-navy transition hover:bg-brand-navy/5"
                      >
                        {item.label}
                      </a>
                      {item.dropdown && (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={sectionId}
                          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} menu`}
                          onClick={() => setOpenSection(expanded ? null : item.label)}
                          className="grid size-11 shrink-0 place-items-center rounded-lg text-brand-navy/70 transition hover:bg-brand-navy/5 hover:text-brand-navy"
                        >
                          <ChevronIcon
                            aria-hidden
                            className={`h-5 w-5 transition-transform duration-200 ${
                              expanded ? "rotate-0" : "rotate-180"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {item.dropdown && (
                      <div
                        id={sectionId}
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="mb-2 ml-3 border-l border-brand-line pl-3">
                            {item.dropdown.map((sub) => (
                              <li key={sub.label}>
                                <a
                                  href={sub.href}
                                  onClick={closeMenu}
                                  className="block rounded-md px-3 py-2.5 font-display text-sm font-bold text-brand-navy/80 transition hover:bg-brand-navy/5 hover:text-brand-navy"
                                >
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-brand-line p-5">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  openQuoteModal();
                }}
                className="flex w-full items-center justify-center rounded-md bg-brand-yellow px-5 py-3.5 font-display text-[15px] font-extrabold uppercase tracking-wide text-brand-navy transition-colors hover:bg-brand-yellowDark"
              >
                {header.quoteButtonLabel}
              </button>
              <a
                href={`tel:${business.phoneLink}`}
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-md bg-brand-navy px-5 py-3.5 font-display text-[15px] font-bold text-white transition-colors hover:bg-brand-navyDeep"
              >
                <PhoneIcon aria-hidden className="h-5 w-5" />
                {business.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
