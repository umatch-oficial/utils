[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / TupleToUnion

# Type Alias: TupleToUnion\<T\>

```ts
type TupleToUnion<T>: T extends unknown[] ? T[number] : T;
```

Returns a union of the types in the tuple.

## Type Parameters

• **T**

## Defined in

[src/index.ts:172](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L172)
