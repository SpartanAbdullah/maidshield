"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_BASE_URL, MARKETING_BASE_URL } from "@/app/seo";
import { LanguageSelectorPlaceholder } from "@/components/i18n/LanguageSelectorPlaceholder";
import { Container } from "@/components/layout/Container";
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
  const ctaLabel = useAltCta ? strings.topNavStartAltLabel : "Start calculation";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl print:hidden">
      <Container className="py-3 sm:py-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-4 lg:gap-6">
          <Link
            href={MARKETING_BASE_URL}
            className="inline-flex shrink-0 items-center gap-3 rounded-full px-2 py-1.5 text-slate-900 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1a73e8,#4f7cff)] text-white shadow-[0_16px_28px_-18px_rgba(26,115,232,0.72)]">
              <Icon name="shield" className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight">MaidShield</span>
              <span className="block text-xs text-slate-500">UAE settlement guidance</span>
            </span>
          </Link>

          <div className="order-3 w-full md:order-2 md:flex-1">
            <nav
              className="flex min-w-max items-center gap-1.5 overflow-x-auto rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-[0_16px_28px_-26px_rgba(15,23,42,0.25)] md:mx-auto md:w-fit md:overflow-visible"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.matchPath || pathname.startsWith(`${link.matchPath}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "rounded-full border px-3.5 py-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                      isActive
                        ? "border-[color:color-mix(in_srgb,var(--accent)_18%,white)] bg-[color:color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--accent)] shadow-[0_12px_24px_-20px_rgba(26,115,232,0.45)]"
                        : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="order-2 ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:order-3">
            <div className="hidden lg:block">
              <LanguageSelectorPlaceholder />
            </div>
            <Link
              href={`${APP_BASE_URL}/calculator`}
              className={buttonClassName("primary", "md", "h-10 px-4 sm:px-5")}
              onClick={() => {
                track("calc_started", { source: "top_nav" });
              }}
            >
              {ctaLabel}
            </Link>
          </div>

          <div className="order-4 w-full sm:hidden">
            <LanguageSelectorPlaceholder />
          </div>
        </div>
      </Container>
    </header>
  );
}
