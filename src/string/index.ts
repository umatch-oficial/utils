import { zip } from "../array";
import { divmod } from "../math";

type Pluralizer = (word: string, quantity?: number) => string;

const ENGLISH_ARTICLES = ["a", "an", "the"];

export function basicPluralizer(word: string, quantity?: number): string {
  if (quantity === undefined) return `${word}s`;

  if (quantity !== 0 && Math.abs(quantity) <= 1) {
    return `${quantity} ${word}`;
  }
  return `${quantity} ${word}s`;
}

/**
 * Formats the duration-like object, using up to the specified number
 * of parts starting from the largest non-zero unit. Values are
 * converted into larger units, so that 70 seconds becomes 1 minute
 * and 10 seconds, for example.
 * @example
 * // returns "10 minutes and 5 seconds"
 * formatTime(
 *     { hours: 0, minutes: 10, seconds: 5, milliseconds: 300},
 *     { parts: 2 },
 * )
 * @param time Duration-like object
 * @param options
 * @param {{ and: string; hour: string; minute: string; second: string; millisecond: string }}[options.dictionary] Words to substitute. Default: english words
 * @param [options.parts] The number of parts to include in the output. Default: 2
 * @param {Pluralizer} [options.pluralizer] A pluralizer function. Default: adds 's' to the end the word
 */
export function formatTime(
  time: {
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  },
  options?: {
    dictionary?: {
      and: string;
      hour: string;
      minute: string;
      second: string;
      millisecond: string;
    };
    parts?: number;
    pluralizer?: Pluralizer;
  },
): string {
  const { hours, minutes, seconds, milliseconds } = time;
  const { parts, pluralizer, dictionary } = {
    parts: 2,
    pluralizer: basicPluralizer,
    ...options,
  };
  const { and, hour, minute, second, millisecond } = {
    and: "and",
    hour: "hour",
    minute: "minute",
    second: "second",
    millisecond: "millisecond",
    ...dictionary,
  };

  const ordered = [hours, minutes, seconds, milliseconds];
  const rounded = ordered.map((n) => (n ? Math.ceil(n) : n));
  // hours to minutes, minutes to seconds, seconds to milliseconds
  const conversions = [60, 60, 1000];
  // "hoist" units — 70 seconds become 1 minute and 10 seconds, and so on
  for (let i = rounded.length - 1; i > 0; i -= 1) {
    const cur = rounded[i];
    const above = rounded[i - 1];
    if (cur === undefined) continue;

    const conversion = conversions[i - 1];
    const [quo, rem] = divmod(cur, conversion);
    rounded[i] = rem;
    if (above !== undefined || quo > 0) {
      rounded[i - 1] = (above ?? 0) + quo;
    }
  }

  const withNames = zip(rounded, [hour, minute, second, millisecond]);
  const filtered = withNames.filter(([quantity]) => quantity !== undefined) as [
    number,
    string,
  ][];
  const sliced = filtered.slice(0, parts);
  const strings = sliced.map(([quantity, word]) => pluralizer(word, quantity));
  return join(strings, and);
}

/**
 * Joins words as in a sentence.
 */
export function join(parts: string[], and = "&"): string {
  const firstParts = parts.slice(0, -1);
  const lastPart = parts.slice(-1)[0];
  if (firstParts.length === 0) return lastPart;
  return [firstParts.join(", "), lastPart].join(` ${and} `);
}

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

export function parseBool(str: string, def?: boolean): boolean {
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
      if (def === undefined) throw new Error(`Failed to parse bool from string '${str}'`);
      return def;
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

/**
 * Converts a string to camelCase.
 */
export function camelCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";

  const [first, ...rest] = words;
  return [uncapitalize(first), ...rest.map(capitalize)].join("");
}

/**
 * Converts a string to camelCase.
 */
export function pascalCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";
  return words.map(capitalize).join("");
}

/**
 * Converts a string to snake_case.
 */
export function snakeCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";
  return words.map(uncapitalize).join("_");
}

/**
 * Converts a string to Sentence case.
 */
export function sentenceCase(str: string): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";

  const [first, ...rest] = words;
  return [capitalize(first), ...rest.map(uncapitalize)].join(" ");
}

/**
 * Converts a string to Title Case.
 */
export function titleCase(str: string, articles: string[] = ENGLISH_ARTICLES): string {
  const words = str.match(WORD_REGEX);
  if (!words) return "";

  const capitalizeExceptArticles = (word: string) =>
    articles.includes(word.toLowerCase()) ? word : capitalize(word);
  const [first, ...rest] = words;
  return [capitalize(first), ...rest.map(capitalizeExceptArticles)].join(" ");
}
