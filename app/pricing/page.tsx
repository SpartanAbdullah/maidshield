import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Pricing | MaidShield",
  description:
    "Compare MaidShield Free and Pro to choose the right level of control for your household settlement workflow.",
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

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <Container className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader
            title="Pricing"
            subtitle="Start free. Upgrade when you need more control and peace of mind."
          />
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
              <form action="https://app.maidshield.com/calculator">
                <Button type="submit" variant="secondary">
                  Open calculator
                </Button>
              </form>
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
                  For households and advisors who need stronger records and repeatable workflows.
                </p>
              </div>
              <Divider />
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {proFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <form action="/pro">
                <Button type="submit">Join Pro waitlist</Button>
              </form>
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
