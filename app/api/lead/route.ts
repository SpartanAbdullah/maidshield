import { NextRequest, NextResponse } from "next/server";

type LeadInput = {
  email?: unknown;
  name?: unknown;
  source?: unknown;
  honey?: unknown;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let payload: LeadInput;

  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }
    payload = parsed as LeadInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const email = normalizeString(payload.email);
  const name = normalizeString(payload.name);
  const source = normalizeString(payload.source);
  const honey = normalizeString(payload.honey);

  if (honey) {
    return NextResponse.json({ ok: true });
  }

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email is required." },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
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
      { ok: false, error: "Lead capture is not configured." },
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
        email,
        name,
        source,
        userAgent: request.headers.get("user-agent") ?? "",
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to forward lead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to forward lead." },
      { status: 500 }
    );
  }
}
