import { useSyncExternalStore } from "react";

export type SiteLanguage = { code: string; name: string; colour: string };

// The six buttons at the foot of every page, in the design's order and colours.
export const SITE_LANGUAGES: SiteLanguage[] = [
  { code: "ar", name: "العربية", colour: "#C9A7FF" },
  { code: "zh", name: "中文", colour: "#FF9FCB" },
  { code: "en", name: "English", colour: "#FF8A5B" },
  { code: "fr", name: "Français", colour: "#7FB3FF" },
  { code: "ru", name: "Русский", colour: "#7ED9A6" },
  { code: "es", name: "Español", colour: "#FFD23F" },
];

const KEY = "nv-lang";
const listeners = new Set<() => void>();
let current: string | null = null;

function read() {
  if (current === null) {
    current = "en";
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && SITE_LANGUAGES.some(({ code }) => code === saved)) current = saved;
    } catch {
      // Storage can be blocked. The choice then lasts for this visit only.
    }
  }
  return current;
}

export function setLanguage(code: string) {
  current = code;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // As above.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLanguage() {
  const code = useSyncExternalStore(subscribe, read, () => "en");
  return SITE_LANGUAGES.find((language) => language.code === code) ?? SITE_LANGUAGES[2];
}
