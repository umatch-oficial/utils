import bluebird from "bluebird";

import { range } from "../math";

import type {
  DeepNode,
  DeepObject,
  Dictionary,
  Equals,
  GroupBy,
  Primitive,
  Subtract,
  IsReadonly,
} from "../index";

type Cartesian<
  Arrays extends readonly unknown[],
  Acc extends unknown[] = [],
> = Arrays extends readonly [readonly (infer H)[], ...infer T]
  ? Cartesian<T, [...Acc, H]>
  : Acc[];

/**
 * Returns the cartesian product of n arrays.
 */
export function cartesian<Y extends readonly (readonly unknown[])[]>(
  ...arrays: Y
): Cartesian<Y>;
export function cartesian(...arrays: any[]): any[][] {
  const numberOfElements = arrays.reduce((acc, array) => acc * array.length, 1);
  const result = [];
  for (let i = 0; i < numberOfElements; i += 1) {
    const element = [];
    let j = i;
    for (const array of arrays) {
      element.push(array[j % array.length]);
      j = Math.floor(j / array.length);
    }
    result.push(element);
  }
  return result;
}

/**
 * Array.flat() for n-dimensional arrays.
 */
export function deepFlat<T>(array: DeepNode<T>[]): (DeepObject<T> | T)[] {
  const final: (DeepObject<T> | T)[] = [];
  array.forEach((element) =>
    element instanceof Array ? final.push(...deepFlat(element)) : final.push(element),
  );
  return final;
}

/**
 * Returns a copy of the first array, without including elements
 * present in the second array.
 */
export function diff<
  X extends readonly (string | number)[],
  Y extends readonly (string | number)[],
>(
  a: X,
  b: Y,
): IsReadonly<X> extends true ? (IsReadonly<Y> extends true ? Subtract<X, Y> : Y) : X;
export function diff(
  a: (string | number)[],
  b: (string | number)[],
): (string | number)[] {
  const result = [];
  const map = {} as { [_: string | number]: boolean };
  for (let i = 0; i < b.length; i += 1) {
    map[b[i]] = true;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (!(a[i] in map)) result.push(a[i]);
  }
  return result;
}

const subtract = diff;
export { subtract };

/**
 * Same as Array.filter, but accepts async callbacks.
 *
 * Uses bluebird.map to limit concurrency.
 */
export async function filter<T extends readonly unknown[]>(
  array: T,
  callback: (x: T[number]) => Promise<boolean>,
  concurrency = 50,
): Promise<T[number][]> {
  return (
    await bluebird.map(
      array,
      async (element) => ((await callback(element)) ? element : []),
      { concurrency },
    )
  ).flat() as T[];
}

/**
 * Filters an array of objects, ensuring they contain all key:value
 * pairs in the template.
 */
export function filterByObject<O extends Dictionary, T extends Dictionary>(
  array: O[],
  template: T,
): (O & T)[] {
  const entries = Object.entries(template);
  return array.filter((element) =>
    entries.reduce((prev, [key, value]) => prev && element[key] === value, true),
  ) as (O & T)[];
}

/**
 * Returns the filtered array and the complement as well (elements
 * removed by the filter).
 */
export function filterWithComplement<
  T extends readonly unknown[],
  P extends (x: T[number]) => boolean,
>(
  array: T,
  predicate: P,
): T extends (infer R)[]
  ? P extends (obj: unknown) => obj is infer A
    ? [A[], Exclude<R, A>[]]
    : [R[], R[]]
  : never;
export function filterWithComplement<T extends readonly unknown[]>(
  array: T,
  predicate: (x: T[number]) => boolean,
): any[] {
  const filtered = array.filter(predicate);
  const complement = array.filter((element) => !filtered.includes(element));
  return [filtered, complement];
}

/**
 * Same as Array.prototype.findIndex, but starting from the end.
 *
 * Array.prototype.findLastIndex is already available in some runtimes,
 * but not in Node.
 */
export function findLastIndex<T extends readonly unknown[]>(
  array: T,
  predicate: (value: T[number], index: number, arr: T[number][]) => boolean,
): number {
  const reversed = [...array].reverse();
  const indexReversed = reversed.findIndex(predicate);
  if (indexReversed === -1) return -1;
  return array.length - 1 - indexReversed;
}

/**
 * Groups the elements in an array by the value of the specified key.
 *
 * The key must have a primitive value (boolean, number or string)
 * for every object in the array. If the value is boolean, it becomes
 * an index of the resulting object as a string.
 *
 * @throws if, for any element in the array, the key is not present or has a non-primitive value.
 */
export function groupBy<
  T extends readonly Dictionary[] | unknown,
  Key extends PropertyKey,
>(array: T, key: Key): T extends readonly Dictionary[] ? GroupBy<T, Key> : Dictionary<T>;
export function groupBy<T extends readonly Dictionary[]>(array: T, key: keyof T[number]) {
  return array.reduce((partial: { [_: string]: T[number][] }, element: T[number]) => {
    const keyVal = element[key];
    if (!["string", "number", "boolean"].includes(typeof keyVal)) {
      throw new Error(
        `Cannot use value of '${String(
          key,
        )}' to index result - must be a string, number or boolean for all array elements`,
      );
    }

    const index = String(keyVal);
    if (partial[index] === undefined) {
      partial[index] = [element];
    } else {
      partial[index].push(element);
    }
    return partial;
  }, {} as { [_: string]: T[number][] });
}

