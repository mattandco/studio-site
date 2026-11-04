import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import SiteNav from "@/components/SiteNav";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="logo">
        <LogoMark />
        <span>Nestvested</span>
      </Link>
      <SiteNav />
    </header>
  );
}
