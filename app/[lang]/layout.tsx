import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
import { fontClasses } from "@/lib/fonts";
import { PERSONAL } from "@/lib/website";
import { introScript } from "@/lib/intro";
import { getLanguage, LANGUAGES, localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";
import "../globals.css";

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGES.map(({ code }) => ({ lang: code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const { title, description } = getContent(lang).meta;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s · ${SITE.name}` },
    description,
    alternates: alternates(lang, "/"),
    // Matthew's own site is kept out of search engines.
    robots: PERSONAL ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${localePath(lang, "/")}`,
      siteName: SITE.name,
      type: "website",
      locale: getLanguage(lang).locale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const lang = (await params).lang as Lang;
  const language = getLanguage(lang);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    description: getContent(lang).meta.description,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone.replaceAll(" ", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "35 Lady Musgrave Road, Building 18",
      addressLocality: "Kingston",
      addressCountry: "JM",
    },
    founder: { "@type": "Person", name: SITE.founder },
    areaServed: "Worldwide",
  };
  // Matthew's own site describes a person, not a company.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: "Technology consultant",
    description: getContent(lang).meta.description,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone.replaceAll(" ", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "35 Lady Musgrave Road, Building 18",
      addressLocality: "Kingston",
      addressCountry: "JM",
    },
  };
  return (
    <html lang={language.htmlLang} dir={language.dir} data-scroll-behavior="smooth" className={fontClasses}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSONAL ? personJsonLd : organizationJsonLd) }}
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <SiteShell lang={lang}>{children}</SiteShell>
      </body>
    </html>
  );
}
