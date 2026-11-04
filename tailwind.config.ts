import type { Config } from "tailwindcss";

/**
 * Design tokens for the Nestvested site. The values the pages actually use
 * are the custom properties at the top of app/globals.css; this file stays
 * the typed copy of the palette for any tooling that reads it.
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        ink: "#242126",
        mute: "#575757",
        line: "#DBDBDB",
        tint: "#F2F2F3",
        error: "#A1271B",
      },
      maxWidth: {
        container: "1512px",
      },
    },
  },
};

export default config;
