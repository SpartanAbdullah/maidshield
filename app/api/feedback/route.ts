import { NextRequest, NextResponse } from "next/server";

import { consumeRateLimit } from "@/lib/server/rateLimit";
import {
  hasSafeLength,
  isLikelyEmail,
  normalizeString,
} from "@/lib/server/validation";

type FeedbackInput = {
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function getRequestIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "";
  }

  return request.headers.get("x-real-ip") ?? "";
}

export async function POST(request: NextRequest) {
  let payload: FeedbackInput;

  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload." },
        { status: 400 },
      );
    }
    payload = parsed as FeedbackInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const email = normalizeString(payload.email);
  const message = normalizeString(payload.message);
  const company = normalizeString(payload.company);

  const requestIp = getRequestIp(request);
  const rateLimitResult = consumeRateLimit({
    key: `feedback:${requestIp || "unknown"}`,
    windowMs: 60_000,
    limit: 6,
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds ?? 60),
        },
      },
    );
  }

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Message is required." },
      { status: 400 },
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please enter at least 10 characters." },
      { status: 400 },
    );
  }

  if (!hasSafeLength(message, 2000)) {
    return NextResponse.json(
      { ok: false, error: "Message must be 2000 characters or fewer." },
      { status: 400 },
    );
  }

  if (email && !isLikelyEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!hasSafeLength(email, 120)) {
    return NextResponse.json(
      { ok: false, error: "Email must be 120 characters or fewer." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Feedback capture is not configured." },
      { status: 500 },
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        type: "feedback",
        sheet: "Feedback",
        timestamp: new Date().toISOString(),
        email,
        message,
        page: "sources",
        userAgent: request.headers.get("user-agent") ?? "",
        ip: requestIp,
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to forward feedback." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to forward feedback." },
      { status: 500 },
    );
  }
}
