type RateLimitOptions = {
  key: string;
  windowMs: number;
  limit: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

type CounterEntry = {
  count: number;
  resetAt: number;
};

const counters = new Map<string, CounterEntry>();

export function consumeRateLimit({ key, windowMs, limit }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = counters.get(key);

  if (!existing || existing.resetAt <= now) {
    counters.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  counters.set(key, existing);
  return { allowed: true };
}
