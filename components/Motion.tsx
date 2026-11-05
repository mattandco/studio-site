"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HERO_LANGUAGES, logoColours } from "@/lib/hero";
import { startPaper } from "@/lib/paper";

const EO = "cubic-bezier(.16,1,.3,1)";
const EW = "cubic-bezier(.77,0,.18,1)";
const EIO = "cubic-bezier(.76,0,.24,1)";
const WIPE = [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }];
const UP = [
  { opacity: 0, transform: "translateY(44px)" },
  { opacity: 1, transform: "none" },
];

// Which parts of a page reveal, and how. The design marks these on each element.
const REVEALS: [string, string][] = [
  ["rule", ".hero-caption, .rule-label, .case-facts, .post-meta, .post-short, .post-sources, .language-row, .fact-row"],
  ["lines", ".hero-title, .statement, .procurement-line, .type-cta, .case-title, .case-summary, .insights-title, .insights-intro, .post-title, .next-capability, .post-body blockquote"],
  ["up", ".hero-lede, .hero-links, .work-lead-text, .work-second-text, .contact-row, .closing-text, .breadcrumb, .on-this-page, .body-heading, .note-line, .post-lead, .post-body > p, .post-author, .footer-row, .next-case-label, .service-note"],
  ["rows", ".services, .numbered, .standards, .insights-list, .more-list, .before-after, .questions"],
  ["kids", ".about-text, .procurement-list, .team-list, .service-intro, .case-body section > p"],
  ["img", ".work-image"],
];

type Pending = { el: Element; animations: Animation[] };

function tintFor(path: string) {
  const index = path.length % HERO_LANGUAGES.length;
  return HERO_LANGUAGES[index].colour;
}

