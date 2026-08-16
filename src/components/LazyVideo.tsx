"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Keeps decorative videos off the network until they are close to view, then
 * pauses them again when they leave the viewport to reduce mobile decoding.
 */
export default function LazyVideo({ src, className, style }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (video.src) void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      style={style}
      className={className}
    />
  );
}
