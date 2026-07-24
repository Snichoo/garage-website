import Image from "next/image";
import { getContent } from "@/lib/content";
import { fill } from "@/content/defaults";

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

type WhyChooseUsProps = {
  suburb?: string;
  accent?: string;
};

export default async function WhyChooseUs({
  suburb,
}: WhyChooseUsProps = {}) {
  const { whyChooseUs } = await getContent();
  return (
    <section className="garage-bg-navy w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Stencil heading */}
        <div className="relative mb-10 h-[88px] md:mb-12 md:h-[160px]">
          <h2 className="outlined-text-navy absolute left-0 top-0 select-none font-display text-[68px] font-extrabold leading-none tracking-tight md:text-[120px]">
            {whyChooseUs.heading}
          </h2>
          <h2 className="absolute bottom-0 left-4 font-display text-[58px] font-extrabold leading-none tracking-tight text-brand-yellow md:left-8 md:text-[104px]">
            {whyChooseUs.heading}
          </h2>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-8">
              {/* Left: text + rating */}
              <div className="flex flex-1 flex-col">
                <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
                  {whyChooseUs.qualityTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
                  {whyChooseUs.qualityBody}
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
                    {whyChooseUs.qualityRatingLabel}
                  </p>
                </div>
              </div>

              {/* Right: technician illustration */}
              <div className="flex shrink-0 items-center justify-center">
                <Image
                  src={whyChooseUs.qualityImage}
                  alt="Expert technician illustration"
                  width={300}
                  height={300}
                  className="h-40 w-40 object-contain md:h-52 md:w-52"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-sm md:p-8">
            <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
              {whyChooseUs.customTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
              {whyChooseUs.customBody}
            </p>
            <div className="mt-6 flex flex-1 items-center justify-center">
              <Image
                src={whyChooseUs.customImage}
                alt="Custom solution and design illustration"
                width={300}
                height={300}
                className="h-40 w-40 object-contain md:h-52 md:w-52"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-8 md:gap-8 lg:grid-cols-3">
          <WhyCard
            title={whyChooseUs.guaranteeTitle}
            body={whyChooseUs.guaranteeBody}
          >
            <Image
              src={whyChooseUs.guaranteeImage}
              alt="100% Guaranteed"
              width={300}
              height={300}
              className="h-32 w-32 object-contain mix-blend-multiply md:h-40 md:w-40"
            />
          </WhyCard>

          {suburb ? (
            <WhyCard
              title={fill(whyChooseUs.localTitle, { suburb })}
              body={whyChooseUs.localBody}
            >
              <Image
                src={whyChooseUs.localImage}
                alt="Local garage door specialists"
                width={300}
                height={300}
                className="h-32 w-32 object-contain md:h-40 md:w-40"
              />
            </WhyCard>
          ) : (
            <WhyCard
              title={whyChooseUs.aroundClockTitle}
              body={whyChooseUs.aroundClockBody}
            >
              <Image
                src={whyChooseUs.aroundClockImage}
                alt="Available 24/7"
                width={300}
                height={300}
                className="h-32 w-32 object-contain mix-blend-multiply md:h-40 md:w-40"
              />
            </WhyCard>
          )}

          <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-sm">
            <div className="flex items-start justify-center">
              <Image
                src={whyChooseUs.pricingImage}
                alt="Simple pricing"
                width={400}
                height={300}
                className="h-36 w-auto object-contain object-top md:h-44"
              />
            </div>
            <div className="p-6 pt-2 md:p-8 md:pt-2">
              <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
                {whyChooseUs.pricingTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 md:text-base">
                {whyChooseUs.pricingBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
