export type SuburbProblem = {
  title: string;
  body: string;
};

export type SuburbFaq = {
  q: string;
  a: string;
};

export type SuburbProfile = {
  heroImage: string;
  /** Hero image alt text for screen readers. */
  heroImageAlt: string;
  /** Vivid accent colour layered over the brand navy + yellow palette. */
  accent: string;
  /** Lighter wash of the accent, used for subtle backgrounds. */
  accentSoft: string;
  /** One line suburb specific tagline shown beneath the H1. */
  heroTagline: string;
  /** Replaces the generic "Why us / local" blurb on the suburb page. */
  localKnowledge: string;
  /** Suburb tailored common problem list. */
  problems: SuburbProblem[];
  /** Optional suburb tailored FAQ items. Falls back to a templated list. */
  faqs?: SuburbFaq[];
};

export const suburbProfiles: Record<string, SuburbProfile> = {
  ashgrove: {
    heroImage: "/images/suburbs/ashgrove.jpg",
    heroImageAlt:
      "A leafy Ashgrove street with a classic Queenslander home and timber garage door",
    accent: "#2E6B3A",
    accentSoft: "#E6F0E8",
    heroTagline:
      "Timber tilt doors on Waterworks Road Queenslanders, modern sectional fitouts in the streets backing onto Ashgrove Park. We know every door style in 4060.",
    localKnowledge:
      "Ashgrove is built on hills and heritage. A huge portion of garage doors in 4060 are older timber tilt doors on character Queenslanders, often sitting under high clearance carports with steep, narrow driveways. We carry the spring sizes, motor mounts and counterbalance kits that suit these older, heavier doors, and we know how to install them without scarring the original timber.",
    problems: [
      {
        title: "Ageing timber tilt doors",
        body: "The original cedar and hardwood tilt doors on Ashgrove's Queenslanders are often 30 to 60 years old. We see warped panels, rotted bottom rails and pivot pin wear that makes the door drop or scrape. We can rebuild or swap to a matching sectional that respects the character of the home.",
      },
      {
        title: "Worn springs on heavy character doors",
        body: "Solid timber doors carry a lot of weight. Original torsion and extension springs in Ashgrove homes are frequently fatigued, leaving the door slamming shut or refusing to stay open. We replace with high cycle springs rated for the actual panel weight.",
      },
      {
        title: "Humidity track and roller rust",
        body: "Brisbane's wet seasons combined with leafy, low airflow garages in Ashgrove cause tracks, hinges and rollers to seize. We service, grease and replace corroded hardware on a 12 month maintenance cycle.",
      },
    ],
    faqs: [
      {
        q: "Do you service older timber tilt doors in Ashgrove?",
        a: "Yes. A huge portion of Queenslanders in 4060 still have their original cedar or hardwood tilt doors. We carry the spring sizes, counterbalance kits and pivot hardware that suit them, and we can refurbish the original door or convert to a matching sectional without damaging the character framing.",
      },
      {
        q: "Can you fit a new garage door to a character Queenslander?",
        a: "Absolutely. We measure to the original opening, brace the timber where it has softened, and choose a finish that respects the age of the home. A lot of the replacements we do up here need to look like they have always been there.",
      },
      {
        q: "My Ashgrove driveway is steep. Can you still install a new door?",
        a: "Yes. A lot of homes off Waterworks Road and up the hills around Ashgrove State School have steep, narrow driveways. We adjust the close limits and bottom seal clearance so the door beds properly on the slab without catching the lip on the high side.",
      },
      {
        q: "Do you offer emergency garage door repairs?",
        a: "Yes, same day across 4060 and the surrounding postcodes. Snapped springs, dead motors and doors stuck shut all qualify for a same day callout, often within a few hours of your call.",
      },
      {
        q: "Can you replace garage door motors?",
        a: "Yes. We supply and fit Merlin, B&D, Centurion and other major brands, and we match the new opener to the actual weight of your door rather than just fitting the cheapest unit that bolts on.",
      },
      {
        q: "How do you handle heritage restrictions on Ashgrove Queenslanders?",
        a: "We work with the existing opening size and match the door profile and finish to the age of the home. Most council character overlays in 4060 focus on street presentation, so we choose options that look original from the kerb while giving you a modern, secure mechanism behind the fascia.",
      },
    ],
  },

  jindalee: {
    heroImage: "/images/suburbs/jindalee.jpg",
    heroImageAlt:
      "A Jindalee street with a brick family home and double sectional garage door",
    accent: "#1F7A8C",
    accentSoft: "#E2F2F4",
    heroTagline:
      "From the 1970s brick and tile family homes near Jindalee Boat Ramp to the renovated double garage builds around Jindalee Home shopping centre, we service the lot.",
    localKnowledge:
      "Jindalee was built out in the late 60s and 70s, which means most original garage doors in 4074 are either tired tilt doors or first generation sectional doors at the end of their service life. The 2011 and 2022 floods also took out a lot of opener motors along the Centenary Suburbs riverfront. We still see flood affected wiring and rusted bottom panels today.",
    problems: [
      {
        title: "First generation sectional doors past their cycle life",
        body: "A lot of Jindalee sectional doors were installed in the late 90s and have well over 25,000 cycles on them. Panels separate, hinges crack, and cables fray. We do a full service or a matching Colorbond replacement.",
      },
      {
        title: "Flood damaged opener motors and wiring",
        body: "Properties closer to the river around Yallambee Road and Curragundi Road copped opener damage in 2011 and 2022. Even when the motor still works, the relays, photo eye wiring and circuit boards corrode internally and fail months later. We rewire or replace and lift the motor on a proper ceiling bracket above flood line.",
      },
      {
        title: "Spring fatigue on heavy double car doors",
        body: "Jindalee homes are mostly double garage. Heavier panel sets put more cycles on the springs, and once they go, the motor strains and burns out. We replace with correctly weighted torsion springs and rebalance the door.",
      },
    ],
    faqs: [
      {
        q: "Do you repair flood damaged garage door motors in Jindalee?",
        a: "Yes. We have worked through both the 2011 and 2022 flood events along the Centenary Suburbs riverfront. We test the wiring, replace corroded boards and lift the motor higher on the ceiling so the next flood does not take it out.",
      },
      {
        q: "Can you replace older sectional doors from the 90s and 2000s?",
        a: "Yes. A lot of the original sectional doors around 4074 are well past their cycle life. We swap them out for matching modern Colorbond doors sized to your existing opening, usually in a single visit.",
      },
      {
        q: "Can you help with an insurance claim for flood damaged garage doors?",
        a: "We can provide a detailed written quote and photos of the damage for your insurer. We have done this for dozens of Jindalee homes after the 2022 event and know exactly what the assessors need to see.",
      },
      {
        q: "Do you offer emergency garage door repairs?",
        a: "Yes, same day callouts across 4074. Snapped springs, doors stuck open and dead motors are all jobs we can usually clear on the first visit.",
      },
      {
        q: "Can you replace garage door motors?",
        a: "Yes. We carry Merlin, B&D and Centurion units and we size the motor to the actual weight of your door, with proper soft start to extend the rest of the hardware's life too.",
      },
      {
        q: "Can you convert my old Jindalee tilt door to a modern sectional?",
        a: "Yes. A lot of original 70s tilt doors across 4074 are past their life. We remove the old door, reinforce the opening if needed, and fit a new Colorbond sectional with a quiet DC motor, usually completed in a single visit.",
      },
    ],
  },

  wynnum: {
    heroImage: "/images/suburbs/wynnum.jpg",
    heroImageAlt:
      "A Wynnum bayside home with a coastal style roller door overlooking Moreton Bay",
    accent: "#0F89A8",
    accentSoft: "#DFF1F6",
    heroTagline:
      "From the weatherboard cottages a block back from the Wynnum Esplanade to the modern bayside builds near Iona College, we deal with salt, sand and humidity every day.",
    localKnowledge:
      "Wynnum is a salt air suburb. The bay breeze coming off Moreton Bay is great for the view and brutal on garage doors. We see corrosion on roller door curtains, springs and tracks across 4178 that you simply don't see inland. We recommend marine grade hardware, regular lubrication, and coastal coated motors as standard.",
    problems: [
      {
        title: "Salt air corrosion on roller door curtains and tracks",
        body: "Even Colorbond curtains pit and chalk near the bay if they're not washed down. We relubricate, replace corroded axle pins and recoat or swap to marine grade roller doors with anticorrosion guides.",
      },
      {
        title: "Rusted cables and spring assemblies",
        body: "Salt laden humidity gets right into the spring housing and lift cables on Wynnum sectional doors. A rusted cable is a snap and injury risk. We replace with stainless or galvanised marine grade cables and retension the door.",
      },
      {
        title: "Coastal humidity killing motor electronics",
        body: "Garage openers in 4178 fail circuit boards and capacitors years earlier than inland Brisbane. We fit coastal rated motors with sealed logic boards and earth them properly to avoid lightning storm damage too.",
      },
    ],
    faqs: [
      {
        q: "Do you fit marine grade garage doors in Wynnum?",
        a: "Yes. With Moreton Bay on the doorstep, salt air corrosion is the number one killer of springs, cables and tracks in 4178. We fit coastal rated rollers, stainless or marine grade cables and sealed motors as standard along the bayside.",
      },
      {
        q: "Do you service rust on roller door curtains and springs?",
        a: "Yes. We strip and recoat, replace pitted hardware and rebalance the door so it is not sitting under tension on a corroded spring. We can also set you up on a six or twelve month maintenance cycle to stay ahead of the salt air.",
      },
      {
        q: "How often should I get my garage door serviced in a bayside suburb?",
        a: "Every six to twelve months for homes in 4178. Salt air accelerates corrosion on springs, cables, hinges and tracks far faster than inland suburbs. A regular service catches rust before it becomes a safety issue.",
      },
      {
        q: "Do you offer emergency garage door repairs?",
        a: "Yes, same day across 4178 and the wider bayside. Snapped springs, jammed doors and dead motors are all jobs we can usually finish on the first visit.",
      },
      {
        q: "Can you replace garage door motors?",
        a: "Yes. For homes close to the bay we recommend coastal rated openers with sealed logic boards, earthed properly to ride out the local storm season.",
      },
      {
        q: "My Wynnum roller door is noisy and slow. Can you fix that?",
        a: "Usually yes. Salt corrosion on the curtain guides and axle pins is the most common cause. We strip the guides, replace corroded pins, relubricate and retension the curtain. If the curtain itself is pitted through, we swap it for a marine grade replacement.",
      },
    ],
  },

  morayfield: {
    heroImage: "/images/suburbs/morayfield.jpg",
    heroImageAlt:
      "A Morayfield master planned family home with a double Colorbond sectional garage door",
    accent: "#C25A2B",
    accentSoft: "#FBEAE0",
    heroTagline:
      "From the modern family estates around Morayfield Shopping Centre to the larger lots along the Caboolture River, we service the new builds and the older 80s family homes alike.",
    localKnowledge:
      "Morayfield is dominated by master planned family estates and project builder homes. Most garages have double car Colorbond sectional doors fitted with builder grade openers. They're cheap, common, and very predictable in how they fail. We carry the exact replacement springs, rollers and logic boards for the Merlin, B&D and Centurion units used across 4506.",
    problems: [
      {
        title: "Builder grade motor failures",
        body: "The entry level openers that come standard in Morayfield project builds burn out gears, capacitors and circuit boards inside 5 to 8 years. We replace with mid range DC motors that have proper warranty and soft start to extend the door's life too.",
      },
      {
        title: "Snapped springs on heavy double car panels",
        body: "Double sectional doors are heavy, and the original torsion spring is often underspec'd for the panel weight. When it snaps the door is dead. We fit two correctly weighted springs so a single break doesn't strand the car.",
      },
      {
        title: "Colorbond panel fade and dents on north facing garages",
        body: "Morayfield sun is harsh and a lot of garages face north. We see UV chalking, fading and trolley dents on cheaper panels. We replace individual panels or the full door in a higher grade Colorbond finish.",
      },
    ],
    faqs: [
      {
        q: "Can you replace the builder grade opener that came with my Morayfield home?",
        a: "Yes. The entry level motors fitted to most project builds across 4506 burn out gears, capacitors and boards inside five to eight years. We swap them for mid range DC openers with proper warranty and soft start.",
      },
      {
        q: "Do you fit double car sectional doors?",
        a: "Yes. Most local garages are double car, and we stock the panel sizes and correctly weighted spring sets that suit the project builder dimensions used through Morayfield and the wider Caboolture corridor.",
      },
      {
        q: "Is the builder warranty on my Morayfield garage door worth claiming?",
        a: "Often not. Most project builder warranties only cover the door for 12 months and exclude the motor, springs and hardware. By the time issues show up at the 3 to 5 year mark you are outside coverage. We can quote a proper repair or upgrade that will last.",
      },
      {
        q: "Can you install a smart opener with wifi in my Morayfield home?",
        a: "Yes. We fit wifi enabled openers from Merlin and B&D that let you open, close and monitor your garage from your phone. Popular in the newer estates where both parents are at work and want to let deliveries in or check if they left the door open.",
      },
      {
        q: "Do you offer emergency garage door repairs?",
        a: "Yes, same day callouts across 4506. Snapped springs, doors that will not close and dead motors are all jobs we can usually clear on the first visit.",
      },
      {
        q: "Can you replace garage door motors?",
        a: "Yes. We match the motor to the actual weight of your door instead of fitting the cheapest unit that bolts on, which is usually the reason the original opener failed early.",
      },
    ],
  },

  mcdowall: {
    heroImage: "/images/suburbs/mcdowall.webp",
    heroImageAlt:
      "A McDowall family home backing onto bushland with a double sectional garage door",
    accent: "#3D7C47",
    accentSoft: "#E6F0E7",
    heroTagline:
      "From the family estates along Beckett Road to the homes that back onto Raven Street Reserve, we deal with leaves, wildlife and sloped driveways every day in 4053.",
    localKnowledge:
      "McDowall sits up against Raven Street Reserve and a fair chunk of the suburb backs onto bushland. That means leaf litter in tracks, gum tree sap on panels, possums in the motor housing and roof rats in the wiring. These are issues you just don't get in flat inner city suburbs. We service every garage in 4053 with that in mind.",
    problems: [
      {
        title: "Leaves and debris clogging tracks and photo eyes",
        body: "Homes backing onto Raven Street Reserve and Cabbage Tree Creek constantly get leaves, bark and seed pods in the bottom track. The door jams, the safety beams trip, and the motor strains. We clear and reshroud the sensors and tracks.",
      },
      {
        title: "Possum and rodent damage to motor wiring",
        body: "Roof cavities backing onto bush attract possums and rats that chew through opener wiring, low voltage sensor cable and even drive belts. We reloom the wiring in conduit and seal the motor housing.",
      },
      {
        title: "Sloped driveways off Beckett Road and Old Northern Road",
        body: "Plenty of McDowall driveways drop sharply from the street. We reset the door's close limits and apron clearance so the bottom seal doesn't catch on the slab lip or leave a gap at the high point.",
      },
    ],
    faqs: [
      {
        q: "Do you fix garage door wiring chewed by possums or rats?",
        a: "Yes. Homes backing onto Raven Street Reserve and Cabbage Tree Creek see this constantly. We reloom the wiring in conduit and seal the motor housing so the rodents cannot get back in.",
      },
      {
        q: "Can you adjust a garage door for a sloped driveway?",
        a: "Yes. Plenty of driveways off Beckett Road and Old Northern Road drop sharply from the street. We reset the close limits and apron clearance so the bottom seal beds properly without scraping or leaving a gap.",
      },
      {
        q: "Can you possum proof my garage door motor?",
        a: "Yes. We seal the motor housing, run the wiring through conduit and block the common entry points along the ceiling rail. Possums and roof rats are the number one cause of opener wiring failure in McDowall.",
      },
      {
        q: "Do you offer emergency garage door repairs?",
        a: "Yes, same day across 4053. Snapped springs, doors stuck shut and dead motors are all jobs we can usually clear on the first visit.",
      },
      {
        q: "Can you replace garage door motors?",
        a: "Yes. We size the motor to the door weight and seal the housing to keep possums, rats and bushland debris out, which is the most common cause of premature opener failure up here.",
      },
      {
        q: "Do you clean out leaf debris from garage door tracks?",
        a: "Yes. It is part of every service call we do in McDowall. Homes backing onto Raven Street Reserve and Cabbage Tree Creek get a constant flow of leaves, bark and seed pods into the bottom track. We clear it all out, check the sensors, and reshroud anything that is exposed.",
      },
    ],
  },
};

