export type Primitive = string | number | boolean;
export type Dictionary<T = unknown> = { [_: string]: T };
export type Payload<T = Primitive> = Dictionary<T>;
export type OneOrArray<T = unknown> = T | T[];
export type DeepNode<T = unknown> = T | DeepArray<T> | DeepObject<T>;
export type DeepArray<T = unknown> = DeepNode<T>[];
export type DeepObject<T = unknown> = { [_: string]: DeepNode<T> };
export type ValueOf<T> = T[keyof T];
export type Exact<T> = {
  [K in keyof T]: T[K] extends infer P | undefined ? P : T[K];
};
export type Flatten<Y extends unknown[], Acc extends unknown[] = []> = Y extends [
  (infer H)[],
  ...infer T,
]
  ? Flatten<T, [...Acc, H]>
  : Acc;
// changes the type of value to B for keys in A
export type TransformValuesByKey<T, A extends keyof T, B> = {
  [K in keyof T]: K extends A ? (T[K] extends undefined ? B | undefined : B) : T[K];
};
// changes the type of values matching A to B
export type TransformValues<T, A, B> = {
  [K in keyof T]: T[K] extends A ? B : T[K] extends A | undefined ? B | undefined : T[K];
};
// changes the type of values matching A to A | B
export type ExtendValues<T, A, B> = TransformValues<T, A, A | B>;

// https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d
export type Brand<T, B extends string> = T & { __brand: B };

// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

// https://javascript.plainenglish.io/advanced-typescript-type-level-nested-object-paths-7f3d8901f29a
export type Join<
  L extends PropertyKey | undefined = undefined,
  R extends PropertyKey | undefined = undefined,
  Sep extends string = ".",
> = L extends string | number
  ? R extends string | number
    ? `${L}${Sep}${R}`
    : L
  : R extends string | number
  ? R
  : undefined;
export type Union<
  L extends unknown | undefined,
  R extends unknown | undefined,
> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;
/**
 * Takes an object and returns a union of all the deep paths
 * to properties in it, using dot notation.
 */
export type NestedPaths<
  O extends Dictionary | unknown,
  Base extends PropertyKey | undefined = undefined,
  Prev extends PropertyKey | undefined = undefined,
> = O extends Dictionary
  ? ValueOf<{
      [K in keyof O]: O[K] extends Dictionary
        ? NestedPaths<O[K], Union<Base, Prev>, Join<Prev, K>>
        : Union<Base, Union<Prev, Join<Prev, K>>>;
    }>
  : unknown;
/**
 * Takes an object and a path string that uses dot notation
 * and returns the type of the deep property at the path.
 */
export type TypeFromPath<
  O extends Dictionary | unknown,
  P extends string | unknown,
> = P extends string
  ? O extends Dictionary
    ? P extends keyof O
      ? O[P]
      : P extends `${infer H}.${infer T}`
      ? H extends keyof O
        ? TypeFromPath<O[H], T>
        : never
      : never
    : never
  : unknown;

// https://medium.hexlabs.io/building-complex-types-in-typescript-804c973ce66f
export type TupleToUnion<T> = T extends any[] ? T[number] : T;
export type UnionToIntersection<T> = (
  T extends never ? never : (arg: T) => void
) extends (arg: infer I) => void
  ? I
  : never;
export type UnionToTuple<T, Acc extends unknown[] = []> = UnionToIntersection<
  T extends never ? never : (arg: T) => T
> extends (_: never) => infer W
  ? UnionToTuple<Exclude<T, W>, [W, ...Acc]>
  : Acc;

export type SnakeToCamelCase<
  S extends string,
  Acc extends string = "",
> = S extends `${infer H}_${infer T}`
  ? SnakeToCamelCase<Capitalize<T>, Join<Acc, H, "">>
  : S extends `${infer H}${infer T}`
  ? SnakeToCamelCase<T, Join<Acc, H, "">>
  : Acc;
/*
Iterates one letter at a time, keeping the result in an accumulator and consecutive
uppercase letters in a buffer.

The loop goes as follows:
Is the current letter uppercase?
  - No: add letter to the accumulator.
  - Yes: add the letter to the buffer. Is there another letter afterwards?
    - No: is there anything in the buffer?
      - Yes: add buffer and letter to the accumulator. Reset buffer.
      - No: add letter to the accumulator.
    - Yes: is it uppercase too?
      - Yes: continue.
      - No: is there anything in the buffer?
        - Yes: add buffer and letter to the accumulator. Reset buffer.
        - No: add letter to the accumulator.
 */
export type CamelToSnakeCase<
  S extends string,
  Acc extends string | undefined = undefined,
  Buffer extends string | undefined = undefined,
> = S extends `${infer H}${infer T}`
  ? CamelToSnakeCase<
      T,
      H extends Uppercase<H>
        ? T extends `${infer H2}${infer _}`
          ? H2 extends Lowercase<H2>
            ? Buffer extends string
              ? Join<Acc, Join<Lowercase<Buffer>, Lowercase<H>, "_">, "">
              : Join<Acc, Lowercase<H>, "_">
            : undefined
          : Buffer extends string
          ? Join<Acc, Join<Lowercase<Buffer>, Lowercase<H>, "_">, "">
          : Join<Acc, Lowercase<H>, "_">
        : Join<Acc, H, "">,
      H extends Uppercase<H> ? Join<Buffer, H, ""> : undefined
    >
  : Acc & string;
export type SnakeToCamelCaseKeys<T extends Dictionary> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};
export type CamelToSnakeCaseKeys<T extends Dictionary> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};
