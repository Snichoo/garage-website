import type { ComponentType, SVGProps } from "react";
import {
  ClockIcon,
  GateIcon,
  InsuredIcon,
  RatedIcon,
  SpannerIcon,
} from "./icons";
import { regions, suburbs } from "@/data/suburbs";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/* ---------------------------------------------------------------------------
   Shared copy for the public /gates page and the /lp/gates Google Ads route
   lives here, so both URLs stay visually and editorially in sync.

   Sparrow stopped supplying and installing new gates in Nov 2026. This copy
   covers repairs, servicing and automation of existing gates only, so keep
   new gate offers (supply, fabrication, install) out of it.
--------------------------------------------------------------------------- */

/** Trust row pinned to the bottom of the hero. */
export const heroBadges: { top: string; bottom: string; icon: Icon }[] = [
  { top: "Same Day", bottom: "Service", icon: ClockIcon },
  { top: "20+ Years", bottom: "On The Tools", icon: SpannerIcon },
  { top: "Fully", bottom: "Insured", icon: InsuredIcon },
  { top: "Gate + Motor", bottom: "One Team", icon: GateIcon },
  { top: "5.0 Star", bottom: "Google Rated", icon: RatedIcon },
];

/** The three-step "how the job runs" section. */
export const steps = [
  {
    step: "STEP 1",
    icon: "/images/lp/icons/step-measure.png",
    title: "We Come Out and Diagnose",
    body: "We come out to the driveway and check the gate, the track or hinges, the motor and the safety gear to find what is actually wrong. No guessing at a price over the phone and no call-out fee for looking.",
  },
  {
    step: "STEP 2",
    icon: "/images/lp/icons/step-quote.png",
    title: "One Fixed Written Quote",
    body: "Parts, labour, motor, remotes and safety beams all priced in one quote before anything starts. You are not paying for a gate repair and then getting a separate invoice for the motor a fortnight later.",
  },
  {
    step: "STEP 3",
    icon: "/images/lp/icons/step-install.png",
    title: "Fixed, Tested, Handed Back",
    body: "We repair the gate or fit and program the automation, test the safety beams and auto-reverse, then walk you through the remotes, the keypad and the manual release before we leave.",
  },
];

/** Service cards. */
export const services: {
  title: string;
  body: string;
  icon: string;
}[] = [
  {
    title: "Sliding Gate Repairs",
    body: "Dragging wheels, worn rollers, a bent or grit-filled track, or a gate jumping its guides. We get sliders running smoothly along the fence line again.",
    icon: "/images/lp/icons/svc-sliding.png",
  },
  {
    title: "Swing & Double Gate Repairs",
    body: "Sagging leaves, worn hinges, posts that have moved and gates that no longer meet in the middle, realigned so they open and close square.",
    icon: "/images/lp/icons/svc-swing.png",
  },
  {
    title: "Telescopic Gate Repairs",
    body: "Overlapping panels that bind, jam or fall out of step. We service the tracks, rollers and drive so every panel nests and opens together.",
    icon: "/images/lp/icons/svc-telescopic.png",
  },
  {
    title: "Gate Motors & Automation",
    body: "Motors fitted to the gate already at your driveway, with remotes, keypads, intercoms and smart phone control.",
    icon: "/images/lp/icons/svc-automation.png",
  },
  {
    title: "Safety Beams & Testing",
    body: "Photo-electric beams and auto-reverse fitted and tested on every automated gate, so it stops for a child, a pet or a car in the way.",
    icon: "/images/lp/icons/svc-safety.png",
  },
  {
    title: "Servicing & Motor Repairs",
    body: "Juddering, stalling or ignoring the remote. We service the gate and repair the motor, board and remotes on any brand, including gear we did not install.",
    icon: "/images/lp/icons/svc-repairs.png",
  },
];

export const chooseUs: { title: string; body: string; icon: string }[] = [
  {
    title: "One Team, One Quote",
    body: "The gate repair, the motor, the power and the safety gear in a single fixed quote, from one team you can still call afterwards.",
    icon: "/images/lp/icons/us-quote.png",
  },
  {
    title: "Checked On Site",
    body: "We look at the gate, the track or hinges and the motor in person before pricing anything, so the number we give you holds.",
    icon: "/images/lp/icons/us-measure.png",
  },
  {
    title: "$0 Call Out",
    body: "No fee to come out, look at the driveway or diagnose a gate that has stopped working.",
    icon: "/images/lp/icons/us-callout.png",
  },
  {
    title: "Safety Fitted as Standard",
    body: "Photo-electric beams and auto-reverse go on every gate we automate and get tested on the day, not sold to you as an upgrade.",
    icon: "/images/lp/icons/us-safety.png",
  },
  {
    title: "Any Brand, Any Age",
    body: "We service and repair the gate and the motor on every major brand, including systems another company installed years ago.",
    icon: "/images/lp/icons/us-anybrand.png",
  },
  {
    title: "20+ Years on Brisbane Driveways",
    body: "Local technicians who know the slopes, the storms and the way these gates actually fail out here.",
    icon: "/images/lp/icons/us-experience.png",
  },
];

