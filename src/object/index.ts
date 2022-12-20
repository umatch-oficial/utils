import {
  CamelToSnakeCaseKeys,
  DeepArray,
  DeepObject,
  Dictionary,
  SnakeToCamelCaseKeys,
  ValueOf,
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
 * Copies an object and applies func to all keys.
 */
export function apply<T extends Dictionary, R>(
  obj: T,
  func: (val: ValueOf<T>) => R,
): { [K in keyof T]: R };
/**
 * Copies an object and applies func to some keys.
 */
export function apply<T extends Dictionary, R, Keys extends keyof T>(
  obj: T,
  func: (val: ValueOf<T>) => R,
  keys?: Keys[],
): { [K in keyof T]: K extends Keys ? R : T[K] };
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

export function camelCaseKeys<T extends Dictionary>(obj: T): SnakeToCamelCaseKeys<T> {
  // @ts-ignore
  return rename(obj, camelCase);
}

/**
 * Maps the function over deeply nested elements of the object,
 * which are not arrays.
 */
export function deepMap<T extends DeepArray>(x: T, f: (val: any) => any): T {
  return x.map((val) => (Array.isArray(val) ? deepMap(val, f) : f(val))) as T;
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

export function getDeepProperty(obj: DeepObject, str: string, sep = "."): unknown {
  if (!str) return obj;
  // replace bracket with dot notation
  str = str.replace(/\[(\w+)]/, ".$1");

  return str.split(sep).reduce<DeepObject<any>>((prev, key) => prev[key], obj);
}

/**
 * Returns true if the object is deep empty.
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

function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isPlainObject(obj: any): obj is DeepObject {
  if (!isObject(obj)) return false;
  // If has modified constructor
  if (obj.constructor === undefined) return true;

  // If has modified prototype
  const proto = obj.constructor.prototype;
  if (!isObject(proto)) return false;
  // If constructor does not have an Object-specific method
  return proto.hasOwnProperty("isPrototypeOf");
}

/**
 * Deep merge two objects.
 *
 * Values from the second object override those in the first one,
 * except when both objects hold an array on the same key and the
 * strategy is set to "concat", in which case both arrays are merged.
 */
export function merge<
  X extends DeepObject,
  Y extends (Partial<X> & DeepObject) | DeepObject,
>(
  target: X,
  source: Y,
  strategy?: "override" | "concat",
): {
  [K in keyof X | keyof Y]: K extends keyof Y ? Y[K] : K extends keyof X ? X[K] : never;
};
export function merge(
  target: DeepObject,
  source: DeepObject,
  strategy: "override" | "concat" = "override",
): DeepObject {
  const sep = ";;";
  const toVisit = new Set<string>(Object.keys(source));
  while (toVisit.size > 0) {
    for (const path of toVisit) {
      toVisit.delete(path);

      const val = getDeepProperty(source, path, sep);
      if (isPlainObject(val)) {
        setDeepProperty(target, path, {}, sep);
        Object.keys(val).forEach((key) => toVisit.add([path, key].join(sep)));
      } else {
        switch (strategy) {
          case "override":
            setDeepProperty(target, path, val, sep);
            break;
          case "concat":
            let curr;
            try {
              curr = getDeepProperty(target, path, sep);
            } catch (error) {}
            if (Array.isArray(curr)) {
              if (!Array.isArray(val)) {
                throw new Error(`Cannot concat array with ${typeof val} (field ${path})`);
              }
              setDeepProperty(target, path, curr.concat(val), sep);
            } else {
              setDeepProperty(target, path, val, sep);
            }
            break;
          default:
            throw new Error(`Unexpected strategy: ${strategy}`);
        }
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
 * Removes properties from an object.
 */
export function remove<T extends Dictionary, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  keys.forEach((k) => delete obj[k]);
  return obj;
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

export function setDeepProperty(
  obj: DeepObject,
  str: string,
  value: any,
  sep = ".",
): unknown {
  if (!str) return obj;
  // replace bracket with dot notation
  str = str.replace(/\[(\w+)]/, ".$1");

  str.split(sep).reduce<DeepObject>((prev, key, i, array) => {
    if (i === array.length - 1) {
      prev[key] = value;
    }
    return prev[key] as DeepObject;
  }, obj);
  return obj;
}

export function snakeCaseKeys<T extends Dictionary>(obj: T): CamelToSnakeCaseKeys<T> {
  return rename(obj, snakeCase) as CamelToSnakeCaseKeys<T>;
}
