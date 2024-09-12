[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / TransformValues

# Type Alias: TransformValues\<T, A, B\>

```ts
type TransformValues<T, A, B>: { [K in keyof T]: A extends T[K] ? B | Exclude<T[K], A> : T[K] };
```

Changes the type of values matching A to B

## Type Parameters

• **T**

• **A**

• **B**

## Defined in

[src/index.ts:56](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L56)
