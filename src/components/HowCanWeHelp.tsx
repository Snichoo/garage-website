"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/components/ContentProvider";
import { defaultContent, type HelpItem } from "@/content/defaults";

const gridClasses =
  "mx-auto grid max-w-[1000px] grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6";

const SERVICE_SPRITE = "/images/icons/help-services-sprite-v2.webp";
const SERVICE_SPRITE_GRID_SIZE = 5;

type SpritePosition = readonly [xPercent: number, yPercent: number];

// Exact crop positions compensate for the source sheet's uneven outer margins,
// keeping every glyph optically centred in the circular service card.
const serviceSpritePositions: Record<string, SpritePosition> = {
  "/repairs": [4, 5.49],
  "/garage-doors": [27.37, 4.89],
  "/gates": [51.5, 4.84],
  "/automation": [73.77, 4.94],
  "/emergency-repairs": [3.5, 26.62],
  "/garage-door-repairs": [27.57, 27.17],
  "/gate-repairs": [51.89, 27.82],
  "/springs": [74.77, 26.57],
  "/cables": [96.95, 26.67],
  "/garage-door-off-track": [3.45, 49.5],
  "/garage-door-servicing": [50.15, 48.85],
  "/garage-door-safety-inspection": [73.28, 48.36],
  "/sectional-garage-doors": [2.45, 71.98],
  "/roller-doors": [25.93, 71.83],
  "/tilt-doors": [49.6, 71.98],
  "/sliding-gates": [74.17, 72.33],
  "/swing-gates": [96.3, 72.08],
  "/gate-automation#telescopic": [26.72, 95.45],
  "/openers": [49.7, 95.31],
  "/garage-door-motor-replacement": [72.48, 95.95],
  "/gate-automation": [2.85, 94.96],
  "/gate-motor-replacement": [96.3, 6.19],
  "/smart-systems": [96.2, 95.11],
};

function sameService(a: HelpItem, b: HelpItem) {
  return (
    a.href.trim().toLowerCase() === b.href.trim().toLowerCase() ||
    a.label.trim().toLowerCase() === b.label.trim().toLowerCase()
  );
}

function getSpritePosition(item: HelpItem) {
  const matchingDefault = defaultContent.howCanWeHelp.items.find((candidate) =>
    sameService(candidate, item),
  );

  if (!matchingDefault || matchingDefault.icon !== item.icon) {
    return null;
  }

  return serviceSpritePositions[matchingDefault.href] ?? null;
}

/**
 * Older CMS saves contain only the original four cards. Merge their editable
 * copy with the complete default list so the new links also reach existing
 * installations without replacing customised labels or icons.
 */
function completeServiceList(configured: HelpItem[]) {
  const defaults = defaultContent.howCanWeHelp.items;
  const mergedConfigured = configured.map((item) => {
    const fallback = defaults.find((candidate) => sameService(candidate, item));
    return fallback ? { ...fallback, ...item } : item;
  });

  return [
    ...mergedConfigured,
    ...defaults.filter(
      (candidate) =>
        !mergedConfigured.some((item) => sameService(candidate, item)),
    ),
  ];
}

function ServiceCard(item: HelpItem) {
  const { label, icon, href } = item;
  const spritePosition = getSpritePosition(item);

  return (
    <li className="flex">
      <Link
        href={href}
        className="group flex w-full flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:bg-brand-yellow group-hover:shadow-lg md:h-28 md:w-28">
          {spritePosition ? (
            <span
              aria-hidden="true"
              className="h-20 w-20 bg-no-repeat md:h-24 md:w-24"
              style={{
                backgroundImage: `url(${SERVICE_SPRITE})`,
                backgroundPosition: `${spritePosition[0]}% ${spritePosition[1]}%`,
                backgroundSize: `${SERVICE_SPRITE_GRID_SIZE * 100}% ${SERVICE_SPRITE_GRID_SIZE * 100}%`,
              }}
            />
          ) : (
            <Image
              src={icon}
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 object-contain md:h-14 md:w-14"
            />
          )}
        </div>
        <span className="mt-4 font-display text-xs font-extrabold uppercase tracking-wider text-brand-navy md:text-sm">
          {label}
        </span>
      </Link>
    </li>
  );
}

export default function HowCanWeHelp() {
  const { howCanWeHelp } = useSiteContent();
  const [expanded, setExpanded] = useState(false);
  const additionalServicesId = useId();
  const items = completeServiceList(howCanWeHelp.items);
  const featured = items.filter((item) => item.featured);
  const primaryItems = featured.length > 0 ? featured : items.slice(0, 4);
  const additionalItems = items.filter((item) => !primaryItems.includes(item));

  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-16"
      aria-labelledby="we-help-with-heading"
    >
      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Stencil heading - matches Services / Why Us */}
        <div className="relative mb-4 h-[60px] md:mb-6 md:h-[124px]">
          <span
            aria-hidden="true"
            className="outlined-text absolute left-0 top-0 select-none font-display text-[44px] font-extrabold leading-none tracking-tight md:text-[96px]"
          >
            {howCanWeHelp.heading}
          </span>
          <h2
            id="we-help-with-heading"
            className="absolute bottom-0 left-3 font-display text-[40px] font-extrabold leading-none tracking-tight text-brand-navy md:left-6 md:text-[84px]"
          >
            {howCanWeHelp.heading}
          </h2>
        </div>

        <ul className={`${gridClasses} mt-10 md:mt-14`}>
          {primaryItems.map((item) => (
            <ServiceCard key={`${item.label}-${item.href}`} {...item} />
          ))}
        </ul>

        {additionalItems.length > 0 && (
          <>
            <ul
              id={additionalServicesId}
              aria-hidden={!expanded}
              className={expanded ? `${gridClasses} mt-10` : "hidden"}
            >
              {additionalItems.map((item) => (
                <ServiceCard key={`${item.label}-${item.href}`} {...item} />
              ))}
            </ul>

            <div className="mt-12 flex justify-center md:mt-16">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                aria-controls={additionalServicesId}
                aria-label={
                  expanded ? "Show fewer services" : "Show all services"
                }
                className="group relative inline-flex min-h-11 items-center gap-2 px-4 py-2 font-display text-lg font-bold italic text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4 md:text-xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-2 h-[6px] bg-brand-yellow/70 transition group-hover:bg-brand-yellow"
                />
                <span className="relative z-10">
                  {expanded ? "Show less" : howCanWeHelp.moreText}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`relative z-10 h-4 w-4 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
