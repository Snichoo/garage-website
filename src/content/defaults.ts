/**
 * Default site content. Every string and image here can be overridden from the
 * admin dashboard (/admin), which saves overrides to content/site-content.json.
 *
 * This module must stay client-safe: no fs, no server-only imports. The merged
 * content is read on the server via src/lib/content.ts and handed to client
 * components through the ContentProvider context.
 *
 * Strings may contain {suburb}, {phone} or {year} tokens which are replaced at
 * render time with the fill() helper.
 */

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { mobileOnly?: boolean; dropdown?: NavLink[] };
export type FeatureItem = { label: string; icon: string };
export type ReviewItem = {
  name: string;
  text: string;
  date: string;
  avatar: string;
  avatarBg: string;
  verified?: boolean;
  photo?: string;
};
export type FaqItem = { q: string; a: string };
export type HelpItem = {
  label: string;
  icon: string;
  href: string;
  featured?: boolean;
};

export type SiteContent = {
  business: {
    name: string;
    phoneDisplay: string;
    phoneLink: string;
    email: string;
    description: string;
    primaryLocation: string;
    areaServed: string;
    logo: string;
    ratingScore: string;
    ratingLabel: string;
  };
  header: {
    callBannerLabel: string;
    quoteButtonLabel: string;
    callNowLabel: string;
    menuTitle: string;
    nav: NavItem[];
  };
  hero: {
    titleMiddle: string;
    titleHighlight: string;
    features: string[];
    callButton: string;
    formTitle: string;
    formTitleHighlight: string;
    formSubmitLabel: string;
    image: string;
  };
  featureStrip: { items: FeatureItem[] };
  services: {
    heading: string;
    quoteButtonLabel: string;
    learnMoreLabel: string;
    cards: {
      title: string;
      image: string;
      alt: string;
      items: string[];
      href: string;
      imagePosition?: string;
      callCta?: boolean;
    }[];
  };
  reviews: {
    heading: string;
    subheading: string;
    items: ReviewItem[];
  };
  howCanWeHelp: {
    heading: string;
    moreText: string;
    items: HelpItem[];
  };
  meetTheTeam: {
    kicker: string;
    headingTop: string;
    headingBottom: string;
    introStart: string;
    introBold: string;
    introEnd: string;
    bannerText: string;
    bannerHighlight: string;
    paragraph2: string;
    paragraph3: string;
  };
  whyChooseUs: {
    heading: string;
    qualityTitle: string;
    qualityBody: string;
    qualityRatingLabel: string;
    qualityImage: string;
    customTitle: string;
    customBody: string;
    customImage: string;
    guaranteeTitle: string;
    guaranteeBody: string;
    guaranteeImage: string;
    aroundClockTitle: string;
    aroundClockBody: string;
    aroundClockImage: string;
    localTitle: string;
    localBody: string;
    localImage: string;
    pricingTitle: string;
    pricingBody: string;
    pricingImage: string;
  };
  areasWeServe: {
    headingTop: string;
    headingHighlight: string;
    intro: string;
    rest: string;
    backgroundImage: string;
  };
  workGallery: {
    headingHighlight: string;
    headingRest: string;
    subtitle: string;
    backgroundImage: string;
    images: { image: string; alt: string }[];
  };
  locationMap: { query: string };
  faq: { intro: string; items: FaqItem[] };
  quoteModal: {
    kicker: string;
    title: string;
    successTitle: string;
    successText: string;
    submitLabel: string;
    sendingLabel: string;
    callPrompt: string;
    messagePlaceholder: string;
  };
  quoteForm: {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    addressPlaceholder: string;
    messagePlaceholder: string;
    successTitle: string;
    successText: string;
  };
  contactForm: {
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    addressPlaceholder: string;
    messagePlaceholder: string;
    submitLabel: string;
    successTitle: string;
    successText: string;
  };
  ctaBanner: {
    heading: string;
    text: string;
    buttonLabel: string;
    suburbButtonLabel: string;
    image: string;
  };
  footer: {
    blurb: string;
    servicesHeading: string;
    services: NavLink[];
    companyHeading: string;
    company: NavLink[];
    regionsHeading: string;
    regionsIntro: string;
    legal: NavLink[];
    copyright: string;
  };
  contactPage: {
    heroTitleHighlight: string;
    heroTitleRest: string;
    heroText: string;
    heroImage: string;
    formTitle: string;
    formTitleHighlight: string;
    formText: string;
    phoneCardTitle: string;
    emailCardTitle: string;
    mobileCardTitle: string;
    mobileCardText: string;
  };
  thankYouPage: {
    heroTitleHighlight: string;
    heroTitleRest: string;
    heroText: string;
    heroImage: string;
    steps: { title: string; text: string }[];
    callPrompt: string;
    homeButtonLabel: string;
  };
};

