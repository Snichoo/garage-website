import Image from "next/image";

type Card = {
  title: string;
  src: string;
  alt: string;
  items: string[];
};

const cards: Card[] = [
  {
    title: "Residential",
    src: "/images/residential.png",
    alt: "Residential garage door",
    items: [
      "Garage Door Installation",
      "Garage Door Replacement",
      "Custom Designs & Colours",
      "Remote Control Setup",
    ],
  },
  {
    title: "Emergency Door Repairs - 0412 667 147",
    src: "/images/emergency.jpg",
    alt: "Emergency garage door repair",
    items: [
      "Emergency garage door repair",
      "Garage door not opening/closing fix",
      "Cable, roller & track repair",
      "Same-day service available",
    ],
  },
  {
    title: "Automated Gates",
    src: "/images/automated-gates.avif",
    alt: "Electric automated entry gates",
    items: [
      "Swing & sliding gate automation",
      "Motor supply & installation",
      "Intercom & keypad integration",
      "Repairs & servicing",
    ],
  },
  {
    title: "Smart Kits",
    src: "/images/smart-kit.avif",
    alt: "Smart garage and gate kit",
    items: [
      "Smartphone-controlled openers",
      "Wi-Fi & app integration",
      "Smart sensors & cameras",
      "Retrofit existing systems",
    ],
  },
];

function BulletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-white/80"
      aria-hidden
    >
      <path d="M3 12h6l3-7 3 14 3-7h3" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="relative mb-12 h-[120px] md:h-[160px]">
          <h2 className="outlined-text absolute left-0 top-0 select-none font-display text-[68px] font-extrabold leading-none tracking-tight md:text-[120px]">
            SERVICES
          </h2>
          <h2 className="absolute bottom-0 left-4 font-display text-[58px] font-extrabold leading-none tracking-tight text-brand-navy md:left-8 md:text-[104px]">
            SERVICES
          </h2>
        </div>

        {/* Service cards */}
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
          {cards.map((c) => (
            <article
              key={c.title}
              className="flex flex-col bg-brand-navy text-white shadow-md"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-[center_70%]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                <h3 className="font-display text-2xl font-extrabold leading-tight text-brand-yellow md:text-3xl">
                  {c.title}
                </h3>

                <ul className="flex flex-col gap-4">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-bold leading-snug text-white md:text-[15px]"
                    >
                      <BulletIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-auto inline-block bg-brand-yellow py-3 text-center font-display text-base font-extrabold tracking-wide text-brand-navy transition hover:opacity-90 md:text-lg"
                >
                  GET A FREE QUOTE
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
