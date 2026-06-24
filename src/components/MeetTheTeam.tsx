type Manager = {
  yearsExperience: number;
};

const managers: [Manager, Manager] = [
  { yearsExperience: 8 },
  { yearsExperience: 5 },
];

export default function MeetTheTeam() {
  const [first, second] = managers;
  const combinedYears = first.yearsExperience + second.yearsExperience;
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1000px] px-6">
        {/* Copy */}
        <div className="flex flex-col">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            <span className="block text-brand-navy">Your Local</span>
            <span className="block text-black">Sparrow Team</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-neutral-800 md:text-base">
            At Sparrow Garage Doors, every job is run by one of our two
            managers. Between them they have over{" "}
            <strong>{combinedYears} years of hands on garage door experience</strong>,
            and they personally own every install, service and emergency
            callout we take on.
          </p>

          {/* Highlighted bar */}
          <div className="mt-6 bg-gradient-to-r from-brand-yellow via-brand-yellow to-brand-yellow/0 px-4 py-3 md:py-3.5">
            <p className="font-display text-sm font-extrabold uppercase tracking-tight text-black md:text-base lg:text-lg">
              No call centres, no subcontractors,{" "}
              <span className="text-brand-navy">just the Sparrow team</span>
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-neutral-800 md:text-base">
            Our two managers lead the Sparrow team. They quote, install and
            service every door themselves, so you never get bounced around a
            call centre or handed off to a stranger.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-neutral-800 md:text-base">
            <strong>One team, one number, every job owned end to end.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
