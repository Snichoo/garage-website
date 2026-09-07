"use client";

import { useEffect, useId, useRef, useState } from "react";

type InteractiveMapProps = {
  search: string;
  embedSrc: string;
};

export default function InteractiveMap({ search, embedSrc }: InteractiveMapProps) {
  const [interactive, setInteractive] = useState(false);
  const mapId = useId();
  const mapRef = useRef<HTMLIFrameElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Removing an iframe from the tab order does not release existing focus.
    if (!interactive && document.activeElement === mapRef.current) {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [interactive]);

  useEffect(() => {
    const stopInteracting = () => setInteractive(false);
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stopInteracting();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) stopInteracting();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") stopInteracting();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", stopInteracting);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", stopInteracting);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <section className="relative w-full">
      {/* A cross-origin map consumes mobile swipes, so only enable it on request. */}
      <iframe
        ref={mapRef}
        id={mapId}
        title={`Map showing ${search}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={interactive ? 0 : -1}
        aria-hidden={!interactive}
        style={{ pointerEvents: interactive ? "auto" : "none" }}
        className="block h-[360px] w-full border-0 md:h-[480px]"
      />
      <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
        <button
          ref={toggleRef}
          type="button"
          aria-controls={mapId}
          aria-pressed={interactive}
          onClick={() => setInteractive((current) => !current)}
          className="min-h-11 rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          {interactive ? "Done" : "Interact with map"}
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(search)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}
