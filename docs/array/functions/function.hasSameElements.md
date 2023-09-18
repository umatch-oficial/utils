[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > hasSameElements

# Function: hasSameElements()

> **hasSameElements**\<`X`, `A`, `B`\>(`a`, `b`): [`Equals`](../../index/type-aliases/type-alias.Equals.md)\< `A`[`number`], `B`[`number`] \> _extends_ `true` ? `A` _extends_ \{`length`: infer ALen;} ? `B` _extends_ \{`length`: infer BLen;} ? [`Equals`](../../index/type-aliases/type-alias.Equals.md)\< `ALen`, `BLen` \> _extends_ `true` ? `true` : `false` : `false` : `false` : `false`

Returns whether 2 arrays have the same elements, regardless of order.

## Type parameters

| Parameter                          |
| :--------------------------------- |
| `X` _extends_ `string` \| `number` |
| `A` _extends_ _readonly_ `X`[]     |
| `B` _extends_ _readonly_ `X`[]     |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `a`       | `A`  |
| `b`       | `B`  |

## Returns

[`Equals`](../../index/type-aliases/type-alias.Equals.md)\< `A`[`number`], `B`[`number`] \> _extends_ `true` ? `A` _extends_ \{`length`: infer ALen;} ? `B` _extends_ \{`length`: infer BLen;} ? [`Equals`](../../index/type-aliases/type-alias.Equals.md)\< `ALen`, `BLen` \> _extends_ `true` ? `true` : `false` : `false` : `false` : `false`

## Source

[src/array/index.ts:230](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/array/index.ts#L230)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
