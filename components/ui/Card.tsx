import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  const classes = [
    "overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.35)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <section className={classes}>{children}</section>;
}

export function CardContent({ children, className }: CardProps) {
  const classes = ["p-6 sm:p-7", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
