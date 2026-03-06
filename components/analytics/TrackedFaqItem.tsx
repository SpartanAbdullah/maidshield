"use client";

import { useState } from "react";

import { track } from "@/lib/analytics";

type TrackedFaqItemProps = {
  question: string;
  answer: string;
};

export function TrackedFaqItem({ question, answer }: TrackedFaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="py-4"
      open={open}
      onToggle={(event) => {
        const isOpen = (event.currentTarget as HTMLDetailsElement).open;
        setOpen(isOpen);
        if (isOpen) {
          track("faq_question_opened", { question });
        }
      }}
    >
      <summary className="cursor-pointer text-sm font-medium text-slate-900">{question}</summary>
      <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
    </details>
  );
}
