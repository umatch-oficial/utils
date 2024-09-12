[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / KeysByType

# Type Alias: KeysByType\<T, U\>

```ts
type KeysByType<T, U>: { [K in keyof T]: U extends T[K] ? K : never }[keyof T];
```

From T, picks keys whose values are of type U.

## Type Parameters

• **T**

• **U**

## Defined in

[src/index.ts:73](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L73)
