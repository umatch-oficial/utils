[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / subtract

# Function: subtract()

```ts
function subtract<X, Y>(a, b): IsReadonly<X> extends true ? IsReadonly<Y> extends true ? Subtract<X, Y> : Y : X
```

Returns a copy of the first array, without including elements
present in the second array.

## Type Parameters

• **X** *extends* readonly (`string` \| `number`)[]

• **Y** *extends* readonly (`string` \| `number`)[]

## Parameters

• **a**: `X`

• **b**: `Y`

## Returns

[`IsReadonly`](../../index/type-aliases/IsReadonly.md)\<`X`\> *extends* `true` ? [`IsReadonly`](../../index/type-aliases/IsReadonly.md)\<`Y`\> *extends* `true` ? [`Subtract`](../../index/type-aliases/Subtract.md)\<`X`, `Y`\> : `Y` : `X`

## Defined in

[src/array/index.ts:76](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L76)
