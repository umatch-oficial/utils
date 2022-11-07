import { zip } from "../array";
import { divmod } from "../math";

type Pluralizer = (word: string, quantity?: number) => string;

const ENGLISH_ARTICLES = ["a", "an", "the"];
// the following approach is a good approximation, but fails for
//  letters like: Ú, Ù, Ý
const LOWERCASE_LETTER = "[a-zØ-öø-ÿ\\d']";
const UPPERCASE_LETTER = "[A-ZÀ-Ö]";
/*
This regex splits words where lowercase letters or numbers precede
an uppercase letter.
*/
const WORD_REGEX = new RegExp(
  `${UPPERCASE_LETTER}+${LOWERCASE_LETTER}*|${UPPERCASE_LETTER}?${LOWERCASE_LETTER}+`,
  "g",
);

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

function toCase(
  firstWordFunction: (str: string) => string,
  otherWordsFunction: (str: string) => string,
  separator: string,
): (str: string) => string {
  return (str) => {
    const words = str.match(WORD_REGEX);
    if (!words) return str;

    const [first, ...rest] = words;
    return [firstWordFunction(first), ...rest.map(otherWordsFunction)].join(separator);
  };
}

/**
 * Converts a string to camelCase.
 */
export const camelCase: (str: string) => string = Object.defineProperty(
  toCase(uncapitalize, capitalize, ""),
  "name",
  { value: "camelCase" },
);

/**
 * Converts a string to camelCase.
 */
export const pascalCase: (str: string) => string = Object.defineProperty(
  toCase(capitalize, capitalize, ""),
  "name",
  { value: "pascalCase" },
);

/**
 * Converts a string to snake_case.
 */
export const snakeCase: (str: string) => string = Object.defineProperty(
  toCase(uncapitalize, uncapitalize, "_"),
  "name",
  { value: "snakeCase" },
);

/**
 * Converts a string to Sentence case.
 */
export const sentenceCase: (str: string) => string = Object.defineProperty(
  toCase(capitalize, uncapitalize, " "),
  "name",
  { value: "sentenceCase" },
);

/**
 * Converts a string to Title Case.
 *
 * Some words should not be capitalized, depending on the language.
 * In english, for example, the articles.
 */
export function titleCase(str: string, skipWords: string[] = ENGLISH_ARTICLES): string {
  return toCase(
    capitalize,
    (word) => (skipWords.includes(word.toLowerCase()) ? word : capitalize(word)),
    " ",
  )(str);
}
