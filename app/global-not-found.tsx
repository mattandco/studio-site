import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getContent } from "@/content/i18n";
import { fontClasses } from "@/lib/fonts";
import "./globals.css";

const { notFound } = getContent("en");

export const metadata: Metadata = { title: `${notFound.title} · Nestvested` };

export default function GlobalNotFound() {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={fontClasses}>
      <body>
        <SiteShell lang="en">
          <section className="wrap page-top">
            <h1 className="insights-title">{notFound.title}</h1>
            <p className="insights-intro type-md">
              {notFound.text}{" "}
              <Link href="/" className="link">
                {notFound.home}
              </Link>
            </p>
          </section>
        </SiteShell>
      </body>
    </html>
  );
}
