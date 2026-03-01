import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Privacy Policy";
const pageDescription =
  "Read how MaidShield approaches privacy, data minimization, and household employer information handling in this MVP.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/privacy", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/privacy",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function PrivacyPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="Privacy Policy"
          subtitle="Placeholder policy for MVP. Final legal text will be added before production launch."
        />

        <Card className="mt-8">
          <CardContent>
            <p className="text-sm leading-6 text-slate-700">
              MaidShield is designed with data minimization in mind. This
              placeholder outlines intent only and should not be treated as the
              final published policy.
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

