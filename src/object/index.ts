import {
  CamelToSnakeCaseKeys,
  DeepArray,
  DeepNode,
  Dictionary,
  SnakeToCamelCaseKeys,
  ValueOf,
  isArray,
  isJSObject,
  isNumber,
  isString,
  Merge,
} from "../index";
import { camelCase, snakeCase } from "../string";

/**
 * Checks if a prop exists in obj and tells TypeScript that obj has this prop.
 */
export function hasOwnProperty<X extends Dictionary, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop);
}

/**
 * Copies an object and applies func to all entries.
 */
export function apply<T extends Dictionary, R>(
  obj: T,
  func: (val: ValueOf<T>) => R,
): { [K in keyof T]: R };
/**
 * Copies an object and applies func to entries with given keys.
 */
export function apply<T extends Dictionary, R, Keys extends keyof T>(
  obj: T,
  func: (val: ValueOf<T>) => R,
  keys?: Keys[],
): { [K in keyof T]: K extends Keys ? R : T[K] };
/**
 * Copies an object and applies func to all entries.
 */
export function apply(
  obj: Dictionary,
  func: (val: unknown) => unknown,
  keys?: string[],
): Dictionary {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key,
      keys ? (keys.includes(key) ? func(val) : val) : func(val),
    ]),
  );
}

/**
 * Renames all keys to camel case.
 */
export function camelCaseKeys<T extends Dictionary>(obj: T): SnakeToCamelCaseKeys<T> {
  // @ts-ignore
  return rename(obj, camelCase);
}

/**
 * Maps the function over deeply nested elements of the object,
 * which are not arrays.
 */
export function deepMap<T extends DeepArray>(x: T, f: (val: any) => any): T {
  return x.map((val) => (isArray(val) ? deepMap(val, f) : f(val))) as T;
}

/**
 * Filters the keys of an object, which contain the prefix/suffix.
 * If OnlyAffix is true, then subtracts the prefix/suffix part
 * of those keys.
 */
type PickAffixes<
  Obj extends Dictionary,
  Prefix extends string | null,
  Suffix extends string | null,
  OnlyAffix extends boolean,
> = Prefix extends string
  ? {
      [Key in keyof Obj]: Key extends `${Prefix}${infer T}`
        ? OnlyAffix extends true
          ? T
          : Key
        : never;
    }
  : {
      [Key in keyof Obj]: Key extends `${infer T}${Suffix}`
        ? OnlyAffix extends true
          ? T
          : Key
        : never;
    };
type RenameKeys<
  Obj extends Dictionary,
  Prefix extends string | null,
  Suffix extends string | null,
> = Prefix extends string
  ? {
      [Key in PickAffixes<Obj, Prefix, null, true>[keyof Obj]]: Obj[`${Prefix}${Key}`];
    }
  : {
      [Key in PickAffixes<Obj, null, Suffix, true>[keyof Obj]]: Obj[`${Key}${Suffix}`];
    };
type ExtractOptions = ({ prefix: string } | { suffix: string } | { custom: RegExp }) & {
  rename?: boolean;
};

/**
 * Dynamic version of pick.
 *
 * Receives either a prefix, a suffix or a custom regular expression.
 * Picks keys from the original object, which match the matcher, then renames the
 * keys to remove the matcher.
 *
 * For TypeScript to function correctly, use the function as follows:
 * ```
 * const newObj = extract(obj, { prefix: 'user_' } as const);
 * ```
 */
export function extract<
  R extends Dictionary,
  Obj extends Dictionary,
  Options extends ExtractOptions,
>(
  obj: Obj,
  options: Options,
): Options extends { prefix: string }
  ? Options extends { rename: false }
    ? Pick<Obj, PickAffixes<Obj, Options["prefix"], null, false>[keyof Obj]>
    : RenameKeys<Obj, Options["prefix"], null>
  : Options extends { suffix: string }
  ? Options extends { rename: false }
    ? Pick<Obj, PickAffixes<Obj, null, Options["suffix"], false>[keyof Obj]>
    : RenameKeys<Obj, null, Options["suffix"]>
  : R;
export function extract(obj: Dictionary, options: ExtractOptions): Dictionary {
  let pat: RegExp;
  if (hasOwnProperty(options, "prefix")) {
    pat = new RegExp(`^${options.prefix}(.+)`);
  } else if (hasOwnProperty(options, "suffix")) {
    pat = new RegExp(`(.+)${options.suffix}$`);
  } else if (hasOwnProperty(options, "custom")) {
    pat = options.custom as RegExp;
  }

  const keys = Object.keys(obj).filter((k) => k.match(pat));
  const newObj = pick(obj, keys);
  if (options.rename ?? true) {
    return rename(newObj, (key) => {
      const groups = key.match(pat);
      return groups ? groups[1] : "";
    });
  }
  return newObj;
}

/**
 * Returns a deep property of an object given a path-like string.
 *
 * @example
 * // returns 9
 * getDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]')
 */
