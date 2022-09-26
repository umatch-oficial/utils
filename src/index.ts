export type Primitive = string | number | boolean;
export type Dictionary<T = any> = { [_: string]: T };
export type Payload = Dictionary<Primitive>;
export type DeepNode<T = any> = T | DeepArray<T> | DeepObject<T>;
export type DeepArray<T = any> = Array<DeepNode<T>>;
export type DeepObject<T = any> = { [_: string]: DeepNode<T> };
export type ValueOf<T> = T[keyof T];
export type Exact<T> = {
  [K in keyof T]: T[K] extends infer P | undefined ? P : T[K];
};
export type Flatten<Y extends unknown[], Acc extends unknown[] = []> = Y extends [
  (infer H)[],
  ...infer T
]
  ? Flatten<T, [...Acc, H]>
  : Acc;

export type SnakeToCamelCase<S extends string> = S extends `${infer H}_${infer T}`
  ? `${H}${Capitalize<SnakeToCamelCase<T>>}`
  : S;
export type CamelToSnakeCase<S extends string> = S extends `${infer H}${infer T}`
  ? `${H extends Capitalize<H> ? "_" : ""}${Lowercase<H>}${CamelToSnakeCase<T>}`
  : Lowercase<S>;
export type SnakeToCamelCaseKeys<T extends Dictionary<string>> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};
export type CamelToSnakeCaseKeys<T extends Dictionary<string>> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};

export type Join<
  L extends PropertyKey | undefined = undefined,
  R extends PropertyKey | undefined = undefined
> = L extends string | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
  ? R
  : undefined;
export type Union<
  L extends unknown | undefined,
  R extends unknown | undefined
> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R;
export type NestedPaths<
  O,
  Base extends PropertyKey | undefined = undefined,
  Prev extends PropertyKey | undefined = undefined
> = ValueOf<{
  [K in keyof O]: O[K] extends Dictionary
    ? NestedPaths<O[K], Union<Base, Prev>, Join<Prev, K>>
    : Union<Base, Union<Prev, Join<Prev, K>>>;
}>;
export type TypeFromPath<O extends Dictionary, P extends string> = P extends keyof O
  ? O[P]
  : P extends `${infer H}.${infer T}`
  ? H extends keyof O
    ? TypeFromPath<O[H], T>
    : never
  : never;

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
