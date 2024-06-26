**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / remove

# Function: remove()

> **remove**\<`T`, `X`\>(`array`, `item`): `{ readonly [K in keyof T]: unknown }` extends `T` ? [`Remove`](../type-aliases/Remove.md)\<`T`, `X`\> : `T`

Removes an item from an array.

## Type parameters

• **T** extends readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **X** extends [`Primitive`](../../index/type-aliases/Primitive.md)

## Parameters

• **array**: `T`

• **item**: `X`

## Returns

`{ readonly [K in keyof T]: unknown }` extends `T` ? [`Remove`](../type-aliases/Remove.md)\<`T`, `X`\> : `T`

## Source

[src/array/index.ts:310](https://github.com/umatch-oficial/utils/blob/6b2757d/src/array/index.ts#L310)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
