"use client";

import Script from "next/script";

// Website Carbon's badge, which Matthew chose on 5 November 2026. It is the site's one
// third-party script. Reason: it shows a live, independent carbon rating. It loads
// after everything else, so it never holds up the page.
export default function CarbonBadge() {
  return (
    <>
      <div id="wcb" className="carbonbadge" />
      <Script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" strategy="lazyOnload" />
    </>
  );
}
