"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLanguage, localePath, stripLang, type Lang } from "@/lib/languages";

export type NavText = {
  work: string;
  services: string;
  about: string;
  insights: string;
  workingWithUs: string;
  contact: string;
  readIn: string;
};

export default function SiteNav({ lang, text, menu }: { lang: Lang; text: NavText; menu: string }) {
  const path = stripLang(usePathname());
  const onWork = path.startsWith("/work");
  const onInsights = path.startsWith("/insights");
  const language = getLanguage(lang);
  const to = (target: string) => localePath(lang, target);
  // French and Spanish write language names in lower case inside a sentence.
  const readInName = lang === "fr" || lang === "es" ? language.name.toLowerCase() : language.name;
  return (
    <nav aria-label={menu} className="site-nav">
      <Link href={to("/#work")} className={onWork ? "is-current" : undefined}>
        {text.work}
      </Link>
      <Link href={to("/#services")}>{text.services}</Link>
      <Link href={to("/#about")}>{text.about}</Link>
      <Link href={to("/insights")} className={onInsights ? "is-current" : undefined}>
        {text.insights}
      </Link>
      <Link href={to("/#procurement")}>{text.workingWithUs}</Link>
      <Link href={to("/#contact")}>{text.contact}</Link>
      <span className="read-in">
        {text.readIn} <a href="#languages">{readInName}</a>
      </span>
    </nav>
  );
}
