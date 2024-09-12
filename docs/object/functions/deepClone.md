[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / deepClone

# Function: deepClone()

```ts
function deepClone<T>(obj): T
```

Returns a deep clone of the object.

Similar to structuredClone, except that it only treats plain
objects and arrays as values, and copies all other types by
reference.

## Type Parameters

• **T**

## Parameters

• **obj**: `T`

## Returns

`T`

## Defined in

[src/object/index.ts:63](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L63)
