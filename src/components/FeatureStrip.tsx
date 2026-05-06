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
      <ul className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-6 px-6 py-5 md:grid-cols-5 md:gap-y-0 md:py-6">
        {features.map(({ label, icon }) => (
          <li
            key={label}
            className="flex flex-col items-center justify-start gap-4 text-center"
          >
            <Image
              src={icon}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <span className="max-w-[180px] font-display text-sm font-extrabold leading-tight md:text-base">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
