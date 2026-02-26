import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export default function Home() {
  return (
    <main className="min-h-screen py-16 sm:py-20">
      <Container>
        <PageHeader
          title="MaidShield"
          subtitle="A clear, structured workspace for domestic worker settlement and compliance estimates."
          actions={
            <>
              <Link href="/calculator" className={buttonClassName()}>
                Open Calculator
              </Link>
              <Link href="/health" className={buttonClassName("secondary")}>
                System Status
              </Link>
            </>
          }
        />

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900">
                Plan With Confidence
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate totals with transparent assumptions, jurisdiction-aware
                factors, and a clean breakdown for internal review.
              </p>
              <Divider className="my-5" />
              <ul className="space-y-3 text-sm text-slate-700">
                <li>Structured inputs designed for fast completion.</li>
                <li>Readable estimate ranges with line-item context.</li>
                <li>Export-friendly summaries for record keeping.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Preview Inputs
              </h2>
              <p className="text-sm text-slate-600">
                Standardized controls keep data entry consistent across workflows.
              </p>
              <Input
                label="Household Reference"
                placeholder="Enter internal reference"
                hint="Used only for this session unless saved later."
                leading={<span className="text-xs">ID</span>}
              />
              <Select
                label="Jurisdiction"
                defaultValue=""
                placeholder="Select location"
                options={[
                  { label: "Dubai", value: "dubai" },
                  { label: "Abu Dhabi", value: "abu-dhabi" },
                  { label: "Sharjah", value: "sharjah" },
                ]}
                hint="Rules are applied from configured regional assumptions."
              />
              <Link
                href="/calculator"
                className={buttonClassName("secondary", "md", "mt-1")}
              >
                Continue to Full Form
              </Link>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
