import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Cookiebot (consent banner + cookie declaration) is the only third-party
// code the site loads. Add a host here before adding any other third party.
const COOKIEBOT = "https://consent.cookiebot.com https://consentcdn.cookiebot.com";

// A static CSP (no per-request nonce) keeps every page statically rendered.
// 'unsafe-inline' is needed for Next's inline bootstrap scripts and the
// JSON-LD block; the rest of the policy still blocks foreign script hosts,
// plugins, <base> hijacking, off-site form posts and framing.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${COOKIEBOT}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://imgsct.cookiebot.com ${COOKIEBOT}`,
  "font-src 'self' data:",
  `connect-src 'self' ${COOKIEBOT}${isDev ? " ws: wss:" : ""}`,
  `frame-src ${COOKIEBOT}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Keep old /contact links (bookmarks, shared URLs) working
  async redirects() {
    return [
      { source: "/contact", destination: "/contact-us", permanent: true },
    ];
  },
};

export default nextConfig;
