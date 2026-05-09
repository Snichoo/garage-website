"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > footer"),
    );
    if (targets.length === 0) return;

    const viewportH = window.innerHeight;
    const hidden: HTMLElement[] = [];

    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      const alreadyInView = rect.top < viewportH && rect.bottom > 0;
      if (!alreadyInView) {
        el.classList.add("scroll-reveal");
        hidden.push(el);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of hidden) observer.observe(el);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
