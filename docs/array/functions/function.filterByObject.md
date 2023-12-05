[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > filterByObject

# Function: filterByObject()

> **filterByObject**\<`O`, `T`\>(`array`, `template`): `O` & `T`[]

Filters an array of objects, ensuring they contain all key:value
pairs in the template.

## Type parameters

| Parameter                                                                       |
| :------------------------------------------------------------------------------ |
| `O` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) |
| `T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) |

## Parameters

| Parameter  | Type             |
| :--------- | :--------------- |
| `array`    | _readonly_ `O`[] |
| `template` | `T`              |

## Returns

`O` & `T`[]

## Source

[src/array/index.ts:101](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/array/index.ts#L101)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
