[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / uniques

# Function: uniques()

```ts
function uniques<T>(array): { readonly [K in keyof T]: unknown } extends T ? Uniques<T> : T
```

Returns a copy of an array without duplicates.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

## Returns

`{ readonly [K in keyof T]: unknown }` *extends* `T` ? [`Uniques`](../type-aliases/Uniques.md)\<`T`\> : `T`

## Defined in

[src/array/index.ts:425](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L425)
