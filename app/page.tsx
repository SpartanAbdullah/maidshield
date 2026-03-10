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
import { HighlightText } from "@/components/ui/HighlightText";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { InlineTextLink } from "@/components/ui/InlineTextLink";
import { LinkCard } from "@/components/ui/LinkCard";
import { RotatingHeadline } from "@/components/ui/RotatingHeadline";
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

const rotatingRoles = ["maid", "nanny", "driver", "cook", "housekeeper", "caregiver"];

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
    title: "Guided before payment",
    icon: "shield" as const,
    tone: "sky" as const,
    body: "See the inputs, assumptions, and estimate structure before you rely on the number.",
  },
  {
    title: "No account required",
    icon: "check" as const,
    tone: "emerald" as const,
    body: "Open the calculator immediately without login friction or document collection.",
  },
  {
    title: "Built for household cases",
    icon: "users" as const,
    tone: "amber" as const,
    body: "Written for UAE household employers handling a practical settlement review.",
  },
  {
    title: "Ready to print",
    icon: "file" as const,
    tone: "violet" as const,
    body: "When the inputs look right, move into a printable estimate summary and next-step guidance.",
  },
];

const stepCards = [
  {
    title: "Enter the key case details",
    icon: "calendar" as const,
    tone: "sky" as const,
    body: "Start with contract dates, basic salary, and any unpaid leave you want reflected in the estimate.",
  },
  {
    title: "Review the structure behind the figure",
    icon: "coins" as const,
    tone: "violet" as const,
    body: "MaidShield breaks the estimate into service, salary basis, adjustments, and final gratuity guidance.",
  },
  {
    title: "Move into the right next step",
    icon: "clipboard" as const,
    tone: "amber" as const,
    body: "Use the checklist, sources, and FAQ to prepare before final payment or discussion with an advisor.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Container className="space-y-12 sm:space-y-16">
        <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.14),transparent_36%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.98))] px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <Badge variant="info">Built for UAE household employer planning</Badge>
              <h1 className="mt-4 max-w-3xl text-pretty text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                Calculate your{" "}
                <span className="sr-only">domestic worker</span>
                <RotatingHeadline
                  words={rotatingRoles}
                  className="bg-[linear-gradient(120deg,#1a73e8_0%,#5476ff_55%,#7a62f9_100%)] bg-clip-text text-transparent"
                />{" "}
                settlement in <HighlightText>seconds</HighlightText>.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Estimate end-of-service gratuity and review a calmer, clearer breakdown based on the details you provide.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <TrackedLink
                  href={`${APP_BASE_URL}/calculator`}
                  eventName="homepage_cta_clicked"
                  label="hero_start_calculation"
                  className={buttonClassName("primary", "md", "h-12 px-7 text-base font-semibold")}
                >
                  Start calculation
                </TrackedLink>
                <TrackedLink
                  href="/how-gratuity-estimates-work"
                  eventName="homepage_cta_clicked"
                  label="hero_see_how_it_works"
                  className={buttonClassName("secondary", "md", "h-12 px-6 text-base")}
                >
                  See how it works
                </TrackedLink>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <Icon name="shield" className="h-4 w-4 text-sky-600" />
                  Built for UAE household employer planning
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="info" className="h-4 w-4 text-emerald-600" />
                  Fast estimate based on the details you provide
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Prefer to read first? <InlineTextLink href="/faq">View common questions</InlineTextLink> or <InlineTextLink href="/about">learn what MaidShield is for</InlineTextLink>.
              </p>
            </div>

            <Card className="border-slate-200/90 bg-white/90">
              <CardContent className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Guided estimate snapshot</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                      Review the structure, not just the number
                    </h2>
                  </div>
                  <Badge variant="neutral">Preview</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                        <Icon name="calendar" className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Service period</p>
                        <p className="text-xs text-slate-500">Contract dates are shown clearly before the estimate is used</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">852 days</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                        <Icon name="coins" className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Salary basis</p>
                        <p className="text-xs text-slate-500">Monthly salary and daily wage stay visible inside the breakdown</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">AED 2,300</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-700">
                        <Icon name="info" className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Adjustments & warnings</p>
                        <p className="text-xs text-slate-500">Unpaid leave and estimate assumptions remain easy to spot</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-amber-700">12 days</p>
                  </div>
                </div>

                <Divider />

                <div className="rounded-[24px] bg-[linear-gradient(145deg,#0f172a,#1e293b)] px-5 py-5 text-white shadow-[0_24px_45px_-32px_rgba(15,23,42,0.8)]">
                  <p className="text-sm text-slate-300">Estimated gratuity</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight">AED 8,450.00</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Presented as an estimate based on your inputs, with enough context to help you prepare before final settlement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              A <HighlightText tone="accent">trust-first</HighlightText> product system for real household cases
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Every part of the experience is meant to reduce guesswork: stronger inputs, calmer wording, visible assumptions, and clearer next actions.
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
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                How the flow helps you <HighlightText tone="underline">move forward calmly</HighlightText>
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                The calculator is built for speed, but the explanation is laid out slowly enough to review with care.
              </p>
            </div>
            <p className="text-sm text-slate-500">Best prepared with contract dates, salary basis, and leave records nearby.</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {stepCards.map((step, index) => (
              <InfoCard key={step.title} title={step.title} icon={step.icon} tone={step.tone} eyebrow={`Step ${index + 1}`} className="shadow-none">
                <p>{step.body}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Start from the <HighlightText tone="accent">right destination</HighlightText>
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Where a plain link would feel easy to miss, MaidShield now uses stronger linked cards so the next page feels obvious.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LinkCard
              href={`${APP_BASE_URL}/calculator`}
              title="Calculator"
              description="Open the estimate flow and enter your settlement details immediately."
              icon="calculator"
              eyebrow="Start here"
              tone="sky"
            />
            <LinkCard
              href="/faq"
              title="Help & FAQ"
              description="Read short answers to the questions household employers usually ask first."
              icon="info"
              eyebrow="Questions"
              tone="emerald"
            />
            <LinkCard
              href="/about"
              title="About MaidShield"
              description="See who the product is for, how it stays careful, and what it does not promise."
              icon="shield"
              eyebrow="Trust"
              tone="violet"
            />
            <LinkCard
              href="/checklist"
              title="Settlement checklist"
              description="Move from a draft estimate into records, handover, and final payment preparation."
              icon="clipboard"
              eyebrow="Next step"
              tone="amber"
            />
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="max-w-3xl">
            <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
              Common questions before you rely on an estimate
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Short answers for the questions people usually want settled before they move into paperwork or payment.
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
            <h2 id="updates-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Stay in the loop without extra clutter
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
