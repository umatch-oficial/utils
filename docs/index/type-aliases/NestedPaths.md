[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / NestedPaths

# Type Alias: NestedPaths\<T, Base, Prev\>

```ts
type NestedPaths<T, Base, Prev>: T extends Dictionary ? ValueOf<{ [K in keyof T]: T[K] extends Dictionary ? NestedPaths<T[K], Union<Base, Prev>, Join<Prev, K>> : Union<Base, Union<Prev, Join<Prev, K>>> }> : string;
```

Takes an object and returns a union of all the deep paths
to properties in it, using dot notation.

## Type Parameters

• **T**

• **Base** *extends* `PropertyKey` \| `undefined` = `undefined`

• **Prev** *extends* `PropertyKey` \| `undefined` = `undefined`

## Defined in

[src/index.ts:148](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L148)
