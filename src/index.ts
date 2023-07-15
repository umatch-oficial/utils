type Primitive = string | number | boolean | bigint | undefined | null;
type Dictionary<T = unknown> = { [_: string]: T };
type Payload = Dictionary<Primitive>;

/**
 * Returns an union of the input type and an array of the input type.
 */
type OneOrArray<T = unknown> = T | readonly T[];
/**
 * Returns whether an array is readonly.
 */
type IsReadonly<T extends readonly unknown[]> = T extends unknown[] ? false : true;

/**
 * A possibly deeply nested value.
 */
type DeepNode<T = unknown> = T | DeepArray<T> | DeepObject<T>;
/**
 * An array of possibly deeply nested values.
 */
type DeepArray<T = unknown> = readonly DeepNode<T>[];
/**
 * An object, whose values may be deeply nested.
 */
type DeepObject<T = unknown> = { [_: string]: DeepNode<T> };
/**
 * Returns a union of the values of an object, similar to 'keyof'.
 */
type ValueOf<T> = T[keyof T];
/**
 * Returns a union of the values of a deeply nested object.
 */
type DeepValueOf<T> = T extends { [key: PropertyKey]: unknown }
  ? DeepValueOf<T[keyof T]>
  : T;
/**
 * Flattens a tuple.
 */
type Flatten<
  Y extends readonly unknown[],
  Acc extends readonly unknown[] = [],
> = Y extends readonly [infer H, ...infer T]
  ? H extends readonly unknown[]
    ? Flatten<T, readonly [...Acc, H[number]]>
    : Flatten<T, readonly [...Acc, H]>
  : Acc;
/**
 * Changes the type of value to B for keys in A
 */
type TransformValuesByKey<T, A extends keyof T, B> = {
  [K in keyof T]: K extends A ? (T[K] extends undefined ? B | undefined : B) : T[K];
};
/**
 * Changes the type of values matching A to B
 */
type TransformValues<T, A, B> = {
  [K in keyof T]: T[K] extends A ? B : T[K] extends A | undefined ? B | undefined : T[K];
};
/**
 * Changes the type of values matching A to A | B
 */
type ExtendValues<T, A, B> = TransformValues<T, A, A | B>;
/**
 * From T, pick a set of properties whose values are of some type.
 */
// https://stackoverflow.com/questions/46583883/typescript-pick-properties-with-a-defined-type
type PickByType<T, Value> = {
  [K in keyof T as T[K] extends Value | undefined ? K : never]: T[K];
};
/**
 * Deep merges two dictionaries. Values from the right have higher priority.
 */
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? K extends keyof A
      ? A[K] extends Dictionary
        ? B[K] extends Dictionary
          ? Merge<A[K], B[K]> // A[K] and B[K] are dicts
          : B[K] // A[K] is a dict, B[K] isn't
        : B[K] // K is keyof both
      : B[K] // K is keyof B, but not A
    : K extends keyof A
    ? A[K] // K is keyof A, but not B
    : never; // impossible
};
/**
 * Excludes types present in B from A.
 */
type Subtract<
  A extends readonly unknown[],
  B extends readonly unknown[],
  Acc extends readonly unknown[] = [],
> = A extends readonly [infer H, ...infer T]
  ? H extends B[number]
    ? Subtract<T, B, Acc>
    : Subtract<T, B, readonly [...Acc, H]>
  : Acc;

/**
 * Brands an object.
 */
// https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d
type Brand<T, B extends string> = T & { __brand: B };

/**
 * Asserts two types are equal.
 */
// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

/**
 * Joins two strings or numbers unless either one is undefined.
 */
// https://javascript.plainenglish.io/advanced-typescript-type-level-nested-object-paths-7f3d8901f29a
type Join<
  L extends PropertyKey | undefined = undefined,
  R extends PropertyKey | undefined = undefined,
  Sep extends string = '.',
> = L extends string | number
  ? R extends string | number
    ? `${L}${Sep}${R}`
    : L
  : R extends string | number
  ? R
  : undefined;
/**
 * Makes a Union between two types removing undefined.
 */
type Union<L, R> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;
/**
 * Takes an object and returns a union of all the deep paths
 * to properties in it, using dot notation.
 */
