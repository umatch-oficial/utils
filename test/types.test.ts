// noinspection JSUnusedLocalSymbols
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Brand,
  Equals,
  Exact,
  ExtendValues,
  NestedPaths,
  OneOrArray,
  Payload,
  TransformValuesByKey,
  TupleToUnion,
  TypeFromPath,
} from "../src";

test("Brand", () => {
  type T = { a: number };
  type Test = Brand<T, "a">;

  const a: Test = { a: 1, __brand: "a" };
});

test("Equals", () => {
  const a: Equals<1, 1> = true;
  const b: Equals<1, 2> = false;
  const c: Equals<{ a: 1 }, { a: 1 }> = true;
  const d: Equals<{ a: 1 }, { a: 2 }> = false;
});

test("Exact", () => {
  type T = { a: number };
  type Test = Exact<T>;

  const a: Test = { a: 1 };
  // @ts-expect-error
  const b: Test = { a: 1, b: "1" };
});

test("ExtendValues", () => {
  type T = { a: number };
  type Test = ExtendValues<T, number, boolean>;

  const a: Test = { a: 1 };
  const b: Test = { a: true };
});

test("NestedPaths", () => {
  type T = { a: 1; b: { c: { d: 2; e: 3 }; f: 4 } };

  const a: NestedPaths<T> = "b.c.d";
  const b: NestedPaths<T> = "b.f";
});

test("OneOrArray", () => {
  type T = string;

  const a: OneOrArray<T> = "a";
  const b: OneOrArray<T> = ["a", "b"];
});

test("TransformValuesByKey", () => {
  type T = { a: number };
  type Test = TransformValuesByKey<T, "a", boolean>;

  const a: Test = { a: true };
  // @ts-expect-error
  const b: Test = { a: 1 };
});

test("Payload", () => {
  const a: Payload = { a: 1, b: "1", c: true };
  // @ts-expect-error
  const b: Payload = { a: 1, b: "1", c: true, d: new Date() };
});

test("TupleToUnion", () => {
  type T = [1, 2, 3];

  const a: TupleToUnion<T> = 1;
  const b: TupleToUnion<T> = 2;
  const c: TupleToUnion<T> = 3;
});

test("TypeFromPath", () => {
  type T = { a: 1; b: { c: { d: 2; e: 3 }; f: 4 } };

  const a: TypeFromPath<T, "b.c.d"> = 2;
  const b: TypeFromPath<T, "b"> = { c: { d: 2, e: 3 }, f: 4 };
});
