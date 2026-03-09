import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";

const quickLinks = [
  {
    href: "https://app.maidshield.com/calculator",
    label: "Calculator",
    description: "Run a guided estimate",
    icon: "calculator" as const,
  },
  {
    href: "/checklist",
    label: "Checklist",
    description: "Review settlement steps",
    icon: "clipboard" as const,
  },
  {
    href: "/faq",
    label: "Help & FAQ",
    description: "Get quick answers",
    icon: "info" as const,
  },
  {
    href: "/sources",
    label: "Sources",
    description: "See assumptions used",
    icon: "shield" as const,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.92),#ffffff)] print:hidden">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_14px_24px_-20px_rgba(15,23,42,0.4)]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon name="shield" className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">MaidShield</p>
                <p className="text-xs text-slate-500">For UAE household settlement planning</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Clear, printable guidance for household employers preparing domestic worker end-of-service estimates. Use MaidShield to prepare, then confirm final figures against your records.
            </p>
            <p className="text-xs leading-5 text-slate-500">
              Planning guidance only. MaidShield does not replace legal, payroll, or professional advice for complex cases.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_16px_30px_-28px_rgba(15,23,42,0.5)] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_18px_35px_-24px_rgba(15,23,42,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Icon name={link.icon} className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{link.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Built for calm, transparent planning before final payment.</p>
          <p>Made in the UAE.</p>
        </div>
      </Container>
    </footer>
  );
}
