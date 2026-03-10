"use client";

import { useEffect, useMemo, useState } from "react";

type RotatingHeadlineProps = {
  words: string[];
  intervalMs?: number;
  className?: string;
};

export function RotatingHeadline({
  words,
  intervalMs = 2200,
  className,
}: RotatingHeadlineProps) {
  const safeWords = useMemo(() => (words.length > 0 ? words : [""]), [words]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const longestWord = useMemo(
    () => safeWords.reduce((longest, word) => (word.length > longest.length ? word : longest), safeWords[0] ?? ""),
    [safeWords],
  );

  useEffect(() => {
    if (safeWords.length <= 1) {
      return;
    }

    let timeoutId: number | undefined;
    const intervalId = window.setInterval(() => {
      setVisible(false);
      timeoutId = window.setTimeout(() => {
        setIndex((current) => (current + 1) % safeWords.length);
        setVisible(true);
      }, 180);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }
    };
  }, [intervalMs, safeWords]);

  return (
    <span className="relative inline-grid align-baseline">
      <span className={["invisible select-none whitespace-nowrap", className].filter(Boolean).join(" ")}>
        {longestWord}
      </span>
      <span className="absolute inset-0 flex items-center" aria-hidden="true">
        <span
          className={[
            "whitespace-nowrap transition-[opacity,transform] duration-300 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-[0.24em] opacity-0",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {safeWords[index]}
        </span>
      </span>
    </span>
  );
}
