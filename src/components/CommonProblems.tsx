import type { SuburbProblem } from "@/data/suburbProfiles";
import { getContent } from "@/lib/content";

type CommonProblemsProps = {
  suburb: string;
  postcode: string;
  problems: SuburbProblem[];
  accent: string;
  accentSoft: string;
};

export default async function CommonProblems({
  suburb,
  postcode,
  problems,
  accent,
  accentSoft,
}: CommonProblemsProps) {
  const { business } = await getContent();
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Stencil shadow heading */}
        <div className="relative mb-10 h-[40px] overflow-hidden md:mb-12 md:h-[80px]">
          <h2 className="outlined-text absolute left-0 top-0 max-w-full select-none whitespace-nowrap font-display text-[24px] font-extrabold uppercase leading-none tracking-tight md:text-[56px]">
            Common Issues in {suburb}
          </h2>
          <h2
            className="absolute bottom-0 left-2 max-w-full whitespace-nowrap font-display text-[20px] font-extrabold uppercase leading-none tracking-tight md:left-5 md:text-[46px]"
            style={{ color: accent }}
          >
            Common Issues in {suburb}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {problems.map((p) => (
            <li
              key={p.title}
              className="flex flex-col rounded-2xl border bg-white/95 p-6 shadow-sm transition hover:shadow-md md:p-7"
              style={{ borderColor: accentSoft }}
            >
              <h3 className="font-display text-lg font-extrabold text-brand-navy md:text-xl">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        <div
          className="mt-10 flex flex-col items-start gap-4 rounded-2xl p-6 md:mt-12 md:flex-row md:items-center md:justify-between md:p-8"
          style={{ backgroundColor: accentSoft }}
        >
          <div>
            <h3 className="font-display text-xl font-extrabold text-brand-navy md:text-2xl">
              Got one of these problems?
            </h3>
            <p className="mt-1 text-sm text-neutral-700 md:text-base">
              Most callouts can be diagnosed and quoted on the spot. Same day
              service across {postcode} and surrounding postcodes.
            </p>
          </div>
          <a
            href={`tel:${business.phoneLink}`}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-brand-yellow px-6 py-3 font-display text-base font-extrabold tracking-wide text-brand-navy shadow-md transition hover:opacity-90 md:text-lg"
          >
            Call Our {suburb} Team
          </a>
        </div>
      </div>
    </section>
  );
}
