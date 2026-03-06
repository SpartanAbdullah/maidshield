const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function isLikelyEmail(value: string) {
  return SIMPLE_EMAIL_REGEX.test(value);
}

export function hasSafeLength(value: string, maxLength: number) {
  return value.length <= maxLength;
}

export function isReasonablePathSegment(value: string) {
  return /^[a-zA-Z0-9_\-/]*$/.test(value);
}
