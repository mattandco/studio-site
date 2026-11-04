"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const path = usePathname();
  const onWork = path.startsWith("/work");
  const onInsights = path.startsWith("/insights");
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
    </nav>
  );
}
