import {
  isArray,
  isNullOrUndefined,
  isObject,
  isPlainObject,
  isPrimitive,
  isString,
  type DeepArray,
  type DeepNode,
  type Dictionary,
  type Merge,
  type ValueOf,
} from '../index';
import { sumProperty } from '../math';
import { camelCase, snakeCase, type SnakeCase, type CamelCase } from '../string';

/**
 * Copies an object and applies a function to all values. If keys is
 * specified, only applies the function to those keys.
 */
function apply<T extends Dictionary, R, Keys extends readonly (keyof T)[]>(
  obj: T,
  func: (val: ValueOf<T>) => R,
  keys?: Keys,
): Keys extends undefined
  ? { [K in keyof T]: R }
  : { [K in keyof T]: K extends Keys[number] ? R : T[K] };
function apply(
  obj: Dictionary,
  func: (val: unknown) => unknown,
  keys?: readonly PropertyKey[],
): Dictionary {
  const clone = deepClone(obj);
  for (const key in clone) {
    if (keys && !keys.includes(key)) continue;
    clone[key] = func(clone[key]);
  }
  return clone;
}

/**
 * Applies camelCase on the keys of an object.
 */
type CamelCaseKeys<T extends Dictionary> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};

/**
 * Renames all keys to camel case.
 */
function camelCaseKeys<T extends Dictionary>(obj: T): CamelCaseKeys<T>;
function camelCaseKeys(obj: Dictionary): Dictionary {
  return rename(obj, camelCase);
}

/**
 * Returns a deep clone of the object.
 *
 * Similar to structuredClone, except that it only treats plain
 * objects and arrays as values, and copies all other types by
 * reference.
 */
function deepClone<T>(obj: T): T;
function deepClone(obj: unknown): unknown {
  if (isArray(obj)) return obj.map(deepClone);

  if (isPlainObject(obj)) {
    const newObj = Object.create(Object.getPrototypeOf(obj) as object) as {
      [key: string]: unknown;
    };
    Object.entries(obj).forEach(([key, value]) => {
      newObj[key] = value === obj ? newObj : deepClone(value);
    });
    return newObj;
  }

  return obj;
}

/**
 * Maps the function over deeply nested elements of the object,
 * which are not arrays.
 */
function deepMap<Value, T extends DeepArray<Value>>(
  x: T,
  f: (value: Value) => unknown,
): T {
  return x.map((val) => (isArray(val) ? deepMap(val, f) : f(val))) as DeepArray as T;
}

/**
 * Dynamic version of pick.
 *
 * Returns two copies of an object: one containing only the keys that
 * match the rule, and another one containing the keys that don't
 * match. The rule can be a pattern (prefix, suffix or custom regular
 * expression), a list of keys, a function to filter keys, or a
 * function to filter values. If the rule is a prefix or suffix,
 * removes the prefix/suffix from the matched keys (can be turned off
 * with the rename option).
 */
function extract<
  const T extends Dictionary,
  K extends keyof T,
  V extends ValueOf<T>,
  const Options extends
    | { custom: RegExp }
    | { keys: (key: K) => boolean }
    | { keys: readonly string[] }
    | { values: (value: V) => boolean }
    | { prefix: string; rename?: boolean }
    | { suffix: string; rename?: boolean },
>(
  obj: T,
  options: Options,
): T extends Dictionary
  ? Options extends { prefix: infer Prefix }
    ? [
        {
          [Key in keyof T as Key extends `${Prefix & string}${infer Rest}`
            ? Options extends { rename: false }
              ? Key
              : Rest
            : never]: T[Key];
        },
        {
          [Key in keyof T as Key extends `${Prefix & string}${infer _}`
            ? never
            : Key]: T[Key];
        },
      ]
    : Options extends { suffix: infer Suffix }
    ? [
        {
          [Key in keyof T as Key extends `${infer Rest}${Suffix & string}`
            ? Options extends { rename: false }
              ? Key
              : Rest
            : never]: T[Key];
        },
        {
          [Key in keyof T as Key extends `${infer _}${Suffix & string}`
            ? never
            : Key]: T[Key];
        },
      ]
    : Options extends { keys: readonly K[] }
    ? [Pick<T, K>, Omit<T, K>]
    : Options extends { keys: (key: string) => boolean }
    ? [{ [_: string]: ValueOf<T> }, { [_: string]: ValueOf<T> }]
    : Options extends { values: (value: V) => boolean }
    ? [{ [_: string]: ValueOf<T> }, { [_: string]: ValueOf<T> }]
    : never
  : Dictionary;
