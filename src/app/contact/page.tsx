import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationMap from "@/components/LocationMap";

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
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

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/contact-bg.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-36 text-center md:pb-28 md:pt-48">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            <span className="text-brand-yellow">Get In Touch</span>{" "}
            <span className="text-white">With Us</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            If you want reliable communication and high-quality trade services
            done by professionals, we&apos;re Your Go-to Guys!
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent)]" />
      </section>

      {/* Form + Info cards */}
      <section id="contact" className="relative w-full">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Form card */}
          <div className="bg-white p-6 shadow-2xl ring-1 ring-black/5 md:p-10">
            <h2 className="font-display text-2xl font-extrabold text-brand-navy md:text-3xl">
              Send Us A <span className="text-brand-yellow">Message</span>
            </h2>
            <p className="mt-2 text-sm text-neutral-600 md:text-base">
              Fill in the form and we&apos;ll be in touch within one business day.
            </p>

            <form className="mt-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
                />
              </div>

              <input
                type="email"
                required
                placeholder="Email"
                className="w-full border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
              />

              <textarea
                placeholder="Message (optional)"
                rows={6}
                className="w-full resize-none border border-neutral-300 px-4 py-3.5 text-sm outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-yellow/40"
              />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-lg transition hover:opacity-90 md:text-lg"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-5">
            <a
              href="tel:0468789795"
              className="garage-bg-navy-tight group relative overflow-hidden p-6 text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 md:p-7"
            >
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-yellow text-brand-navy shadow-md">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-yellow">
                    Phone
                  </h3>
                  <p className="mt-1 font-display text-xl font-extrabold">
                    0468 789 795
                  </p>
                </div>
              </div>
            </a>

            <a
              href="mailto:Sparroegaragedoors@gmail.com"
              className="garage-bg-navy-tight group relative overflow-hidden p-6 text-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-0.5 md:p-7"
            >
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-yellow text-brand-navy shadow-md">
                  <MailIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-yellow">
                    Email
                  </h3>
                  <p className="mt-1 break-all font-display text-base font-extrabold md:text-lg">
                    Sparroegaragedoors@gmail.com
                  </p>
                </div>
              </div>
            </a>

            <div className="garage-bg-navy-tight relative overflow-hidden p-6 text-white shadow-xl ring-1 ring-white/10 md:p-7">
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-yellow text-brand-navy shadow-md">
                  <PinIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-yellow">
                    How Can We Help?
                  </h3>
                  <p className="mt-2 font-display text-base font-extrabold leading-relaxed md:text-lg">
                    1/24 Lisburn Street,
                    <br />
                    East Brisbane, QLD 4169
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationMap />
      <Footer />
    </main>
  );
}
