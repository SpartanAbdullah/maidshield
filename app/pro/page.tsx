import { LeadCapture } from "@/components/forms/LeadCapture";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";

export default function ProWaitlistPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <Container className="space-y-10">
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10 sm:py-12">
          <PageHeader
            title="MaidShield Pro Waitlist"
            subtitle="Join early access for workflow tools designed for higher-volume household and advisory operations."
          />
        </section>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900">What Pro unlocks</h2>
            <Divider className="my-4" />
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>Unlimited print exports for settlement reviews and approvals.</li>
              <li>Reusable saved scenarios for faster comparison across cases.</li>
              <li>Structured employer checklist workflows in one workspace.</li>
            </ul>
          </CardContent>
        </Card>

        <section aria-labelledby="pro-waitlist-signup">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="pro-waitlist-signup"
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              Join the Pro waitlist
            </h2>
            <form action="https://app.maidshield.com/calculator">
              <Button type="submit" variant="secondary">
                Use calculator
              </Button>
            </form>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            We will share rollout updates and onboarding windows as features
            become available.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Already using MaidShield?{" "}
            <a
              href="https://app.maidshield.com/calculator"
              className="font-medium text-slate-800 underline underline-offset-2"
            >
              Open the calculator
            </a>
            .
          </p>
          <LeadCapture source="pro_waitlist" className="mt-6 max-w-2xl" />
        </section>
      </Container>
    </main>
  );
}