function extract(
  obj: Dictionary,
  options: {
    prefix?: string;
    suffix?: string;
    custom?: RegExp;
    keys?: ((key: string) => boolean) | string[];
    values?: (value: unknown) => boolean;
    rename?: boolean;
  },
): [Dictionary, Dictionary] {
  const opts = { rename: true, ...options };
  const { prefix, suffix, custom, keys, values } = opts;

  let pat = null;
  let keysFilter = null;
  let valuesFilter = null;
  if (prefix) {
    pat = new RegExp(`^${prefix}(.+)`);
  } else if (suffix) {
    pat = new RegExp(`(.+)${suffix}$`);
  } else if (custom) {
    pat = custom;
  } else if (keys) {
    if (Array.isArray(keys)) {
      keysFilter = (key: string) => keys.includes(key);
    } else {
      keysFilter = keys;
    }
  } else if (values) {
    valuesFilter = values;
  } else {
    throw new Error('Missing rule');
  }

  const clone = deepClone(obj);
  const pickedEntries = [];
  const notPickedEntries = [];
  for (const [key, value] of Object.entries(clone)) {
    if (pat) {
      const match = key.match(pat);
      if (match) {
        if (opts.rename) {
          pickedEntries.push([match[1], value]);
        } else {
          pickedEntries.push([key, value]);
        }
      } else {
        notPickedEntries.push([key, value]);
      }
    } else if (keysFilter) {
      if (keysFilter(key)) {
        pickedEntries.push([key, value]);
      } else {
        notPickedEntries.push([key, value]);
      }
    } else if (valuesFilter) {
      if (valuesFilter(value)) {
        pickedEntries.push([key, value]);
      } else {
        notPickedEntries.push([key, value]);
      }
    }
  }
  return [Object.fromEntries(pickedEntries), Object.fromEntries(notPickedEntries)];
}

/**
 * Returns a deep property of an object given a path-like string.
 *
 * @example
 * // returns 9
 * getDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]')
 */
function getDeepProperty(
  obj: Dictionary | readonly unknown[],
  str: string,
  sep = '.',
): unknown {
  if (!str) return undefined;
  // replace bracket with dot notation
  str = str.replace(/\[(\w+)]/, '.$1');

  return str
    .split(sep)
    .reduce<DeepNode>(
      (prev, key) => (prev ? prev[key as keyof typeof prev] : undefined),
      obj,
    );
}

/**
 * Checks if a prop exists in obj and tells TypeScript that obj has this prop.
 */
function hasOwnProperty<X, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return !isNullOrUndefined(obj) && (Object.hasOwn(obj as object, prop) as boolean);
}

/**
 * A deep empty object only has values that are empty strings, empty
 * arrays, empty objects or deep empty objects.
 */
type DeepEmpty = {
  [key: PropertyKey]: '' | readonly [] | Record<PropertyKey, never> | DeepEmpty;
};

/**
 * Returns whether the object is [deep empty]{@link DeepEmpty}.
 */
function isDeepEmpty(obj: unknown): obj is DeepEmpty {
  return isNullOrUndefined(obj)
    ? false
    : isArray(obj)
    ? obj.length === 0
    : isString(obj)
    ? obj === ''
    : isObject(obj)
    ? Object.values(obj).reduce<boolean>(
        (isEmpty, value) => isEmpty && isDeepEmpty(value),
        true,
      )
    : false;
}

function _merge(
  target: Dictionary,
  source: Dictionary,
  strategy: 'override' | 'concat',
): Dictionary {
  for (const [key, rightValue] of Object.entries(source)) {
    const leftValue = target[key];
    if (isPlainObject(leftValue) && isPlainObject(rightValue)) {
      target[key] = _merge(leftValue, rightValue, strategy);
    } else if (strategy === 'concat' && isArray(leftValue) && isArray(rightValue)) {
      target[key] = leftValue.concat(rightValue);
    } else {
      target[key] = rightValue;
    }
  }
  return target;
}

/**
 * Deep merges two objects.
 *
 * Values from the second object override those in the first one,
 * except when both objects hold an array on the same key and the
 * strategy is set to "concat", in which case both arrays are merged.
 *
 * @throws if an unexpected strategy is provided.
 */
function merge<A, B extends Partial<A> | Dictionary>(
  target: A,
  source: B,
  strategy?: 'override' | 'concat',
): Merge<A, B>;
function merge(
  target: Dictionary,
  source: Dictionary,
  strategy: 'override' | 'concat' = 'override',
): Dictionary {
  if (!['concat', 'override'].includes(strategy)) {
    throw new Error(`Unexpected strategy: ${strategy}`);
  }

  const clonedTarget = deepClone(target);
  const clonedSource = deepClone(source);
  _merge(clonedTarget, clonedSource, strategy);
  return clonedTarget;
}

