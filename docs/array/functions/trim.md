**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / trim

# Function: trim()

> **trim**\<`T`\>(`array`, `predicate`): `T`\[`number`\][]

Returns a copy of the array, where values for which the predicate
is false are removed from both ends.

Similar to filtering the array, except that the elements between
the first and last valid elements are not removed.

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

• **predicate**: (`value`, `index`, `arr`) => `boolean`

## Returns

`T`\[`number`\][]

## Source

[src/array/index.ts:402](https://github.com/umatch-oficial/utils/blob/6b2757d/src/array/index.ts#L402)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
