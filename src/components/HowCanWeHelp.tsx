import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";

export default function HowCanWeHelp() {
  const { howCanWeHelp } = getContent();
  const items = howCanWeHelp.items;
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Stencil heading - matches Services / Why Us */}
        <div className="relative mb-4 h-[60px] md:mb-6 md:h-[124px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[44px] font-extrabold leading-none tracking-tight md:text-[96px]">
            {howCanWeHelp.heading}
          </h2>
          <h2 className="absolute bottom-0 left-3 font-display text-[40px] font-extrabold leading-none tracking-tight text-brand-navy md:left-6 md:text-[84px]">
            {howCanWeHelp.heading}
          </h2>
        </div>

        {/* Icon grid */}
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:mt-14 md:grid-cols-6 md:gap-x-6">
          {items.map(({ label, icon, href }) => (
            <li key={label} className="flex">
              <Link
                href={href}
                aria-label={label}
                className="group flex w-full flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:shadow-lg md:h-28 md:w-28">
                  <Image
                    src={icon}
                    alt={`${label} icon`}
                    width={56}
                    height={56}
                    className="h-12 w-12 object-contain md:h-14 md:w-14"
                  />
                </div>
                <span className="mt-4 font-display text-xs font-extrabold uppercase tracking-wider text-brand-navy transition group-hover:text-brand-navy md:text-sm">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* And more */}
        <div className="mt-12 flex justify-center md:mt-16">
          <span className="relative inline-block font-display text-lg font-bold italic text-brand-navy md:text-xl">
            <span className="relative z-10">{howCanWeHelp.moreText}</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-0 h-[6px] bg-brand-yellow/70"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
