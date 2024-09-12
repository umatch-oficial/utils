[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / findLastIndex

# Function: findLastIndex()

```ts
function findLastIndex<T>(array, predicate): number
```

Same as Array.prototype.findIndex, but starting from the end.

Array.prototype.findLastIndex is already available in some runtimes,
but not in Node.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

• **predicate**

## Returns

`number`

## Defined in

[src/array/index.ts:145](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L145)
