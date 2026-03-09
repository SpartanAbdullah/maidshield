import Link from "next/link";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Icon } from "@/components/ui/Icon";
import { APP_BASE_URL, buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Pricing";
const pageDescription =
  "Free for practical settlement planning. Pro waitlist for heavier repeat-case workflow and record packaging.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/pricing", "www") },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/pricing",
    base: "www",
  }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

const freeFeatures = [
  { label: "Unlimited gratuity estimates", icon: "check", colorVariant: "success" as const },
  { label: "Visible breakdown + assumptions", icon: "check", colorVariant: "success" as const },
  { label: "Print-ready summary with light fair-use limits", icon: "file", colorVariant: "neutral" as const },
  { label: "Save up to 10 scenarios in this browser", icon: "check", colorVariant: "success" as const },
  { label: "No login and no document uploads", icon: "info", colorVariant: "neutral" as const },
] as const;

const proFeatures = [
  { label: "Side-by-side scenario comparison", icon: "lightning", colorVariant: "info" as const },
  { label: "Printable settlement pack for cleaner records", icon: "file", colorVariant: "info" as const },
  { label: "Advisor-friendly export format", icon: "file", colorVariant: "info" as const },
  { label: "Repeat-case workflow for households and assistants", icon: "check", colorVariant: "success" as const },
] as const;

const faqs = [
  {
    question: "Who should stay on Free?",
    answer: "Most household employers handling occasional cases can stay on Free.",
  },
  {
    question: "What is already included today?",
    answer:
      "The live product already includes the calculator, checklist content, print-ready summaries, and local saved scenarios in the same browser.",
  },
  {
    question: "Are Pro features live today?",
    answer:
      "No. Pro is still a waitlist for planned repeat-case workflow features, and we do not promise launch dates yet.",
  },
];

const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <JsonLd data={pricingFaqJsonLd} />
      <Container className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader
            title="Pricing"
            subtitle="Keep planning free. Join the Pro waitlist only if you need heavier repeat-case workflow later."
          />
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-5">
              <div className="-mx-6 -mt-6 rounded-t-xl border-b border-slate-200 bg-slate-50 px-6 py-4 sm:-mx-8 sm:px-8">
                <Badge variant="neutral">FREE</Badge>
              </div>
              <p className="text-sm leading-6 text-slate-700">
                Best for one-off settlement planning where trust, clarity, and a quick printable estimate matter most.
              </p>
              <Divider />
              <div className="space-y-3">
                {freeFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-3">
                    <Icon name={feature.icon} colorVariant={feature.colorVariant} className="mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-sm leading-6 text-slate-700">{feature.label}</p>
                  </div>
                ))}
              </div>
              <TrackedLink
                href={`${APP_BASE_URL}/calculator`}
                eventName="pricing_cta_clicked"
                label="pricing_free_calculator"
                className={buttonClassName("secondary")}
              >
                Use free calculator
              </TrackedLink>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-5">
              <div className="-mx-6 -mt-6 rounded-t-xl border-b border-[color:var(--g-blue)]/10 bg-[var(--tint-blue)] px-6 py-4 sm:-mx-8 sm:px-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info">PRO</Badge>
                  <Badge variant="warning">Planned</Badge>
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-700">
                For repeated use where scenario comparison, record packaging, and cleaner handoff matter more than basic access.
              </p>
              <Divider />
              <div className="space-y-3">
                {proFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-3">
                    <Icon name={feature.icon} colorVariant={feature.colorVariant} className="mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-sm leading-6 text-slate-700">{feature.label}</p>
                  </div>
                ))}
              </div>
              <TrackedLink
                href="/pro"
                eventName="pricing_cta_clicked"
                label="pricing_join_pro_waitlist"
                className={buttonClassName("primary", "md", "shadow-sm")}
              >
                Join Pro waitlist
              </TrackedLink>
              <p className="text-xs text-slate-500">
                Planned workflow features only. No launch date or pricing promises yet.
              </p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Common pricing questions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {faqs.map((item) => (
                <div key={item.question} className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-900">{item.question}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Need more detail?{" "}
              <Link href="/faq" className="font-medium underline underline-offset-2">
                Read Help & FAQ
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}