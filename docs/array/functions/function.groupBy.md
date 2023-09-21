[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > groupBy

# Function: groupBy()

> **groupBy**\<`T`, `Key`\>(`array`, `key`): `T` _extends_ _readonly_ infer D[] ? `Key` _extends_ _keyof_ `D` ? `D`[`Key`] _extends_ `string` \| `number` \| `boolean` ? `{ [Value in D[Key] as Value extends boolean ? Value & string : Value]: Extract<D, { [K in Key]: Value }>[] }` : `never` : \{} : [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)\< `T` \>

Groups the elements in an array by the value of the specified key.

The key must have a primitive value (boolean, number or string)
for every object in the array. If the value is boolean, it becomes
an index of the resulting object as a string.

## Throws

if, for any element in the array, the key is not present or has a non-primitive value.

## Type parameters

| Parameter                                                                                    |
| :------------------------------------------------------------------------------------------- |
| `T` _extends_ _readonly_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)[] |
| `Key` _extends_ `PropertyKey`                                                                |

## Parameters

| Parameter | Type  |
| :-------- | :---- |
| `array`   | `T`   |
| `key`     | `Key` |

## Returns

`T` _extends_ _readonly_ infer D[] ? `Key` _extends_ _keyof_ `D` ? `D`[`Key`] _extends_ `string` \| `number` \| `boolean` ? `{ [Value in D[Key] as Value extends boolean ? Value & string : Value]: Extract<D, { [K in Key]: Value }>[] }` : `never` : \{} : [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)\< `T` \>

## Source

[src/array/index.ts:188](https://github.com/umatch-oficial/utils/blob/a4be831/src/array/index.ts#L188)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
