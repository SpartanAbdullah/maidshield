import crypto from "node:crypto";

export type WaitlistIntent = "pro_features" | "product_updates" | "unknown";

export type WaitlistEntry = {
  emailHash: string;
  name: string;
  page: string;
  source: string;
  intent: WaitlistIntent;
  timestamp: string;
};

const entries = new Map<string, WaitlistEntry>();

function hashEmail(email: string) {
  return crypto.createHash("sha256").update(email.toLowerCase()).digest("hex");
}

function getMailchimpConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim();
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX?.trim();

  if (!apiKey || !audienceId || !serverPrefix) {
    return null;
  }

  return { apiKey, audienceId, serverPrefix };
}

async function upsertMailchimp(email: string, name: string, intent: WaitlistIntent) {
  const config = getMailchimpConfig();
  if (!config) {
    return;
  }

  const emailDigest = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
  const endpoint = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${emailDigest}`;

  await fetch(endpoint, {
    method: "PUT",
    headers: {
      authorization: `apikey ${config.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        INTENT: intent,
      },
    }),
    cache: "no-store",
  });
}

async function forwardWebhook(payload: Record<string, string>) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export async function registerWaitlistEntry(input: {
  email: string;
  name: string;
  page: string;
  source: string;
  intent: WaitlistIntent;
  userAgent: string;
}) {
  const emailHash = hashEmail(input.email);

  const isDuplicate = entries.has(emailHash);

  const entry: WaitlistEntry = {
    emailHash,
    name: input.name,
    page: input.page,
    source: input.source,
    intent: input.intent,
    timestamp: new Date().toISOString(),
  };

  entries.set(emailHash, entry);

  if (!isDuplicate) {
    await Promise.allSettled([
      upsertMailchimp(input.email, input.name, input.intent),
      forwardWebhook({
        timestamp: entry.timestamp,
        email: input.email,
        name: input.name,
        page: input.page,
        source: input.source,
        intent: input.intent,
        userAgent: input.userAgent,
      }),
    ]);
  }

  return {
    duplicate: isDuplicate,
    totalEntries: entries.size,
  };
}

export function listWaitlistEntries() {
  return Array.from(entries.values()).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}
