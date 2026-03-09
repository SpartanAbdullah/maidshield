"use client";

import { useFeatureFlag } from "@/lib/featureFlags";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic (planned)" },
];

export function LanguageSelectorPlaceholder() {
  const enabled = useFeatureFlag("languageSelector");

  if (!enabled) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
      <label htmlFor="language-selector" className="font-medium text-slate-600">
        Language
      </label>
      <select
        id="language-selector"
        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700"
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
