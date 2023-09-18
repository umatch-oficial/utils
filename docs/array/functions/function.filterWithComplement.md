[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > filterWithComplement

# Function: filterWithComplement()

> **filterWithComplement**\<`T`, `P`\>(`array`, `predicate`): `T` _extends_ _readonly_ infer R[] ? `P` _extends_ (`obj`) => `obj is infer A` ? [`A`[], `Exclude`\< `R`, `A` \>[]] : [`R`[], `R`[]] : `never`

Returns the filtered array and the complement as well (elements
removed by the filter).

## Type parameters

| Parameter                            |
| :----------------------------------- |
| `T` _extends_ _readonly_ `unknown`[] |
| `P` _extends_ (`x`) => `boolean`     |

## Parameters

| Parameter   | Type |
| :---------- | :--- |
| `array`     | `T`  |
| `predicate` | `P`  |

## Returns

`T` _extends_ _readonly_ infer R[] ? `P` _extends_ (`obj`) => `obj is infer A` ? [`A`[], `Exclude`\< `R`, `A` \>[]] : [`R`[], `R`[]] : `never`

## Source

[src/array/index.ts:119](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/array/index.ts#L119)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
