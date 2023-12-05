[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > uniques

# Function: uniques()

> **uniques**\<`T`\>(`array`): `{ readonly [K in keyof T]: unknown }` _extends_ `T` ? `Uniques`\< `T` \> : `T`

Returns a copy of an array without duplicates.

## Type parameters

| Parameter                            |
| :----------------------------------- |
| `T` _extends_ _readonly_ `unknown`[] |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `array`   | `T`  |

## Returns

`{ readonly [K in keyof T]: unknown }` _extends_ `T` ? `Uniques`\< `T` \> : `T`

## Source

[src/array/index.ts:391](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/array/index.ts#L391)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
