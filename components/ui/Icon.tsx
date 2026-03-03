import type { ReactNode, SVGProps } from "react";

type IconName =
  | "check"
  | "shield"
  | "info"
  | "warning"
  | "lightning"
  | "file"
  | "link";
type ColorVariant = "info" | "success" | "warning" | "danger" | "neutral";

type IconProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
  name: IconName;
  colorVariant?: ColorVariant;
};

const colorClasses: Record<ColorVariant, string> = {
  info: "text-[color:var(--g-blue)]",
  success: "text-[color:var(--g-green)]",
  warning: "text-[color:#b77900]",
  danger: "text-[color:var(--g-red)]",
  neutral: "text-slate-600",
};

const iconPaths: Record<IconName, ReactNode> = {
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2L15.8 9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5.5 6v5.2c0 4.6 2.9 7.9 6.5 9.3 3.6-1.4 6.5-4.7 6.5-9.3V6z" />
      <path d="m9.5 12 1.8 1.8L14.8 10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v5" />
      <path d="M12 7.5h.01" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4.5 20 18H4z" />
      <path d="M12 9v4.5" />
      <path d="M12 16h.01" />
    </>
  ),
  lightning: (
    <>
      <path d="M13.2 3 6.5 12h4l-1.2 9L16 12h-4.1z" />
    </>
  ),
  file: (
    <>
      <path d="M8 3.5h6l4 4V20a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 12h6" />
      <path d="M9 15h6" />
    </>
  ),
  link: (
    <>
      <path d="M10.2 13.8 8.1 16a3 3 0 1 1-4.2-4.2l2.1-2.1" />
      <path d="M13.8 10.2 15.9 8a3 3 0 0 1 4.2 4.2L18 14.3" />
      <path d="m9 15 6-6" />
    </>
  ),
};

export function Icon({
  name,
  colorVariant = "neutral",
  className,
  ...props
}: IconProps) {
  const classes = ["h-5 w-5", colorClasses[colorVariant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={classes}
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
