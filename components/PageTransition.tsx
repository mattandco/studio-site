"use client";

import type { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <main id="content" tabIndex={-1}>
      {children}
    </main>
  );
}
