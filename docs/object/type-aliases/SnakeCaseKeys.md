[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / SnakeCaseKeys

# Type Alias: SnakeCaseKeys\<T\>

```ts
type SnakeCaseKeys<T>: { [K in keyof T as SnakeCase<K & string>]: T[K] };
```

Applies snake_case on the keys of an object.

## Type Parameters

• **T** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Defined in

[src/object/index.ts:424](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L424)
