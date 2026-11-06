"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The stages of a project, each sliding over the last. Earlier stages shrink and fade as they are covered. */
export default function CaseStack({ children }: { children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const layers = Array.from(stack.current?.querySelectorAll<HTMLElement>("figure") ?? []);
      const arrived = layers.map((layer) => {
        const box = layer.getBoundingClientRect();
        const top = parseFloat(getComputedStyle(layer).top) || 0;
        return Math.max(0, Math.min(1, 1 - (box.top - top) / Math.max(1, box.height)));
      });
      layers.forEach((layer, index) => {
        const covered = arrived.slice(index + 1).reduce((sum, value) => sum + value, 0);
        if (reduced) {
          layer.style.opacity = covered > 0.5 ? "0" : "";
          return;
        }
        layer.style.scale = covered ? String(1 - 0.045 * covered) : "";
        layer.style.opacity = covered ? String(Math.max(0, 1 - covered * 1.2).toFixed(3)) : "";
        const lag = 1 - arrived[index];
        layer.querySelectorAll<HTMLElement>("[data-stack-part]").forEach((part) => {
          part.style.translate = lag > 0.001 ? `0 ${(lag * (parseFloat(part.dataset.lag ?? "") || 0)).toFixed(2)}%` : "";
        });
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stack} className="stack">
      {children}
      <div aria-hidden="true" className="stack-end" />
    </div>
  );
}
