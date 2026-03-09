import type { ReactNode, SVGProps } from "react";

type IconName =
  | "check"
  | "shield"
  | "info"
  | "warning"
  | "lightning"
  | "file"
  | "link"
  | "calendar"
  | "coins"
  | "users"
  | "arrow-right"
  | "clipboard"
  | "calculator"
  | "mail";
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
  calendar: (
    <>
      <path d="M7 3.5V6" />
      <path d="M17 3.5V6" />
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9.5h16" />
      <path d="M8 13h.01" />
      <path d="M12 13h.01" />
      <path d="M16 13h.01" />
      <path d="M8 16.5h.01" />
      <path d="M12 16.5h.01" />
      <path d="M16 16.5h.01" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="6.5" ry="3.25" />
      <path d="M5.5 7v5c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2V7" />
      <path d="M5.5 12v5c0 1.8 2.9 3.2 6.5 3.2s6.5-1.4 6.5-3.2v-5" />
    </>
  ),
  users: (
    <>
      <path d="M9 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M17 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M3.8 19a5.8 5.8 0 0 1 10.4 0" />
      <path d="M14.7 18a4.7 4.7 0 0 1 5.5-2.6" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15" />
      <path d="m14.5 6 5.5 6-5.5 6" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="2.5" />
      <path d="M9 4.5h6a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 9 4.5Z" />
      <path d="M9 10h6" />
      <path d="M9 13.5h6" />
      <path d="M9 17h4" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
      <path d="M8.5 7.5h7" />
      <path d="M8.5 12h2" />
      <path d="M13.5 12h2" />
      <path d="M8.5 15.5h2" />
      <path d="M13.5 15.5h2" />
      <path d="M10.5 12v7" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
      <path d="m4.5 8 7.5 5 7.5-5" />
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
