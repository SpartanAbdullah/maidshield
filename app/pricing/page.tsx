import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { APP_BASE_URL, buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Pricing";
const pageDescription =
  "Compare MaidShield Free and Pro options for UAE household employers who need clear settlement estimates and stronger records.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/pricing", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/pricing",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

const freeFeatures = [
  "Unlimited estimates",
  "Breakdown + assumptions",
  "Share link",
  "Print summary (limited)",
];

const proFeatures = [
  "Unlimited prints",
  "Saved scenarios (multiple workers/cases)",
  "Export-ready printable records",
  "Priority updates and improvements",
];

const faqs = [
  {
    question: "Is the free calculator enough?",
    answer: "Yes, for most one-off checks and routine planning reviews.",
  },
  {
    question: "When will Pro launch?",
    answer: "The rollout timing will depend on waitlist demand and feedback.",
  },
  {
    question: "Do you store my data?",
    answer: "No documents are required, and no account is needed for core calculator use.",
  },
];

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "MaidShield Pricing",
  url: makeCanonical("/pricing", "www"),
  description: pageDescription,
  about: {
    "@type": "SoftwareApplication",
    name: "MaidShield",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <JsonLd data={pricingJsonLd} />

      <Container className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader
            title="Pricing"
            subtitle="Start free. Upgrade when you need more control and peace of mind."
          />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
            Free is designed for UAE household employers handling one-off
            end-of-service checks. Pro is for repeat cases, stronger records,
            and teams that want a steadier workflow.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Free
                </p>
                <p className="text-sm leading-6 text-slate-700">
                  Best for one-off checks and everyday household planning.
                </p>
              </div>
              <Divider />
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {freeFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                href={`${APP_BASE_URL}/calculator`}
                className={buttonClassName("secondary")}
              >
                Open calculator
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                    Pro
                  </p>
                  <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                    Coming soon
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700">
                  For households and advisors who need stronger records and
                  repeatable workflows.
                </p>
              </div>
              <Divider />
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {proFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link href="/pro" className={buttonClassName()}>
                Join Pro waitlist
              </Link>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Common questions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <div key={item.question} className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-900">{item.question}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
