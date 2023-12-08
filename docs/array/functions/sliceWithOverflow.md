**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / sliceWithOverflow

# Function: sliceWithOverflow()

> **sliceWithOverflow**\<`T`\>(`array`, `start`, `end`): `T` extends readonly infer \_[] ? `T` : `never`

Same as slice, but overflows to guarantee there are (end - start) elements.

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

• **start**: `number`

• **end**: `number`

## Returns

`T` extends readonly infer \_[] ? `T` : `never`

## Source

[src/array/index.ts:342](https://github.com/umatch-oficial/utils/blob/c1935bc/src/array/index.ts#L342)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
