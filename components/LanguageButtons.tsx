"use client";

import { usePathname } from "next/navigation";
import { LANGUAGES, localePath, stripLang, type Lang } from "@/lib/languages";

// Each button opens the same page in that language. These are full page loads on
// purpose: the page's language, direction and fonts all change.
export default function LanguageButtons({ lang, label }: { lang: Lang; label: string }) {
  const path = stripLang(usePathname());
  return (
    <div role="group" aria-label={label} className="language-row">
      {LANGUAGES.map(({ code, name, colour, dir, htmlLang }) => (
        <a
          key={code}
          href={localePath(code, path)}
          hrefLang={htmlLang}
          lang={code}
          dir={dir}
          aria-current={code === lang ? "true" : undefined}
          style={{ background: colour }}
        >
          {name}
        </a>
      ))}
    </div>
  );
}
