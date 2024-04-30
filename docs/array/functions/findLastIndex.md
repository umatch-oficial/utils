**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / findLastIndex

# Function: findLastIndex()

> **findLastIndex**\<`T`\>(`array`, `predicate`): `number`

Same as Array.prototype.findIndex, but starting from the end.

Array.prototype.findLastIndex is already available in some runtimes,
but not in Node.

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

• **predicate**: (`value`, `index`, `arr`) => `boolean`

## Returns

`number`

## Source

[src/array/index.ts:145](https://github.com/umatch-oficial/utils/blob/ed8915b/src/array/index.ts#L145)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
