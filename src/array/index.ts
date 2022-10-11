import { DeepNode, DeepArray, Flatten, UnionToTuple } from "../index";
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
export function diff<X, Y>(a: X[], b: (X | Y)[]): X[] {
  const result = [];
  const map = {};
  for (let i = 0; i < b.length; i += 1) {
    // @ts-ignore
    map[b[i]] = true;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (!(a[i] in map)) result.push(a[i]);
  }
  return result;
}

/**
 * Same as Array.filter, but accepts async callbacks
 */
export async function filter<X, T extends X[]>(
  array: T,
  callback: (x: X) => Promise<boolean>,
): Promise<T extends (infer R)[] ? R[] : never>;
export async function filter(
  array: any[],
  callback: (x: any) => Promise<boolean>,
): Promise<any[]> {
  return (
    await Promise.all(
      array.map(async (a) => {
        const res = await callback(a);
        return res ? a : [];
      }),
    )
  ).flat();
}

/**
 * Returns the intersection of two arrays.
 */
export function intersect<X, Y>(a: X[], b: (X | Y)[]): X[] {
  const result = [];
  const map = {};
  for (let i = 0; i < b.length; i += 1) {
    // @ts-ignore
    map[b[i]] = true;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] in map) result.push(a[i]);
  }
  return result;
}

/**
 * Returns all length-2 tuples of the elements, in sorted order,
 * without repeated elements. (equivalent of python's itertool's combinations)
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
export function remove<X, T extends X[]>(
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
 * https://stackoverflow.com/a/12646864/9193449
 */
export function shuffle<T extends unknown[]>(
  array: T,
): T extends (infer R)[] ? R[] : never;
export function shuffle(array: any[]): any[] {
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
 * Returns a copy of an array without duplicates.
 */
export function uniques<T extends unknown[]>(
  array: T,
): T extends (infer R)[] ? R[] : never;
export function uniques(array: any[]): any[] {
  return Array.from(new Set(array));
}

/**
 * Zips two arrays of same length.
 */
export function zip<X, Y>(a: X[], b: Y[]): [X, Y][] {
  if (a.length !== b.length) throw new Error("Cannot zip arrays of different lengths");
  return a.map((e, i) => [e, b[i]]);
}
