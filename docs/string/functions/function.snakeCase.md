[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > snakeCase

# Function: snakeCase()

> **snakeCase**\<`S`\>(`str`): [`CamelToSnakeCase`](../type-aliases/type-alias.CamelToSnakeCase.md)\< `S` \>

Converts a string to snake_case.

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

[`CamelToSnakeCase`](../type-aliases/type-alias.CamelToSnakeCase.md)\< `S` \>

## Source

[src/string/index.ts:641](https://github.com/umatch-oficial/utils/blob/a9008ad/src/string/index.ts#L641)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
