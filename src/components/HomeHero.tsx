import Image from "next/image";
import { CtaStack } from "@/components/lp/cta";
import {
  GateIcon,
  MeasureIcon,
  NoCallOutIcon,
  PinIcon,
  RatedIcon,
  SpannerIcon,
} from "@/components/lp/icons";
import { Swoosh } from "@/components/lp/swoosh";
import { getContent } from "@/lib/content";

const badges = [
  { top: "$0", bottom: "Call Out Fee", icon: NoCallOutIcon },
  { top: "20+ Years", bottom: "On The Tools", icon: SpannerIcon },
  { top: "Free", bottom: "Quotes & Measures", icon: MeasureIcon },
  { top: "Doors + Motors", bottom: "One Local Team", icon: GateIcon },
  { top: "5.0 Star", bottom: "Google Rated", icon: RatedIcon },
];

/**
 * Homepage-only version of the cinematic Google Ads hero. Its visual shell
 * matches /lp/gates while the copy, image and reassurance points stay focused
 * on Sparrow's broader garage-door service.
 */
export default async function HomeHero() {
  const { business, hero } = await getContent();
  const phone = { display: business.phoneDisplay, link: business.phoneLink };

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden bg-black text-white"
    >
      <Image
        src={hero.image}
        alt="Modern garage door installed on a Brisbane home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black from-[8%] via-black/80 via-[48%] to-transparent to-[82%] sm:block" />
      <div className="absolute inset-0 bg-black/50 sm:hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 sm:from-black/85 sm:to-black/40" />

      <div className="relative mx-auto flex w-full min-w-0 max-w-[1440px] flex-1 flex-col px-5 pb-5 pt-[144px] sm:px-6 lg:px-10 lg:pt-[120px]">
        <div className="flex min-w-0 flex-1 flex-col justify-center py-3 sm:py-1">
          <div className="w-full min-w-0 max-w-[1000px]">
            <p className="flex items-center gap-2.5 text-[22px] font-semibold sm:text-2xl">
              <PinIcon className="h-7 w-7 text-brand-yellow" />
              Brisbane | South East Queensland
            </p>

            <h1 className="mt-4 max-w-full font-display text-[31px] font-extrabold leading-[1.02] text-white min-[380px]:text-[34px] min-[430px]:text-[38px] sm:text-[58px] sm:leading-[0.98] md:text-[76px] xl:text-[94px]">
              <Swoosh>Garage Doors</Swoosh>
              <span>
                <br />
                Installed, Repaired
              </span>
              <span>
                <br />&amp; Automated.
              </span>
            </h1>

            <p className="mt-4 max-w-[620px] text-[15px] font-medium leading-[1.55] text-white/85 sm:mt-5 sm:max-w-[860px] sm:text-xl sm:leading-relaxed xl:text-2xl">
              New garage doors, same-day repairs and automation across Brisbane,
              plus sliding, swing and telescopic gates. One local team handles
              doors, motors, springs, cables and gate systems from quote to
              handover.
            </p>

            <div className="mt-6">
              <CtaStack
                phone={phone}
                quoteLabel="Get My Free Quote"
                reassurances={[
                  "Talk to a real garage door technician.",
                  "Free quote. No obligation.",
                ]}
              />
            </div>
          </div>
        </div>

        <ul className="mt-auto grid grid-cols-6 gap-x-2 gap-y-3 border-t border-white/15 pt-4 sm:grid-cols-2 sm:gap-0 sm:border-t-0 sm:pt-0 lg:flex lg:items-stretch lg:justify-between">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <li
                key={badge.bottom}
                className={`flex flex-col items-center justify-start gap-1.5 text-center ${
                  index === 3
                    ? "col-span-2 col-start-2"
                    : "col-span-2"
                } sm:col-span-1 sm:col-start-auto sm:flex-row sm:items-center sm:gap-3.5 sm:border-b sm:border-r sm:border-white/20 sm:py-2 sm:pr-7 sm:text-left lg:min-w-[200px] lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0`}
              >
                <Icon
                  aria-hidden
                  className="h-9 w-9 shrink-0 text-brand-yellow sm:h-[46px] sm:w-[46px] lg:h-[54px] lg:w-[54px]"
                />
                <span className="leading-none text-white">
                  <span className="block font-display text-[14px] font-extrabold sm:text-[20px] lg:text-[22px]">
                    {badge.top}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold sm:text-[15px] lg:text-[16px]">
                    {badge.bottom}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
