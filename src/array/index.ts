import bluebird from "bluebird";

import {
  DeepArray,
  DeepNode,
  Dictionary,
  Flatten,
  Primitive,
  UnionToTuple,
  ValueOf,
  Equals,
} from "../index";
import { range } from "../math";

/**
 * Returns the cartesian product of n arrays.
 */
export function cartesian<Y extends unknown[][]>(
  ...arrays: Y
): Y extends (infer R)[] ? Flatten<UnionToTuple<R>>[] : never;
export function cartesian(...arrays: any[]): any[][] {
  return arrays.reduce((finalArray, currentArray) =>
    finalArray.flatMap((element: any) =>
      currentArray.map((newElement: any) => [element, newElement].flat()),
    ),
  );
}

/**
 * Array.flat() for n-dimensional arrays.
 */
export function deepFlat<T>(array: DeepNode<T>[]): Exclude<DeepNode<T>, DeepArray<T>>[] {
  const final: Exclude<DeepNode<T>, DeepArray<T>>[] = [];
  array.forEach((element) =>
    element instanceof Array
      ? final.push(...deepFlat(element))
      : final.push(element as Exclude<DeepNode<T>, DeepArray<T>>),
  );
  return final;
}

/**
 * Returns the elements of a that are not present in b.
 */
export function diff<X extends string | number, Y extends string | number>(
  a: X[],
  b: (X | Y)[],
): X[] {
  const result = [];
  const map = {} as { [_ in X | Y]: boolean };
  for (let i = 0; i < b.length; i += 1) {
    map[b[i]] = true;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (!(a[i] in map)) result.push(a[i] as X);
  }
  return result;
}

/**
 * Same as Array.filter, but accepts async callbacks.
 *
 * Uses bluebird.map to limit concurrency.
 */
export async function filter<T extends unknown[] | readonly unknown[]>(
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

export function filterByObject<O extends Dictionary>(
  array: Dictionary[],
  template: O,
): O[] {
  const entries = Object.entries(template);
  return array.filter((element) =>
    entries.reduce((prev, [key, value]) => element[key] === value, true),
  ) as O[];
}

/**
 * Returns the filtered array and the complement as well (elements
 * removed by the filter).
 */
export function filterWithComplement<
  T extends unknown[] | readonly unknown[],
  P extends (x: T[number]) => boolean,
>(
  array: T,
  predicate: P,
): T extends (infer R)[]
  ? P extends (obj: unknown) => obj is infer A
    ? [A[], Exclude<R, A>[]]
    : [R[], R[]]
  : never;
export function filterWithComplement<T extends unknown[] | readonly unknown[]>(
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
export function findLastIndex<T extends unknown[] | readonly unknown[]>(
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
  T extends Dictionary[],
  ValidKey extends ValueOf<{
    [Key in keyof T[number]]: T[number][Key] extends Primitive ? Key : never;
  }> &
    string,
>(
  array: T,
  key: ValidKey,
): T extends (infer R)[]
  ? ValidKey extends keyof R
    ? {
        [_ in R[ValidKey] as R[ValidKey] extends number ? number : string]: R[];
      }
    : never
  : never;
export function groupBy<
  T extends { [_: string]: unknown }[],
  ValidKey extends ValueOf<{
    [Key in keyof T[number]]: T[number][Key] extends Primitive ? Key : never;
  }> &
    string,
>(array: T, key: ValidKey) {
  return array.reduce((partial: { [_: string]: T[number][] }, element: T[number]) => {
    const keyVal = element[key];
    if (!["string", "number", "boolean"].includes(typeof keyVal)) {
      throw new Error(
        `Cannot use value of '${key}' to index result - must be a string, number or boolean for all array elements`,
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
 * without repeated elements. (equivalent of python's itertools' combinations)
 */
export function permutations<T extends unknown[]>(
  array: T,
): T extends (infer R)[] ? [R, R][] : never;
export function permutations(array: any[]): [any, any][] {
  const perms: [any, any][] = [];
  for (const i of range(array.length)) {
    for (const j of range(i + 1, array.length)) {
      perms.push([array[i], array[j]]);
    }
  }
  return perms;
}

/**
 * Removes an item from an array.
 */
export function remove<X extends Primitive, T extends X[]>(
  array: T,
  item: X,
): T extends (infer R)[] ? R[] : never;
export function remove<X, T extends X[]>(array: T, item: X): X[] {
  const i = array.indexOf(item);
  if (i > -1) array.splice(i, 1);
  return array;
}

/**
 * Repeats an array enough times to have n elements.
 */
export function replicate<T extends unknown[]>(
  array: T,
  n: number,
): T extends (infer R)[] ? R[] : never;
export function replicate(array: any[], n: number): any[] {
  const length = Math.ceil(n / array.length);
  return Array.from({ length }, () => array)
    .flat()
    .slice(0, n);
}

/**
 * Returns a shuffled copy of the array.
 */
export function shuffle<T extends unknown[]>(
  array: T,
): T extends (infer R)[] ? R[] : never;
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
export function sliceWithOverflow<T extends unknown[]>(
  array: T,
  start: number,
  end: number,
): T extends (infer R)[] ? R[] : never;
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
export function trim<T extends unknown[] | readonly unknown[]>(
  array: T,
  predicate: (value: T[number], index: number, arr: T[number][]) => boolean,
): T[number][] {
  const firstIndex = (array as T[number][]).findIndex(predicate);
  if (firstIndex === -1) return [];

  const lastIndex = findLastIndex(array, predicate);
  return array.slice(firstIndex, lastIndex + 1);
}

/**
 * Returns a copy of an array without duplicates.
 */
export function uniques<T extends unknown[]>(
  array: T,
): T extends (infer R)[] ? R[] : never;
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
