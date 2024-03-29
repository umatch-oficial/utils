// noinspection JSUnusedLocalSymbols
/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment */
import {
  apply,
  camelCaseKeys,
  deepClone,
  deepMap,
  extract,
  getDeepProperty,
  hasOwnProperty,
  isDeepEmpty,
  merge,
  omit,
  pick,
  rename,
  setDeepProperty,
  snakeCaseKeys,
  stringify,
  type SnakeCaseKeys,
  type CamelCaseKeys,
} from '../src/object';

describe.each([
  ['all keys', undefined, { a: false, b: true }],
  ['some keys', ['a'], { a: false, b: 2 }],
] as const)('apply()', (desc, keys, output) => {
  const obj = { a: 1, b: 2 };
  const func = (num: number) => num > 1;
  test(desc, () => {
    expect(apply(obj, func, keys)).toEqual(output);
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});

test('camelCaseKeys()', () => {
  expect(camelCaseKeys({ foo_bar: 1, bar_foo: 2 })).toEqual({ fooBar: 1, barFoo: 2 });
});

test('deepClone()', () => {
  const obj = { a: [{ b: { c: 1 } }], self: {} };
  obj.self = obj;

  const clone = deepClone(obj);
  expect(clone).toEqual(obj);
  expect(clone).not.toBe(obj);
  expect(clone.self).toEqual(clone);

  clone.a.push({ b: { c: 2 } });
  expect(obj.a).toEqual([{ b: { c: 1 } }]);
  expect(clone.a).toEqual([{ b: { c: 1 } }, { b: { c: 2 } }]);
});

test('deepMap()', () => {
  const obj = [[[1, 2, 3, 4, 5], 3, 4, 5, [1, 2, [3, 4, 5]]]];
  const output = [[[0, 0, 1, 1, 1], 1, 1, 1, [0, 0, [1, 1, 1]]]];
  expect(deepMap(obj, (num: number) => (num > 2 ? 1 : 0))).toEqual(output);
});

describe.each([
  [{ prefix: 'foo_' }, [{ a: 1, b: 2 }, { bar_a: 3 }]],
  [{ prefix: 'foo_', rename: false }, [{ foo_a: 1, foo_b: 2 }, { bar_a: 3 }]],
  [{ suffix: '_a' }, [{ foo: 1, bar: 3 }, { foo_b: 2 }]],
  [{ keys: ['foo_a', 'foo_b'] }, [{ foo_a: 1, foo_b: 2 }, { bar_a: 3 }]],
  [
    { keys: (key: string) => !!key.match('foo_') },
    [{ foo_a: 1, foo_b: 2 }, { bar_a: 3 }],
  ],
  [{ values: (value: number) => value > 1 }, [{ foo_b: 2, bar_a: 3 }, { foo_a: 1 }]],
])('extract()', (options, output) => {
  const obj = { foo_a: 1, foo_b: 2, bar_a: 3 };
  test(`extract({ foo_a: 1, foo_b: 2, bar_a: 3 }, ${stringify(options).replace(
    /\s+/g,
    ' ',
  )}) = ${JSON.stringify(output)}`, () => {
    expect(extract(obj, options)).toEqual(output);
    expect(obj).toEqual({ foo_a: 1, foo_b: 2, bar_a: 3 });
  });
});

describe.each([
  ['a', { b: [1, { c: 2 }] }],
  ['a.b', [1, { c: 2 }]],
  ['a.b[0]', 1],
  ['a.b[1]', { c: 2 }],
  ['a.b[1].c', 2],
])('getDeepProperty()', (path, output) => {
  const obj = { a: { b: [1, { c: 2 }] } };
  test(path, () => {
    expect(getDeepProperty(obj, path)).toEqual(output);
  });
});

test('hasOwnProperty()', () => {
  const obj1: number | unknown[] = 3;
  const obj2: number | unknown[] = [1, 2, 3];
  expect(hasOwnProperty(obj1, 'length')).toBeFalsy();
  if (hasOwnProperty(obj2, 'length')) {
    expect(obj2.length).toBe(3);
  }
});

test('isDeepEmpty()', () => {
  expect(isDeepEmpty({ a: {} })).toBeTruthy();
  expect(isDeepEmpty({ a: { b: 1 } })).toBeFalsy();
  expect(isDeepEmpty({ a: { b: [], c: '' } })).toBeTruthy();
});

describe.each([
  ['flat', { a: 1, b: [2, 3] }, { b: 2, c: 3 }, undefined, { a: 1, b: 2, c: 3 }],
  [
    'flat concat',
    { a: 1, b: [2, 3] },
    { b: [4], c: 3 },
    'concat',
    { a: 1, b: [2, 3, 4], c: 3 },
  ],
  [
    'deep',
    { a: 1, b: { a: 1 }, d: 5 },
    { b: { c: [2, 3, 4] } },
    undefined,
    { a: 1, b: { a: 1, c: [2, 3, 4] }, d: 5 },
  ],
  ['deep concat', { a: { b: [1] } }, { a: { b: [2] } }, 'concat', { a: { b: [1, 2] } }],
] as const)('merge()', (desc, a, b, strategy, output) => {
  test(desc, () => {
    expect(merge(a, b, strategy)).toEqual(output);
  });
});

test('merge() deep clones inputs', () => {
  const a = { a: { b: 1 } };
  const b = { a: { c: 2 } };
  const merged = merge(a, b);
  merged.a.b = 3;
  merged.a.c = 3;
  expect(a).toEqual({ a: { b: 1 } });
  expect(b).toEqual({ a: { c: 2 } });
});

test('merge() throws', () => {
  // @ts-expect-error
  expect(() => merge({ a: [2, 3] }, { a: 4 }, 'foo')).toThrow('Unexpected strategy');
});

test('omit()', () => {
  expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 });
});

