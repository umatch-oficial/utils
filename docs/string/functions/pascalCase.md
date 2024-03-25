**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / pascalCase

# Function: pascalCase()

> **pascalCase**\<`S`\>(`str`): [`PascalCase`](../type-aliases/PascalCase.md)\<`S`\>

Converts a string to PascalCase.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

## Type parameters

• **S** extends `string`

## Parameters

• **str**: `S`

## Returns

[`PascalCase`](../type-aliases/PascalCase.md)\<`S`\>

## Source

[src/string/index.ts:682](https://github.com/umatch-oficial/utils/blob/7369e19/src/string/index.ts#L682)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
