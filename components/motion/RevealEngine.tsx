"use client";

import { useEffect } from "react";
import { useMotion } from "./MotionProvider";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type PendingEntry = {
  el: HTMLElement;
  fire: (target: HTMLElement) => void;
};

/**
 * The single reveal engine for the page. Mounted once. Scans the whole
 * document for [data-type], [data-sweep], [data-rule] and [data-pulse]
 * hosts and wires up the typed-reveal / print-sweep / carriage-draw /
 * pulse behaviour described in the design spec's Motion section.
 *
 * This intentionally mirrors the design reference's plain-DOM approach:
 * these hosts are server-rendered with their full text already present
 * (for no-JS / reduced-motion / SEO), and this effect takes over their
 * DOM directly once fonts are ready. React never re-renders these nodes
 * afterwards, so direct DOM manipulation here is safe.
 */
export default function RevealEngine() {
  const { reduceMotion, strike } = useMotion();

  useEffect(() => {
    if (typeof document === "undefined") return;

    let cancelled = false;
    const timers: number[] = [];
    const observers: IntersectionObserver[] = [];
    const pending: PendingEntry[] = [];
    let sweepScan: (() => void) | null = null;

    const cleanupScan = () => {
      if (sweepScan) {
        window.removeEventListener("scroll", sweepScan);
        window.removeEventListener("resize", sweepScan);
        sweepScan = null;
      }
    };

    const observe = (el: HTMLElement, onEnter: (target: HTMLElement) => void) => {
      const fire = (target: HTMLElement) => {
        if (target.dataset.mbFired) return;
        target.dataset.mbFired = "1";
        onEnter(target);
      };
      pending.push({ el, fire });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
              fire(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
      );
      io.observe(el);
      observers.push(io);

      if (!sweepScan) {
        sweepScan = () => {
          pending.forEach((p) => {
            if (p.el.dataset.mbFired) return;
            if (p.el.getBoundingClientRect().top < window.innerHeight) p.fire(p.el);
          });
        };
        window.addEventListener("scroll", sweepScan, { passive: true });
        window.addEventListener("resize", sweepScan, { passive: true });
        timers.push(window.setTimeout(sweepScan, 5000));
      }
    };

    const prep = (host: HTMLElement) => {
      const text = (host.textContent || "").replace(/\s+/g, " ").trim();
      host.textContent = "";
      const cs = getComputedStyle(host);
      if (cs.position === "static") host.style.position = "relative";
      // Expose the full text to assistive tech via aria-label on the host;
      // both the sizing ghost and the animating live span are hidden from
      // the accessibility tree so nothing reads mid-type fragments.
      host.setAttribute("aria-label", text);
      const ghost = document.createElement("span");
      ghost.setAttribute("aria-hidden", "true");
      ghost.style.visibility = "hidden";
      ghost.textContent = text;
      const live = document.createElement("span");
      live.setAttribute("aria-hidden", "true");
      live.style.position = "absolute";
      live.style.left = "0";
      live.style.top = "0";
      live.style.right = "0";
      host.appendChild(ghost);
      host.appendChild(live);
      return { text, live };
    };

    const caretFor = (color?: string) => {
      const c = document.createElement("span");
      c.style.display = "inline-block";
      c.style.width = "0.06em";
      c.style.height = "0.72em";
      c.style.marginLeft = "0.07em";
      c.style.background = color || "var(--accent)";
      c.style.animation = "mbCaret 1.15s steps(1,end) infinite";
      return c;
    };

    const setupTyped = () => {
      document.querySelectorAll<HTMLElement>("[data-type]").forEach((host) => {
        if (reduceMotion) return;
        const speed = parseInt(host.dataset.typeSpeed || "16", 10);
        const delay = parseInt(host.dataset.typeDelay || "0", 10);
        const caretColor = host.dataset.typeCaret;
        const p = prep(host);
        const caret = caretFor(caretColor);
        observe(host, () => {
          p.live.appendChild(caret);
          let i = 0;
          const step = () => {
            i += 1;
            const ch = p.text[i - 1];
            caret.remove();
            p.live.textContent = p.text.slice(0, i);
            p.live.appendChild(caret);
            strike(ch === " " ? "space" : "key");
            if (i >= p.text.length) {
              timers.push(window.setTimeout(() => caret.remove(), 1400));
              return;
            }
            let d = speed + Math.random() * speed * 0.7;
            if (ch === "." || ch === ",") d += speed * 5;
            timers.push(window.setTimeout(step, d));
          };
          timers.push(window.setTimeout(step, delay));
        });
      });
    };

    const setupSweep = () => {
      document.querySelectorAll<HTMLElement>("[data-sweep]").forEach((el) => {
        if (reduceMotion) return;
        const delay = parseInt(el.dataset.sweepDelay || "0", 10);
        el.style.clipPath = "inset(0 100% 0 0)";
        el.style.transition = `clip-path 1150ms ${EASE} ${delay}ms`;
        observe(el, (t) => {
          t.style.clipPath = "inset(0 0 0 0)";
        });
      });
    };

    const setupRules = () => {
      document.querySelectorAll<HTMLElement>("[data-rule]").forEach((el) => {
        if (reduceMotion) return;
        const delay = parseInt(el.dataset.revealDelay || "0", 10);
        el.style.transformOrigin = "left center";
        el.style.transform = "scaleX(0)";
        el.style.transition = `transform 1450ms ${EASE} ${delay}ms`;
        observe(el, (t) => {
          t.style.transform = "scaleX(1)";
        });
      });
    };

    const setupPulse = () => {
      const dot = document.querySelector<HTMLElement>("[data-pulse]");
      if (!dot || reduceMotion) return;
      dot.style.transition = `opacity 1400ms ${EASE}, transform 1400ms ${EASE}`;
      let on = true;
      const tick = () => {
        if (cancelled) return;
        on = !on;
        dot.style.opacity = on ? "1" : "0.26";
        dot.style.transform = on ? "scale(1)" : "scale(0.7)";
        timers.push(window.setTimeout(tick, 1500));
      };
      timers.push(window.setTimeout(tick, 900));
    };

    setupTyped();
    setupSweep();
    setupRules();
    setupPulse();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      observers.forEach((o) => o.disconnect());
      cleanupScan();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return null;
}
