**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / filterWithComplement

# Function: filterWithComplement()

> **filterWithComplement**\<`T`, `P`\>(`array`, `predicate`): `T` extends readonly infer R[] ? `P` extends (`obj`) => `obj is infer A` ? [`A`[], `Exclude`\<`R`, `A`\>[]] : [`R`[], `R`[]] : `never`

Returns the filtered array and the complement as well (elements
removed by the filter).

## Type parameters

• **T** extends readonly `unknown`[]

• **P** extends (`x`) => `boolean`

## Parameters

• **array**: `T`

• **predicate**: `P`

## Returns

`T` extends readonly infer R[] ? `P` extends (`obj`) => `obj is infer A` ? [`A`[], `Exclude`\<`R`, `A`\>[]] : [`R`[], `R`[]] : `never`

## Source

[src/array/index.ts:119](https://github.com/umatch-oficial/utils/blob/4c813c4/src/array/index.ts#L119)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
