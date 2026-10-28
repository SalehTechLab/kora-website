/**
 * Best-effort sliding-window rate limiter, kept in process memory.
 *
 * On serverless hosts every instance has its own counters, so this slows
 * down scripted abuse but is not a hard guarantee. Pair it with a
 * platform-level rate-limit rule (Vercel WAF / Netlify) for real enforcement.
 */
const hits = new Map<string, number[]>();
const MAX_KEYS = 5_000;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Bound memory: drop the oldest keys once the map grows too large
  if (hits.size > MAX_KEYS) {
    for (const stale of hits.keys()) {
      hits.delete(stale);
      if (hits.size <= MAX_KEYS / 2) break;
    }
  }
  return true;
}

/** Client IP from the headers the hosting platform sets (not spoofable there). */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-nf-client-connection-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
