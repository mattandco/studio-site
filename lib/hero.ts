import { useSyncExternalStore } from "react";

export type HeroLanguage = {
  code: string;
  colour: string;
  name: string;
  first: string;
  second: string;
};

// "Design Studio" in the six UN languages, as supplied in the design.
export const HERO_LANGUAGES: HeroLanguage[] = [
  { code: "en", colour: "#D9480F", name: "English", first: "Design", second: "Studio" },
  { code: "fr", colour: "#2457D6", name: "Français", first: "Studio", second: "de design" },
  { code: "ru", colour: "#138A55", name: "Русский", first: "Дизайн-", second: "студия" },
  { code: "es", colour: "#B57A00", name: "Español", first: "Estudio", second: "de diseño" },
  { code: "ar", colour: "#7B3FE4", name: "العربية", first: "استوديو", second: "تصميم" },
  { code: "zh", colour: "#D6246E", name: "中文", first: "设计", second: "工作室" },
];

const RING = [0, 5, 4, 1, 2, 3];
const RING_START = [0, 3, 4, 5, 2, 1];

/** The logo's six dots, turned one place round the ring for each language. */
export function logoColours(step: number): string[] {
  return RING.map(
    (place) => HERO_LANGUAGES[RING_START[(place - step + 6) % 6]].colour
  );
}

// The hero and the logo sit in different parts of the page, so the current
// language lives in a small store rather than in either component.
let current = 0;
const listeners = new Set<() => void>();

export function setHeroIndex(index: number) {
  if (index === current) return;
  current = index;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useHeroIndex() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => 0
  );
}
