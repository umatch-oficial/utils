// noinspection JSUnusedLocalSymbols
/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-duplicate-type-constituents */
import { DateTime } from 'luxon';

import {
  basicPluralizer,
  capitalize,
  center,
  formatStr,
  formatTime,
  getCountDown,
  join,
  joinNonEmpty,
  joinUrl,
  pad,
  parseBool,
  parseFunctionCall,
  parseNumber,
  removeAccents,
  rsplit,
  split,
  uncapitalize,
  camelCase,
  pascalCase,
  sentenceCase,
  snakeCase,
  titleCase,
  type CamelToSnakeCase,
  type Replace,
  type SnakeToCamelCase,
  type Trim,
  type Unquote,
} from '../src/string';

describe.each([
  ['person', undefined, undefined, 'persons'],
  ['person', 0, undefined, 'persons'],
  ['person', 1, undefined, 'person'],
  ['person', 2, undefined, 'persons'],
  ['person', 2, 'people', 'people'],
])('basicPluralizer()', (word, quantity, plural, res) => {
  test(`basicPluralizer('${word}'${quantity ? `, ${quantity}` : ''}${
    plural ? `, '${plural}'` : ''
  }) = ${res}`, () => {
    expect(basicPluralizer(word, quantity, plural)).toBe(res);
  });
});

test('capitalize()', () => {
  expect(capitalize('hello')).toBe('Hello');
});

test('center()', () => {
  expect(center('hello', 11)).toBe('   hello   ');
  expect(center('hello', 10, '*')).toBe('***hello**');
});

test('formatStr()', () => {
  expect(
    formatStr(
      formatStr('hello', { color: 'white', bgColor: 'red', bold: true, length: 8 }),
      { color: 'black', bgColor: 'white', length: 12 },
    ),
  ).toBe(
    '\x1B[30m\x1B[47m  \x1B[1m\x1B[37m\x1B[41m  hello \x1B[49m\x1B[47m\x1B[39m\x1B[30m\x1B[22m  \x1B[49m\x1B[39m',
  );
});

describe.each([
  ['provide fewer parts than requested', { seconds: 10 }, { parts: 2 }, '10 seconds'],
  [
    'provide more parts than requested',
    { hours: 1, minutes: 2, seconds: 10 },
    { parts: 2 },
    '1 hour and 2 minutes',
  ],
  ['ignore zeros', { hours: 0, minutes: 2, seconds: 10 }, {}, '2 minutes and 10 seconds'],
  [
    'hoist onto implicit undefined',
    { hours: 1, seconds: 130 },
    {},
    '1 hour and 2 minutes',
  ],
  [
    'hoist onto explicit undefined',
    { hours: 1, minutes: undefined, seconds: 130 },
    {},
    '1 hour and 2 minutes',
  ],
  ['hoist onto 0', { hours: 1, minutes: 0, seconds: 130 }, {}, '1 hour and 2 minutes'],
  [
    'hoist onto existing value',
    { hours: 1, minutes: 2, seconds: 130 },
    {},
    '1 hour and 4 minutes',
  ],
  ['hoist twice', { hours: 1, minutes: 2, seconds: 3600 }, {}, '2 hours and 2 minutes'],
  ['short', { minutes: 2, seconds: 10 }, { short: true }, '2 m 10 s'],
])('formatTime()', (desc, time, opts, res) => {
  test(desc, () => {
    expect(formatTime(time, opts)).toBe(res);
  });
});

describe.each([
  [{}, '3 days'],
  [{ short: true }, '3d'],
  [
    {
      unitsThresholds: [
        ['day', 5],
        ['hour', 1],
      ] as const,
    },
    '72 hours',
  ],
])('getCountDown()', (opts, res) => {
  const date = DateTime.now().plus({ days: 3, seconds: 1 });
  test(`getCountDown(date${
    Object.keys(opts).length ? ', ' + JSON.stringify(opts) : ''
  }) = '${res}'`, () => {
    expect(getCountDown(date, opts)).toBe(res);
  });
});

describe.each([
  [['mango'], 'mango'],
  [['mango', 'banana'], 'mango and banana'],
  [['mango', 'banana', 'grape'], 'mango, banana and grape'],
  [['mango', 'banana', 'grape', 'lime'], 'mango, banana, grape and lime'],
])('join()', (parts, res) => {
  test(`join(${JSON.stringify(parts)}) = ${res}`, () => {
    expect(join(parts, 'and')).toBe(res);
  });
});

test('joinNonEmpty()', () => {
  expect(joinNonEmpty(['a', '0', 'b', '', 'c'])).toEqual('a0bc');
});

describe.each([
  ['https://abc.com', 'example'],
  ['https://abc.com/', 'example'],
  ['https://abc.com/', '/example'],
])('joinUrl()', (...parts) => {
  const output = 'https://abc.com/example';
  test(`joinUrl(${JSON.stringify(parts)}) = '${output}'`, () => {
    expect(joinUrl(...parts)).toBe(output);
  });
});

