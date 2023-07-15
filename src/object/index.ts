import {
  isArray,
  isNullOrUndefined,
  isObject,
  isPlainObject,
  isString,
  type DeepArray,
  type DeepNode,
  type Dictionary,
  type Merge,
  type ValueOf,
} from '../index';
import {
  camelCase,
  snakeCase,
  type CamelToSnakeCase,
  type SnakeToCamelCase,
} from '../string';

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
 * Applies SnakeToCamelCase on the keys of an object.
 */
type SnakeToCamelCaseKeys<T extends Dictionary> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

/**
 * Renames all keys to camel case.
 */
function camelCaseKeys<T extends Dictionary>(obj: T): SnakeToCamelCaseKeys<T>;
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
  return isObject(obj) && obj.hasOwnProperty(prop);
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
function rename<T, Mapper extends { [_ in keyof T]?: string } | ((a: string) => string)>(
  obj: T,
  mapper: Mapper,
): Mapper extends Dictionary<string>
  ? { [K in keyof T as K extends keyof Mapper ? Mapper[K] : K]: T[K] }
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
 * Applies CamelToSnakeCase on the keys of an object.
 */
type CamelToSnakeCaseKeys<T extends Dictionary> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};

/**
 * Renames all keys to snake case.
 */
function snakeCaseKeys<T extends Dictionary>(obj: T): CamelToSnakeCaseKeys<T>;
function snakeCaseKeys(obj: Dictionary): Dictionary {
  return rename(obj, snakeCase);
}

/**
 * Used by stringify().
 * @private
 */
function _unknownToString(
  value: unknown,
  options: { indent?: number; pad?: boolean; doubleQuotes?: boolean },
  indenter: string,
  quote: string,
): string {
  return isArray(value) || isPlainObject(value)
    ? stringify(value, options, indenter)
    : isString(value)
    ? `${quote}${value}${quote}`
    : String(value);
}

/**
 * Similar to JSON.stringify(), but optionally pads entries between
 * the key and value to make all lines have the same width.
 *
 * @param obj
 * @param [options]
 * @param {number} [options.indent = 2] The size of the indent. Default: 2
 * @param {boolean} [options.pad = false] Whether to pad entries. Default: false
 * @param {boolean} [options.doubleQuotes = true]  Use double quotes. Default: true
 * @param {string} [inheritedIndent = ""] Used to keep track of the current indent during recursion
 */
function stringify(
  obj: Dictionary | readonly unknown[],
  options?: { indent?: number; pad?: boolean; doubleQuotes?: boolean },
  inheritedIndent = '',
): string {
  const opts = { indent: 2, pad: false, doubleQuotes: true, ...options };
  const { indent, pad, doubleQuotes } = opts;
  const quote = doubleQuotes ? '"' : "'";

  const indenter = inheritedIndent + ' '.repeat(indent);
  let start: string, end: string, formattedEntries: string[];
  if (isPlainObject(obj)) {
    [start, end] = ['{', '}'];

    // padding
    const maxKeyLength = Math.max(...Object.keys(obj).map((key) => key.length));
    formattedEntries = Object.entries(obj).map(([key, value], _) => {
      const spacer = ' '.repeat(pad && indent > 0 ? maxKeyLength - key.length : 0);
      const stringifiedValue = _unknownToString(value, opts, indenter, quote);
      return `${quote}${key}${quote}: ${spacer}${stringifiedValue}`;
    });
  } else {
    [start, end] = ['[', ']'];
    formattedEntries = obj.map((value) => _unknownToString(value, opts, indenter, quote));
  }

  const separator = indent === 0 ? ' ' : '\n';
  const entriesStr = formattedEntries.join(',' + separator + indenter);
  return start + separator + indenter + entriesStr + separator + inheritedIndent + end;
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
  type CamelToSnakeCaseKeys,
  type DeepEmpty,
  type SnakeToCamelCaseKeys,
};
