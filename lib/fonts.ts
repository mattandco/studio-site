import { Alexandria, Golos_Text } from "next/font/google";
import localFont from "next/font/local";

export const golos = Golos_Text({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-golos",
  display: "swap",
});

// Used only on the Russian and Arabic pages, so neither is preloaded elsewhere.
export const golosCyrillic = Golos_Text({
  weight: ["400", "500"],
  subsets: ["cyrillic"],
  variable: "--font-golos-cyrillic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const alexandriaArabic = Alexandria({
  weight: ["400", "500"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

// On the other pages Arabic and Chinese appear only in the hero and the language
// buttons, so each is a subset of just those letters (a few KB).
export const alexandriaSubset = localFont({
  src: "../app/fonts/alexandria-subset.woff2",
  weight: "400",
  variable: "--font-alexandria",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const notoSansScSubset = localFont({
  src: "../app/fonts/noto-sans-sc-subset.woff2",
  weight: "400",
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const fontClasses = [golos, golosCyrillic, alexandriaArabic, alexandriaSubset, notoSansScSubset]
  .map((font) => font.variable)
  .join(" ");
