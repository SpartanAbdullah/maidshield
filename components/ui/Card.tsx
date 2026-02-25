import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  const classes = [
    "rounded-xl border border-slate-200 bg-white shadow-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <section className={classes}>{children}</section>;
}

export function CardContent({ children, className }: CardProps) {
  const classes = ["p-6", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}