type NestedPaths<
  T,
  Base extends PropertyKey | undefined = undefined,
  Prev extends PropertyKey | undefined = undefined,
> = T extends Dictionary
  ? ValueOf<{
      [K in keyof T]: T[K] extends Dictionary
        ? NestedPaths<T[K], Union<Base, Prev>, Join<Prev, K>>
        : Union<Base, Union<Prev, Join<Prev, K>>>;
    }>
  : string;
/**
 * Takes an object and a path string that uses dot notation
 * and returns the type of the deep property at the path.
 */
type TypeFromPath<O, P extends string> = P extends string
  ? O extends Dictionary
    ? P extends keyof O
      ? O[P]
      : P extends `${infer H}.${infer T}`
      ? H extends keyof O
        ? TypeFromPath<O[H], T>
        : never
      : never
    : never
  : unknown;

/**
 * Returns a union of the types in the tuple.
 */
// https://medium.hexlabs.io/building-complex-types-in-typescript-804c973ce66f
type TupleToUnion<T> = T extends unknown[] ? T[number] : T;
type UnionToIntersection<T> = (T extends never ? never : (arg: T) => void) extends (
  arg: infer I,
) => void
  ? I
  : never;
type UnionToTuple<T, Acc extends unknown[] = []> = UnionToIntersection<
  T extends never ? never : (arg: T) => T
> extends (_: never) => infer W
  ? UnionToTuple<Exclude<T, W>, [W, ...Acc]>
  : Acc;

/**
 * Returns whether obj is an array.
 *
 * Uses Array.isArray().
 */
function isArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

/**
 * Returns whether obj is a boolean.
 */
function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

/**
 * Returns whether obj is a Date.
 */
function isDate(obj: unknown): obj is Date {
  return obj?.constructor?.name === 'Date';
}

/**
 * Returns whether obj is a function.
 */
function isFunction(obj: unknown): obj is Function {
  return typeof obj === 'function';
}

/**
 * Returns whether obj is a plain object.
 */
function isPlainObject(obj: unknown): obj is Dictionary {
  if (!isObject(obj)) return false;
  // if it has no constructor
  if (obj.constructor === undefined) return true;

  // if it has modified prototype
  const proto = obj.constructor.prototype;
  if (!isObject(proto)) return false;
  // if its constructor does not have an Object-specific method
  return proto.hasOwnProperty('isPrototypeOf');
}

/**
 * Returns whether key is a key of obj.
 */
function isKeyOf<T>(obj: T, key: PropertyKey): key is keyof T {
  // @ts-expect-error
  return key in obj;
}

/**
 * Returns whether obj is null or undefined.
 */
function isNullOrUndefined(obj: unknown): obj is null | undefined {
  return obj === null || obj === undefined;
}

/**
 * Returns whether obj is a number.
 */
function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number';
}

/**
 * Returns whether obj is NOT one of the primitive data types. It may
 * still be any kind of object, including the instance of some class.
 * To narrow this down to only plain objects, use [isPlainObject]{@link isPlainObject}.
 */
function isObject(obj: unknown): obj is Dictionary {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Returns whether obj is a primitive data type.
 */
function isPrimitive(obj: unknown): obj is Primitive {
  return (
    isNullOrUndefined(obj) ||
    ['boolean', 'number', 'string', 'bigint'].includes(typeof obj)
  );
}

/**
 * Returns whether obj is a string.
 */
function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

export {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isKeyOf,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPlainObject,
  isPrimitive,
  isString,
  type Brand,
  type DeepArray,
  type DeepNode,
  type DeepObject,
  type DeepValueOf,
  type Dictionary,
  type Equals,
  type ExtendValues,
  type Flatten,
  type IsReadonly,
  type Join,
  type Merge,
  type NestedPaths,
  type OneOrArray,
  type Payload,
  type PickByType,
  type Primitive,
  type Subtract,
  type TransformValues,
  type TransformValuesByKey,
  type TupleToUnion,
  type TypeFromPath,
  type Union,
  type UnionToIntersection,
  type UnionToTuple,
  type ValueOf,
};
