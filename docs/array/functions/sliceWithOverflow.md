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

[src/array/index.ts:339](https://github.com/umatch-oficial/utils/blob/ed8915b/src/array/index.ts#L339)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
