[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / sliceWithOverflow

# Function: sliceWithOverflow()

```ts
function sliceWithOverflow<T>(
   array, 
   start, 
   end): T extends readonly infer _[] ? T : never
```

Same as slice, but overflows to guarantee there are (end - start) elements.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

• **start**: `number`

• **end**: `number`

## Returns

`T` *extends* readonly infer \_[] ? `T` : `never`

## Defined in

[src/array/index.ts:339](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L339)
