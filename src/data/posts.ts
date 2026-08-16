export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "signs-your-garage-door-spring-is-about-to-break",
    title: "5 Signs Your Garage Door Spring Is About to Break",
    excerpt:
      "Torsion springs do most of the heavy lifting on a residential garage door. Here are the early warning signs you should not ignore.",
    date: "2026-04-18",
    readTime: "4 min read",
    category: "Maintenance",
    image: "/images/emergency.jpg",
    imageAlt: "Technician inspecting a garage door torsion spring",
    body: [
      "Garage door springs are under enormous tension and they do most of the work every time your door opens or closes. When they fail, it's usually sudden, loud, and inconvenient.",
      "The good news is that a tired spring almost always gives you warning signs before it snaps. Catching these early can save you a same-day call-out and the cost of a stuck car.",
      "Look out for: jerky or uneven movement, a loud bang from the garage, gaps in the coils when the door is closed, the door feeling unusually heavy when lifted by hand, or the opener straining and struggling to lift the panel.",
      "If you see any of these, stop using the door and book a service. Springs should always be replaced in pairs to keep tension balanced, and the job needs the right winding bars and experience, so it's not a DIY repair.",
    ],
  },
  {
    slug: "sectional-vs-roller-doors",
    title: "Sectional vs Roller Doors: Which Is Right for Your Home?",
    excerpt:
      "Two of the most popular residential garage door styles in Brisbane, compared side by side on space, insulation, looks, and cost.",
    date: "2026-03-09",
    readTime: "6 min read",
    category: "Buying Guide",
    image: "/images/residential.webp",
    imageAlt: "Modern home with a sectional garage door",
    body: [
      "Most Brisbane homes end up choosing between a sectional door and a roller door. Both are good options. They just suit different garages.",
      "Sectional doors are made of horizontal panels that slide up and along the ceiling. They look more modern, insulate better, and are great where you want a clean facade. They need ceiling space for the tracks.",
      "Roller doors are a single curtain of slats that rolls up into a drum above the opening. They're compact, low maintenance, and perfect for garages with low headroom or where you want to maximise driveway space.",
      "Our short answer: pick a sectional door if appearance and insulation matter more, and a roller if space, simplicity, and price are the priority. We can price both side by side so you can compare them properly.",
    ],
  },
  {
    slug: "why-your-remote-stopped-working",
    title: "Why Your Garage Remote Suddenly Stopped Working",
    excerpt:
      "Before assuming the worst, run through this quick checklist. Most remote problems are solved in five minutes without a service call.",
    date: "2026-01-22",
    readTime: "3 min read",
    category: "Troubleshooting",
    image: "/images/smart-kit.avif",
    imageAlt: "Garage door remote on a kitchen counter",
    body: [
      "If your remote suddenly stops working, the cause is almost always one of four things, and three of them you can fix yourself in under five minutes.",
      "Start with the battery. Even if the LED still lights up, the battery can be too weak to send a strong signal. Swap it for a fresh CR2032 (or whatever your remote takes) and try again from inside the garage.",
      "Next, check that the antenna wire hanging from your motor head is intact and not tucked up against metal. Then make sure the lock button on the wall control hasn't been pressed by accident.",
      "If none of that works, the remote may need to be re-paired to the motor or the receiver board may have failed. Give us a call and we'll get it sorted, usually on the same visit.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
