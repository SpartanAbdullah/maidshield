import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  containerClassName?: string;
};

export function Input({
  label,
  hint,
  error,
  leading,
  trailing,
  className,
  containerClassName,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const hasValue = String(props.value ?? "").trim().length > 0;

  const inputClasses = [
    "block h-11 w-full rounded-xl border bg-white/95 px-3 text-sm shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
    hasValue || props.type !== "date" ? "text-slate-900" : "text-slate-500",
    "placeholder:text-slate-400",
    "transition-[background-color,border-color,box-shadow] duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_24%,white)] focus:ring-offset-2 focus:ring-offset-white",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
    error ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 hover:border-slate-400",
    leading ? "pl-10" : "",
    trailing ? "pr-10" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = ["space-y-2", containerClassName].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
      ) : null}

      <div className="relative">
        {leading ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leading}
          </span>
        ) : null}

        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={inputClasses}
          {...props}
        />

        {trailing ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
            {trailing}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p id={hintId} className="text-xs leading-5 text-slate-500">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs leading-5 text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
