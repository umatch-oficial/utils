import { apply, deepMap, getDeepProperty, setDeepProperty } from "../src/object";

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
  ["a", 5, { a: 5 }],
  ["b", 5, { a: { b: [1, { c: 2 }] }, b: 5 }],
  ["a.b", 5, { a: { b: 5 } }],
  ["a.b[0]", 5, { a: { b: [5, { c: 2 }] } }],
  ["a.b[1]", 5, { a: { b: [1, 5] } }],
  ["a.b[1].c", 5, { a: { b: [1, { c: 5 }] } }],
])("setDeepProperty()", (path, value, output) => {
  const obj = { a: { b: [1, { c: 2 }] } };
  test(path, () => {
    expect(setDeepProperty(obj, path, value)).toEqual(output);
  });
});
