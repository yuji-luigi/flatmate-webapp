export const intlDateFormat = (date: string | Date, locale?: "it" | "en" | "it-IT" | "en-US") =>
  new Intl.DateTimeFormat(FullLocales[locale || "it"]).format(new Date(date));

const FullLocales = {
  it: "it-IT",
  en: "en-US",
  "it-IT": "it-IT",
  "en-US": "en-US",
} as const;

// format date to yy-mm
export const intlDateFormatMonth = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  return `${month}-${year}`;
};

export const intlCurrencyFormat = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

export function intlFormatDateTime(date?: Date | string, lang: keyof typeof locales = "it") {
  if (!date) return "";
  date = new Date(date);
  const locale = locales[lang] || "it-IT";
  const formattedDate = new Intl.DateTimeFormat(locale, optionsDate).format(date);
  const formattedTime = new Intl.DateTimeFormat(locale, optionsTime).format(date);

  return `${formattedDate}, ${formattedTime}`;
}

const optionsDate = { day: "numeric", month: "long", year: "numeric" } as const;
const optionsTime = { hour: "2-digit", minute: "2-digit" } as const;

const locales = {
  en: "en-US", // English (United States)
  it: "it-IT", // Italian (Italy)
  es: "es-ES", // Spanish (Spain)
  fr: "fr-FR", // French (France)
  de: "de-DE", // German (Germany)
  pt: "pt-PT", // Portuguese (Portugal)
  pt_BR: "pt-BR", // Portuguese (Brazil)
  nl: "nl-NL", // Dutch (Netherlands)
  ru: "ru-RU", // Russian (Russia)
  zh_CN: "zh-CN", // Chinese (China, Simplified)
  zh_TW: "zh-TW", // Chinese (Taiwan, Traditional)
  ja: "ja-JP", // Japanese (Japan)
  ko: "ko-KR", // Korean (South Korea)
  ar: "ar-SA", // Arabic (Saudi Arabia)
  hi: "hi-IN", // Hindi (India)
} as const;
