**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / snakeCase

# Function: snakeCase()

> **snakeCase**\<`S`\>(`str`): [`SnakeCase`](../type-aliases/SnakeCase.md)\<`S`\>

Converts a string to snake_case.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

## Type parameters

• **S** extends `string`

## Parameters

• **str**: `S`

## Returns

[`SnakeCase`](../type-aliases/SnakeCase.md)\<`S`\>

## Source

[src/string/index.ts:702](https://github.com/umatch-oficial/utils/blob/7369e19/src/string/index.ts#L702)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
