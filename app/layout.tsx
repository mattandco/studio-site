import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, Fragment_Mono } from "next/font/google";
import PageMotion from "@/components/motion/PageMotion";
import ScrollChrome from "@/components/motion/ScrollChrome";
import RevealEngine from "@/components/motion/RevealEngine";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

const newsreader = Newsreader({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nestvested.co";

const title =
  "Nestvested · a web and app design and development studio for the humanitarian sector";
const description =
  "A web and app design and development studio building sites, apps, and platforms for humanitarian organisations. Work delivered within programmes of IFRC, UNICEF, WHO and the Gates Foundation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Nestvested",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nestvested",
  description,
  url: siteUrl,
  email: "mailto:matthew.bowman.consult@gmail.com",
  founder: {
    "@type": "Person",
    name: "Matthew Bowman",
  },
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // "js" is set statelessly here rather than via a blocking inline
      // script: this is a React app, JS is always present once it hydrates,
      // and the house frame's motion CSS (.js .rv, .js .h1 .ln>span, …)
      // simply gates on this class being there from the first paint.
      className={`${bricolageGrotesque.variable} ${newsreader.variable} ${fragmentMono.variable} js`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <PageMotion />
        <ScrollChrome />
        {children}
        <RevealEngine />
      </body>
    </html>
  );
}
