export type SupportedLocale = "en" | "ar";

export type LocaleDictionary = {
  topNavStartLabel: string;
  topNavStartAltLabel: string;
  footerTagline: string;
  languageLabel: string;
};

export const localeDictionaries: Record<SupportedLocale, LocaleDictionary> = {
  en: {
    topNavStartLabel: "Start",
    topNavStartAltLabel: "Start Calculation",
    footerTagline: "MaidShield helps UAE household employers plan domestic worker settlements.",
    languageLabel: "Language",
  },
  ar: {
    topNavStartLabel: "ابدأ",
    topNavStartAltLabel: "ابدأ الحساب",
    footerTagline: "MaidShield يساعد أصحاب العمل المنزليين في الإمارات على تخطيط مستحقات نهاية الخدمة.",
    languageLabel: "اللغة",
  },
};

export function getLocaleDictionary(locale: SupportedLocale) {
  return localeDictionaries[locale] ?? localeDictionaries.en;
}

export function formatCurrencyByLocale(value: number, locale: SupportedLocale, currency = "AED") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
