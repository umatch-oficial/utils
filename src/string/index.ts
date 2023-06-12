import chalk, { type Chalk, type ForegroundColor } from "chalk";
import { DateTime } from "luxon";
import stringLength from "string-length";

import { zip } from "../array";
import { divmod } from "../math";

import type { Primitive } from "../index";
import type { DateTimeUnit } from "luxon";

type ChalkColor = typeof ForegroundColor;
type Pluralizer = (word: string, quantity?: number, plural?: string) => string;

/**
 * Pluralizes the word if *quantity* is undefined, 0 or
 * greater than 1. Uses the given plural or adds an 's' to the end.
 *
 * @example
 * // returns 'developers'
 * basicPluralizer('developer')
 * // returns 'developer'
 * basicPluralizer('developer', 1)
 * // returns 'developers'
 * basicPluralizer('developer', 2)
 */
function basicPluralizer(word: string, quantity?: number, plural?: string): string {
  const shouldPluralize =
    quantity === undefined || quantity === 0 || Math.abs(quantity) > 1;
  return shouldPluralize ? plural ?? `${word}s` : word;
}

/**
 * Pads a string on both sides to achieve the desired length.
 *
 * If the number of spaces to add is uneven, the left side gets the
 * extra space.
 */
function center(str: string, length: number, character = " "): string {
  const realLength = stringLength(str);
  if (realLength >= length) return str;

  const [left, right] = [Math.ceil, Math.floor].map((func) =>
    character.repeat(func((length - realLength) / 2)),
  );
  return left + str + right;
}

/**
 * Formats a string according to options.
 *
 * @param [str]
 * @param [options = {}]
 * @param [options.bold] Whether to make it bold
 * @param [options.bgColor] Background color
 * @param [options.color] Text color
 * @param [options.length] Pad string on both sides up to this length
 */
function formatStr(
  str: string = "",
  options: {
    bgColor?: ChalkColor;
    bold?: boolean;
    color?: ChalkColor;
    length?: number;
  } = {},
): string {
  const { bold, bgColor, color, length } = options;
  const wrapped = length ? center(str, length) : str;
  let fmt: Chalk = chalk;
  if (bold) fmt = fmt.bold;
  if (color) fmt = fmt[color as ChalkColor];
  if (bgColor) fmt = fmt[("bg" + capitalize(bgColor)) as ChalkColor];
  return fmt(wrapped);
}

/**
 * Formats the duration-like object, using up to the specified number
 * of parts starting from the largest non-zero unit. Values are
 * converted into larger units, so that 70 seconds becomes 1 minute
 * and 10 seconds, for example.
 *
 * @example
 * // returns "10 minutes and 5 seconds"
 * formatTime(
 *     { hours: 0, minutes: 10, seconds: 5, milliseconds: 300 },
 *     { parts: 2 },
 * )
 *
 * @param time Duration-like object
 * @param options
 * @param [options.dictionary] Words to substitute. Default: english words
 * @param [options.parts] The number of parts to include in the output. Default: 2
 * @param [options.pluralizer] A pluralizer function. Default: adds 's' to the end the word
 */
