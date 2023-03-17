import {
  formatStr,
  formatTime,
  join,
  joinUrl,
  parse,
  parseBool,
  rsplit,
  split,
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
  ["a,b,c,d", undefined, ["a", "b", "c", "d"]],
  ["a,b,c,d", 1, ["a", "b,c,d"]],
  ["a,b,c,d", 2, ["a", "b", "c,d"]],
  ["a,b,c,d", 3, ["a", "b", "c", "d"]],
  ["a,b,c,d", 4, ["a", "b", "c", "d"]],
])("split()", (str, n, output) => {
  test(`split('${str}'${n ? ", " + n : ""}) = ${JSON.stringify(output)}`, () => {
    expect(split(str, n, ",")).toEqual(output);
  });
});

describe.each([
  [camelCase, "camelCase", "camelCase"],
  [camelCase, "PascalCase", "pascalCase"],
  [camelCase, "snake_case", "snakeCase"],
  [pascalCase, "camelCase", "CamelCase"],
  [pascalCase, "PascalCase", "PascalCase"],
  [pascalCase, "snake_case", "SnakeCase"],
  [snakeCase, "camelCase", "camel_case"],
  [snakeCase, "PascalCase", "pascal_case"],
  [snakeCase, "snake_case", "snake_case"],
  [sentenceCase, "Title Case", "Title case"],
  [titleCase, "the man, the woman", "The Man, the Woman"],
  [sentenceCase, "the man, the woman", "The man, the woman"],
  // accented letters — this tests the regex for all case functions
  [pascalCase, "associação atlética", "AssociaçãoAtlética"],
])("Case functions", (func, input, output) => {
  test(`${func.name}('${input}') = '${output}'`, () => {
    expect(func(input)).toBe(output);
  });
});
