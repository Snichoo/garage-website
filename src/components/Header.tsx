"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About Us", href: "#about", hasDropdown: true },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Contact Us", href: "#contact", hasDropdown: false },
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-white text-[#1E1E1E] shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      {/* Mobile: top CTA pill */}
      <div className="flex w-full justify-center px-6 pt-3 lg:hidden">
        <a
          href="tel:0412667147"
          className="flex w-full max-w-md flex-col items-center justify-center gap-1 rounded-full bg-brand-yellow px-6 py-2.5 text-brand-navy shadow-lg transition hover:opacity-90"
        >
          <span className="font-display text-sm font-extrabold uppercase tracking-wide">
            CALL US NOW
          </span>
          <span className="flex items-center gap-2 font-display text-lg font-extrabold">
            <PhoneIcon className="h-5 w-5" />
            0412 667 147
          </span>
        </a>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3">
        {/* Logo — invert filter on dark hero so it reads white */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={280}
            height={100}
            priority
            className={`h-16 w-auto transition md:h-20 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 font-display text-base font-bold tracking-wide transition hover:text-brand-navy"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown />}
            </a>
          ))}
        </nav>

        {/* Desktop CTA pill */}
        <a
          href="tel:0412667147"
          className="hidden items-center gap-3 rounded-full bg-brand-yellow px-6 py-3.5 text-brand-navy shadow-lg transition hover:opacity-90 lg:inline-flex"
        >
          <span className="font-display text-xs font-extrabold uppercase tracking-wide">
            CALL US NOW
          </span>
          <span className="flex items-center gap-2 font-display text-lg font-extrabold">
            <PhoneIcon />
            0412 667 147
          </span>
        </a>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          className="lg:hidden"
          type="button"
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