function formatTime(
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
    short?: boolean;
  },
): string {
  const { hours, minutes, seconds, milliseconds } = time;
  const { parts, pluralize, dictionary, short } = {
    parts: 2,
    pluralize: basicPluralizer,
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
  // hours => minutes, minutes => seconds, seconds => milliseconds
  const conversions = [60, 60, 1000];
  // "hoist" units — 70 seconds become 1 minute and 10 seconds, and so on
  for (let i = rounded.length - 1; i > 0; i -= 1) {
    const cur = rounded[i];
    const above = rounded[i - 1];
    if (!cur) continue;

    const conversion = conversions[i - 1];
    const [quo, rem] = divmod(cur, conversion);
    rounded[i] = rem;
    if (quo > 0) {
      rounded[i - 1] = (above ?? 0) + quo;
    }
  }

  const withNames = zip(rounded, [hour, minute, second, millisecond]);
  const filtered = withNames.filter(
    ([quantity]) => quantity !== undefined && quantity !== 0,
  ) as [number, string][];
  const sliced = filtered.slice(0, parts);
  if (short) {
    const strings = sliced.map(([quantity, word]) => `${quantity} ${word[0]}`);
    return strings.join(" ");
  } else {
    const strings = sliced.map(
      ([quantity, word]) => `${quantity} ${pluralize(word, quantity)}`,
    );
    return join(strings, and);
  }
}

type DateTimeDict = { [_ in DateTimeUnit]?: string } & {
  day: string;
  hour: string;
  minute: string;
};
/**
 * Returns a human-readable count-down until a certain date.
 *
 * Starts from the largest unit of time (default: day) to the
 * smallest (default: minute). Returns the count-down in the
 * first unit for which the difference from date until now
 * exceeds the threshold for the unit (default: 1).
 *
 * @example
 * const date = DateTime.now().plus({ days: 3 });
 * // returns '3 days'
 * getCountDown(date);
 * // returns '3d'
 * getCountDown(date, { short: true });
 * // returns '72 hours'
 * getCountDown(date, { unitsThresholds: [['day', 5], ['hour', 1]] });
 *
 * @param date If date is a string, it is parsed with DateTime.fromISO(string, { setZone: true }).
 * @param options
 * @param [options.dictionary] Words to substitute. Default: english words
 * @param [options.pluralizer] A pluralizer function. Default: adds 's' to the end the word
 * @param [options.short] Whether to shorten the duration identifier (pick first letter)
 * @param [options.unitsThresholds] Threshold per unit
 *
 * @throws if the given dictionary doesn't have entries for all possible units.
 */
function getCountDown(
  date: string | DateTime,
  options?: {
    dictionary?: DateTimeDict;
    pluralizer?: Pluralizer;
    short?: boolean;
    unitsThresholds?: readonly (readonly [DateTimeUnit, number])[];
  },
): string {
  const { pluralize, dictionary } = {
    dictionary: {
      day: "day",
      hour: "hour",
      minute: "minute",
    },
    pluralize: basicPluralizer,
    ...options,
  };
  const now = DateTime.now();
  const then =
    date instanceof DateTime ? date : DateTime.fromISO(date, { setZone: true });
  const unitsThresholds =
    options?.unitsThresholds ??
    ([
      ["day", 1],
      ["hour", 1],
      ["minute", 1],
    ] as const);
  for (const [unit] of unitsThresholds) {
    if (!dictionary[unit]) {
      throw new Error(`Dictionary missing entry for ${unit}`);
    }
  }

  let [finalUnit, finalNumber] = unitsThresholds.at(-1)!;
  for (const [unit, threshold] of unitsThresholds) {
    const elapsedTime = then.diff(now).as(unit);
    if (elapsedTime >= threshold) {
      finalUnit = unit;
      finalNumber = Math.trunc(elapsedTime);
      break;
    }
  }

  const entry = dictionary[finalUnit]!;
  return options?.short
    ? `${finalNumber}${entry[0]}`
    : `${finalNumber} ${pluralize(entry, finalNumber)}`;
}

/**
 * Joins words as in a sentence.
 */
function join(parts: string[], and = "&"): string {
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
function joinUrl(...parts: string[]): string {
  return parts.map((s) => s.replace(/^\/|\/$/g, "")).join("/");
}

/**
 * Inserts spaces between left and right to achieve the desired length.
 */
function pad(left: string, right: string, length: number) {
  const spacer = " ".repeat(Math.max(length - left.length - right.length, 0));
  return left + spacer + right;
}

/**
 * Parses a boolean from the string.
 *
 * @throws if it fails to parse and there is no default value.
 */
function parseBool(str: string | null | undefined, def?: boolean): boolean {
  switch ((str ?? "").toLowerCase().trim()) {
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
 * Returns a function name and its arguments from a string. Boolean
 * and number arguments are parsed. If the function call is not
 * valid, returns an empty string and an empty array.
 *
 * @example
 * parseFunctionCall("foo(1, "bar", true)") // returns ["foo", [1, "bar", true]]
 * parseFunctionCall("foo(1, "bar", true) + 1") // returns ["", []]
 */
function parseFunctionCall(str: string): [string, Primitive[]] {
  str = str.trim();

  const match = str.match(/^([\w_]+)\(/);
  if (!match) return ["", []];

  const name = match[1];
  const { index } = match;
  const args = [];
  let current = "";
  let openQuote;
  let functionClosed = false;
  str = str.slice(index! + match[0].length);
  for (const char of str) {
    if (openQuote) {
      current += char;
      if ((char === '"' || char === "'") && char === openQuote) {
        openQuote = null;
      }
    } else {
      if (char === ",") {
        args.push(current);
        current = "";
      } else if (char === "(") {
        return ["", []];
      } else if (char === ")") {
        if (char === str.charAt(str.length - 1)) {
          args.push(current);
          functionClosed = true;
          break;
        } else {
          return ["", []];
        }
      } else if (char === '"' || char === "'") {
        current += char;
        openQuote = char;
      } else {
        if (char !== " ") {
          current += char;
        }
      }
    }
  }
  if (!functionClosed) return ["", []];

  const parsedArgs = args.map((arg) => {
    try {
      return parseNumber(arg);
    } catch (e) {}
    try {
      return parseBool(arg);
    } catch (e) {}

    return arg.replace(/^['"]/, "").replace(/['"]$/, "");
  });
  return [name, parsedArgs];
}

/**
 * Parses a number from the string.
 *
 * @throws if it fails to parse and there is no default value.
 */
function parseNumber(str: string | null | undefined, def?: number): number {
  const parsed = Number(str);
  if (Number.isNaN(parsed)) {
    if (def === undefined) {
      throw new Error(`Failed to parse number from string '${str}'`);
    }
    return def;
  }
  return parsed;
}

/**
 * Replaces accented letters with their standard versions.
 */
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Splits a string starting from the right, stops after n splits.
 * (equivalent of python's rsplit)
 *
 * @example
 * // returns ["a", "b", "c"]
 * rsplit("a,b,c")
 * // returns ["a,b", "c"]
 * rsplit("a,b,c", 1)
 *
 * @param str
 * @param [n = -1] number of splits
 * @param [sep = ','] separator
 */
function rsplit(str: string | null | undefined, n = -1, sep = ","): string[] {
  if (!str) return [];

  const parts = str.split(sep);
  if (n === -1) return parts;
  n = Math.min(n, parts.length - 1);

  return [parts.slice(0, -n).join(sep), ...parts.slice(-n)];
}

/**
 * Splits a string starting from the left, stops after n splits.
 * (equivalent of python's split)
 *
 * @example
 * // returns ["a", "b", "c"]
 * split("a,b,c")
 * // returns ["a", "b,c"]
 * split("a,b,c", 1)
 *
 * @param str
 * @param [n = -1] number of splits
 * @param [sep = ','] separator
 */
function split(str: string | null | undefined, n = -1, sep = ","): string[] {
  if (!str) return [];

  const parts = str.split(sep);
  if (n === -1) return parts;
  n = Math.min(n, parts.length - 1);

  return [...parts.slice(0, n), parts.slice(n).join(sep)];
}

/**
 * Converts the first character of a string to uppercase.
 */
function capitalize<S extends string>(str: S): Capitalize<S> {
  const [first, ...rest] = str;
  if (!first) return "" as Capitalize<S>;
  return (first.toUpperCase() + rest.join("")) as Capitalize<S>;
}

/**
 * Converts the first character of a string to lowercase.
 */
function uncapitalize<S extends string>(str: S): Uncapitalize<S> {
  const [first, ...rest] = str;
  if (!first) return "" as Uncapitalize<S>;
  return (first.toLowerCase() + rest.join("")) as Uncapitalize<S>;
}

// the following approach is an approximation, there is no exact solution
const LOWERCASE_LETTER = "[a-zØ-öø-ÿ\\d']";
const UPPERCASE_LETTER = "[A-ZÀ-ÖÚÙÝ]";
/*
This regex splits words where lowercase letters or numbers precede
an uppercase letter.
*/
const WORD_REGEX = new RegExp(
  `${UPPERCASE_LETTER}+${LOWERCASE_LETTER}*|${UPPERCASE_LETTER}?${LOWERCASE_LETTER}+`,
  "g",
);

/**
 * Returns a function, which changes the case of a string.
 *
 * *Warning*: keeps only letters and numbers, all punctuation is lost,
 * so it should only be used on strings that are supposed to form a
 * single word.
 */
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
 *
 * *Warning*: the whole string is considered as one, so if you want to
 * apply the function to parts of a string individually, you must
 * split it and map the function over each unit according to your needs.
 */
const camelCase: (str: string) => string = Object.defineProperty(
  toCase(uncapitalize, capitalize, ""),
  "name",
  { value: "camelCase" },
);

/**
 * Converts a string to camelCase.
 *
 * *Warning*: the whole string is considered as one, so if you want to
 * apply the function to parts of a string individually, you must
 * split it and map the function over each unit according to your needs.
 */
const pascalCase: (str: string) => string = Object.defineProperty(
  toCase(capitalize, capitalize, ""),
  "name",
  { value: "pascalCase" },
);

/**
 * Converts a string to Sentence case.
 */
function sentenceCase(str: string) {
  const [first, ...rest] = str.split(/(\s)/);
  return [capitalize(first), ...rest.map(uncapitalize)].join("");
}

/**
 * Converts a string to snake_case.
 *
 * *Warning*: the whole string is considered as one, so if you want to
 * apply the function to parts of a string individually, you must
 * split it and map the function over each unit according to your needs.
 */
const snakeCase: (str: string) => string = Object.defineProperty(
  toCase(uncapitalize, uncapitalize, "_"),
  "name",
  { value: "snakeCase" },
);

const ENGLISH_SKIP_WORDS = [
  // articles
  "a",
  "an",
  "the",
  // coordinating conjunctions
  "and",
  "but",
  "for",
  "nor",
  "or",
  "so",
  "yet",
  // prepositions
  "at",
  "by",
  "for",
  "in",
  "of",
  "on",
  "to",
  "with",
];
/**
 * Converts a string to Title Case.
 *
 * Some words should not be capitalized, depending on the language.
 *
 * @param {string} str
 * @param {string[]} [skipWords] Words to skip. Default: english skip words (articles, prepositions, etc.)
 */
function titleCase(str: string, skipWords: string[] = ENGLISH_SKIP_WORDS): string {
  const otherWordsFunction = (word: string) =>
    skipWords.includes(word.toLowerCase()) ? word : capitalize(word);

  const [first, ...rest] = str.split(/(\s)/);
  return [capitalize(first), ...rest.map(otherWordsFunction)].join("");
}

export {
  type Pluralizer,
  basicPluralizer,
  capitalize,
  center,
  formatStr,
  formatTime,
  getCountDown,
  join,
  joinUrl,
  pad,
  parseBool,
  parseFunctionCall,
  parseNumber,
  removeAccents,
  rsplit,
  split,
  uncapitalize,
  camelCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
};
