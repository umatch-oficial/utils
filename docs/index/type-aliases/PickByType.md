[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / PickByType

# Type Alias: PickByType\<T, U\>

```ts
type PickByType<T, U>: { [K in keyof T as T[K] extends U | undefined ? K : never]: T[K] };
```

From T, picks properties whose values are of type U.

## Type Parameters

• **T**

• **U**

## Defined in

[src/index.ts:67](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L67)
