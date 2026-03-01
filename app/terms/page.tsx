import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Terms";
const pageDescription =
  "Review the current MaidShield terms covering planning estimates, intended use, and limits of the MVP experience.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/terms", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/terms",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function TermsPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="Terms of Use"
          subtitle="Placeholder terms for MVP. Final terms will be reviewed and versioned before release."
        />

        <Card className="mt-8">
          <CardContent>
            <p className="text-sm leading-6 text-slate-700">
              By using this MVP, users acknowledge that estimates are for
              planning purposes and are not a substitute for professional legal
              or payroll advice.
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

