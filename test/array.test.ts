import {
  cartesian,
  diff,
  filter,
  filterWithComplement,
  groupBy,
  intersect,
  permutations,
  isSubset,
} from "../src/array";

const FRUITS = [
  { name: "apple", size: 2, color: "red" },
  { name: "banana", size: 2, color: "yellow" },
  { name: "grape", size: 1, color: "green" },
  { name: "melon", size: 3, color: "yellow" },
  { name: "strawberry", size: 1, color: "red" },
  { name: "watermelon", size: 3, color: "green" },
];

test("cartesian()", () => {
  expect(
    cartesian(["a"], ["b", "c"])
      .map((a) => a.join(""))
      .sort(),
  ).toEqual(["ab", "ac"].sort());
});

describe.each([
  [[1, 2, 3], [2, 3], [1]],
  [[1, 2, 3], [3, 2], [1]],
])("diff()", (a, b, output) => {
  test(`diff([${a}], [${b}]) = [${output}]`, () => {
    expect(diff(a, b).sort()).toEqual(output.sort());
  });
});

test("filter()", async () => {
  expect(await filter([1, 2, 3], async (x) => x < 2)).toEqual([1]);
});

describe.each([
  [[1, 2, 3], (x: number) => x < 2, [[1], [2, 3]], ["integers", "x < 2"]],
  [
    [new Date("2022-01-10"), new Date("2022-01-20"), new Date("2022-01-30")],
    (x: Date) => x.getDate() < 10,
    [[new Date("2022-01-10")], [new Date("2022-01-20"), new Date("2022-01-30")]],
    ["dates", "day < 10"],
  ],
])("filterWithComplement()", (array, predicate, output, description) => {
  test(`filterWithComplement(${description[0]}, ${description[1]})`, () => {
    // @ts-ignore
    expect(filterWithComplement(array, predicate)).toEqual(output);
  });
});

describe.each([
  [
    "color",
    {
      green: [
        { name: "grape", size: 1, color: "green" },
        { name: "watermelon", size: 3, color: "green" },
      ],
      red: [
        { name: "apple", size: 2, color: "red" },
        { name: "strawberry", size: 1, color: "red" },
      ],
      yellow: [
        { name: "banana", size: 2, color: "yellow" },
        { name: "melon", size: 3, color: "yellow" },
      ],
    },
  ],
  [
    "size",
    {
      1: [
        { name: "grape", size: 1, color: "green" },
        { name: "strawberry", size: 1, color: "red" },
      ],
      2: [
        { name: "apple", size: 2, color: "red" },
        { name: "banana", size: 2, color: "yellow" },
      ],
      3: [
        { name: "melon", size: 3, color: "yellow" },
        { name: "watermelon", size: 3, color: "green" },
      ],
    },
  ],
])("groupBy()", (key, output) => {
  test(`groupBy(FRUITS, '${key}')`, () => {
    expect(groupBy(FRUITS, key as keyof typeof FRUITS[number])).toEqual(output);
  });
});

test("groupBy() throws", () => {
  expect(() => {
    const arr = [
      { a: 1, b: 2 },
      { a: 1, b: new Date() },
    ];
    // @ts-ignore
    groupBy(arr, "b");
  }).toThrow("Cannot use value");
});

describe.each([
  [
    [1, 2, 3],
    [2, 3],
    [2, 3],
  ],
  [
    [1, 2, 3],
    [3, 2],
    [3, 2],
  ],
])("intersect()", (a, b, output) => {
  test(`intersect([${a}], [${b}]) = [${output}]`, () => {
    expect(intersect(a, b).sort()).toEqual(output.sort());
  });
});

test("isSubset()", () => {
  expect(isSubset([1, 2, 3], [3, 2, 1])).toBe(true);
  expect(isSubset([1, 2, 3], [2, 1])).toBe(false);
});

test("permutations()", () => {
  expect(
    permutations(["a", "b", "c", "d"])
      .map((a) => a.join(""))
      .sort(),
  ).toEqual(["ab", "ac", "ad", "bc", "bd", "cd"].sort());
});
