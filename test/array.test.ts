import { cartesian, permutations, intersect, diff, groupBy } from "../src/array";

const FRUITS = [
  { name: "apple", size: 2, color: "red" },
  { name: "banana", size: 2, color: "yellow" },
  { name: "grape", size: 1, color: "green" },
  { name: "melon", size: 3, color: "yellow" },
  { name: "strawberry", size: 1, color: "red" },
  { name: "watermelon", size: 3, color: "green" },
];

function prettyPrint(x: any): string {
  return JSON.stringify(x, null, 2);
}

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

describe.each([
  [
    "color",
    {
      green: FRUITS.filter((fruit) => fruit.color === "green"),
      red: FRUITS.filter((fruit) => fruit.color === "red"),
      yellow: FRUITS.filter((fruit) => fruit.color === "yellow"),
    },
  ],
  [
    "size",
    {
      1: FRUITS.filter((fruit) => fruit.size === 1),
      2: FRUITS.filter((fruit) => fruit.size === 2),
      3: FRUITS.filter((fruit) => fruit.size === 3),
    },
  ],
])("groupBy()", (key, res) => {
  test(`groupBy(FRUITS, '${key}') = ${prettyPrint(res)}`, () => {
    expect(groupBy(FRUITS, key as keyof typeof FRUITS[number])).toEqual(res);
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

test("permutations()", () => {
  expect(
    permutations(["a", "b", "c", "d"])
      .map((a) => a.join(""))
      .sort(),
  ).toEqual(["ab", "ac", "ad", "bc", "bd", "cd"].sort());
});
