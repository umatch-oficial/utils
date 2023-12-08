import bluebird from 'bluebird';

import { maxProperty, range } from '../math';
import * as stringUtils from '../string';

import type {
  DeepNode,
  DeepObject,
  Dictionary,
  Equals,
  IsReadonly,
  Primitive,
  Subtract,
} from '../index';

type Cartesian<
  Arrays extends readonly unknown[],
  Acc extends unknown[] = [],
> = Arrays extends readonly [readonly (infer H)[], ...infer T]
  ? Cartesian<T, [...Acc, H]>
  : Acc[];

/**
 * Returns the cartesian product of n arrays.
 */
function cartesian<Y extends readonly (readonly unknown[])[]>(...arrays: Y): Cartesian<Y>;
function cartesian(...arrays: unknown[][]): unknown[][] {
  const numberOfElements = arrays.reduce<number>((acc, array) => acc * array.length, 1);
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
function deepFlat<T>(array: readonly DeepNode<T>[]): (DeepObject<T> | T)[] {
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
function diff<
  X extends readonly (string | number)[],
  Y extends readonly (string | number)[],
>(
  a: X,
  b: Y,
): IsReadonly<X> extends true ? (IsReadonly<Y> extends true ? Subtract<X, Y> : Y) : X;
function diff(a: (string | number)[], b: (string | number)[]): (string | number)[] {
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

/**
 * Same as Array.filter, but accepts async callbacks.
 *
 * Uses bluebird.map to limit concurrency.
 */
async function filter<T extends readonly unknown[]>(
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
  ).flat();
}

/**
 * Filters an array of objects, ensuring they contain all key:value
 * pairs in the template.
 */
function filterByObject<O extends Dictionary, T extends Dictionary>(
  array: readonly O[],
  template: T,
): (O & T)[];
function filterByObject(
  array: readonly Dictionary[],
  template: Dictionary,
): Dictionary[] {
  const entries = Object.entries(template);
  return array.filter((element) =>
    entries.reduce((prev, [key, value]) => prev && element[key] === value, true),
  );
}

/**
 * Returns the filtered array and the complement as well (elements
 * removed by the filter).
 */
function filterWithComplement<
  T extends readonly unknown[],
  P extends (x: T[number]) => boolean,
>(
  array: T,
  predicate: P,
): T extends readonly (infer R)[]
  ? P extends (obj: unknown) => obj is infer A
    ? [A[], Exclude<R, A>[]]
    : [R[], R[]]
  : never;
function filterWithComplement<T extends readonly unknown[]>(
  array: T,
  predicate: (x: T[number]) => boolean,
): unknown[] {
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
function findLastIndex<T extends readonly unknown[]>(
  array: T,
  predicate: (value: T[number], index: number, arr: T[number][]) => boolean,
): number {
  const reversed = [...array].reverse();
  const indexReversed = reversed.findIndex(predicate);
  if (indexReversed === -1) return -1;
  return array.length - 1 - indexReversed;
}

/**
 * Formats a 2D array as a table.
 */
function formatMatrixToString(
  array: readonly (readonly (string | number)[])[],
  center = true,
  elementSeparator = ' | ',
  lineSeparator = '\n',
): string {
  const stringified = array.map((row) => row.map((col) => String(col)));
  const transposed = transpose(stringified);
  const maxSizePerColumn = transposed.map((column) => maxProperty(column, 'length'));
  return stringified
    .map((row) =>
      row
        .map((col, i) => {
          const size = maxSizePerColumn[i];
          return center ? stringUtils.center(col, size) : col.padEnd(size);
        })
        .join(elementSeparator),
    )
    .join(lineSeparator);
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
function groupBy<T extends readonly Dictionary[], Key extends PropertyKey>(
  array: T,
  key: Key,
): T extends readonly (infer D)[]
  ? Key extends keyof D
    ? D[Key] extends string | number | boolean
      ? {
          [Value in D[Key] as Value extends boolean ? Value & string : Value]: Extract<
            D,
            { [K in Key]: Value }
          >[];
        }
      : never
    : { [_: PropertyKey]: D[] }
  : Dictionary<T>;
function groupBy<T extends readonly Dictionary[]>(array: T, key: keyof T[number]) {
  return array.reduce(
    (partial: { [_: string]: T[number][] }, element: T[number]) => {
      const keyVal = element[key];
      if (!['string', 'number', 'boolean'].includes(typeof keyVal)) {
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
    },
    {} as { [_: string]: T[number][] },
  );
}

/**
 * Returns whether 2 arrays have the same elements, regardless of order.
 */
function hasSameElements<
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
function hasSameElements<X extends string | number>(a: X[], b: X[]): boolean {
  a.sort();
  b.sort();
  return a.every((v, i) => b[i] === v);
}

/**
 * Returns the intersection of two arrays.
 */
function intersect<
  A extends readonly (string | number)[],
  B extends readonly (string | number)[],
>(a: A, b: B): (A[number] & B[number])[] {
  const result = [];
  const map = {} as { [key: string]: boolean };
  for (let i = 0; i < b.length; i += 1) {
    map[b[i]] = true;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] in map) result.push(a[i]);
  }
  return result;
}

/**
 * Returns whether the small array is a subset of the large array.
 */
function isSubset(
  small: readonly (number | string)[],
  large: readonly (number | string)[],
): boolean {
  return small.every((value) => large.includes(value));
}

/**
 * Returns all length-2 tuples of the elements, in sorted order,
 * without repeated elements.<br>
 * (equivalent of python's itertools' combinations)
 */
function permutations<T extends readonly unknown[]>(
  array: T,
): T extends readonly (infer R)[] ? [R, R][] : never;
function permutations(array: unknown[]): [unknown, unknown][] {
  const perms: [unknown, unknown][] = [];
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
function remove<T extends readonly Primitive[], X extends T[number]>(
  array: T,
  item: X,
): { readonly [K in keyof T]: unknown } extends T ? Remove<T, X> : T;
function remove<X, T extends X[]>(array: T, item: X): X[] {
  const i = array.indexOf(item);
  if (i > -1) array.splice(i, 1);
  return array;
}

/**
 * Returns a shuffled copy of the array.
 */
function shuffle<T extends readonly unknown[]>(
  array: T,
): T extends readonly (infer _)[] ? T : never;
function shuffle(array: unknown[]): unknown[] {
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
function sliceWithOverflow<T extends readonly unknown[]>(
  array: T,
  start: number,
  end: number,
): T extends readonly (infer _)[] ? T : never;
function sliceWithOverflow(array: unknown[], start: number, end: number): unknown[] {
  const overflow = end - array.length;
  if (overflow <= 0) return array.slice(start, end);
  return [...array.slice(start), ...sliceWithOverflow(array, 0, overflow)];
}

/**
 * Sorts an array based on the provided keys and sort orders.
 *
 * The keys are compared in the order they are provided, and the first
 * one to return a non-zero value determines the order of the
 * elements. If the value of a key is not a primitive, a transform
 * function must be provided.
 *
 * @template T
 * @param array The array to be sorted.
 * @param sortOrders An array of keys, the order for each key, and an
 * optional transform function.
 * @return The sorted array.
 */
function sort<T>(
  array: T[],
  sortOrders: Array<
    {
      [K in keyof T]-?: [K, 'asc' | 'desc', ((value: T[K]) => number)?];
    }[keyof T]
  >,
): T[] {
  return array.sort((a, b) => {
    for (const [key, order, transform] of sortOrders) {
      const leftVal = transform ? transform(a[key]) : a[key];
      const rightVal = transform ? transform(b[key]) : b[key];

      if (leftVal < rightVal) {
        return order === 'asc' ? -1 : 1;
      } else if (leftVal > rightVal) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
}

/**
 * Returns the transposed array.
 */
function transpose<T>(array: readonly (readonly T[])[]): T[][] {
  const { length } = array[0];
  return Array.from({ length }).map((_, i) => array.map((row) => row[i]));
}

/**
 * Returns a copy of the array, where values for which the predicate
 * is false are removed from both ends.
 *
 * Similar to filtering the array, except that the elements between
 * the first and last valid elements are not removed.
 */
function trim<T extends readonly unknown[]>(
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
function uniques<T extends readonly unknown[]>(
  array: T,
): { readonly [K in keyof T]: unknown } extends T ? Uniques<T> : T;
function uniques(array: unknown[]): unknown[] {
  return Array.from(new Set(array));
}

type Append<T extends readonly unknown[], Element> = IsReadonly<T> extends true
  ? readonly [...T, Element]
  : [...T, Element];

type Zip<
  T extends readonly (readonly unknown[])[],
  Acc extends readonly unknown[] = [],
> = T extends readonly [readonly (infer A)[], ...infer B]
  ? B extends readonly (readonly unknown[])[]
    ? Zip<B, Append<Acc, A>>
    : never
  : Acc[];

/**
 * Zips arrays. (equivalent of python's zip)
 *
 * @throws if the arrays don't have the same length.
 */
function zip<T extends readonly (readonly unknown[])[]>(...arrays: T): Zip<T>;
function zip(...arrays: readonly (readonly unknown[])[]): unknown[] {
  const { length } = arrays[0];
  if (arrays.some((a) => a.length !== length)) {
    throw new Error('Cannot zip arrays of different lengths');
  }

  const result = [];
  for (let i = 0; i < length; i += 1) {
    result.push(arrays.map((a) => a[i]));
  }
  return result;
}

export {
  cartesian,
  deepFlat,
  diff,
  filter,
  filterByObject,
  filterWithComplement,
  findLastIndex,
  formatMatrixToString,
  groupBy,
  hasSameElements,
  intersect,
  isSubset,
  permutations,
  remove,
  shuffle,
  sliceWithOverflow,
  sort,
  subtract,
  transpose,
  trim,
  uniques,
  zip,
};
