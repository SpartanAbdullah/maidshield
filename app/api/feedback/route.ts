import { NextRequest, NextResponse } from "next/server";

type FeedbackInput = {
  email?: unknown;
  message?: unknown;
  company?: unknown;
  source?: unknown;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let payload: FeedbackInput;

  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }
    payload = parsed as FeedbackInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const email = normalizeString(payload.email);
  const message = normalizeString(payload.message);
  const company = normalizeString(payload.company);
  const source = normalizeString(payload.source);

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Message is required." },
      { status: 400 }
    );
  }

  if (message.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "Message must be 2000 characters or fewer." },
      { status: 400 }
    );
  }

  if (email && !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Email must include @." },
      { status: 400 }
    );
  }

  if (email.length > 120) {
    return NextResponse.json(
      { ok: false, error: "Email must be 120 characters or fewer." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Feedback capture is not configured." },
      { status: 500 }
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        kind: "feedback",
        sheet: "feedback",
        email,
        message,
        source: source || "sources-page",
        userAgent: request.headers.get("user-agent") ?? "",
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to forward feedback." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to forward feedback." },
      { status: 500 }
    );
  }
}
