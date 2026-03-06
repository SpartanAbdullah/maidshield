"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_BASE_URL, MARKETING_BASE_URL } from "@/app/seo";
import { Container } from "@/components/layout/Container";
import { buttonClassName } from "@/components/ui/Button";
import { LanguageSelectorPlaceholder } from "@/components/i18n/LanguageSelectorPlaceholder";
import { track } from "@/lib/analytics";
import { useFeatureFlag } from "@/lib/featureFlags";
import { getLocaleDictionary } from "@/lib/i18n/locales";

const navLinks = [
  {
    href: `${APP_BASE_URL}/calculator`,
    matchPath: "/calculator",
    label: "Calculator",
  },
  {
    href: `${MARKETING_BASE_URL}/pricing`,
    matchPath: "/pricing",
    label: "Pricing",
  },
  {
    href: `${MARKETING_BASE_URL}/faq`,
    matchPath: "/faq",
    label: "FAQ",
  },
  {
    href: `${MARKETING_BASE_URL}/about`,
    matchPath: "/about",
    label: "About",
  },
];

export function TopNav() {
  const pathname = usePathname();
  const useAltCta = useFeatureFlag("alternateCtaText");
  const strings = getLocaleDictionary("en");

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href={MARKETING_BASE_URL}
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          MaidShield
        </Link>

        <nav className="flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.matchPath || pathname.startsWith(`${link.matchPath}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <LanguageSelectorPlaceholder />
          <Link
            href={`${APP_BASE_URL}/calculator`}
            className={buttonClassName("primary", "md", "h-9 px-3.5")}
            onClick={() => {
              track("calc_started", { source: "top_nav" });
            }}
          >
            {useAltCta ? strings.topNavStartAltLabel : strings.topNavStartLabel}
          </Link>
        </nav>
      </Container>
    </header>
  );
}
