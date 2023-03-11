import {
  average,
  diff,
  divmod,
  limitToRange,
  nthElement,
  pickRandom,
  pickWeighted,
  randomInteger,
  randomNumber,
  range,
  round,
  splitInChunks,
} from "../src/math";

test("average", () => {
  expect(average([1, 2, 3, 4])).toBeCloseTo(2.5);
});

test("diff", () => {
  expect(diff([1, 3, 7, 10])).toEqual([2, 4, 3]);
});

test("divmod", () => {
  expect(divmod(69, 42)).toEqual([1, 27]);
});

describe.each([
  ["no change", [10, 5, 15], 10],
  ["limit lower", [10, 11, 15], 11],
  ["limit upper", [10, 5, 9], 9],
])("limitToRange()", (name, [num, lower, upper], output) => {
  test(name, () => {
    expect(limitToRange(num, lower, upper)).toEqual(output);
  });
});

test("nthElement", () => {
  expect(nthElement([0, 1, 2, 3], 5)).toBe(1);
});

test("pickRandom", () => {
  const arr = ["a", "b", "c", "d"];
  const n = 100_000;

  const counts = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const element = pickRandom(arr);
    counts.set(element, (counts.get(element) ?? 0) + 1);
  }

  const expectedProportion = 1 / arr.length;
  counts.forEach((count) => {
    const proportion = count / n;
    expect(proportion).toBeCloseTo(expectedProportion);
  });
});

test("pickWeighted()", () => {
  const options = [
    { option: "a", weight: 1 },
    { option: "b", weight: 2 },
    { option: "c", weight: 3 },
    { option: "d", weight: 4 },
  ];
  const n = 100_000;

  const counts = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const option = pickWeighted(options);
    counts.set(option, (counts.get(option) ?? 0) + 1);
  }

  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  counts.forEach((count, option) => {
    const expectedProportion =
      options.find((o) => o.option === option)!.weight / totalWeight;
    expect(count / n).toBeCloseTo(expectedProportion);
  });
});

describe.each([
  ["no values - uses 0 and 1", [undefined, undefined], [0, 1]],
  ["one value - uses 0 and value", [2, undefined], [0, 2]],
  ["two values", [2, 3], [2, 3]],
])("randomInteger()", (name, [a, b], [atLeast, atMost]) => {
  const n = 150_000;
  test(name, () => {
    const results = Array.from({ length: n }).map(() => randomInteger(a, b));

    // all within range
    expect(results.every((r) => r >= atLeast)).toBeTruthy();
    expect(results.every((r) => r <= atMost)).toBeTruthy();

    // unbiased
    const avg = average(results);
    const expectedAvg = average([atLeast, atMost]);
    expect(avg).toBeCloseTo(expectedAvg);

    // all integers
    const rounded = results.map((r) => round(r, 0));
    expect(rounded).toEqual(results);
  });
});

describe.each([
  ["no values - uses 0 and 1", [undefined, undefined], [0, 1]],
  ["one value - uses 0 and value", [2, undefined], [0, 2]],
  ["two values", [2, 3], [2, 3]],
])("randomNumber()", (name, [a, b], [atLeast, atMost]) => {
  const n = 150_000;
  test(name, () => {
    const results = Array.from({ length: n }).map(() => randomNumber(a, b));

    // all within range
    expect(results.every((r) => r >= atLeast)).toBeTruthy();
    expect(results.every((r) => r <= atMost)).toBeTruthy();

    // unbiased
    const avg = average(results);
    const expectedAvg = average([atLeast, atMost]);
    expect(avg).toBeCloseTo(expectedAvg);
  });
});

describe.each([
  ["one value - uses 0 and value", [1, undefined], [0]],
  ["two values", [0, 2], [0, 1]],
])("range()", (name, [a, b], output) => {
  test(name, () => {
    expect(range(a!, b)).toEqual(output);
  });
});

describe.each([
  [[1.51, undefined], 1.5],
  [[1.51, 2], 1.51],
  [[1.499999999999999, 0], 1],
  [[1.5, 0], 2],
])("round()", ([n, digits], output) => {
  test(`round(${n}, ${digits}) = ${output}`, () => {
    expect(round(n!, digits)).toEqual(output);
  });
});

test("splitInChunks", () => {
  expect(splitInChunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ]);
});