"use client";

import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type LeadCaptureState = "idle" | "loading" | "success" | "error";

type LeadCaptureProps = {
  source?: string;
  className?: string;
};

function validateEmail(email: string) {
  if (!email) {
    return "Email is required.";
  }

  if (!email.includes("@")) {
    return "Email must include @.";
  }

  if (email.length > 120) {
    return "Email must be 120 characters or fewer.";
  }

  return "";
}

export function LeadCapture({
  source = "marketing-landing",
  className,
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
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName,
          source,
          honey,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (response.ok && data?.ok) {
        setState("success");
        setMessage("Thanks \u2014 we\u2019ll email you when new features ship.");
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
            <p className="text-xs text-slate-500">Status: {state}</p>
          </div>
        </form>
        {state === "success" ? (
          <p className="text-sm text-emerald-700" aria-live="polite">
            {message}
          </p>
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
