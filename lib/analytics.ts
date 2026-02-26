type AnalyticsProps = Record<string, string | number | boolean>;

type PlausibleArgs =
  | [eventName: string]
  | [eventName: string, options: { props: AnalyticsProps }];

declare global {
  interface Window {
    plausible?: (...args: PlausibleArgs) => void;
  }
}

export function track(eventName: string, props?: AnalyticsProps) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.plausible !== "function") {
    return;
  }

  if (props) {
    window.plausible(eventName, { props });
    return;
  }

  window.plausible(eventName);
}
