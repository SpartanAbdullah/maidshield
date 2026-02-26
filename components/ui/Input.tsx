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

  const inputClasses = [
    "block h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900",
    "placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white",
    "disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
    error ? "border-rose-400 focus:ring-rose-200" : "border-slate-300 hover:border-slate-400",
    leading ? "pl-10" : "",
    trailing ? "pr-10" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = ["space-y-1.5", containerClassName].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
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
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}