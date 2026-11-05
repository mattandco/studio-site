"use client";

import { usePathname } from "next/navigation";
import { HERO_LANGUAGES, logoColours, useHeroIndex } from "@/lib/hero";
import { stripLang, type Lang } from "@/lib/languages";

const DOTS = [
  [-3.6, -7.2],
  [-3.6, 0],
  [-3.6, 7.2],
  [3.6, -7.2],
  [3.6, 0],
  [3.6, 7.2],
];

export default function LogoMark({ lang }: { lang: Lang }) {
  const path = stripLang(usePathname());
  const heroIndex = useHeroIndex();
  // On the home page the logo turns with the hero. Elsewhere it shows the page's language.
  const chosen = HERO_LANGUAGES.findIndex(({ code }) => code === lang);
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
