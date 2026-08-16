import Image from "next/image";
import { PhoneIcon, TickMark, ArrowDoodle } from "./icons";
import { Swoosh } from "./swoosh";
import { steps } from "./gates-content";
import type { Phone } from "./cta";

const PHOTO = "/images/gallery/02-5.jpg";
const PHOTO_ALT = "Automated entry gates and fencing installed at a Brisbane home";

export function Process({ phone }: { phone: Phone }) {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white pb-24 pt-14 scroll-mt-28 sm:pb-32 sm:pt-24 lg:pb-40 lg:pt-32"
    >
      {/* Big job photo, flush to the left edge of the screen on desktop. */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden aspect-[553/366] w-[52vw] max-w-[940px] lg:block">
        <Image src={PHOTO} alt={PHOTO_ALT} fill sizes="52vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_50%,#fff)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#fff,transparent_26%,transparent_84%,#fff)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative">
          <h2 className="relative font-display text-[42px] font-extrabold leading-[1.02] text-brand-ink sm:text-[60px] lg:text-[76px]">
            One Team, From First Measure to{" "}
            <Swoosh color="#15355E">Final Click.</Swoosh>
          </h2>
          <p className="mt-5 max-w-[580px] text-[18px] font-medium leading-relaxed text-brand-body sm:text-[20px]">
            Gate, motor, power and safety gear—planned and installed by one
            accountable team under one fixed quote.
          </p>

          {/* Mobile version of the same photo, under the heading. */}
          <div className="relative mt-10 aspect-[553/366] w-full overflow-hidden lg:hidden">
            <Image src={PHOTO} alt={PHOTO_ALT} fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff,transparent_24%,transparent_76%,#fff)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#fff,transparent_24%,transparent_76%,#fff)]" />
          </div>
        </div>

        <div className="relative z-10">
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <Image
                    src={s.icon}
                    alt=""
                    aria-hidden
                    width={256}
                    height={256}
                    className="h-[80px] w-[88px] shrink-0 object-contain"
                  />
                  {i < steps.length - 1 && <span className="my-2 w-px flex-1 bg-brand-line" />}
                </div>
                <div className="pb-8">
                  <p className="font-display text-sm font-extrabold tracking-widest text-brand-navy">
                    {s.step}
                  </p>
                  <h3 className="mt-2 font-display text-[28px] font-extrabold leading-tight text-brand-ink sm:text-[32px]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[560px] text-[18px] leading-relaxed text-brand-body">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative mt-4 max-w-[480px]">
            <ArrowDoodle className="pointer-events-none absolute -right-16 top-1 hidden h-16 w-16 text-brand-ink sm:block" />
            <a
              href={`tel:${phone.link}`}
              className="flex w-full items-center justify-center gap-3 bg-brand-yellow px-8 py-4 font-display text-[22px] font-extrabold tracking-wide text-brand-navy transition-colors hover:bg-brand-yellowDark"
            >
              <PhoneIcon className="h-6 w-6 shrink-0" />
              Call {phone.display}
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-[17px] font-semibold text-brand-ink">
            <TickMark className="h-5 w-5 shrink-0 text-brand-navy" />
            One quote, one install, one number to call afterwards.
          </p>
        </div>
      </div>
    </section>
  );
}
