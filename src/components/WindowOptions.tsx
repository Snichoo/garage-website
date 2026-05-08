import Image from "next/image";

type WindowStyle = {
  name: string;
  src: string;
};

const oxfordStyles: WindowStyle[] = [
  { name: "Traditional", src: "/images/windows/Oxford-Traditional.jpg" },
  { name: "County", src: "/images/windows/Oxford-Country.jpg" },
  { name: "Cascade", src: "/images/windows/Oxford-Cascade.jpg" },
  { name: "Sunburst", src: "/images/windows/Oxford-Sunburst.jpg" },
  { name: "Sunset", src: "/images/windows/Oxford-Sunset.jpg" },
  { name: "Cantebury", src: "/images/windows/Oxford-Cantebury.jpg" },
  { name: "Waterton", src: "/images/windows/Oxford-Waterton.jpg" },
];

const hamptonStyles: WindowStyle[] = [
  { name: "Traditional", src: "/images/windows/Hampton-Traditional.jpg" },
  { name: "County", src: "/images/windows/Hampton-Country-1.jpg" },
  { name: "Cascade", src: "/images/windows/Hampton-Cascade.jpg" },
  { name: "Sunburst", src: "/images/windows/Hampton-Sunburst.jpg" },
  { name: "Sunset", src: "/images/windows/Hampton-Sunset.jpg" },
  { name: "Waterton", src: "/images/windows/Hampton-Waterton.jpg" },
];

function StyleTile({ style }: { style: WindowStyle }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[1444/249] w-full">
          <Image
            src={style.src}
            alt={`${style.name} window style`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
            className="object-cover"
          />
        </div>
      </div>
      <p className="mt-2 text-center font-display text-sm font-bold text-brand-navy md:text-base">
        {style.name}
      </p>
    </div>
  );
}

export default function WindowOptions() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Stencil heading */}
        <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
            WINDOW OPTIONS
          </h2>
          <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
            WINDOW OPTIONS
          </h2>
        </div>

        <p className="mb-12 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
          Add a touch of natural light and enhance the look of your sectional
          garage door with our range of window options. Whether you&apos;re
          after a traditional or modern style, our windows complement your
          door and let light into your garage space.
        </p>

        {/* Oxford Windows */}
        <div className="mb-12">
          <h3 className="mb-5 font-display text-2xl font-extrabold tracking-tight text-brand-navy md:text-3xl">
            Oxford Windows
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {oxfordStyles.map((s) => (
              <StyleTile key={s.name} style={s} />
            ))}
          </div>
        </div>

        {/* Hampton Windows */}
        <div>
          <h3 className="mb-5 font-display text-2xl font-extrabold tracking-tight text-brand-navy md:text-3xl">
            Hampton Windows
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hamptonStyles.map((s) => (
              <StyleTile key={s.name} style={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
