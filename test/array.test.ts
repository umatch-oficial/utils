import {
  cartesian,
  deepFlat,
  diff,
  filter,
  filterByObject,
  filterWithComplement,
  findLastIndex,
  groupBy,
  hasSameElements,
  intersect,
  isSubset,
  joinNonEmpty,
  permutations,
  remove,
  shuffle,
  sliceWithOverflow,
  transpose,
  trim,
  uniques,
  zip,
} from "../src/array";

test("cartesian()", () => {
  expect(cartesian(["a", "b"] as const, [1, 2] as const, [true]).sort()).toEqual(
    [
      ["a", 1, true],
      ["a", 2, true],
      ["b", 1, true],
      ["b", 2, true],
    ].sort(),
  );
});

test("deepFlat()", () => {
  expect(deepFlat([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
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

test("filterByObject()", () => {
  expect(
    filterByObject(
      [
        { a: 1, b: 2 },
        { a: 1, b: 3 },
        { a: 2, b: 3 },
      ],
      { a: 1, b: 3 },
    ),
  ).toEqual([{ a: 1, b: 3 }]);
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
    // @ts-expect-error
    expect(filterWithComplement(array, predicate)).toEqual(output);
  });
});

test("findLastIndex()", () => {
  expect(findLastIndex([1, 2, 2, 1], (x) => x === 2)).toEqual(2);
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
] as const)("groupBy()", (key, output) => {
  const FRUITS = [
    { name: "apple", size: 2, color: "red" },
    { name: "banana", size: 2, color: "yellow" },
    { name: "grape", size: 1, color: "green" },
    { name: "melon", size: 3, color: "yellow" },
    { name: "strawberry", size: 1, color: "red" },
    { name: "watermelon", size: 3, color: "green" },
  ] as const;
  test(`groupBy(FRUITS, '${key}')`, () => {
    expect(groupBy(FRUITS, key)).toEqual(output);
  });
});

test("groupBy() throws", () => {
  expect(() => {
    const arr = [
      { a: 1, b: 2 },
      { a: 1, b: new Date() },
    ];
    groupBy(arr, "b");
  }).toThrow("Cannot use value");
});

test("hasSameElements()", () => {
  expect(hasSameElements([1, 2, 3, 3] as const, [3, 3, 2, 1] as const)).toBe(true);
  expect(hasSameElements([1, 2, 3, 3] as const, [3, 2, 1] as const)).toBe(false);
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

test("joinNonEmpty()", () => {
  expect(joinNonEmpty(["a", "0", "b", "", "c"])).toEqual("a0bc");
});

test("permutations()", () => {
  expect(
    permutations(["a", "b", "c", "d"])
      .map((a) => a.join(""))
      .sort(),
  ).toEqual(["ab", "ac", "ad", "bc", "bd", "cd"].sort());
});

test("remove()", () => {
  const res = remove(["a", "b", "c"], "a");
  expect(res).toEqual(["b", "c"]);
});

test("shuffle()", () => {
  const arr = [1, 2, 3];
  const n = 100_000;

  const counts = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const shuffled = shuffle(arr);
    const hash = JSON.stringify(shuffled);
    counts.set(hash, (counts.get(hash) ?? 0) + 1);
  }

  counts.forEach((count) => {
    const proportion = count / n;
    expect(proportion).toBeCloseTo(1 / 6);
  });
});

test("sliceWithOverflow()", () => {
  expect(sliceWithOverflow([1, 2, 3], 2, 5)).toEqual([3, 1, 2]);
});

test("transpose()", () => {
  expect(
    transpose([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]),
  ).toEqual([
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ]);
});

test("trim()", () => {
  expect(trim([null, "a", null, "c", null], Boolean)).toEqual(["a", null, "c"]);
});

test("uniques()", () => {
  expect(uniques(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
});

test("zip()", () => {
  expect(zip(["a", "b", "c"], [1, 2, 3])).toEqual([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
});

test("zip() throws", () => {
  expect(() => {
    zip(["a", "b"], [1, 2, 3]);
  }).toThrow("different lengths");
});