export const chooseThem: { title: string; body: string; icon: string }[] = [
  {
    title: "Two Trades to Chase",
    body: "One company looks at the gate, another looks at the motor, each blames the other, and you are the one coordinating both.",
    icon: "/images/lp/icons/them-trades.png",
  },
  {
    title: "Priced Over the Phone",
    body: "A number quoted sight unseen, then revised upward once somebody finally looks at the gate.",
    icon: "/images/lp/icons/them-phone.png",
  },
  {
    title: "Call-Out Fees",
    body: "Charged before anyone has told you what is wrong with the gate or what it will cost to put right.",
    icon: "/images/lp/icons/them-fees.png",
  },
  {
    title: "Safety as an Optional Extra",
    body: "Beams and auto-reverse quoted as an add-on, or quietly left off to keep the headline price down.",
    icon: "/images/lp/icons/them-safety.png",
  },
  {
    title: "Only Their Own Brand",
    body: "Sorry, we do not touch that motor. Now you are ringing around looking for somebody who does.",
    icon: "/images/lp/icons/them-brand.png",
  },
  {
    title: "Nobody to Call After",
    body: "The job is done, a warranty question comes up six months later, and the phone rings out.",
    icon: "/images/lp/icons/them-nocall.png",
  },
];

/** Suburb lists for the service-area cards, built from the site's suburb data. */
export const serviceAreas = regions.map((region) => ({
  region: region.name,
  suburbs: suburbs.filter((s) => s.region === region.slug).map((s) => s.name),
}));

/**
 * Real Google reviews, copied verbatim from the site content store
 * (src/content/defaults.ts). Gate and motor jobs first, since that is what the
 * campaign traffic is here for.
 */
export const testimonials = [
  {
    quote:
      "My front gate stopped working. Elisha from Sparrow Garage Doors was excellent!! Elisha was able to get a new motor and replace it that same day for a much better price than other people I had quote the job. Could not recommend enough!!",
    name: "Giuseppe Scuderi",
    initial: "G",
    avatarBg: "#F4511E",
  },
  {
    quote:
      "I was very happy with their service, was on the phone with one of their team on Sunday evening on how to program my key garage remote and I was guided through successfully. Clear communication, simple instructions from start to end, amazing team, would definitely recommend to everybody. Thank you.",
    name: "Brenda Jelagat",
    initial: "B",
    avatarBg: "#7B1FA2",
  },
  {
    quote:
      "Had the opening motors replaced. Very happy with the price, options and communication. Nicest bloke and very knowledgeable.",
    name: "Paul Ansell",
    initial: "P",
    avatarBg: "#1E88E5",
  },
];

export const faqs = [
  {
    q: "How much does a gate repair cost in Brisbane?",
    a: "It depends on what has failed. A worn roller, a dropped hinge or a realignment costs far less than a new motor or control board, which is why we look at the gate on site and give you one fixed written quote before any work starts, instead of a guess over the phone. There is no call-out fee.",
  },
  {
    q: "Can you automate the gate I already have?",
    a: "Usually, yes, and it is the cheaper path when the gate itself is sound. We check the frame, the hinges or the track, the posts and the weight of the leaf, then match a motor rated for it. If the gate is dragging or the posts have moved, we will tell you what needs fixing first rather than bolting a motor onto a problem.",
  },
  {
    q: "Should I repair my gate motor or replace it?",
    a: "If the motor is in reasonable shape and the fault is a part such as a capacitor, a limit switch, a remote or the control board, a repair usually makes sense. If it is old, underpowered for the gate or failing again and again, a replacement matched to the weight and span of the gate is the better spend. We will tell you which, honestly, before anything is done.",
  },
  {
    q: "How long does a gate repair take?",
    a: "Most gate repairs are done in a single visit, because the common rollers, wheels, remotes and parts travel on the van. If a particular motor or board has to be ordered in, we tell you how long it will take and come back to finish the job as soon as it arrives. Automating a gate that is already there is often a single visit too.",
  },
  {
    q: "Do I need to organise an electrician as well?",
    a: "No. Getting power to the gate motor is part of the job we quote and part of the job we do, so you are not left coordinating another trade or waiting on someone else's schedule. Solar is also an option where running a cable would mean digging up the driveway.",
  },
  {
    q: "What happens to the gate in a blackout?",
    a: "Every automated gate should have a manual release, so you can push it open by hand and get the car out during an outage, and we check yours works when we are out. If you would rather the gate keep working normally, we can fit battery backup that will run a set number of cycles until the power returns.",
  },
  {
    q: "Are automatic gates safe around kids and pets?",
    a: "They are when the safety gear is fitted and set up properly. We fit photo-electric safety beams and set the auto-reverse on every gate we automate, and test both after every repair, so the gate stops and backs off if anything crosses its path.",
  },
  {
    q: "Do you repair gates you did not install?",
    a: "Yes. We repair gates and automation on every major brand, whoever installed them. Tracks, rollers, hinges, posts and frames on the gate side, motors, control boards, remotes and sensors on the automation side, plus realignment and safety testing after the fix.",
  },
];
