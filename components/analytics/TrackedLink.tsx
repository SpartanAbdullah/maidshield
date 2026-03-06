"use client";

import Link, { type LinkProps } from "next/link";
import { type PropsWithChildren } from "react";

import { track, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = PropsWithChildren<
  LinkProps & {
    className?: string;
    eventName: AnalyticsEventName;
    label?: string;
  }
>;

export function TrackedLink({
  children,
  eventName,
  label,
  className,
  ...linkProps
}: TrackedLinkProps) {
  return (
    <Link
      {...linkProps}
      className={className}
      onClick={() => {
        track(eventName, {
          cta_label: label ?? String(children),
        });
      }}
    >
      {children}
    </Link>
  );
}
