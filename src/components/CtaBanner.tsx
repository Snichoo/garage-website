import Image from "next/image";

/* ─── Decorative dot-grid overlay ─── */
function DotField({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.22)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/*
  Image shape from the reference site:
  Top-left:     small radius  (nearly square)
  Top-right:    very large radius (heavily rounded)
  Bottom-right: small radius  (nearly square)
  Bottom-left:  very large radius (heavily rounded)

  border-radius shorthand: TL TR BR BL
*/
const IMAGE_SHAPE = "4px 40% 4px 40%";

export default function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Brand-navy background panel ── */}
      {/* Full height on mobile, starts 160px down on desktop so image pokes above */}
      <div className="absolute inset-x-0 bottom-0 top-[110px] overflow-hidden bg-brand-navy md:top-[160px]">
        {/* Blurred house image filling the panel */}
        <Image
          src="https://www.steel-line.com.au/wp-content/uploads/2024/08/SteelLineGarageOnHome3.jpeg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="scale-125 object-cover opacity-70 blur-xl"
        />
        {/* Navy tint over the blurred image to keep brand colour dominant */}
        <div className="absolute inset-0 bg-brand-navy/65" />
      </div>

      {/* ── Dot fields (desktop only) ── */}
      {/* Left dot cluster — beneath the heading area */}
      <div className="pointer-events-none absolute left-[2%] top-[52%] hidden h-[40%] w-[18%] opacity-80 md:block">
        <DotField id="cta-dots-l" />
      </div>
      {/* Right dot cluster — behind / around the image */}
      <div className="pointer-events-none absolute right-0 top-[16%] hidden h-[80%] w-[32%] opacity-80 md:block">
        <DotField id="cta-dots-r" />
      </div>

      {/* ── Content grid ── */}
      {/* items-end on md so the bottom of the image aligns with the button */}
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-6 pb-14 pt-12 md:grid-cols-[1fr_440px] md:items-end md:gap-10 md:px-12 md:pb-20 md:pt-[210px] min-[1206px]:grid-cols-[1fr_560px]">
        {/* Left column: copy + button + arrow */}
        <div className="relative order-2 text-white md:order-none">
          <h2 className="font-display text-3xl font-extrabold lowercase leading-[1.08] tracking-tight md:text-[42px] lg:text-[52px]">
            schedule your free measure and quote today with steel-line
          </h2>

          {/* Paragraph + arrow wrapper — arrow floats to the right of the text */}
          <div className="relative mt-5">
            <p className="max-w-[340px] text-sm font-semibold italic leading-relaxed text-white/90 md:text-base">
              Discover the perfect door for your home and enjoy peace of mind
              with the experts in garage doors.
            </p>

          </div>

          {/* Button + Arrow */}
          <div className="relative mt-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-brand-yellow px-8 py-3.5 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-lg transition hover:opacity-90 md:text-lg"
            >
              FREE Measure &amp; Quote
            </a>
            {/* Arrow image — desktop: above-right of button; mobile: to the right of button */}
            <div className="pointer-events-none absolute right-2 top-[-40px] block min-[1206px]:hidden">
              <Image
                src="https://www.steel-line.com.au/wp-content/uploads/2024/07/Arrow.png"
                alt=""
                width={120}
                height={100}
                className="h-auto w-[90px] rotate-[10deg] object-contain"
                aria-hidden="true"
              />
            </div>
            <div className="pointer-events-none absolute left-[55%] top-[-60px] hidden min-[1206px]:block">
              <Image
                src="https://www.steel-line.com.au/wp-content/uploads/2024/07/Arrow.png"
                alt=""
                width={120}
                height={100}
                className="h-auto w-[90px] rotate-[15deg] object-contain lg:w-[100px]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Right column: leaf-shaped house image — bottom aligns with button, top extends above teal panel */}
        <div className="relative order-1 md:order-none">
          <div className="relative ml-auto w-full max-w-[560px] md:-mt-[140px]">
            <div
              className="relative aspect-[7/6] w-full overflow-hidden shadow-2xl"
              style={{ borderRadius: IMAGE_SHAPE }}
            >
              <Image
                src="https://www.steel-line.com.au/wp-content/uploads/2024/08/SteelLineGarageOnHome3.jpeg"
                alt="Modern home with Steel-Line garage door"
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
