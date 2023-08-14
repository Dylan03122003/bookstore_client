export function uppercaseFirstCharacter(str: string): string {
  if (str.length === 0) {
    return str; // Empty string, nothing to convert
  }

  const firstChar = str.charAt(0).toUpperCase();
  const remainingChars = str.slice(1);

  return firstChar + remainingChars;
}
