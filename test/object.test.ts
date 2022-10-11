import { apply } from "../src/object";

test("apply", () => {
  expect(apply({ a: 1, b: 2 }, (num) => num > 1)).toEqual({ a: false, b: true });
  expect(apply({ a: 1, b: 2 }, (num) => num > 1, ["a"])).toEqual({ a: false, b: 2 });
});
