import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[transform,background-color,border-color,color,box-shadow,filter] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--accent),color-mix(in_srgb,var(--accent)_82%,#0f172a))] text-white shadow-[0_20px_32px_-22px_rgba(26,115,232,0.7)] hover:-translate-y-px hover:text-white hover:brightness-[1.02] active:translate-y-0 active:text-white active:brightness-95",
  secondary:
    "border border-slate-200 bg-white text-slate-800 shadow-[0_14px_24px_-24px_rgba(15,23,42,0.45)] hover:-translate-y-px hover:border-slate-300 hover:bg-slate-50 active:translate-y-0 active:bg-slate-100",
  ghost:
    "bg-transparent text-slate-800 hover:bg-slate-100 active:bg-slate-200",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    const classes = buttonClassName(variant, size, className);
    return <button ref={ref} type={type} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
