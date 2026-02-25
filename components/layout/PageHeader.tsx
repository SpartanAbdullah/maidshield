import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  const classes = ["flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-base leading-7 text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </header>
  );
}

