"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { openQuoteModal } from "./QuoteModal";
import { useSiteContent } from "./ContentProvider";
import { fill } from "@/content/defaults";

function ChevronDown({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
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

function MenuIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Mobile only: one open section at a time, so the panel stays short enough
  // to scan. The nav carries ~24 sub-links, which is unusable fully expanded.
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { business, header } = useSiteContent();
  const navItems = header.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    // Collapse sections on close so the panel reopens in a predictable state.
    if (!menuOpen) setOpenSection(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 w-full">
        {/* Mobile-only call-out band */}
        <a
          href={`tel:${business.phoneLink}`}
          className="flex w-full items-center justify-center gap-2 bg-brand-yellow px-4 py-3 text-brand-navy transition hover:opacity-95 lg:hidden"
        >
          <PhoneIcon className="h-5 w-5" />
          <span className="font-display text-base font-extrabold tracking-wide">
            {fill(header.callBannerLabel, { phone: business.phoneDisplay })}
          </span>
        </a>

        {/* Mobile-only logo + hamburger bar - transparent over hero, white when scrolled */}
        <div
          className={`w-full transition-colors duration-300 lg:hidden ${
            scrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between gap-2 px-4 py-2.5">
            <a href="/" className="flex items-center" aria-label="Home">
              <Image
                src={business.logo}
                alt={`${business.name} logo`}
                width={280}
                height={100}
                priority
                className={`h-11 w-auto transition ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className={`inline-flex items-center rounded-full border-2 px-3 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-wide transition ${
                  scrolled
                    ? "border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-brand-navy"
                }`}
              >
                {header.quoteButtonLabel}
              </button>
              <button
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className={`rounded-md p-1 transition ${
                  scrolled ? "text-brand-navy" : "text-white"
                }`}
                type="button"
              >
                <MenuIcon className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop bar - transparent over hero, white when scrolled */}
        <div
          className={`hidden w-full transition-colors duration-300 lg:block ${
            scrolled
              ? "bg-white text-[#1E1E1E] shadow-md"
              : "bg-transparent text-white"
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 xl:gap-6">
            <a href="/" className="flex items-center" aria-label="Home">
              <Image
                src={business.logo}
                alt={`${business.name} logo`}
                width={280}
                height={100}
                priority
                className={`h-16 w-auto transition xl:h-20 ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </a>

            <nav className="flex items-center gap-3 xl:gap-6">
              {navItems
                .filter((item) => !item.mobileOnly)
                .map((item) => (
                <div key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className="flex items-center gap-1 whitespace-nowrap font-display text-[12px] font-bold uppercase tracking-wide transition hover:text-brand-yellow xl:text-sm"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown />}
                  </a>
                  {item.dropdown && (
                    <div className="invisible absolute left-1/2 top-full z-50 w-max min-w-[15rem] max-w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-xl bg-white py-2 text-[#1E1E1E] shadow-xl ring-1 ring-black/5">
                        {item.dropdown.map((sub) => (
                          <li key={sub.label}>
                            <a
                              href={sub.href}
                              className="block px-5 py-2.5 font-display text-sm font-bold tracking-wide transition hover:bg-brand-navy hover:text-white"
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
            </nav>

            <div className="flex items-center gap-2 xl:gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className={`inline-flex items-center whitespace-nowrap rounded-full border-2 px-3.5 py-2.5 font-display text-[11px] font-extrabold uppercase tracking-wide transition xl:px-5 xl:py-3 xl:text-xs ${
                  scrolled
                    ? "border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-brand-navy"
                }`}
              >
                {header.quoteButtonLabel}
              </button>
              <a
                href={`tel:${business.phoneLink}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-2 text-brand-navy shadow-lg transition hover:opacity-90 xl:gap-3 xl:px-6 xl:py-3.5"
              >
                <span className="hidden whitespace-nowrap font-display text-[10px] font-extrabold uppercase tracking-wide xl:inline xl:text-xs">
                  {header.callNowLabel}
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap font-display text-sm font-extrabold xl:gap-2 xl:text-lg">
                  <PhoneIcon className="h-4 w-4 xl:h-5 xl:w-5" />
                  {business.phoneDisplay}
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <span className="font-display text-base font-extrabold uppercase tracking-wide text-brand-navy">
              {header.menuTitle}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="rounded-md p-1 text-brand-navy"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-2">
            {navItems.map((item) => {
              const expanded = openSection === item.label;
              return (
                <div
                  key={item.label}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {/* Label navigates to the category page; the chevron only
                      expands, so both are reachable on touch. */}
                  <div className="flex items-center">
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-lg px-3 py-3.5 font-display text-base font-extrabold uppercase tracking-wide text-brand-navy transition hover:bg-brand-navy/5"
                    >
                      {item.label}
                    </a>
                    {item.dropdown && (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} menu`}
                        onClick={() =>
                          setOpenSection(expanded ? null : item.label)
                        }
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-brand-navy/70 transition hover:bg-brand-navy/5 hover:text-brand-navy"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.dropdown && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                          {item.dropdown.map((sub) => (
                            <li key={sub.label}>
                              <a
                                href={sub.href}
                                onClick={() => setMenuOpen(false)}
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
          <div className="flex flex-col gap-2 p-4">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openQuoteModal();
              }}
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-navy px-4 py-3 font-display text-base font-extrabold uppercase tracking-wide text-brand-navy transition hover:bg-brand-navy hover:text-white"
            >
              {header.quoteButtonLabel}
            </button>
            <a
              href={`tel:${business.phoneLink}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 font-display text-base font-extrabold text-brand-navy shadow-md transition hover:opacity-90"
            >
              <PhoneIcon className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
