import { apply } from "../src/object";

test("apply()", () => {
  const obj = { a: 1, b: 2 };
  expect(apply(obj, (num) => num > 1)).toEqual({ a: false, b: true });
  expect(apply(obj, (num) => num > 1, ["a"])).toEqual({ a: false, b: 2 });
});
