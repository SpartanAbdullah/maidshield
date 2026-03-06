import { NextRequest, NextResponse } from "next/server";

import { consumeRateLimit } from "@/lib/server/rateLimit";
import {
  hasSafeLength,
  isLikelyEmail,
  isReasonablePathSegment,
  normalizeString,
} from "@/lib/server/validation";

type LeadInput = {
  email?: unknown;
  name?: unknown;
  page?: unknown;
  source?: unknown;
  honey?: unknown;
};

function getRequestIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "";
  }

  return request.headers.get("x-real-ip") ?? "";
}

export async function POST(request: NextRequest) {
  let payload: LeadInput;

  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload." },
        { status: 400 },
      );
    }
    payload = parsed as LeadInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const email = normalizeString(payload.email);
  const name = normalizeString(payload.name);
  const page = normalizeString(payload.page);
  const source = normalizeString(payload.source);
  const honey = normalizeString(payload.honey);

  const requestIp = getRequestIp(request);
  const rateLimitResult = consumeRateLimit({
    key: `lead:${requestIp || "unknown"}`,
    windowMs: 60_000,
    limit: 8,
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

  if (honey) {
    return NextResponse.json({ ok: true });
  }

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email is required." },
      { status: 400 },
    );
  }

  if (!isLikelyEmail(email)) {
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

  if (name && !hasSafeLength(name, 120)) {
    return NextResponse.json(
      { ok: false, error: "Name must be 120 characters or fewer." },
      { status: 400 },
    );
  }

  if (page && (!hasSafeLength(page, 120) || !isReasonablePathSegment(page))) {
    return NextResponse.json(
      { ok: false, error: "Invalid page value." },
      { status: 400 },
    );
  }

  if (source && (!hasSafeLength(source, 120) || !isReasonablePathSegment(source))) {
    return NextResponse.json(
      { ok: false, error: "Invalid source value." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Lead capture is not configured." },
      { status: 500 },
    );
  }

  try {
    const timestamp = new Date().toISOString();
    const pageValue = page || source || "landing";

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        timestamp,
        email,
        name,
        page: pageValue,
        userAgent: request.headers.get("user-agent") ?? "",
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to forward lead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to forward lead." },
      { status: 500 },
    );
  }
}