test('pick()', () => {
  const obj = { a: 1, b: 2, c: 3 };
  expect(pick(obj, ['a', 'b'])).toEqual({ a: 1, b: 2 });
  expect(obj).toEqual({ a: 1, b: 2, c: 3 });
});

describe.each([
  ['dictionary', { a: 'd' }, { d: 1, b: 2, c: 3 }],
  ['function', (key: string) => `${key}_`, { a_: 1, b_: 2, c_: 3 }],
])('rename()', (path, mapper, output) => {
  const obj = { a: 1, b: 2, c: 3 };
  test(path, () => {
    expect(rename(obj, mapper)).toEqual(output);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe.each([
  ['overwrite first level key', 'a', 5, { a: 5 }],
  ['write first level key', 'b', 5, { a: { b: [1, { c: 2 }] }, b: 5 }],
  ['write deep key', 'b.a', 5, { a: { b: [1, { c: 2 }] }, b: { a: 5 } }],
  ['overwrite deep key', 'a.b', 5, { a: { b: 5 } }],
  ['overwrite element of array', 'a.b[1]', 5, { a: { b: [1, 5] } }],
])('setDeepProperty()', (desc, path, value, output) => {
  const obj = { a: { b: [1, { c: 2 }] } };
  test(desc, () => {
    expect(setDeepProperty(obj, path, value)).toEqual(output);
  });
});

test('snakeCaseKeys()', () => {
  expect(snakeCaseKeys({ fooBar: 1, barFoo: 2 })).toEqual({ foo_bar: 1, bar_foo: 2 });
});

describe('stringify()', () => {
  test('no indent', () =>
    expect(
      stringify({ flat: 1, deep: [{ array: [1, 2, 3] }, 'string'] }, { indentSize: 0 }),
    ).toBe('{ "flat": 1, "deep": [ { "array": [ 1, 2, 3 ] }, "string" ] }'));

  test('deep', () =>
    expect(stringify({ flat: 1, deep: [{ array: [1, 2, 3] }, 'string'] })).toBe(`{
  "flat": 1,
  "deep": [
    {
      "array": [ 1, 2, 3 ]
    },
    "string"
  ]
}`));

  test('padding', () =>
    expect(
      stringify(
        {
          apple: 'red',
          banana: 'yellow',
          grape: 'green',
        },
        { pad: true },
      ),
    ).toBe(`{
  "apple":     "red",
  "banana": "yellow",
  "grape":   "green"
}`));

  test('wrapping - no length (chopped)', () =>
    expect(
      stringify({
        array: ['multiline\nstring'],
      }),
    ).toBe(`{
  "array": [
    "multiline
string"
  ]
}`));

  test('wrapping - no length (wrapped)', () =>
    expect(
      stringify({
        array: [1, 2, 3],
      }),
    ).toBe(`{
  "array": [ 1, 2, 3 ]
}`));

  test('wrapping - chop', () =>
    expect(
      stringify(
        {
          array: [1, 2, 3],
          string: 'long string',
        },
        { wrap: 'chop' },
      ),
    ).toBe(`{
  "array": [
    1,
    2,
    3
  ],
  "string": "long string"
}`));

  test('wrapping - chop if long (long)', () =>
    expect(
      stringify(
        {
          array: [1, 2, 3],
          string: 'short',
        },
        { wrap: 'chop if long' },
      ),
    ).toBe(`{
  "array": [
    1,
    2,
    3
  ],
  "string": "short"
}`));

  test('wrapping - chop if long (short)', () =>
    expect(
      stringify(
        {
          array: [1, 2, 3],
          string: 'long string',
        },
        { wrap: 'chop if long' },
      ),
    ).toBe(`{
  "array": [ 1, 2, 3 ],
  "string": "long string"
}`));

  test('wrapping - wrap if long (long)', () =>
    expect(
      stringify(
        {
          array: [1, 2, 3, 4, 5, 6, 7, 8],
          string: 'short',
        },
        { wrap: 'wrap if long' },
      ),
    ).toBe(`{
  "array": [ 1, 2,
    3, 4, 5, 6, 7,
    8 ],
  "string": "short"
}`));

  test('wrapping - wrap if long (short)', () =>
    expect(
      stringify(
        {
          array: [1, 2, 3],
          string: 'long string',
        },
        { wrap: 'wrap if long' },
      ),
    ).toBe(`{
  "array": [ 1, 2, 3 ],
  "string": "long string"
}`));
});

test('SnakeCaseKeys', () => {
  type T = { fooBar: number };

  const a: SnakeCaseKeys<T> = { foo_bar: 1 };
});

test('CamelCaseKeys', () => {
  type T = { foo_bar: number };

  const a: CamelCaseKeys<T> = { fooBar: 1 };
});
