import { parseBool } from "../src/string";

test("string.parseBool", () => {
  expect(parseBool("yes ")).toBe(true);
});
