import { type Equals } from '../index';
import { hasOwnProperty } from '../object';

const { cos, floor, log, PI, random, sqrt, trunc } = Math;

/**
 * Returns the average of an array of numbers.
 */
function average(array: readonly number[]): number {
  return array.reduce((a, b) => a + b) / array.length;
}

/**
 * Returns the average of the given property of the elements in the array.
 */
function averageProperty<
  T extends readonly unknown[],
  Prop extends {
    [K in keyof T[number]]: Equals<T[number][K], number> extends true ? K : never;
  }[keyof T[number]],
>(array: T, property: Prop): number | null {
  if (!array.length) return null;

  function isObjectWithProperty(obj: unknown): obj is { [K in Prop]: number } {
    return hasOwnProperty(obj, property) && typeof obj[property] === 'number';
  }
  if (!array.every(isObjectWithProperty))
    throw new Error('Property does not exist in every element');

  return (
    ((array as ReadonlyArray<{ [K in Prop]: number }>).reduce(
      (total, element) => total + element[property],
      array[0][property],
    ) as number) / array.length
  );
}

/**
 * Returns the difference between each element and the previous in an array.
 *
 * @example
 * // returns [2,4,3]
 * diff([1,3,7,10])
 */
function diff(array: readonly number[]): number[] {
  return array
    .map((current, i) => {
      if (i === 0) return 0;
      return current - array[i - 1];
    })
    .slice(1);
}

/**
 * Returns the quotient and remainder of x/y.
 */
function divmod(x: number, y: number): [number, number] {
  return [trunc(x / y), x % y];
}

/**
 * Returns a hash of the number with a fixed length using the given characters.
 *
 * Hashes of consecutive numbers only differ by 1 character.
 *
 * @param {number} number
 * @param {number} length
 * @param {string} [characters] Characters to use in the hash. Default: lowercase alphabet
 * @param {number[]} [order] An array of numbers from 0 to length-1 in any order. Default: [0,1,2,...]
 * @returns {string}
 */
function hashNumber(
  number: number,
  length: number,
  characters: string = 'abcdefghijklmnopqrstuvwxyz',
  order?: number[],
): string {
  if (!order) order = Array.from({ length }).map((_, i) => i);

  const numbers = new Array(length).fill(0) as number[];
  for (let i = 0; number > 0; i += 1) {
    const position = order[i % length];
    numbers[position] = numbers[position] + (number % characters.length);
    number = Math.floor(number / characters.length);
  }

  return numbers.map((n) => characters[n % characters.length]).join('');
}

/**
 * Returns the number or min/max if it is below/above the thresholds, respectively.
 */
function limitToRange(num: number, lower: number, upper: number): number {
  return Math.min(Math.max(num, lower), upper);
}

/**
 * Returns the maximum value of the given property of the elements in the array.
 *
 * The property must be a number, string or Date consistently across all elements.
 */
function maxProperty<
  T extends readonly unknown[],
  Prop extends {
    [K in keyof T[number]]: Equals<T[number][K], Date> extends true
      ? K
      : Equals<T[number][K], number> extends true
      ? K
      : Equals<T[number][K], string> extends true
      ? K
      : never;
  }[keyof T[number]],
>(array: T, property: Prop): T[number][Prop] | null {
  if (array['length'] === 0) return null;

  function isObjectWithProperty(
    obj: unknown,
  ): obj is { [K in Prop]: Date | number | string } {
    return (
      hasOwnProperty(obj, property) &&
      (typeof obj[property] === 'number' ||
        typeof obj[property] === 'string' ||
        obj[property] instanceof Date)
    );
  }
  if (!array.every(isObjectWithProperty))
    throw new Error('Property does not exist in every element');

  return (array as ReadonlyArray<{ [K in Prop]: Date | number | string }>).reduce(
    (max, element) => (element[property] > max ? element[property] : max),
    array[0][property],
  ) as T[number][Prop];
}

/**
 * Returns the minimum value of the given property of the elements in the array.
 *
 * The property must be a number, string or Date consistently across all elements.
 */
function minProperty<
  T extends readonly unknown[],
  Prop extends {
    [K in keyof T[number]]: Equals<T[number][K], Date> extends true
      ? K
      : Equals<T[number][K], number> extends true
      ? K
      : Equals<T[number][K], string> extends true
      ? K
      : never;
  }[keyof T[number]],
>(array: T, property: Prop): T[number][Prop] | null {
  if (array['length'] === 0) return null;

  function isObjectWithProperty(
    obj: unknown,
  ): obj is { [K in Prop]: Date | number | string } {
    return (
      hasOwnProperty(obj, property) &&
      (typeof obj[property] === 'number' ||
        typeof obj[property] === 'string' ||
        obj[property] instanceof Date)
    );
  }
  if (!array.every(isObjectWithProperty))
    throw new Error('Property does not exist in every element');

  return (array as ReadonlyArray<{ [K in Prop]: Date | number | string }>).reduce(
    (min, element) => (element[property] < min ? element[property] : min),
    array[0][property],
  ) as T[number][Prop];
}