/** All the site's movement in one place. Everything is skipped for reduced motion. */
export default function Motion() {
  const path = usePathname();
  const router = useRouter();
  const canvas = useRef<HTMLCanvasElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const [curtainTitle, setCurtainTitle] = useState("");
  const [curtainColour, setCurtainColour] = useState(HERO_LANGUAGES[0].colour);
  const pending = useRef<Pending[]>([]);
  const covered = useRef(false);
  const lifting = useRef<(() => void) | null>(null);

  // The paper background, the header and the "View" cursor live for the whole visit.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let stopPaper = () => {};
    if (canvas.current && !connection?.saveData) {
      try {
        stopPaper = startPaper(canvas.current, reduced);
      } catch {
        // Without WebGL the page is simply plain white.
      }
    }

    const bar = document.querySelector<HTMLElement>(".header-bar");
    const hero = () => document.querySelector<HTMLElement>(".hero-display");
    let lastY = window.scrollY;
    let frame = 0;
    const tick = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (bar) {
        if (y < 60) bar.dataset.state = "top";
        else if (dy > 3 && y > 200) bar.dataset.state = "hide";
        else if (dy < -4) bar.dataset.state = "up";
      }
      if (reduced) return;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".px").forEach((layer) => {
        const box = layer.parentElement?.getBoundingClientRect();
        if (!box || box.bottom < -80 || box.top > vh + 80) return;
        const progress = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
        layer.style.translate = `0 ${(progress * box.height * -0.05).toFixed(1)}px`;
      });
      const display = hero();
      if (display) display.style.translate = `0 ${(-Math.min(y, vh) * 0.12).toFixed(1)}px`;
      document.querySelectorAll<HTMLElement>(".about-line").forEach((line) => {
        const box = line.getBoundingClientRect();
        const start = vh * 0.88;
        const end = vh * 0.38;
        const progress = Math.min(1, Math.max(0, (start - box.top) / (start - end)));
        const words = Array.from(line.children) as HTMLElement[];
        words.forEach((word, index) => {
          const on = Math.min(1, Math.max(0, (progress * (words.length + 1.5) - index) / 2.5));
          word.style.opacity = String(0.45 + 0.55 * on);
        });
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    const fine = window.matchMedia("(pointer: fine)").matches && !reduced;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let on = false;
    let cursorFrame = 0;
    const follow = () => {
      cursorFrame = 0;
      if (!cursor.current) return;
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      cursor.current.style.translate = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`;
      if (Math.abs(mx - cx) + Math.abs(my - cy) > 0.3) cursorFrame = requestAnimationFrame(follow);
    };
    const onMove = (event: PointerEvent) => {
      mx = event.clientX;
      my = event.clientY;
      if (on && !cursorFrame) cursorFrame = requestAnimationFrame(follow);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const next = Boolean(target?.closest?.(".work-image")) && !document.querySelector("dialog[open]");
      if (next === on || !cursor.current) return;
      if (next) {
        cx = mx;
        cy = my;
        cursor.current.style.translate = `${cx}px ${cy}px`;
      }
      on = next;
      cursor.current.style.scale = next ? "1" : "0";
    };
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver);
    }
    return () => {
      stopPaper();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(cursorFrame);
    };
  }, []);

  // Reveals, re-run for each page.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !Element.prototype.animate) return;
    const intro = (window as Window & { __nvCovered?: boolean }).__nvCovered === true;
    covered.current = intro || covered.current;
    const vh = window.innerHeight;
    const made = new Map<Element, Animation[]>();
    const tint = tintFor(path);
    const prepare = (element: Element, kind: string) => {
      const list: Animation[] = [];
      const make = (node: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = node.animate(frames, { fill: "backwards", ...options });
        animation.pause();
        list.push(animation);
      };
      if (kind === "rule") make(element, WIPE, { duration: 1900, easing: EW });
      if (kind === "up") make(element, UP, { duration: 1600, easing: EO });
      if (kind === "lines") {
        make(element, [{ opacity: 0, transform: "translateY(32px)" }, { opacity: 1, transform: "none" }], { duration: 1700, easing: EO });
        const colour = getComputedStyle(element).color;
        make(element, [{ color: tint }, { color: tint, offset: 0.45 }, { color: colour }], { duration: 3000, easing: "ease-in-out" });
      }
      if (kind === "rows") Array.from(element.children).forEach((child, index) => make(child, WIPE, { duration: 1900, delay: index * 170, easing: EW }));
      if (kind === "kids") Array.from(element.children).forEach((child, index) => make(child, UP, { duration: 1600, delay: index * 130, easing: EO }));
      if (kind === "img") {
        make(element, [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }], { duration: 2100, easing: EW });
        const layer = element.querySelector(".px");
        if (layer) make(layer, [{ scale: "1.5" }, { scale: "1.12" }], { duration: 3200, easing: EO });
      }
      made.set(element, list);
    };
    const play = (element: Element, extra: number) => {
      (made.get(element) ?? []).forEach((animation) => {
        try {
          const timing = animation.effect?.getTiming();
          animation.effect?.updateTiming({ delay: Number(timing?.delay ?? 0) + extra });
          animation.play();
        } catch {
          animation.cancel();
        }
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (covered.current) pending.current.push({ el: entry.target, animations: [] });
          else play(entry.target, 0);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    REVEALS.forEach(([kind, selector]) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (made.has(element)) return;
        // Above the fold, with nothing covering the page, content simply stays put.
        if (!covered.current && element.getBoundingClientRect().top < vh * 0.92) return;
        prepare(element, kind);
        observer.observe(element);
      });
    });
    const uncover = () => {
      covered.current = false;
      const list = pending.current.splice(0).filter(({ el }) => el.isConnected);
      list.forEach(({ el }, index) => play(el, index * 110));
    };
    lifting.current = uncover;
    window.addEventListener("nv-uncover", uncover);

    // The contents list marks where you are.
    const toc = document.querySelector<HTMLElement>(".on-this-page");
    let spy: IntersectionObserver | undefined;
    if (toc) {
      const dot = toc.querySelector<HTMLElement>(".toc-dot");
      spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            toc.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
              const current = link.getAttribute("href") === `#${entry.target.id}`;
              link.classList.toggle("is-current", current);
              if (current && dot) {
                dot.style.opacity = "1";
                dot.style.translate = `0 ${link.offsetTop + link.offsetHeight / 2 - 3}px`;
              }
            });
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      toc.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
        const section = document.getElementById((link.getAttribute("href") ?? "").slice(1));
        if (section) spy?.observe(section);
      });
    }
    return () => {
      observer.disconnect();
      spy?.disconnect();
      window.removeEventListener("nv-uncover", uncover);
      made.forEach((list) => list.forEach((animation) => animation.finish?.()));
    };
  }, [path]);

  // The coloured curtain between pages.
  const colourIndex = useRef(0);
  const opened = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target || link.hasAttribute("download") || link.closest(".language-row")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const panelRoot = curtain.current;
      if (!panelRoot || opened.current) return;
      event.preventDefault();
      event.stopPropagation();
      opened.current = true;
      covered.current = true;
      const heading = link.closest("article, li")?.querySelector("h3, .insights-name, .more-name")?.textContent;
      const title = (heading || link.textContent || "").replace(/[→←↗]/g, "").trim();
      colourIndex.current = (colourIndex.current + 1) % HERO_LANGUAGES.length;
      setCurtainTitle(title);
      setCurtainColour(HERO_LANGUAGES[colourIndex.current].colour);
      const band = panelRoot.querySelector("[data-k=band]") as HTMLElement;
      const panel = panelRoot.querySelector("[data-k=panel]") as HTMLElement;
      const text = panelRoot.querySelector("[data-k=title]") as HTMLElement;
      panelRoot.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      band.animate([{ transform: "translateY(101%)" }, { transform: "none" }], { duration: 720, easing: EIO, fill: "forwards" });
      const cover = panel.animate([{ transform: "translateY(101%)" }, { transform: "none" }], { duration: 720, delay: 110, easing: EIO, fill: "forwards" });
      text.animate([{ transform: "translateY(110%)" }, { transform: "none" }], { duration: 900, delay: 460, easing: EO, fill: "both" });
      const go = () => router.push(url.pathname + url.search + url.hash);
      cover.finished.then(go, go);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!opened.current || !curtain.current) return;
    const root = curtain.current;
    const timer = setTimeout(() => {
      const band = root.querySelector("[data-k=band]") as HTMLElement;
      const panel = root.querySelector("[data-k=panel]") as HTMLElement;
      const text = root.querySelector("[data-k=title]") as HTMLElement;
      panel.animate([{ transform: "none" }, { transform: "translateY(-101%)" }], { duration: 900, easing: EIO, fill: "forwards" });
      text.animate([{ transform: "none", opacity: 1 }, { transform: "translateY(-40%)", opacity: 0 }], { duration: 630, easing: EIO, fill: "forwards" });
      const leave = band.animate([{ transform: "none" }, { transform: "translateY(-101%)" }], { duration: 900, delay: 120, easing: EIO, fill: "forwards" });
      setTimeout(() => lifting.current?.(), 360);
      const done = () => {
        root.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
        opened.current = false;
      };
      leave.finished.then(done, done);
    }, 440);
    return () => clearTimeout(timer);
  }, [path]);

  const colours = logoColours(0);
  return (
    <>
      <canvas ref={canvas} aria-hidden="true" className="paper" />
      <div ref={cursor} aria-hidden="true" className="view-cursor">
        View
      </div>
      <div ref={curtain} aria-hidden="true" className="curtain">
        <div data-k="band" className="curtain-layer" style={{ background: curtainColour }} />
        <div data-k="panel" className="curtain-layer curtain-panel">
          <div className="curtain-top">
            <svg viewBox="-7 -10.5 14 21" className="logo-mark">
              {[[-3.6, -7.2], [-3.6, 0], [-3.6, 7.2], [3.6, -7.2], [3.6, 0], [3.6, 7.2]].map(([x, y], index) => (
                <circle key={index} cx={x} cy={y} r={2.88} style={{ fill: colours[index] }} />
              ))}
            </svg>
            <span>Nestvested</span>
          </div>
          <div className="curtain-foot">
            <span className="curtain-mask">
              <span data-k="title" className="curtain-title">
                {curtainTitle}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
