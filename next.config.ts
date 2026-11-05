import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  // English stays at the plain addresses; other languages are at /es, /fr, /de and /pt.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      // Languages the site no longer carries go to the same page in English.
      { source: "/:lang(ar|ru|zh)", destination: "/", permanent: false },
      { source: "/:lang(ar|ru|zh)/:path*", destination: "/:path*", permanent: false },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        // Letters and hyphens only, so the images in public/work are left alone.
        { source: "/work/:slug([a-z-]+)", destination: "/en/work/:slug" },
        { source: "/services/:slug([a-z-]+)", destination: "/en/services/:slug" },
        { source: "/insights", destination: "/en/insights" },
        { source: "/insights/:slug", destination: "/en/insights/:slug" },
        { source: "/accessibility", destination: "/en/accessibility" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
