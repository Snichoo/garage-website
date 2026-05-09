"use client";

import Image from "next/image";
import { useState } from "react";

type Design = {
  name: string;
  src: string;
  blurb: string;
};

const designs: Design[] = [
  {
    name: "Oxford",
    src: "/images/sectional/oxford.png",
    blurb:
      "The Oxford style features timeless Georgian square panels, adding a traditional touch to any home. While it pairs beautifully with Gliderol's woodgrain finish, the Oxford style is also offered in a smooth finish.",
  },
  {
    name: "Madison",
    src: "/images/sectional/madison.png",
    blurb:
      "The Madison style features clean, defined lines and a textured finish that pairs well with rendered homes. Offered in both woodgrain and smooth finishes, the Madison design is an excellent choice for those seeking a garage door that complements their home's exterior.",
  },
  {
    name: "Tuscan",
    src: "/images/sectional/tuscan.png",
    blurb:
      "The Tuscan style mimics a timber-planked appearance, made from low-maintenance Colorbond® steel. Its horizontal \"V\" grooves offer a sleek, contemporary aesthetic, making it an ideal choice for modern homes.",
  },
  {
    name: "Hampton",
    src: "/images/sectional/hampton.png",
    blurb:
      "The Hampton style features elegant rectangular embossments that create a classic and strong appearance. Available in both woodgrain and smooth finishes, the Hampton design is a versatile option that complements both modern and traditional homes.",
  },
];

export default function SectionalDesignPicker() {
  const [active, setActive] = useState<Design>(
    designs.find((d) => d.name === "Madison") ?? designs[0],
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
      {/* Left: design list */}
      <div className="flex flex-col">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-brand-navy/70">
          Choose a design
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-3">
          {designs.map((d) => {
            const isActive = d.name === active.name;
            return (
              <button
                key={d.name}
                type="button"
                onClick={() => setActive(d)}
                className={`group relative flex items-center justify-between gap-3 rounded-xl border-2 px-3 py-3 text-left font-display font-extrabold tracking-wide transition lg:w-full lg:px-5 lg:py-4 ${
                  isActive
                    ? "border-brand-yellow bg-brand-navy text-white shadow-md"
                    : "border-gray-200 bg-white text-brand-navy hover:border-brand-navy/40 hover:bg-brand-navy/5"
                }`}
                aria-pressed={isActive}
              >
                <span className="flex items-center gap-2 lg:gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold lg:h-7 lg:w-7 ${
                      isActive
                        ? "bg-brand-yellow text-brand-navy"
                        : "bg-brand-navy/10 text-brand-navy"
                    }`}
                  >
                    {d.name.charAt(0)}
                  </span>
                  <span className="text-base lg:text-xl">{d.name}</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className={`hidden h-5 w-5 transition lg:block ${
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-40"
                  }`}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: preview */}
      <div className="flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-brand-navy/5 shadow-md md:aspect-[16/10]">
          <Image
            key={active.src}
            src={active.src}
            alt={`${active.name} sectional garage door design`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute left-0 top-0 m-4 inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow shadow-md md:m-6">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
            {active.name}
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm md:p-8">
          <h3 className="font-display text-2xl font-extrabold text-brand-navy md:text-3xl">
            {active.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">
            {active.blurb}
          </p>
          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 bg-brand-yellow px-5 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-brand-navy transition hover:opacity-90 md:text-base"
          >
            Enquire about {active.name}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-4 w-4"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
