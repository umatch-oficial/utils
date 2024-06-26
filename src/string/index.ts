import chalk, { type Chalk, type ForegroundColor } from 'chalk';
import { DateTime } from 'luxon';
import stringLength from 'string-length';

import { zip } from '../array';
import { divmod } from '../math';

import type { Primitive } from '../index';
import type { DateTimeUnit } from 'luxon';

type ChalkColor = typeof ForegroundColor;
type ToOrdinal = (num: number) => string;
type ToPlural = (word: string, quantity?: number, plural?: string) => string;

/**
 * Replaces NewChar with Char in S.
 */
type Replace<
  S extends string,
  Char extends string,
  NewChar extends string,
  Acc extends string = '',
> = S extends `${infer Before}${Char}${infer After}`
  ? Replace<After, Char, NewChar, `${Acc}${Before}${NewChar}`>
  : Acc extends ''
  ? S
  : `${Acc}${S}`;
/**
 * Trims both ends of a string.
 */
type Trim<S extends string> = S extends ` ${infer After}`
  ? Trim<After>
  : S extends `${infer Before} `
  ? Trim<Before>
  : S;
/**
 * Removes quotes from the start and end of a string.
 */
type Unquote<S extends string, Quote extends "'" | '"' = "'" | '"'> = "'" extends Quote
  ? S extends `'${infer Middle}'`
    ? Middle
    : '"' extends Quote
    ? S extends `"${infer Middle}"`
      ? Middle
      : S
    : S
  : S extends `"${infer Middle}"`
  ? Middle
  : S;

/**
 * Returns the ordinal of a number.
 */
const ordinal: ToOrdinal = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return num + 'st';
  }
  if (j === 2 && k !== 12) {
    return num + 'nd';
  }
  if (j === 3 && k !== 13) {
    return num + 'rd';
  }
  return num + 'th';
};

/**
 * Pluralizes the word if *quantity* is undefined or not 1. Uses the
 * given plural or adds an 's' to the end.
 *
 * @example
 * // returns 'developers'
 * plural('developer')
 * // returns 'developer'
 * plural('developer', 1)
 * // returns 'developers'
 * plural('developer', 2)
 */
const plural: ToPlural = (
  word: string,
  quantity?: number,
  pluralVersion?: string,
): string => {
  const shouldPluralize = quantity === undefined || Math.abs(quantity) !== 1;
  return shouldPluralize ? pluralVersion ?? `${word}s` : word;
};

/**
 * Pads a string on both sides to achieve the desired length.
 *
 * If the number of spaces to add is uneven, the left side gets the
 * extra space.
 */
