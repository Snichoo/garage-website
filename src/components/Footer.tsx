import Image from "next/image";

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
    </svg>
  );
}

const services = [
  { label: "Sectional Garage Doors", href: "/sectional-garage-doors" },
  { label: "Roller Doors", href: "/roller-doors" },
  { label: "Tilt Doors", href: "/tilt-doors" },
];

const company = [
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact Us", href: "/#contact" },
  { label: "FAQs", href: "/#faq" },
];

const suburbs = [
  "Ashgrove",
  "Jindalee",
  "Wynnum",
  "Morayfield",
  "McDowall",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="garage-bg-navy relative w-full text-white">
      {/* Subtle dark overlay for legibility on top of the panelled bg */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="relative mx-auto max-w-[1240px] px-6 pb-10 pt-14 md:px-12 md:pb-12 md:pt-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <a href="/" aria-label="Home" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={280}
                height={100}
                className="h-16 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
              Brisbane&apos;s trusted experts in garage doors. Quality
              installation, reliable servicing, and friendly local advice — for
              homes and businesses across South East Queensland.
            </p>

            <a
              href="tel:0412667147"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-brand-yellow px-6 py-3 text-brand-navy shadow-lg transition hover:opacity-90"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="font-display text-base font-extrabold tracking-wide">
                0412 667 147
              </span>
            </a>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-display text-base font-semibold text-white/85 transition hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-display text-base font-semibold text-white/85 transition hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicing suburbs */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
              Servicing Suburbs
            </h3>
            <ul className="mt-5 space-y-3">
              {suburbs.map((suburb) => (
                <li
                  key={suburb}
                  className="font-display text-base font-semibold text-white/85"
                >
                  {suburb}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/15 pt-6 md:mt-16">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/60 md:flex-row md:text-sm">
            <p>© {year} All rights reserved.</p>
            <p className="font-display tracking-wide">
              Servicing Brisbane &amp; surrounds
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
