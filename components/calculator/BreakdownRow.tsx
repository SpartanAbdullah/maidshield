type BreakdownRowTone = "neutral" | "info" | "success";

type BreakdownRowProps = {
  label: string;
  value: string;
  helper: string;
  tone?: BreakdownRowTone;
  emphasis?: boolean;
};

const toneClasses: Record<BreakdownRowTone, string> = {
  neutral: "border-slate-200 bg-white",
  info: "border-sky-200 bg-sky-50/70",
  success: "border-emerald-200 bg-emerald-50/80",
};

export function BreakdownRow({
  label,
  value,
  helper,
  tone = "neutral",
  emphasis = false,
}: BreakdownRowProps) {
  return (
    <div className={["rounded-2xl border px-4 py-3", toneClasses[tone]].join(" ")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{helper}</p>
        </div>
        <p
          className={
            emphasis
              ? "text-lg font-semibold tracking-tight text-slate-900"
              : "text-sm font-semibold text-slate-800"
          }
        >
          {value}
        </p>
      </div>
    </div>
  );
}