function center(str: string, length: number, character = ' '): string {
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
  str: string = '',
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
  if (color) fmt = fmt[color];
  if (bgColor) fmt = fmt[('bg' + capitalize(bgColor)) as ChalkColor];
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
    pluralizer?: ToPlural;
    short?: boolean;
  },
): string {
  const { hours, minutes, seconds, milliseconds } = time;
  const { parts, pluralize, dictionary, short } = {
    parts: 2,
    pluralize: plural,
    ...options,
  };
  const { and, hour, minute, second, millisecond } = {
    and: 'and',
    hour: 'hour',
    minute: 'minute',
    second: 'second',
    millisecond: 'millisecond',
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
    return strings.join(' ');
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
 * @throws {Error} if the given dictionary doesn't have entries for all possible units.
 */
function getCountDown(
  date: string | DateTime,
  options?: {
    dictionary?: DateTimeDict;
    pluralizer?: ToPlural;
    short?: boolean;
    unitsThresholds?: readonly (readonly [DateTimeUnit, number])[];
  },
): string {
  const { pluralize, dictionary } = {
    dictionary: {
      day: 'day',
      hour: 'hour',
      minute: 'minute',
    },
    pluralize: plural,
    ...options,
  };
  const now = DateTime.now();
  const then =
    date instanceof DateTime ? date : DateTime.fromISO(date, { setZone: true });
  const unitsThresholds =
    options?.unitsThresholds ??
    ([
      ['day', 1],
      ['hour', 1],
      ['minute', 1],
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
function join(parts: readonly string[], and = '&'): string {
  if (!parts.length) return '';

  const firstParts = parts.slice(0, -1);
  const lastPart = parts.slice(-1)[0];
  if (firstParts.length === 0) return lastPart;
  return [firstParts.join(', '), lastPart].join(` ${and} `);
}

type JoinNonEmpty<
  T extends readonly Primitive[],
  Sep extends string = '',
  Acc extends string = '',
> = T extends readonly [infer Element, ...infer Rest extends readonly Primitive[]]
  ? null | undefined extends Element
    ? JoinNonEmpty<Rest, Sep, Acc>
    : Element extends string
    ? Trim<Element> extends ''
      ? JoinNonEmpty<Rest, Sep, Acc>
      : Acc extends ''
      ? JoinNonEmpty<Rest, Sep, Element>
      : JoinNonEmpty<Rest, Sep, `${Acc}${Sep}${Element}`>
    : Acc extends ''
    ? JoinNonEmpty<Rest, Sep, Element & string>
    : JoinNonEmpty<Rest, Sep, `${Acc}${Sep}${Element & string}`>
  : Acc;

/**
 * Joins an array of primitives, filtering out nulls, undefineds and empty strings.
 */
function joinNonEmpty<T extends readonly Primitive[], Sep extends string = ''>(
  array: T | undefined,
  separator?: Sep,
): JoinNonEmpty<T, Sep>;
function joinNonEmpty(array: readonly Primitive[] | undefined, separator = ''): string {
  if (!array?.length) return '';
  return array
    .filter((e) => e !== undefined && e !== null && e !== '')
    .map((s) => String(s).trim())
    .join(separator);
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
function joinUrl(...parts: readonly string[]): string {
  return parts.map((s) => s.replace(/^\/|\/$/g, '')).join('/');
}

/**
 * Inserts spaces between left and right to achieve the desired length.
 */
function pad(left: string, right: string, length: number): string {
  const spacer = ' '.repeat(Math.max(length - left.length - right.length, 0));
  return left + spacer + right;
}

/**
 * Parses a boolean from the string.
 *
 * @throws {Error} if it fails to parse and there is no default value.
 */
function parseBool(str: string | null | undefined, def?: boolean): boolean {
  switch ((str ?? '').toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
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
 * parseFunctionCall("foo(1, 'bar', true)") // returns ["foo", [1, "bar", true]]
 * parseFunctionCall("foo(1, 'bar', true) + 1") // returns ["", []]
 */
function parseFunctionCall(str: string): [string, Primitive[]] {
  str = str.trim();

  const match = str.match(/^([\w_]+)\(/);
  if (!match) return ['', []];

  const name = match[1];
  const { index } = match;
  const args = [];
  let current = null;
  let openQuote;
  let functionClosed = false;
  str = str.slice(index! + match[0].length);

  const lastChar = str.charAt(str.length - 1);
  for (const char of str) {
    if (openQuote) {
      current = (current || '') + char;
      if (char === openQuote) {
        openQuote = null;
      }
    } else {
      if (char === ',') {
        if (current !== null) {
          args.push(current);
          current = null;
        } else {
          return ['', []];
        }
      } else if (char === '(') {
        return ['', []];
      } else if (char === ')') {
        if (char === lastChar) {
          if (current !== null) args.push(current);
          functionClosed = true;
        } else {
          return ['', []];
        }
      } else if (char === '"' || char === "'") {
        current = (current || '') + char;
        openQuote = char;
      } else {
        if (char !== ' ') {
          current = (current || '') + char;
        }
      }
    }
  }
  if (!functionClosed) return ['', []];

  const parsedArgs = args.map((arg) => {
    try {
      return parseNumber(arg);
    } catch (e) {}
    try {
      return parseBool(arg);
    } catch (e) {}

    return arg.replace(/^['"]/, '').replace(/['"]$/, '');
  });
  return [name, parsedArgs];
}

/**
 * Parses a number from the string.
 *
 * @throws {Error} if it fails to parse and there is no default value.
 */
function parseNumber<T extends number | null = number>(
  str: string | null | undefined,
  def?: T,
): T extends null ? number | null : number {
  const parsed = Number(str);
  if (Number.isNaN(parsed)) {
    if (def === undefined) {
      throw new Error(`Failed to parse number from string '${str}'`);
    }
    // @ts-expect-error conditional return
    return def;
  }
  return parsed;
}

/**
 * Replaces accented letters with their standard versions.
 */
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
function rsplit(str: string | null | undefined, n = -1, sep = ','): string[] {
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
function split(str: string | null | undefined, n = -1, sep = ','): string[] {
  if (!str) return [];

  const parts = str.split(sep);
  if (n === -1) return parts;
  n = Math.min(n, parts.length - 1);

  return [...parts.slice(0, n), parts.slice(n).join(sep)];
}

/**
 * Converts the first character of a string to uppercase.
 */
function capitalize<S extends string>(str: S): Capitalize<S>;
function capitalize(str: string): string {
  const [first, ...rest] = str;
  if (!first) return '';
  return first.toUpperCase() + rest.join('');
}

/**
 * Converts the first character of a string to lowercase.
 */
function uncapitalize<S extends string>(str: S): Uncapitalize<S>;
function uncapitalize(str: string): string {
  const [first, ...rest] = str;
  if (!first) return '';
  return first.toLowerCase() + rest.join('');
}

// the following approach is an approximation, there is no exact solution
const LOWERCASE_LETTER = "[a-zØ-öø-ÿ\\d']";
const UPPERCASE_LETTER = '[A-ZÀ-ÖÚÙÝ]';
/*
This regex splits words where lowercase letters or numbers precede
an uppercase letter.
*/
const WORD_REGEX = new RegExp(
  `${UPPERCASE_LETTER}+${LOWERCASE_LETTER}*|${UPPERCASE_LETTER}?${LOWERCASE_LETTER}+`,
  'g',
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
 * Returns the last letter of a string.
 */
type LastLetter<
  S extends string,
  Previous extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Rest extends ''
    ? S
    : LastLetter<Rest, First>
  : Previous;

/**
 * Converts a string to camelCase.
 */
type CamelCase<
  S extends string,
  Acc extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Acc extends ''
    ? CamelCase<Rest, Lowercase<First>>
    : First extends '_' | ' ' | '-'
    ? CamelCase<Capitalize<Rest>, Acc>
    : CamelCase<Rest, `${Acc}${First}`>
  : Acc;

/**
 * Converts a string to PascalCase.
 */
type PascalCase<
  S extends string,
  Acc extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Acc extends ''
    ? PascalCase<Rest, Uppercase<First>>
    : First extends '_' | ' ' | '-'
    ? PascalCase<Capitalize<Rest>, Acc>
    : PascalCase<Rest, `${Acc}${First}`>
  : Acc;

/**
 * Converts a string to Sentence case.
 */
type SentenceCase<
  S extends string,
  Acc extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Acc extends ''
    ? SentenceCase<Rest, Uppercase<First>>
    : First extends '_' | ' ' | '-'
    ? SentenceCase<Rest, `${Acc} `>
    : First extends Uppercase<First>
    ? LastLetter<Acc> extends ' '
      ? SentenceCase<Rest, `${Acc}${Lowercase<First>}`>
      : SentenceCase<Rest, `${Acc} ${Lowercase<First>}`>
    : SentenceCase<Rest, `${Acc}${First}`>
  : Acc;

/**
 * Converts a string to snake_case.
 */
type SnakeCase<
  S extends string,
  Acc extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Acc extends ''
    ? SnakeCase<Rest, Lowercase<First>>
    : First extends '_' | ' ' | '-'
    ? SnakeCase<Capitalize<Rest>, `${Acc}_`>
    : First extends Uppercase<First>
    ? LastLetter<Acc> extends '_'
      ? SnakeCase<Rest, `${Acc}${Lowercase<First>}`>
      : SnakeCase<Rest, `${Acc}_${Lowercase<First>}`>
    : SnakeCase<Rest, `${Acc}${First}`>
  : Acc;

/**
 * Converts a string to Title Case.
 */
type TitleCase<
  S extends string,
  Acc extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Acc extends ''
    ? TitleCase<Rest, Uppercase<First>>
    : First extends '_' | ' ' | '-'
    ? TitleCase<Capitalize<Rest>, `${Acc} `>
    : First extends Uppercase<First>
    ? LastLetter<Acc> extends ' '
      ? TitleCase<Rest, `${Acc}${First}`>
      : TitleCase<Rest, `${Acc} ${First}`>
    : TitleCase<Rest, `${Acc}${First}`>
  : Acc;

const _camelCase = toCase(uncapitalize, capitalize, '');
/**
 * Converts a string to camelCase.
 *
 * *Warning*: the whole string is considered as one, so if you want to
 * apply the function to parts of a string individually, you must
 * split it and map the function over each unit according to your needs.
 */
function camelCase<S extends string>(str: S): CamelCase<S> {
  return _camelCase(str) as CamelCase<S>;
}

const _pascalCase = toCase(capitalize, capitalize, '');
/**
 * Converts a string to PascalCase.
 *
 * *Warning*: the whole string is considered as one, so if you want to
 * apply the function to parts of a string individually, you must
 * split it and map the function over each unit according to your needs.
 */
function pascalCase<S extends string>(str: S): PascalCase<S> {
  return _pascalCase(str) as PascalCase<S>;
}

const _sentenceCase = toCase(capitalize, uncapitalize, ' ');
/**
 * Converts a string to Sentence case.
 */
function sentenceCase<S extends string>(str: S): SentenceCase<S> {
  return _sentenceCase(str) as SentenceCase<S>;
}

const _snakeCase = toCase(uncapitalize, uncapitalize, '_');
/**
 * Converts a string to snake_case.
 *
 * *Warning*: the whole string is considered as one, so if you want to
 * apply the function to parts of a string individually, you must
 * split it and map the function over each unit according to your needs.
 */
function snakeCase<S extends string>(str: S): SnakeCase<S> {
  return _snakeCase(str) as SnakeCase<S>;
}

const ENGLISH_SKIP_WORDS = [
  // articles
  'a',
  'an',
  'the',
  // coordinating conjunctions
  'and',
  'but',
  'for',
  'nor',
  'or',
  'so',
  'yet',
  // prepositions
  'at',
  'by',
  'for',
  'in',
  'of',
  'on',
  'to',
  'with',
];
/**
 * Converts a string to Title Case.
 *
 * Some words should not be capitalized, depending on the language.
 *
 * @param str
 * @param [skipWords] Words to skip. Default: english skip words (articles, prepositions, etc.)
 */
function titleCase<S extends string>(
  str: S,
  skipWords: readonly string[] = ENGLISH_SKIP_WORDS,
): TitleCase<S> {
  const otherWordsFunction = (word: string) =>
    skipWords.includes(word.toLowerCase()) ? word : capitalize(word);

  return toCase(capitalize, otherWordsFunction, ' ')(str) as TitleCase<S>;
}

export {
  capitalize,
  center,
  formatStr,
  formatTime,
  getCountDown,
  join,
  joinNonEmpty,
  joinUrl,
  ordinal,
  pad,
  parseBool,
  parseFunctionCall,
  parseNumber,
  plural,
  removeAccents,
  rsplit,
  split,
  uncapitalize,
  type DateTimeDict,
  type JoinNonEmpty,
  type LastLetter,
  type Replace,
  type ToOrdinal,
  type ToPlural,
  type Trim,
  type Unquote,
  // case functions
  camelCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  type CamelCase,
  type PascalCase,
  type SentenceCase,
  type SnakeCase,
  type TitleCase,
};