/**
 * Copies an object excluding some keys.
 */
function omit<T, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K>;
function omit(obj: Dictionary, keys: readonly string[]): Dictionary {
  const toKeep = Object.keys(obj).filter((key) => !keys.includes(key));
  return pick(obj, toKeep);
}

/**
 * Copies an object using some keys.
 *
 * Makes a copy of an object using only the given keys. If an entry is
 * not present, it receives the value of undefined.
 */
function pick<T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>;
function pick(obj: Dictionary, keys: readonly string[]): Dictionary {
  const clone = deepClone(obj);
  return Object.fromEntries(keys.map((key) => [key, clone[key]]));
}

/**
 * Returns a copy of an object, with renamed first-level keys.
 */
function rename<
  T,
  const Mapper extends { [_ in keyof T]?: string } | ((a: string) => string),
>(
  obj: T,
  mapper: Mapper,
): Mapper extends Dictionary<string>
  ? {
      [K in Exclude<keyof T, ValueOf<Mapper>> as K extends keyof Mapper
        ? Mapper[K]
        : K]: T[K];
    }
  : { [_: string]: ValueOf<T> };
function rename(
  obj: Dictionary,
  mapper: Dictionary<string> | ((a: string) => string),
): Dictionary {
  const clone = structuredClone(obj);
  const entries = Object.entries(clone);
  if (typeof mapper === 'function') {
    return Object.fromEntries(entries.map(([key, val]) => [mapper(key), val]));
  }

  const keys = Object.keys(mapper);
  return Object.fromEntries(
    entries.map(([key, val]) => [keys.includes(key) ? mapper[key] : key, val]),
  );
}

/**
 * Sets a deep property of an object given a path-like string.
 *
 * @example
 * // returns { a: { b: [2,3,5] } }
 * setDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]', 5)
 *
 * @throws if some object in the path is an array, but the next key is not a number.
 */
function setDeepProperty(
  obj: Dictionary | readonly unknown[],
  str: string,
  value: unknown,
  sep = '.',
): unknown {
  if (!str) return obj;
  // bracket notation -> dot notation
  str = str.replace(/\[(\w+)]/, sep + '$1');

  str.split(sep).reduce<unknown>((element, key, i, paths) => {
    if (isArray(element) && isNaN(Number(key))) {
      throw new Error('Cannot index array with string');
    }
    if (i === paths.length - 1) {
      // end of the path - set the value
      (element as Dictionary)[key] = value;
    } else {
      // return the next element
      const next = (element as Dictionary)[key];
      if (next === undefined) {
        (element as Dictionary)[key] = {};
      }
      return (element as Dictionary)[key];
    }
  }, obj as Dictionary);
  return obj;
}

/**
 * Applies snake_case on the keys of an object.
 */
type SnakeCaseKeys<T extends Dictionary> = {
  [K in keyof T as SnakeCase<K & string>]: T[K];
};

/**
 * Renames all keys to snake case.
 */
function snakeCaseKeys<T extends Dictionary>(obj: T): SnakeCaseKeys<T>;
function snakeCaseKeys(obj: Dictionary): Dictionary {
  return rename(obj, snakeCase);
}

/**
 * Similar to JSON.stringify(), with some additional formatting options.
 *
 * @param obj
 * @param [options]
 * @param {boolean} [options.doubleQuotes = true] Use double quotes. Default: true.
 * @param {number} [options.indentSize = 2] Size of the indent. Default: 2.
 * @param {number} [options.length] Maximum length of a line. Default: the longest key +
 * primitive value pair in the object.
 * @param {boolean} [options.pad = false] Add padding between keys and values. Default:
 * false
 * @param {string} [options.wrap = 'chop'] Chop or wrap arrays. Chop means inserting a
 * line break between each element, while wrapping inserts line breaks only as necessary
 * to respect the length option. If the length is undefined, 'chop' is used. Default:
 * 'chop if long'.
 */
