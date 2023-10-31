export const intlDateFormat = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US').format(new Date(date));

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
