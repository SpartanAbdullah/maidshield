import Link from "next/link";
import type { Metadata } from "next";

import { TrackedFaqItem } from "@/components/analytics/TrackedFaqItem";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { HelperBlock } from "@/components/ui/HelperBlock";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { LinkCard } from "@/components/ui/LinkCard";
import {
  APP_BASE_URL,
  MARKETING_BASE_URL,
  buildOpenGraph,
  buildTwitter,
  makeCanonical,
} from "@/app/seo";

const pageTitle = "UAE Domestic Worker Gratuity Calculator";
const pageDescription =
  "Estimate UAE domestic worker gratuity with a clear breakdown, printable summary, and practical next steps for household employers.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/", "www") },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/",
    base: "www",
  }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

const faqItems = [
  {
    question: "Does this replace legal advice?",
    answer:
      "No. MaidShield is a planning tool that helps you review inputs and assumptions before final settlement.",
  },
  { question: "Is login required?", answer: "No. You can use the calculator directly." },
  {
    question: "Do I need to upload documents?",
    answer: "No. The estimate flow does not require document upload.",
  },
  {
    question: "Can I print the result?",
    answer: "Yes. You can open a print-ready summary.",
  },
  {
    question: "Who is this for?",
    answer:
      "UAE household employers and assistants preparing domestic worker final settlement.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MaidShield",
  url: MARKETING_BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${APP_BASE_URL}/calculator?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const trustCards = [
  {
    title: "Built for calm decision-making",
    icon: "shield" as const,
    tone: "sky" as const,
    body:
      "See the inputs, assumptions, and warnings in one place before money moves.",
  },
  {
    title: "No account or upload barrier",
    icon: "check" as const,
    tone: "emerald" as const,
    body:
      "Open the calculator immediately without login friction or document collection.",
  },
  {
    title: "Guided for real household cases",
    icon: "users" as const,
    tone: "amber" as const,
    body:
      "The experience is written for UAE household employers preparing a practical settlement review.",
  },
  {
    title: "Printable when you are ready",
    icon: "file" as const,
    tone: "slate" as const,
    body:
      "Generate a shareable summary after you check dates, salary basis, and unpaid leave inputs.",
  },
];

const stepCards = [
  {
    title: "Enter the core case details",
    icon: "calendar" as const,
    body:
      "Start with the contract start date, final working date, and the salary basis you want to test.",
  },
  {
    title: "Review the estimate structure",
    icon: "coins" as const,
    body:
      "MaidShield shows service days, salary basis, adjustments, and the estimate formula in plain English.",
  },
  {
    title: "Prepare the next action",
    icon: "clipboard" as const,
    body:
      "Use the checklist, FAQ, and sources pages before confirming final settlement against your records.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Container className="space-y-12 sm:space-y-14">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.12),transparent_38%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.98))] px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <Badge variant="info">Planning guidance for UAE household employers</Badge>
              <h1 className="mt-4 max-w-2xl text-pretty text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Plan domestic worker end-of-service settlement with more clarity.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Estimate gratuity, review the structure behind the number, and move into your next settlement steps without feeling rushed.
              </p>
              <HelperBlock title="What you can do in a few minutes" icon="calculator" tone="neutral" className="mt-6 max-w-2xl bg-white/80">
                Start with dates and basic salary, see a clearer estimate breakdown, then print or compare it against your records before final payment.
              </HelperBlock>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <TrackedLink
                  href={`${APP_BASE_URL}/calculator`}
                  eventName="homepage_cta_clicked"
                  label="hero_start_free_estimate"
                  className={buttonClassName("primary", "md", "h-12 px-7 text-base font-semibold")}
                >
                  Start free estimate
                </TrackedLink>
                <TrackedLink
                  href="/checklist"
                  eventName="homepage_cta_clicked"
                  label="hero_open_checklist"
                  className={buttonClassName("secondary", "md", "h-12 px-6 text-base")}
                >
                  Open settlement checklist
                </TrackedLink>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">No login required</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">No document uploads</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Printable summary</span>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                MaidShield is a planning tool. Final settlement remains your responsibility and should be confirmed against your records.
              </p>
            </div>

            <Card className="border-slate-200/90 bg-white/90">
              <CardContent className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Sample estimate preview</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                      How the result is presented
                    </h2>
                  </div>
                  <Badge variant="neutral">Preview</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700">
                        <Icon name="calendar" className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Service period</p>
                        <p className="text-xs text-slate-500">2y 4m 10d shown clearly in the summary</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">852 days</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700">
                        <Icon name="coins" className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Salary basis</p>
                        <p className="text-xs text-slate-500">Monthly salary and daily wage used in the estimate</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">AED 2,300</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-sky-200 bg-sky-50/80 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-700">
                        <Icon name="info" className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Adjustments</p>
                        <p className="text-xs text-slate-500">Unpaid leave and assumptions remain visible</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-sky-700">12 days</p>
                  </div>
                </div>

                <Divider />

                <div className="rounded-[24px] bg-slate-900 px-5 py-5 text-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.8)]">
                  <p className="text-sm text-slate-300">Estimated gratuity</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight">AED 8,450.00</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Presented as an estimate based on your inputs, with a breakdown to help you review the figure before final settlement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Designed to feel trustworthy before money moves
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Every part of the experience is meant to reduce guesswork: clear inputs, careful wording, visible assumptions, and obvious next steps.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustCards.map((card) => (
              <InfoCard key={card.title} title={card.title} icon={card.icon} tone={card.tone}>
                <p>{card.body}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How the flow guides you</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                The calculator is built for fast preparation, but the result is presented slowly enough to review with care.
              </p>
            </div>
            <p className="text-sm text-slate-500">Best prepared with contract dates, salary basis, and leave records nearby.</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {stepCards.map((step, index) => (
              <Card key={step.title} className="border-slate-200 bg-slate-50/80 shadow-none">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-[0_12px_22px_-20px_rgba(15,23,42,0.55)]">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Step {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Move to the right next step quickly</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              These pages are designed as practical follow-ons, so they now read like destinations instead of plain text links.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LinkCard
              href="/checklist"
              title="Final settlement checklist"
              description="Review documents, salary records, handover tasks, and final payment steps in one place."
              icon="clipboard"
              eyebrow="Checklist"
              tone="sky"
            />
            <LinkCard
              href="/faq"
              title="Help & FAQ"
              description="Get short answers to the questions household employers ask most often before closing a case."
              icon="info"
              eyebrow="Guidance"
              tone="emerald"
            />
            <LinkCard
              href="/sources"
              title="Sources & assumptions"
              description="See what MaidShield includes, what it excludes, and what you should still verify yourself."
              icon="shield"
              eyebrow="Transparency"
              tone="amber"
            />
            <LinkCard
              href="/settlement-planning-guide"
              title="Settlement planning guide"
              description="Open a short planning flow you can use before the final transfer or signature step."
              icon="file"
              eyebrow="Printable"
              tone="slate"
            />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <InfoCard title="Best for" icon="users" tone="emerald">
            <p>
              UAE household employers, assistants, and family office operators who want a cleaner way to prepare a gratuity estimate before final settlement.
            </p>
          </InfoCard>
          <InfoCard title="Use with care" icon="warning" tone="amber">
            <p>
              MaidShield is not a legal ruling service, payroll outsourcing workflow, or dispute-resolution tool. Use it as guidance, then confirm the final position with your records and advisors where needed.
            </p>
          </InfoCard>
        </section>

        <section aria-labelledby="faq-heading" className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="max-w-3xl">
            <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
              Common questions
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Short answers for the questions people usually want settled before they rely on an estimate.
            </p>
          </div>
          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/70 px-6 py-2">
            {faqItems.map((item, index) => (
              <div key={item.question}>
                <TrackedFaqItem question={item.question} answer={item.answer} />
                {index < faqItems.length - 1 ? <Divider /> : null}
              </div>
            ))}
          </div>
          <div className="mt-5 max-w-md">
            <LinkCard
              href="/faq"
              title="Open the full Help & FAQ page"
              description="See more detailed answers before you finalize documents or payment steps."
              icon="info"
              tone="slate"
            />
          </div>
        </section>

        <section aria-labelledby="updates-heading" className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="max-w-3xl">
            <h2 id="updates-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
              Stay in the loop
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Share your email if you want product updates, workflow improvements, or future guidance launches. No spam.
            </p>
          </div>
          <LeadCapture className="mt-6 max-w-3xl" />
        </section>
      </Container>
    </main>
  );
}
