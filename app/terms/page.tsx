import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";

export default function TermsPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <PageHeader
          title="Terms of Use"
          subtitle="Placeholder terms for MVP. Final terms will be reviewed and versioned before release."
        />

        <Card className="mt-8">
          <CardContent>
            <p className="text-sm leading-6 text-slate-700">
              By using this MVP, users acknowledge that estimates are for
              planning purposes and are not a substitute for professional legal
              or payroll advice.
            </p>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}

