const { cos, floor, log, PI, random, sqrt, trunc } = Math;

/**
 * Returns the average of an array of numbers.
 */
function average(array: number[]): number {
  return array.reduce((a, b) => a + b) / array.length;
}

/**
 * Returns the difference between each element and the previous in an array.
 *
 * @example
 * // returns [2,4,3]
 * diff([1,3,7,10])
 */
function diff(array: number[]): number[] {
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
 * Returns the number or min/max if it is below/above the thresholds, respectively.
 */
function limitToRange(num: number, lower: number, upper: number): number {
  return Math.min(Math.max(num, lower), upper);
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
  options: T[],
): T["option"] {
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
 */
function round(number: number, digits: number = 1): number {
  return Math.round((number + Number.EPSILON) * 10 ** digits) / 10 ** digits;
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
  const chunks: any[] = [];
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
function sum(array: number[]): number {
  return array.reduce((total, value) => total + value);
}

/**
 * Returns the sum of the given property of the elements in the array.
 */
function sumProperty<T extends { [key: string]: number }>(
  array: T[],
  property: keyof T,
): number {
  return array.reduce((total, element) => total + element[property], 0);
}

export {
  average,
  diff,
  divmod,
  limitToRange,
  nthElement,
  pickRandom,
  pickWeighted,
  randomInteger,
  randomNormal,
  randomNumber,
  range,
  round,
  sampleNormal,
  splitInChunks,
  sum,
  sumProperty,
};
