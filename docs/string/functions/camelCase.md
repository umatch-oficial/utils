**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / camelCase

# Function: camelCase()

> **camelCase**\<`S`\>(`str`): [`CamelCase`](../type-aliases/CamelCase.md)\<`S`\>

Converts a string to camelCase.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

## Type parameters

• **S** extends `string`

## Parameters

• **str**: `S`

## Returns

[`CamelCase`](../type-aliases/CamelCase.md)\<`S`\>

## Source

[src/string/index.ts:692](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L692)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
