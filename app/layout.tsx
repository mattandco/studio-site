import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import localFont from "next/font/local";
import ContactFormProvider from "@/components/ContactForm";
import PageTransition from "@/components/PageTransition";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/content/site";
import "./globals.css";

const golos = Golos_Text({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-golos",
  display: "swap",
});

// Arabic and Chinese appear only in the hero's six-language display, so each is
// a subset of just those letters (a few KB) rather than the whole family.
const alexandria = localFont({
  src: "./fonts/alexandria-subset.woff2",
  weight: "400",
  variable: "--font-alexandria",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const notoSansSc = localFont({
  src: "./fonts/noto-sans-sc-subset.woff2",
  weight: "400",
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const title = "Nestvested · Websites and brands for NGOs and international organisations";
const description =
  "Nestvested designs and builds websites and brands for NGOs and international organisations: fast, accessible sites your own team can update, built for slow and unstable connections.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s · Nestvested" },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  description,
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${golos.variable} ${alexandria.variable} ${notoSansSc.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <ContactFormProvider>
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
        </ContactFormProvider>
      </body>
    </html>
  );
}
