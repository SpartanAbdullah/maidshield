import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { HelperBlock } from "@/components/ui/HelperBlock";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { LinkCard } from "@/components/ui/LinkCard";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "About MaidShield";
const pageDescription =
  "Why MaidShield exists, who it serves, and how it keeps settlement planning clear for UAE household employers.";

const aboutCards = [
  {
    title: "Why MaidShield exists",
    tone: "sky" as const,
    icon: "shield" as const,
    eyebrow: "Trust & scope",
    body:
      "Settlement reviews are often rushed and opaque. MaidShield exists to make service dates, salary inputs, assumptions, and planning steps easier to review before final payment.",
  },
  {
    title: "Who it is built for",
    tone: "amber" as const,
    icon: "users" as const,
    eyebrow: "Practical guidance",
    body:
      "It is built for household employers, family office operators, PROs, and advisors who want a cleaner way to sense-check domestic worker closeout figures.",
  },
  {
    title: "What it is not",
    tone: "rose" as const,
    icon: "warning" as const,
    eyebrow: "Careful wording",
    body:
      "MaidShield is not legal advice, payroll outsourcing, or dispute resolution. Final settlement decisions still need to be confirmed against your records and case details.",
  },
  {
    title: "Transparency promise",
    tone: "emerald" as const,
    icon: "info" as const,
    eyebrow: "Reassurance",
    body:
      "Every estimate is designed to show the inputs used, service duration, assumptions, and limits clearly so you can see what is included before relying on the number.",
  },
];

const productPrinciples = [
  {
    title: "Clear enough for immediate action",
    icon: "calculator" as const,
    body: "Important numbers should be easy to read, easy to question, and easy to carry into the next step.",
  },
  {
    title: "Careful enough for real cases",
    icon: "clipboard" as const,
    body: "The product uses estimate language and avoids promising final legal accuracy where the case still needs review.",
  },
  {
    title: "Simple enough to return to later",
    icon: "file" as const,
    body: "Printable summaries, checklist content, and saved scenarios are there to support preparation rather than create more admin overhead.",
  },
];

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
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="space-y-10 sm:space-y-12">
        <section className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.10),transparent_34%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.98))] px-6 py-8 sm:px-10 sm:py-12">
          <PageHeader
            title="About MaidShield"
            subtitle="A practical planning tool for UAE household employers handling domestic worker settlement calculations."
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                MaidShield focuses on planning clarity: gather the key employment inputs, apply a consistent estimate model, and present the result in a way that can be reviewed before payment.
              </p>
              <p>
                The product is intentionally lightweight. It is meant to help people prepare, compare records, and move into the next action with more confidence, not replace formal advice or payroll handling.
              </p>
            </div>
            <HelperBlock title="What we try to make easier" icon="shield" tone="neutral" className="bg-white/85">
              Review the number, understand what shaped it, and know where to go next if the case needs more checking.
            </HelperBlock>
          </div>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Built around careful trust signals
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Different parts of the page carry different jobs: reassurance, practical guidance, clear limits, and transparency about what the product is doing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {aboutCards.map((card) => (
              <InfoCard
                key={card.title}
                title={card.title}
                icon={card.icon}
                tone={card.tone}
                eyebrow={card.eyebrow}
              >
                <p>{card.body}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How the product is designed to behave</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              The goal is not to feel flashy. It is to feel considered, modern, and safe to use when someone is trying to prepare a real settlement review.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {productPrinciples.map((principle) => (
              <Card key={principle.title} className="border-slate-200 bg-slate-50/80 shadow-none">
                <CardContent className="space-y-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.45)]">
                    <Icon name={principle.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{principle.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Useful pages from here</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              If you want to see how the product works in practice, these are the best next stops.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <LinkCard
              href="https://app.maidshield.com/calculator"
              title="Open the calculator"
              description="Run an estimate with the current planning assumptions and a clearer breakdown."
              icon="calculator"
              tone="sky"
              eyebrow="Estimate"
            />
            <LinkCard
              href="/sources"
              title="Review sources & assumptions"
              description="Understand what MaidShield includes, what it excludes, and what you should still verify."
              icon="shield"
              tone="emerald"
              eyebrow="Transparency"
            />
            <LinkCard
              href="/checklist"
              title="Use the settlement checklist"
              description="Work through records, handover steps, and payment preparation before final settlement."
              icon="clipboard"
              tone="amber"
              eyebrow="Checklist"
            />
            <LinkCard
              href="/faq"
              title="Read Help & FAQ"
              description="Get practical answers to the most common questions household employers ask."
              icon="info"
              tone="slate"
              eyebrow="Guidance"
            />
          </div>
        </section>
      </Container>
    </main>
  );
}
