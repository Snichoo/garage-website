import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowCanWeHelp from "@/components/HowCanWeHelp";
import LocationMap from "@/components/LocationMap";

const features = [
  "24/7 call-outs, weekends and public holidays.",
  "Every brand and model, fixed on the spot.",
  "Genuine parts and Australian-standard safety checks.",
];

const issues = [
  {
    title: "Broken or Worn-Out Springs",
    body: "Repair or replacement of torsion and extension springs to restore proper balance and safe operation.",
  },
  {
    title: "Damaged or Misaligned Tracks",
    body: "Realignment or replacement of bent and warped tracks so your door glides smoothly again.",
  },
  {
    title: "Non-Functioning Openers",
    body: "Repair or replacement of motors, sensors and remotes to bring your automation back to life.",
  },
  {
    title: "Frayed or Broken Cables",
    body: "Cable replacement to keep your door operating safely, with no more sudden drops or jams.",
  },
  {
    title: "Weather-Damaged Panels",
    body: "Repairs and replacements for panels and seals damaged by storms, sun and salt air.",
  },
  {
    title: "Door Stuck Halfway",
    body: "Fast diagnostics for doors that won't fully open or close, back up and running, often same day.",
  },
];

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}


export default function EmergencyRepairsPage() {
  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(253,215,16,0.15),transparent_55%)]" />

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-40 md:pb-24 md:pt-48 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pt-40">
          {/* Left copy */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
              Garage Door Emergency?
              <br />
              <span className="text-brand-yellow">We&apos;re On Our Way.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Broken spring, stuck door, motor down? Our Brisbane technicians
              are on call 24/7 with the parts to get you moving again.
            </p>
            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base leading-relaxed text-white/90 md:text-lg"
                >
                  <span className="mt-1 shrink-0 text-brand-yellow">
                    <CheckMark />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:0468789795"
                className="inline-flex items-center gap-3 bg-brand-yellow px-6 py-4 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
              >
                Call 0468 789 795
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-5 w-5"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.16.39 2.41.6 3.69.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.21 2.53.6 3.69a1 1 0 0 1-.25 1.05l-2.23 2.05z" />
                </svg>
              </a>
              <a
                href="#issues"
                className="inline-flex items-center gap-3 rounded-none border-2 border-white/30 bg-white/5 px-6 py-3.5 font-display text-base font-extrabold tracking-wide text-white transition hover:bg-white/10 md:text-lg"
              >
                See what we fix
              </a>
            </div>
          </div>

          {/* Right: image + services */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl">
              <Image
                src="/images/emergency.jpg"
                alt="Emergency garage door repair technician"
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                priority
                className="object-cover object-[center_70%]"
              />
            </div>

            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow">
                Emergency Services
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[
                  "Spring Replacement",
                  "Cable Repair",
                  "Track Realignment",
                  "Motor Repair",
                  "Sensor & Remote Fix",
                  "Storm Damage",
                  "Stuck Door Release",
                  "Same-Day Service",
                ].map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 font-display text-xs font-bold text-white/90 backdrop-blur md:text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common emergency issues */}
      <section id="issues" className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Stencil heading */}
          <div className="relative mb-6 h-[34px] md:mb-8 md:h-[80px]">
            <h2 className="outlined-text absolute left-0 top-0 select-none whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-tight md:text-[60px]">
              WHAT WE FIX
            </h2>
            <h2 className="absolute bottom-0 left-1.5 whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-brand-navy md:left-3 md:text-[56px]">
              WHAT WE FIX
            </h2>
          </div>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            From snapped springs to storm-damaged panels, our technicians
            arrive ready with the parts and tools to handle the most common
            (and uncommon) garage door emergencies in a single visit.
          </p>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((item) => (
              <li
                key={item.title}
                className="mx-auto flex w-full max-w-[360px] flex-col bg-brand-navy text-white shadow-md sm:max-w-none"
              >
                <span aria-hidden className="h-1.5 w-full bg-brand-yellow" />
                <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                  <h3 className="font-display text-2xl font-extrabold leading-tight text-brand-yellow md:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/85 md:text-base">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowCanWeHelp />

      <Faq />

      <CtaBanner />

      <LocationMap />

      <Footer />
    </main>
  );
}
