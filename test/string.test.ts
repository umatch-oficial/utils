// noinspection JSUnusedLocalSymbols
/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-duplicate-type-constituents */
import { DateTime } from 'luxon';

import {
  basicPluralizer,
  camelCase,
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
  pascalCase,
  removeAccents,
  rsplit,
  sentenceCase,
  snakeCase,
  split,
  titleCase,
  type Replace,
  type Trim,
  type Unquote,
  uncapitalize,
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

describe('Case functions', () => {
  const fooBarCamel = 'fooBar';
  const fooBarKebab = 'foo-bar';
  const fooBarPascal = 'FooBar';
  const fooBarSentence = 'Foo bar';
  const fooBarSnake = 'foo_bar';
  const fooBarTitle = 'Foo Bar';

  describe('camelCase', () => {
    test('camel to camel', () => {
      const actual: typeof fooBarCamel = camelCase(fooBarCamel);
      expect(actual).toBe(fooBarCamel);
    });
    test('kebab to camel', () => {
      const actual: typeof fooBarCamel = camelCase(fooBarKebab);
      expect(actual).toBe(fooBarCamel);
    });
    test('Pascal to camel', () => {
      const actual: typeof fooBarCamel = camelCase(fooBarPascal);
      expect(actual).toBe(fooBarCamel);
    });
    test('snake to camel', () => {
      const actual: typeof fooBarCamel = camelCase(fooBarSnake);
      expect(actual).toBe(fooBarCamel);
    });
    test('Sentence to camel', () => {
      const actual: typeof fooBarCamel = camelCase(fooBarSentence);
      expect(actual).toBe(fooBarCamel);
    });
    test('Title to camel', () => {
      const actual: typeof fooBarCamel = camelCase(fooBarTitle);
      expect(actual).toBe(fooBarCamel);
    });
  });
  describe('PascalCase', () => {
    test('camel to Pascal', () => {
      const actual: typeof fooBarPascal = pascalCase(fooBarCamel);
      expect(actual).toBe(fooBarPascal);
    });
    test('kebab to Pascal', () => {
      const actual: typeof fooBarPascal = pascalCase(fooBarKebab);
      expect(actual).toBe(fooBarPascal);
    });
    test('Pascal to Pascal', () => {
      const actual: typeof fooBarPascal = pascalCase(fooBarPascal);
      expect(actual).toBe(fooBarPascal);
    });
    test('snake to Pascal', () => {
      const actual: typeof fooBarPascal = pascalCase(fooBarSnake);
      expect(actual).toBe(fooBarPascal);
    });
    test('Sentence to Pascal', () => {
      const actual: typeof fooBarPascal = pascalCase(fooBarSentence);
      expect(actual).toBe(fooBarPascal);
    });
    test('Title to Pascal', () => {
      const actual: typeof fooBarPascal = pascalCase(fooBarTitle);
      expect(actual).toBe(fooBarPascal);
    });
  });
  describe('Sentence case', () => {
    test('camel to Sentence', () => {
      const actual: typeof fooBarSentence = sentenceCase(fooBarCamel);
      expect(actual).toBe(fooBarSentence);
    });
    test('kebab to Sentence', () => {
      const actual: typeof fooBarSentence = sentenceCase(fooBarKebab);
      expect(actual).toBe(fooBarSentence);
    });
    test('Pascal to Sentence', () => {
      const actual: typeof fooBarSentence = sentenceCase(fooBarPascal);
      expect(actual).toBe(fooBarSentence);
    });
    test('snake to Sentence', () => {
      const actual: typeof fooBarSentence = sentenceCase(fooBarSnake);
      expect(actual).toBe(fooBarSentence);
    });
    test('Sentence to Sentence', () => {
      const actual: typeof fooBarSentence = sentenceCase(fooBarSentence);
      expect(actual).toBe(fooBarSentence);
    });
    test('Title to Sentence', () => {
      const actual: typeof fooBarSentence = sentenceCase(fooBarTitle);
      expect(actual).toBe(fooBarSentence);
    });
  });
  describe('snake_case', () => {
    test('camel to snake', () => {
      const actual: typeof fooBarSnake = snakeCase(fooBarCamel);
      expect(actual).toBe(fooBarSnake);
    });
    test('kebab to snake', () => {
      const actual: typeof fooBarSnake = snakeCase(fooBarKebab);
      expect(actual).toBe(fooBarSnake);
    });
    test('Pascal to snake', () => {
      const actual: typeof fooBarSnake = snakeCase(fooBarPascal);
      expect(actual).toBe(fooBarSnake);
    });
    test('snake to snake', () => {
      const actual: typeof fooBarSnake = snakeCase(fooBarSnake);
      expect(actual).toBe(fooBarSnake);
    });
    test('Sentence to snake', () => {
      const actual: typeof fooBarSnake = snakeCase(fooBarSentence);
      expect(actual).toBe(fooBarSnake);
    });
    test('Title to snake', () => {
      const actual: typeof fooBarSnake = snakeCase(fooBarTitle);
      expect(actual).toBe(fooBarSnake);
    });
  });
  describe('Title Case', () => {
    test('camel to Title', () => {
      const actual: typeof fooBarTitle = titleCase(fooBarCamel);
      expect(actual).toBe(fooBarTitle);
    });
    test('kebab to Title', () => {
      const actual: typeof fooBarTitle = titleCase(fooBarKebab);
      expect(actual).toBe(fooBarTitle);
    });
    test('Pascal to Title', () => {
      const actual: typeof fooBarTitle = titleCase(fooBarPascal);
      expect(actual).toBe(fooBarTitle);
    });
    test('snake to Title', () => {
      const actual: typeof fooBarTitle = titleCase(fooBarSnake);
      expect(actual).toBe(fooBarTitle);
    });
    test('Sentence to Title', () => {
      const actual: typeof fooBarTitle = titleCase(fooBarSentence);
      expect(actual).toBe(fooBarTitle);
    });
    test('Title to Title', () => {
      const actual: typeof fooBarTitle = titleCase(fooBarTitle);
      expect(actual).toBe(fooBarTitle);
    });
  });

  test('accented letters', () => {
    const expected = 'associaçãoAtlética';
    const actual: typeof expected = camelCase('associação atlética');
    expect(actual).toBe(expected);
  });
});

test('Replace', () => {
  type T = 'banana';

  const a: Replace<T, 'b', ''> = 'anana';
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
