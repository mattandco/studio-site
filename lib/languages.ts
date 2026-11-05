export const LANGUAGES = [
  { code: "en", name: "English", colour: "#FF8A5B", dir: "ltr", htmlLang: "en-GB", locale: "en_GB" },
  { code: "es", name: "Español", colour: "#FFD23F", dir: "ltr", htmlLang: "es", locale: "es_ES" },
  { code: "fr", name: "Français", colour: "#7FB3FF", dir: "ltr", htmlLang: "fr", locale: "fr_FR" },
  { code: "de", name: "Deutsch", colour: "#C9A7FF", dir: "ltr", htmlLang: "de", locale: "de_DE" },
  { code: "pt", name: "Português", colour: "#7ED9A6", dir: "ltr", htmlLang: "pt", locale: "pt_PT" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

export const getLanguage = (lang: Lang) =>
  LANGUAGES.find(({ code }) => code === lang) ?? LANGUAGES[0];

/** English lives at the plain addresses; every other language under its code. */
export function localePath(lang: Lang, path: string) {
  if (lang === "en") return path;
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** The address of a page without its language, whichever language it is in. */
export function stripLang(path: string) {
  const match = path.match(/^\/(en|es|fr|de|pt)(\/.*)?$/);
  return match ? match[2] || "/" : path;
}
