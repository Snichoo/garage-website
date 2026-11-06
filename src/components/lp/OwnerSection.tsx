import Image from "next/image";
import { Swoosh } from "./swoosh";
import type { Phone } from "./cta";

export function OwnerSection({
  phone,
  businessName,
}: {
  phone: Phone;
  businessName: string;
}) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-brand-navyDeep text-white scroll-mt-28"
    >
      {/* Navy-tinted backdrop photo. */}
      <Image
        src="/images/lp/gate-hero.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-brand-navyDeep/60" />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-x-10 gap-y-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
        <div className="flex flex-col items-center self-end">
          <div className="relative h-[430px] w-full max-w-[480px] sm:h-[560px] lg:h-[660px]">
            <Image
              src="/images/lp/owner-figure-v2.webp"
              alt={`The owner of ${businessName}`}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 480px, calc(100vw - 48px)"
              quality={70}
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div>
          <h2 className="font-display text-[38px] font-extrabold leading-[1.04] text-white sm:text-[56px] lg:text-[68px]">
            Talk to the Team Doing the Work,{" "}
            <Swoosh>Not a Call Centre.</Swoosh>
          </h2>
          <div className="mt-8 space-y-6 text-[18px] leading-relaxed text-white/90 sm:text-[20px]">
            <p>
              Every Sparrow job is run by one of our two managers. The person who
              looks at your gate is the person who quotes it, fixes it, wires
              the motor and answers the phone when you ring six months later. No
              call centres, no subcontractors, nobody guessing at what somebody
              else promised you.
            </p>
            <p>
              It is also why the gate and the automation get looked at together.
              We kept hearing about jobs where one company fixed the gate,
              another fixed the motor and each blamed the other, leaving the
              homeowner holding the pieces, so we took on both and own it end to
              end.
            </p>
            <p>
              Ring{" "}
              <a href={`tel:${phone.link}`} className="font-bold text-brand-yellow underline">
                {phone.display}
              </a>{" "}
              and you get one of us, not a queue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
