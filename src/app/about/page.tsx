import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MeetTheTeam from "@/components/MeetTheTeam";
import { pageMetadata } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
  title: "About Sparrow Garage Doors | Local Brisbane Specialists",
  description:
    "Meet the local team behind Sparrow Garage Doors. Family-run specialists in garage door installation, repairs and servicing across Brisbane and South East Queensland.",
  path: "/about",
});
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Header />

      {/* Slim navy banner - gives the fixed header a dark backing */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/Jims-Hero-Image.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-32 md:pb-16 md:pt-40">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            <span className="text-brand-yellow">About</span> Us
          </h1>
        </div>
      </section>

      {/* Our Company + Australia map */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <div>
              <h2 className="font-display text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl">
                Our Company
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-800 md:text-[17px]">
                Sparrow Garage Doors&apos; reputation as a trusted installer and
                servicer of garage doors in the Brisbane market has continued to
                grow from strength to strength since we began.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-800 md:text-[17px]">
                Family-owned and operated from East Brisbane, we&apos;ve become
                the preferred choice for Queensland homeowners, builders and
                resellers, thanks to our quality products, wide range of styles
                and colours, fast turnaround, and a passionate team that
                delivers genuine customer service on every job.
              </p>
            </div>

            {/* Australia map - raw, no frame */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/australia-pin.png"
                alt="Map of Australia with a pin marking Brisbane"
                width={1080}
                height={1080}
                className="h-auto w-full max-w-[520px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality / Workmanship - solid yellow + black blocks on garage panel bg */}
      <section className="garage-bg w-full py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Quality - yellow */}
            <div className="flex bg-white p-2 shadow-lg md:p-3">
              <div className="flex-1 bg-brand-yellow p-8 text-black md:p-12">
                <h3 className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight md:text-5xl">
                  Quality
                </h3>
                <p className="mt-6 text-base font-semibold leading-relaxed md:text-[17px]">
                  Sparrow uses the best when it comes to materials. We fit
                  BlueScope Steel doors, reinforced nylon hinges and
                  Australian-made sectional panel lines designed to bring out
                  any variations in the steel, so every door we install runs
                  smoother, looks sharper and lasts longer than the cheap
                  alternatives.
                </p>
              </div>
            </div>

            {/* Workmanship - black */}
            <div className="flex bg-white p-2 shadow-lg md:p-3">
              <div className="flex-1 bg-brand-navy p-8 text-white md:p-12">
                <h3 className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-brand-yellow md:text-5xl">
                  Workmanship
                </h3>
                <p className="mt-6 text-base font-semibold leading-relaxed text-white md:text-[17px]">
                  Every install and repair is handled in-house by our own
                  technicians, with no subcontractors or national call centres. We
                  cover sectional doors, roller doors, tilt doors, automated
                  gates and smart kits, and we back every job with a
                  workmanship guarantee in writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MeetTheTeam />
      <CtaBanner />
      <Footer />
    </main>
  );
}
