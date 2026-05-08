"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "About Us", href: "/#about" },
  {
    label: "Services",
    href: "/#services",
    dropdown: [
      { label: "Sectional Garage Doors", href: "/sectional-garage-doors" },
      { label: "Roller Doors", href: "/roller-doors" },
      { label: "Tilt Doors", href: "/tilt-doors" },
    ],
  },
  { label: "Contact Us", href: "/#contact" },
];

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 w-full">
        {/* Mobile-only call-out band */}
        <a
          href="tel:0412667147"
          className="flex w-full items-center justify-center gap-2 bg-brand-yellow px-4 py-3 text-brand-navy transition hover:opacity-95 lg:hidden"
        >
          <PhoneIcon className="h-5 w-5" />
          <span className="font-display text-base font-extrabold tracking-wide">
            CALL US — 0412 667 147
          </span>
        </a>

        {/* Mobile-only logo + hamburger bar — transparent over hero, white when scrolled */}
        <div
          className={`w-full transition-colors duration-300 lg:hidden ${
            scrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            <a href="/" className="flex items-center" aria-label="Home">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={280}
                height={100}
                priority
                className={`h-11 w-auto transition ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </a>
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

        {/* Desktop bar — transparent over hero, white when scrolled */}
        <div
          className={`hidden w-full transition-colors duration-300 lg:block ${
            scrolled
              ? "bg-white text-[#1E1E1E] shadow-md"
              : "bg-transparent text-white"
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3">
            <a href="/" className="flex items-center" aria-label="Home">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={280}
                height={100}
                priority
                className={`h-20 w-auto transition ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </a>

            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className="flex items-center gap-1 font-display text-base font-bold tracking-wide transition hover:text-brand-yellow"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown />}
                  </a>
                  {item.dropdown && (
                    <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
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

            <a
              href="tel:0412667147"
              className="inline-flex items-center gap-3 rounded-full bg-brand-yellow px-6 py-3.5 text-brand-navy shadow-lg transition hover:opacity-90"
            >
              <span className="font-display text-xs font-extrabold uppercase tracking-wide">
                CALL US NOW
              </span>
              <span className="flex items-center gap-2 font-display text-lg font-extrabold">
                <PhoneIcon />
                0412 667 147
              </span>
            </a>
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
              Menu
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
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:bg-brand-navy/5"
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <ul className="ml-3 mt-1 flex flex-col gap-1 border-l border-gray-200 pl-3">
                    {item.dropdown.map((sub) => (
                      <li key={sub.label}>
                        <a
                          href={sub.href}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-md px-3 py-2 font-display text-sm font-bold text-brand-navy/80 transition hover:bg-brand-navy/5 hover:text-brand-navy"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <a
            href="tel:0412667147"
            className="m-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 font-display text-base font-extrabold text-brand-navy shadow-md transition hover:opacity-90"
          >
            <PhoneIcon className="h-5 w-5" />
            0412 667 147
          </a>
        </div>
      </div>
    </>
  );
}
