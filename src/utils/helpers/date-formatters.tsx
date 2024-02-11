export const intlDateFormat = (date: string | Date, locale?: 'it' | 'en' | 'it-IT' | 'en-US') =>
  new Intl.DateTimeFormat(FullLocales[locale || 'it']).format(new Date(date));

const FullLocales = {
  it: 'it-IT',
  en: 'en-US',
  'it-IT': 'it-IT',
  'en-US': 'en-US',
} as const;

// format date to yy-mm
export const intlDateFormatMonth = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  return `${month}-${year}`;
};

export const intlCurrencyFormat = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
