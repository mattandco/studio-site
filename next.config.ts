import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  // English stays at the plain addresses; other languages are at /fr, /es and so on.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        // Letters and hyphens only, so the images in public/work are left alone.
        { source: "/work/:slug([a-z-]+)", destination: "/en/work/:slug" },
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
