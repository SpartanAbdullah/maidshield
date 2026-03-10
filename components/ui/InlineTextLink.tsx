import type { ReactNode } from "react";
import Link from "next/link";

type InlineTextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function InlineTextLink({ href, children, className }: InlineTextLinkProps) {
  return (
    <Link
      href={href}
      className={[
        "font-medium text-[var(--accent)] underline decoration-[color:color-mix(in_srgb,var(--accent)_32%,white)] underline-offset-4 transition-colors duration-200 ease-out hover:text-slate-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
