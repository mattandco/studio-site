import type { Config } from "tailwindcss";

/**
 * Design token registry (README "Design tokens" tables).
 *
 * Tailwind v4 is CSS-first: the tokens that actually drive the generated
 * utility classes (bg-paper, text-accent, font-display, …) are declared as
 * CSS custom properties in app/globals.css under `@theme inline`, and are
 * loaded here via `@config` so this file stays the canonical, typed source
 * of the palette and type scale for any tooling that reads it.
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        paper: "#F4F2EC",
        ink: "#12130E",
        "ink-muted": "#4A4B42",
        "ink-faint": "#5C5D53",
        meta: "#66675E",
        rule: "#D8D5CB",
        "rule-list": "#E0DDD2",
        "border-soft": "#C9C5B8",
        accent: "#A24B3F",
        selection: "#E4DFD1",
        "dark-body": "#D8D5CB",
        "dark-muted": "#B9B6A9",
        "dark-faint": "#8A8B80",
        "accent-light": "#C97B6A",
        "dark-rule": "#33342C",
        "dark-bg": "#12130E",
      },
      fontFamily: {
        display: ["var(--font-libre-caslon-display)", "Georgia", "serif"],
        serif: ["var(--font-libre-caslon-text)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.16,1,0.3,1)",
        interaction: "cubic-bezier(0.22,1,0.36,1)",
      },
      borderRadius: {
        button: "2px",
      },
      maxWidth: {
        container: "1240px",
      },
    },
  },
};

export default config;
