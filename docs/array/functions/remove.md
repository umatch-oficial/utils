[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / remove

# Function: remove()

```ts
function remove<T, X>(array, item): { readonly [K in keyof T]: unknown } extends T ? Remove<T, X> : T
```

Removes an item from an array.

## Type Parameters

• **T** *extends* readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **X** *extends* [`Primitive`](../../index/type-aliases/Primitive.md)

## Parameters

• **array**: `T`

• **item**: `X`

## Returns

`{ readonly [K in keyof T]: unknown }` *extends* `T` ? [`Remove`](../type-aliases/Remove.md)\<`T`, `X`\> : `T`

## Defined in

[src/array/index.ts:310](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L310)
