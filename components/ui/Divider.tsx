type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  const classes = ["h-px w-full bg-slate-200", className]
    .filter(Boolean)
    .join(" ");
  return <div role="separator" aria-orientation="horizontal" className={classes} />;
}

