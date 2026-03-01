"use client";

import { FormEvent, useMemo, useState } from "react";

import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type FeedbackFormState = "idle" | "loading" | "success" | "error";

function validateEmail(email: string) {
  if (!email) {
    return "";
  }

  if (!email.includes("@")) {
    return "Email must include @.";
  }

  if (email.length > 120) {
    return "Email must be 120 characters or fewer.";
  }

  return "";
}

function validateMessage(message: string) {
  if (!message) {
    return "Message is required.";
  }

  if (message.length > 2000) {
    return "Message must be 2000 characters or fewer.";
  }

  return "";
}

export function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<FeedbackFormState>("idle");
  const [formMessage, setFormMessage] = useState("");

  const emailError = useMemo(() => {
    if (state !== "error") {
      return "";
    }

    return validateEmail(email.trim());
  }, [email, state]);

  const messageError = useMemo(() => {
    if (state !== "error") {
      return "";
    }

    return validateMessage(message.trim());
  }, [message, state]);

  const submitLabel =
    state === "loading"
      ? "Submitting..."
      : state === "success"
        ? "Submitted"
        : "Share feedback";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailValidationError = validateEmail(trimmedEmail);
    const messageValidationError = validateMessage(trimmedMessage);

    if (emailValidationError || messageValidationError) {
      setState("error");
      setFormMessage(emailValidationError || messageValidationError);
      return;
    }

    setState("loading");
    setFormMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          message: trimmedMessage,
          company,
          source: "sources-page",
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (response.ok && data?.ok) {
        track("feedback_submit_success");
        setState("success");
        setFormMessage("Thanks — feedback received.");
        setEmail("");
        setMessage("");
        setCompany("");
        return;
      }

      track("feedback_submit_error");
      setState("error");
      setFormMessage(data?.error || "Unable to submit. Please try again.");
    } catch {
      track("feedback_submit_error");
      setState("error");
      setFormMessage("Unable to submit. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email (optional)"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (state !== "idle") {
            setState("idle");
            setFormMessage("");
          }
        }}
        error={emailError}
      />
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-message"
          className="block text-sm font-medium text-slate-700"
        >
          Message
        </label>
        <textarea
          id="feedback-message"
          rows={4}
          required
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (state !== "idle") {
              setState("idle");
              setFormMessage("");
            }
          }}
          className={`block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${
            messageError
              ? "border-rose-400 focus:ring-rose-200"
              : "border-slate-300 focus:ring-slate-300"
          }`}
          placeholder="Describe what looked off or what you expected to see."
        />
        {messageError ? (
          <p className="text-xs text-rose-600">{messageError}</p>
        ) : null}
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="organization"
        aria-hidden="true"
        className="hidden"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />
      <Button type="submit" variant="secondary" disabled={state === "loading"}>
        {submitLabel}
      </Button>
      {state === "success" ? (
        <p className="text-sm text-emerald-700" aria-live="polite">
          {formMessage}
        </p>
      ) : null}
      {state === "error" && !emailError && !messageError ? (
        <p className="text-sm text-rose-600" aria-live="polite">
          {formMessage}
        </p>
      ) : null}
    </form>
  );
}
