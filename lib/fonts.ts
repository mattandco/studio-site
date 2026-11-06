import { Golos_Text } from "next/font/google";

export const golos = Golos_Text({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-golos",
  display: "swap",
});

export const fontClasses = golos.variable;
