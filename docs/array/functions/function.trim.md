[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > trim

# Function: trim()

> **trim**\<`T`\>(`array`, `predicate`): `T`[`number`][]

Returns a copy of the array, where values for which the predicate
is false are removed from both ends.

Similar to filtering the array, except that the elements between
the first and last valid elements are not removed.

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

`T`[`number`][]

## Source

[src/array/index.ts:368](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/array/index.ts#L368)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
