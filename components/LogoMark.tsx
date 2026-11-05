"use client";

import { usePathname } from "next/navigation";
import { HERO_LANGUAGES, logoColours, useHeroIndex } from "@/lib/hero";
import { useLanguage } from "@/lib/language";

const DOTS = [
  [-3.6, -7.2],
  [-3.6, 0],
  [-3.6, 7.2],
  [3.6, -7.2],
  [3.6, 0],
  [3.6, 7.2],
];

export default function LogoMark() {
  const path = usePathname();
  const heroIndex = useHeroIndex();
  const language = useLanguage();
  // On the home page the logo turns with the hero. Elsewhere it shows the chosen language.
  const chosen = HERO_LANGUAGES.findIndex(({ code }) => code === language.code);
  const colours = logoColours(path === "/" ? heroIndex : Math.max(0, chosen));
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
