"use client";

import { useEffect } from "react";

import { hasAnalyticsClient, track } from "@/lib/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

function getScrollDepth() {
  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - doc.clientHeight;
  if (maxScroll <= 0) {
    return 100;
  }

  return Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
}

export function AnalyticsObserver() {
  useEffect(() => {
    if (!hasAnalyticsClient()) {
      track("analytics_delivery_missing", { reason: "plausible_not_loaded" });
    }

    const firedThresholds = new Set<number>();

    const handleScroll = () => {
      const depth = getScrollDepth();

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (depth >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold);
          track("scroll_depth_reached", { threshold });
        }
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link || !link.href) {
        return;
      }

      const destination = new URL(link.href, window.location.origin);
      if (destination.origin !== window.location.origin) {
        return;
      }

      track("internal_link_clicked", {
        destination_path: destination.pathname,
      });
    };

    const handleError = () => {
      track("front_end_error", { type: "window_error" });
    };

    const handleRejection = () => {
      track("front_end_error", { type: "unhandled_rejection" });
    };

    const handleUnload = () => {
      track("user_abandonment", { trigger: "pagehide" });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("pagehide", handleUnload);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      track("content_engagement", { seconds_on_page: 15 });
    }, 15_000);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
