**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / remove

# Function: remove()

> **remove**\<`T`, `X`\>(`array`, `item`): `{ readonly [K in keyof T]: unknown }` extends `T` ? `Remove`\<`T`, `X`\> : `T`

Removes an item from an array.

## Type parameters

• **T** extends readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **X** extends [`Primitive`](../../index/type-aliases/Primitive.md)

## Parameters

• **array**: `T`

• **item**: `X`

## Returns

`{ readonly [K in keyof T]: unknown }` extends `T` ? `Remove`\<`T`, `X`\> : `T`

## Source

[src/array/index.ts:313](https://github.com/umatch-oficial/utils/blob/6e00801/src/array/index.ts#L313)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