/**
 * Returns whether 2 arrays have the same elements, regardless of order.
 */
export function hasSameElements<
  X extends string | number,
  A extends readonly X[],
  B extends readonly X[],
>(
  a: A,
  b: B,
): Equals<A[number], B[number]> extends true
  ? A extends { length: infer ALen }
    ? B extends { length: infer BLen }
      ? Equals<ALen, BLen> extends true
        ? true
        : false
      : false
    : false
  : false;
export function hasSameElements<X extends string | number>(a: X[], b: X[]): boolean {
  a.sort();
  b.sort();
  return a.every((v, i) => b[i] === v);
}

/**
 * Returns the intersection of two arrays.
 */
export function intersect<X extends string | number, Y extends string | number>(
  a: X[],
  b: (X | Y)[],
): X[] {
  const result = [];
  const map = {} as { [_ in X | Y]: boolean };
  for (let i = 0; i < b.length; i += 1) {
    map[b[i]] = true;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] in map) result.push(a[i] as X);
  }
  return result;
}

/**
 * Returns whether the small array is a subset of the large array.
 */
export function isSubset(
  small: (number | string)[],
  large: (number | string)[],
): boolean {
  return small.every((value) => large.includes(value));
}

/**
 * Returns all length-2 tuples of the elements, in sorted order,
 * without repeated elements.<br>
 * (equivalent of python's itertools' combinations)
 */
export function permutations<T extends readonly unknown[]>(
  array: T,
): T extends readonly (infer R)[] ? [R, R][] : never;
export function permutations(array: any[]): [any, any][] {
  const perms: [any, any][] = [];
  for (const i of range(array.length)) {
    for (const j of range(i + 1, array.length)) {
      perms.push([array[i], array[j]]);
    }
  }
  return perms;
}

type Remove<
  T extends readonly unknown[],
  X extends T[number],
  Acc extends unknown[] = [],
> = T extends readonly [infer A, ...infer B]
  ? A extends X
    ? X extends A
      ? Remove<B, X, Acc>
      : Remove<B, X, [...Acc, A]>
    : Remove<B, X, [...Acc, A]>
  : Acc;

/**
 * Removes an item from an array.
 */
export function remove<T extends readonly Primitive[], X extends T[number]>(
  array: T,
  item: X,
): { readonly [K in keyof T]: any } extends T ? Remove<T, X> : T;
export function remove<X, T extends X[]>(array: T, item: X): X[] {
  const i = array.indexOf(item);
  if (i > -1) array.splice(i, 1);
  return array;
}

/**
 * Returns a shuffled copy of the array.
 */
export function shuffle<T extends readonly unknown[]>(
  array: T,
): T extends readonly (infer _)[] ? T : never;
export function shuffle(array: any[]): any[] {
  // https://stackoverflow.com/a/12646864/9193449
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Same as slice, but overflows to guarantee there are (end - start) elements.
 */
export function sliceWithOverflow<T extends readonly unknown[]>(
  array: T,
  start: number,
  end: number,
): T extends readonly (infer _)[] ? T : never;
export function sliceWithOverflow(array: any[], start: number, end: number): any[] {
  const overflow = end - array.length;
  if (overflow <= 0) return array.slice(start, end);
  return [...array.slice(start), ...sliceWithOverflow(array, 0, overflow)];
}

/**
 * Returns a copy of the array, where values for which the predicate
 * is false are removed from both ends.
 *
 * Similar to filtering the array, except that the elements between
 * the first and last valid elements are not removed.
 */
export function trim<T extends readonly unknown[]>(
  array: T,
  predicate: (value: T[number], index: number, arr: readonly unknown[]) => boolean,
): T[number][] {
  const firstIndex = array.findIndex(predicate);
  if (firstIndex === -1) return [];

  const lastIndex = findLastIndex(array, predicate);
  return array.slice(firstIndex, lastIndex + 1);
}

type Uniques<
  T extends readonly unknown[],
  Acc extends unknown[] = [],
> = T extends readonly [infer A, ...infer B]
  ? A extends Acc[number]
    ? Uniques<B, Acc>
    : Uniques<B, [...Acc, A]>
  : Acc;

/**
 * Returns a copy of an array without duplicates.
 */
export function uniques<T extends readonly unknown[]>(
  array: T,
): { readonly [K in keyof T]: any } extends T ? Uniques<T> : T;
export function uniques(array: any[]): any[] {
  return Array.from(new Set(array));
}

/**
 * Zips two arrays. (equivalent of python's zip)
 *
 * @throws if the arrays don't have the same length.
 */
export function zip<X, Y>(a: X[], b: Y[]): [X, Y][] {
  if (a.length !== b.length) throw new Error("Cannot zip arrays of different lengths");
  return a.map((e, i) => [e, b[i]]);
}
