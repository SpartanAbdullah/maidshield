import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "About";
const pageDescription =
  "Learn how MaidShield helps UAE household employers review domestic worker settlement estimates with clearer assumptions.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/about", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/about",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function AboutPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="About MaidShield"
          subtitle="MaidShield helps households and advisors estimate domestic worker settlement outcomes with transparent assumptions."
        />

        <Card className="mt-8">
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-slate-700">
              The product focuses on planning clarity: gather key employment
              inputs, apply configurable rules, and present clean summaries for
              review.
            </p>
            <p className="text-sm leading-6 text-slate-700">
              This MVP is intentionally lightweight and does not provide legal
              advice or final payroll processing.
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

