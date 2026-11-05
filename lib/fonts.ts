import { Golos_Text } from "next/font/google";
import localFont from "next/font/local";

export const golos = Golos_Text({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-golos",
  display: "swap",
});

// Arabic and Chinese appear only in the hero's moving display, so each is a subset
// of just those letters (a few KB).
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

export const fontClasses = [golos, alexandriaSubset, notoSansScSubset]
  .map((font) => font.variable)
  .join(" ");
