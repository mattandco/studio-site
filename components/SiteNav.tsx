"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language";

export default function SiteNav() {
  const path = usePathname();
  const onWork = path.startsWith("/work");
  const onInsights = path.startsWith("/insights");
  const language = useLanguage();
  return (
    <nav aria-label="Main" className="site-nav">
      <Link href="/#work" className={onWork ? "is-current" : undefined}>
        Work
      </Link>
      <Link href="/#services">Services</Link>
      <Link href="/#about">About</Link>
      <Link href="/insights" className={onInsights ? "is-current" : undefined}>
        Insights
      </Link>
      <Link href="/#procurement">Working with us</Link>
      <Link href="/#contact">Contact</Link>
      <span className="read-in">
        Read in{" "}
        <a href="#languages" lang={language.code} dir={language.code === "ar" ? "rtl" : "ltr"}>
          {language.name}
        </a>
      </span>
    </nav>
  );
}
