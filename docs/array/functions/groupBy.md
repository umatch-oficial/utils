[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / groupBy

# Function: groupBy()

```ts
function groupBy<T, Key>(array, key): T extends readonly infer D[] ? Key extends keyof D ? D[Key] extends string | number | boolean ? { [Value in D[Key] as Value extends boolean ? Value & string : Value]: D[] } : never : {} : Dictionary<T>
```

Groups the elements in an array by the value of the specified key.

The key must have a primitive value (boolean, number or string)
for every object in the array. If the value is boolean, it becomes
an index of the resulting object as a string.

## Type Parameters

• **T** *extends* readonly [`Dictionary`](../../index/type-aliases/Dictionary.md)[]

• **Key** *extends* `PropertyKey`

## Parameters

• **array**: `T`

• **key**: `Key`

## Returns

`T` *extends* readonly infer D[] ? `Key` *extends* keyof `D` ? `D`\[`Key`\] *extends* `string` \| `number` \| `boolean` ? `{ [Value in D[Key] as Value extends boolean ? Value & string : Value]: D[] }` : `never` : \{\} : [`Dictionary`](../../index/type-aliases/Dictionary.md)\<`T`\>

## Throws

if, for any element in the array, the key is not present or has a non-primitive value.

## Defined in

[src/array/index.ts:188](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L188)
