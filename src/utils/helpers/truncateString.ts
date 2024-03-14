export function truncateString(str: string, num?: number) {
  if (!num) return str;
  if (str.length <= num) {
    return str;
  }
  if (str.length > num) {
    return `${str.slice(0, num)}...`;
  }
  return str;
}
