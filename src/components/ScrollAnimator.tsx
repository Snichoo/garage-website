"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STAGGER_MS = 90;
const MAX_STAGGER_MS = 540;

function eligibleChildren(el: HTMLElement): HTMLElement[] {
  return Array.from(el.children).filter((c): c is HTMLElement => {
    if (!(c instanceof HTMLElement)) return false;
    const cs = window.getComputedStyle(c);
    if (cs.display === "none") return false;
    if (cs.position === "absolute" || cs.position === "fixed") return false;
    return true;
  });
}

// Walk past single-child wrappers (e.g. .mx-auto > .grid) so the stagger
// lands on the real content row instead of one giant block.
function pickRevealTargets(section: HTMLElement): HTMLElement[] {
  let root: HTMLElement = section;
  let kids = eligibleChildren(root);
  for (let depth = 0; depth < 3 && kids.length === 1; depth++) {
    root = kids[0];
    kids = eligibleChildren(root);
  }
  return kids.length > 0 ? kids : [section];
}

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    // Touch scrolling must never depend on an observer revealing large,
    // composited sections after the browser suspends and resumes a tab.
    const motion = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    if (!motion.matches || !("IntersectionObserver" in window)) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > footer"),
    );
    if (sections.length === 0) return;

    const viewportH = window.innerHeight;
    const sectionTargets = new Map<HTMLElement, HTMLElement[]>();
    const originalDelays = new Map<HTMLElement, string>();

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const alreadyInView = rect.top < viewportH && rect.bottom > 0;
      if (alreadyInView) continue;

      const targets = pickRevealTargets(section);
      targets.forEach((el, i) => {
        const delay = Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
        originalDelays.set(el, el.style.transitionDelay);
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add("scroll-reveal");
      });
      sectionTargets.set(section, targets);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          const targets = sectionTargets.get(section);
          if (targets) {
            for (const el of targets) el.classList.add("scroll-reveal-visible");
          }
          observer.unobserve(section);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    for (const section of sectionTargets.keys()) observer.observe(section);

    // Fail open after an interruption or preference change. In particular,
    // disconnecting an observer must not strand its targets at opacity: 0.
    const finish = () => {
      observer.disconnect();
      for (const [el, delay] of originalDelays) {
        el.classList.remove("scroll-reveal", "scroll-reveal-visible");
        el.style.transitionDelay = delay;
      }
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") finish();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) finish();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    motion.addEventListener("change", finish);

    return () => {
      finish();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      motion.removeEventListener("change", finish);
    };
  }, [pathname]);

  return null;
}
