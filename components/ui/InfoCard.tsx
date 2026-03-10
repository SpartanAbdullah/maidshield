import type { ComponentProps, ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

type InfoTone = "sky" | "emerald" | "amber" | "rose" | "slate" | "violet";

type InfoCardProps = {
  title: string;
  icon: ComponentProps<typeof Icon>["name"];
  tone?: InfoTone;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<InfoTone, { card: string; icon: string }> = {
  sky: {
    card: "border-sky-200 bg-sky-50/90",
    icon: "bg-white/80 text-sky-700",
  },
  emerald: {
    card: "border-emerald-200 bg-emerald-50/90",
    icon: "bg-white/80 text-emerald-700",
  },
  amber: {
    card: "border-amber-200 bg-amber-50/90",
    icon: "bg-white/80 text-amber-700",
  },
  rose: {
    card: "border-rose-200 bg-rose-50/90",
    icon: "bg-white/80 text-rose-700",
  },
  slate: {
    card: "border-slate-200 bg-slate-50/90",
    icon: "bg-white text-slate-700",
  },
  violet: {
    card: "border-violet-200 bg-violet-50/90",
    icon: "bg-white/80 text-violet-700",
  },
};

export function InfoCard({
  title,
  icon,
  tone = "slate",
  eyebrow,
  className,
  children,
}: InfoCardProps) {
  const toneClass = toneClasses[tone];

  return (
    <Card className={[toneClass.card, className].filter(Boolean).join(" ")}>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
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
          <div className="space-y-1.5">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>
        </div>
        <div className="text-sm leading-6 text-slate-700">{children}</div>
      </CardContent>
    </Card>
  );
}
