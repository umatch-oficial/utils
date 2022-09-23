const { cos, floor, log, max, min, PI, random, sqrt, trunc } = Math;

/**
 * Returns the average of an array of numbers.
 */
export function average(array: number[]): number {
  return array.reduce((a, b) => a + b) / array.length;
}

/**
 * Returns the difference between each element and the previous in an array.
 *
 * @example
 * // returns [2,4,3]
 * diff([1,3,7,10])
 */
export function diff(array: number[]): number[] {
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
export function divmod(x: number, y: number): [number, number] {
  return [trunc(x / y), x % y];
}

/**
 * Returns the number or min/max if it is below/above the thresholds, respectively.
 */
export function limitToRange(num: number, lower: number, upper: number): number {
  return min(max(num, lower), upper);
}

/**
 * Returns the nth element with overflow.
 *
 * @example
 * // returns 1
 * nthElement([0,1,2,3], 5)
 */
export function nthElement<T>(array: T[], n: number): T {
  return array[n % array.length];
}

/**
 * Picks a random option from an array, with equal weights.
 */
export function pickRandom<T>(options: T[]): T {
  const roll = random();
  const chance = 1 / options.length;
  const i = floor(roll / chance);
  return options[i];
}

/**
 * Picks a random option from an array of { option, weight }.
 */
export function pickWeighted<T extends { option: unknown; weight: number }>(
  options: T[]
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
 * Returns a random integer between 0 and 1.
 */
export function randomInteger(): number;
/**
 * Returns a random integer between 0 and max.
 */
export function randomInteger(max: number): number;
/**
 * Returns a random integer between min and max.
 */
export function randomInteger(min: number, max: number): number;
export function randomInteger(min?: number, max?: number): number {
  return min
    ? max
      ? floor(randomNumber(min, max))
      : floor(randomNumber(0, min))
    : floor(randomNumber(0, 1));
}

/**
 * Returns a random number from the normal distribution between min and max.
 */
export function randomNormal(min: number, max: number, mean?: number): number {
  mean = mean ?? average([min, max]);
  return limitToRange(floor(mean * (1 + sampleNormal() / 2)), min, max);
}

/**
 * Returns a random number between 0 and 1.
 */
export function randomNumber(): number;
/**
 * Returns a random number between 0 and max.
 */
export function randomNumber(max: number): number;
/**
 * Returns a random number between min and max.
 */
export function randomNumber(min?: number, max?: number): number;
export function randomNumber(min?: number, max?: number): number {
  const roll = random();
  return min ? (max ? min + (max - min) * roll : min * roll) : roll;
}

/**
 * Returns [start, end[ or [0, end[.
 */
export function range(end: number): number[];
export function range(start: number, end: number): number[];
export function range(a: number, b?: number): number[] {
  const [start, end] = b ? [a, b] : [0, a];
  return Array.from({ length: end - start }).map((_, i) => i + start);
}

/**
 * Returns the number rounded to the specified amount of digits.
 */
export function round(number: number, digits: number = 1): number {
  return Math.round((number + Number.EPSILON) * 10 ** digits) / 10 ** digits;
}

/**
 * Returns a random number from the normal distribution.
 */
export function sampleNormal(): number {
  return sqrt(-2 * log(1 - random())) * cos(2 * PI * random());
}

/**
 * Splits an array into chunks of equal size.
 */
export function splitInChunks<T>(array: T[], size: number): T[][] {
  const chunks: any[] = [];
  for (let i = 0; i < array.length; i += size) {
    const n = min(array.length - i, size);
    const chunk = array.slice(i, i + n);
    chunks.push(chunk);
  }
  return chunks;
}
