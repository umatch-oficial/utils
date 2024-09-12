[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / zip

# Function: zip()

```ts
function zip<T>(...arrays): Zip<T>
```

Zips arrays. (equivalent of python's zip)

## Type Parameters

• **T** *extends* readonly readonly `unknown`[][]

## Parameters

• ...**arrays**: `T`

## Returns

[`Zip`](../type-aliases/Zip.md)\<`T`\>

## Throws

if the arrays don't have the same length.

## Defined in

[src/array/index.ts:449](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L449)
