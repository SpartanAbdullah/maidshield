type AnalyticsPrimitive = string | number | boolean;

type AnalyticsProps = Record<string, AnalyticsPrimitive>;

type PlausibleArgs =
  | [eventName: string]
  | [eventName: string, options: { props: AnalyticsProps }];

export type AnalyticsEventName =
  | "calc_started"
  | "calc_submitted"
  | "result_printed"
  | "result_downloaded"
  | "waitlist_signup"
  | "faq_question_opened"
  | "pricing_cta_clicked"
  | "homepage_cta_clicked"
  | "internal_link_clicked"
  | "scroll_depth_reached"
  | "content_engagement"
  | "feature_flag_exposed"
  | "feature_flag_interaction"
  | "front_end_error"
  | "analytics_delivery_missing"
  | "user_abandonment"
  | "broken_page_detected"
  | "waitlist_duplicate_submission";

declare global {
  interface Window {
    plausible?: (...args: PlausibleArgs) => void;
  }
}

function withContext(props?: AnalyticsProps): AnalyticsProps {
  if (typeof window === "undefined") {
    return { ...(props ?? {}) };
  }

  return {
    page_path: window.location.pathname,
    ...(props ?? {}),
  };
}

export function track(eventName: AnalyticsEventName | string, props?: AnalyticsProps) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.plausible !== "function") {
    return;
  }

  const contextualProps = withContext(props);

  window.plausible(eventName, { props: contextualProps });
}

export function hasAnalyticsClient() {
  if (typeof window === "undefined") {
    return false;
  }

  return typeof window.plausible === "function";
}
