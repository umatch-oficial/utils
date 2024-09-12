[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / trim

# Function: trim()

```ts
function trim<T>(array, predicate): T[number][]
```

Returns a copy of the array, where values for which the predicate
is false are removed from both ends.

Similar to filtering the array, except that the elements between
the first and last valid elements are not removed.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

• **predicate**

## Returns

`T`\[`number`\][]

## Defined in

[src/array/index.ts:402](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L402)
