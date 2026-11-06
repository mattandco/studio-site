"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const path = usePathname();
  const firstLoad = useRef(true);
  const historyMove = useRef(false);

  useEffect(() => {
    const onHistoryMove = () => {
      historyMove.current = true;
    };
    window.addEventListener("popstate", onHistoryMove);
    return () => window.removeEventListener("popstate", onHistoryMove);
  }, []);

  // Next.js leaves the scroll where it is when the new page's first element is already on screen,
  // so a page could open part way down. Every new page starts at the top, unless the link names a
  // section or the reader used the Back or Forward button, which returns to where they were.
  useLayoutEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (historyMove.current) {
      historyMove.current = false;
      return;
    }
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);

  return (
    <main id="content" tabIndex={-1}>
      {children}
    </main>
  );
}
