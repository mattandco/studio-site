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
      <div className="footer-top">
        <LanguageButtons lang={lang} label={t.common.languages} />
        <CarbonBadge result={t.footer.carbon} note={t.footer.carbonNote} />
      </div>
      <div className="footer-row">
        <div dir="ltr">
          <p>© 2026 {SITE.legalName}</p>
          {SITE.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="footer-link">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
        <div>
          <p>{t.footer.tested}</p>
          <p>{t.footer.tls}</p>
          <p className="footer-link">
            <Link href={localePath(lang, "/accessibility")}>{t.footer.statement}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
