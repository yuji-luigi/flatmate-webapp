/**
 * @description baseText should be longer than specificText. base text is the text that you want to search in.
 */
export function hasMatchedString(baseText: string, specificText: string) {
  const pattern = new RegExp(specificText);
  return pattern.test(baseText);
}

/**
 * @description baseText should be longer than specificText. baseText is the text that you want to search in.
 */
export function hasMatchedUrl(baseText: string, specificText: string) {
  const pattern = new RegExp(`${specificText}(\/|$)`);
  return pattern.test(baseText);
}
