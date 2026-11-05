import type { NextConfig } from "next";

// The page's inline scripts need 'unsafe-inline' while the pages stay static. The only
// outside addresses are Website Carbon's badge script and its result.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://unpkg.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.websitecarbon.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
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
