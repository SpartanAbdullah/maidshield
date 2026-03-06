import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "About";
const pageDescription =
  "Learn how MaidShield helps UAE household employers review domestic worker settlement estimates with clearer assumptions.";

const aboutCards = [
  {
    title: "Why MaidShield Exists",
    className: "border-sky-200 bg-sky-50",
    body:
      "Settlement reviews are often rushed and opaque. MaidShield exists to make service dates, salary inputs, assumptions, and planning steps easier to review before final payment.",
  },
  {
    title: "Who It's For",
    className: "border-emerald-200 bg-emerald-50",
    body:
      "It is built for household employers, family office operators, PROs, and advisors who want a cleaner way to sense-check domestic worker closeout figures.",
  },
  {
    title: "What It Is NOT",
    className: "border-rose-200 bg-rose-50",
    body:
      "MaidShield is not legal advice, payroll outsourcing, or dispute resolution. Final settlement decisions still need to be confirmed against your records and case details.",
  },
  {
    title: "Transparency Promise",
    className: "border-amber-200 bg-amber-50",
    body:
      "Every estimate is meant to show the inputs used, service duration, assumptions, and limits clearly so you can see what is included before relying on the number.",
  },
] as const;

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

        <section aria-labelledby="about-highlights-heading" className="mt-8">
          <h2 id="about-highlights-heading" className="sr-only">
            About highlights
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {aboutCards.map((card) => (
              <Card key={card.title} className={card.className}>
                <CardContent className="space-y-3">
                  <h2 className="text-base font-semibold text-slate-900">{card.title}</h2>
                  <p className="text-sm leading-6 text-slate-700">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
