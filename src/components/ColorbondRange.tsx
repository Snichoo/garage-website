type Swatch = {
  name: string;
  hex: string;
};

const swatches: Swatch[] = [
  { name: "Manor Red", hex: "#6A2419" },
  { name: "Cottage Green", hex: "#2C443A" },
  { name: "Night Sky", hex: "#0A0A0A" },
  { name: "Gully", hex: "#827A6E" },
  { name: "Paperbark", hex: "#C9C0A6" },
  { name: "Classic Cream", hex: "#E4DDBE" },
  { name: "Monument", hex: "#323234" },
  { name: "Basalt", hex: "#76777B" },
  { name: "Bluegum", hex: "#9A9DA0" },
  { name: "Dune", hex: "#B1ADA2" },
  { name: "Surfmist", hex: "#E4E2D5" },
  { name: "Shale Grey", hex: "#BDBFBA" },
];

export default function ColorbondRange() {
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

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
          {swatches.map((s) => (
            <div key={s.name} className="group flex flex-col">
              <div
                className="aspect-square w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/10 transition group-hover:-translate-y-0.5 group-hover:shadow-lg"
                style={{ backgroundColor: s.hex }}
              />
              <p className="mt-2 text-center font-display text-sm font-bold text-brand-navy md:text-base">
                {s.name}<span className="text-[0.7em]">®</span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
