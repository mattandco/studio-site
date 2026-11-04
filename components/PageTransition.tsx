"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

// A short fade between pages. The first page load is left alone.
export default function PageTransition({ children }: { children: ReactNode }) {
  const path = usePathname();
  const main = useRef<HTMLElement>(null);
  const previous = useRef(path);

  useEffect(() => {
    if (previous.current === path) return;
    previous.current = path;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    main.current?.animate(
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 560, easing: "cubic-bezier(.16,1,.3,1)" }
    );
  }, [path]);

  return (
    <main ref={main} id="content" tabIndex={-1}>
      {children}
    </main>
  );
}
