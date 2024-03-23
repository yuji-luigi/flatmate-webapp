export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g, // This regex matches words in the string
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); // Capitalize the first letter and lowercase the rest
    }
  );
}
