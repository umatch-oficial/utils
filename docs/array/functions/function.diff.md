[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > diff

# Function: diff()

> **diff**\<`X`, `Y`\>(`a`, `b`): [`IsReadonly`](../../index/type-aliases/type-alias.IsReadonly.md)\< `X` \> _extends_ `true` ? [`IsReadonly`](../../index/type-aliases/type-alias.IsReadonly.md)\< `Y` \> _extends_ `true` ? [`Subtract`](../../index/type-aliases/type-alias.Subtract.md)\< `X`, `Y` \> : `Y` : `X`

Returns a copy of the first array, without including elements
present in the second array.

## Type parameters

| Parameter                                         |
| :------------------------------------------------ |
| `X` _extends_ _readonly_ (`string` \| `number`)[] |
| `Y` _extends_ _readonly_ (`string` \| `number`)[] |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `a`       | `X`  |
| `b`       | `Y`  |

## Returns

[`IsReadonly`](../../index/type-aliases/type-alias.IsReadonly.md)\< `X` \> _extends_ `true` ? [`IsReadonly`](../../index/type-aliases/type-alias.IsReadonly.md)\< `Y` \> _extends_ `true` ? [`Subtract`](../../index/type-aliases/type-alias.Subtract.md)\< `X`, `Y` \> : `Y` : `X`

## Source

[src/array/index.ts:57](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/array/index.ts#L57)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
