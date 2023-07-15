[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > findLastIndex

# Function: findLastIndex()

> **findLastIndex**\<`T`\>(`array`, `predicate`): `number`

Same as Array.prototype.findIndex, but starting from the end.

Array.prototype.findLastIndex is already available in some runtimes,
but not in Node.

## Type parameters

| Parameter                            |
| :----------------------------------- |
| `T` _extends_ _readonly_ `unknown`[] |

## Parameters

| Parameter   | Type                                   |
| :---------- | :------------------------------------- |
| `array`     | `T`                                    |
| `predicate` | (`value`, `index`, `arr`) => `boolean` |

## Returns

`number`

## Source

[src/array/index.ts:145](https://github.com/umatch-oficial/utils/blob/a9008ad/src/array/index.ts#L145)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
