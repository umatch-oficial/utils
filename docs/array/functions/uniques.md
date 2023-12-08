**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / uniques

# Function: uniques()

> **uniques**\<`T`\>(`array`): `{ readonly [K in keyof T]: unknown }` extends `T` ? `Uniques`\<`T`\> : `T`

Returns a copy of an array without duplicates.

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

## Returns

`{ readonly [K in keyof T]: unknown }` extends `T` ? `Uniques`\<`T`\> : `T`

## Source

[src/array/index.ts:391](https://github.com/umatch-oficial/utils/blob/1c5b195/src/array/index.ts#L391)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
