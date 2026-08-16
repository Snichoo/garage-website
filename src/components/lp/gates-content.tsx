import type { ComponentType, SVGProps } from "react";
import {
  GateIcon,
  MeasureIcon,
  NoCallOutIcon,
  RatedIcon,
  SpannerIcon,
} from "./icons";
import { regions, suburbs } from "@/data/suburbs";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/* ---------------------------------------------------------------------------
   Shared copy for the public /gates page and the /lp/gates Google Ads route
   lives here, so both URLs stay visually and editorially in sync.
--------------------------------------------------------------------------- */

/** Trust row pinned to the bottom of the hero. */
export const heroBadges: { top: string; bottom: string; icon: Icon }[] = [
  { top: "$0", bottom: "Call Out Fee", icon: NoCallOutIcon },
  { top: "20+ Years", bottom: "On The Tools", icon: SpannerIcon },
  { top: "Free", bottom: "On-Site Measure", icon: MeasureIcon },
  { top: "Gate + Motor", bottom: "One Team", icon: GateIcon },
  { top: "5.0 Star", bottom: "Google Rated", icon: RatedIcon },
];

/** The three-step "how the job runs" section. */
export const steps = [
  {
    step: "STEP 1",
    icon: "/images/lp/icons/step-measure.png",
    title: "Free On-Site Measure",
    body: "We come out to the driveway, measure the opening, check the fall across it and the run-off space beside it, and work out what will actually fit. No guessing at a price over the phone and no call-out fee for looking.",
  },
  {
    step: "STEP 2",
    icon: "/images/lp/icons/step-quote.png",
    title: "One Fixed Written Quote",
    body: "Gate, posts, motor, remotes, safety beams and the power run all priced in one quote before anything starts. You are not signing off on a gate and then getting an electrician's invoice a fortnight later.",
  },
  {
    step: "STEP 3",
    icon: "/images/lp/icons/step-install.png",
    title: "Installed, Tested, Handed Over",
    body: "We install the gate, fit and program the automation, test the safety beams and auto-reverse, then walk you through the remotes, the keypad and the manual release before we leave.",
  },
];

/** Service cards. */
export const services: {
  title: string;
  body: string;
  icon: string;
}[] = [
  {
    title: "Sliding Gates",
    body: "A single leaf that runs along the fence line. The Brisbane workhorse when the driveway is short, sloped, or too tight for a gate to swing.",
    icon: "/images/lp/icons/svc-sliding.png",
  },
  {
    title: "Swing & Double Gates",
    body: "One or two leaves hinged at the posts for a wide, symmetrical entrance, with no ground track collecting leaves and grit.",
    icon: "/images/lp/icons/svc-swing.png",
  },
  {
    title: "Telescopic Gates",
    body: "Two or more overlapping panels that nest as they slide, opening a wide driveway in roughly half the run-off space a standard slider needs.",
    icon: "/images/lp/icons/svc-telescopic.png",
  },
  {
    title: "Gate Motors & Automation",
    body: "Motors fitted to a gate we have built or the one already at your driveway, with remotes, keypads, intercoms and smart phone control.",
    icon: "/images/lp/icons/svc-automation.png",
  },
  {
    title: "Safety Beams & Testing",
    body: "Photo-electric beams and auto-reverse fitted and tested on every automated gate, so it stops for a child, a pet or a car in the way.",
    icon: "/images/lp/icons/svc-safety.png",
  },
  {
    title: "Gate Repairs & Servicing",
    body: "Dragging, juddering, off its track or ignoring the remote. We repair the gate and the automation on any brand, including gear we did not install.",
    icon: "/images/lp/icons/svc-repairs.png",
  },
];

export const chooseUs: { title: string; body: string; icon: string }[] = [
  {
    title: "One Team, One Quote",
    body: "The gate, the motor, the power and the safety gear in a single fixed quote, from one team you can still call afterwards.",
    icon: "/images/lp/icons/us-quote.png",
  },
  {
    title: "Free On-Site Measure",
    body: "We measure the opening, the slope and the run-off in person before pricing anything, so the number we give you holds.",
    icon: "/images/lp/icons/us-measure.png",
  },
  {
    title: "$0 Call Out",
    body: "No fee to come out, look at the driveway, quote the job or diagnose a gate that has stopped working.",
    icon: "/images/lp/icons/us-callout.png",
  },
  {
    title: "Safety Fitted as Standard",
    body: "Photo-electric beams and auto-reverse go on every automated gate we install and get tested on the day, not sold to you as an upgrade.",
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
    title: "Three Trades to Chase",
    body: "A fabricator builds it, a sparky wires it, someone else programs it, and you are the one coordinating all three.",
    icon: "/images/lp/icons/them-trades.png",
  },
  {
    title: "Priced Over the Phone",
    body: "A number quoted sight unseen, then revised upward once somebody finally looks at the slope and the run-off.",
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
    body: "The handover is done, a warranty question comes up six months later, and the phone rings out.",
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
    q: "How much does an automatic gate cost in Brisbane?",
    a: "It depends on the width of the opening, the material and style of the gate, how much fall there is across the driveway and how far the power has to run to reach the motor. Those things move the price more than anything else, which is why we measure on site and give you one fixed written quote instead of a guess over the phone. The measure and the quote are free, and there is no call-out fee.",
  },
  {
    q: "Can you automate the gate I already have?",
    a: "Usually, yes, and it is the cheaper path when the gate itself is sound. We check the frame, the hinges or the track, the posts and the weight of the leaf, then match a motor rated for it. If the gate is dragging or the posts have moved, we will tell you what needs fixing first rather than bolting a motor onto a problem.",
  },
  {
    q: "Should I choose a sliding gate or a swing gate?",
    a: "It comes down to space. Sliding gates need clear run-off along the fence line but handle sloped and short driveways well, which is why they suit so many Brisbane blocks. Swing gates need level ground and room for the leaves to travel, and leave no track on the ground to keep clear. Telescopic gates are the answer when you want a wide opening without the run-off. We will look at all three at the measure and tell you which actually fits.",
  },
  {
    q: "How long does a new gate installation take?",
    a: "After the measure, a new gate is typically fabricated over a few weeks depending on the design and the finish you choose. The install itself is normally one to two days on site, including running the power, fitting the motor and programming the remotes. Automating a gate that is already there is often a single visit.",
  },
  {
    q: "Do I need to organise an electrician as well?",
    a: "No. Getting power to the gate motor is part of the job we quote and part of the job we do, so you are not left coordinating another trade or waiting on someone else's schedule. Solar is also an option where running a cable would mean digging up the driveway.",
  },
  {
    q: "What happens to the gate in a blackout?",
    a: "Every automated gate we install has a manual release, so you can push it open by hand and get the car out during an outage. If you would rather the gate keep working normally, we can fit battery backup that will run a set number of cycles until the power returns.",
  },
  {
    q: "Are automatic gates safe around kids and pets?",
    a: "They are when the safety gear is fitted and set up properly. We install photo-electric safety beams and set the auto-reverse on every automated gate, then test both before handover so the gate stops and backs off if anything crosses its path.",
  },
  {
    q: "Do you repair gates you did not install?",
    a: "Yes. We repair gates and automation on every major brand, whoever installed them. Tracks, rollers, hinges, posts and frames on the gate side, motors, control boards, remotes and sensors on the automation side, plus realignment and safety testing after the fix.",
  },
];
