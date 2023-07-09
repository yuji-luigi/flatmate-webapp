export const intlDateFormat = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US').format(new Date(date));