export function getDeepProperty(obj: Dictionary, str: string, sep = "."): unknown {
  if (!str) return obj;
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
 * Returns whether the object is deep empty.
 *
 * A deep empty object only has values that are empty strings, empty
 * arrays, empty objects or deep empty objects.
 */
export function isDeepEmpty(obj: Dictionary<any>): boolean {
  if (hasOwnProperty(obj, "length")) {
    return obj.length === 0;
  }
  if (typeof obj === "object") {
    return Object.values(obj).reduce((empty, value) => empty && isDeepEmpty(value), true);
  }
  return true;
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
export function merge<
  A extends Dictionary | unknown,
  B extends (Partial<A> & Dictionary) | Dictionary | unknown,
>(
  target: A,
  source: B,
  strategy?: "override" | "concat",
): A extends Dictionary ? (B extends Dictionary ? Merge<A, B> : Dictionary) : Dictionary;
export function merge(
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
export function omit<T extends Dictionary, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}

/**
 * Copies an object using some keys.
 *
 * Makes a copy of an object using only the given keys. If an entry is not
 * present, it receives the value of undefined.
 */
export function pick<T extends Dictionary, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return Object.fromEntries(keys.map((key) => [key, obj[key]])) as Pick<T, K>;
}

/**
 * Removes properties from an object, whose keys are in the array.
 * Returns a new object with the removed entries.
 *
 * @example
 * const data = { apple: 1, banana: 2 };
 * const { apple } = remove(data, ["apple"]);
 * // 1, { banana: 2 }
 * console.log(apple, obj);
 */
export function remove<T extends Dictionary, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K>;
/**
 * Removes properties from an object, whose keys pass the filter.
 * Returns a new object with the removed entries.
 *
 * @example
 * const data = { apple: 1, banana: 2 };
 * const { banana } = remove(data, { keys: (key) => key[0] === 'b' });
 * // 2, { apple: 1 }
 * console.log(banana, obj);
 */
export function remove<T extends Dictionary>(
  obj: T,
  filter: { keys: (key: PropertyKey) => boolean },
): { [_: string]: ValueOf<T> };
/**
 * Removes properties from an object, whose values fail the filter.
 * Returns a new object with the removed entries.
 *
 * @example
 * const data = { apple: 1, banana: 2 };
 * const { apple } = remove(data, { values: (v) => v > 1 });
 * // 1, { banana: 2 }
 * console.log(apple, data);
 */
export function remove<T extends Dictionary>(
  obj: T,
  filter: { values: (value: unknown) => boolean },
): { [_: string]: ValueOf<T> };
/**
 * Removes properties from an object by list of keys or filter function.
 * Returns a new object with the removed entries.
 *
 * @example
 * const data = { apple: 1, banana: 2 };
 * const { apple } = remove(data, ["apple"]);
 * // 1, { banana: 2 }
 * console.log(apple, obj);
 */
export function remove<T extends Dictionary, K extends keyof T>(
  obj: T,
  mapper:
    | K[]
    | { keys: (key: PropertyKey) => boolean }
    | { values: (value: unknown) => boolean },
): { [_: string]: ValueOf<T> };
/**
 * Removes properties from an object by list of keys or filter function.
 * Returns a new object with the removed entries.
 *
 * @example
 * const data = { apple: 1, banana: 2 };
 * const { apple } = remove(data, ["apple"]);
 * // 1, { banana: 2 }
 * console.log(apple, obj);
 */
export function remove(
  obj: Dictionary,
  mapper:
    | PropertyKey[]
    | { keys?: (key: PropertyKey) => boolean; values?: (value: unknown) => boolean },
): Dictionary {
  let keysToRemove: PropertyKey[];
  if (isArray(mapper)) {
    keysToRemove = mapper;
  } else {
    const { keys: keysFilter, values: valuesFilter } = mapper;
    if (keysFilter && valuesFilter) {
      throw new Error(
        "Undefined behavior when both 'keys' and 'values' are present in mapper",
      );
    } else if (keysFilter) {
      keysToRemove = Object.keys(obj).filter(keysFilter);
    } else if (valuesFilter) {
      keysToRemove = Object.entries(obj)
        .filter(([_, v]) => !valuesFilter(v))
        .map(([k]) => k);
    } else {
      throw new Error("Missing 'keys' or 'values' filter function in mapper");
    }
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => {
      if (keysToRemove.includes(key)) {
        delete obj[key];
        return true;
      }
      return false;
    }),
  );
}

/**
 * Returns a copy of an object, with renamed first-level keys.
 */
export function rename<
  T extends Dictionary,
  Mapper extends { [_ in keyof T]?: string } | ((a: string) => string),
>(
  obj: T,
  mapper: Mapper,
): Mapper extends Dictionary<string>
  ? { [K in keyof T as K extends keyof Mapper ? Mapper[K] : K]: T[K] }
  : { [_: string]: ValueOf<T> };
export function rename(
  obj: Dictionary,
  mapper: Dictionary<string> | ((a: string) => string),
): Dictionary {
  const entries = Object.entries(obj);
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
 */
export function setDeepProperty(
  obj: Dictionary,
  str: string,
  value: any,
  sep = ".",
): unknown {
  if (!str) return obj;
  // bracket notation -> dot notation
  str = str.replace(/\[(\w+)]/, sep + "$1");

  str.split(sep).reduce<Dictionary>((prev, key, i, array) => {
    if (i === array.length - 1) {
      prev[key] = value;
    } else if (!prev[key]) {
      if (isNumber(key)) {
        // the code cannot know whether the key was meant to index an object or an array,
        // therefore it cannot fill the empty spot automatically.
        throw new Error("Undefined behavior when key is a number and path is not found");
      }

      prev[key] = {};
    }
    return prev[key] as Dictionary;
  }, obj);
  return obj;
}

/**
 * Renames all keys to snake case.
 */
export function snakeCaseKeys<T extends Dictionary>(obj: T): CamelToSnakeCaseKeys<T> {
  return rename(obj, snakeCase) as CamelToSnakeCaseKeys<T>;
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
export function stringify(
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
