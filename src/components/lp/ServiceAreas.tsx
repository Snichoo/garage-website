import Image from "next/image";
import { PinIcon } from "./icons";
import { Swoosh } from "./swoosh";
import { serviceAreas } from "./gates-content";

function AreaCard({ region, suburbs }: { region: string; suburbs: string[] }) {
  return (
    <div className="bg-brand-grey p-8 lg:p-9">
      <h3 className="font-display text-[28px] font-extrabold text-brand-ink lg:text-[32px]">
        {region}
      </h3>
      <ul className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4">
        {suburbs.map((suburb) => (
          <li key={suburb} className="flex items-center gap-3 text-[17px] text-brand-body">
            <PinIcon className="h-5 w-5 shrink-0 text-brand-navy" />
            {suburb}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceAreas() {
  const [first, second, ...rest] = serviceAreas;

  return (
    <section id="areas" className="relative overflow-hidden bg-white pb-20 pt-24 scroll-mt-28">
      {/* Faded streetscape behind the heading. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px]">
        <Image
          src="/images/gallery/06-3.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-display text-[42px] font-extrabold leading-[1.04] text-brand-ink sm:text-[58px] lg:text-[78px]">
          Where
          <br />
          <Swoosh color="#15355E">We Work</Swoosh>
        </h2>
        <p className="mx-auto mt-7 max-w-4xl text-center text-[20px] leading-relaxed text-brand-body">
          We install, automate and repair driveway gates right across Greater
          Brisbane, from the inner suburbs out to Moreton Bay, Logan and
          Ipswich. Call with your suburb and your driveway details and we will
          confirm the next free measure available in your area.
        </p>

        {/* First row: two area cards with a gate photo between them. */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <AreaCard {...first} />
          <div className="relative mx-auto h-[300px] w-full max-w-[420px] lg:h-[390px] lg:w-[430px]">
            {/* Navy shape sits behind and slightly off the photo, so the angle
                reads as a deliberate frame rather than a tilted picture. */}
            <div className="absolute bottom-12 left-4 right-12 top-2 bg-brand-navy [clip-path:polygon(20%_0,100%_8%,88%_100%,0_86%)]" />
            <div className="absolute bottom-4 left-10 right-6 top-10 overflow-hidden [clip-path:polygon(20%_0,100%_8%,88%_100%,0_86%)]">
              <Image
                src="/images/gates/sliding-gate.avif"
                alt="Automated sliding gate on a residential driveway"
                fill
                sizes="(min-width: 1024px) 430px, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <AreaCard {...second} />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((area) => (
            <AreaCard key={area.region} {...area} />
          ))}
        </div>
      </div>
    </section>
  );
}
