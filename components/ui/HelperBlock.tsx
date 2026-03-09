import type { ComponentProps, ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

type HelperTone = "neutral" | "info" | "success" | "warning";

type HelperBlockProps = {
  title?: string;
  icon?: ComponentProps<typeof Icon>["name"];
  tone?: HelperTone;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<HelperTone, { panel: string; icon: string }> = {
  neutral: {
    panel: "border-slate-200 bg-slate-50 text-slate-700",
    icon: "bg-white text-slate-600",
  },
  info: {
    panel: "border-sky-200 bg-sky-50/90 text-sky-950",
    icon: "bg-white/80 text-sky-700",
  },
  success: {
    panel: "border-emerald-200 bg-emerald-50/90 text-emerald-950",
    icon: "bg-white/80 text-emerald-700",
  },
  warning: {
    panel: "border-amber-200 bg-amber-50/90 text-amber-950",
    icon: "bg-white/80 text-amber-700",
  },
};

export function HelperBlock({
  title,
  icon = "info",
  tone = "neutral",
  className,
  children,
}: HelperBlockProps) {
  const classes = [
    "rounded-2xl border px-4 py-4",
    toneClasses[tone].panel,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="flex items-start gap-3">
        <span
          className={[
            "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            toneClasses[tone].icon,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
        <div className="space-y-1.5">
          {title ? <p className="text-sm font-semibold">{title}</p> : null}
          <div className="text-sm leading-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
