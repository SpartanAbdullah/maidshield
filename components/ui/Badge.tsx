import type { HTMLAttributes } from "react";

type BadgeVariant = "info" | "success" | "warning" | "danger" | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  info:
    "border-[color:var(--g-blue)]/20 bg-[var(--tint-blue)] text-[color:var(--g-blue)]",
  success:
    "border-[color:var(--g-green)]/20 bg-[var(--tint-green)] text-[color:var(--g-green)]",
  warning:
    "border-[color:var(--g-yellow)]/30 bg-[var(--tint-yellow)] text-[color:#b77900]",
  danger:
    "border-[color:var(--g-red)]/20 bg-[var(--tint-red)] text-[color:var(--g-red)]",
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  const classes = [
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
