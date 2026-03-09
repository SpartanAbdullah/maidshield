"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_BASE_URL, MARKETING_BASE_URL } from "@/app/seo";
import { Container } from "@/components/layout/Container";
import { LanguageSelectorPlaceholder } from "@/components/i18n/LanguageSelectorPlaceholder";
import { buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur print:hidden">
      <Container className="py-3 sm:py-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={MARKETING_BASE_URL}
              className="inline-flex items-center gap-3 rounded-full px-2 py-1.5 text-slate-900 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_14px_24px_-18px_rgba(15,23,42,0.7)]">
                <Icon name="shield" className="h-5 w-5 text-white" />
              </span>
              <span>
                <span className="block text-base font-semibold tracking-tight">MaidShield</span>
                <span className="block text-xs text-slate-500">UAE settlement guidance</span>
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <LanguageSelectorPlaceholder />
              </div>
              <Link
                href={`${APP_BASE_URL}/calculator`}
                className={buttonClassName("primary", "md", "h-10 px-4")}
                onClick={() => {
                  track("calc_started", { source: "top_nav" });
                }}
              >
                {useAltCta ? strings.topNavStartAltLabel : strings.topNavStartLabel}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:justify-between sm:overflow-visible sm:pb-0">
            <nav className="flex min-w-max items-center gap-1.5" aria-label="Primary navigation">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.matchPath || pathname.startsWith(`${link.matchPath}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                      isActive
                        ? "bg-slate-900 text-white shadow-[0_14px_24px_-18px_rgba(15,23,42,0.6)]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="sm:hidden">
              <LanguageSelectorPlaceholder />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