function stringify(
  obj: Dictionary,
  options?: {
    doubleQuotes?: boolean;
    indentSize?: number;
    length?: number;
    pad?: boolean;
    wrap?: 'chop' | 'chop if long' | 'wrap if long';
  },
): string {
  const indentSize = options?.indentSize ?? 2;
  if (indentSize < 0) throw new Error('Indent must be positive');

  let length;
  if (options?.length) {
    length = options.length;
  } else {
    length = Object.entries(obj).reduce<number | undefined>((acc, [key, value]) => {
      if (!isPrimitive(value)) return undefined;

      const indenter = ' '.repeat(indentSize);
      const stringifiedValue = isString(value) ? `"${value}"` : String(value);
      const stringifiedEntry = `${indenter}"${key}": ${stringifiedValue}`;

      const entryLength = stringifiedEntry.length;
      return acc ? (entryLength > acc ? entryLength : acc) : entryLength;
    }, undefined);
  }
  return _stringify(
    obj,
    {
      indentSize,
      length,
      pad: options?.pad ?? false,
      wrap: options?.wrap ?? 'chop if long',
      quote: options?.doubleQuotes === false ? "'" : '"',
    },
    0,
  );
}

/**
 * Recursive implementation of stringify().
 * @private
 */
function _stringify(
  obj: unknown,
  options: {
    indentSize: number;
    length?: number;
    pad: boolean;
    quote: string;
    wrap: 'chop' | 'chop if long' | 'wrap if long';
  },
  level: number,
  keyLength = 0,
): string {
  const { indentSize, length, pad, quote, wrap } = options;

  const shouldBreak = indentSize > 0;
  const lineBreak = '\n';
  const previousIndent = ' '.repeat(indentSize * level);
  const indent = ' '.repeat(indentSize * (level + 1));

  if (isPlainObject(obj)) {
    const formattedEntries = Object.entries(obj).map(([key, value]) => {
      const stringifiedKey = `${indent}${quote}${key}${quote}`;
      const stringifiedValue = _stringify(
        value,
        options,
        level + 1,
        stringifiedKey.length,
      );
      const parts = [stringifiedKey, ': ', stringifiedValue];
      const totalLength = sumProperty(parts, 'length');
      if (pad && length && totalLength < length) {
        const spacerLength = length - totalLength;
        const padding = ' '.repeat(spacerLength);
        parts.splice(2, 0, padding);
      }
      return parts.join('');
    });

    const separator = shouldBreak ? lineBreak : ' ';
    const entriesStr = formattedEntries.join(',' + separator);
    return '{' + separator + entriesStr + separator + previousIndent + '}';
  } else if (isArray(obj)) {
    const chopArray = (array: ReadonlyArray<unknown>): string => {
      const formattedEntries = array.map((value) =>
        isPrimitive(value)
          ? indent + unknownToString(value)
          : indent + _stringify(value, options, level + 1),
      );
      return (
        '[' +
        lineBreak +
        formattedEntries.join(',' + lineBreak) +
        lineBreak +
        previousIndent +
        ']'
      );
    };

    if (wrap === 'chop') return chopArray(obj);

    const formattedEntries = obj.map((value) => _stringify(value, options, level + 1));
    const formatted = '[ ' + formattedEntries.join(', ') + ' ]';
    const isMultiline = formatted.includes(lineBreak);
    if (!length) {
      // there's no length - wrap cannot be used
      if (isMultiline) {
        return chopArray(obj);
      } else {
        return formatted;
      }
    } else {
      const wrapArray = (array: ReadonlyArray<unknown>): string => {
        let line = '[';
        let position = keyLength + 2 + line.length;
        for (let i = 0; i < array.length; i += 1) {
          const isLastEntry = i === array.length - 1;
          const entry = _stringify(array[i], options, level);

          if (isLastEntry) {
            if (position + entry.length + 3 > length) {
              line += lineBreak + indent + entry;
            } else {
              line += ' ' + entry;
            }
          } else {
            if (position + entry.length + 2 > length) {
              line += lineBreak + indent + entry + ',';
              position = indent.length + entry.length;
            } else {
              line += ' ' + entry + ',';
              position += entry.length + 2;
            }
          }
        }
        return line + ' ]';
      };
      const totalLength = formatted.length + keyLength + 2;
      if (isMultiline || totalLength > length) {
        if (wrap === 'chop if long') {
          return chopArray(obj);
        } else {
          return wrapArray(obj);
        }
      } else {
        return formatted;
      }
    }
  } else {
    return unknownToString(obj);
  }
}

function unknownToString(value: unknown): string {
  return isString(value) ? `"${value}"` : String(value);
}

export {
  apply,
  camelCaseKeys,
  deepClone,
  deepMap,
  extract,
  getDeepProperty,
  hasOwnProperty,
  isDeepEmpty,
  merge,
  omit,
  pick,
  rename,
  setDeepProperty,
  snakeCaseKeys,
  stringify,
  type CamelCaseKeys,
  type DeepEmpty,
  type SnakeCaseKeys,
};
