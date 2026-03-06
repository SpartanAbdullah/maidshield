import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS (Vercel serves HTTPS; this tells browsers to remember)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // Clickjacking protection
  { key: "X-Frame-Options", value: "DENY" },

  // MIME sniffing protection
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Safer referrer behavior
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Isolate browsing context where possible
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },

  // Reduce passive cross-origin resource leakage
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },

  // Disable DNS prefetch for tighter privacy defaults
  { key: "X-DNS-Prefetch-Control", value: "off" },

  // Limit browser features you don’t need (tweak later if you add something)
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;