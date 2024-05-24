export function curryConcatString(baseStr: string): (additionalStr: string) => string {
  const basePath = baseStr;
  return (additionalStr: string) => `${basePath}${additionalStr}`;
}
