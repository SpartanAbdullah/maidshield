"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { HelperBlock } from "@/components/ui/HelperBlock";
import { Input } from "@/components/ui/Input";
import { track } from "@/lib/analytics";

type LeadCaptureState = "idle" | "loading" | "success" | "error";

type LeadCaptureProps = {
  source?: string;
  className?: string;
  intent?: "pro_features" | "product_updates";
};

function validateEmail(email: string) {
  if (!email) {
    return "Email is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address.";
  }

  if (email.length > 120) {
    return "Email must be 120 characters or fewer.";
  }

  return "";
}

export function LeadCapture({
  source = "landing",
  className,
  intent = "product_updates",
}: LeadCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honey, setHoney] = useState("");
  const [submitState, setSubmitState] = useState<LeadCaptureState>("idle");
  const [message, setMessage] = useState("");

  const emailError = useMemo(() => {
    if (submitState !== "error") {
      return "";
    }

    const validationError = validateEmail(email.trim());
    return validationError || "";
  }, [email, submitState]);

  const defaultSubmitLabel = intent === "pro_features" ? "Join waitlist" : "Get updates";
  const submitLabel =
    submitState === "loading"
      ? "Sending..."
      : submitState === "success"
        ? intent === "pro_features"
          ? "Joined"
          : "Subscribed"
        : defaultSubmitLabel;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const validationError = validateEmail(trimmedEmail);

    if (validationError) {
      setSubmitState("error");
      setMessage(validationError);
      return;
    }

    setSubmitState("loading");
    setMessage("");

    try {
      const page = source || window.location.pathname || "landing";

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName,
          page,
          source,
          intent,
          honey,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; duplicate?: boolean }
        | null;

      if (response.ok && data?.ok) {
        if (data.duplicate) {
          track("waitlist_duplicate_submission", { source });
        } else {
          track("waitlist_signup", { source });
        }

        setSubmitState("success");
        setMessage(
          data.duplicate
            ? "You are already on the list. We will keep this email for future MaidShield updates."
            : intent === "pro_features"
              ? "You are on the waitlist. We will email you when early access details are ready."
              : "Your request has been received. We will only send the updates you asked for.",
        );
        setEmail("");
        setName("");
        setHoney("");
        return;
      }

      setSubmitState("error");
      setMessage(data?.error || "Something went wrong. Please try again.");
    } catch {
      setSubmitState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const cardClasses = ["w-full", className].filter(Boolean).join(" ");

  return (
    <Card className={cardClasses}>
      <CardContent className="space-y-5">
        <HelperBlock icon="mail" tone="neutral">
          {intent === "pro_features"
            ? "Share the best email for early-access updates. You can leave your name blank if you prefer."
            : "Share the best email for product updates. You can leave your name blank if you prefer."}
        </HelperBlock>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email address"
            hint="We only use this address for the updates you request."
            value={email}
            aria-label="Email address"
            onChange={(event) => {
              setEmail(event.target.value);
              if (submitState !== "idle") {
                setSubmitState("idle");
                setMessage("");
              }
            }}
            error={emailError}
          />
          <Input
            label="Name (optional)"
            type="text"
            autoComplete="name"
            placeholder="How should we address you?"
            hint="Helpful if you want a more personal reply later."
            value={name}
            aria-label="Name"
            onChange={(event) => {
              setName(event.target.value);
              if (submitState !== "idle") {
                setSubmitState("idle");
                setMessage("");
              }
            }}
          />
          <input
            type="text"
            name="honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            value={honey}
            onChange={(event) => setHoney(event.target.value)}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={submitState === "loading"} className="sm:min-w-[140px]">
              {submitLabel}
            </Button>
            <p className="text-xs leading-5 text-slate-500">
              No spam. No document uploads. You can unsubscribe later.
            </p>
          </div>
        </form>

        {submitState === "success" ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-medium text-emerald-800" aria-live="polite">
              {message}
            </p>
          </div>
        ) : null}
        {submitState === "error" && !emailError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
            <p className="text-sm font-medium text-rose-700" aria-live="polite">
              {message}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
