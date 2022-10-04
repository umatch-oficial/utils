import { cartesian } from "../src/array";

test("cartesian", () => {
  expect(cartesian(["a"], ["b", "c"]).sort()).toEqual(
    [
      ["a", "b"],
      ["a", "c"],
    ].sort()
  );
});
