import Image from "next/image";

export default function MeetTheTeam() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,440px)_1fr] md:gap-12 lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-16">
          {/* Portrait card - background, watermark and EST badge are baked
              into the image, so the card just frames it. */}
          <div className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/10">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/founder.png"
                alt="Sparrow Garage Doors founder portrait"
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 440px, 100vw"
                className="object-cover object-top"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
                <span className="rotate-[-18deg] select-none font-display text-3xl font-extrabold uppercase leading-tight tracking-[0.15em] text-white/40 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:text-4xl lg:text-5xl">
                  One Photo
                  <br />
                  Two People
                  <br />
                  In It
                </span>
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col">
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-brand-navy">Meet the Team</span>
              <span className="block text-black">Behind Sparrow Garage Doors</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-neutral-800 md:text-[17px]">
              At Sparrow Garage Doors, we&apos;re more than just installers -
              we&apos;re a team dedicated to setting the standard of what a
              garage door company should be. Family-owned and operated out of
              East Brisbane, our business was built on three non-negotiables:{" "}
              <strong>
                unrivalled quality, transparent pricing, and genuine customer
                care.
              </strong>
            </p>

            {/* Highlighted founder bar */}
            <div className="mt-8 bg-gradient-to-r from-brand-yellow via-brand-yellow to-brand-yellow/0 px-5 py-3 md:py-4">
              <p className="font-display text-base font-extrabold uppercase tracking-tight text-black md:text-lg lg:text-xl">
                Meet [Founder Name] -{" "}
                <span className="text-brand-navy">Founder &amp; Director</span>
              </p>
            </div>

            <p className="mt-6 text-base leading-relaxed text-neutral-800 md:text-[17px]">
              [Founder Name] started Sparrow Garage Doors with a simple but
              powerful vision:{" "}
              <strong>
                to revolutionise an industry that too often cuts corners, lacks
                quality, and disregards trust.
              </strong>{" "}
              With years of hands-on experience, he saw firsthand how
              homeowners were let down by poor service and low standards - and
              he knew there had to be a better way.
            </p>

            <p className="mt-4 text-base leading-relaxed text-neutral-800 md:text-[17px]">
              With that, the evolution of the new standard for the garage door
              trade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
