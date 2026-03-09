import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { HelperBlock } from "@/components/ui/HelperBlock";
import { LinkCard } from "@/components/ui/LinkCard";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Help & FAQ";
const pageDescription =
  "Practical MaidShield FAQ for UAE household employers preparing domestic worker end-of-service settlement.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: makeCanonical("/faq", "www"),
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/faq",
    base: "www",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

const faqs = [
  {
    question: "What counts toward gratuity in this calculator?",
    answer:
      "MaidShield uses service dates, basic monthly salary, and optional unpaid leave days to estimate gratuity. It does not auto-add allowances, deductions, or dispute adjustments.",
  },
  {
    question: "Does unpaid leave affect the estimate?",
    answer:
      "Yes. If you enter unpaid leave days, the tool reduces counted service days in the estimate.",
  },
  {
    question: "Are allowances included?",
    answer:
      "Not by default. Use your case records and final advice to confirm whether any allowance treatment applies.",
  },
  {
    question: "What if the service period is incomplete or there is a partial month?",
    answer:
      "The tool uses exact dates and shows service duration in years, months, days, and total adjusted days.",
  },
  {
    question: "Does MaidShield replace legal advice?",
    answer:
      "No. It is a planning tool. You should still review final settlement details with your PRO, advisor, or legal professional when needed.",
  },
  {
    question: "Do you store my salary, dates, or documents?",
    answer:
      "Calculator inputs run in your browser and no document upload is required for the estimate flow.",
  },
  {
    question: "Can I save more than one case?",
    answer:
      "Yes. The calculator can save up to 10 scenarios in the same browser on the same device. They are local drafts, not cloud-synced records.",
  },
  {
    question: "Can I print the result?",
    answer:
      "Yes. You can open a print-ready summary and save it as PDF for records. Free use is meant for light planning volume.",
  },
  {
    question: "How should I use this estimate before final settlement?",
    answer:
      "Use it as a draft amount, then compare it with your contract terms, salary records, leave records, and cancellation process documents.",
  },
  {
    question: "Which documents should I review before closing a case?",
    answer:
      "Review employment dates, salary records, leave records, ID or visa documents, payment receipts, and any signed acknowledgements.",
  },
  {
    question: "Is MaidShield for household employers only?",
    answer:
      "MaidShield is primarily written for UAE household employers and assistants supporting domestic worker settlement planning.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <JsonLd data={faqJsonLd} />
      <Container className="max-w-5xl space-y-8">
        <PageHeader
          title="Help & FAQ"
          subtitle="Short answers for household employers preparing domestic worker end-of-service settlement in the UAE."
        />

        <HelperBlock title="How to use this page" icon="info" tone="neutral">
          Start here when you want a quick answer before trusting an estimate. If the case still looks unusual, compare the answer with your own records and supporting documents.
        </HelperBlock>

        <Card>
          <CardContent className="space-y-5">
            {faqs.map((item) => (
              <section key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">{item.question}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</p>
              </section>
            ))}
          </CardContent>
        </Card>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Useful next steps</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              These follow-on pages are now laid out like clear destinations so you can move straight into the next task.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LinkCard
              href="https://app.maidshield.com/calculator"
              title="Open calculator"
              description="Run a planning estimate with the current guidance flow and breakdown view."
              icon="calculator"
              tone="sky"
              eyebrow="Estimate"
            />
            <LinkCard
              href="/checklist"
              title="End-of-service checklist"
              description="Review records, handover steps, and payment preparation before the final transfer."
              icon="clipboard"
              tone="emerald"
              eyebrow="Checklist"
            />
            <LinkCard
              href="/sources"
              title="Sources & assumptions"
              description="See what MaidShield includes in the estimate and what still needs separate review."
              icon="shield"
              tone="amber"
              eyebrow="Transparency"
            />
            <LinkCard
              href="/pricing"
              title="Pricing"
              description="Understand what stays free today and what the planned Pro workflow is meant to cover."
              icon="coins"
              tone="slate"
              eyebrow="Product"
            />
          </div>
        </section>
      </Container>
    </main>
  );
}
