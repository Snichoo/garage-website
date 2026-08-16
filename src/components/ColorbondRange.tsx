"use client";

import { useId, useState } from "react";

type Swatch = {
  name: string;
  hex: string;
};

// First 12 are shown by default; the rest unlock via "Show more".
const swatches: Swatch[] = [
  { name: "Manor Red", hex: "#5F1D0F" },
  { name: "Pale Eucalypt", hex: "#7C856A" },
  { name: "Cottage Green", hex: "#304C3D" },
  { name: "Deep Ocean", hex: "#364252" },
  { name: "Ironstone", hex: "#3F434C" },
  { name: "Night Sky", hex: "#0A0A0A" },
  { name: "Monument", hex: "#323234" },
  { name: "Woodland Grey", hex: "#4B4C46" },
  { name: "Basalt", hex: "#6D6D6F" },
  { name: "Wallaby", hex: "#7F7C77" },
  { name: "Jasper", hex: "#6D6153" },
  { name: "Gully", hex: "#857F73" },
  { name: "Windspray", hex: "#898B8A" },
  { name: "Bluegum", hex: "#969799" },
  { name: "Paperbark", hex: "#CABEA4" },
  { name: "Dune", hex: "#B1ADA2" },
  { name: "Southerly", hex: "#D2D1CC" },
  { name: "Evening Haze", hex: "#C4C2A9" },
  { name: "Surfmist", hex: "#E4E2D5" },
  { name: "Dover White", hex: "#F1ECDE" },
  { name: "Classic Cream", hex: "#E9DCB9" },
  { name: "Shale Grey", hex: "#BDBFBA" },
];

const INITIAL_VISIBLE = 12;

export default function ColorbondRange() {
  const [expanded, setExpanded] = useState(false);
  const colourGridId = useId();
  const visible = expanded ? swatches : swatches.slice(0, INITIAL_VISIBLE);
  const hasMore = swatches.length > INITIAL_VISIBLE;

  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Stencil heading */}
        <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
            COLORBOND® RANGE
          </h2>
          <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
            COLORBOND<sup className="text-[0.5em]">®</sup> RANGE
          </h2>
        </div>

        <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
          Opt for timeless durability with our standard Colorbond® range,
          available in classic colours like Monument, Surfmist, Woodland Grey
          and many more, designed to withstand the Australian climate while
          complementing any home exterior.
        </p>

        <div
          id={colourGridId}
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4"
        >
          {visible.map((s) => (
            <div key={s.name} className="group flex flex-col">
              <div
                className="aspect-square w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/10 transition group-hover:-translate-y-0.5 group-hover:shadow-lg"
                style={{ backgroundColor: s.hex }}
              />
              <p className="mt-2 text-center font-display text-sm font-bold text-brand-navy md:text-base">
                {s.name}
                <span className="text-[0.7em]">®</span>
              </p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              aria-controls={colourGridId}
              className="inline-flex items-center gap-2 bg-brand-navy px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-brand-yellow shadow-md transition hover:opacity-90 md:text-base"
            >
              {expanded
                ? "Show fewer colours"
                : `Show all ${swatches.length} colours`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
