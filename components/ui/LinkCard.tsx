import type { ComponentProps } from "react";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";

type LinkCardTone = "slate" | "sky" | "emerald" | "amber";

type LinkCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ComponentProps<typeof Icon>["name"];
  eyebrow?: string;
  tone?: LinkCardTone;
  className?: string;
};

const toneClasses: Record<LinkCardTone, { icon: string; hover: string }> = {
  slate: {
    icon: "bg-slate-100 text-slate-700",
    hover: "hover:border-slate-300 hover:bg-slate-50",
  },
  sky: {
    icon: "bg-sky-100 text-sky-700",
    hover: "hover:border-sky-200 hover:bg-sky-50/70",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-700",
    hover: "hover:border-emerald-200 hover:bg-emerald-50/70",
  },
  amber: {
    icon: "bg-amber-100 text-amber-700",
    hover: "hover:border-amber-200 hover:bg-amber-50/70",
  },
};

export function LinkCard({
  href,
  title,
  description,
  icon,
  eyebrow,
  tone = "slate",
  className,
}: LinkCardProps) {
  const toneClass = toneClasses[tone];
  const classes = [
    "group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_16px_30px_-28px_rgba(15,23,42,0.55)] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out",
    "hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-24px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
    toneClass.hover,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      <span
        className={[
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
          toneClass.icon,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        {eyebrow ? (
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {eyebrow}
          </span>
        ) : null}
        <span className="mt-1 block text-sm font-semibold text-slate-900">{title}</span>
        <span className="mt-1.5 block text-sm leading-6 text-slate-600">{description}</span>
      </span>
      <span className="mt-1 inline-flex shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-600">
        <Icon name="arrow-right" className="h-[18px] w-[18px]" />
      </span>
    </Link>
  );
}
