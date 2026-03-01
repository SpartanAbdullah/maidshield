import Link from "next/link";

import { MARKETING_BASE_URL } from "@/app/seo";
import { Container } from "@/components/layout/Container";

const footerLinks = [
  { href: `${MARKETING_BASE_URL}/pricing`, label: "Pricing" },
  { href: `${MARKETING_BASE_URL}/checklist`, label: "Checklist" },
  { href: `${MARKETING_BASE_URL}/sources`, label: "Sources & assumptions" },
  { href: `${MARKETING_BASE_URL}/privacy`, label: "Privacy" },
  { href: `${MARKETING_BASE_URL}/terms`, label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white print:hidden">
      <Container className="flex flex-col gap-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>MaidShield helps UAE household employers plan domestic worker settlements.</p>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
