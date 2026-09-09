import type { Config } from "tailwindcss";

/**
 * Design token registry — house design frame, ported from the
 * collective-service proposal reference. The tokens that actually drive
 * generated utility classes live as CSS custom properties in
 * app/globals.css under `@theme inline`; this file stays the canonical,
 * typed source of the palette for any tooling that reads it.
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        paper: "#F5F4EF",
        "paper-2": "#ECEBE3",
        ink: "#101114",
        mute: "#585A52",
        hair: "#DEDCD1",
        "hair-strong": "#C6C4B6",
        blue: "#1D2BE3",
        red: "#D11A2A",
        ghost: "#E7E5DA",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "Arial Black", "Arial", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-fragment-mono)", "Courier New", "monospace"],
      },
      transitionTimingFunction: {
        house: "cubic-bezier(0.22,0.75,0.15,1)",
      },
      maxWidth: {
        container: "1360px",
      },
    },
  },
};

export default config;
