"use client";

import type { ReactNode } from "react";

// The move between pages is the curtain in Motion.
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <main id="content" tabIndex={-1}>
      {children}
    </main>
  );
}
