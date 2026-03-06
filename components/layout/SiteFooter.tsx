import Link from "next/link";

import { MARKETING_BASE_URL } from "@/app/seo";
import { Container } from "@/components/layout/Container";
import { getLocaleDictionary } from "@/lib/i18n/locales";

const footerLinks = [
  { href: `${MARKETING_BASE_URL}/pricing`, label: "Pricing" },
  { href: `${MARKETING_BASE_URL}/checklist`, label: "Checklist" },
  { href: `${MARKETING_BASE_URL}/sources`, label: "Sources & assumptions" },
  { href: `${MARKETING_BASE_URL}/faq`, label: "FAQ" },
  { href: `${MARKETING_BASE_URL}/settlement-planning-guide`, label: "Planning guide" },
  { href: `${MARKETING_BASE_URL}/privacy`, label: "Privacy" },
  { href: `${MARKETING_BASE_URL}/terms`, label: "Terms" },
];

export function SiteFooter() {
  const strings = getLocaleDictionary("en");

  return (
    <footer className="border-t border-slate-200 bg-white print:hidden">
      <Container className="py-8 text-sm text-slate-600">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>{strings.footerTagline}</p>
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
        </div>
        <p className="mt-5 flex justify-center text-xs text-slate-500">
          Made with 💖 in 🇦🇪
        </p>
      </Container>
    </footer>
  );
}
