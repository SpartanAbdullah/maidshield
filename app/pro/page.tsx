import type { Metadata } from "next";

import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { buildOpenGraph, buildTwitter, makeCanonical } from "@/app/seo";

const pageTitle = "Pro Waitlist";
const pageDescription = "Join the MaidShield Pro waitlist for saved scenarios, cleaner records, and faster repeat settlement planning.";

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
          <PageHeader title="MaidShield Pro waitlist" subtitle="For households and assistants who handle repeated settlement planning and want cleaner records." />
          <p className="mt-3 text-sm text-slate-600">Join to get early updates when planned workflow features become available.</p>
        </section>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900">Planned Pro workflow benefits</h2>
            <Divider className="my-4" />
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>Saved calculations for repeated use across multiple cases.</li>
              <li>Scenario comparison for quick before/after review.</li>
              <li>Advisor-friendly export format for cleaner discussions.</li>
              <li>More consistent record-keeping flow for closeout files.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">These are planned features, not guaranteed release commitments.</p>
          </CardContent>
        </Card>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Join the waitlist</h2>
            <form action="https://app.maidshield.com/calculator"><Button type="submit" variant="secondary">Use calculator now</Button></form>
          </div>
          <p className="mt-2 text-sm text-slate-600">We only send product updates related to early access and rollout windows.</p>
          <LeadCapture source="pro_waitlist" className="mt-6 max-w-2xl" />
        </section>
      </Container>
    </main>
  );
}
