export const intlDateFormat = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US').format(new Date(date));
export const intlCurrencyFormat = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
