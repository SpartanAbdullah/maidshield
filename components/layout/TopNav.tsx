"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

const navLinks = [
  { href: "/calculator", label: "Calculator" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          MaidShield
        </Link>

        <nav className="flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

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
          <Button
            className="h-9 px-3.5"
            onClick={() => router.push("/calculator")}
          >
            Start
          </Button>
        </nav>
      </Container>
    </header>
  );
}
