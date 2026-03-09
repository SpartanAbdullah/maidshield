"use client";

import { FormEvent, useMemo, useState } from "react";

import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { HelperBlock } from "@/components/ui/HelperBlock";
import { Input } from "@/components/ui/Input";

type FeedbackFormState = "idle" | "loading" | "success" | "error";

function validateEmail(email: string) {
  if (!email) {
    return "";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address.";
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

  if (message.length < 10) {
    return "Please enter at least 10 characters.";
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
  const [submitState, setSubmitState] = useState<FeedbackFormState>("idle");
  const [formMessage, setFormMessage] = useState("");

  const emailError = useMemo(() => {
    if (submitState !== "error") {
      return "";
    }

    return validateEmail(email.trim());
  }, [email, submitState]);

  const messageError = useMemo(() => {
    if (submitState !== "error") {
      return "";
    }

    return validateMessage(message.trim());
  }, [message, submitState]);

  const submitLabel =
    submitState === "loading"
      ? "Sending..."
      : submitState === "success"
        ? "Sent"
        : "Send message";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailValidationError = validateEmail(trimmedEmail);
    const messageValidationError = validateMessage(trimmedMessage);

    if (emailValidationError || messageValidationError) {
      track("feedback_submit_error");
      setSubmitState("error");
      setFormMessage(emailValidationError || messageValidationError);
      return;
    }

    setSubmitState("loading");
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
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (response.ok && data?.ok) {
        track("feedback_submit_success");
        setSubmitState("success");
        setFormMessage("Your message has been sent.");
        setEmail("");
        setMessage("");
        setCompany("");
        return;
      }

      track("feedback_submit_error");
      setSubmitState("error");
      setFormMessage(data?.error || "Something went wrong. Please try again.");
    } catch {
      track("feedback_submit_error");
      setSubmitState("error");
      setFormMessage("Something went wrong. Please try again.");
    }
  }

  const messageFieldClasses = [
    "block w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] placeholder:text-slate-400 transition-[background-color,border-color,box-shadow] duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_24%,white)] focus:ring-offset-2 focus:ring-offset-white",
    messageError
      ? "border-rose-400 focus:ring-rose-200"
      : "border-slate-300 hover:border-slate-400",
  ].join(" ");

  return (
    <div className="space-y-4">
      <HelperBlock icon="mail" tone="neutral">
        Share what looked unclear, missing, or incorrect. Please avoid personal IDs or private documents.
      </HelperBlock>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email (optional)"
          type="email"
          autoComplete="email"
          value={email}
          placeholder="Enter your email if you want a reply"
          hint="Leave this blank if you only want to send feedback anonymously."
          aria-label="Email (optional)"
          onChange={(event) => {
            setEmail(event.target.value);
            if (submitState !== "idle") {
              setSubmitState("idle");
              setFormMessage("");
            }
          }}
          error={emailError}
        />
        <div className="space-y-2">
          <label
            htmlFor="feedback-message"
            className="block text-sm font-semibold text-slate-800"
          >
            Message
          </label>
          <textarea
            id="feedback-message"
            rows={5}
            aria-label="Message"
            required
            aria-describedby={messageError ? "feedback-message-error" : "feedback-message-hint"}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (submitState !== "idle") {
                setSubmitState("idle");
                setFormMessage("");
              }
            }}
            className={messageFieldClasses}
            placeholder="Tell us what you expected to see, which page you were on, and what felt confusing."
          />
          <p id="feedback-message-hint" className="text-xs leading-5 text-slate-500">
            A short description is enough. You do not need to send personal case documents.
          </p>
          {messageError ? (
            <p id="feedback-message-error" className="text-xs leading-5 text-rose-600">
              {messageError}
            </p>
          ) : null}
        </div>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="organization"
          aria-hidden="true"
          className="sr-only"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" variant="secondary" disabled={submitState === "loading"}>
            {submitLabel}
          </Button>
          <p className="text-xs leading-5 text-slate-500">
            We read every message and use it to improve clarity across the product.
          </p>
        </div>
        {submitState === "success" ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-medium text-emerald-800" aria-live="polite">
              {formMessage}
            </p>
          </div>
        ) : null}
        {submitState === "error" && !emailError && !messageError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
            <p className="text-sm font-medium text-rose-700" aria-live="polite">
              {formMessage}
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
