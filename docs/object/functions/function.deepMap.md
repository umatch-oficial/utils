[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > deepMap

# Function: deepMap()

> **deepMap**\<`Value`, `T`\>(`x`, `f`): `T`

Maps the function over deeply nested elements of the object,
which are not arrays.

## Type parameters

| Parameter                                                                                  |
| :----------------------------------------------------------------------------------------- |
| `Value`                                                                                    |
| `T` _extends_ [`DeepArray`](../../index/type-aliases/type-alias.DeepArray.md)\< `Value` \> |

## Parameters

| Parameter | Type                   |
| :-------- | :--------------------- |
| `x`       | `T`                    |
| `f`       | (`value`) => `unknown` |

## Returns

`T`

## Source

[src/object/index.ts:87](https://github.com/umatch-oficial/utils/blob/a4be831/src/object/index.ts#L87)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
