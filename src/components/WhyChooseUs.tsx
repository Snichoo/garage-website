import Image from "next/image";

function Shield100() {
  return (
    <Image
      src="/images/guarantee.png"
      alt="100% Guaranteed"
      width={300}
      height={300}
      className="h-32 w-32 object-contain mix-blend-multiply md:h-40 md:w-40"
    />
  );
}

function Ring247() {
  return (
    <Image
      src="/images/247.png"
      alt="Available 24/7"
      width={300}
      height={300}
      className="h-32 w-32 object-contain mix-blend-multiply md:h-40 md:w-40"
    />
  );
}

function WhyCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm md:p-8">
      <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
        {body}
      </p>
      {children && (
        <div className="mt-6 flex flex-1 items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

function PlaceholderArt({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-xl bg-brand-navy/5 text-sm text-neutral-500 ${
        tall ? "h-40 md:h-48" : "h-32"
      }`}
    >
      {label}
    </div>
  );
}

type WhyChooseUsProps = {
  suburb?: string;
};

export default function WhyChooseUs({ suburb = "Brisbane" }: WhyChooseUsProps = {}) {
  return (
    <section className="garage-bg-navy w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Stencil heading */}
        <div className="relative mb-10 h-[88px] md:mb-12 md:h-[160px]">
          <h2 className="outlined-text-navy absolute left-0 top-0 select-none font-display text-[68px] font-extrabold leading-none tracking-tight md:text-[120px]">
            WHY US?
          </h2>
          <h2 className="absolute bottom-0 left-4 font-display text-[58px] font-extrabold leading-none tracking-tight text-brand-yellow md:left-8 md:text-[104px]">
            WHY US?
          </h2>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-8">
              {/* Left: text + rating */}
              <div className="flex flex-1 flex-col">
                <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
                  Quality Services and Expert Technicians
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
                  Locally made and serviced — our expert technicians deliver quality on every repair and maintenance job.
                </p>
                <div className="mt-6 flex flex-col items-center gap-2 md:items-start">
                  <div className="flex items-center gap-1.5 text-brand-yellow">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-7 w-7 drop-shadow-sm md:h-8 md:w-8"
                        aria-hidden
                      >
                        <path d="M12 2.5l2.95 6 6.6.95-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.1 1.13-6.58L2.45 9.45l6.6-.95L12 2.5z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-display text-sm font-extrabold uppercase tracking-[0.25em] text-brand-navy md:text-base">
                    Rated Excellent
                  </p>
                </div>
              </div>

              {/* Right: technician illustration */}
              <div className="flex shrink-0 items-center justify-center">
                <Image
                  src="/images/expert-technician.jpg"
                  alt="Expert technician illustration"
                  width={300}
                  height={300}
                  className="h-40 w-40 object-contain mix-blend-multiply md:h-52 md:w-52"
                />
              </div>
            </div>
          </div>
          <WhyCard
            title="Local You Can Trust"
            body={`Family-owned and operated, serving ${suburb} locals you can rely on.`}
          >
            <PlaceholderArt label="Team photo" tall />
          </WhyCard>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-8 md:gap-8 lg:grid-cols-4">
          <WhyCard
            title="100% Guaranteed"
            body="We put our utmost effort into ensuring your satisfaction."
          >
            <Shield100 />
          </WhyCard>

          <WhyCard
            title="Round-The-Clock Access"
            body="Available around the clock, weekends and public holidays."
          >
            <Ring247 />
          </WhyCard>

          <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-sm">
            <div className="flex items-start justify-center">
              <Image
                src="/images/simple-pricing.webp"
                alt="Simple pricing"
                width={400}
                height={300}
                className="h-36 w-auto object-contain object-top md:h-44"
              />
            </div>
            <div className="p-6 pt-2 md:p-8 md:pt-2">
              <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
                Simple Pricing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
                Transparent, fair pricing. No hidden costs, just honest work.
              </p>
            </div>
          </div>

          <WhyCard
            title="Custom Solution and Design"
            body="Customisable to fit any home and budget — choose from various styles and colours."
          >
            <Image
              src="/images/custom-solution.png"
              alt="Custom solution and design illustration"
              width={300}
              height={300}
              className="h-32 w-32 object-contain mix-blend-multiply md:h-40 md:w-40"
            />
          </WhyCard>
        </div>
      </div>
    </section>
  );
}
