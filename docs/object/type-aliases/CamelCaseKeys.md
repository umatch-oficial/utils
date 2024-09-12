[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / CamelCaseKeys

# Type Alias: CamelCaseKeys\<T\>

```ts
type CamelCaseKeys<T>: { [K in keyof T as CamelCase<K & string>]: T[K] };
```

Applies camelCase on the keys of an object.

## Type Parameters

• **T** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Defined in

[src/object/index.ts:44](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L44)
