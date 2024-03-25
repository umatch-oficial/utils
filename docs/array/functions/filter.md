**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / filter

# Function: filter()

> **filter**\<`T`\>(`array`, `callback`, `concurrency`): `Promise`\<`T`\[`number`\][]\>

Same as Array.filter, but accepts async callbacks.

Uses bluebird.map to limit concurrency.

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

• **callback**: (`x`) => `Promise`\<`boolean`\>

• **concurrency**: `number`= `50`

## Returns

`Promise`\<`T`\[`number`\][]\>

## Source

[src/array/index.ts:83](https://github.com/umatch-oficial/utils/blob/0b3210d/src/array/index.ts#L83)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
