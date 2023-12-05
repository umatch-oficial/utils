[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > camelCase

# Function: camelCase()

> **camelCase**\<`S`\>(`str`): [`SnakeToCamelCase`](../type-aliases/type-alias.SnakeToCamelCase.md)\< `S` \>

Converts a string to camelCase.

_Warning_: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

## Type parameters

| Parameter              |
| :--------------------- |
| `S` _extends_ `string` |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `str`     | `S`  |

## Returns

[`SnakeToCamelCase`](../type-aliases/type-alias.SnakeToCamelCase.md)\< `S` \>

## Source

[src/string/index.ts:589](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/string/index.ts#L589)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
