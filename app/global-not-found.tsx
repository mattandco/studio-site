import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/PageParts";
import SiteShell from "@/components/SiteShell";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
import { fontClasses } from "@/lib/fonts";
import "./globals.css";

const { notFound } = getContent("en");

export const metadata: Metadata = { title: `${notFound.title} · Nestvested` };

export default function GlobalNotFound() {
  const [before, after = ""] = notFound.text.split("{email}");
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={fontClasses}>
      <body>
        <SiteShell lang="en">
          <section className="wrap page-top">
            <h1 className="insights-title">{notFound.title}</h1>
            <p className="insights-intro type-md">
              {before}
              <a href={`mailto:${SITE.email}`} className="link">
                {SITE.email}
              </a>
              {after}
            </p>
            <p className="not-found-links">
              <Link href="/" className="link">
                {notFound.home}
              </Link>
              <Link href="/#work" className="link">
                {notFound.work}
              </Link>
              <Link href="/#services" className="link">
                {notFound.services}
              </Link>
              <Link href="/insights" className="link">
                {notFound.insights}
              </Link>
            </p>
          </section>
          <ClosingCta lang="en" />
        </SiteShell>
      </body>
    </html>
  );
}
