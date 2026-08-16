"use client";

import { useId, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  aspect: string;
};

type Props = {
  title: string;
  description?: string;
  images: GalleryImage[];
  gridCols: string;
  initialVisible?: number;
};

export default function SeriesGallery({
  title,
  description,
  images,
  gridCols,
  initialVisible,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const galleryId = useId();
  const visibleCount = initialVisible
    ? Math.max(1, Math.min(initialVisible, images.length))
    : images.length;
  const hasMore = images.length > visibleCount;
  const visibleImages = expanded ? images : images.slice(0, visibleCount);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            {description}
          </p>
        )}
        <div
          id={galleryId}
          className={`mt-8 grid gap-4 md:gap-5 ${gridCols}`}
        >
          {visibleImages.map((img) => (
            <div
              key={img.src}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: img.aspect }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls={galleryId}
              className="inline-flex items-center gap-2 bg-brand-navy px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-brand-yellow shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4 md:text-base"
            >
              {expanded
                ? "Show fewer colours"
                : `Show all ${images.length} colours`}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
