import type { Metadata } from "next";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Pro Waitlist";
const pageDescription =
  "Join the MaidShield Pro waitlist for repeat-case workflow, cleaner record packaging, and stronger scenario review tools.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: makeCanonical("/pro", "www") },
  openGraph: buildOpenGraph({ title: pageTitle, description: pageDescription, path: "/pro", base: "www" }),
  twitter: buildTwitter({ title: pageTitle, description: pageDescription }),
};

export default function ProWaitlistPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <Container className="space-y-10">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader
            title="MaidShield Pro waitlist"
            subtitle="For people who handle repeated settlement planning and want stronger workflow support, not basic calculator access."
          />
          <p className="mt-3 text-sm text-slate-600">
            Today, the free product already covers estimation, print-ready summaries, and local saved scenarios. Pro is intended for heavier repeat-case workflow once those tools are ready.
          </p>
        </section>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900">Planned Pro workflow benefits</h2>
            <Divider className="my-4" />
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>Side-by-side scenario comparison for before/after review.</li>
              <li>Printable settlement pack for cleaner employer records.</li>
              <li>Advisor-friendly export format for handoff and review.</li>
              <li>Repeat-case workflow support for households, assistants, and family offices.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              These are planned workflow features, not guaranteed release commitments.
            </p>
          </CardContent>
        </Card>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Join the waitlist</h2>
            <form action="https://app.maidshield.com/calculator">
              <Button type="submit" variant="secondary">Use calculator now</Button>
            </form>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            We only send product updates related to early access and rollout windows.
          </p>
          <LeadCapture source="pro_waitlist" intent="pro_features" className="mt-6 max-w-2xl" />
        </section>
      </Container>
    </main>
  );
}