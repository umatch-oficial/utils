**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / sort

# Function: sort()

> **sort**\<`T`\>(`array`, `sortOrders`): `T`[]

Sorts an array based on the provided keys and sort orders.

The keys are compared in the order they are provided, and the first
one to return a non-zero value determines the order of the
elements. If the value of a key is not a primitive, a transform
function must be provided.

## Type parameters

• **T**

## Parameters

• **array**: `T`[]

The array to be sorted.

• **sortOrders**: `{ [K in string | number | symbol]-?: [K, "asc" | "desc", Function?] }`\[keyof `T`\][]

An array of keys, the order for each key, and an
optional transform function.

## Returns

`T`[]

The sorted array.

## Source

[src/array/index.ts:364](https://github.com/umatch-oficial/utils/blob/ed8915b/src/array/index.ts#L364)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
