import { NextRequest, NextResponse } from "next/server";

import { listWaitlistEntries } from "@/lib/server/waitlist";

export async function GET(request: NextRequest) {
  const expectedToken = process.env.WAITLIST_ADMIN_TOKEN?.trim();
  const providedToken = request.headers.get("x-admin-token")?.trim();

  if (!expectedToken || providedToken !== expectedToken) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    count: listWaitlistEntries().length,
    entries: listWaitlistEntries(),
  });
}
