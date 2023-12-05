[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > permutations

# Function: permutations()

> **permutations**\<`T`\>(`array`): `T` _extends_ _readonly_ infer R[] ? [`R`, `R`][] : `never`

Returns all length-2 tuples of the elements, in sorted order,
without repeated elements.<br>
(equivalent of python's itertools' combinations)

## Type parameters

| Parameter                            |
| :----------------------------------- |
| `T` _extends_ _readonly_ `unknown`[] |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `array`   | `T`  |

## Returns

`T` _extends_ _readonly_ infer R[] ? [`R`, `R`][] : `never`

## Source

[src/array/index.ts:285](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/array/index.ts#L285)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
