[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > remove

# Function: remove()

> **remove**\<`T`, `X`\>(`array`, `item`): `{ readonly [K in keyof T]: unknown }` _extends_ `T` ? `Remove`\< `T`, `X` \> : `T`

Removes an item from an array.

## Type parameters

| Parameter                                                                                  |
| :----------------------------------------------------------------------------------------- |
| `T` _extends_ _readonly_ [`Primitive`](../../index/type-aliases/type-alias.Primitive.md)[] |
| `X` _extends_ [`Primitive`](../../index/type-aliases/type-alias.Primitive.md)              |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `array`   | `T`  |
| `item`    | `X`  |

## Returns

`{ readonly [K in keyof T]: unknown }` _extends_ `T` ? `Remove`\< `T`, `X` \> : `T`

## Source

[src/array/index.ts:313](https://github.com/umatch-oficial/utils/blob/51f6213/src/array/index.ts#L313)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
