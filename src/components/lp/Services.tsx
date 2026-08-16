import Image from "next/image";
import QuoteButton from "@/components/QuoteButton";
import { Swoosh } from "./swoosh";
import { SectionCta } from "./cta";
import { services } from "./gates-content";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white pb-32 scroll-mt-28">
      {/* Top band: faded streetscape behind the heading, with a cut-out gate
          breaking out over an angled navy panel on the right. */}
      <div className="relative flex items-center overflow-hidden pb-10 pt-28 lg:min-h-[min(calc(34.65vw+32px),656px)] lg:pb-0 lg:pt-0">
        <Image
          src="/images/gallery/03-5.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/85 to-white" />

        <div className="pointer-events-none absolute right-0 top-8 hidden aspect-[2000/1433] w-[38vw] max-w-[720px] lg:block xl:w-[44vw] xl:max-w-[820px] 2xl:w-[46vw] 2xl:max-w-[900px]">
          <div className="absolute right-0 top-[12%] h-[74%] w-[88%] bg-brand-navy [clip-path:polygon(48%_0,100%_0,100%_100%,14%_100%)]" />
          <Image
            src="/images/lp/driveway-gate-clean.png"
            alt="Modern automated sliding driveway gates"
            fill
            sizes="(min-width: 1536px) 46vw, (min-width: 1280px) 44vw, 38vw"
            className="object-contain object-right"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10">
          <div className="max-w-[820px]">
            <h2 className="font-display text-[42px] font-extrabold leading-[1.02] text-brand-ink sm:text-[60px] lg:text-[78px]">
              Everything Your Driveway Needs,{" "}
              <Swoosh color="#15355E">Under One Roof</Swoosh>
            </h2>
            <p className="mt-6 max-w-[700px] text-[20px] leading-relaxed text-brand-body sm:text-[23px]">
              From a brand new sliding gate to a motor that has given up on the
              gate you already own, the gate side and the automation side are
              handled by the same team, so nothing falls through the gap between
              trades.
            </p>
          </div>
        </div>
      </div>

      {/* Service cards, clear of the imagery above. */}
      <div className="relative mx-auto max-w-[1440px] px-6 pt-4 lg:px-10">
        <div className="grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="flex min-h-[260px] flex-col bg-brand-grey p-8">
              <Image
                src={s.icon}
                alt=""
                aria-hidden
                width={256}
                height={256}
                className="h-[86px] w-[112px] shrink-0 object-contain object-left"
              />
              <h3 className="mt-5 font-display text-[24px] font-extrabold leading-tight text-brand-ink">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[17px] leading-relaxed text-brand-body">{s.body}</p>
              <QuoteButton className="mt-5 text-left font-display text-[16px] font-extrabold text-brand-navy hover:underline">
                Get a price for this &rarr;
              </QuoteButton>
            </div>
          ))}
        </div>

        <SectionCta
          className="mt-14"
          arrow="left"
          subtext="Tell us your driveway and we'll quote it fast."
        />
      </div>
    </section>
  );
}
