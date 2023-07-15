[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > rename

# Function: rename()

> **rename**\<`T`, `Mapper`\>(`obj`, `mapper`): `Mapper` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)\< `string` \> ? `{ [K in keyof T as K extends keyof Mapper ? Mapper[K] : K]: T[K] }` : \{}

Returns a copy of an object, with renamed first-level keys.

## Type parameters

| Parameter                                                                                |
| :--------------------------------------------------------------------------------------- |
| `T`                                                                                      |
| `Mapper` _extends_ \{ [\_ in string \| number \| symbol]?: string } \| (`a`) => `string` |

## Parameters

| Parameter | Type     |
| :-------- | :------- |
| `obj`     | `T`      |
| `mapper`  | `Mapper` |

## Returns

`Mapper` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)\< `string` \> ? `{ [K in keyof T as K extends keyof Mapper ? Mapper[K] : K]: T[K] }` : \{}

## Source

[src/object/index.ts:351](https://github.com/umatch-oficial/utils/blob/00cf87f/src/object/index.ts#L351)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)