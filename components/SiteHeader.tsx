import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import SiteNav, { type NavText } from "@/components/SiteNav";
import { localePath, type Lang } from "@/lib/languages";

export default function SiteHeader({ lang, text, menu }: { lang: Lang; text: NavText; menu: string }) {
  return (
    <div className="header-bar" data-state="top">
      <header className="site-header">
        <Link href={localePath(lang, "/")} className="logo">
          <LogoMark lang={lang} />
          <span>Nestvested</span>
        </Link>
        <SiteNav lang={lang} text={text} menu={menu} />
      </header>
    </div>
  );
}
