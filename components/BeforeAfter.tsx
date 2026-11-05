"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

// Drag, or use the arrow keys, to compare the old site with the new one. It opens
// with a short sweep from the old site, unless the visitor has reduced motion on.
export default function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
  beforeAlt,
  afterAlt,
  frame,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  label: string;
  beforeAlt: string;
  afterAlt: string;
  frame: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [value, setValue] = useState(50);

  useEffect(() => {
    const element = box.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          if (dragging.current) return;
          const progress = Math.min(1, (now - start) / 1800);
          setValue(90 - 40 * (1 - Math.pow(1 - progress, 4)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const moveTo = (x: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (rect) setValue(Math.max(0, Math.min(100, ((x - rect.left) / Math.max(1, rect.width)) * 100)));
  };
  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const next: Record<string, number> = { ArrowLeft: value - 5, ArrowRight: value + 5, Home: 0, End: 100 };
    if (!(event.key in next)) return;
    event.preventDefault();
    dragging.current = true;
    setValue(Math.max(0, Math.min(100, next[event.key])));
  };

  return (
    <div
      ref={box}
      className="slider"
      style={{ "--ba": `${value.toFixed(2)}%`, "--frame": frame } as CSSProperties}
      onPointerDown={onDown}
      onPointerMove={(event) => {
        if (event.buttons) moveTo(event.clientX);
      }}
    >
      <div className="slider-side slider-before">
        <Image src={before} alt={beforeAlt} fill sizes="(max-width: 1512px) 100vw, 1384px" />
        <span className="slider-tag">{beforeLabel}</span>
      </div>
      <div className="slider-side slider-after">
        <Image src={after} alt={afterAlt} fill sizes="(max-width: 1512px) 100vw, 1384px" />
        <span className="slider-tag slider-tag-after">{afterLabel}</span>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        className="slider-handle"
        onKeyDown={onKey}
      >
        <span aria-hidden="true" className="slider-line" />
        <span aria-hidden="true" className="slider-knob">
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}
