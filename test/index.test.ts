// noinspection JSUnusedLocalSymbols
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isKeyOf,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPlainObject,
  isPrimitive,
  isString,
  type Brand,
  type CamelToSnakeCase,
  type CamelToSnakeCaseKeys,
  type DeepValueOf,
  type Equals,
  type ExtendValues,
  type Flatten,
  type IsReadonly,
  type Join,
  type Merge,
  type NestedPaths,
  type OneOrArray,
  type Payload,
  type PickByType,
  type SnakeToCamelCase,
  type SnakeToCamelCaseKeys,
  type Subtract,
  type TransformValues,
  type TransformValuesByKey,
  type TupleToUnion,
  type TypeFromPath,
  type Union,
} from '../src';

test('isArray()', () => {
  expect(isArray([])).toBe(true);
  expect(isArray([1, 2, 3])).toBe(true);
  expect(isArray({})).toBe(false);
  expect(isArray('')).toBe(false);
  expect(isArray(1)).toBe(false);
  expect(isArray(true)).toBe(false);
  expect(isArray(new Date())).toBe(false);
  expect(isArray(() => {})).toBe(false);
  expect(isArray(null)).toBe(false);
  expect(isArray(undefined)).toBe(false);
});

test('isBoolean()', () => {
  expect(isBoolean([])).toBe(false);
  expect(isBoolean([1, 2, 3])).toBe(false);
  expect(isBoolean({})).toBe(false);
  expect(isBoolean('')).toBe(false);
  expect(isBoolean(1)).toBe(false);
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(new Date())).toBe(false);
  expect(isBoolean(() => {})).toBe(false);
  expect(isBoolean(null)).toBe(false);
  expect(isBoolean(undefined)).toBe(false);
});

test('isDate()', () => {
  expect(isDate([])).toBe(false);
  expect(isDate([1, 2, 3])).toBe(false);
  expect(isDate({})).toBe(false);
  expect(isDate('')).toBe(false);
  expect(isDate(1)).toBe(false);
  expect(isDate(true)).toBe(false);
  expect(isDate(new Date())).toBe(true);
  expect(isDate(() => {})).toBe(false);
  expect(isDate(null)).toBe(false);
  expect(isDate(undefined)).toBe(false);
});

test('isFunction()', () => {
  expect(isFunction([])).toBe(false);
  expect(isFunction([1, 2, 3])).toBe(false);
  expect(isFunction({})).toBe(false);
  expect(isFunction('')).toBe(false);
  expect(isFunction(1)).toBe(false);
  expect(isFunction(true)).toBe(false);
  expect(isFunction(new Date())).toBe(false);
  expect(isFunction(() => {})).toBe(true);
  expect(isFunction(null)).toBe(false);
  expect(isFunction(undefined)).toBe(false);
});

test('isPlainObject()', () => {
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject([1, 2, 3])).toBe(false);
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject('')).toBe(false);
  expect(isPlainObject(1)).toBe(false);
  expect(isPlainObject(true)).toBe(false);
  expect(isPlainObject(new Date())).toBe(false);
  expect(isPlainObject(() => {})).toBe(false);
  expect(isPlainObject(null)).toBe(false);
  expect(isPlainObject(undefined)).toBe(false);
});

test('isNullOrUndefined()', () => {
  expect(isNullOrUndefined([])).toBe(false);
  expect(isNullOrUndefined([1, 2, 3])).toBe(false);
  expect(isNullOrUndefined({})).toBe(false);
  expect(isNullOrUndefined('')).toBe(false);
  expect(isNullOrUndefined(1)).toBe(false);
  expect(isNullOrUndefined(true)).toBe(false);
  expect(isNullOrUndefined(new Date())).toBe(false);
  expect(isNullOrUndefined(() => {})).toBe(false);
  expect(isNullOrUndefined(null)).toBe(true);
  expect(isNullOrUndefined(undefined)).toBe(true);
});

test('isNumber()', () => {
  expect(isNumber([])).toBe(false);
  expect(isNumber([1, 2, 3])).toBe(false);
  expect(isNumber({})).toBe(false);
  expect(isNumber('')).toBe(false);
  expect(isNumber(1)).toBe(true);
  expect(isNumber(true)).toBe(false);
  expect(isNumber(new Date())).toBe(false);
  expect(isNumber(() => {})).toBe(false);
  expect(isNumber(null)).toBe(false);
  expect(isNumber(undefined)).toBe(false);
});

test('isObject()', () => {
  expect(isObject([])).toBe(false);
  expect(isObject([1, 2, 3])).toBe(false);
  expect(isObject({})).toBe(true);
  expect(isObject('')).toBe(false);
  expect(isObject(1)).toBe(false);
  expect(isObject(true)).toBe(false);
  expect(isObject(new Date())).toBe(false);
  expect(isObject(() => {})).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject(undefined)).toBe(false);
});

test('isPrimitive()', () => {
  expect(isPrimitive([])).toBe(false);
  expect(isPrimitive([1, 2, 3])).toBe(false);
  expect(isPrimitive({})).toBe(false);
  expect(isPrimitive('')).toBe(true);
  expect(isPrimitive(1)).toBe(true);
  expect(isPrimitive(true)).toBe(true);
  expect(isPrimitive(new Date())).toBe(false);
  expect(isPrimitive(() => {})).toBe(false);
  expect(isPrimitive(null)).toBe(true);
  expect(isPrimitive(undefined)).toBe(true);
});

