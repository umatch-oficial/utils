**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / uniques

# Function: uniques()

> **uniques**\<`T`\>(`array`): `{ readonly [K in keyof T]: unknown }` extends `T` ? [`Uniques`](../type-aliases/Uniques.md)\<`T`\> : `T`

Returns a copy of an array without duplicates.

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

## Returns

`{ readonly [K in keyof T]: unknown }` extends `T` ? [`Uniques`](../type-aliases/Uniques.md)\<`T`\> : `T`

## Source

[src/array/index.ts:425](https://github.com/umatch-oficial/utils/blob/4c813c4/src/array/index.ts#L425)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
