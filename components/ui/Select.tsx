import type { ReactNode, SelectHTMLAttributes } from "react";
import { useId } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  containerClassName?: string;
  children?: ReactNode;
};

export function Select({
  label,
  hint,
  error,
  placeholder,
  options,
  id,
  containerClassName,
  className,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const wrapperClasses = ["space-y-1.5", containerClassName]
    .filter(Boolean)
    .join(" ");
  const selectClasses = [
    "block h-10 w-full appearance-none rounded-lg border bg-white px-3 pr-10 text-sm text-slate-900",
    "focus:outline-none focus:ring-2 focus:ring-slate-300",
    error ? "border-rose-400 focus:ring-rose-200" : "border-slate-300",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      {label ? (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={selectClasses}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.116l3.71-3.886a.75.75 0 1 1 1.08 1.04l-4.25 4.45a.75.75 0 0 1-1.08 0l-4.25-4.45a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
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

