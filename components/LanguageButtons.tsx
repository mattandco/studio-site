"use client";

import { setLanguage, SITE_LANGUAGES, useLanguage } from "@/lib/language";

export default function LanguageButtons() {
  const current = useLanguage();
  return (
    <div role="group" aria-label="Languages" className="language-row">
      {SITE_LANGUAGES.map(({ code, name, colour }) => (
        <button
          key={code}
          type="button"
          lang={code}
          dir={code === "ar" ? "rtl" : "ltr"}
          aria-current={code === current.code ? "true" : undefined}
          onClick={() => setLanguage(code)}
          style={{ background: colour }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
