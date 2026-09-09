"use client";

import { useEffect, useRef } from "react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "studio", label: "01" },
  { id: "capabilities", label: "02" },
  { id: "work", label: "03" },
  { id: "contact", label: "—" },
];

/**
 * The fixed spine rail (desktop) and mobile progress hairline, plus the two
 * scroll-driven behaviours the reference proposal wires up in its closing
 * <script>: a rAF-throttled scroll handler painting scaleY/scaleX progress
 * fills, and an IntersectionObserver (rootMargin -30%/-55%) that highlights
 * the active section in the spine nav.
 */
export default function ScrollChrome() {
  const sfillRef = useRef<HTMLDivElement>(null);
  const mfillRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let ticking = false;

    function paint() {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (sfillRef.current) sfillRef.current.style.transform = `scaleY(${p})`;
      if (mfillRef.current) mfillRef.current.style.transform = `scaleX(${p})`;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const secs = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!("IntersectionObserver" in window) || secs.length === 0) return;

    const setActive = (id: string) => {
      Object.entries(navRefs.current).forEach(([sectionId, link]) => {
        link?.classList.toggle("on", sectionId === id);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="mprog" aria-hidden="true">
        <div className="fill" ref={mfillRef} />
      </div>

      <aside className="spine">
        <span className="vlabel">Matthew Bowman · Studio</span>
        <div className="track" aria-hidden="true">
          <div className="fill" ref={sfillRef} />
        </div>
        <nav aria-label="Sections">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={s.id}
              ref={(el) => {
                navRefs.current[s.id] = el;
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