export function getSuburbProfile(slug: string): SuburbProfile | undefined {
  return suburbProfiles[slug];
}

/**
 * Returns FAQ items for a suburb page. Uses the profile's custom FAQs if
 * present, otherwise falls back to a lightly suburb-flavoured template so
 * every location page still has a local FAQ section.
 */
export function getSuburbFaqs(
  suburbName: string,
  postcode: string,
  profile?: SuburbProfile,
): SuburbFaq[] {
  if (profile?.faqs && profile.faqs.length > 0) {
    return profile.faqs;
  }
  return [
    {
      q: `Do you service older garage doors in ${suburbName}?`,
      a: `Yes. We work on everything from original timber tilt doors through to modern sectional and roller setups. If it opens or closes a garage, we can service it, repair it or replace it.`,
    },
    {
      q: "Do you offer emergency garage door repairs?",
      a: `Yes, same day across ${postcode} and the surrounding postcodes. Snapped springs, dead motors and doors stuck shut all qualify for a same day callout, usually within a few hours of your call.`,
    },
    {
      q: "Can you replace garage door motors?",
      a: "Yes. We supply and fit Merlin, B&D, Centurion and other major brands, and we match the new opener to the actual weight of your door rather than just fitting the cheapest unit that bolts on.",
    },
    {
      q: `How quickly can you get to ${suburbName}?`,
      a: "Same day for emergencies in most cases, and usually within 48 hours for scheduled work. If you call before lunch we will almost always be at your door the same afternoon.",
    },
    {
      q: "Do you service both tilt and sectional doors?",
      a: "Yes, plus roller doors and panel-lift doors. We carry parts for the common brands and motor units so most jobs can be diagnosed and repaired on the first visit.",
    },
  ];
}
