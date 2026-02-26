import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-900",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100",
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