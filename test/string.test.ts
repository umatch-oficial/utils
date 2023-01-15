import {
  formatStr,
  formatTime,
  join,
  joinUrl,
  parse,
  parseBool,
  rsplit,
  camelCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  pad,
} from "../src/string";

test("formatStr()", () => {
  expect(
    formatStr(
      formatStr("hello", { color: "white", bgColor: "red", bold: true, length: 8 }),
      { color: "black", bgColor: "white", length: 12 },
    ),
  ).toBe(
    "\x1B[30m\x1B[47m  \x1B[1m\x1B[37m\x1B[41m  hello \x1B[49m\x1B[47m\x1B[39m\x1B[30m\x1B[22m  \x1B[49m\x1B[39m",
  );
});

describe.each([
  // provide fewer parts than requested
  [{ seconds: 10 }, "10 seconds", { parts: 2 }],
  // provide more parts than requested
  [{ hours: 1, minutes: 2, seconds: 10 }, "1 hour and 2 minutes", { parts: 2 }],
  // ignore zeros
  [{ hours: 0, minutes: 2, seconds: 10 }, "2 minutes and 10 seconds", {}],
  // hoist onto implicit undefined
  [{ hours: 1, seconds: 130 }, "1 hour and 2 minutes", {}],
  // hoist onto explicit undefined
  [{ hours: 1, minutes: undefined, seconds: 130 }, "1 hour and 2 minutes", {}],
  // hoist onto 0
  [{ hours: 1, minutes: 0, seconds: 130 }, "1 hour and 2 minutes", {}],
  // hoist onto existing value
  [{ hours: 1, minutes: 2, seconds: 130 }, "1 hour and 4 minutes", {}],
  // hoist twice
  [{ hours: 1, minutes: 2, seconds: 3600 }, "2 hours and 2 minutes", {}],
  // short
  [{ minutes: 2, seconds: 10 }, "2 m 10 s", { short: true }],
])("formatTime()", (time, res, opts) => {
  test(`formatTime(${JSON.stringify(time)}) = '${res}'`, () => {
    expect(formatTime(time, opts)).toBe(res);
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
  ["mango ", "2.50", 12, "mango   2.50"],
  ["banana ", "1.00", 12, "banana  1.00"],
  ["strawberry ", "3.00", 12, "strawberry 3.00"],
])("pad()", (left, right, length, res) => {
  test(`pad('${left}', '${right}', ${length}) = ${res}`, () => {
    expect(pad(left, right, length)).toBe(res);
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

test(`parse()`, () => {
  expect(parse("àèìòùâêîôûäëïöüÿáéíóúýçãõ")).toBe("aeiouaeiouaeiouyaeiouycao");
});

describe.each([
  ["a,b,c,d", undefined, ["a", "b", "c", "d"]],
  ["a,b,c,d", 1, ["a,b,c", "d"]],
  ["a,b,c,d", 2, ["a,b", "c", "d"]],
  ["a,b,c,d", 3, ["a", "b", "c", "d"]],
  ["a,b,c,d", 4, ["a", "b", "c", "d"]],
])("rsplit()", (str, n, output) => {
  test(`rsplit('${str}'${n ? ", " + n : ""}) = ${JSON.stringify(output)}`, () => {
    expect(rsplit(str, n, ",")).toEqual(output);
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
