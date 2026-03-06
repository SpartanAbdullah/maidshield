import Link from "next/link";

import { TrackedLink } from "@/components/analytics/TrackedLink";
import { TrackedFaqItem } from "@/components/analytics/TrackedFaqItem";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { APP_BASE_URL, MARKETING_BASE_URL, buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "UAE Domestic Worker Gratuity Calculator";
const pageDescription = "Estimate UAE domestic worker gratuity with a clear breakdown, printable summary, and practical next steps for household employers.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

const faqItems = [
  { question: "Does this replace legal advice?", answer: "No. MaidShield is a planning tool that helps you review inputs and assumptions before final settlement." },
  { question: "Is login required?", answer: "No. You can use the calculator directly." },
  { question: "Do I need to upload documents?", answer: "No. The estimate flow does not require document upload." },
  { question: "Can I print the result?", answer: "Yes. You can open a print-ready summary." },
  { question: "Who is this for?", answer: "UAE household employers and assistants preparing domestic worker final settlement." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MaidShield",
  url: MARKETING_BASE_URL,
  potentialAction: { "@type": "SearchAction", target: `${APP_BASE_URL}/calculator?query={search_term_string}`, "query-input": "required name=search_term_string" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Container className="space-y-14 sm:space-y-18">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Plan UAE domestic worker gratuity in minutes</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">A calm, printable estimate tool for household employers preparing end-of-service settlement.</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">No account required. No document uploads. Transparent assumptions shown with every estimate.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <TrackedLink href={`${APP_BASE_URL}/calculator`} eventName="homepage_cta_clicked" label="hero_start_free_estimate" className={buttonClassName("primary", "md", "h-12 px-7 text-base font-semibold shadow-sm")}>Start free estimate</TrackedLink>
                <TrackedLink href="/checklist" eventName="homepage_cta_clicked" label="hero_open_checklist" className={buttonClassName("secondary")}>Use final settlement checklist</TrackedLink>
              </div>
              <p className="mt-3 text-xs text-slate-500">Planning tool only. Final settlement remains your responsibility.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Estimated Gratuity</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">AED 8,450.00</p>
              <p className="mt-2 text-sm text-slate-600">Service: 2y 4m 10d | Unpaid leave adjusted</p>
              <Divider className="my-4" />
              <p className="text-sm text-slate-600">Includes visible assumptions and a print-ready summary.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why household employers trust MaidShield</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm leading-6 text-slate-700">
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">No login required</p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">No document uploads</p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">Runs in your browser</p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">Transparent assumptions</p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card><CardContent className="space-y-2"><h2 className="text-base font-semibold text-slate-900">Who this is for</h2><p className="text-sm leading-6 text-slate-600">UAE household employers and assistants who want a structured gratuity estimate before final payment.</p></CardContent></Card>
          <Card><CardContent className="space-y-2"><h2 className="text-base font-semibold text-slate-900">Who this is not for</h2><p className="text-sm leading-6 text-slate-600">Not a legal ruling service, not payroll processing, and not a replacement for professional advice on complex cases.</p></CardContent></Card>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How it works</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3 text-sm leading-6 text-slate-600">
            <p><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">1</span>Enter dates, basic salary, and optional unpaid leave.</p>
            <p><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">2</span>Review gratuity estimate with assumptions and warnings.</p>
            <p><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">3</span>Print and compare against your records before final settlement.</p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card><CardContent className="space-y-3"><h2 className="text-base font-semibold text-slate-900">Before you finalize payment</h2><p className="text-sm leading-6 text-slate-600">Review your contract dates, salary records, leave records, and payment documents. Use the checklist for a cleaner closeout.</p><Link href="/checklist" className="text-sm font-medium text-slate-700 underline underline-offset-2">Open checklist</Link></CardContent></Card>
          <Card><CardContent className="space-y-3"><h2 className="text-base font-semibold text-slate-900">Need deeper guidance?</h2><p className="text-sm leading-6 text-slate-600">Use help content built for real household settlement planning questions.</p><div className="space-y-1 text-sm"><Link href="/faq" className="block font-medium text-slate-700 underline underline-offset-2">Help & FAQ</Link><Link href="/sources" className="block font-medium text-slate-700 underline underline-offset-2">Sources & assumptions</Link><Link href="/settlement-planning-guide" className="block font-medium text-slate-700 underline underline-offset-2">Settlement planning guide</Link></div></CardContent></Card>
        </section>

        <section aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-slate-900">Common questions</h2>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-2">
              {faqItems.map((item, index) => (
                <div key={item.question}>
                  <TrackedFaqItem question={item.question} answer={item.answer} />
                  {index < faqItems.length - 1 ? <Divider /> : null}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-600">More answers: <Link href="/faq" className="font-medium underline underline-offset-2">Help & FAQ page</Link>.</p>
          </div>
        </section>

        <section aria-labelledby="updates-heading">
          <h2 id="updates-heading" className="text-2xl font-semibold tracking-tight text-slate-900">Get updates</h2>
          <p className="mt-2 text-sm text-slate-600">No spam. Unsubscribe anytime.</p>
          <LeadCapture className="mt-6 max-w-2xl" />
        </section>
      </Container>
    </main>
  );
}
