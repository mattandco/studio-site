import { LANGUAGES, localePath, type Lang } from "@/lib/languages";

/** The canonical address of a page and its address in every language. */
export function alternates(lang: Lang, path: string) {
  const languages: Record<string, string> = { "x-default": path };
  for (const { code, htmlLang } of LANGUAGES) languages[htmlLang] = localePath(code, path);
  return { canonical: localePath(lang, path), languages };
}
