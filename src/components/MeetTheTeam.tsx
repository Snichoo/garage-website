import { getContent } from "@/lib/content";

export default async function MeetTheTeam() {
  const { meetTheTeam } = await getContent();
  return (
    <section id="about" className="w-full scroll-mt-28 py-12 md:py-20">
      <div className="mx-auto max-w-[1000px] px-6">
        {/* Copy */}
        <div className="flex flex-col">
          <p className="mb-3 font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-navy/60">
            {meetTheTeam.kicker}
          </p>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            <span className="block text-brand-navy">{meetTheTeam.headingTop}</span>
            <span className="block text-black">{meetTheTeam.headingBottom}</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-neutral-800 md:text-base">
            {meetTheTeam.introStart}{" "}
            <strong>{meetTheTeam.introBold}</strong>
            {meetTheTeam.introEnd}
          </p>

          {/* Highlighted bar */}
          <div className="mt-6 bg-gradient-to-r from-brand-yellow via-brand-yellow to-brand-yellow/0 px-4 py-3 md:py-3.5">
            <p className="font-display text-sm font-extrabold uppercase tracking-tight text-black md:text-base lg:text-lg">
              {meetTheTeam.bannerText}{" "}
              <span className="text-brand-navy">{meetTheTeam.bannerHighlight}</span>
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-neutral-800 md:text-base">
            {meetTheTeam.paragraph2}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-neutral-800 md:text-base">
            <strong>{meetTheTeam.paragraph3}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
