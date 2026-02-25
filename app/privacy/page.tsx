import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

export default function PrivacyPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="Privacy Policy"
          subtitle="Placeholder policy for MVP. Final legal text will be added before production launch."
        />

        <Card className="mt-8">
          <CardContent>
            <p className="text-sm leading-6 text-slate-700">
              MaidShield is designed with data minimization in mind. This
              placeholder outlines intent only and should not be treated as the
              final published policy.
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

