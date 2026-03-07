"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
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
  const [state, setState] = useState<LeadCaptureState>("idle");
  const [message, setMessage] = useState("");

  const emailError = useMemo(() => {
    if (state !== "error") {
      return "";
    }

    const validationError = validateEmail(email.trim());
    return validationError || "";
  }, [email, state]);

  const submitLabel =
    state === "loading"
      ? "Submitting..."
      : state === "success"
        ? "Submitted"
        : "Submit";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const validationError = validateEmail(trimmedEmail);

    if (validationError) {
      setState("error");
      setMessage(validationError);
      return;
    }

    setState("loading");
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

        setState("success");
        setMessage(
          data.duplicate
            ? "You are already on the waitlist. We will email future updates."
            : "Thanks — you’re on the waitlist. Watch your inbox for feature updates.",
        );
        setEmail("");
        setName("");
        setHoney("");
        return;
      }

      setState("error");
      setMessage(data?.error || "Unable to submit. Please try again.");
    } catch {
      setState("error");
      setMessage("Unable to submit. Please try again.");
    }
  }

  const cardClasses = ["w-full", className].filter(Boolean).join(" ");

  return (
    <Card className={cardClasses}>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            aria-label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              if (state !== "idle") {
                setState("idle");
                setMessage("");
              }
            }}
            error={emailError}
          />
          <Input
            label="Name"
            type="text"
            autoComplete="name"
            value={name}
            aria-label="Name"
            onChange={(event) => setName(event.target.value)}
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
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={state === "loading"}>
              {submitLabel}
            </Button>
            <p className="text-xs text-slate-500" aria-live="polite">Status: {state}</p>
          </div>
        </form>
        {state === "success" ? (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm text-emerald-700" aria-live="polite">
              {message}
            </p>
            <p className="mt-1 text-xs text-emerald-800">
              Confirmation: your request has been received and queued for product updates.
            </p>
          </div>
        ) : null}
        {state === "error" && !emailError ? (
          <p className="text-sm text-rose-600" aria-live="polite">
            {message}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
