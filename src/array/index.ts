/**
 * Returns the cartesian product of n arrays.
 */
import { DeepNode, DeepArray } from "../index";

export function cartesian<X extends unknown[] | [], Y extends X[]>(
  ...arrays: Y
): Y extends [(infer Type1)[], (infer Type2)[]]
  ? [Type1, Type2][]
  : Y extends [(infer Type1)[], (infer Type2)[], (infer Type3)[]]
  ? [Type1, Type2, Type3][]
  : never;
export function cartesian(...arrays: any[]): any[][] {
  return arrays.reduce(
    (accumulated, current) =>
      accumulated.flatMap((newArrayElement: any) =>
        current.map((oldArrayElement: any) => [newArrayElement, oldArrayElement].flat())
      ),
    []
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
      : final.push(element as Exclude<DeepNode<T>, DeepArray<T>>)
  );
  return final;
}

/**
 * Same as Array.filter, but accepts async callbacks
 */
export async function filter<T>(
  array: T[],
  callback: (t: T) => Promise<boolean>
): Promise<T[]> {
  return (
    await Promise.all(
      array.map(async (a) => {
        const res = await callback(a);
        return res ? a : [];
      })
    )
  ).flat() as T[];
}

/**
 * Returns the intersection of two arrays.
 */
export function intersection<X, Y>(arr1: X[], arr2: (X | Y)[]): (X | Y)[] {
  return arr1.filter((v) => arr2.includes(v));
}

/**
 * Returns all length-2 permutations of the elements in the array.
 */
export function permutations<T>(array: T[]): [T, T][] {
  const perms: [T, T][] = [];
  for (const i of range(array.length)) {
    for (const j of range(i + 1, array.length)) {
      perms.push([array[i], array[j]]);
    }
  }
  return perms;
}

/**
 * Returns a range from **a** to **b**, or from **0** to **a** if **b** is null.
 */
export function range(a: number, b?: number): number[] {
  const [start, end] = b ? [a, b] : [0, a];
  return Array.from({ length: end - start }).map((_, i) => i + start);
}

/**
 * Removes an item from an array.
 */
export function remove<T>(array: T[], item: T): T[] {
  const i = array.indexOf(item);
  if (i > -1) array.splice(i, 1);
  return array;
}

/**
 * Repeats an array enough times to have n elements.
 */
export function replicate<T>(array: T[], n: number): T[] {
  const length = Math.ceil(n / array.length);

  return Array.from({ length }, () => array)
    .flat()
    .slice(0, n);
}

/**
 * Returns a shuffled copy of the array.
 * https://stackoverflow.com/a/12646864/9193449
 */
export function shuffle<T>(array: T[]): T[] {
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
export function sliceWithOverflow<T>(array: T[], start: number, end: number): T[] {
  const overflow = end - array.length;
  if (overflow <= 0) {
    return array.slice(start, end);
  }
  return [...array.slice(start), ...sliceWithOverflow(array, 0, overflow)];
}

/**
 * Returns a copy of an array without duplicates.
 */
export function uniques<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Zips two arrays of same length.
 */
export function zip<X, Y>(a: X[], b: Y[]): [X, Y][] {
  if (a.length !== b.length) throw new Error("Cannot zip arrays of different lengths");
  return a.map((e, i) => [e, b[i]]);
}
