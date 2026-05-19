"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import QuoteButton from "./QuoteButton";

type GalleryImage = { src: string; alt: string };
type Slide = { hero: GalleryImage; topRight: GalleryImage; bottomRight: GalleryImage };

const slides: Slide[] = [
  {
    hero: {
      src: "/images/gallery/09-2.jpg",
      alt: "Aerial view of a completed garage door installation",
    },
    topRight: {
      src: "/images/gallery/07-4.jpg",
      alt: "Modern garage door fitted on a Brisbane home",
    },
    bottomRight: {
      src: "/images/gallery/08-1.jpg",
      alt: "Premium sectional garage door install",
    },
  },
  {
    hero: {
      src: "/images/gallery/04-5.jpg",
      alt: "Custom garage door finish",
    },
    topRight: {
      src: "/images/gallery/05-4.jpg",
      alt: "Residential garage door upgrade",
    },
    bottomRight: {
      src: "/images/gallery/06-3.jpg",
      alt: "Garage door fitted to suit a contemporary facade",
    },
  },
  {
    hero: {
      src: "/images/gallery/03-5.jpg",
      alt: "Stylish garage door replacement",
    },
    topRight: {
      src: "/images/gallery/02-5.jpg",
      alt: "Quality garage door installation",
    },
    bottomRight: {
      src: "/images/gallery/10-sams.jpg",
      alt: "Recent Sparrow garage door installation",
    },
  },
];

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 md:h-6 md:w-6"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

const AUTO_ADVANCE_MS = 6000;

export default function OurWorkInAction() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, total]);

  const goto = (next: number) => {
    setIndex(((next % total) + total) % total);
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <Image
        src="/images/Jims-Hero-Image.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
        priority={false}
      />
      {/* Dark navy overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-navy/90" />
      {/* Decorative yellow glows */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-brand-yellow">OUR WORK</span>{" "}
            <span className="text-white">in Action</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold uppercase tracking-[0.2em] text-white/80 md:text-base">
            See the Quality Behind Every Project
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-10 md:mt-14">
          {/* Slide track */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="grid w-full shrink-0 grid-cols-2 gap-3 sm:gap-4 md:gap-6"
                  aria-hidden={i !== index}
                >
                  {/* Big hero image on the left, fills full height on desktop */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10 md:aspect-auto md:h-full md:min-h-[460px]">
                    <Image
                      src={slide.hero.src}
                      alt={slide.hero.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Right column: 1 image on mobile, 2 stacked on desktop */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10 md:aspect-auto md:min-h-[220px]">
                      <Image
                        src={slide.topRight.src}
                        alt={slide.topRight.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative hidden aspect-auto w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10 md:block md:min-h-[220px]">
                      <Image
                        src={slide.bottomRight.src}
                        alt={slide.bottomRight.alt}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={() => goto(index - 1)}
            aria-label="Previous projects"
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-brand-yellow text-brand-navy shadow-lg ring-1 ring-black/10 transition hover:scale-105 hover:bg-brand-yellow/90 md:left-4 md:h-12 md:w-12"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goto(index + 1)}
            aria-label="Next projects"
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-brand-yellow text-brand-navy shadow-lg ring-1 ring-black/10 transition hover:scale-105 hover:bg-brand-yellow/90 md:right-4 md:h-12 md:w-12"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goto(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-brand-yellow"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <QuoteButton className="inline-flex items-center justify-center bg-white px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-brand-navy shadow-md transition hover:bg-white/90 md:text-base">
            Get a Free Quote
          </QuoteButton>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center bg-brand-yellow px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-brand-navy shadow-md transition hover:bg-brand-yellow/90 md:text-base"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
