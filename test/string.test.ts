import {
  join,
  joinUrl,
  parseBool,
  camelCase,
  pascalCase,
  snakeCase,
  titleCase,
} from "../src/string";

describe.each([
  [["mango"], "mango"],
  [["mango", "banana"], "mango and banana"],
  [["mango", "banana", "grape"], "mango, banana and grape"],
  [["mango", "banana", "grape", "lime"], "mango, banana, grape and lime"],
])("Language.join()", (parts, res) => {
  test(`join(${JSON.stringify(parts)}) = ${res}`, () => {
    expect(join(parts, "and")).toBe(res);
  });
});

describe.each([
  ["https://abc.com", "example"],
  ["https://abc.com/", "example"],
  ["https://abc.com/", "/example"],
])("joinUrl()", (...parts) => {
  const output = "https://abc.com/example";
  test(`joinUrl(${JSON.stringify(parts)}) = '${output}'`, () => {
    expect(joinUrl(...parts)).toBe(output);
  });
});

describe.each([
  ["yes ", true],
  ["NO", false],
  ["1", true],
  ["0", false],
  [" TRUE", true],
  ["False", false],
])("parseBool()", (input, output) => {
  test(`parseBool('${input}') = ${output}`, () => {
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