test('isString()', () => {
  expect(isString([])).toBe(false);
  expect(isString([1, 2, 3])).toBe(false);
  expect(isString({})).toBe(false);
  expect(isString('')).toBe(true);
  expect(isString(1)).toBe(false);
  expect(isString(true)).toBe(false);
  expect(isString(new Date())).toBe(false);
  expect(isString(() => {})).toBe(false);
  expect(isString(null)).toBe(false);
  expect(isString(undefined)).toBe(false);
});

test('isKeyOf()', () => {
  const obj = { a: 1 };
  const key: string = 'a';
  // @ts-expect-error
  const _ = obj[key];
  if (isKeyOf(obj, key)) {
    const a = obj[key];
    expect(a).toBe(1);
  }
});

test('Brand', () => {
  type T = { a: number };
  type Test = Brand<T, 'a'>;

  const a: Test = { a: 1, __brand: 'a' };
});

test('CamelToSnakeCase', () => {
  type T = 'fooBar';

  const a: CamelToSnakeCase<T> = 'foo_bar';
});

test('CamelToSnakeCaseKeys', () => {
  type T = { fooBar: number };

  const a: CamelToSnakeCaseKeys<T> = { foo_bar: 1 };
});

test('DeepValueOf', () => {
  type T = { foo: { bar: number }; baz: string };

  const a: DeepValueOf<T> = '';
  const b: DeepValueOf<T> = 1;
});

test('Equals', () => {
  const a: Equals<1, 1> = true;
  const b: Equals<1, 2> = false;
  const c: Equals<{ a: 1 }, { a: 1 }> = true;
  const d: Equals<{ a: 1 }, { a: 2 }> = false;
});

test('ExtendValues', () => {
  type T = { a: number };
  type Test = ExtendValues<T, number, boolean>;

  const a: Test = { a: 1 };
  const b: Test = { a: true };
});

test('Flatten', () => {
  type T = readonly [1, readonly [2], 3];

  const a: Flatten<T> = [1, 2, 3] as const;
});

test('IsReadonly', () => {
  type A = readonly [1, 2, 3];
  type B = [1, 2, 3];

  const a: IsReadonly<A> = true;
  const b: IsReadonly<B> = false;
});

test('Join', () => {
  const a: Join<'foo', undefined> = 'foo';
  const b: Join<'foo', 'bar'> = 'foo.bar';
  const c: Join<undefined, 'bar'> = 'bar';
  const d: Join<'foo', 'bar', '_'> = 'foo_bar';
});

test('Merge', () => {
  type A = { a: 1; b: { c: 2; d: 3 } };
  type B = { b: { c: 4; e: 5 } };

  const a: Merge<A, B> = { a: 1, b: { c: 4, d: 3, e: 5 } };
});

test('NestedPaths', () => {
  type T = { a: 1; b: { c: { d: 2; e: 3 }; f: 4 } };

  const a: NestedPaths<T> = 'b.c.d';
  const b: NestedPaths<T> = 'b.f';
});

test('OneOrArray', () => {
  type T = string;

  const a: OneOrArray<T> = 'a';
  const b: OneOrArray<T> = ['a', 'b'];
});

test('Payload', () => {
  const a: Payload = { a: 1, b: '1', c: true };
  // @ts-expect-error
  const b: Payload = { a: 1, b: '1', c: true, d: new Date() };
});

test('PickByType', () => {
  type A = { a: boolean; b: number; c: string; d: number };

  const a: PickByType<A, number> = { b: 1, d: 2 };
  // @ts-expect-error
  const b: PickByType<A, boolean> = { a: 1 };
});

test('SnakeToCamelCase', () => {
  type T = 'foo_bar';

  const a: SnakeToCamelCase<T> = 'fooBar';
});

test('SnakeToCamelCaseKeys', () => {
  type T = { foo_bar: number };

  const a: SnakeToCamelCaseKeys<T> = { fooBar: 1 };
});

test('Subtract', () => {
  type A = readonly [1, 2, 3];
  type B = readonly [3, 2];

  const a: Subtract<A, B> = [1] as const;
});

test('TransformValues', () => {
  type T = { a: number; b: string };
  type Test = TransformValues<T, number, boolean>;

  const a: Test = { a: true, b: '' };
  const b: Test = {
    // @ts-expect-error
    a: 1,
    b: '',
  };
});

test('TransformValuesByKey', () => {
  type T = { a: number; b: string };
  type Test = TransformValuesByKey<T, 'a', boolean>;

  const a: Test = { a: true, b: '' };
  const b: Test = {
    // @ts-expect-error
    a: 1,
    b: '',
  };
});

test('TupleToUnion', () => {
  type T = [1, 2, 3];

  const a: TupleToUnion<T> = 1;
  const b: TupleToUnion<T> = 2;
  const c: TupleToUnion<T> = 3;
});

test('TypeFromPath', () => {
  type T = { a: 1; b: { c: { d: 2; e: 3 }; f: 4 } };

  const a: TypeFromPath<T, 'b.c.d'> = 2;
  const b: TypeFromPath<T, 'b'> = { c: { d: 2, e: 3 }, f: 4 };
});

test('Union', () => {
  const a: Union<'foo', undefined> = 'foo';
  // @ts-expect-error
  const b: Union<'foo', undefined> = undefined;

  const c: Union<undefined, 'bar'> = 'bar';
  // @ts-expect-error
  const d: Union<undefined, 'bar'> = undefined;
});
