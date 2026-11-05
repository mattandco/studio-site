import Link from "next/link";
import CarbonBadge from "@/components/CarbonBadge";
import LanguageButtons from "@/components/LanguageButtons";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
import { localePath, type Lang } from "@/lib/languages";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  return (
    <footer id="languages" className="site-footer">
      <LanguageButtons lang={lang} label={t.common.languages} />
      <CarbonBadge />
      <div className="footer-row">
        <span dir="ltr">
          © 2026 {SITE.name} · {SITE.legalName}, {SITE.address} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </span>
        <span>
          {t.footer.tested} · <Link href={localePath(lang, "/accessibility")}>{t.footer.statement}</Link>
        </span>
      </div>
    </footer>
  );
}
