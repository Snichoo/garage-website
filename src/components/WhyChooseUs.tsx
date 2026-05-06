import Image from "next/image";

function Card({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm md:p-8 ${className}`}
    >
      <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading — stencil style matching Services */}
        <div className="relative mb-12 h-[120px] md:h-[160px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[68px] font-extrabold leading-none tracking-tight md:text-[120px]">
            WHY US?
          </h2>
          <h2 className="absolute bottom-0 left-4 font-display text-[58px] font-extrabold leading-none tracking-tight text-brand-navy md:left-8 md:text-[104px]">
            WHY US?
          </h2>
        </div>

        {/* Top row: 2 wide cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <Card
            title="Quality Services and Expert Technicians"
            description="With our expert technicians, we provide quality in every repair and maintenance job."
          >
            <div className="mt-6 flex flex-1 items-center justify-center">
              <svg viewBox="0 0 240 180" className="h-40 w-auto">
                {/* Soft backdrop circle */}
                <circle cx="120" cy="90" r="78" fill="#15355E" opacity="0.05" />

                {/* Left ribbon tail */}
                <path d="M 92 132 L 78 168 L 92 158 L 100 168 L 110 138 Z" fill="#15355E" />
                {/* Right ribbon tail */}
                <path d="M 148 132 L 162 168 L 148 158 L 140 168 L 130 138 Z" fill="#15355E" />

                {/* Outer notched gold seal */}
                <g>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={120 + 56 * Math.cos((i / 12) * 2 * Math.PI)}
                      cy={90 + 56 * Math.sin((i / 12) * 2 * Math.PI)}
                      r="10"
                      fill="#FDD710"
                    />
                  ))}
                  <circle cx="120" cy="90" r="56" fill="#FDD710" />
                </g>

                {/* Inner navy disc */}
                <circle cx="120" cy="90" r="44" fill="#15355E" />
                <circle cx="120" cy="90" r="44" fill="none" stroke="#FDD710" strokeWidth="2" strokeDasharray="2 4" opacity="0.6" />

                {/* 5 stars */}
                {[-32, -16, 0, 16, 32].map((dx, i) => (
                  <g key={i} transform={`translate(${120 + dx} 84)`} fill="#FDD710">
                    <path d="M 0 -7 L 1.6 -2.2 L 6.7 -2 L 2.6 1 L 4 6 L 0 3 L -4 6 L -2.6 1 L -6.7 -2 L -1.6 -2.2 Z" />
                  </g>
                ))}

                {/* EXPERT text */}
                <text x="120" y="106" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="11" fill="#FDD710" letterSpacing="2">
                  EXPERT
                </text>
              </svg>
            </div>
          </Card>

          <Card
            title="Reliable Repairs in Your Area"
            description={
              <>
                Servicing all of Brisbane and surrounding suburbs — fast,
                reliable, local.
              </>
            }
          >
            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="flex h-40 w-full items-center justify-center rounded-xl bg-brand-navy/5 text-sm text-neutral-500 md:h-48">
                Brisbane map image
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom row: 4 smaller cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-8 md:gap-8 lg:grid-cols-4">
          <Card title="100% Guaranteed" description="We put our utmost effort into ensuring your satisfaction.">
            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                {/* Shield with 100% */}
                <svg viewBox="0 0 100 110" className="absolute inset-0 h-full w-full drop-shadow-md">
                  <path d="M50 4 L92 18 L92 56 C92 82 72 100 50 106 C28 100 8 82 8 56 L8 18 Z"
                        fill="#15355E" stroke="#FDD710" strokeWidth="3" />
                </svg>
                <div className="relative flex flex-col items-center leading-none text-brand-yellow">
                  <span className="font-display text-2xl font-extrabold">100%</span>
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest">Guaranteed</span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Round-The-Clock Access" description="Available around the clock, weekends and public holidays.">
            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-brand-navy shadow-lg ring-4 ring-brand-yellow/40">
                <span className="font-display text-2xl font-extrabold leading-none text-brand-yellow">24/7</span>
                {/* Ticks */}
                <span className="absolute left-1/2 top-2 h-1.5 w-0.5 -translate-x-1/2 rounded bg-brand-yellow" />
                <span className="absolute bottom-2 left-1/2 h-1.5 w-0.5 -translate-x-1/2 rounded bg-brand-yellow" />
                <span className="absolute left-2 top-1/2 h-0.5 w-1.5 -translate-y-1/2 rounded bg-brand-yellow" />
                <span className="absolute right-2 top-1/2 h-0.5 w-1.5 -translate-y-1/2 rounded bg-brand-yellow" />
              </div>
            </div>
          </Card>

          <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white/95 p-6 pt-24 shadow-sm md:p-8 md:pt-28">
            <Image
              src="/images/simple-pricing.webp"
              alt="Simple pricing"
              width={400}
              height={300}
              className="pointer-events-none absolute -top-12 left-1/2 h-44 w-auto -translate-x-1/2 object-contain md:-top-16 md:h-56"
            />
            <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
              Simple Pricing
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
              Transparent, fair pricing. No hidden costs, just honest work.
            </p>
          </div>

          <Card title="Local You Can Trust" description="Family-owned and operated, serving Brisbane locals you can rely on.">
            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="flex h-32 w-full items-center justify-center rounded-xl bg-brand-navy/5 text-sm text-neutral-500">
                Team photo
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
