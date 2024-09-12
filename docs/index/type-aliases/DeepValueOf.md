[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / DeepValueOf

# Type Alias: DeepValueOf\<T\>

```ts
type DeepValueOf<T>: T extends {} ? DeepValueOf<T[keyof T]> : T;
```

Returns a union of the values of a deeply nested object.

## Type Parameters

• **T**

## Defined in

[src/index.ts:33](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L33)
