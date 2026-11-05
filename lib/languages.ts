export const LANGUAGES = [
  { code: "ar", name: "العربية", colour: "#C9A7FF", dir: "rtl", htmlLang: "ar", locale: "ar_AE" },
  { code: "zh", name: "中文", colour: "#FF9FCB", dir: "ltr", htmlLang: "zh-Hans", locale: "zh_CN" },
  { code: "en", name: "English", colour: "#FF8A5B", dir: "ltr", htmlLang: "en-GB", locale: "en_GB" },
  { code: "fr", name: "Français", colour: "#7FB3FF", dir: "ltr", htmlLang: "fr", locale: "fr_FR" },
  { code: "ru", name: "Русский", colour: "#7ED9A6", dir: "ltr", htmlLang: "ru", locale: "ru_RU" },
  { code: "es", name: "Español", colour: "#FFD23F", dir: "ltr", htmlLang: "es", locale: "es_ES" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

export const getLanguage = (lang: Lang) =>
  LANGUAGES.find(({ code }) => code === lang) ?? LANGUAGES[2];

/** English lives at the plain addresses; every other language under its code. */
export function localePath(lang: Lang, path: string) {
  if (lang === "en") return path;
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** The address of a page without its language, whichever language it is in. */
export function stripLang(path: string) {
  const match = path.match(/^\/(ar|zh|en|fr|ru|es)(\/.*)?$/);
  return match ? match[2] || "/" : path;
}
