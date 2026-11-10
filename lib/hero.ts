import { useSyncExternalStore } from "react";

export type HeroLanguage = {
  code: string;
  colour: string;
  name: string;
  first: string;
  second: string;
};

// "Design Studio" in the site's five languages, in the order of the language buttons.
export const HERO_LANGUAGES: HeroLanguage[] = [
  { code: "en", colour: "#D9480F", name: "English", first: "Design", second: "Studio" },
  { code: "es", colour: "#B57A00", name: "Español", first: "Estudio", second: "de diseño" },
  { code: "fr", colour: "#2457D6", name: "Français", first: "Studio", second: "de design" },
  { code: "de", colour: "#138A55", name: "Deutsch", first: "Design-", second: "studio" },
  { code: "pt", colour: "#7B3FE4", name: "Português", first: "Estúdio", second: "de design" },
];

// The logo's six colours, clockwise from the top left dot.
const RING_COLOURS = ["#D9480F", "#B57A00", "#7B3FE4", "#D6246E", "#138A55", "#2457D6"];
// Where each dot of the logo sits on that ring.
const RING = [0, 5, 4, 1, 2, 3];

/** The logo's six dots, turned round the ring by the given number of places. */
export function logoColours(step: number): string[] {
  return RING.map((place) => RING_COLOURS[(place - (step % 6) + 6) % 6]);
}

// The hero and the logo sit in different parts of the page, so the logo's place
// lives in a small store rather than in either component. It counts turns rather
// than languages: five languages and six dots, and the logo always moves one place.
let current = 0;
const listeners = new Set<() => void>();

export function setLogoStep(step: number) {
  if (step === current) return;
  current = step;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLogoStep() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => 0
  );
}
