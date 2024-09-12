[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / filter

# Function: filter()

```ts
function filter<T>(
   array, 
   callback, 
concurrency): Promise<T[number][]>
```

Same as Array.filter, but accepts async callbacks.

Uses bluebird.map to limit concurrency.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

• **callback**

• **concurrency**: `number` = `50`

## Returns

`Promise`\<`T`\[`number`\][]\>

## Defined in

[src/array/index.ts:83](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L83)
