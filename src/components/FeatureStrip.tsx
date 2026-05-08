import Image from "next/image";

type Feature = {
  label: string;
  icon: string;
};

const features: Feature[] = [
  { label: "$0 Call Out", icon: "/images/icons/icon-call-out.svg" },
  { label: "20+ Years of Experience", icon: "/images/icons/icon-experience.png" },
  { label: "Quality Workmanship", icon: "/images/icons/icon-quality.svg" },
  { label: "Fully Accredited", icon: "/images/icons/icon-accredited.svg" },
  { label: "Upfront Fixed Pricing", icon: "/images/icons/icon-up-front.svg" },
];

export default function FeatureStrip() {
  return (
    <section className="w-full bg-brand-navy text-white">
      <ul className="mx-auto grid max-w-[1400px] grid-cols-6 gap-x-2 gap-y-7 px-6 py-8 md:grid-cols-5 md:gap-y-0 md:py-7">
        {features.map(({ label, icon }, i) => (
          <li
            key={label}
            className={`mx-auto flex w-full max-w-[100px] flex-col items-center justify-start gap-2 text-center md:col-span-1 md:max-w-[160px] md:gap-3 ${
              i < 3
                ? "col-span-2"
                : i === 3
                  ? "col-span-2 col-start-2"
                  : "col-span-2"
            }`}
          >
            <Image
              src={icon}
              alt=""
              width={64}
              height={64}
              className="h-9 w-9 md:h-14 md:w-14"
            />
            <span className="font-display text-[12px] font-extrabold leading-tight md:text-base">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
