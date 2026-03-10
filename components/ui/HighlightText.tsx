import type { ReactNode } from "react";

type HighlightTone = "gradient" | "accent" | "underline";

type HighlightTextProps = {
  children: ReactNode;
  tone?: HighlightTone;
  className?: string;
};

const toneClasses: Record<HighlightTone, string> = {
  gradient:
    "bg-[linear-gradient(120deg,#1a73e8_0%,#5476ff_55%,#7a62f9_100%)] bg-clip-text text-transparent",
  accent: "text-[var(--accent)]",
  underline:
    "relative text-slate-900 after:absolute after:inset-x-0 after:bottom-[0.08em] after:-z-10 after:h-[0.5em] after:rounded-full after:bg-[color:color-mix(in_srgb,var(--accent)_14%,white)]",
};

export function HighlightText({
  children,
  tone = "gradient",
  className,
}: HighlightTextProps) {
  return <span className={[toneClasses[tone], className].filter(Boolean).join(" ")}>{children}</span>;
}
