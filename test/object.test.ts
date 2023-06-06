import {
  apply,
  deepMap,
  extract,
  getDeepProperty,
  merge,
  rename,
  setDeepProperty,
  stringify,
} from "../src/object";

describe.each([
  ["all keys", undefined, { a: false, b: true }],
  ["some keys", ["a"], { a: false, b: 2 }],
])("apply()", (desc, keys, output) => {
  const obj = { a: 1, b: 2 };
  const func = (num: number) => num > 1;
  test(desc, () => {
    // @ts-ignore
    expect(apply(obj, func, keys)).toEqual(output);
  });
});

test("deepMap()", () => {
  const obj = [[[1, 2, 3, 4, 5], 3, 4, 5, [1, 2, [3, 4, 5]]]];
  const output = [[[0, 0, 1, 1, 1], 1, 1, 1, [0, 0, [1, 1, 1]]]];
  expect(deepMap(obj, (num) => (num > 2 ? 1 : 0))).toEqual(output);
});

describe.each([
  [{ prefix: "foo_" }, [{ a: 1, b: 2 }, { bar_a: 3 }]],
  [{ prefix: "foo_", rename: false }, [{ foo_a: 1, foo_b: 2 }, { bar_a: 3 }]],
  [{ suffix: "_a" }, [{ foo: 1, bar: 3 }, { foo_b: 2 }]],
  [{ keys: ["foo_a", "foo_b"] }, [{ foo_a: 1, foo_b: 2 }, { bar_a: 3 }]],
  [
    { keys: (key: string) => !!key.match("foo_") },
    [{ foo_a: 1, foo_b: 2 }, { bar_a: 3 }],
  ],
  [{ values: (value: number) => value > 1 }, [{ foo_b: 2, bar_a: 3 }, { foo_a: 1 }]],
])("extract", (options, output) => {
  const obj = { foo_a: 1, foo_b: 2, bar_a: 3 };
  test(`extract({ foo_a: 1, foo_b: 2, bar_a: 3 }, ${stringify(options).replace(
    /\s+/g,
    " ",
  )}) = ${JSON.stringify(output)}`, () => {
    expect(extract(obj, options)).toEqual(output);
  });
});

describe.each([
  ["a", { b: [1, { c: 2 }] }],
  ["a.b", [1, { c: 2 }]],
  ["a.b[0]", 1],
  ["a.b[1]", { c: 2 }],
  ["a.b[1].c", 2],
])("getDeepProperty()", (path, output) => {
  const obj = { a: { b: [1, { c: 2 }] } };
  test(path, () => {
    expect(getDeepProperty(obj, path)).toEqual(output);
  });
});

describe.each([
  ["flat", { a: 1, b: [2, 3] }, { b: 2, c: 3 }, undefined, { a: 1, b: 2, c: 3 }],
  [
    "flat concat",
    { a: 1, b: [2, 3] },
    { b: [4], c: 3 },
    "concat",
    { a: 1, b: [2, 3, 4], c: 3 },
  ],
  [
    "flat concat error",
    { a: 1, b: [2, 3] },
    { b: 4 },
    "concat",
    "Cannot concat array with number (field 'b')",
  ],
  [
    "deep",
    { a: 1, b: { a: 1 }, d: 5 },
    { b: { c: [2, 3, 4] } },
    undefined,
    { a: 1, b: { a: 1, c: [2, 3, 4] }, d: 5 },
  ],
  [
    "deep concat",
    { a: [{ b: 1 }] },
    { a: [{ c: 2 }] },
    "concat",
    { a: [{ b: 1 }, { c: 2 }] },
  ],
] as const)("merge()", (desc, a, b, strategy, output) => {
  test(desc, () => {
    if (typeof output === "string") {
      expect(() => merge(a, b, strategy)).toThrow(output);
    } else {
      expect(merge(a, b, strategy)).toEqual(output);
    }
  });
});

describe.each([
  ["dictionary", { a: "d" }, { d: 1, b: 2, c: 3 }],
  ["function", (key: string) => `${key}_`, { a_: 1, b_: 2, c_: 3 }],
])("rename()", (path, mapper, output) => {
  const obj = { a: 1, b: 2, c: 3 };
  test(path, () => {
    expect(rename(obj, mapper)).toEqual(output);
  });
});

describe.each([
  ["overwrite first level key", "a", 5, { a: 5 }],
  ["write first level key", "b", 5, { a: { b: [1, { c: 2 }] }, b: 5 }],
  ["write deep key", "b.a", 5, { a: { b: [1, { c: 2 }] }, b: { a: 5 } }],
  ["overwrite deep key", "a.b", 5, { a: { b: 5 } }],
  ["overwrite element of array", "a.b[1]", 5, { a: { b: [1, 5] } }],
])("setDeepProperty()", (desc, path, value, output) => {
  const obj = { a: { b: [1, { c: 2 }] } };
  test(desc, () => {
    expect(setDeepProperty(obj, path, value)).toEqual(output);
  });
});

describe.each([
  [{ indent: 0, pad: false }, '{ "a": 1, "deep": [ { "b": [ 3, 4 ] }, "test" ] }'],
  [{ indent: 0, pad: true }, '{ "a": 1, "deep": [ { "b": [ 3, 4 ] }, "test" ] }'],
  [
    { indent: 2, pad: false },
    `{
  "a": 1,
  "deep": [
    {
      "b": [
        3,
        4
      ]
    },
    "test"
  ]
}`,
  ],
  [
    { indent: 2, pad: true },
    `{
  "a":    1,
  "deep": [
    {
      "b": [
        3,
        4
      ]
    },
    "test"
  ]
}`,
  ],
])("stringify()", (options, output) => {
  const obj = { a: 1, deep: [{ b: [3, 4] }, "test"] };
  test(JSON.stringify(options), () => {
    expect(stringify(obj, options)).toBe(output);
  });
});
