[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > sliceWithOverflow

# Function: sliceWithOverflow()

> **sliceWithOverflow**\<`T`\>(
> `array`,
> `start`,
> `end`): `T` _extends_ _readonly_ infer \_[] ? `T` : `never`

Same as slice, but overflows to guarantee there are (end - start) elements.

## Type parameters

| Parameter                            |
| :----------------------------------- |
| `T` _extends_ _readonly_ `unknown`[] |

## Parameters

| Parameter | Type     |
| :-------- | :------- |
| `array`   | `T`      |
| `start`   | `number` |
| `end`     | `number` |

## Returns

`T` _extends_ _readonly_ infer \_[] ? `T` : `never`

## Source

[src/array/index.ts:339](https://github.com/umatch-oficial/utils/blob/00cf87f/src/array/index.ts#L339)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
