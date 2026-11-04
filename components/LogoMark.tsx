"use client";

import { logoColours, useHeroIndex } from "@/lib/hero";

const DOTS = [
  [-3.6, -7.2],
  [-3.6, 0],
  [-3.6, 7.2],
  [3.6, -7.2],
  [3.6, 0],
  [3.6, 7.2],
];

export default function LogoMark() {
  const colours = logoColours(useHeroIndex());
  return (
    <svg viewBox="-7 -10.5 14 21" aria-hidden="true" className="logo-mark">
      {DOTS.map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={2.88}
          style={{ fill: colours[index] }}
        />
      ))}
    </svg>
  );
}
