import { cartesian } from "../src/array";
import { parseBool } from "../src/string";

test("array.cartesian", () => {
  expect(cartesian(["a"], ["b", "c"]).sort()).toEqual(
    [
      ["a", "b"],
      ["a", "c"],
    ].sort()
  );
});

test("string.parseBool", () => {
  expect(parseBool("yes ")).toBe(true);
});
