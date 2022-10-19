import { parseBool, titleCase, camelCase, snakeCase, pascalCase } from "../src/string";

describe.each([
  ["yes ", true],
  ["NO", false],
  ["1", true],
  ["0", false],
])("parseBool()", (input, output) => {
  test(`parseBool('${input}') = '${output}'`, () => {
    expect(parseBool(input)).toBe(output);
  });
});

describe.each([
  [camelCase, "camelCase", "camelCase"],
  [camelCase, "PascalCase", "pascalCase"],
  [camelCase, "snake_case", "snakeCase"],
  [camelCase, "Title case", "titleCase"],
  [pascalCase, "camelCase", "CamelCase"],
  [pascalCase, "PascalCase", "PascalCase"],
  [pascalCase, "snake_case", "SnakeCase"],
  [pascalCase, "Title case", "TitleCase"],
  [snakeCase, "camelCase", "camel_case"],
  [snakeCase, "PascalCase", "pascal_case"],
  [snakeCase, "snake_case", "snake_case"],
  [snakeCase, "Title case", "title_case"],
  [titleCase, "camelCase", "Camel case"],
  [titleCase, "PascalCase", "Pascal case"],
  [titleCase, "snake_case", "Snake case"],
  [titleCase, "Title case", "Title case"],
])("Case functions", (func, input, output) => {
  test(`${func.name}('${input}') = '${output}'`, () => {
    expect(func(input)).toBe(output);
  });
});
