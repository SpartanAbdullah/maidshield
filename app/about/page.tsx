import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "About MaidShield";
const pageDescription =
  "Why MaidShield exists, who it serves, and how it keeps settlement planning clear for UAE household employers.";

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
          subtitle="A practical planning tool for UAE household employers handling domestic worker settlement calculations."
        />

        <div className="mt-8 space-y-5">
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Why MaidShield Exists</h2>
              <p className="text-sm leading-6 text-slate-700">
                Household employers often need a structured estimate before final settlement. MaidShield
                exists to make that planning step clearer by showing inputs, assumptions, and a readable
                breakdown in one place.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Who It&apos;s For</h2>
              <p className="text-sm leading-6 text-slate-700">
                MaidShield is for UAE household employers, family offices, and advisors who want a calm,
                consistent way to review domestic worker end-of-service scenarios before final approval.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">What It Is NOT</h2>
              <p className="text-sm leading-6 text-slate-700">
                MaidShield is not a law firm, not a payroll processor, and not a substitute for formal legal
                advice. It is a planning and review aid to support clearer conversations and better records.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Transparency Promise</h2>
              <p className="text-sm leading-6 text-slate-700">
                We keep assumptions visible, use plain language, and avoid hidden logic where possible so
                users can understand how each estimate is produced.
              </p>
              <p className="text-xs leading-6 text-slate-500">
                MaidShield provides planning estimates and does not replace formal legal advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
