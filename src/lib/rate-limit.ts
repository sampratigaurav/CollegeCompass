import { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();

export type RateLimitConfig = {
  limit: number; // Max requests per window
  windowMs?: number;
};

export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = { limit: 20 }
): { success: boolean; remaining: number } {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const windowMs = config.windowMs ?? RATE_LIMIT_WINDOW_MS;
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: config.limit - 1 };
  }

  if (entry.count >= config.limit) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: config.limit - entry.count };
}
