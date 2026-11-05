import Link from "next/link";
import LanguageButtons from "@/components/LanguageButtons";
import { SITE } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer id="languages" className="site-footer">
      <LanguageButtons />
      <div className="footer-row">
        <span>
          © 2026 {SITE.name} · {SITE.legalName}, {SITE.address}
        </span>
        <span>
          WCAG 2.1 AA, tested {SITE.accessibilityTested} ·{" "}
          <Link href="/accessibility">Accessibility statement</Link>
        </span>
      </div>
    </footer>
  );
}
