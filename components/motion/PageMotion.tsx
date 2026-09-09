"use client";

import { useEffect } from "react";

/**
 * Triggers the cover's staircase reveal. The `.js` class is set statelessly
 * on <html> in the root layout (this is React — JS is always present), and
 * once the first paint has happened we add `.play`, which is what actually
 * fires the H1 line-by-line reveal and the lede/meta fade (see the
 * `.js.play` rules in globals.css). The double rAF mirrors the reference
 * script's `requestAnimationFrame` nesting so the transition always runs
 * off a committed first frame, never off the same frame as the initial
 * (hidden) paint.
 */
export default function PageMotion() {
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        document.documentElement.classList.add("play");
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, []);

  return null;
}
