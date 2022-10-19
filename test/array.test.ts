import { cartesian, permutations, intersect, diff } from "../src/array";

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
