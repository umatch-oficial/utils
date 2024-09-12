[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / filterByObject

# Function: filterByObject()

```ts
function filterByObject<O, T>(array, template): O & T[]
```

Filters an array of objects, ensuring they contain all key:value
pairs in the template.

## Type Parameters

• **O** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **T** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Parameters

• **array**: readonly `O`[]

• **template**: `T`

## Returns

`O` & `T`[]

## Defined in

[src/array/index.ts:101](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L101)
