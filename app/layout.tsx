import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { PWARegister } from "@/components/layout/PWARegister";
import { TopNav } from "@/components/layout/TopNav";
import { buildOpenGraph, buildTwitter, defaultDescription, makeCanonical } from "@/app/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maidshield.com"),
  title: {
    default: "MaidShield",
    template: "%s | MaidShield",
  },
  description: defaultDescription,
  manifest: "/manifest.json",
  alternates: {
    canonical: makeCanonical("/", "www"),
  },
  openGraph: buildOpenGraph({
    description: defaultDescription,
    path: "/",
    base: "www",
  }),
  twitter: buildTwitter({
    description: defaultDescription,
  }),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  const shouldLoadPlausible =
    process.env.NODE_ENV === "production" && Boolean(plausibleDomain);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}>
        <PWARegister />
        <TopNav />
        {children}
        <SiteFooter />
        {shouldLoadPlausible ? (
          <Script
            src="https://plausible.io/js/script.js"
            data-domain={plausibleDomain}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
