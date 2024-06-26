**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / joinNonEmpty

# Function: joinNonEmpty()

> **joinNonEmpty**\<`T`, `Sep`\>(`array`, `separator`?): [`JoinNonEmpty`](../type-aliases/JoinNonEmpty.md)\<`T`, `Sep`\>

Joins an array of primitives, filtering out nulls, undefineds and empty strings.

## Type parameters

• **T** extends readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **Sep** extends `string` = `""`

## Parameters

• **array**: `undefined` \| `T`

• **separator?**: `Sep`

## Returns

[`JoinNonEmpty`](../type-aliases/JoinNonEmpty.md)\<`T`, `Sep`\>

## Source

[src/string/index.ts:336](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L336)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