/** Replace {tokens} in editable copy, e.g. fill(str, { suburb: "Brisbane" }). */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match,
  );
}

export const defaultContent: SiteContent = {
  business: {
    name: "Sparrow Garage Doors",
    phoneDisplay: "07 3180 3857",
    phoneLink: "0731803857",
    email: "sparrowgaragedoors@gmail.com",
    description:
      "Local Brisbane garage door specialists. Installation, replacement and same-day repairs for sectional, roller and tilt doors, plus motors, springs and cables.",
    primaryLocation: "Brisbane",
    areaServed: "Brisbane and South East Queensland",
    logo: "/images/logo.png",
    ratingScore: "5.0",
    ratingLabel: "Top Rated Garage Door Company",
  },
  header: {
    callBannerLabel: "CALL US {phone}",
    quoteButtonLabel: "Get a Quote Today",
    callNowLabel: "CALL US NOW",
    menuTitle: "Menu",
    nav: [
      { label: "Home", href: "/" },
      {
        label: "Repairs",
        href: "/repairs",
        dropdown: [
          { label: "Emergency Garage Door Repairs", href: "/emergency-repairs" },
          { label: "Garage Door Repairs", href: "/garage-door-repairs" },
          { label: "Gate Repairs", href: "/gate-repairs" },
          { label: "Broken Spring Replacement", href: "/springs" },
          { label: "Cable Replacement", href: "/cables" },
          { label: "Garage Door Off Track", href: "/garage-door-off-track" },
          { label: "Garage Door Servicing", href: "/garage-door-servicing" },
          {
            label: "Garage Door Safety Inspection",
            href: "/garage-door-safety-inspection",
          },
        ],
      },
      {
        label: "Garage Doors",
        href: "/garage-doors",
        dropdown: [
          { label: "New Garage Doors", href: "/garage-doors" },
          { label: "Sectional Garage Doors", href: "/sectional-garage-doors" },
          { label: "Roller Garage Doors", href: "/roller-doors" },
          { label: "Tilt Garage Doors", href: "/tilt-doors" },
        ],
      },
      {
        label: "Gates",
        href: "/gates",
        dropdown: [
          { label: "New Gates", href: "/gates" },
          { label: "Sliding Gates", href: "/sliding-gates" },
          { label: "Swing Gates", href: "/swing-gates" },
          { label: "Telescopic Gates", href: "/gate-automation#telescopic" },
        ],
      },
      {
        label: "Automation",
        href: "/automation",
        dropdown: [
          { label: "Garage Door Openers", href: "/openers" },
          {
            label: "Garage Door Motor Replacement",
            href: "/garage-door-motor-replacement",
          },
          { label: "Gate Motors & Automation", href: "/gate-automation" },
          { label: "Gate Motor Replacement", href: "/gate-motor-replacement" },
          { label: "Smart Systems", href: "/smart-systems" },
        ],
      },
      {
        label: "Contact",
        href: "/contact",
        dropdown: [
          { label: "Contact Us", href: "/contact" },
          { label: "Request a Quote", href: "/request-a-quote" },
          { label: "Book a Service", href: "/book-a-service" },
        ],
      },
    ],
  },
  hero: {
    titleMiddle: "Trusted",
    titleHighlight: "Garage Door Specialists",
    features: [
      "Same Day Repairs",
      "All Garage Door Types",
      "Transparent Pricing",
      "Licensed & Insured",
    ],
    callButton: "Call Our {suburb} Team",
    formTitle: "Get A",
    formTitleHighlight: "Quote Today",
    formSubmitLabel: "Send To Our {suburb} Team",
    image: "/images/hero.jpg",
  },
  featureStrip: {
    items: [
      { label: "$0 Call Out", icon: "/images/icons/icon-call-out.svg" },
      {
        label: "20+ Years of Experience",
        icon: "/images/icons/icon-experience.png",
      },
      { label: "Quality Workmanship", icon: "/images/icons/icon-quality.svg" },
      { label: "Fully Accredited", icon: "/images/icons/icon-accredited.svg" },
      {
        label: "Upfront Fixed Pricing",
        icon: "/images/icons/icon-up-front.svg",
      },
    ],
  },
  services: {
    heading: "SERVICES",
    quoteButtonLabel: "GET A QUOTE TODAY",
    learnMoreLabel: "Learn More",
    cards: [
      {
        title: "Repairs",
        image: "/images/emergency.jpg",
        alt: "Emergency garage door repair",
        items: [
          "Emergency garage door repairs",
          "Garage door & gate repairs",
          "Springs, cables & off track",
        ],
        href: "/repairs",
        callCta: true,
      },
      {
        title: "New Garage Doors",
        image: "/images/residential.webp",
        alt: "New garage door installed on a Brisbane home",
        items: [
          "Sectional garage doors",
          "Roller garage doors",
          "Tilt garage doors",
        ],
        href: "/garage-doors",
      },
      {
        title: "Automatic Gates",
        image: "/images/gates/sliding-gate.avif",
        alt: "New automated sliding driveway gate",
        items: [
          "Sliding gates",
          "Swing gates",
          "Telescopic gates",
        ],
        href: "/gates",
      },
      {
        title: "Motors & Automation",
        image: "/images/openers-hero.webp",
        alt: "Garage door remote being used at a home",
        items: [
          "Garage door openers & motors",
          "Gate motors & automation",
          "Motor replacements & smart systems",
        ],
        href: "/automation",
      },
    ],
  },
  reviews: {
    heading: "EXCELLENT",
    subheading: "30+ 5 Star Google Reviews",
    items: [
      {
        name: "aw",
        text: "Excellent service - my garage door motor had been entering an error state for a few months and I was quoted a full motor replace over the phone from another company. I called Sparrow and spoke with Elisha who offered to investigate first and he managed to fix it for a reasonable service cost - significantly cheaper than wasting money on a full motor replacement. Great, friendly, honest and efficient service, very highly recommended.",
        date: "12/02/2026",
        avatar: "A",
        avatarBg: "#26A69A",
        verified: true,
      },
      {
        name: "Leilani Tuato",
        text: "Very happy with communication from start to finish. We love our new garage. A+++",
        date: "16/07/2025",
        avatar: "L",
        avatarBg: "#00897B",
        verified: true,
        photo: "/images/leilani-review-card.webp",
      },
      {
        name: "Brenda Jelagat",
        text: "I was very happy with their service, was on the phone with one of their team on Sunday evening on how to program my key garage remote and I was guided through successfully. Clear communication, simple instructions from start to end, amazing team, would definitely recommend to everybody. Thank you.",
        date: "08/10/2025",
        avatar: "B",
        avatarBg: "#7B1FA2",
        verified: true,
      },
      {
        name: "Madupa Rodrigo",
        text: "Elisha from Sparrow Garage Doors did an amazing job replacing my garage door motor. He was professional, efficient, and the price was very reasonable. Highly recommend his service!",
        date: "03/09/2025",
        avatar: "M",
        avatarBg: "#D81B60",
        verified: true,
      },
      {
        name: "Ken Brown",
        text: "Had to get our double garage panel door repaired or replaced after an attempted break in. Found Elisha online and called him. Despite being busy he came the next day, tried to repair the existing door but eventually ascertained it would need replacing. His quote was prompt and my insurance company quickly accepted it. As soon as Elisha was advised it was ready, he called me and the install began within 2 days. He did a great job and it was a pleasure to do business with. Highly recommend him.",
        date: "21/05/2025",
        avatar: "K",
        avatarBg: "#5C6BC0",
        verified: true,
      },
      {
        name: "Giuseppe Scuderi",
        text: "My front gate stopped working. Elisha from Sparrow Garage Doors was excellent!! Elisha was able to get a new motor and replace it that same day for a much better price than other people I had quote the job. Could not recommend enough!!",
        date: "29/04/2025",
        avatar: "G",
        avatarBg: "#F4511E",
        verified: true,
      },
      {
        name: "Paul Ansell",
        text: "Had the opening motors replaced. Very happy with the price, options and communication. Nicest bloke and very knowledgeable.",
        date: "11/11/2025",
        avatar: "P",
        avatarBg: "#1E88E5",
        verified: true,
      },
      {
        name: "Christine Hogan",
        text: "Could not recommend Sparrow Garage Doors highly enough!! After shopping around for a new garage door these guys gave us the best price by far and were so easy to deal with. Thanks so much for everything Sparrow.",
        date: "18/09/2025",
        avatar: "C",
        avatarBg: "#43A047",
        verified: true,
      },
      {
        name: "James Brindle",
        text: "Elisha definitely knows a thing or two about garage doors! We have an old B&D panel lift door at our place which was one of the first produced. We had 3 separate companies out to look at its issues and try and repair it but they all chalked it up to end of life and quoted for a replacement. I originally reached out to Sparrow Garage Doors for a quote for a new door, Elisha decided to swing round and within 2 mins had identified the issue and parts required to repair it. He even came back the same day and fixed our issues. The door is now running better than ever! If you are looking for a garage door service, repair, replacement or just general advice Elisha is hands down the best there is.",
        date: "06/06/2025",
        avatar: "J",
        avatarBg: "#FB8C00",
        verified: true,
      },
      {
        name: "Iona Davis",
        text: "Best service! Roller door got jammed and it was fixed quickly. Elisha was very friendly and knowledgeable. Highly recommend!",
        date: "23/06/2025",
        avatar: "I",
        avatarBg: "#8E24AA",
        verified: true,
      },
      {
        name: "Bianca Edwards",
        text: "Cannot recommend Elisha from Sparrow Doors enough! Our garage door collapsed off the rails and we called him at 7.45 on a Wednesday night and he was here within an hour and managed to get it all put back together so it's secure and in place and is organising the rest of the parts for us. He's polite and professional and super easy to deal with!",
        date: "02/05/2025",
        avatar: "B",
        avatarBg: "#3949AB",
        verified: true,
      },
      {
        name: "Phillip Law",
        text: "Prompt and professional. Elisha came out on a Saturday to replace my old broken garage door motor. He is very knowledgeable, thorough, and adds in valuable education (useful tips that most garage door owners are unaware of). Thank you!",
        date: "10/05/2025",
        avatar: "P",
        avatarBg: "#00ACC1",
        verified: true,
      },
      {
        name: "Jenny Harris",
        text: "Elisha did a wonderful job fixing our garage door. He was knowledgeable, professional, skilful and explained everything very well. I will certainly be asking him back for any future work.",
        date: "17/05/2025",
        avatar: "J",
        avatarBg: "#E53935",
        verified: true,
      },
      {
        name: "Erden Er",
        text: "The technician is so talented, we called few companies before, no one could figure out what the problem is. Then I got my luck here, the job got done so quick I am so surprised. Highly recommended, price is also very fair.",
        date: "25/04/2025",
        avatar: "E",
        avatarBg: "#6D4C41",
        verified: true,
      },
      {
        name: "Mia Designer",
        text: "Our garage door wouldn't open. Elisha got here early morning and had it taken care of in less than an hour. Exceptional service.",
        date: "14/05/2025",
        avatar: "M",
        avatarBg: "#5E35B1",
        verified: true,
      },
      {
        name: "Julius Metcalfe",
        text: "Excellent service! Prompt repair done on our broken spring. Very reasonably priced too, on a hot summer day over Christmas shutdown period no less.",
        date: "30/04/2025",
        avatar: "J",
        avatarBg: "#039BE5",
        verified: true,
      },
      {
        name: "Damian Robson",
        text: "Great service. Managed to fit me in on the same day I called. Friendly and professional service. Will definitely use again.",
        date: "12/06/2025",
        avatar: "D",
        avatarBg: "#C0CA33",
        verified: true,
      },
      {
        name: "Graham Behnke",
        text: "Professional friendly service. Wonderful and prompt work on my garage door motor.",
        date: "27/07/2025",
        avatar: "G",
        avatarBg: "#FF7043",
        verified: true,
      },
      {
        name: "Rob Whitbourne",
        text: "A really great professional, he was knowledgeable, proactive with a really great 'Can Do' attitude, turned up on time and also polite.",
        date: "08/05/2025",
        avatar: "R",
        avatarBg: "#7CB342",
        verified: true,
      },
    ],
  },
  howCanWeHelp: {
    heading: "WE HELP WITH",
    moreText: "More services",
    items: [
      {
        label: "Repairs",
        icon: "/images/icons/help-maintenance.png",
        href: "/repairs",
        featured: true,
      },
      {
        label: "New Garage Doors",
        icon: "/images/icons/help-installations.png",
        href: "/garage-doors",
        featured: true,
      },
      {
        label: "Automatic Gates",
        icon: "/images/icons/help-gates.svg",
        href: "/gates",
        featured: true,
      },
      {
        label: "Motors & Automation",
        icon: "/images/icons/help-openers.png",
        href: "/automation",
        featured: true,
      },
      {
        label: "Emergency Repairs",
        icon: "/images/icons/help-maintenance.png",
        href: "/emergency-repairs",
      },
      {
        label: "Garage Door Repairs",
        icon: "/images/icons/help-maintenance.png",
        href: "/garage-door-repairs",
      },
      {
        label: "Gate Repairs",
        icon: "/images/icons/help-gates.svg",
        href: "/gate-repairs",
      },
      {
        label: "Spring Replacement",
        icon: "/images/icons/help-springs.png",
        href: "/springs",
      },
      {
        label: "Cable Replacement",
        icon: "/images/icons/help-cables.png",
        href: "/cables",
      },
      {
        label: "Off-Track Doors",
        icon: "/images/icons/help-maintenance.png",
        href: "/garage-door-off-track",
      },
      {
        label: "Garage Door Servicing",
        icon: "/images/icons/help-maintenance.png",
        href: "/garage-door-servicing",
      },
      {
        label: "Safety Inspections",
        icon: "/images/icons/help-maintenance.png",
        href: "/garage-door-safety-inspection",
      },
      {
        label: "Sectional Doors",
        icon: "/images/icons/help-installations.png",
        href: "/sectional-garage-doors",
      },
      {
        label: "Roller Doors",
        icon: "/images/icons/help-installations.png",
        href: "/roller-doors",
      },
      {
        label: "Tilt Doors",
        icon: "/images/icons/help-installations.png",
        href: "/tilt-doors",
      },
      {
        label: "Sliding Gates",
        icon: "/images/icons/help-gates.svg",
        href: "/sliding-gates",
      },
      {
        label: "Swing Gates",
        icon: "/images/icons/help-gates.svg",
        href: "/swing-gates",
      },
      {
        label: "Telescopic Gates",
        icon: "/images/icons/help-gates.svg",
        href: "/gate-automation#telescopic",
      },
      {
        label: "Garage Door Openers",
        icon: "/images/icons/help-openers.png",
        href: "/openers",
      },
      {
        label: "Garage Door Motors",
        icon: "/images/icons/help-openers.png",
        href: "/garage-door-motor-replacement",
      },
      {
        label: "Gate Motors & Automation",
        icon: "/images/icons/help-gates.svg",
        href: "/gate-automation",
      },
      {
        label: "Gate Motor Replacement",
        icon: "/images/icons/help-gates.svg",
        href: "/gate-motor-replacement",
      },
      {
        label: "Smart Systems",
        icon: "/images/icons/help-smart-kits.png",
        href: "/smart-systems",
      },
    ],
  },
  meetTheTeam: {
    kicker: "About Sparrow",
    headingTop: "Your Local",
    headingBottom: "Sparrow Team",
    introStart: "At Sparrow Garage Doors, every job is run by one of our two managers. Between them they have over",
    introBold: "13 years of hands on garage door experience",
    introEnd: ", and they personally own every install, service and emergency callout we take on.",
    bannerText: "No call centres, no subcontractors,",
    bannerHighlight: "just the Sparrow team",
    paragraph2:
      "Our two managers lead the Sparrow team. They quote, install and service every door themselves, so you never get bounced around a call centre or handed off to a stranger.",
    paragraph3: "One team, one number, every job owned end to end.",
  },
  whyChooseUs: {
    heading: "WHY US?",
    qualityTitle: "Quality Services and Expert Technicians",
    qualityBody:
      "Locally made and serviced. Our expert technicians deliver quality on every repair and maintenance job.",
    qualityRatingLabel: "Rated Excellent",
    qualityImage: "/images/quality1.png",
    customTitle: "Custom Solution and Design",
    customBody:
      "Customisable to fit any home and budget. Choose from various styles and colours.",
    customImage: "/images/custom1.png",
    guaranteeTitle: "100% Guaranteed",
    guaranteeBody: "We put our utmost effort into ensuring your satisfaction.",
    guaranteeImage: "/images/guarantee.png",
    aroundClockTitle: "Around The Clock Access",
    aroundClockBody: "Available around the clock, weekends and public holidays.",
    aroundClockImage: "/images/247.png",
    localTitle: "Local {suburb} Experts",
    localBody:
      "Technicians who actually know the streets, the homes and the driveways around here. We're on call across your postcode every day of the week.",
    localImage: "/images/local-service.png",
    pricingTitle: "Simple Pricing",
    pricingBody: "Transparent, fair pricing. No hidden costs, just honest work.",
    pricingImage: "/images/simple-pricing.webp",
  },
  areasWeServe: {
    headingTop: "AREAS WE",
    headingHighlight: "SERVE",
    intro: "We cover {suburb} and the wider Brisbane area",
    rest: "Smart, safe and secure solutions for homes and businesses alike, with the peace of mind that comes from a local team.",
    backgroundImage: "/images/Jims-Hero-Image.webp",
  },
  workGallery: {
    headingHighlight: "OUR WORK",
    headingRest: "in Action",
    subtitle: "See the Quality Behind Every Project",
    backgroundImage: "/images/Jims-Hero-Image.webp",
    images: [
      {
        image: "/images/gallery/09-2.jpg",
        alt: "Aerial view of a completed garage door installation",
      },
      {
        image: "/images/gallery/07-4.jpg",
        alt: "Modern garage door fitted on a Brisbane home",
      },
      {
        image: "/images/gallery/08-1.jpg",
        alt: "Premium sectional garage door install",
      },
      { image: "/images/gallery/04-5.jpg", alt: "Custom garage door finish" },
      {
        image: "/images/gallery/05-4.jpg",
        alt: "Residential garage door upgrade",
      },
      {
        image: "/images/gallery/06-3.jpg",
        alt: "Garage door fitted to suit a contemporary facade",
      },
      {
        image: "/images/gallery/03-5.jpg",
        alt: "Stylish garage door replacement",
      },
      {
        image: "/images/gallery/02-5.jpg",
        alt: "Quality garage door installation",
      },
      {
        image: "/images/gallery/10-sams.jpg",
        alt: "Recent Sparrow garage door installation",
      },
    ],
  },
  locationMap: { query: "Brisbane, Queensland, Australia" },
  faq: {
    intro:
      "Answers to the questions we hear most often about choosing, installing, and looking after your garage door.",
    items: [
      {
        q: "What factors should I consider when choosing a garage door?",
        a: "When selecting a garage door, consider factors such as your budget, the available space, insulation needs, security features, and the style of your home. Each type of door offers unique benefits tailored to different preferences and requirements.",
      },
      {
        q: "How do I maintain my garage door?",
        a: "Regular maintenance includes a full door service once a year. We tighten every bolt and screw on the door, realign the rails to a level position, lubricate every moving part, and finally reset the pressure on the opener itself. Cleaning is not included.",
      },
      {
        q: "Are garage doors insulated?",
        a: "Roller doors cannot be insulated. Sectional doors can be ordered with insulation built in, which helps regulate indoor temperatures, reduce energy costs, and minimise noise.",
      },
      {
        q: "What is the cost of a garage door?",
        a: "Prices vary a lot depending on several factors. The type of door (roller, sectional or tilt) is one. Size is the biggest factor, the smaller the door the cheaper the price. Finally, customisations such as windows or special colours can add to the price.",
      },
      {
        q: "What to do if my garage door spring broke?",
        a: "First and foremost, pull on the manual release to take the load off the opener so it does not get damaged on the way. If auto-locking mechanisms are engaged, manually retract them and do not try to force the door open. Finally, give us a call. Changing a spring yourself can be tricky and dangerous.",
      },
      {
        q: "Can I pair my garage to my gate openers?",
        a: "Absolutely. Openers can be paired to the same remote using an external receiver, or by using the same brand for both.",
      },
      {
        q: "Can I customize the design of my garage door?",
        a: "Absolutely. At Sparrow Garage Doors, we offer a range of customisable options, including materials, colours, finishes, and additional features such as windows or decorative hardware.",
      },
      {
        q: "How long does it take to install a garage door?",
        a: "The installation time depends on the type of door and the complexity of the project. On average, professional installation can take anywhere from a few hours to a full day.",
      },
      {
        q: "What safety features do modern garage doors have?",
        a: "Modern garage doors come with advanced safety features, such as auto-reverse mechanisms, motion sensors, and manual release options, ensuring secure and reliable operation.",
      },
    ],
  },
  quoteModal: {
    kicker: "Free On-Site Measure",
    title: "Get a Quote Today",
    successTitle: "Thanks, we've got it!",
    successText:
      "We'll be in touch shortly to arrange your free on-site measure and prepare your quote.",
    submitLabel: "Get a Quote Today",
    sendingLabel: "Sending...",
    callPrompt: "Or call us direct on",
    messagePlaceholder: "Tell us about your job",
  },
  quoteForm: {
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone",
    addressPlaceholder: "Address (optional)",
    messagePlaceholder: "Your Message",
    successTitle: "Thanks, we've got it!",
    successText: "We'll be in touch shortly about your quote.",
  },
  contactForm: {
    firstNamePlaceholder: "First Name",
    lastNamePlaceholder: "Last Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone",
    addressPlaceholder: "Address (optional)",
    messagePlaceholder: "Message",
    submitLabel: "Submit",
    successTitle: "Message sent!",
    successText:
      "Thanks for reaching out. We'll be in touch within one business day.",
  },
  ctaBanner: {
    heading: "schedule your free on-site measure with sparrow today",
    text: "Discover the perfect door for your home and enjoy peace of mind with the experts in garage doors.",
    buttonLabel: "GET A QUOTE TODAY",
    suburbButtonLabel: "Book My {suburb} Quote",
    image:
      "https://www.steel-line.com.au/wp-content/uploads/2024/08/SteelLineGarageOnHome3.jpeg",
  },
  footer: {
    blurb:
      "{suburb}'s trusted experts in garage doors. Quality installation, reliable servicing, and friendly local advice for homes and businesses across South East Queensland.",
    servicesHeading: "Services",
    services: [
      { label: "Repairs", href: "/repairs" },
      { label: "Garage Doors", href: "/garage-doors" },
      { label: "Sliding Gates", href: "/sliding-gates" },
      { label: "Swing Gates", href: "/swing-gates" },
      { label: "Telescopic Gates", href: "/gate-automation#telescopic" },
      { label: "Automation", href: "/automation" },
    ],
    companyHeading: "Company",
    company: [
      { label: "About Sparrow", href: "/about" },
      { label: "Gallery / Our Work", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
    regionsHeading: "Service Areas",
    regionsIntro:
      "We service the Greater Brisbane area, with dedicated support across:",
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
    copyright: "© {year} All rights reserved.",
  },
  contactPage: {
    heroTitleHighlight: "Get In Touch",
    heroTitleRest: "With Us",
    heroText:
      "If you want reliable communication and high-quality trade services done by professionals, we're Your Go-to Guys!",
    heroImage: "/images/contact-bg.avif",
    formTitle: "Send Us A",
    formTitleHighlight: "Message",
    formText: "Fill in the form and we'll be in touch within one business day.",
    phoneCardTitle: "Phone",
    emailCardTitle: "Email",
    mobileCardTitle: "Mobile Service",
    mobileCardText: "We come to you across Greater Brisbane.",
  },
  thankYouPage: {
    heroTitleHighlight: "Thank You",
    heroTitleRest: "For Getting In Touch",
    heroText:
      "Your enquiry has landed with our team. We'll be in touch within one business day to sort out your garage door.",
    heroImage: "/images/contact-bg.avif",
    steps: [
      {
        title: "We read your enquiry",
        text: "One of our local team goes over the details you sent through, usually within a couple of hours.",
      },
      {
        title: "We give you a call",
        text: "We'll ring or email you back within one business day to confirm the job and answer any questions.",
      },
      {
        title: "We book you in",
        text: "We lock in a time that suits you and come to you anywhere across Greater Brisbane.",
      },
    ],
    callPrompt: "Need us sooner? Give us a call on",
    homeButtonLabel: "Back to home",
  },
};
