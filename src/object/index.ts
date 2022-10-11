import { CamelToSnakeCaseKeys, Dictionary, SnakeToCamelCaseKeys } from "../index";
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
 * Copies an object and applies func to each value.
 */
export function apply<T, O extends Dictionary<T>, R>(
  obj: O,
  func: (val: T) => R,
): { [K in keyof O]: R } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, func(val)] as [keyof O, R][]),
  );
}

export function camelCaseKeys<T extends Dictionary>(obj: T): SnakeToCamelCaseKeys<T> {
  return rename(obj, camelCase) as SnakeToCamelCaseKeys<T>;
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
 * Returns true if the object is deep empty.
 *
 * A deep empty object only has values that are empty strings, empty
 * arrays, empty objects or deep empty objects.
 */
export function isDeepEmpty(obj: Dictionary): boolean {
  if (hasOwnProperty(obj, "length")) {
    return obj.length === 0;
  }
  if (typeof obj === "object") {
    return Object.values(obj).reduce((empty, value) => empty && isDeepEmpty(value), true);
  }
  return true;
}

/**
 * Assigns all properties from one object to another.
 */
export function merge<
  X extends Dictionary,
  Y extends (Partial<X> & Dictionary) | Dictionary,
>(
  target: X,
  source: Y,
): {
  [K in keyof X | keyof Y]: K extends keyof Y ? Y[K] : K extends keyof X ? X[K] : never;
};
export function merge(target: Dictionary, source: Dictionary): Dictionary {
  Object.entries(source).forEach(([k, v]) => {
    target[k] = v;
  });
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
  Obj extends Dictionary,
  Mapper extends Dictionary<string> | ((a: string) => string),
>(
  obj: Obj,
  mapper: Mapper,
): Mapper extends Dictionary ? { [K in keyof Mapper]: Obj[Mapper[K]] } : Obj;
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

export function snakeCaseKeys<T extends Dictionary>(obj: T): CamelToSnakeCaseKeys<T> {
  return rename(obj, snakeCase) as CamelToSnakeCaseKeys<T>;
}