describe.each([
  ['mango ', '2.50', 12, 'mango   2.50'],
  ['banana ', '1.00', 12, 'banana  1.00'],
  ['strawberry ', '3.00', 12, 'strawberry 3.00'],
])('pad()', (left, right, length, res) => {
  test(`pad('${left}', '${right}', ${length}) = ${res}`, () => {
    expect(pad(left, right, length)).toBe(res);
  });
});

describe.each([
  ['yes ', true],
  ['NO', false],
  ['1', true],
  ['0', false],
  [' TRUE', true],
  ['False', false],
])('parseBool()', (input, output) => {
  test(`parseBool('${input}') = ${output}`, () => {
    expect(parseBool(input)).toBe(output);
  });
});

test('parseBool() throws', () => {
  expect(() => parseBool('')).toThrow('Failed to parse');
});

test('parseNumber() ', () => {
  expect(parseNumber(' 3 ')).toBe(3);
});

test('parseNumber() throws', () => {
  expect(() => parseNumber('3e')).toThrow('Failed to parse');
});

describe.each([
  ['func(', ['', []]],
  ['func()', ['func', []]],
  ['func(,)', ['', []]],
  ['func(a, ( )', ['', []]],
  [' func( a ) ', ['func', ['a']]],
  ['func(a) a', ['', []]],
  ['a func(a)', ['', []]],
  ['func(0, false)', ['func', [0, false]]],
  ['func(\'"true"\')', ['func', ['"true"']]],
] as const)('parseFunctionCall()', (input, output) => {
  const [name, args] = output;
  test(`parseFunctionCall('${input}') = [${name}, [${JSON.stringify(args)}]]`, () => {
    expect(parseFunctionCall(input)).toEqual(output);
  });
});

test(`removeAccents()`, () => {
  expect(removeAccents('àèìòùâêîôûäëïöüÿáéíóúýçãõ')).toBe('aeiouaeiouaeiouyaeiouycao');
});

describe.each([
  ['a,b,c,d', undefined, ['a', 'b', 'c', 'd']],
  ['a,b,c,d', 1, ['a,b,c', 'd']],
  ['a,b,c,d', 2, ['a,b', 'c', 'd']],
  ['a,b,c,d', 3, ['a', 'b', 'c', 'd']],
  ['a,b,c,d', 4, ['a', 'b', 'c', 'd']],
])('rsplit()', (str, n, output) => {
  test(`rsplit('${str}'${n ? ', ' + n : ''}) = ${JSON.stringify(output)}`, () => {
    expect(rsplit(str, n, ',')).toEqual(output);
  });
});

describe.each([
  ['a,b,c,d', undefined, ['a', 'b', 'c', 'd']],
  ['a,b,c,d', 1, ['a', 'b,c,d']],
  ['a,b,c,d', 2, ['a', 'b', 'c,d']],
  ['a,b,c,d', 3, ['a', 'b', 'c', 'd']],
  ['a,b,c,d', 4, ['a', 'b', 'c', 'd']],
])('split()', (str, n, output) => {
  test(`split('${str}'${n ? ', ' + n : ''}) = ${JSON.stringify(output)}`, () => {
    expect(split(str, n, ',')).toEqual(output);
  });
});

test('uncapitalize()', () => {
  expect(uncapitalize('HELLO')).toBe('hELLO');
});

describe.each([
  [camelCase, 'camelCase', 'camelCase'],
  [camelCase, 'PascalCase', 'pascalCase'],
  [camelCase, 'snake_case', 'snakeCase'],
  [pascalCase, 'camelCase', 'CamelCase'],
  [pascalCase, 'PascalCase', 'PascalCase'],
  [pascalCase, 'snake_case', 'SnakeCase'],
  [snakeCase, 'camelCase', 'camel_case'],
  [snakeCase, 'PascalCase', 'pascal_case'],
  [snakeCase, 'snake_case', 'snake_case'],
  [sentenceCase, 'Title Case', 'Title case'],
  [titleCase, 'the man, the woman', 'The Man, the Woman'],
  [sentenceCase, 'the man, the woman', 'The man, the woman'],
  // accented letters — this tests the regex for all case functions
  [pascalCase, 'associação atlética', 'AssociaçãoAtlética'],
])('Case functions', (func, input, output) => {
  test(`${func.name}('${input}') = '${output}'`, () => {
    expect(func(input)).toBe(output);
  });
});

test('CamelToSnakeCase', () => {
  type A = 'fooBar';
  type B = 'fooBARBaz';

  const a: CamelToSnakeCase<A> = 'foo_bar';
  const b: CamelToSnakeCase<B> = 'foo_bar_baz';
});

test('Replace', () => {
  type T = 'banana';

  const a: Replace<T, 'b', ''> = 'anana';
});

test('SnakeToCamelCase', () => {
  type T = 'foo_bar';

  const a: SnakeToCamelCase<T> = 'fooBar';
});

test('Trim', () => {
  type T = ' banana  ';

  const a: Trim<T> = 'banana';
});

test('Unquote', () => {
  type A = "'test'";
  type B = '"test"';

  const a1: Unquote<A> | Unquote<B> = 'test';
  const a2: Unquote<A, '"'> = "'test'";
  const b1: Unquote<B> = 'test';
  const b2: Unquote<B, "'"> = '"test"';
});
