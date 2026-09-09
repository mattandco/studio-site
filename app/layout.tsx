import type { Metadata } from "next";
import {
  Libre_Caslon_Display,
  Libre_Caslon_Text,
  Archivo,
  IBM_Plex_Mono,
} from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import RevealEngine from "@/components/motion/RevealEngine";
import "./globals.css";

const libreCaslonDisplay = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-libre-caslon-display",
  display: "swap",
});

const libreCaslonText = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-caslon-text",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://matthewbowman-studio.vercel.app";

const title = "Matthew Bowman — a studio for humanitarian information";
const description =
  "A small studio building data systems, platforms, and information services for humanitarian organisations. Work delivered within programmes of IFRC, UNICEF, WHO and the Gates Foundation.";

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
    siteName: "Matthew Bowman — Studio",
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
  name: "Matthew Bowman — Studio",
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
      className={`${libreCaslonDisplay.variable} ${libreCaslonText.variable} ${archivo.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <MotionProvider>
          {children}
          <RevealEngine />
        </MotionProvider>
      </body>
    </html>
  );
}
