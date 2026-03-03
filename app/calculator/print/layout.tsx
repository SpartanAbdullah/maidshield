import type { Metadata } from "next";

import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Print summary";
const pageDescription = "Printable summary for MaidShield planning estimates.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: makeCanonical("/calculator", "app"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/calculator",
    base: "app",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function CalculatorPrintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
