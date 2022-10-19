/**
 * Joins parts of a URL with '/'.
 *
 * Removes / from the beginning and end of each part before joining.
 *
 * @example
 * // returns 'https://abc.com/example'
 * joinUrl('https://abc.com/', 'example/')
 */
export function joinUrl(...parts: string[]) {
  return parts.map((s) => s.replace(/^\/|\/$/g, "")).join("/");
}

export function parse(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function parseBool(str?: string): boolean {
  if (!str) return false;
  switch (str.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
      return false;
    default:
      return false;
  }
}

/**
 * Converts the first character of a string to uppercase.
 */
export function capitalize<S extends string>(str: S): Capitalize<S> {
  const [first, ...rest] = str;
  if (!first) return "" as Capitalize<S>;
  return (first.toUpperCase() + rest.join("")) as Capitalize<S>;
}

/**
 * Converts the first character of a string to lowercase.
 */
export function uncapitalize<S extends string>(str: S): Uncapitalize<S> {
  const [first, ...rest] = str;
  if (!first) return "" as Uncapitalize<S>;
  return (first.toLowerCase() + rest.join("")) as Uncapitalize<S>;
}

const WORD_REGEX = /[A-Za-z]([a-z\d]+)|[A-Z]+(?=[A-Z])/g;

export function camelCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";

  const [first, ...rest] = words;
  return [uncapitalize(first), ...rest.map(capitalize)].join("");
}

export function pascalCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";
  return words.map(capitalize).join("");
}

export function snakeCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";
  return words.map(uncapitalize).join("_");
}

export function titleCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";

  const [first, ...rest] = words;
  return [capitalize(first), ...rest.map(uncapitalize)].join(" ");
}
