import {
  CamelToSnakeCaseKeys,
  DeepArray,
  DeepNode,
  Dictionary,
  SnakeToCamelCaseKeys,
  ValueOf,
  isArray,
  isJSObject,
  isString,
  Merge,
} from "../index";
import { camelCase, snakeCase } from "../string";

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

  if (isJSObject(obj)) {
    const newObj = Object.create(Object.getPrototypeOf(obj));
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
function deepMap<T extends DeepArray>(x: T, f: (val: any) => any): T {
  return x.map((val) => (isArray(val) ? deepMap(val, f) : f(val))) as T;
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
  const T extends Dictionary | unknown,
  const Options extends
    | { custom: RegExp }
    | { keys: (key: string) => boolean }
    | { keys: string[] }
    | { values: (value: any) => boolean }
    | { prefix: string; rename?: boolean }
    | { suffix: string; rename?: boolean },
  K extends keyof T,
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
    : Options extends { keys: K[] }
    ? [Pick<T, K>, Omit<T, K>]
    : Options extends { keys: (key: string) => boolean }
    ? [{ [_: string]: ValueOf<T> }, { [_: string]: ValueOf<T> }]
    : Options extends { values: (value: unknown) => boolean }
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
    throw new Error("Missing rule");
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
  obj: Dictionary | unknown[],
  str: string,
  sep = ".",
): unknown | undefined {
  if (!str) return undefined;
  // replace bracket with dot notation
  str = str.replace(/\[(\w+)]/, ".$1");

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
function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop);
}

/**
 * Returns whether the object is deep empty.
 *
 * A deep empty object only has values that are empty strings, empty
 * arrays, empty objects or deep empty objects.
 */
function isDeepEmpty(obj: Dictionary<any>): boolean {
  if (hasOwnProperty(obj, "length")) {
    return obj.length === 0;
  }
  if (typeof obj === "object") {
    return Object.values(obj).reduce((empty, value) => empty && isDeepEmpty(value), true);
  }
  return obj === "";
}

function _handleMergeStrategy(
  target: Dictionary,
  path: string,
  left: unknown,
  right: unknown,
  strategy: string,
  setDeepProp: (src: Dictionary, path: string, value: any) => unknown,
) {
  switch (strategy) {
    case "override":
      setDeepProp(target, path, right);
      break;
    case "concat":
      if (isArray(left)) {
        if (isArray(right)) {
          setDeepProp(target, path, left.concat(right));
        } else {
          throw new Error(`Cannot concat array with ${typeof right} (field '${path}')`);
        }
      } else {
        setDeepProp(target, path, right);
      }
      break;
    default:
      throw new Error(`Unexpected strategy: ${strategy}`);
  }
}

/**
 * Deep merges two objects.
 *
 * Values from the second object override those in the first one,
 * except when both objects hold an array on the same key and the
 * strategy is set to "concat", in which case both arrays are merged.
 *
 * @throws if the strategy is concat, but for a given path the value is an array on the target object but not an array on the source object.
 * @throws if an unexpected strategy is provided.
 */
function merge<
  A extends Dictionary | unknown,
  B extends (Partial<A> & Dictionary) | Dictionary | unknown,
>(
  target: A,
  source: B,
  strategy?: "override" | "concat",
): A extends Dictionary ? (B extends Dictionary ? Merge<A, B> : Dictionary) : Dictionary;
function merge(
  target: Dictionary,
  source: Dictionary,
  strategy: "override" | "concat" = "override",
): Dictionary {
  const sep = ";;";
  const getDeepProp = (src: Dictionary, path: string) => getDeepProperty(src, path, sep);
  const setDeepProp = (src: Dictionary, path: string, value: any) =>
    setDeepProperty(src, path, value, sep);

  const toVisit = new Set<string>(Object.keys(source));
  while (toVisit.size > 0) {
    for (const path of toVisit) {
      toVisit.delete(path);

      const left = getDeepProp(target, path);
      const right = getDeepProp(source, path);
      if (isJSObject(right)) {
        Object.keys(right).forEach((key) => toVisit.add(path + sep + key));
      } else {
        _handleMergeStrategy(target, path, left, right, strategy, setDeepProp);
      }
    }
  }
  return target;
}

/**
 * Copies an object excluding some keys.
 */
function omit<T extends Dictionary, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
function omit(obj: Dictionary, keys: string[]): Dictionary {
  const toKeep = Object.keys(obj).filter((key) => !keys.includes(key));
  return pick(obj, toKeep);
}

/**
 * Copies an object using some keys.
 *
 * Makes a copy of an object using only the given keys. If an entry is
 * not present, it receives the value of undefined.
 */
function pick<T extends Dictionary, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
function pick(obj: Dictionary, keys: string[]): Dictionary {
  const clone = deepClone(obj);
  return Object.fromEntries(keys.map((key) => [key, clone[key]]));
}

/**
 * Returns a copy of an object, with renamed first-level keys.
 */
function rename<
  T extends Dictionary,
  Mapper extends { [_ in keyof T]?: string } | ((a: string) => string),
>(
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
  if (typeof mapper === "function") {
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
  obj: Dictionary | unknown[],
  str: string,
  value: any,
  sep = ".",
): unknown {
  if (!str) return obj;
  // bracket notation -> dot notation
  str = str.replace(/\[(\w+)]/, sep + "$1");

  str.split(sep).reduce<unknown>((element, key, i, paths) => {
    if (isArray(element) && isNaN(Number(key))) {
      throw new Error("Cannot index array with string");
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
 * Renames all keys to snake case.
 */
function snakeCaseKeys<T extends Dictionary>(obj: T): CamelToSnakeCaseKeys<T>;
function snakeCaseKeys(obj: Dictionary): Dictionary {
  return rename(obj, snakeCase);
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
  obj: Dictionary | unknown[] | unknown,
  options?: { indent?: number; pad?: boolean; doubleQuotes?: boolean },
  inheritedIndent = "",
): string {
  const opts = { indent: 2, pad: false, doubleQuotes: true, ...options };
  const { indent, pad, doubleQuotes } = opts;
  const quote = doubleQuotes ? '"' : "'";

  if (isArray(obj) || isJSObject(obj)) {
    const indenter = inheritedIndent + " ".repeat(indent);
    let start: string, end: string, formattedEntries: string[];
    if (isJSObject(obj)) {
      [start, end] = ["{", "}"];

      // padding
      const maxKeyLength = Math.max(...Object.keys(obj).map((key) => key.length));
      formattedEntries = Object.entries(obj).map(([key, value], _) => {
        const spacer = " ".repeat(pad && indent > 0 ? maxKeyLength - key.length : 0);
        return `${quote}${key}${quote}: ${spacer}${stringify(value, opts, indenter)}`;
      });
    } else {
      [start, end] = ["[", "]"];
      formattedEntries = obj.map((element) => stringify(element, opts, indenter));
    }

    const separator = indent === 0 ? " " : "\n";
    const entriesStr = formattedEntries.join("," + separator + indenter);
    return start + separator + indenter + entriesStr + separator + inheritedIndent + end;
  } else {
    if (isString(obj)) {
      return `${quote}${obj}${quote}`;
    } else {
      return String(obj);
    }
  }
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
};
