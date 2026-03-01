import type { Metadata } from "next";

import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

export const metadata: Metadata = {
  title: "Calculator",
  description:
    "Estimate UAE domestic-worker end-of-service gratuity with transparent inputs, explainable breakdowns, and printable summaries.",
  alternates: {
    canonical: makeCanonical("/calculator", "app"),
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: buildOpenGraph({
    title: "Calculator",
    description:
      "Estimate UAE domestic-worker end-of-service gratuity with transparent inputs, explainable breakdowns, and printable summaries.",
    path: "/calculator",
    base: "app",
  }),
  twitter: buildTwitter({
    title: "Calculator",
    description:
      "Estimate UAE domestic-worker end-of-service gratuity with transparent inputs, explainable breakdowns, and printable summaries.",
  }),
};

export default function CalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
