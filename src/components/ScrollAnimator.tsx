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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > footer"),
    );
    if (sections.length === 0) return;

    const viewportH = window.innerHeight;
    const sectionTargets = new Map<HTMLElement, HTMLElement[]>();

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const alreadyInView = rect.top < viewportH && rect.bottom > 0;
      if (alreadyInView) continue;

      const targets = pickRevealTargets(section);
      targets.forEach((el, i) => {
        const delay = Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
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

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
