[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > apply

# Function: apply()

> **apply**\<`T`, `R`, `Keys`\>(
> `obj`,
> `func`,
> `keys`?): `Keys` _extends_ `undefined` ? `{ [K in keyof T]: R }` : `{ [K in keyof T]: K extends Keys[number] ? R : T[K] }`

Copies an object and applies a function to all values. If keys is
specified, only applies the function to those keys.

## Type parameters

| Parameter                                                                       |
| :------------------------------------------------------------------------------ |
| `T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) |
| `R`                                                                             |
| `Keys` _extends_ _readonly_ _keyof_ `T`[]                                       |

## Parameters

| Parameter | Type           |
| :-------- | :------------- |
| `obj`     | `T`            |
| `func`    | (`val`) => `R` |
| `keys`?   | `Keys`         |

## Returns

`Keys` _extends_ `undefined` ? `{ [K in keyof T]: R }` : `{ [K in keyof T]: K extends Keys[number] ? R : T[K] }`

## Source

[src/object/index.ts:22](https://github.com/umatch-oficial/utils/blob/106c322/src/object/index.ts#L22)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
