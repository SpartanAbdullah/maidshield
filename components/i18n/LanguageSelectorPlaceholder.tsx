"use client";

import { useFeatureFlag } from "@/lib/featureFlags";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية (planned)" },
];

export function LanguageSelectorPlaceholder() {
  const enabled = useFeatureFlag("languageSelector");

  if (!enabled) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <label htmlFor="language-selector" className="font-medium">
        Language
      </label>
      <select
        id="language-selector"
        className="rounded-md border border-slate-300 bg-white px-2 py-1"
        defaultValue="en"
        disabled
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}
