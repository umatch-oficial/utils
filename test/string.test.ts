import {
  formatTime,
  join,
  joinUrl,
  parseBool,
  camelCase,
  pascalCase,
  snakeCase,
  sentenceCase,
  titleCase,
} from "../src/string";

describe.each([
  // provide fewer parts than informed
  [{ seconds: 10 }, 2, "10 seconds"],
  // provide more parts than informed
  [{ hours: 1, minutes: 2, seconds: 10 }, 2, "1 hour and 2 minutes"],
  // hoist onto implicit undefined
  [{ hours: 1, seconds: 130 }, 2, "1 hour and 2 minutes"],
  // hoist onto explicit undefined
  [{ hours: 1, minutes: undefined, seconds: 130 }, 2, "1 hour and 2 minutes"],
  // hoist onto 0
  [{ hours: 1, minutes: 0, seconds: 130 }, 2, "1 hour and 2 minutes"],
  // hoist onto existing value
  [{ hours: 1, minutes: 2, seconds: 130 }, 2, "1 hour and 4 minutes"],
  // hoist twice
  [{ hours: 1, minutes: 2, seconds: 3600 }, 2, "2 hours and 2 minutes"],
])("formatTime()", (time, parts, res) => {
  test(`formatTime(${JSON.stringify(time)}) = '${res}'`, () => {
    expect(formatTime(time, { parts })).toBe(res);
  });
});

describe.each([
  [["mango"], "mango"],
  [["mango", "banana"], "mango and banana"],
  [["mango", "banana", "grape"], "mango, banana and grape"],
  [["mango", "banana", "grape", "lime"], "mango, banana, grape and lime"],
])("join()", (parts, res) => {
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
  [camelCase, "Sentence case", "sentenceCase"],
  [camelCase, "Title Case", "titleCase"],
  [pascalCase, "camelCase", "CamelCase"],
  [pascalCase, "PascalCase", "PascalCase"],
  [pascalCase, "snake_case", "SnakeCase"],
  [pascalCase, "Sentence case", "SentenceCase"],
  [pascalCase, "Title Case", "TitleCase"],
  [snakeCase, "camelCase", "camel_case"],
  [snakeCase, "PascalCase", "pascal_case"],
  [snakeCase, "snake_case", "snake_case"],
  [snakeCase, "Sentence case", "sentence_case"],
  [snakeCase, "Title Case", "title_case"],
  [sentenceCase, "camelCase", "Camel case"],
  [sentenceCase, "PascalCase", "Pascal case"],
  [sentenceCase, "snake_case", "Snake case"],
  [sentenceCase, "Sentence case", "Sentence case"],
  [sentenceCase, "Title Case", "Title case"],
  [titleCase, "camelCase", "Camel Case"],
  [titleCase, "PascalCase", "Pascal Case"],
  [titleCase, "snake_case", "Snake Case"],
  [titleCase, "Sentence case", "Sentence Case"],
  [titleCase, "Title Case", "Title Case"],
  // some words should not be capitalized
  [titleCase, "the man in the High Castle", "The Man In the High Castle"],
  // accented letters — this tests the regex for all case functions
  [titleCase, "associação atlética", "Associação Atlética"],
])("Case functions", (func, input, output) => {
  test(`${func.name}('${input}') = '${output}'`, () => {
    expect(func(input)).toBe(output);
  });
});
