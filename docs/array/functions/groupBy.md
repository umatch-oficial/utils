**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / groupBy

# Function: groupBy()

> **groupBy**\<`T`, `Key`\>(`array`, `key`): `T` extends readonly infer D[] ? `Key` extends keyof `D` ? `D`\[`Key`\] extends `string` \| `number` \| `boolean` ? `{ [Value in D[Key] as Value extends boolean ? Value & string : Value]: Extract<D, { [K in Key]: Value }>[] }` : `never` : `Object` : [`Dictionary`](../../index/type-aliases/Dictionary.md)\<`T`\>

Groups the elements in an array by the value of the specified key.

The key must have a primitive value (boolean, number or string)
for every object in the array. If the value is boolean, it becomes
an index of the resulting object as a string.

## Type parameters

• **T** extends readonly [`Dictionary`](../../index/type-aliases/Dictionary.md)[]

• **Key** extends `PropertyKey`

## Parameters

• **array**: `T`

• **key**: `Key`

## Returns

`T` extends readonly infer D[] ? `Key` extends keyof `D` ? `D`\[`Key`\] extends `string` \| `number` \| `boolean` ? `{ [Value in D[Key] as Value extends boolean ? Value & string : Value]: Extract<D, { [K in Key]: Value }>[] }` : `never` : `Object` : [`Dictionary`](../../index/type-aliases/Dictionary.md)\<`T`\>

## Throws

if, for any element in the array, the key is not present or has a non-primitive value.

## Source

[src/array/index.ts:188](https://github.com/umatch-oficial/utils/blob/f37b7e4/src/array/index.ts#L188)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
