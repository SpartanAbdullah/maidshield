import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MaidShield Calculator | UAE Domestic Worker EOS Estimate",
  description:
    "Estimate UAE domestic-worker end-of-service gratuity with transparent inputs, explainable breakdowns, and printable summaries.",
};

export default function CalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
