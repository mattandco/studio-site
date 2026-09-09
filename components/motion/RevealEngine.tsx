"use client";

import { useEffect } from "react";

/**
 * The single scroll-reveal engine for the page. Mounted once, after all
 * page content. Finds every `.rv` element and, on first intersection, adds
 * `.in` (see the `.js .rv` / `.js .rv.in` rules in globals.css) with a
 * small stagger per intersecting batch — ported from the reference
 * proposal's IntersectionObserver script.
 *
 * Respects prefers-reduced-motion and the no-IntersectionObserver case by
 * revealing everything immediately with no transition.
 */
export default function RevealEngine() {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rvs = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    if (!("IntersectionObserver" in window) || reduced) {
      rvs.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        let batch = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.transitionDelay = `${Math.min(batch * 70, 350)}ms`;
            target.classList.add("in");
            io.unobserve(target);
            batch++;
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    rvs.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
