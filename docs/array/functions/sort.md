[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / sort

# Function: sort()

```ts
function sort<T>(array, sortOrders): T[]
```

Sorts an array based on the provided keys and sort orders.

The keys are compared in the order they are provided, and the first
one to return a non-zero value determines the order of the
elements. If the value of a key is not a primitive, a transform
function must be provided.

## Type Parameters

• **T**

## Parameters

• **array**: `T`[]

The array to be sorted.

• **sortOrders**: \{ \[K in string \| number \| symbol\]-?: \[K, "asc" \| "desc", Function?\] \}\[keyof `T`\][]

An array of keys, the order for each key, and an
optional transform function.

## Returns

`T`[]

The sorted array.

## Defined in

[src/array/index.ts:364](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L364)
