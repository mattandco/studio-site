import Link from "next/link";
import LanguageButtons from "@/components/LanguageButtons";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
import { localePath, type Lang } from "@/lib/languages";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  return (
    <footer id="languages" className="site-footer">
      <LanguageButtons lang={lang} label={t.common.languages} />
      <div className="footer-row">
        <span dir="ltr">
          © 2026 {SITE.name} · {SITE.legalName}, {SITE.address}
        </span>
        <span>
          {t.footer.tested} · <Link href={localePath(lang, "/accessibility")}>{t.footer.statement}</Link>
        </span>
      </div>
    </footer>
  );
}