/**
 * Returns the nth element with overflow.
 *
 * @example
 * // returns 1
 * nthElement([0,1,2,3], 5)
 */
function nthElement<T extends readonly unknown[]>(array: T, n: number): T[number] {
  return array[n % array.length];
}

/**
 * Picks a random option from an array, with equal weights.
 */
function pickRandom<T extends readonly unknown[]>(options: T): T[number] {
  const roll = random();
  const chance = 1 / options.length;
  const i = floor(roll / chance);
  return options[i];
}

/**
 * Picks a random option from an array of { option, weight }.
 */
function pickWeighted<T extends { option: unknown; weight: number }>(
  options: readonly T[],
): T['option'] {
  const totalWeight = options.reduce((partial, { weight }) => {
    return partial + weight;
  }, 0);

  const roll = random();
  let lower = 0;
  let chosen;
  for (const { option, weight } of options) {
    const normalizedWeight = weight / totalWeight;
    const upper = lower + normalizedWeight;

    if (lower <= roll && roll < upper) {
      chosen = option;
      break;
    }
    lower = upper;
  }
  return chosen;
}

/**
 * Returns a random integer between min and max.
 *
 * If no values are passed, uses 0 and 1.
 * If only 1 valued is passed, uses 0 and value.
 */
function randomInteger(min?: number, max?: number): number {
  return round(randomNumber(min, max), 0);
}

/**
 * Returns a random number from the normal distribution between min and max.
 */
function randomNormal(min: number, max: number, mean?: number): number {
  mean = mean ?? average([min, max]);
  return limitToRange(floor(mean * (1 + sampleNormal() / 2)), min, max);
}

/**
 * Returns a random number between min and max.
 *
 * If no values are passed, uses 0 and 1.<br>
 * If only 1 valued is passed, uses 0 and value.
 */
function randomNumber(min?: number, max?: number): number {
  const roll = random();
  if (min === undefined) return roll;
  if (max === undefined) return min * roll;
  return min + (max - min) * roll;
}

/**
 * Returns an array of numbers in a random order determined by the seed.
 *
 * @example
 * // returns [1, 3, 2, 0, 4]
 * randomOrder(5, 1)
 */
function randomOrder(length: number, seed: number): number[] {
  const order = Array.from({ length }).map((_, i) => i);
  for (let i = 0; i < length; i += 1) {
    const j = (seed ^ (i + 1)) % length;
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Returns a list of integers from *start* to *end*.
 * (similar to python's range)
 *
 * If only 1 value is passed, uses [0, start[.<br>
 * If 2 values are passed, uses [start, end[.
 */
function range(start: number, end?: number): number[] {
  const [_start, _end] = end ? [start, end] : [0, start];
  return Array.from({ length: _end - _start }).map((_, i) => i + _start);
}

/**
 * Returns the number rounded to the specified amount of digits.
 *
 * See https://stackoverflow.com/a/48764436 solution #2 for an
 * in-depth explanation.
 */
function round(number: number, digits: number = 1): number {
  const pow = 10 ** digits;
  return Math.round(number * (1 + Number.EPSILON) * pow) / pow;
}

/**
 * Returns a random number from the normal distribution.
 */
function sampleNormal(): number {
  return sqrt(-2 * log(1 - random())) * cos(2 * PI * random());
}

/**
 * Splits an array into chunks of equal size.
 */
function splitInChunks<T extends readonly unknown[]>(
  array: T,
  size: number,
): T[number][][] {
  const chunks: T[number][][] = [];
  for (let i = 0; i < array.length; i += size) {
    const n = Math.min(array.length - i, size);
    const chunk = array.slice(i, i + n);
    chunks.push(chunk);
  }
  return chunks;
}

/**
 * Returns the sum of the elements in the array.
 */
function sum(array: readonly number[]): number {
  return array.reduce((total, value) => total + value);
}

/**
 * Returns the sum of the given property of the elements in the array.
 */
function sumProperty<Prop extends PropertyKey>(
  array: readonly { [K in Prop]: number }[],
  property: Prop,
): number {
  return array.reduce((total, element) => total + element[property], 0);
}

export {
  average,
  averageProperty,
  diff,
  divmod,
  hashNumber,
  limitToRange,
  maxProperty,
  minProperty,
  nthElement,
  pickRandom,
  pickWeighted,
  randomInteger,
  randomNormal,
  randomNumber,
  randomOrder,
  range,
  round,
  sampleNormal,
  splitInChunks,
  sum,
  sumProperty,
};
