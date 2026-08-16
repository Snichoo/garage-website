import Image from "next/image";
import { CheckIcon, CrossIcon } from "./icons";
import { Swoosh, cx } from "./swoosh";
import { LpQuoteButton } from "./cta";
import { chooseThem, chooseUs } from "./gates-content";

function Item({
  title,
  body,
  icon,
  muted = false,
}: {
  title: string;
  body: string;
  icon: string;
  muted?: boolean;
}) {
  return (
    <div className="flex gap-5 py-6">
      <Image
        src={icon}
        alt=""
        aria-hidden
        width={256}
        height={256}
        sizes="66px"
        quality={70}
        className="mt-1 h-[56px] w-[66px] shrink-0 object-contain object-left"
      />
      <div>
        <h3 className="font-display text-[24px] font-extrabold leading-tight text-white sm:text-[27px]">
          {title}
        </h3>
        <p
          className={cx(
            "mt-3 text-[17px] leading-relaxed",
            muted ? "text-white/70" : "text-white/90",
          )}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-black pb-40 pt-24 text-white scroll-mt-28 lg:pt-28"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <h2 className="mx-auto max-w-[1240px] text-center font-display text-[40px] font-extrabold leading-[1.04] text-white sm:text-[58px] lg:text-[76px]">
          Why Brisbane Homeowners{" "}
          <Swoosh>Choose Us</Swoosh>
        </h2>
        <p className="mx-auto mt-6 max-w-4xl text-center text-[20px] leading-relaxed text-white/80">
          One team that builds the gate, runs the power and programs the
          automation stacks up differently to a fabricator, a sparky and an
          automation company each doing their own bit. Here is the side by side.
        </p>
      </div>

      {/* Full-bleed photo, edge to edge. */}
      <div className="relative mt-10 h-[440px] w-full overflow-hidden sm:h-[620px]">
        <Image
          src="/images/gallery/10-sams.jpg"
          alt="Dark aluminium slat gate and matching fence on a Brisbane driveway"
          fill
          sizes="100vw"
          quality={65}
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="-mt-24 grid gap-y-0 shadow-[0_24px_80px_-44px_rgba(0,0,0,0.8)] md:grid-cols-2 lg:-mt-36">
          <div className="bg-brand-navy px-7 pb-7">
            <div className="flex items-center gap-4 border-b border-white/20 py-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <CheckIcon className="h-7 w-7 text-brand-yellow" />
              </span>
              <span className="font-display text-[28px] font-extrabold text-white lg:text-[36px]">
                Us: One Team, Start to Finish
              </span>
            </div>
            <div className="divide-y divide-white/10">
              {chooseUs.map((item) => (
                <Item key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div className="bg-[#1d1d1d] px-7 pb-7">
            <div className="flex items-center gap-4 border-b border-white/15 py-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_4px_rgba(220,38,38,0.25)]">
                <CrossIcon className="h-8 w-8 text-red-600" />
              </span>
              <span className="font-display text-[28px] font-extrabold text-white lg:text-[36px]">
                Fabricators & One-Trade Installers
              </span>
            </div>
            <div className="divide-y divide-white/10">
              {chooseThem.map((item) => (
                <Item key={item.title} {...item} muted />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[380px]">
          <LpQuoteButton className="!text-[16px] sm:!text-[18px]" />
        </div>
      </div>
    </section>
  );
}
