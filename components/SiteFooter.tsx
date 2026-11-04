import Link from "next/link";
import { SITE } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-row footer-rule">
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
