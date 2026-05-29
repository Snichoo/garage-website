import Image from "next/image";

export type TeamMember = {
  name: string;
  yearsExperience: number;
  photo: string;
  alt: string;
};

const defaultTeam: [TeamMember, TeamMember] = [
  {
    name: "Manager Name",
    yearsExperience: 8,
    photo: "/images/founder.png",
    alt: "Sparrow Garage Doors local manager portrait",
  },
  {
    name: "Manager Name",
    yearsExperience: 5,
    photo: "/images/founder.png",
    alt: "Sparrow Garage Doors local manager portrait",
  },
];

type SuburbTeamProps = {
  suburb: string;
  team?: [TeamMember, TeamMember];
};

export default function SuburbTeam({ suburb, team }: SuburbTeamProps) {
  const [first, second] = team ?? defaultTeam;
  const combinedYears = first.yearsExperience + second.yearsExperience;

  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,540px)_1fr] md:gap-12 lg:grid-cols-[minmax(0,600px)_1fr] lg:gap-16">
          {/* Two side-by-side portrait cards on the left */}
          <div className="mx-auto grid w-full max-w-[600px] grid-cols-2 gap-3 md:gap-4">
            {[first, second].map((m, i) => (
              <div
                key={`${m.name}-${i}`}
                className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10"
              >
                <div className="relative aspect-[3/4] w-full bg-neutral-100">
                  <Image
                    src={m.photo}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 270px, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div className="flex flex-col">
            <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              <span className="block text-brand-navy">Meet Our</span>
              <span className="block text-black">{suburb} Team</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-neutral-800 md:text-base">
              At Sparrow Garage Doors, every {suburb} job is run by one of our
              two local managers. Between them they have over{" "}
              <strong>{combinedYears} years of hands on garage door experience</strong>,
              and they personally own every install, service and emergency
              callout across your postcode.
            </p>

            {/* Highlighted manager bar */}
            <div className="mt-6 bg-gradient-to-r from-brand-yellow via-brand-yellow to-brand-yellow/0 px-4 py-3 md:py-3.5">
              <p className="font-display text-sm font-extrabold uppercase tracking-tight text-black md:text-base lg:text-lg">
                Meet {first.name} &amp; {second.name}{" "}
                <span className="text-brand-navy">
                  {suburb} Managers
                </span>
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-800 md:text-base">
              {first.name} ({first.yearsExperience} years) and {second.name}{" "}
              ({second.yearsExperience} years) lead the {suburb} team. They
              quote, install and service every door themselves, so you never
              get bounced around a call centre or handed off to a stranger.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-800 md:text-base">
              <strong>One team, one number, every job owned end to end.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
