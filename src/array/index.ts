import { DeepNode, DeepArray } from "../index";
import { range } from "../math";

/**
 * Returns the cartesian product of n arrays.
 */
export function cartesian<X extends unknown[], Y extends X[]>(
  ...arrays: Y
): Y extends [(infer T1)[], (infer T2)[]]
  ? [T1, T2][]
  : Y extends [(infer T1)[], (infer T2)[], (infer T3)[]]
  ? [T1, T2, T3][]
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
export async function filter<X, T extends X[]>(
  array: T,
  callback: (x: X) => Promise<boolean>
): Promise<T> {
  return (
    await Promise.all(
      array.map(async (a) => {
        const res = await callback(a);
        return res ? a : [];
      })
    )
  ).flat() as T;
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
export function permutations<X, T extends X[]>(array: T): [X, X][] {
  const perms: [X, X][] = [];
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
export function remove<X, T extends X[]>(array: T, item: X): X[] {
  const i = array.indexOf(item);
  if (i > -1) array.splice(i, 1);
  return array;
}

/**
 * Repeats an array enough times to have n elements.
 */
export function replicate<X, T extends X[]>(array: T, n: number): X[] {
  const length = Math.ceil(n / array.length);
  return Array.from({ length }, () => array)
    .flat()
    .slice(0, n);
}

/**
 * Returns a shuffled copy of the array.
 * https://stackoverflow.com/a/12646864/9193449
 */
export function shuffle<X, T extends X[]>(array: T): X[] {
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
export function sliceWithOverflow<X, T extends X[]>(
  array: T,
  start: number,
  end: number
): X[] {
  const overflow = end - array.length;
  if (overflow <= 0) return array.slice(start, end);

  return [...array.slice(start), ...(sliceWithOverflow(array, 0, overflow) as X[])];
}

/**
 * Returns a copy of an array without duplicates.
 */
export function uniques<X, T extends X[]>(array: T): X[] {
  return Array.from(new Set(array));
}

/**
 * Zips two arrays of same length.
 */
export function zip<X, Y>(a: X[], b: Y[]): [X, Y][] {
  if (a.length !== b.length) throw new Error("Cannot zip arrays of different lengths");
  return a.map((e, i) => [e, b[i]]);
}
