import { apply, deepMap } from "../src/object";

describe.each([
  [{ a: 1, b: 2 }, (num: number) => num > 1, undefined, { a: false, b: true }],
  [{ a: 1, b: 2 }, (num: number) => num > 1, ["a"], { a: false, b: 2 }],
])("apply()", (obj, func, keys, res) => {
  test(`apply(${JSON.stringify(obj)}, ${func}, ${JSON.stringify(
    keys,
  )}) = ${JSON.stringify(res)}`, () => {
    // @ts-ignore
    expect(apply(obj, func, keys)).toEqual(res);
  });
});

test("deepMap()", () => {
  const obj = [[[1, 2, 3, 4, 5], 3, 4, 5, [1, 2, [3, 4, 5]]]];
  const res = [[[0, 0, 1, 1, 1], 1, 1, 1, [0, 0, [1, 1, 1]]]];
  expect(deepMap(obj, (num) => (num > 2 ? 1 : 0))).toEqual(res);
});
