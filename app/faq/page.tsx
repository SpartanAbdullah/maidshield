import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
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
  { question: "What counts toward gratuity in this calculator?", answer: "MaidShield uses service dates, basic monthly salary, and optional unpaid leave days to estimate gratuity. It does not auto-add allowances, deductions, or dispute adjustments." },
  { question: "Does unpaid leave affect the estimate?", answer: "Yes. If you enter unpaid leave days, the tool reduces counted service days in the estimate." },
  { question: "Are allowances included?", answer: "Not by default. Use your case records and final advice to confirm whether any allowance treatment applies." },
  { question: "What if the service period is incomplete or there is a partial month?", answer: "The tool uses exact dates and shows service duration in years, months, days, and total adjusted days." },
  { question: "Does MaidShield replace legal advice?", answer: "No. It is a planning tool. You should still review final settlement details with your PRO, advisor, or legal professional when needed." },
  { question: "Do you store my salary, dates, or documents?", answer: "Calculator inputs run in your browser and no document upload is required for the estimate flow." },
  { question: "Can I print the result?", answer: "Yes. You can open a print-ready summary and save it as PDF for records." },
  { question: "How should I use this estimate before final settlement?", answer: "Use it as a draft amount, then compare it with your contract terms, salary records, leave records, and cancellation process documents." },
  { question: "Which documents should I review before closing a case?", answer: "Review employment dates, salary records, leave records, ID/visa documents, payment receipts, and any signed acknowledgements." },
  { question: "Is MaidShield for household employers only?", answer: "MaidShield is primarily written for UAE household employers and assistants supporting domestic worker settlement planning." },
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
      <Container className="max-w-4xl space-y-8">
        <PageHeader
          title="Help & FAQ"
          subtitle="Short answers for household employers preparing domestic worker end-of-service settlement in the UAE."
        />

        <Card>
          <CardContent className="space-y-5">
            {faqs.map((item) => (
              <section key={item.question} className="space-y-2">
                <h2 className="text-base font-semibold text-slate-900">{item.question}</h2>
                <p className="text-sm leading-6 text-slate-700">{item.answer}</p>
              </section>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
            <h2 className="text-base font-semibold text-slate-900">Useful next steps</h2>
            <p>
              Run your estimate in the <Link href="https://app.maidshield.com/calculator" className="font-medium underline underline-offset-2">calculator</Link>, then review the <Link href="/checklist" className="font-medium underline underline-offset-2">end-of-service checklist</Link>, <Link href="/sources" className="font-medium underline underline-offset-2">sources & assumptions</Link>, and <Link href="/pricing" className="font-medium underline underline-offset-2">pricing</Link> if you need workflow tools.
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
